import { getSanityClient } from "./client";

/** Default slug for the Intel Library flagship when no article has "Feature as flagship" set. */
export const FLAGSHIP_INTEL_SLUG_FALLBACK = "the-quiet-front";

export type FlagshipReport = {
  _id: string;
  title: string;
  slug: string;
  tier: string;
  summary: string | null;
  pageCount: number | null;
  releaseLabel: string | null;
  releaseDate: string | null;
  ctaUrl: string | null;
  featuredOnHome: boolean;
  mainImageUrl: string | null;
  mainImageAlt: string | null;
};

type FlagshipReportRow = Omit<FlagshipReport, "tier"> & { tier: string | null };

export type FlagshipIntelArticle = {
  _id: string;
  title: string;
  slug: string;
  tier: string | null;
  summary: string | null;
  pageCount: number | null;
  releaseLabel: string | null;
  publishedAt: string | null;
  mainImageUrl: string | null;
  mainImageAlt: string | null;
};

type FlagshipIntelArticleRow = Omit<
  FlagshipIntelArticle,
  "tier" | "pageCount" | "releaseLabel"
> & {
  flagshipTier: string | null;
  flagshipPageCount: number | null;
  flagshipReleaseLabel: string | null;
};

export type HomeFlagshipSlot = {
  tier: string;
  title: string;
  summary: string;
  meta: string;
  imageUrl: string | null;
  imageAlt: string;
  reportSlug: string;
  externalCtaUrl: string | null;
};

export type FlagshipReportDetail = FlagshipReport & {
  bodyText: string | null;
};

export async function getFlagshipIntelArticleFromSanity(): Promise<FlagshipIntelArticle | null> {
  const client = getSanityClient();
  if (!client) return null;

  const projection = `{
    _id,
    title,
    "slug": slug.current,
    summary,
    "flagshipTier": flagshipTier,
    "flagshipPageCount": flagshipPageCount,
    "flagshipReleaseLabel": flagshipReleaseLabel,
    publishedAt,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }`;

  const featured = await client.fetch<FlagshipIntelArticleRow | null>(
    `*[_type == "intelArticle" && coalesce(featuredAsFlagship, false) == true]
      | order(coalesce(publishedAt, _createdAt) desc)[0] ${projection}`,
  );

  const normalize = (row: FlagshipIntelArticleRow | null): FlagshipIntelArticle | null => {
    if (!row?.slug) return null;
    return {
      _id: row._id,
      title: row.title,
      slug: row.slug,
      tier: row.flagshipTier,
      summary: row.summary ?? null,
      pageCount: row.flagshipPageCount ?? null,
      releaseLabel: row.flagshipReleaseLabel ?? null,
      publishedAt: row.publishedAt ?? null,
      mainImageUrl: row.mainImageUrl ?? null,
      mainImageAlt: row.mainImageAlt ?? null,
    };
  };

  const fromFeatured = normalize(featured);
  if (fromFeatured) return fromFeatured;

  const bySlug = await client.fetch<FlagshipIntelArticleRow | null>(
    `*[_type == "intelArticle" && slug.current == $slug][0] ${projection}`,
    { slug: FLAGSHIP_INTEL_SLUG_FALLBACK },
  );
  return normalize(bySlug);
}

export function resolveHomeFlagshipFromFeaturedReport(
  report: FlagshipReport | null,
): HomeFlagshipSlot | null {
  if (!report?.slug) return null;

  return {
    tier: report.tier?.trim() ? report.tier.trim() : "Flagship Report",
    title: report.title,
    summary: report.summary ?? "",
    meta: buildFlagshipMeta(report),
    imageUrl: report.mainImageUrl,
    imageAlt: report.mainImageAlt ?? report.title,
    reportSlug: report.slug,
    externalCtaUrl: report.ctaUrl,
  };
}

export async function getFlagshipReportFromSanity(): Promise<FlagshipReport | null> {
  const client = getSanityClient();
  if (!client) return null;

  // Home page only shows a flagship report when "Feature on home page" is on in Studio.
  const row = await client.fetch<FlagshipReportRow | null>(
    `*[_type == "flagshipReport" && coalesce(featuredOnHome, false) == true]
      | order(coalesce(releaseDate, _createdAt) desc)[0] {
      _id,
      title,
      "slug": slug.current,
      tier,
      summary,
      pageCount,
      releaseLabel,
      releaseDate,
      ctaUrl,
      "featuredOnHome": coalesce(featuredOnHome, false),
      "mainImageUrl": mainImage.asset->url,
      "mainImageAlt": mainImage.alt
    }`,
  );

  if (!row?.slug) return null;

  return {
    _id: row._id,
    title: row.title,
    slug: row.slug,
    tier: row.tier?.trim() ? row.tier : "Flagship Report",
    summary: row.summary ?? null,
    pageCount: row.pageCount ?? null,
    releaseLabel: row.releaseLabel ?? null,
    releaseDate: row.releaseDate ?? null,
    ctaUrl: row.ctaUrl ?? null,
    featuredOnHome: row.featuredOnHome ?? false,
    mainImageUrl: row.mainImageUrl ?? null,
    mainImageAlt: row.mainImageAlt ?? null,
  };
}

export function buildFlagshipMeta(report: Pick<FlagshipReport, "pageCount" | "releaseLabel" | "releaseDate">): string {
  const parts: string[] = [];
  if (report.pageCount && report.pageCount > 0) {
    parts.push(`${report.pageCount} pages`);
  }
  if (report.releaseLabel?.trim()) {
    parts.push(report.releaseLabel.trim());
  } else if (report.releaseDate) {
    const parsed = new Date(report.releaseDate);
    if (!Number.isNaN(parsed.getTime())) {
      parts.push(
        `Released ${parsed.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
        })}`,
      );
    }
  }
  return parts.join(" · ");
}

export async function getFlagshipReportBySlugFromSanity(
  slug: string,
): Promise<FlagshipReportDetail | null> {
  const client = getSanityClient();
  if (!client) return null;

  type Row = FlagshipReportRow & { bodyText: string | null };

  const row = await client.fetch<Row | null>(
    `*[_type == "flagshipReport" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      tier,
      summary,
      pageCount,
      releaseLabel,
      releaseDate,
      ctaUrl,
      "featuredOnHome": coalesce(featuredOnHome, false),
      "mainImageUrl": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
      "bodyText": pt::text(body)
    }`,
    { slug },
  );

  if (!row?.slug) return null;

  return {
    _id: row._id,
    title: row.title,
    slug: row.slug,
    tier: row.tier?.trim() ? row.tier : "Flagship Report",
    summary: row.summary ?? null,
    pageCount: row.pageCount ?? null,
    releaseLabel: row.releaseLabel ?? null,
    releaseDate: row.releaseDate ?? null,
    ctaUrl: row.ctaUrl ?? null,
    featuredOnHome: row.featuredOnHome ?? false,
    mainImageUrl: row.mainImageUrl ?? null,
    mainImageAlt: row.mainImageAlt ?? null,
    bodyText: row.bodyText ?? null,
  };
}
