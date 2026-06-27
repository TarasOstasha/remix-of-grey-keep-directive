import { withSanityClient } from "./client";

export const HOME_BUILT_IN_SECTION_OPTIONS = [
  { title: "Hero", value: "hero" },
  { title: "Featured insights", value: "featuredInsights" },
  { title: "Intel library", value: "intelLibrary" },
  { title: "Split cards", value: "splitCards" },
  { title: "How we help", value: "howWeHelp" },
  { title: "Speaking", value: "speaking" },
  { title: "From The Keep", value: "fromTheKeep" },
] as const;

export type HomeBuiltInSectionKey = (typeof HOME_BUILT_IN_SECTION_OPTIONS)[number]["value"];

export type HomeFromTheDesk = {
  eyebrow: string;
  headline: string;
  body: string;
  imageUrl: string | null;
  imageAlt: string;
};

export type HomeBuiltInSection = {
  _type: "homeBuiltInSection";
  _key: string;
  section: HomeBuiltInSectionKey;
  enabled: boolean;
};

export type HomeCustomSectionLayout = "standard" | "centered" | "withImage";

export type HomeCustomSection = {
  _type: "homeCustomSection";
  _key: string;
  enabled: boolean;
  sectionId: string | null;
  eyebrow: string | null;
  headline: string;
  intro: string | null;
  body: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  layout: HomeCustomSectionLayout;
};

export type HomeSection = HomeBuiltInSection | HomeCustomSection;

export type HomePageConfig = {
  fromTheDesk: HomeFromTheDesk;
  sections: HomeSection[];
};

type HomePageRow = {
  fromTheDeskEyebrow: string | null;
  fromTheDeskHeadline: string | null;
  fromTheDeskBody: string | null;
  fromTheDeskImageUrl: string | null;
  fromTheDeskImageAlt: string | null;
  sections?: HomeSectionRow[] | null;
};

type HomeSectionRow = {
  _type: string;
  _key: string;
  section?: string;
  enabled?: boolean | null;
  sectionId?: string | null;
  eyebrow?: string | null;
  headline?: string | null;
  intro?: string | null;
  body?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  layout?: string | null;
};

export const DEFAULT_FROM_THE_DESK: HomeFromTheDesk = {
  eyebrow: "From the desk",
  headline: "We do not sell comfort. We offer a clear view.",
  body: "The purpose is not to amplify fear or soften reality. The purpose is to see enough, early enough, to make better decisions.",
  imageUrl: null,
  imageAlt: "A long mountain ridgeline fading into mist at first light",
};

const DEFAULT_HOME_SECTIONS: HomeSection[] = HOME_BUILT_IN_SECTION_OPTIONS.map((option) => ({
  _type: "homeBuiltInSection",
  _key: option.value,
  section: option.value,
  enabled: true,
}));

const BUILT_IN_SECTION_KEYS = new Set<string>(HOME_BUILT_IN_SECTION_OPTIONS.map((o) => o.value));

function isBuiltInSectionKey(value: string): value is HomeBuiltInSectionKey {
  return BUILT_IN_SECTION_KEYS.has(value);
}

function resolveCustomLayout(value: string | null | undefined): HomeCustomSectionLayout {
  if (value === "centered" || value === "withImage") return value;
  return "standard";
}

function resolveSection(row: HomeSectionRow): HomeSection | null {
  const enabled = row.enabled !== false;

  if (row._type === "homeBuiltInSection") {
    const section = row.section;
    if (!section || !isBuiltInSectionKey(section)) return null;
    return {
      _type: "homeBuiltInSection",
      _key: row._key,
      section,
      enabled,
    };
  }

  if (row._type === "homeCustomSection") {
    const headline = row.headline?.trim();
    if (!headline) return null;
    return {
      _type: "homeCustomSection",
      _key: row._key,
      enabled,
      sectionId: row.sectionId?.trim() || null,
      eyebrow: row.eyebrow?.trim() || null,
      headline,
      intro: row.intro?.trim() || null,
      body: row.body?.trim() || null,
      imageUrl: row.imageUrl ?? null,
      imageAlt: row.imageAlt?.trim() || null,
      ctaLabel: row.ctaLabel?.trim() || null,
      ctaUrl: row.ctaUrl?.trim() || null,
      layout: resolveCustomLayout(row.layout),
    };
  }

  return null;
}

function resolveSections(rows: HomeSectionRow[] | null | undefined): HomeSection[] {
  if (!rows?.length) return DEFAULT_HOME_SECTIONS;
  return rows.map(resolveSection).filter((section): section is HomeSection => section != null);
}

function resolveFromTheDesk(row: HomePageRow | null): HomeFromTheDesk {
  if (!row) return DEFAULT_FROM_THE_DESK;

  return {
    eyebrow: row.fromTheDeskEyebrow?.trim() || DEFAULT_FROM_THE_DESK.eyebrow,
    headline: row.fromTheDeskHeadline?.trim() || DEFAULT_FROM_THE_DESK.headline,
    body: row.fromTheDeskBody?.trim() || DEFAULT_FROM_THE_DESK.body,
    imageUrl: row.fromTheDeskImageUrl ?? null,
    imageAlt: row.fromTheDeskImageAlt?.trim() || DEFAULT_FROM_THE_DESK.imageAlt,
  };
}

const EMPTY_HOME_PAGE: HomePageConfig = {
  fromTheDesk: DEFAULT_FROM_THE_DESK,
  sections: DEFAULT_HOME_SECTIONS,
};

export async function getHomePageFromSanity(): Promise<HomePageConfig> {
  return withSanityClient(async (client) => {
    const row = await client.fetch<HomePageRow | null>(
      `*[_type == "homePage"][0] {
      fromTheDeskEyebrow,
      fromTheDeskHeadline,
      fromTheDeskBody,
      "fromTheDeskImageUrl": fromTheDeskImage.asset->url,
      "fromTheDeskImageAlt": fromTheDeskImage.alt,
      sections[] {
        _type,
        _key,
        section,
        enabled,
        "sectionId": sectionId.current,
        eyebrow,
        headline,
        intro,
        body,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        ctaLabel,
        ctaUrl,
        layout
      }
    }`,
    );

    return {
      fromTheDesk: resolveFromTheDesk(row),
      sections: resolveSections(row?.sections),
    };
  }, EMPTY_HOME_PAGE);
}

/** @deprecated Use getHomePageFromSanity instead. */
export async function getHomeFromTheDeskFromSanity(): Promise<HomeFromTheDesk> {
  const homePage = await getHomePageFromSanity();
  return homePage.fromTheDesk;
}
