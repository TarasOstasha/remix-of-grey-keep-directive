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
              <div className="space-y-6">
                <h2 className="display text-3xl md:text-4xl mb-5">About</h2>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Gray Keep exists at the intersection of cyber intelligence, geopolitical risk, and
                  narrative memory.
                </p>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  In an uncertain world, leaders need two things: clear analysis they can act on,
                  and stories they can remember when reality begins to rhyme with fiction.
                </p>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  The Intel Library delivers structured, cited reporting for decision-makers. The
                  Stories section makes threat environments tangible. Advisory work supports leaders
                  who need context, framing, and judgment under pressure.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-6">
                <h2 className="display text-3xl md:text-4xl mb-5">Why we do this</h2>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  The fog of modern threat landscapes is real: too much noise, too little signal, too
                  many confident claims built on fragile assumptions.
                </p>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Gray Keep exists to cut through that fog with disciplined analysis, narrative
                  clarity, and structured judgment.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="space-y-6">
                <h2 className="display text-3xl md:text-4xl mb-5">Who we serve</h2>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Gray Keep serves leadership teams and decision-makers operating in fast-changing
                  cyber and geopolitical environments: CISOs, boards, founders, investors,
                  operators, and serious readers who would rather read one sharp assessment than
                  scroll through another feed.
                </p>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  The work is built for people who need context, not noise. Judgment, not volume.
                  Clarity, not comfort.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="pt-10 border-t border-border space-y-6">
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Gray Keep is founder-led and built by a cyber intelligence strategist focused on the
                  places where threat activity, geopolitical pressure, institutional risk, and human
                  judgment converge.
                </p>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Its work is shaped by political analysis, multilingual research, financial-sector
                  risk, and executive-facing intelligence reporting.
                </p>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  The founder remains deliberately quiet in the foreground. Gray Keep is not built
                  around a persona. It is built around the work: cited analysis, careful judgment,
                  memorable narrative, and a disciplined distinction between what is known, what is
                  inferred, and what remains uncertain.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="space-y-6">
                <h2 className="display text-3xl md:text-4xl mb-5">Independence</h2>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Gray Keep is independent.
                </p>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  We do not run ads. We do not sell reader data. We do not take editorial positions
                  on behalf of clients. Revenue comes from advisory engagements, commissioned work,
                  speaking, and readers or partners who choose to support the work.
                </p>
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  Independence matters because trust is not decoration here. It is the operating
                  principle.
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
