import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { buildPageMeta } from "@/lib/seo/pageMeta";
import { getAdvisoryBySlugFromSanity } from "@/lib/sanity/advisory";

export const Route = createFileRoute("/advisory/$slug")({
  loader: async ({ params }) => {
    const item = await getAdvisoryBySlugFromSanity(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    buildPageMeta({
      title: loaderData ? `${loaderData.verb} · Advisory · Gray Keep` : "Advisory · Gray Keep",
      description: loaderData?.oneLineEssence ?? "Gray Keep Advisory.",
      path: loaderData ? `/advisory/${loaderData.slug}` : "/advisory",
    }),
  component: AdvisoryDetailPage,
});

function AdvisoryDetailPage() {
  const item = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <Container size="narrow">
          <Reveal>
            <p className="eyebrow eyebrow-gold mb-6">Advisory</p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02] text-gold">{item.verb}</h1>
            <p className="mt-4 display text-2xl md:text-3xl text-foreground leading-snug">
              {item.tileFace}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed italic">
              {item.oneLineEssence}
            </p>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {item.fullContent}
            </p>
            <p className="mt-10 display text-2xl md:text-3xl text-foreground leading-snug">
              {item.closingLine}
            </p>
            <Link to="/advisory" className="btn-pill btn-pill-ghost mt-12 inline-flex">
              Back to Advisory
            </Link>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
