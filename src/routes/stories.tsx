import { Link, Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import { getStoriesFromSanity } from "@/lib/sanity/stories";
import { buildPageMeta } from "@/lib/seo/pageMeta";

export const Route = createFileRoute("/stories")({
  head: () =>
    buildPageMeta({
      title: "Stories · Gray Keep",
      description:
        "Fiction built from real threat environments. Gray Keep Stories make cyber risk memorable before it becomes familiar.",
      path: "/stories",
    }),
  loader: async () => getStoriesFromSanity(),
  component: StoriesPage,
});

function formatPublicationDate(value: string | null) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StoriesPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isStoriesIndex = pathname === "/stories";
  const { stories, series } = Route.useLoaderData();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeSeries, setActiveSeries] = useState<string>("All");
  const [activeTag, setActiveTag] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const tags = useMemo(
    () =>
      Array.from(new Set(stories.flatMap((story) => story.tags ?? [])))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [stories],
  );

  const seriesWithStats = useMemo(
    () =>
      series.map((entry) => {
        const episodes = stories.filter((story) => story.seriesSlug === entry.slug);
        const episodeCount = episodes.length;
        const totalReadingMinutes = episodes.reduce(
          (sum, story) => sum + story.readingTimeMinutes,
          0,
        );
        return {
          ...entry,
          episodeCount,
          totalReadingMinutes,
        };
      }),
    [series, stories],
  );

  const filteredStories = useMemo(() => {
    const q = query.trim().toLowerCase();

    return stories.filter((story) => {
      const matchesSearch =
        !q ||
        story.title?.toLowerCase().includes(q) ||
        story.summary?.toLowerCase().includes(q) ||
        story.seriesTitle?.toLowerCase().includes(q) ||
        (story.tags ?? []).some((tag) => tag.toLowerCase().includes(q));

      const matchesSeries =
        activeSeries === "All" || (story.seriesTitle ?? "Standalone") === activeSeries;
      const matchesTag = activeTag === "All" || (story.tags ?? []).includes(activeTag);

      return matchesSearch && matchesSeries && matchesTag;
    });
  }, [activeSeries, activeTag, query, stories]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeSeries, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filteredStories.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pagedStories = filteredStories.slice(startIndex, startIndex + pageSize);

  if (!isStoriesIndex) {
    return <Outlet />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4">If you remember it, you can defend against it</p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02] max-w-4xl">Stories</h1>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 space-y-6 max-w-3xl">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Stories are not decoration at Gray Keep. They are a way to make risk memorable
                before it becomes familiar.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                The fiction here is built from the atmosphere of real threat environments: old
                systems, human pressure, quiet compromise, institutional blind spots, and the
                moment when a small signal becomes impossible to ignore.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-12 max-w-2xl">
              <label className="eyebrow mb-2 block" htmlFor="stories-search">
                Search
              </label>
              <input
                id="stories-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, summary, series, or tag..."
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
              />
            </div>
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-14">
              <h2 className="display text-4xl">Browse by series</h2>
              <p className="mt-3 text-base text-muted-foreground">
                Each series is meant to be read in order. Continuity matters when the threat does.
              </p>
              {seriesWithStats.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {seriesWithStats.map((entry) => (
                    <Link
                      key={entry._id}
                      to="/stories/series/$seriesSlug"
                      params={{ seriesSlug: entry.slug }}
                      className="card-flat p-5 block hover:border-gold/40 transition-colors"
                    >
                      <p className="eyebrow eyebrow-gold">Series</p>
                      <p className="display text-2xl">{entry.title}</p>
                      {entry.premise ? (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                          {entry.premise}
                        </p>
                      ) : null}
                      <p className="mt-3 text-xs text-muted-foreground">
                        {entry.episodeCount} {entry.episodeCount === 1 ? "episode" : "episodes"} ·{" "}
                        {entry.totalReadingMinutes} min total
                      </p>
                      <p className="mt-4 text-sm text-foreground">Enter the series</p>
                    </Link>
                  ))}
                </div>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSeries("All")}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    activeSeries === "All"
                      ? "border-gold text-gold"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {series.map((entry) => (
                  <button
                    key={entry._id}
                    type="button"
                    onClick={() => setActiveSeries(entry.title)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      activeSeries === entry.title
                        ? "border-gold text-gold"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {entry.title}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-14">
              <h2 className="display text-4xl">All stories</h2>
              <p className="mt-3 text-base text-muted-foreground">
                Narrow the list by series or tags, or combine with search.
              </p>

              <div className="mt-6">
                <p className="eyebrow mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {["All", ...tags].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        activeTag === tag
                          ? "border-gold text-gold"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {filteredStories.length === 0 ? (
                <p className="mt-10 text-base text-muted-foreground">
                  No stories found. Add or publish `storyPost` documents in Sanity.
                </p>
              ) : (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pagedStories.map((story) => (
                    <Reveal key={story._id}>
                      <article
                        role="link"
                        tabIndex={0}
                        onClick={() =>
                          navigate({
                            to: "/stories/$slug",
                            params: { slug: story.slug },
                          })
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            navigate({
                              to: "/stories/$slug",
                              params: { slug: story.slug },
                            });
                          }
                        }}
                        className="card-flat overflow-hidden block h-full cursor-pointer"
                      >
                        {story.mainImageUrl ? (
                          <img
                            src={story.mainImageUrl}
                            alt={story.mainImageAlt ?? story.title}
                            className="h-44 w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-44 w-full bg-muted/20" />
                        )}
                        <div className="p-6">
                          <p className="eyebrow">Story</p>
                          <h3 className="display text-3xl mt-3 leading-tight">{story.title}</h3>
                          {story.summary ? (
                            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                              {story.summary}
                            </p>
                          ) : null}
                          <p className="mt-4 text-xs text-muted-foreground">
                            {formatPublicationDate(story.publishedAt) || "Unpublished"} ·{" "}
                            {story.readingTimeMinutes} min read
                          </p>
                          <p className="mt-4 text-sm text-foreground">Read the assessment</p>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              )}

              {filteredStories.length > pageSize ? (
                <nav
                  aria-label="Stories pagination"
                  className="mt-10 flex items-center justify-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={safePage === 1}
                    className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isActive = page === safePage;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                          isActive
                            ? "border-gold text-gold"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    disabled={safePage === totalPages}
                    className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              ) : null}
            </div>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
