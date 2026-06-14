import { getSanityClient } from "./client";

export type IntelContentType = "Dispatch" | "Method";

export type IntelCard = {
  _id: string;
  slug: string;
  title: string;
  summary: string | null;
  contentType: IntelContentType;
  tags: string[];
  publishedAt: string | null;
  readingTimeMinutes: number;
  category: "Intel";
  featuredOnHome: boolean;
  mainImageUrl: string | null;
  mainImageAlt: string | null;
};

export type IntelDetail = IntelCard & {
  bodyText?: string | null;
};

type IntelCardQueryRow = Omit<IntelCard, "readingTimeMinutes" | "category" | "contentType"> & {
  contentType?: string | null;
  bodyText?: string | null;
};

export function resolveIntelContentType(
  contentType: string | null | undefined,
  tags: string[] = [],
): IntelContentType {
  if (contentType === "Method" || contentType === "Dispatch") {
    return contentType;
  }

  if (tags.some((tag) => tag.toLowerCase() === "method")) {
    return "Method";
  }

  return "Dispatch";
}

export function formatIntelContentTypeLabel(contentType: IntelContentType): string {
  return contentType === "Method" ? "METHOD" : "DISPATCH";
}

export async function getIntelFromSanity() {
  const client = getSanityClient();
  if (!client) return [] as IntelCard[];

  const rows = await client.fetch<IntelCardQueryRow[]>(
    `*[_type == "intelArticle"] | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      contentType,
      tags,
      publishedAt,
      "featuredOnHome": coalesce(featuredOnHome, false),
      "mainImageUrl": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
      "bodyText": pt::text(body)
    }`,
  );

  return (rows ?? [])
    .filter((row) => row.slug)
    .map((row) => {
      const textSource = [row.summary, row.bodyText].filter(Boolean).join(" ");
      const words = textSource.trim() ? textSource.trim().split(/\s+/).length : 0;
      const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
      return {
        _id: row._id,
        slug: row.slug,
        title: row.title,
        summary: row.summary,
        contentType: resolveIntelContentType(row.contentType, row.tags ?? []),
        tags: row.tags ?? [],
        publishedAt: row.publishedAt ?? null,
        readingTimeMinutes,
        category: "Intel",
        featuredOnHome: row.featuredOnHome ?? false,
        mainImageUrl: row.mainImageUrl ?? null,
        mainImageAlt: row.mainImageAlt ?? null,
      } satisfies IntelCard;
    });
}

export async function getIntelBySlugFromSanity(slug: string) {
  const client = getSanityClient();
  if (!client) return null;

  const row = await client.fetch<IntelCardQueryRow | null>(
    `*[_type == "intelArticle" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      summary,
      contentType,
      tags,
      publishedAt,
      "featuredOnHome": coalesce(featuredOnHome, false),
      "mainImageUrl": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
      "bodyText": pt::text(body)
    }`,
    { slug },
  );

  if (!row?.slug) return null;

  const textSource = [row.summary, row.bodyText].filter(Boolean).join(" ");
  const words = textSource.trim() ? textSource.trim().split(/\s+/).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

  return {
    _id: row._id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    contentType: resolveIntelContentType(row.contentType, row.tags ?? []),
    tags: row.tags ?? [],
    publishedAt: row.publishedAt ?? null,
    readingTimeMinutes,
    category: "Intel",
    featuredOnHome: row.featuredOnHome ?? false,
    mainImageUrl: row.mainImageUrl ?? null,
    mainImageAlt: row.mainImageAlt ?? null,
    bodyText: row.bodyText ?? null,
  } satisfies IntelDetail;
}
