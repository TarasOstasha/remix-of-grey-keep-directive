import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getIntelFromSanity, type IntelCard } from "@/lib/sanity/intel";
import { getStoriesFromSanity, type StoryCard } from "@/lib/sanity/stories";
import heroImg from "@/assets/hero-mountains.jpg";
import intelImg from "@/assets/intel-network.jpg";
import watchtowerImg from "@/assets/split-watchtower.jpg";
import keepImg from "@/assets/split-keep.jpg";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [intelArticles, storiesResult] = await Promise.all([
      getIntelFromSanity(),
      getStoriesFromSanity(),
    ]);
    return { intelArticles, stories: storiesResult.stories };
  },
  component: Index,
});

const INSIGHTS = [
  {
    n: "01",
    kicker: "Signal",
    title: "What the noise is hiding.",
    body: "A weekly read on the few movements that actually shift the board - and the many that only look like they do.",
  },
  {
    n: "02",
    kicker: "Threat Landscape",
    title: "The actors, in their own words.",
    body: "Primary-source assessments of state, criminal, and proxy operators - translated, contextualised, and stripped of vendor framing.",
  },
  {
    n: "03",
    kicker: "AI in the Shadows",
    title: "Where machine speed meets tradecraft.",
    body: "How adversaries are quietly rebuilding their workflows around models - and what that does to detection, attribution, and trust.",
  },
];

// Intel Library - distinct tiers, not a flat blog list
const FLAGSHIP = {
  tier: "Flagship Report",
  title: "The Quiet Front",
  sub: "An assessment of state-aligned cyber operations across Europe, 2024–2026.",
  meta: "112 pages · Released this quarter",
};

const DISPATCHES = [
  {
    n: "01",
    tier: "Dispatch",
    title: "Nation-State Campaigns",
    body: "Quarterly read on the operators worth watching, and the ones being overstated.",
  },
  {
    n: "02",
    tier: "Dispatch",
    title: "Critical Infrastructure",
    body: "Where the exposure is real, where it is theatre, and what changed this month.",
  },
  {
    n: "03",
    tier: "Method",
    title: "AI-Powered Attacks",
    body: "How we assess model-assisted intrusions without inflating the threat or dismissing it.",
  },
];

const HELP = [
  {
    n: "01",
    verb: "Brief",
    line: "Boards and executives.",
    detail:
      "Closed-room briefings on cyber, geopolitics, and the questions your team is not yet asking.",
  },
  {
    n: "02",
    verb: "Translate",
    line: "Narrative risk.",
    detail:
      "Turning ambiguous threat reporting into language a CEO, a regulator, or a journalist can act on.",
  },
  {
    n: "03",
    verb: "Frame",
    line: "Geopolitical cyber.",
    detail: "Strategic context for decisions that sit between technology, policy, and reputation.",
  },
  {
    n: "04",
    verb: "Stand",
    line: "Beside the principal.",
    detail: "Quiet, retained advisory for founders, principals, and senior leaders under pressure.",
  },
];

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
  const methodArticles = articles.filter((article) =>
    (article.tags ?? []).some((tag) => tag.toLowerCase() === "method"),
  );
  return methodArticles[0] ?? articles[0];
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
      cta: "Read the story",
      to: "/stories/$slug",
      params: { slug: story.slug },
    });
  }

  const intelArticle = pickFeaturedIntel(intel);
  if (intelArticle) {
    const kicker = intelArticle.tags?.[0] ?? "Intel";
    dispatches.push({
      key: intelArticle._id,
      fallbackImg: article2,
      imageUrl: intelArticle.mainImageUrl,
      imageAlt: intelArticle.mainImageAlt ?? intelArticle.title,
      kicker,
      title: intelArticle.title,
      body: truncateWithEllipsis(intelArticle.summary ?? "", 220),
      cta: "Read the note",
      to: "/intel/$slug",
      params: { slug: intelArticle.slug },
    });
  }

  return dispatches;
}

