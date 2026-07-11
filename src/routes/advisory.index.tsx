import { Link, createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { buildPageMeta } from "@/lib/seo/pageMeta";

export const Route = createFileRoute("/advisory/")({
  head: () =>
    buildPageMeta({
      title: "Advisory · Gray Keep",
      description:
        "Discrete advisory for boards and executives: situation briefs, source review, scenario stress-testing, and executive threat context.",
      path: "/advisory",
    }),
  component: AdvisoryPage,
});

function AdvisoryPage() {
  const offerings = [
    {
      title: "Situation Briefs",
      body: "Structured briefings on a specific question, region, actor set, incident pattern, or risk horizon. Clear, cited, written for decision-makers, and delivered in a form your team can use.",
    },
    {
      title: "Source and Methodology Review",
      body: "Independent review of internal or external reporting for source quality, reasoning, assumptions, gaps, and confidence language. You receive a concise assessment and recommendations for strengthening the work.",
    },
    {
      title: "Scenario Development and Stress-Testing",
      body: "Scenario framing and red-team style stress-testing for leaders who need to think ahead of the immediate event. The goal is not prediction theater. The goal is better preparation under uncertainty.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <Container>
          <Reveal>
            <h1 className="display text-4xl md:text-6xl leading-[1.02] max-w-4xl">
              Clarity that moves decisions
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-base md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
              Gray Keep Advisory is built for leadership teams that need clear judgment in the fog:
              boards, executives, founders, security leaders, investors, and operators facing cyber
              and geopolitical uncertainty.
            </p>
            <p className="mt-6 text-base md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
              This is not managed monitoring, incident response, or outsourced threat feeds.
              Advisory work is discrete, high-trust, and scoped around a specific decision,
              question, or risk horizon.
            </p>
            <p className="mt-6 text-base md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
              Typical engagements include situation briefs, source and methodology review, scenario
              framing, executive threat context, and red-team style stress-testing.
            </p>
            <p className="mt-6 text-base md:text-lg text-foreground leading-relaxed max-w-4xl">
              Every engagement is scoped in advance. Deliverables are written. We cite what we use,
              distinguish fact from inference, and state what remains uncertain. No advocacy. No
              noise. Just clarity.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-14">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-border" />
                <p className="display text-3xl">Offerings</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offerings.map((offering) => (
                  <article key={offering.title} className="card-flat p-7 md:p-8">
                    <h2 className="display text-3xl leading-tight">{offering.title}</h2>
                    <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                      {offering.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-14 pt-10 border-t border-border max-w-4xl">
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                For advisory inquiries, send a short note describing the question, decision, or risk
                horizon you are facing.
              </p>
              <p className="mt-6 text-base md:text-xl text-muted-foreground leading-relaxed">
                We respond where there is a clear fit and where the work can be scoped with
                integrity.
              </p>
              <p className="mt-8 text-xl text-muted-foreground">
                <Link to="/contact" className="text-foreground underline underline-offset-4">
                  Send an advisory inquiry
                </Link>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
