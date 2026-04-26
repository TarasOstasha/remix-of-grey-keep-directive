import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { getSanityStoriesBySeries } from "@/lib/sanity/stories";

export const Route = createFileRoute("/stories/series/$seriesSlug")({
  loader: async ({ params }) => {
    const episodes = await getSanityStoriesBySeries(params.seriesSlug);
    if (episodes.length === 0) {
      throw notFound();
    }
    return { episodes, seriesSlug: params.seriesSlug };
  },
  component: StoriesSeriesPage,
});

function StoriesSeriesPage() {
  const { episodes, seriesSlug } = Route.useLoaderData();
  const seriesTitle = episodes[0]?.series?.title ?? seriesSlug;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <div className="container-keep max-w-4xl">
          <Reveal>
            <Link
              to="/stories"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Stories
            </Link>
            <p className="eyebrow mt-8 mb-3">Series</p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02]">{seriesTitle}</h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {episodes.length} {episodes.length === 1 ? "episode" : "episodes"} in this series.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ol className="mt-10 space-y-6">
              {episodes.map((episode, index) => (
                <li key={episode._id}>
                  <Link
                    to="/stories/$slug"
                    params={{ slug: episode.slug }}
                    className="card-flat p-6 block cursor-pointer hover:border-gold/40 transition-colors"
                  >
                    <p className="eyebrow mb-2">Episode {episode.episodeNumber ?? index + 1}</p>
                    <p className="display text-2xl hover:text-gold transition-colors">
                      {episode.title}
                    </p>
                    {episode.summary ? (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {episode.summary}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
