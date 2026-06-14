import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatIntelContentTypeLabel, type IntelCard } from "@/lib/sanity/intel";
import type { HomeFlagshipSlot } from "@/lib/sanity/flagship";
import type {
  HomeCustomSection,
  HomeFromTheDesk,
  HomeSection,
} from "@/lib/sanity/homePage";
import heroImg from "@/assets/hero-mountains.jpg";
import intelImg from "@/assets/intel-network.jpg";

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
    body: "Primary-source assessments of state, criminal, and proxy operators - translated, contextualized, and stripped of vendor framing.",
  },
  {
    n: "03",
    kicker: "AI in the Shadows",
    title: "Where machine speed meets tradecraft.",
    body: "How adversaries are quietly rebuilding their workflows around models - and what that does to detection, attribution, and trust.",
  },
];

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
    body: "Where the exposure is real, where it is theater, and what changed this month.",
  },
  {
    n: "03",
    tier: "Method",
    title: "AI-Enabled Tradecraft",
    body: "How we assess model-assisted intrusions without inflating the threat or dismissing it.",
  },
];

const HELP = [
  {
    n: "01",
    verb: "Brief",
    line: "Boards and executives",
    detail: "Focused intelligence briefs written for decision-makers.",
  },
  {
    n: "02",
    verb: "Translate",
    line: "Narrative risk",
    detail: "Complex threat activity turned into clear executive context.",
  },
  {
    n: "03",
    verb: "Frame",
    line: "Geopolitical cyber",
    detail: "Scenario framing for leaders operating under uncertainty.",
  },
  {
    n: "04",
    verb: "Stand",
    line: "Clarity under pressure",
    detail: "Clear judgment without noise, panic, or false certainty.",
  },
];

const SPEAKING_LINES = [
  {
    format: "Keynotes",
    desc: "Conference and leadership sessions on cyber, geopolitics, intelligence, and uncertainty.",
  },
  {
    format: "Boardroom",
    desc: "Executive and board briefings delivered in plain language, with clear assumptions and no theater.",
  },
  {
    format: "Private Sessions",
    desc: "Workshops, moderated conversations, and off-the-record briefings for invited audiences.",
  },
];

function truncateWithEllipsis(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
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

type HomePageSectionsProps = {
  sections: HomeSection[];
  fromTheDesk: HomeFromTheDesk;
  featuredIntelArticles: IntelCard[];
  homeFlagship: HomeFlagshipSlot | null;
  splitCards: SplitCard[];
  dispatches: Dispatch[];
};

function SectionCta({ label, url }: { label: string; url: string }) {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")) {
    return (
      <a href={url} className="btn-pill btn-pill-primary mt-10 inline-flex">
        {label}
      </a>
    );
  }

  return (
    <Link to={url} className="btn-pill btn-pill-primary mt-10 inline-flex">
      {label}
    </Link>
  );
}

