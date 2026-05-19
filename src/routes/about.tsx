import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow mb-6">About Gray Keep</p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02]">
              Analysis you can act on. Stories you remember.
            </h1>
          </Reveal>

          <div className="mt-12 space-y-14">
            <Reveal delay={80}>
              <div>
                <h2 className="display text-3xl md:text-4xl mb-5">About</h2>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Gray Keep exists at the intersection of cyber intelligence and narrative. In an
                  uncertain world, leaders need two things: clear analysis they can act on, and
                  stories they can remember. Our Intel Library delivers structured, cited reporting
                  for decision-makers. Our essays make threats tangible so that when reality echoes
                  fiction, you are already one step ahead.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <h2 className="display text-3xl md:text-4xl mb-5">Why we do this</h2>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  The fog of modern threat landscapes is real: too much noise, too little signal.
                  Gray Keep exists to cut through that with disciplined analysis, narrative clarity,
                  and structured judgment.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div>
                <h2 className="display text-3xl md:text-4xl mb-5">Who we serve</h2>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  We serve leadership teams and decision-makers who need to see clearly: CISOs,
                  boards, founders, and operators who would rather read one sharp report than scroll
                  through a feed. We serve leadership teams and decision-makers operating in
                  fast-changing cyber and geopolitical environments. Gray Keep focuses on context,
                  assessment, and strategic clarity.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div>
                <h2 className="display text-3xl md:text-4xl mb-5">Independence</h2>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Gray Keep is independent. We do not take positions on behalf of clients in
                  editorial work, we do not run ads, and we do not sell your data. Revenue comes
                  from advisory engagements and readers who choose to support the work.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="pt-10 border-t border-border">
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Gray Keep is founder-led and built by an intelligence practitioner with experience
                  across cyber threat intelligence, geopolitical analysis, financial-sector risk,
                  and executive-facing research.
                </p>
                <p className="mt-6 text-base md:text-xl text-muted-foreground leading-relaxed">
                  The studio exists to help leaders navigate fast-changing cyber and geopolitical
                  environments with disciplined analysis, narrative clarity, and structured
                  judgment.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
