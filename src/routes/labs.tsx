import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Gray Keep Labs - Building the next layer of cyber intelligence" },
      {
        name: "description",
        content:
          "Gray Keep Labs is our research and development space for future cyber intelligence capabilities - AI-aware defense, predictive risk, and executive decision support.",
      },
      { property: "og:title", content: "Gray Keep Labs - Building the next layer of cyber intelligence" },
      {
        property: "og:description",
        content:
          "A research and development space for future Gray Keep cyber intelligence capabilities. Quietly built. Selectively shared.",
      },
      { name: "twitter:title", content: "Gray Keep Labs" },
      {
        name: "twitter:description",
        content:
          "A research and development space for future Gray Keep cyber intelligence capabilities.",
      },
    ],
  }),
  component: LabsPage,
});

function LabsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero - restrained, classified-research-wing tone */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 overflow-hidden">
        <div className="constellation" aria-hidden="true" />
        <Container size="wide" className="relative">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]" />
              <span className="eyebrow eyebrow-gold">Gray Keep Labs · Restricted Preview</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <Reveal className="lg:col-span-8">
              <h1 className="display text-5xl md:text-7xl lg:text-8xl text-foreground">
                Building the next layer of <span className="text-gold">cyber intelligence.</span>
              </h1>
            </Reveal>
            <Reveal className="lg:col-span-4">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Gray Keep Labs is where future Gray Keep research, software concepts, and
                experimental intelligence capabilities will live.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container size="wide">
        <div className="rule-gold" />
      </Container>

      {/* Core positioning */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">Positioning</p>
            </Reveal>
            <Reveal className="lg:col-span-8">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-snug tracking-tight">
                Gray Keep Labs is our research and development space for future cyber
                intelligence capabilities. We are exploring the next generation of AI-aware
                defense, predictive risk assessment, adversarial modeling, and executive
                decision support - for a world where digital systems act faster than
                traditional security models can govern.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container size="wide">
        <div className="rule-gold" />
      </Container>

      {/* Research Direction */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <Reveal>
            <p className="eyebrow mb-6">01 · Research Direction</p>
            <h2 className="display text-3xl md:text-5xl lg:text-6xl text-foreground max-w-3xl">
              Where machine speed meets institutional risk.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {[
              {
                k: "AI-aware defense",
                b: "Security postures designed for environments where adversaries - and defenders - operate at model speed.",
              },
              {
                k: "Predictive risk",
                b: "Moving from incident response to forward assessment: surfacing the exposure before it becomes the event.",
              },
              {
                k: "Adversarial modeling",
                b: "Studying how state, criminal, and emerging actors adapt their tradecraft as the underlying systems change.",
              },
              {
                k: "Executive decision support",
                b: "Tools and frames built for the people who must decide quickly, with incomplete information, and own the outcome.",
              },
            ].map((row) => (
              <div
                key={row.k}
                className="bg-background p-8 md:p-10 transition-colors duration-500 hover:bg-surface"
              >
                <p className="display text-xl md:text-2xl text-foreground">{row.k}</p>
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {row.b}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container size="wide">
        <div className="rule-gold" />
      </Container>

      {/* Coming Soon - restrained note */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">02 · Coming Soon</p>
            </Reveal>
            <Reveal className="lg:col-span-8">
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug tracking-tight">
                Select Gray Keep Labs initiatives will be shared with trusted partners and
                early collaborators first.
              </p>
              <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-xl">
                More will be revealed selectively, when the work is ready to stand on its own.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Early Access CTA */}
      <section className="pb-32 md:pb-40">
        <Container size="wide">
          <div className="card-flat rounded-2xl p-10 md:p-16 relative overflow-hidden">
            <div className="constellation opacity-40" aria-hidden="true" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <p className="eyebrow eyebrow-gold mb-6">Early Access</p>
                <h3 className="display text-3xl md:text-5xl lg:text-6xl text-foreground">
                  Quietly built. Selectively shared.
                </h3>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                <Link to="/contact" className="btn-pill btn-pill-gold">Request Early Access</Link>
                <Link to="/contact" className="btn-pill btn-pill-ghost">Contact Gray Keep</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
