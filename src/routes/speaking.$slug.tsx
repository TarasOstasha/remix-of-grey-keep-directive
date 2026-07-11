import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { buildPageMeta } from "@/lib/seo/pageMeta";
import { getSpeakingBySlugFromSanity } from "@/lib/sanity/speaking";

export const Route = createFileRoute("/speaking/$slug")({
  loader: async ({ params }) => {
    const item = await getSpeakingBySlugFromSanity(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    buildPageMeta({
      title: loaderData ? `${loaderData.format} · Speaking · Gray Keep` : "Speaking · Gray Keep",
      description: loaderData?.oneLineEssence ?? "Gray Keep Speaking.",
      path: loaderData ? `/speaking/${loaderData.slug}` : "/",
    }),
  component: SpeakingDetailPage,
});

function SpeakingDetailPage() {
  const item = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow eyebrow-gold mb-6">Speaking</p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02] text-foreground">
              {item.format}
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed italic">
              {item.oneLineEssence}
            </p>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {item.fullContent}
            </p>
            <p className="mt-10 display text-2xl md:text-3xl text-foreground leading-snug italic">
              {item.closingLine}
            </p>
            <Link to="/" hash="speaking" className="btn-pill btn-pill-ghost mt-12 inline-flex">
              Back to Speaking
            </Link>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
