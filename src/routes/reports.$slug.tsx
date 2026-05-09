import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { buildFlagshipMeta, getFlagshipReportBySlugFromSanity } from "@/lib/sanity/flagship";

export const Route = createFileRoute("/reports/$slug")({
  loader: async ({ params }) => {
    const report = await getFlagshipReportBySlugFromSanity(params.slug);
    if (!report) throw notFound();
    return report;
  },
  component: FlagshipReportPage,
});

function FlagshipReportPage() {
  const report = Route.useLoaderData();
  const meta = buildFlagshipMeta(report);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow eyebrow-gold mb-6">{report.tier}</p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02]">{report.title}</h1>
          </Reveal>
          <Reveal delay={100}>
            {meta ? (
              <div className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {meta}
              </div>
            ) : null}
            {report.mainImageUrl ? (
              <img
                src={report.mainImageUrl}
                alt={report.mainImageAlt ?? report.title}
                className="mt-8 w-full h-auto rounded-lg border border-border"
                loading="lazy"
              />
            ) : null}
            {report.summary ? (
              <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed">
                {report.summary}
              </p>
            ) : null}
            {report.bodyText ? (
              <p className="mt-8 text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {report.bodyText}
              </p>
            ) : null}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {report.ctaUrl ? (
                <a
                  href={report.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-primary inline-flex"
                >
                  Open external link
                </a>
              ) : null}
              <Link to="/intel" className="btn-pill btn-pill-ghost inline-flex">
                Back to Intel Library
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
