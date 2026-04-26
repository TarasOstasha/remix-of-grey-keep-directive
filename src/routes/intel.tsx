import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { INTEL_ARTICLES } from "@/content/intelArticles";

export const Route = createFileRoute("/intel")({
  component: IntelPage,
});

function IntelPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = useMemo(
    () =>
      Array.from(
        new Set(INTEL_ARTICLES.flatMap((article) => article.tags)),
      ).sort(),
    [],
  );

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();
    return INTEL_ARTICLES.filter((article) => {
      const matchesSearch =
        !search ||
        article.title.toLowerCase().includes(search) ||
        article.summary.toLowerCase().includes(search) ||
        article.tags.some((tag) => tag.toLowerCase().includes(search));

      const matchesTag = activeTag === "All" || article.tags.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [activeTag, query]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-16 md:pt-52 md:pb-20 border-b border-border">
        <div className="container-keep">
          <Reveal>
            <p className="eyebrow mb-6">Intel Library</p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02] max-w-4xl">
              Reporting that separates signal from theatre.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              The Intel Library holds Gray Keep flagship reports, dispatches, and methods
              notes focused on state-aligned operations, infrastructure risk, and AI-enabled
              tradecraft.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-keep">
          <div className="max-w-3xl">
            <label className="eyebrow mb-2 block" htmlFor="intel-search">
              Search
            </label>
            <input
              id="intel-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, summary, or tag..."
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
            />
          </div>

          <div className="mt-8">
            <p className="eyebrow mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {["All", ...tags].map((tag) => {
                const isActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      isActive
                        ? "border-gold text-gold"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Reveal key={article.slug}>
                <Link
                  to="/intel/$slug"
                  params={{ slug: article.slug }}
                  className="card-flat p-6 block h-full transition-colors hover:border-gold/40"
                >
                  <p className="eyebrow eyebrow-gold">{article.category}</p>
                  <h2 className="display text-2xl leading-tight mt-3">{article.title}</h2>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{article.publishedAt}</span>
                    <span>{article.readTime}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
