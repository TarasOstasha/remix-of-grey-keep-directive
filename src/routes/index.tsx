import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HomePageSections } from "@/components/home/HomePageSections";
import { formatIntelContentTypeLabel, getIntelFromSanity, type IntelCard } from "@/lib/sanity/intel";
import { getStoriesFromSanity, type StoryCard, type StorySeriesCard } from "@/lib/sanity/stories";
import {
  getFlagshipReportFromSanity,
  resolveHomeFlagshipFromFeaturedReport,
} from "@/lib/sanity/flagship";
import { getHomePageFromSanity } from "@/lib/sanity/homePage";
import { getAdvisoryFromSanity } from "@/lib/sanity/advisory";
import { getSpeakingFromSanity } from "@/lib/sanity/speaking";
import { buildPageMeta } from "@/lib/seo/pageMeta";
import { optimizedImageSrc } from "@/lib/sanity/imageUrl";
import heroImg from "@/assets/hero-mountains.jpg";
import watchtowerImg from "@/assets/split-watchtower.jpg";
import keepImg from "@/assets/split-keep.jpg";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";

export const Route = createFileRoute("/")({
  head: ({ loaderData }) => {
    const base = buildPageMeta({
      title: "Gray Keep · Cyber Intelligence for an Uncertain World",
      description:
        "Strategic cyber intelligence, narrative analysis, and advisory for leaders navigating uncertainty.",
      path: "/",
    });

    const heroPreload = optimizedImageSrc(loaderData?.fromTheDesk?.imageUrl, heroImg, 1200);
    const links = [
      ...(base.links ?? []),
      { rel: "preload", as: "image", href: heroPreload, fetchPriority: "high" as const },
    ];

    return { meta: base.meta, links };
  },
  loader: async () => {
    const [intelArticles, storiesResult, flagshipReport, homePage, advisory, speaking] =
      await Promise.all([
      getIntelFromSanity(),
      getStoriesFromSanity(),
      getFlagshipReportFromSanity(),
      getHomePageFromSanity(),
      getAdvisoryFromSanity(),
      getSpeakingFromSanity(),
    ]);
    const homeFlagship = resolveHomeFlagshipFromFeaturedReport(flagshipReport);
    return {
      intelArticles,
      stories: storiesResult.stories,
      series: storiesResult.series,
      homeFlagship,
      fromTheDesk: homePage.fromTheDesk,
      homeSections: homePage.sections,
      advisory,
      speaking,
    };
  },
  staleTime: import.meta.env.PROD ? 60_000 : 0,
  shouldReload: !import.meta.env.PROD,
  component: Index,
});

