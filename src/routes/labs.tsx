import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { Link } from "@tanstack/react-router";
import { buildPageMeta } from "@/lib/seo/pageMeta";

export const Route = createFileRoute("/labs")({
  head: () =>
    buildPageMeta({
      title: "Gray Keep Labs · Restricted Preview",
      description:
        "The restricted research and product development arm of Gray Keep. Quietly built. Selectively shared.",
      path: "/labs",
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
                Researching the next layer of <span className="text-gold">cyber intelligence.</span>
              </h1>
            </Reveal>
            <Reveal className="lg:col-span-4 space-y-5">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Gray Keep Labs is the restricted research and product development arm of Gray Keep.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                It exists to explore emerging risk, build internal prototypes, test analytical
                methods, and prepare future software capabilities that extend Gray Keep’s
                intelligence work into more operational forms.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Public details will remain limited until the work is ready to stand on its own.
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
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Gray Keep Labs studies the places where cyber operations, AI-enabled systems,
              organizational trust, and decision-making pressure begin to converge. The work is
              exploratory by design: part method, part prototype, part warning system.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {[
              {
                k: "Research Methods",
                b: "Exploring analytical approaches for fast-changing threat environments where evidence is partial, ambiguous, or deliberately distorted.",
              },
              {
                k: "Scenario Analysis",
                b: "Testing structured ways of understanding uncertainty, escalation, second-order effects, and decision failure.",
              },
              {
                k: "Narrative Systems",
                b: "Studying how information, perception, behavior, and memory interact across digital environments.",
              },
              {
                k: "Operational Research",
                b: "Building internal frameworks that may support future intelligence capabilities, software tools, and trusted partner work.",
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

      {/* CTA */}
      <section className="pb-32 md:pb-40">
        <Container size="wide">
          <div className="card-flat rounded-2xl p-10 md:p-16 relative overflow-hidden">
            <div className="constellation opacity-40" aria-hidden="true" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8 space-y-6">
                <h3 className="display text-3xl md:text-5xl lg:text-6xl text-foreground">
                  Quietly built. Selectively shared.
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Select Gray Keep Labs initiatives may be shared with trusted partners and early
                  collaborators first. If your organization is working at the edge of cyber, AI,
                  institutional risk, or decision support, you may request a conversation.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                <Link to="/contact" className="btn-pill btn-pill-gold">
                  Request availability
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
