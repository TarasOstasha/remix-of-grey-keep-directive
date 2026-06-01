import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { getIntelFromSanity } from "@/lib/sanity/intel";

export const Route = createFileRoute("/intel")({
  loader: async () => getIntelFromSanity(),
  component: IntelPage,
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

function truncateSummary(text: string | null, maxLength = 220) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function resolveIntelLabel(tags: string[]) {
  const normalized = tags.map((tag) => tag.toLowerCase());
  if (normalized.some((tag) => tag.includes("method"))) return "Method Note";
  if (normalized.some((tag) => tag.includes("report") || tag.includes("flagship"))) return "Report";
  return "Dispatch";
}

function IntelPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isIntelIndex = pathname === "/intel";
  const intelArticles = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = useMemo(
    () =>
      Array.from(
        new Set(intelArticles.flatMap((article) => article.tags)),
      ).sort(),
    [intelArticles],
  );

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();
    return intelArticles.filter((article) => {
      const matchesSearch =
        !search ||
        article.title.toLowerCase().includes(search) ||
        (article.summary ?? "").toLowerCase().includes(search) ||
        article.tags.some((tag) => tag.toLowerCase().includes(search));

      const matchesTag = activeTag === "All" || article.tags.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [activeTag, intelArticles, query]);

  if (!isIntelIndex) {
    return <Outlet />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-16 md:pt-52 md:pb-20 border-b border-border">
        <Container>
          <Reveal>
            <p className="eyebrow mb-6">Intel Library</p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02] max-w-4xl">
              Reporting that separates signal from noise.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              The Intel Library holds Gray Keep flagship reports, dispatches, and method notes
              focused on state-aligned operations, infrastructure risk, AI-enabled tradecraft, and
              the trust pathways that connect cyber events to institutional consequence.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
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

          <div className="mt-10 divide-y divide-border border-y border-border">
            {filteredArticles.length === 0 ? (
              <p className="px-2 py-8 text-base text-muted-foreground leading-relaxed">
                No matching pieces yet. Try another term, clear the filters, or return to the full
                library.
              </p>
            ) : (
              filteredArticles.map((article) => (
                <Reveal key={article.slug}>
                  <Link
                    to="/intel/$slug"
                    params={{ slug: article.slug }}
                    className="block px-2 py-6 md:py-8 transition-colors hover:bg-surface/30"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-6 items-start">
                      <div>
                        <p className="eyebrow eyebrow-gold">{resolveIntelLabel(article.tags)}</p>
                        <h2 className="display text-3xl leading-tight mt-2">{article.title}</h2>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {truncateSummary(article.summary)}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground md:text-right whitespace-nowrap">
                        <p>{formatPublicationDate(article.publishedAt)}</p>
                        <p className="mt-1">{article.readingTimeMinutes} min read</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))
            )}
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
