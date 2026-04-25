import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-mountains.jpg";
import intelImg from "@/assets/intel-network.jpg";
import watchtowerImg from "@/assets/split-watchtower.jpg";
import keepImg from "@/assets/split-keep.jpg";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const INSIGHTS = [
  {
    n: "01",
    kicker: "Signal",
    title: "What the noise is hiding.",
    body: "A weekly read on the few movements that actually shift the board — and the many that only look like they do.",
  },
  {
    n: "02",
    kicker: "Threat Landscape",
    title: "The actors, in their own words.",
    body: "Primary-source assessments of state, criminal, and proxy operators — translated, contextualised, and stripped of vendor framing.",
  },
  {
    n: "03",
    kicker: "AI in the Shadows",
    title: "Where machine speed meets tradecraft.",
    body: "How adversaries are quietly rebuilding their workflows around models — and what that does to detection, attribution, and trust.",
  },
];

// Intel Library — distinct tiers, not a flat blog list
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
    detail:
      "Strategic context for decisions that sit between technology, policy, and reputation.",
  },
  {
    n: "04",
    verb: "Stand",
    line: "Beside the principal.",
    detail:
      "Quiet, retained advisory for founders, principals, and senior leaders under pressure.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* HERO — singular, spacious, with one restrained constellation layer */}
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
                  Quiet intelligence for an uncertain world.
                </p>
                <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-sm">
                  An intelligence journal and advisory practice for leaders who
                  need to read the room before they act in it.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a href="#intel-library" className="btn-pill btn-pill-primary">
                    Open the Intel Library
                  </a>
                  <a href="#from-the-keep" className="btn-pill btn-pill-ghost">
                    Read the stories
                  </a>
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

      {/* FEATURED INSIGHTS — sharpened, each tile has a distinct purpose */}
      <section
        id="insights"
        className="py-24 md:py-32 border-t border-border"
      >
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
                  A short, deliberate selection — updated as the picture changes,
                  not on a publishing schedule.
                </p>
              </Reveal>
            </div>
          </div>

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
        </div>
      </section>

      {/* INTEL LIBRARY — the intellectual spine, with a true tier hierarchy */}
      <section
        id="intel-library"
        className="py-24 md:py-32 border-t border-border"
      >
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
                  Flagship reports, recurring dispatches, and our own methods —
                  organised so analysts and executives can find what they need
                  and trust how it was made.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Flagship — the hero piece of the library, given its own scale */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <article className="card-flat p-10 md:p-14 h-full flex flex-col">
                  <span className="tier-chip tier-chip-flagship w-fit mb-10">
                    {FLAGSHIP.tier}
                  </span>
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

          {/* Dispatches & methods — clearly subordinate to the flagship */}
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
                  <span className="eyebrow eyebrow-gold col-span-2 md:col-span-1">
                    {d.n}
                  </span>
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

      {/* SPLIT CARDS — Intel & Stories, each with its own visual identity */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-keep grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              img: watchtowerImg,
              eyebrow: "Intel",
              title: "AI in the Shadows",
              sub: "How model-assisted intrusion is quietly reshaping the contest.",
              cta: "Read the assessment",
            },
            {
              img: keepImg,
              eyebrow: "A Series · Stories",
              title: "Acheron",
              sub: "A four-part cyber-espionage saga, written from the inside of the room.",
              cta: "Enter the series",
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
                  <h3 className="display text-4xl md:text-6xl leading-[0.95] mb-4">
                    {card.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-md">
                    {card.sub}
                  </p>
                  <a href="#" className="btn-pill btn-pill-ghost">
                    {card.cta}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW WE HELP — specific promises, not generic verbs */}
      <section
        id="how-we-help"
        className="py-24 md:py-32 border-t border-border"
      >
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
                  Engagements are deliberately small in number. The work is
                  done quietly, in writing and in person, and is rarely
                  attributable.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
            {HELP.map((h, i) => (
              <Reveal key={h.verb} delay={i * 90}>
                <div className="card-flat p-10 h-full min-h-[300px] rounded-none border-0 flex flex-col">
                  <p className="eyebrow eyebrow-gold mb-10">{h.n}</p>
                  <h3 className="display text-3xl md:text-4xl text-gold mb-2">
                    {h.verb}
                  </h3>
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

      {/* SPEAKING — prestigious framing, not a service list */}
      <section
        id="speaking"
        className="py-24 md:py-32 border-t border-border"
      >
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
                  Keynotes, closed briefings, and moderated conversations for
                  audiences that already know the basics — and need someone
                  willing to say what the field is actually thinking.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Source-language research across English, French, Spanish,
                  Russian and Mandarin. Comfortable with technical audiences,
                  policy audiences, and rooms that contain both.
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
              <a href="#" className="btn-pill btn-pill-primary">
                Request availability
              </a>
              <a href="#" className="btn-pill btn-pill-ghost">
                Advisory enquiries
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FROM THE KEEP — editorially curated, cleaner excerpts */}
      <section
        id="from-the-keep"
        className="py-24 md:py-32 border-t border-border"
      >
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
                  Notes, narrative, and method — published when there is
                  something worth saying.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14">
            {[
              {
                img: article1,
                kicker: "Acheron · Episode I",
                title: "The alert came at 03:17.",
                body: "By the time Mara reached the screen, the timeline was already wrong — and someone, somewhere, was counting on her not to notice.",
                cta: "Read the story",
              },
              {
                img: article2,
                kicker: "Method",
                title: "How we read the room.",
                body: "Our methodology in plain language: what we collect, how we weigh it, and why we are explicit about what we do not yet know.",
                cta: "Read the note",
              },
            ].map((a, i) => (
              <Reveal key={a.title} delay={i * 140}>
                <article className="group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border mb-8">
                    <img
                      src={a.img}
                      alt={a.title}
                      width={1280}
                      height={900}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <p className="eyebrow eyebrow-gold mb-4">{a.kicker}</p>
                  <h3 className="display text-3xl md:text-4xl leading-tight mb-4 group-hover:text-gold transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-prose mb-6">
                    {a.body}
                  </p>
                  <a href="#" className="link-arrow w-fit">
                    {a.cta} <span aria-hidden>→</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
