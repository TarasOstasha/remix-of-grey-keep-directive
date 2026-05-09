import { getSanityClient } from "./client";

export type StoryCard = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string | null;
  tags: string[];
  seriesTitle: string | null;
  seriesSlug: string | null;
  episodeNumber: number | null;
  featuredOnHome: boolean;
  mainImageUrl: string | null;
  mainImageAlt: string | null;
  readingTimeMinutes: number;
};

type StoryCardQueryRow = Omit<StoryCard, "readingTimeMinutes"> & {
  bodyText?: string | null;
};

export type PortableTextSpan = {
  _key?: string;
  _type: "span";
  text: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type: "block";
  style?: string;
  children?: PortableTextSpan[];
};

export type StoryDetail = StoryCard & {
  body?: PortableTextBlock[];
  series?: {
    title: string;
    slug: string;
  } | null;
};

export type StorySeriesCard = {
  _id: string;
  title: string;
  slug: string;
  premise: string | null;
  featuredOnHome: boolean;
  mainImageUrl: string | null;
  mainImageAlt: string | null;
};

export type StorySeriesEpisode = {
  _id: string;
  title: string;
  slug: string;
  episodeNumber: number | null;
  publishedAt: string | null;
  summary: string | null;
  series?: {
    title: string;
    slug: string;
  } | null;
};

export async function getStoriesFromSanity() {
  const client = getSanityClient();
  if (!client) {
    return { stories: [] as StoryCard[], series: [] as StorySeriesCard[] };
  }

  const [stories, series] = await Promise.all([
    client.fetch<StoryCardQueryRow[]>(
      `*[_type == "storyPost"] | order(coalesce(publishedAt, _createdAt) desc) {
        _id,
        title,
        "slug": slug.current,
        summary,
        publishedAt,
        tags,
        episodeNumber,
        "featuredOnHome": coalesce(featuredOnHome, false),
        "seriesTitle": series->title,
        "seriesSlug": series->slug.current,
        "mainImageUrl": mainImage.asset->url,
        "mainImageAlt": mainImage.alt,
        "bodyText": pt::text(body)
      }`,
    ),
    client.fetch<StorySeriesCard[]>(
      `*[_type == "storySeries"] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        premise,
        "featuredOnHome": coalesce(featuredOnHome, false),
        "mainImageUrl": mainImage.asset->url,
        "mainImageAlt": mainImage.alt
      }`,
    ),
  ]);

  const mappedStories = (stories ?? [])
    .filter((story) => story.slug)
    .map((story) => {
      const textSource = [story.summary, story.bodyText].filter(Boolean).join(" ");
      const words = textSource.trim() ? textSource.trim().split(/\s+/).length : 0;
      const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
      const { bodyText: _, ...storyWithoutBodyText } = story;
      return {
        ...storyWithoutBodyText,
        episodeNumber: storyWithoutBodyText.episodeNumber ?? null,
        featuredOnHome: storyWithoutBodyText.featuredOnHome ?? false,
        readingTimeMinutes,
      } satisfies StoryCard;
    });

  return {
    stories: mappedStories,
    series: (series ?? [])
      .filter((entry) => entry.slug)
      .map((entry) => ({ ...entry, featuredOnHome: entry.featuredOnHome ?? false })),
  };
}

export async function getStoryBySlugFromSanity(slug: string) {
  const client = getSanityClient();
  if (!client) return null;

  return client.fetch<StoryDetail | null>(
    `*[_type == "storyPost" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      summary,
      body,
      publishedAt,
      tags,
      "seriesTitle": series->title,
      "seriesSlug": series->slug.current,
      "series": select(
        defined(series->slug.current) => {
          "title": series->title,
          "slug": series->slug.current
        },
        null
      ),
      "mainImageUrl": mainImage.asset->url,
      "mainImageAlt": mainImage.alt
    }`,
    { slug },
  );
}

export async function getStoriesBySeriesSlugFromSanity(seriesSlug: string) {
  const client = getSanityClient();
  if (!client) return [] as StorySeriesEpisode[];

  const stories = await client.fetch<StorySeriesEpisode[]>(
    `*[_type == "storyPost" && defined(series->slug.current) && series->slug.current == $seriesSlug]
      | order(coalesce(episodeNumber, 9999) asc, coalesce(publishedAt, _createdAt) asc) {
      _id,
      title,
      "slug": slug.current,
      episodeNumber,
      publishedAt,
      summary,
      "series": {
        "title": series->title,
        "slug": series->slug.current
      }
    }`,
    { seriesSlug },
  );

  return (stories ?? []).filter((story) => story.slug);
}

export async function getSanityStorySlugs() {
  const client = getSanityClient();
  if (!client) return [] as string[];
  const slugs = await client.fetch<string[]>(`*[_type == "storyPost" && defined(slug.current)].slug.current`);
  return (slugs ?? []).filter(Boolean);
}

export async function getSanitySeriesSlugs() {
  const client = getSanityClient();
  if (!client) return [] as string[];
  const slugs = await client.fetch<string[]>(`*[_type == "storySeries" && defined(slug.current)].slug.current`);
  return (slugs ?? []).filter(Boolean);
}

export const getSanityStoryBySlug = getStoryBySlugFromSanity;
export const getSanityStoriesBySeries = getStoriesBySeriesSlugFromSanity;

export function portableTextToParagraphs(body?: PortableTextBlock[]) {
  if (!body || body.length === 0) return [] as string[];

  return body
    .filter((block) => block._type === "block" && (block.children?.length ?? 0) > 0)
    .map((block) =>
      (block.children ?? [])
        .filter((child) => child._type === "span")
        .map((child) => child.text)
        .join(""),
    )
    .map((text) => text.trim())
    .filter(Boolean);
}
