import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { buildPageMeta } from "@/lib/seo/pageMeta";

const LAST_UPDATED = "July 11, 2026";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildPageMeta({
      title: "Privacy · Gray Keep",
      description:
        "What Gray Keep collects, what we do not, and the control you keep. Trust is the operating principle.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacySection({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="space-y-6">
        <h2 className="display text-3xl md:text-4xl mb-5">{title}</h2>
        {children}
      </div>
    </Reveal>
  );
}

function PrivacyParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base md:text-xl text-muted-foreground leading-relaxed">{children}</p>
  );
}

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <Container size="narrow">
          <Reveal>
            <h1 className="display text-4xl md:text-6xl leading-[1.02]">Privacy</h1>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 space-y-6 max-w-3xl">
              <PrivacyParagraph>
                Trust is not decoration here. It is the operating principle - and it begins with how
                we treat yours.
              </PrivacyParagraph>
              <PrivacyParagraph>
                Gray Keep is independent, and that independence extends to you. We are not in the
                business of your data.
              </PrivacyParagraph>
              <PrivacyParagraph>
                This page explains, plainly, what we collect, what we do not, and the control you
                keep.
              </PrivacyParagraph>
            </div>
          </Reveal>

          <div className="mt-12 space-y-14">
            <PrivacySection title="What we collect - kept to a minimum" delay={120}>
              <PrivacyParagraph>
                <span className="text-foreground font-medium">How the work is read.</span> We use
                privacy-respecting analytics to understand which writing is read and how people
                find it: general things such as pages viewed, approximate region, and device type.
                We do not build advertising profiles, and we do not track you across other sites.
              </PrivacyParagraph>
              <PrivacyParagraph>
                <span className="text-foreground font-medium">What you choose to send us.</span> When
                you contact us, request availability, or subscribe, we receive what you provide -
                typically your name, email address, and your message, so that we can respond.
              </PrivacyParagraph>
            </PrivacySection>

            <PrivacySection title="What we do not do" delay={160}>
              <PrivacyParagraph>
                We do not run ads. We do not sell, rent, or trade your data. We do not share your
                information with anyone for their own marketing. Your reading is not a product.
              </PrivacyParagraph>
            </PrivacySection>

            <PrivacySection title="How we use what we hold" delay={200}>
              <PrivacyParagraph>
                Only for the reasons you would expect: to reply to you, to send what you asked for,
                and to improve the quality and relevance of the work. Nothing more.
              </PrivacyParagraph>
            </PrivacySection>

            <PrivacySection title="Cookies" delay={240}>
              <PrivacyParagraph>
                We use a small number of essential cookies to make the site function, and analytics
                cookies to understand readership. You can refuse non-essential cookies in your
                browser at any time without losing access to the writing.
              </PrivacyParagraph>
            </PrivacySection>

            <PrivacySection title="Service providers" delay={280}>
              <PrivacyParagraph>
                A few trusted providers help us operate - for hosting, analytics, and email
                delivery. They process data only on our behalf, under their own privacy terms, and
                never for their own purposes.
              </PrivacyParagraph>
              <ul className="space-y-3 text-base md:text-xl text-muted-foreground leading-relaxed list-none">
                <li>
                  <span className="text-foreground font-medium">Hosting:</span> Vercel
                </li>
                <li>
                  <span className="text-foreground font-medium">Analytics:</span> Vercel Web
                  Analytics
                </li>
                <li>
                  <span className="text-foreground font-medium">Email:</span> Resend
                </li>
              </ul>
            </PrivacySection>

            <PrivacySection title="How long we keep it" delay={320}>
              <PrivacyParagraph>
                We keep personal information only as long as it is needed for the purpose you gave
                it, and then we remove it.
              </PrivacyParagraph>
            </PrivacySection>

            <PrivacySection title="Changes" delay={360}>
              <PrivacyParagraph>
                If this policy changes, we will post the revised version here with a new date. Last
                updated: {LAST_UPDATED}.
              </PrivacyParagraph>
            </PrivacySection>

            <PrivacySection title="Contact" delay={400}>
              <PrivacyParagraph>
                Questions about privacy? Write to{" "}
                <a
                  href="mailto:contact@graykeep.ai"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
                >
                  contact@graykeep.ai
                </a>
                .
              </PrivacyParagraph>
            </PrivacySection>

            <Reveal delay={440}>
              <div className="pt-10 border-t border-border">
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                  The Keep guards what is entrusted to it. Yours included.
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
