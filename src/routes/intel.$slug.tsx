import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { getIntelBySlugFromSanity } from "@/lib/sanity/intel";

export const Route = createFileRoute("/intel/$slug")({
  loader: async ({ params }) => {
    const article = await getIntelBySlugFromSanity(params.slug);
    if (!article) throw notFound();
    return article;
  },
  component: IntelArticlePage,
});

function formatPublicationDate(value: string | null) {
  if (!value) return "Unpublished";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Unpublished";
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function IntelArticlePage() {
  const article = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <div className="container-keep max-w-3xl">
          <Reveal>
            <p className="eyebrow eyebrow-gold mb-6">{article.category}</p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02]">{article.title}</h1>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formatPublicationDate(article.publishedAt)}</span>
              <span>{article.readingTimeMinutes} min read</span>
            </div>
            {article.mainImageUrl ? (
              <img
                src={article.mainImageUrl}
                alt={article.mainImageAlt ?? article.title}
                className="mt-8 w-full h-auto rounded-lg border border-border"
                loading="lazy"
              />
            ) : null}
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed">
              {article.summary}
            </p>
            {article.bodyText ? (
              <p className="mt-8 text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {article.bodyText}
              </p>
            ) : null}
            <Link to="/intel" className="btn-pill btn-pill-ghost mt-10 inline-flex">
              Back to Intel Library
            </Link>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
