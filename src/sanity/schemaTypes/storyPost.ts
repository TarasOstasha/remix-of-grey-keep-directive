import { defineField, defineType } from "sanity";

export const storyPost = defineType({
  name: "storyPost",
  title: "Story post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Brief description for screen readers and SEO.",
        }),
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "reference",
      to: [{ type: "storySeries" }],
    }),
    defineField({
      name: "episodeNumber",
      title: "Episode number",
      type: "number",
    }),
    defineField({
      name: "featuredOnHome",
      title: "Feature on home page",
      type: "boolean",
      description:
        "When on, this story is used in the 'From The Keep' dispatch on the home page. Only one story should be featured at a time.",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      description: "Optional. Falls back to the story title when empty.",
      validation: (Rule) => Rule.max(70).warning("Keep under ~70 characters for search results."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "Optional. Used for meta description and previews.",
      validation: (Rule) =>
        Rule.max(160).warning("Keep under ~160 characters for search snippets."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      date: "publishedAt",
      episode: "episodeNumber",
      seriesTitle: "series.title",
    },
    prepare({ title, media, date, episode, seriesTitle }) {
      const parts: string[] = [];
      if (seriesTitle) parts.push(String(seriesTitle));
      if (episode != null) parts.push(`Ep. ${episode}`);
      if (date) {
        parts.push(
          new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        );
      }
      return {
        title: title || "Untitled",
        subtitle: parts.length ? parts.join(" · ") : undefined,
        media,
      };
    },
  },
});
