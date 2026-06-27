import { withSanityClient } from "./client";

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
  seoTitle: string | null;
  seoDescription: string | null;
};

type FlagshipReportRow = Omit<FlagshipReport, "tier"> & { tier: string | null };

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
  return withSanityClient(async (client) => {
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
      "mainImageAlt": mainImage.alt,
      seoTitle,
      seoDescription
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
      seoTitle: row.seoTitle ?? null,
      seoDescription: row.seoDescription ?? null,
    };
  }, null);
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
  return withSanityClient(async (client) => {
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
      seoTitle,
      seoDescription,
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
      seoTitle: row.seoTitle ?? null,
      seoDescription: row.seoDescription ?? null,
      bodyText: row.bodyText ?? null,
    };
  }, null);
}
