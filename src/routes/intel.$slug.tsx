import { Link, createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { getIntelArticleBySlug } from "@/content/intelArticles";

export const Route = createFileRoute("/intel/$slug")({
  component: IntelArticlePage,
});

function IntelArticlePage() {
  const { slug } = Route.useParams();
  const article = getIntelArticleBySlug(slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Header />
        <section className="pt-40 pb-24 md:pt-52 md:pb-32">
          <div className="container-keep">
            <p className="eyebrow mb-4">Intel</p>
            <h1 className="display text-4xl md:text-6xl">Article not found.</h1>
            <Link to="/intel" className="btn-pill btn-pill-primary mt-8 inline-flex">
              Back to Intel Library
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

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
              <span>{article.publishedAt}</span>
              <span>{article.readTime}</span>
            </div>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed">
              {article.summary}
            </p>
            <p className="mt-8 text-base text-muted-foreground leading-relaxed">
              This is the article detail page for <strong>{article.title}</strong>. You can
              replace this placeholder with Sanity-rendered content when your publishing flow
              is connected.
            </p>
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
