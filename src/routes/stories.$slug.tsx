import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Container";
import {
  getSanityStoriesBySeries,
  getSanityStoryBySlug,
  portableTextToParagraphs,
} from "@/lib/sanity/stories";

export const Route = createFileRoute("/stories/$slug")({
  loader: async ({ params }) => {
    const story = await getSanityStoryBySlug(params.slug);
    if (!story) {
      throw notFound();
    }

    const episodes = story.series?.slug
      ? await getSanityStoriesBySeries(story.series.slug)
      : [];

    return { story, episodes };
  },
  component: StoryDetailPage,
});

function StoryDetailPage() {
  const { story, episodes } = Route.useLoaderData();

  const paragraphs = portableTextToParagraphs(story.body);
  const currentIndex = episodes.findIndex((episode) => episode.slug === story.slug);
  const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex >= 0 && currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 border-b border-border">
        <Container className="max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-4">
              {story.series?.title ?? story.seriesTitle ?? "Standalone"}
              {story.tags?.[0] ? ` · ${story.tags[0]}` : ""}
            </p>
            <h1 className="display text-4xl md:text-6xl leading-[1.02]">{story.title}</h1>
          </Reveal>
          {story.mainImageUrl ? (
            <Reveal delay={80}>
              <img
                src={story.mainImageUrl}
                alt={story.mainImageAlt ?? story.title}
                className="mt-8 w-full h-auto rounded-lg border border-border"
              />
            </Reveal>
          ) : null}
          <Reveal delay={120}>
            {story.summary ? (
              <p className="mt-8 text-base md:text-xl text-muted-foreground leading-relaxed">
                {story.summary}
              </p>
            ) : null}
            {story.series?.slug ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Series:{" "}
                <Link
                  to="/stories/series/$seriesSlug"
                  params={{ seriesSlug: story.series.slug }}
                  className="text-foreground underline underline-offset-4 hover:text-gold transition-colors"
                >
                  {story.series.title}
                </Link>
              </p>
            ) : null}
            {paragraphs.length > 0 ? (
              <div className="mt-10 space-y-6">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-base text-muted-foreground leading-relaxed">
                This story has no body content yet in Sanity.
              </p>
            )}
            {(prevEpisode || nextEpisode) && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {prevEpisode ? (
                    <Link
                      to="/stories/$slug"
                      params={{ slug: prevEpisode.slug }}
                      className="card-flat p-5 block h-full"
                    >
                      <p className="eyebrow">Previous</p>
                      <p className="display text-2xl mt-2">{prevEpisode.title}</p>
                    </Link>
                  ) : null}
                </div>
                <div>
                  {nextEpisode ? (
                    <Link
                      to="/stories/$slug"
                      params={{ slug: nextEpisode.slug }}
                      className="card-flat p-5 block h-full"
                    >
                      <p className="eyebrow">Next</p>
                      <p className="display text-2xl mt-2">{nextEpisode.title}</p>
                    </Link>
                  ) : null}
                </div>
              </div>
            )}
            <Link to="/stories" className="btn-pill btn-pill-ghost mt-10 inline-flex">
              Back to Stories
            </Link>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
