import { withSanityClient } from "./client";

export type AdvisoryCard = {
  _id: string;
  slug: string;
  verb: string;
  tileFace: string;
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

export type AdvisorySection = {
  eyebrow: string;
  headline: string;
  intro: string;
  items: AdvisoryCard[];
};

const DEFAULT_ADVISORY_ITEMS: AdvisoryCard[] = [
  {
    _id: "fallback-1",
    slug: "brief",
    verb: "Brief",
    tileFace: "Boards & executives",
    oneLineEssence: "The one page that matters, on the desk before the decision.",
    fullContent:
      "A brief is the discipline of leaving out. Most intelligence drowns its reader; a Gray Keep brief is built so a board or an executive absorbs what matters in the time they actually have, and can act on it the same day. We watch the threat activity, the geopolitics, and the second-order effects, and hand you only what changes your decision, with the reasoning in plain sight and the uncertainty marked honestly. No dashboard to interpret. No feed to monitor. One clear document, written for the person who has to choose.",
    closingLine: "Not more to read. Less, and the right less.",
    sortOrder: 1,
  },
  {
    _id: "fallback-2",
    slug: "translate",
    verb: "Translate",
    tileFace: "Narrative risk",
    oneLineEssence: "Complex threat activity turned into clear executive context.",
    fullContent:
      "Complex threat activity turned into clear executive context. We translate what operators are doing, what it means for your organization, and what decision it should inform-without vendor framing or inflated certainty.",
    closingLine: "Clarity is the product.",
    sortOrder: 2,
  },
  {
    _id: "fallback-3",
    slug: "frame",
    verb: "Frame",
    tileFace: "Geopolitical cyber",
    oneLineEssence: "Scenario framing for leaders operating under uncertainty.",
    fullContent:
      "Scenario framing for leaders operating under uncertainty. We map the geopolitical and cyber landscape into decision-ready frames-what could change, what would matter, and what to watch before it becomes obvious.",
    closingLine: "Judgment before volume.",
    sortOrder: 3,
  },
  {
    _id: "fallback-4",
    slug: "stand",
    verb: "Stand",
    tileFace: "Clarity under pressure",
    oneLineEssence: "Clear judgment without noise, panic, or false certainty.",
    fullContent:
      "Clear judgment without noise, panic, or false certainty. When the room needs a steady read-not more data, not more alarm-we provide the written assessment that holds under scrutiny.",
    closingLine: "Quiet work for serious decisions.",
    sortOrder: 4,
  },
];

export const DEFAULT_ADVISORY: AdvisorySection = {
  eyebrow: "Advisory",
  headline: "What we actually do\nfor the people we work with.",
  intro:
    "Advisory is where the work becomes personal. A small number of engagements - quiet, written, and deliberately few - for leaders who need judgment before they need volume. Four ways to be of use: to brief, to translate, to frame, and to stand. Each is a different answer to the same question - what do you actually need to see, to decide, and to do?",
  items: DEFAULT_ADVISORY_ITEMS,
};

type AdvisoryHomeRow = {
  advisoryEyebrow: string | null;
  advisoryHeadline: string | null;
  advisoryIntro: string | null;
};

type AdvisoryCardRow = {
  _id: string;
  slug: string | null;
  verb: string | null;
  tileFace: string | null;
  oneLineEssence: string | null;
  fullContent: string | null;
  closingLine: string | null;
  sortOrder: number | null;
};

function mapAdvisoryRow(row: AdvisoryCardRow): AdvisoryCard {
  const verb = row.verb!.trim();
  return {
    _id: row._id,
    slug: row.slug?.trim() || slugify(verb),
    verb,
    tileFace: row.tileFace!.trim(),
    oneLineEssence: row.oneLineEssence!.trim(),
    fullContent: row.fullContent!.trim(),
    closingLine: row.closingLine!.trim(),
    sortOrder: row.sortOrder ?? 0,
  };
}

function isCompleteAdvisoryRow(row: AdvisoryCardRow): boolean {
  return Boolean(
    row.verb?.trim() &&
      row.tileFace?.trim() &&
      row.oneLineEssence?.trim() &&
      row.fullContent?.trim() &&
      row.closingLine?.trim(),
  );
}

function resolveAdvisoryItems(rows: AdvisoryCardRow[] | null | undefined): AdvisoryCard[] {
  const items = (rows ?? []).filter(isCompleteAdvisoryRow).map(mapAdvisoryRow);
  return items.length ? items : DEFAULT_ADVISORY_ITEMS;
}

const ADVISORY_CARD_PROJECTION = `{
  _id,
  "slug": slug.current,
  verb,
  "tileFace": coalesce(tileFace, line),
  "oneLineEssence": coalesce(oneLineEssence, detail),
  fullContent,
  closingLine,
  sortOrder
}`;

function resolveAdvisorySection(
  homeRow: AdvisoryHomeRow | null,
  items: AdvisoryCardRow[] | null | undefined,
): AdvisorySection {
  return {
    eyebrow: homeRow?.advisoryEyebrow?.trim() || DEFAULT_ADVISORY.eyebrow,
    headline: homeRow?.advisoryHeadline?.trim() || DEFAULT_ADVISORY.headline,
    intro: homeRow?.advisoryIntro?.trim() || DEFAULT_ADVISORY.intro,
    items: resolveAdvisoryItems(items),
  };
}

export async function getAdvisoryFromSanity(): Promise<AdvisorySection> {
  return withSanityClient(async (client) => {
    const [homeRow, items] = await Promise.all([
      client.fetch<AdvisoryHomeRow | null>(`*[_type == "homePage"][0] {
        advisoryEyebrow,
        advisoryHeadline,
        advisoryIntro
      }`),
      client.fetch<AdvisoryCardRow[]>(
        `*[_type == "advisoryPost" && enabled != false] | order(sortOrder asc, _createdAt asc) ${ADVISORY_CARD_PROJECTION}`,
      ),
    ]);

    return resolveAdvisorySection(homeRow, items);
  }, DEFAULT_ADVISORY);
}

export async function getAdvisoryBySlugFromSanity(slug: string): Promise<AdvisoryCard | null> {
  const fallback = DEFAULT_ADVISORY_ITEMS.find((item) => item.slug === slug) ?? null;

  return withSanityClient(async (client) => {
    const row = await client.fetch<AdvisoryCardRow | null>(
      `*[_type == "advisoryPost" && slug.current == $slug][0] ${ADVISORY_CARD_PROJECTION}`,
      { slug },
    );

    if (!row || !isCompleteAdvisoryRow(row)) return fallback;
    return mapAdvisoryRow(row);
  }, fallback);
}
