import { Link, createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/advisory")({
  component: AdvisoryPage,
});

function AdvisoryPage() {
  const offerings = [
    {
      title: "Situation briefs",
      body: "Structured briefings on specific questions or regions. Clear, cited, and delivered in writing so your team can act on what they read.",
    },
    {
      title: "Source & methodology review",
      body: "We review internal or external reports for source quality, reasoning, and gaps. You get a concise assessment and recommendations.",
    },
    {
      title: "Scenario development & stress-testing",
      body: "Scenario development and red-team style stress-testing. We help you see around the corner before the threat arrives.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <div className="container-keep max-w-5xl">
          <Reveal>
            <h1 className="display text-4xl md:text-6xl leading-[1.02] max-w-4xl">
              Clarity that moves decisions
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-base md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
              Strategic advisory from Gray Keep is built for leadership teams who need to see
              clearly in the fog. We do not sell ongoing retainer relationships or dashboards.
              We deliver discrete engagements: situation briefs, source validation, scenario
              framing, and red-team style stress-testing.
            </p>
            <p className="mt-6 text-base md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
              Every engagement is scoped in advance. Deliverables are written. We cite what we
              use and distinguish between fact and inference. No advocacy, just clarity.
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
            <div className="mt-14 pt-10 border-t border-border">
              <p className="text-xl text-muted-foreground">
                For inquiries, reach out at{" "}
                <a className="text-foreground underline underline-offset-4" href="mailto:advisory@graykeep.com">
                  advisory@graykeep.com
                </a>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Or use our{" "}
                <Link to="/contact" className="text-foreground hover:underline">
                  contact form →
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
