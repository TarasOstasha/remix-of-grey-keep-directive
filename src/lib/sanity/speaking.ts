import { withSanityClient } from "./client";

export type SpeakingPost = {
  _id: string;
  slug: string;
  format: string;
  oneLineEssence: string;
  fullContent: string;
  closingLine: string;
  sortOrder: number;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type SpeakingSection = {
  eyebrow: string;
  headline: string;
  intro: string;
  motto: string;
  items: SpeakingPost[];
};

const DEFAULT_SPEAKING_ITEMS: SpeakingPost[] = [
  {
    _id: "fallback-1",
    slug: "keynotes",
    format: "Keynotes",
    oneLineEssence: "The room, held, and sent home thinking.",
    fullContent:
      "A Gray Keep keynote is a story with a spine: the state of the gray, where cyber and geopolitics are actually heading, and what it asks of the people in the seats. Built for the specific audience, grounded in real intelligence, and written to last long after the lights come up. People leave not frightened, but clear - and carrying a line or two they will repeat.",
    closingLine: "They came for a talk. They leave with a lens.",
    sortOrder: 1,
  },
  {
    _id: "fallback-2",
    slug: "boardroom",
    format: "Boardroom",
    oneLineEssence: "Plain language, clear assumptions, no theater.",
    fullContent:
      "Executive and board briefings delivered in plain language, with clear assumptions and no theater. Built for the specific room and the decisions that room will make.",
    closingLine: "Judgment before volume.",
    sortOrder: 2,
  },
  {
    _id: "fallback-3",
    slug: "private-sessions",
    format: "Private Sessions",
    oneLineEssence: "Workshops and off-the-record briefings for invited audiences.",
    fullContent:
      "Workshops, moderated conversations, and off-the-record briefings for invited audiences. Each session is built for the people in the room and the questions they actually need answered.",
    closingLine: "Quiet work for serious rooms.",
    sortOrder: 3,
  },
];

export const DEFAULT_SPEAKING: SpeakingSection = {
  eyebrow: "Speaking",
  headline: "A voice in the room,\nnot a slide on a screen.",
  intro:
    "Gray Keep speaks rarely, and only when there is something worth saying. Each engagement is built for the specific room, grounded in real intelligence, written to be remembered, and never a briefing dressed up for a stage.",
  motto: "When the Keep speaks, it is because there is something worth saying.",
  items: DEFAULT_SPEAKING_ITEMS,
};

type SpeakingHomeRow = {
  speakingEyebrow: string | null;
  speakingHeadline: string | null;
  speakingIntro: string | null;
  speakingMotto: string | null;
};

type SpeakingPostRow = {
  _id: string;
  slug: string | null;
  format: string | null;
  oneLineEssence: string | null;
  fullContent: string | null;
  closingLine: string | null;
  sortOrder: number | null;
};

function mapSpeakingRow(row: SpeakingPostRow): SpeakingPost {
  const format = row.format!.trim();
  return {
    _id: row._id,
    slug: row.slug?.trim() || slugify(format),
    format,
    oneLineEssence: row.oneLineEssence!.trim(),
    fullContent: row.fullContent!.trim(),
    closingLine: row.closingLine!.trim(),
    sortOrder: row.sortOrder ?? 0,
  };
}

function isCompleteSpeakingRow(row: SpeakingPostRow): boolean {
  return Boolean(
    row.format?.trim() &&
      row.oneLineEssence?.trim() &&
      row.fullContent?.trim() &&
      row.closingLine?.trim(),
  );
}

function resolveSpeakingItems(rows: SpeakingPostRow[] | null | undefined): SpeakingPost[] {
  const items = (rows ?? []).filter(isCompleteSpeakingRow).map(mapSpeakingRow);
  return items.length ? items : DEFAULT_SPEAKING_ITEMS;
}

const SPEAKING_POST_PROJECTION = `{
  _id,
  "slug": slug.current,
  format,
  oneLineEssence,
  fullContent,
  closingLine,
  sortOrder
}`;

function resolveSpeakingSection(
  homeRow: SpeakingHomeRow | null,
  items: SpeakingPostRow[] | null | undefined,
): SpeakingSection {
  return {
    eyebrow: homeRow?.speakingEyebrow?.trim() || DEFAULT_SPEAKING.eyebrow,
    headline: homeRow?.speakingHeadline?.trim() || DEFAULT_SPEAKING.headline,
    intro: homeRow?.speakingIntro?.trim() || DEFAULT_SPEAKING.intro,
    motto: homeRow?.speakingMotto?.trim() || DEFAULT_SPEAKING.motto,
    items: resolveSpeakingItems(items),
  };
}

export async function getSpeakingFromSanity(): Promise<SpeakingSection> {
  return withSanityClient(async (client) => {
    const [homeRow, items] = await Promise.all([
      client.fetch<SpeakingHomeRow | null>(`*[_type == "homePage"][0] {
        speakingEyebrow,
        speakingHeadline,
        speakingIntro,
        speakingMotto
      }`),
      client.fetch<SpeakingPostRow[]>(
        `*[_type == "speakingPost" && enabled != false] | order(sortOrder asc, _createdAt asc) ${SPEAKING_POST_PROJECTION}`,
      ),
    ]);

    return resolveSpeakingSection(homeRow, items);
  }, DEFAULT_SPEAKING);
}

export async function getSpeakingBySlugFromSanity(slug: string): Promise<SpeakingPost | null> {
  const fallback = DEFAULT_SPEAKING_ITEMS.find((item) => item.slug === slug) ?? null;

  return withSanityClient(async (client) => {
    const row = await client.fetch<SpeakingPostRow | null>(
      `*[_type == "speakingPost" && slug.current == $slug][0] ${SPEAKING_POST_PROJECTION}`,
      { slug },
    );

    if (!row || !isCompleteSpeakingRow(row)) return fallback;
    return mapSpeakingRow(row);
  }, fallback);
}