function Index() {
  const { intelArticles, stories } = Route.useLoaderData();
  const featuredIntelArticles = intelArticles.slice(0, 12);
  const dispatches = buildDispatches(stories, intelArticles);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* HERO - singular, spacious, with one restrained constellation layer */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden">
        {/* The one place we use the constellation motif */}
        <div className="constellation" aria-hidden />

        <div className="container-keep relative">
          <Reveal>
            <p className="eyebrow mb-12">Gray Keep · Est. 2026</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={80}>
                <h1 className="display text-[18vw] sm:text-[14vw] lg:text-[10.5rem] xl:text-[12rem] leading-[0.92] text-foreground">
                  GRAY
                  <br />
                  KEEP
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:pb-6">
              <Reveal delay={220}>
                <p className="text-lg md:text-xl text-foreground leading-snug max-w-sm">
                  Predictive Cyber Intelligence for an AI-Shaped Threat Landscape
                </p>
                <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-sm">
                  Gray Keep delivers strategic intelligence and advisory context for leaders making
                  decisions in fast-changing cyber and geopolitical environments.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link to="/intel" className="btn-pill btn-pill-primary">
                    Open the Intel Library
                  </Link>
                  <Link to="/stories" className="btn-pill btn-pill-ghost">
                    Read the Stories
                  </Link>
                  {/* <a href="#intel-library" className="btn-pill btn-pill-primary">
                    Open the Intel Library
                  </a>
                  <a href="#from-the-keep" className="btn-pill btn-pill-ghost">
                    Read the stories
                  </a> */}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Singular hero image, treated as one expensive decision */}
        <div className="container-keep relative mt-20 md:mt-28">
          <Reveal delay={120}>
            <div className="relative aspect-[16/8] md:aspect-[16/7] overflow-hidden rounded-md border border-border">
              <img
                src={heroImg}
                alt="A long mountain ridgeline fading into mist at first light"
                width={1920}
                height={1080}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
                <p className="eyebrow eyebrow-gold mb-4">From the desk</p>
                <p className="display text-3xl md:text-5xl text-foreground max-w-2xl leading-[1.05]">
                  We do not sell comfort. We offer a clear view.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED INSIGHTS - sharpened, each tile has a distinct purpose */}
      <section id="insights" className="py-24 md:py-32 border-t border-border">
        <div className="container-keep">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-6">Featured</p>
                <h2 className="display text-4xl md:text-6xl text-foreground leading-[1.02]">
                  Three currents
                  <br />
                  worth tracking.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:pt-4">
              <Reveal delay={140}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  A short, deliberate selection - updated as the picture changes, not on a
                  publishing schedule.
                </p>
              </Reveal>
            </div>
          </div>

          {featuredIntelArticles.length > 0 ? (
            <Reveal delay={60}>
              <div className="relative px-12 md:px-14">
                <Carousel
                  opts={{
                    align: "start",
                    containScroll: "trimSnaps",
                    loop: true,
                  }}
                  className="rounded-md"
                >
                  <div className="bg-border rounded-md overflow-hidden">
                    <CarouselContent className="-ml-px">
                      {featuredIntelArticles.map((article, i) => (
                        <CarouselItem key={article._id} className="pl-px basis-full md:basis-1/3">
                          <article className="card-flat p-10 h-full flex flex-col min-h-[300px] rounded-none border-0">
                            <div className="flex items-baseline justify-between mb-10">
                              <p className="eyebrow eyebrow-gold">
                                {String(i + 1).padStart(2, "0")}
                              </p>
                              <span className="tier-chip">{article.tags?.[0] || "Intel"}</span>
                            </div>
                            <h3 className="display text-2xl md:text-3xl leading-tight mb-5">
                              {article.title}
                            </h3>
                            <p className="text-base text-muted-foreground leading-relaxed flex-1">
                              {truncateWithEllipsis(
                                article.summary || "No summary available yet.",
                                115,
                              )}
                            </p>
                            <Link
                              to="/intel/$slug"
                              params={{ slug: article.slug }}
                              className="link-arrow mt-10 w-fit"
                            >
                              Read <span aria-hidden>→</span>
                            </Link>
                          </article>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </div>
                  <CarouselPrevious className="-left-10 md:-left-14 border-border bg-card text-foreground hover:bg-muted" />
                  <CarouselNext className="-right-10 md:-right-14 border-border bg-card text-foreground hover:bg-muted" />
                </Carousel>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
              {INSIGHTS.map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <article className="card-flat p-10 h-full flex flex-col min-h-[300px] rounded-none border-0">
                    <div className="flex items-baseline justify-between mb-10">
                      <p className="eyebrow eyebrow-gold">{item.n}</p>
                      <span className="tier-chip">{item.kicker}</span>
                    </div>
                    <h3 className="display text-2xl md:text-3xl leading-tight mb-5">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed flex-1">
                      {item.body}
                    </p>
                    <a href="#" className="link-arrow mt-10 w-fit">
                      Read <span aria-hidden>→</span>
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* INTEL LIBRARY - the intellectual spine, with a true tier hierarchy */}
      <section id="intel-library" className="py-24 md:py-32 border-t border-border">
        <div className="container-keep">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-6">Intel Library</p>
                <h2 className="display text-4xl md:text-6xl text-foreground leading-[1.02]">
                  Not a blog.
                  <br />A working library.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:pt-4">
              <Reveal delay={140}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Flagship reports, recurring dispatches, and our own methods - organised so
                  analysts and executives can find what they need and trust how it was made.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Flagship - the hero piece of the library, given its own scale */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <article className="card-flat p-10 md:p-14 h-full flex flex-col">
                  <span className="tier-chip tier-chip-flagship w-fit mb-10">{FLAGSHIP.tier}</span>
                  <h3 className="display text-4xl md:text-6xl text-foreground leading-[1.02] mb-6">
                    {FLAGSHIP.title}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
                    {FLAGSHIP.sub}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-6">
                    <a href="#" className="btn-pill btn-pill-primary">
                      Read the report
                    </a>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {FLAGSHIP.meta}
                    </p>
                  </div>
                </article>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={160}>
                <div className="relative aspect-[4/5] lg:h-full overflow-hidden rounded-md border border-border">
                  <img
                    src={intelImg}
                    alt="A faint, structured network of points and lines against deep grey"
                    width={1280}
                    height={1600}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Dispatches & methods - clearly subordinate to the flagship */}
          <Reveal delay={120}>
            <div className="rule-gold mb-10" />
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <p className="eyebrow">Dispatches & Methods</p>
              <a href="#" className="link-arrow w-fit">
                Browse the library <span aria-hidden>→</span>
              </a>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {DISPATCHES.map((d) => (
                <li
                  key={d.title}
                  className="py-7 grid grid-cols-12 gap-4 md:gap-8 items-baseline group"
                >
                  <span className="eyebrow eyebrow-gold col-span-2 md:col-span-1">{d.n}</span>
                  <span className="col-span-10 md:col-span-2">
                    <span className="tier-chip">{d.tier}</span>
                  </span>
                  <span className="col-span-12 md:col-span-5 text-xl md:text-2xl text-foreground group-hover:text-gold transition-colors">
                    {d.title}
                  </span>
                  <span className="col-span-12 md:col-span-4 text-sm text-muted-foreground leading-relaxed">
                    {d.body}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SPLIT CARDS - Intel & Stories, each with its own visual identity */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-keep grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              img: watchtowerImg,
              eyebrow: "Intel",
              title: "AI in the Shadows",
              sub: "How model-assisted intrusion is quietly reshaping the contest.",
              cta: "Read the assessment",
              linkTo: "/intel/$slug" as const,
              linkParams: { slug: "ai-in-the-shadows" },
            },
            {
              img: keepImg,
              eyebrow: "A Series · Stories",
              title: "Acheron",
              sub: "A cyber-espionage saga, written from the inside of the room.",
              cta: "Enter the series",
              linkTo: "/stories/series/$seriesSlug" as const,
              linkParams: { seriesSlug: "acheron" },
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 140}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-md border border-border">
                <img
                  src={card.img}
                  alt={card.title}
                  width={1280}
                  height={1600}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-10">
                  <p className="eyebrow eyebrow-gold mb-4">{card.eyebrow}</p>
                  <h3 className="display text-4xl md:text-6xl leading-[0.95] mb-4">{card.title}</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-md">{card.sub}</p>
                  <Link
                    to={card.linkTo}
                    params={card.linkParams}
                    className="btn-pill btn-pill-ghost"
                  >
                    {card.cta}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW WE HELP - specific promises, not generic verbs */}
      <section id="how-we-help" className="py-24 md:py-32 border-t border-border">
        <div className="container-keep">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-6">Advisory</p>
                <h2 className="display text-4xl md:text-6xl text-foreground leading-[1.02]">
                  What we actually do
                  <br />
                  for the people we work with.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:pt-4">
              <Reveal delay={140}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Engagements are deliberately small in number. The work is done quietly, in writing
                  and in person, and is rarely attributable.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
            {HELP.map((h, i) => (
              <Reveal key={h.verb} delay={i * 90}>
                <div className="card-flat p-10 h-full min-h-[300px] rounded-none border-0 flex flex-col">
                  <p className="eyebrow eyebrow-gold mb-10">{h.n}</p>
                  <h3 className="display text-3xl md:text-4xl text-gold mb-2">{h.verb}</h3>
                  <p className="display text-xl md:text-2xl text-foreground leading-snug mb-6">
                    {h.line}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
                    {h.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKING - prestigious framing, not a service list */}
      <section id="speaking" className="py-24 md:py-32 border-t border-border">
        <div className="container-keep">
          <Reveal>
            <p className="eyebrow mb-12">Speaking</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal delay={80}>
                <h2 className="display text-5xl md:text-7xl text-foreground leading-[1.02] mb-12">
                  A voice in the room,
                  <br />
                  not a slide on a screen.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <Reveal delay={140}>
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  Keynotes and briefings for leadership audiences - cyber risk, intel tradecraft,
                  and decision-making under uncertainty, delivered with clarity and no theater.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Ability to conduct research and to navigate complex threat landscapes in multiple
                  languages, getting and analyzing the best data from the source itself, directly.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={260}>
            <ul className="divide-y divide-border border-y border-border mt-16 mb-12">
              {[
                {
                  format: "Keynote",
                  desc: "Conference and headline sessions on cyber, geopolitics, and decision-making under uncertainty.",
                },
                {
                  format: "Boardroom",
                  desc: "Executive and board briefings, delivered in plain language with no slide theatre.",
                },
                {
                  format: "Private",
                  desc: "Workshops, moderated panels, and off-the-record conversations for invited audiences.",
                },
              ].map((line, i) => (
                <li
                  key={line.format}
                  className="py-7 grid grid-cols-12 gap-4 md:gap-8 items-baseline"
                >
                  <span className="eyebrow eyebrow-gold col-span-2 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 md:col-span-3 text-xl md:text-2xl text-foreground">
                    {line.format}
                  </span>
                  <span className="col-span-12 md:col-span-8 text-base text-muted-foreground leading-relaxed">
                    {line.desc}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={340}>
            <div id="enter" className="flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-pill btn-pill-primary">
                Request availability
              </Link>
              <Link to="/advisory" className="btn-pill btn-pill-ghost">
                Advisory enquiries
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FROM THE KEEP - editorially curated, cleaner excerpts (Sanity-driven) */}
      {dispatches.length > 0 && (
        <section id="from-the-keep" className="py-24 md:py-32 border-t border-border">
          <div className="container-keep">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="eyebrow mb-6">From The Keep</p>
                  <h2 className="display text-4xl md:text-6xl text-foreground leading-[1.02]">
                    Recent dispatches.
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-4 lg:pt-4">
                <Reveal delay={140}>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Notes, narrative, and method - published when there is something worth saying.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14">
              {dispatches.map((dispatch, i) => (
                <Reveal key={dispatch.key} delay={i * 140}>
                  <article className="group">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border mb-8">
                      <img
                        src={dispatch.imageUrl ?? dispatch.fallbackImg}
                        alt={dispatch.imageAlt}
                        width={1280}
                        height={900}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    </div>
                    <p className="eyebrow eyebrow-gold mb-4">{dispatch.kicker}</p>
                    <h3 className="display text-3xl md:text-4xl leading-tight mb-4 group-hover:text-gold transition-colors">
                      {dispatch.title}
                    </h3>
                    {dispatch.body ? (
                      <p className="text-base text-muted-foreground leading-relaxed max-w-prose mb-6">
                        {dispatch.body}
                      </p>
                    ) : null}
                    <Link to={dispatch.to} params={dispatch.params} className="link-arrow w-fit">
                      {dispatch.cta} <span aria-hidden>→</span>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