function HomeCustomSectionBlock({ section }: { section: HomeCustomSection }) {
  const sectionId = section.sectionId ?? undefined;
  const layout = section.layout;

  if (layout === "centered") {
    return (
      <section id={sectionId} className="py-24 md:py-32 border-t border-border">
        <div className="container-keep max-w-3xl mx-auto text-center">
          <Reveal>
            {section.eyebrow ? <p className="eyebrow eyebrow-gold mb-6">{section.eyebrow}</p> : null}
            <h2 className="display text-4xl md:text-6xl text-foreground leading-[1.02]">
              {section.headline}
            </h2>
          </Reveal>
          {section.body ? (
            <Reveal delay={120}>
              <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </Reveal>
          ) : null}
          {section.ctaLabel && section.ctaUrl ? (
            <Reveal delay={180}>
              <SectionCta label={section.ctaLabel} url={section.ctaUrl} />
            </Reveal>
          ) : null}
        </div>
      </section>
    );
  }

  if (layout === "withImage" && section.imageUrl) {
    return (
      <section id={sectionId} className="py-24 md:py-32 border-t border-border">
        <div className="container-keep">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            <div className="lg:col-span-7">
              <Reveal>
                {section.eyebrow ? <p className="eyebrow eyebrow-gold mb-6">{section.eyebrow}</p> : null}
                <h2 className="display text-4xl md:text-6xl text-foreground leading-[1.02] mb-6">
                  {section.headline}
                </h2>
                {section.intro ? (
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                    {section.intro}
                  </p>
                ) : null}
                {section.body ? (
                  <p className="text-base text-muted-foreground leading-relaxed">{section.body}</p>
                ) : null}
                {section.ctaLabel && section.ctaUrl ? (
                  <SectionCta label={section.ctaLabel} url={section.ctaUrl} />
                ) : null}
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={160}>
                <div className="relative aspect-[4/5] lg:h-full overflow-hidden rounded-md border border-border">
                  <img
                    src={section.imageUrl}
                    alt={section.imageAlt ?? section.headline}
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
        </div>
      </section>
    );
  }

  return (
    <section id={sectionId} className="py-24 md:py-32 border-t border-border">
      <div className="container-keep">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-7">
            <Reveal>
              {section.eyebrow ? <p className="eyebrow mb-6">{section.eyebrow}</p> : null}
              <h2 className="display text-4xl md:text-6xl text-foreground leading-[1.02]">
                {section.headline}
              </h2>
            </Reveal>
          </div>
          {section.intro ? (
            <div className="lg:col-span-4 lg:pt-4">
              <Reveal delay={140}>
                <p className="text-base text-muted-foreground leading-relaxed">{section.intro}</p>
              </Reveal>
            </div>
          ) : null}
        </div>
        {section.imageUrl ? (
          <Reveal delay={120}>
            <div className="relative aspect-[16/8] md:aspect-[16/7] overflow-hidden rounded-md border border-border mb-10">
              <img
                src={section.imageUrl}
                alt={section.imageAlt ?? section.headline}
                width={1920}
                height={1080}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </Reveal>
        ) : null}
        {section.body ? (
          <Reveal delay={180}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {section.body}
            </p>
          </Reveal>
        ) : null}
        {section.ctaLabel && section.ctaUrl ? (
          <Reveal delay={220}>
            <SectionCta label={section.ctaLabel} url={section.ctaUrl} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function HeroSection({ fromTheDesk }: { fromTheDesk: HomeFromTheDesk }) {
  return (
    <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden">
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
                Predictive Cyber Intelligence for an Uncertain World
              </p>
              <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-sm">
                Gray Keep delivers strategic intelligence, narrative analysis, and advisory context
                for leaders making decisions in fast-changing cyber and geopolitical environments.
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-sm">
                The work lives in three forms: cited intelligence reporting, stories that make risk
                memorable, and private advisory for moments when judgment matters.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link to="/intel" className="btn-pill btn-pill-primary">
                  Read the assessment
                </Link>
                <Link to="/stories" className="btn-pill btn-pill-ghost">
                  Enter the series
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <div className="container-keep relative mt-20 md:mt-28">
        <Reveal delay={120}>
          <div className="relative aspect-[16/8] md:aspect-[16/7] overflow-hidden rounded-md border border-border">
            <img
              src={fromTheDesk.imageUrl ?? heroImg}
              alt={fromTheDesk.imageAlt}
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
              <p className="eyebrow eyebrow-gold mb-4">{fromTheDesk.eyebrow}</p>
              <p className="display text-3xl md:text-5xl text-foreground max-w-2xl leading-[1.05]">
                {fromTheDesk.headline}
              </p>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {fromTheDesk.body}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedInsightsSection({ featuredIntelArticles }: { featuredIntelArticles: IntelCard[] }) {
  return (
    <section id="insights" className="py-24 md:py-32 border-t border-border">
      <div className="container-keep">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">Featured</p>
              <h2 className="display text-4xl md:text-6xl text-foreground leading-[1.02]">
                Currents worth tracking
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pt-4">
            <Reveal delay={140}>
              <p className="text-base text-muted-foreground leading-relaxed">
                A short, deliberate selection - updated when the picture changes, not because a
                publishing calendar demands it.
              </p>
            </Reveal>
          </div>
        </div>
        {featuredIntelArticles.length > 0 ? (
          <Reveal delay={60}>
            <div className="relative px-12 md:px-14">
              <Carousel
                opts={{ align: "start", containScroll: "trimSnaps", loop: true }}
                className="rounded-md"
              >
                <div className="bg-border rounded-md overflow-hidden">
                  <CarouselContent className="-ml-px">
                    {featuredIntelArticles.map((article, i) => (
                      <CarouselItem key={article._id} className="pl-px basis-full md:basis-1/3">
                        <article className="card-flat p-10 h-full flex flex-col min-h-[300px] rounded-none border-0">
                          <div className="flex items-baseline justify-between mb-10">
                            <p className="eyebrow eyebrow-gold">{String(i + 1).padStart(2, "0")}</p>
                            <span className="tier-chip">
                              {formatIntelContentTypeLabel(article.contentType)}
                            </span>
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
                            Read the assessment <span aria-hidden>→</span>
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
                  <h3 className="display text-2xl md:text-3xl leading-tight mb-5">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed flex-1">{item.body}</p>
                  <a href="#" className="link-arrow mt-10 w-fit">
                    Read the assessment <span aria-hidden>→</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function IntelLibrarySection({
  featuredIntelArticles,
  homeFlagship,
}: {
  featuredIntelArticles: IntelCard[];
  homeFlagship: HomeFlagshipSlot | null;
}) {
  return (
    <section id="intel-library" className="py-24 md:py-32 border-t border-border">
      <div className="container-keep">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">{homeFlagship ? "Flagship Report" : "Intel Library"}</p>
              <h2 className="display text-4xl md:text-6xl text-foreground leading-[1.02]">
                Not a blog.
                <br />A working library.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pt-4">
            <Reveal delay={140}>
              <p className="text-base text-muted-foreground leading-relaxed">
                Flagship reports, recurring dispatches, method notes, and narrative analysis -
                organized so analysts, executives, and serious readers can understand what changed,
                why it matters, and what is still uncertain.
              </p>
            </Reveal>
          </div>
        </div>
        {homeFlagship ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <article className="card-flat p-10 md:p-14 h-full flex flex-col">
                  <span className="tier-chip tier-chip-flagship w-fit mb-10">{homeFlagship.tier}</span>
                  <h3 className="display text-4xl md:text-6xl text-foreground leading-[1.02] mb-6">
                    {homeFlagship.title}
                  </h3>
                  {homeFlagship.summary ? (
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
                      {homeFlagship.summary}
                    </p>
                  ) : null}
                  <div className="mt-auto flex flex-wrap items-center gap-6">
                    <Link
                      to="/reports/$slug"
                      params={{ slug: homeFlagship.reportSlug }}
                      className="btn-pill btn-pill-primary"
                    >
                      Read the report
                    </Link>
                    {homeFlagship.meta ? (
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        {homeFlagship.meta}
                      </p>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={160}>
                <div className="relative aspect-[4/5] lg:h-full overflow-hidden rounded-md border border-border">
                  <img
                    src={homeFlagship.imageUrl ?? intelImg}
                    alt={homeFlagship.imageAlt}
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
        ) : null}
        <Reveal delay={120}>
          <div className="rule-gold mb-10" />
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <p className="eyebrow">Dispatches & Methods</p>
            <Link to="/intel" className="link-arrow w-fit">
              Intel library <span aria-hidden>→</span>
            </Link>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {featuredIntelArticles.length > 0
              ? featuredIntelArticles.slice(0, 3).map((article, i) => (
                  <li key={article._id}>
                    <Link
                      to="/intel/$slug"
                      params={{ slug: article.slug }}
                      className="py-7 grid grid-cols-12 gap-4 md:gap-8 items-baseline group cursor-pointer"
                    >
                      <span className="eyebrow eyebrow-gold col-span-2 md:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="col-span-10 md:col-span-2">
                        <span className="tier-chip">
                          {formatIntelContentTypeLabel(article.contentType)}
                        </span>
                      </span>
                      <span className="col-span-12 md:col-span-5 text-xl md:text-2xl text-foreground group-hover:text-gold transition-colors">
                        {article.title}
                      </span>
                      <span className="col-span-12 md:col-span-4 text-sm text-muted-foreground leading-relaxed">
                        {truncateWithEllipsis(article.summary ?? "", 120)}
                      </span>
                    </Link>
                  </li>
                ))
              : DISPATCHES.map((d) => (
                  <li key={d.title}>
                    <Link
                      to="/intel"
                      className="py-7 grid grid-cols-12 gap-4 md:gap-8 items-baseline group cursor-pointer"
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
                    </Link>
                  </li>
                ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function SplitCardsSection({ splitCards }: { splitCards: SplitCard[] }) {
  if (splitCards.length === 0) return null;

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div
        className={`container-keep grid grid-cols-1 gap-6 ${splitCards.length === 2 ? "md:grid-cols-2" : ""}`}
      >
        {splitCards.map((card, i) => (
          <Reveal key={card.key} delay={i * 140}>
            <article className="group relative aspect-[4/5] overflow-hidden rounded-md border border-border">
              <img
                src={card.imageUrl ?? card.fallbackImg}
                alt={card.imageAlt}
                width={1280}
                height={1600}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-10">
                <p className="eyebrow eyebrow-gold mb-4">{card.eyebrow}</p>
                <h3 className="display text-4xl md:text-6xl leading-[0.95] mb-4">{card.title}</h3>
                {card.sub ? (
                  <p className="text-lg text-muted-foreground mb-8 max-w-md">{card.sub}</p>
                ) : null}
                {card.to === "/intel/$slug" ? (
                  <Link
                    to="/intel/$slug"
                    params={card.params}
                    className="btn-pill btn-pill-ghost"
                  >
                    {card.cta}
                  </Link>
                ) : (
                  <Link
                    to="/stories/series/$seriesSlug"
                    params={card.params}
                    className="btn-pill btn-pill-ghost"
                  >
                    {card.cta}
                  </Link>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowWeHelpSection() {
  return (
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
                Engagements are deliberately limited in number. The work is quiet, written, and
                designed for leaders who need judgment before they need volume.
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
                <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{h.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeakingSection() {
  return (
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
                Keynotes, executive briefings, and private sessions on cyber risk, intelligence
                tradecraft, AI-shaped threat environments, and decision-making under uncertainty -
                delivered with clarity, restraint, and practitioner judgment.
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal delay={260}>
          <ul className="divide-y divide-border border-y border-border mt-16 mb-12">
            {SPEAKING_LINES.map((line, i) => (
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
              Request availability
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FromTheKeepSection({ dispatches }: { dispatches: Dispatch[] }) {
  if (dispatches.length === 0) return null;

  return (
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
  );
}

export function HomePageSections({
  sections,
  fromTheDesk,
  featuredIntelArticles,
  homeFlagship,
  splitCards,
  dispatches,
}: HomePageSectionsProps) {
  return (
    <>
      {sections.map((section) => {
        if (!section.enabled) return null;

        if (section._type === "homeCustomSection") {
          return <HomeCustomSectionBlock key={section._key} section={section} />;
        }

        switch (section.section) {
          case "hero":
            return <HeroSection key={section._key} fromTheDesk={fromTheDesk} />;
          case "featuredInsights":
            return (
              <FeaturedInsightsSection
                key={section._key}
                featuredIntelArticles={featuredIntelArticles}
              />
            );
          case "intelLibrary":
            return (
              <IntelLibrarySection
                key={section._key}
                featuredIntelArticles={featuredIntelArticles}
                homeFlagship={homeFlagship}
              />
            );
          case "splitCards":
            return <SplitCardsSection key={section._key} splitCards={splitCards} />;
          case "howWeHelp":
            return <HowWeHelpSection key={section._key} />;
          case "speaking":
            return <SpeakingSection key={section._key} />;
          case "fromTheKeep":
            return <FromTheKeepSection key={section._key} dispatches={dispatches} />;
          default:
            return null;
        }
      })}
    </>
  );
}