function truncateWithEllipsis(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

const ROMAN_NUMERALS = [
  "",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

function toRoman(n: number | null) {
  if (n == null || !Number.isFinite(n) || n < 1) return null;
  return ROMAN_NUMERALS[n] ?? String(n);
}

type Dispatch = {
  key: string;
  fallbackImg: string;
  imageUrl: string | null;
  imageAlt: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  to: "/stories/$slug" | "/intel/$slug";
  params: { slug: string };
};

function pickFeaturedStory(stories: StoryCard[]): StoryCard | null {
  if (stories.length === 0) return null;
  const explicit = stories.find((story) => story.featuredOnHome);
  if (explicit) return explicit;
  const acheronEpisodes = stories
    .filter((story) => story.seriesSlug === "acheron")
    .sort((a, b) => (a.episodeNumber ?? Infinity) - (b.episodeNumber ?? Infinity));
  return acheronEpisodes[0] ?? stories[0];
}

function pickFeaturedIntel(articles: IntelCard[]): IntelCard | null {
  if (articles.length === 0) return null;
  const explicit = articles.find((article) => article.featuredOnHome);
  if (explicit) return explicit;
  const methodArticles = articles.filter((article) => article.contentType === "Method");
  return methodArticles[0] ?? articles[0];
}

type SplitCard = {
  key: string;
  fallbackImg: string;
  imageUrl: string | null;
  imageAlt: string;
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
} & (
  | { to: "/intel/$slug"; params: { slug: string } }
  | { to: "/stories/series/$seriesSlug"; params: { seriesSlug: string } }
);

function buildSplitCards(intel: IntelCard[], series: StorySeriesCard[]): SplitCard[] {
  const cards: SplitCard[] = [];

  const featuredIntel = pickFeaturedIntel(intel);
  if (featuredIntel) {
    cards.push({
      key: featuredIntel._id,
      fallbackImg: watchtowerImg,
      imageUrl: featuredIntel.mainImageUrl,
      imageAlt: featuredIntel.mainImageAlt ?? featuredIntel.title,
      eyebrow: formatIntelContentTypeLabel(featuredIntel.contentType),
      title: featuredIntel.title,
      sub: truncateWithEllipsis(featuredIntel.summary ?? "", 140),
      cta: "Read the assessment",
      to: "/intel/$slug",
      params: { slug: featuredIntel.slug },
    });
  }

  const featuredSeries = series.find((entry) => entry.featuredOnHome);
  if (featuredSeries) {
    cards.push({
      key: featuredSeries._id,
      fallbackImg: keepImg,
      imageUrl: featuredSeries.mainImageUrl,
      imageAlt: featuredSeries.mainImageAlt ?? featuredSeries.title,
      eyebrow: "A Series · Stories",
      title: featuredSeries.title,
      sub: truncateWithEllipsis(featuredSeries.premise ?? "", 140),
      cta: "Enter the series",
      to: "/stories/series/$seriesSlug",
      params: { seriesSlug: featuredSeries.slug },
    });
  }

  return cards;
}

function buildDispatches(stories: StoryCard[], intel: IntelCard[]): Dispatch[] {
  const dispatches: Dispatch[] = [];

  const story = pickFeaturedStory(stories);
  if (story) {
    const episodeRoman = toRoman(story.episodeNumber);
    const seriesLabel = story.seriesTitle ?? story.tags?.[0] ?? "Story";
    const kicker = episodeRoman ? `${seriesLabel} · Episode ${episodeRoman}` : seriesLabel;
    dispatches.push({
      key: story._id,
      fallbackImg: article1,
      imageUrl: story.mainImageUrl,
      imageAlt: story.mainImageAlt ?? story.title,
      kicker,
      title: story.title,
      body: truncateWithEllipsis(story.summary ?? "", 220),
      cta: "Read the assessment",
      to: "/stories/$slug",
      params: { slug: story.slug },
    });
  }

  const intelArticle = pickFeaturedIntel(intel);
  if (intelArticle) {
    const kicker = formatIntelContentTypeLabel(intelArticle.contentType);
    dispatches.push({
      key: intelArticle._id,
      fallbackImg: article2,
      imageUrl: intelArticle.mainImageUrl,
      imageAlt: intelArticle.mainImageAlt ?? intelArticle.title,
      kicker,
      title: intelArticle.title,
      body: truncateWithEllipsis(intelArticle.summary ?? "", 220),
      cta: "Read the assessment",
      to: "/intel/$slug",
      params: { slug: intelArticle.slug },
    });
  }

  return dispatches;
}

function Index() {
  const { intelArticles, stories, series, homeFlagship, fromTheDesk, homeSections, advisory, speaking } =
    Route.useLoaderData();
  const featuredIntelArticles = intelArticles.slice(0, 12);
  const dispatches = buildDispatches(stories, intelArticles);
  const splitCards = buildSplitCards(intelArticles, series);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HomePageSections
        sections={homeSections}
        fromTheDesk={fromTheDesk}
        featuredIntelArticles={featuredIntelArticles}
        homeFlagship={homeFlagship}
        splitCards={splitCards}
        dispatches={dispatches}
        advisory={advisory}
        speaking={speaking}
      />
      <Footer />
    </div>
  );
}
