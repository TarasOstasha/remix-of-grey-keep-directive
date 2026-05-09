import { defineField, defineType } from "sanity";

export const flagshipReport = defineType({
  name: "flagshipReport",
  title: "Flagship report",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'The report name, e.g. "The Quiet Front".',
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
      name: "tier",
      title: "Tier label",
      type: "string",
      description:
        'Kicker shown above the title. Defaults to "Flagship Report"; override for special editions.',
      initialValue: "Flagship Report",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Short pitch shown under the title on the home page.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      description: "Long-form report content shown on the report page.",
    }),
    defineField({
      name: "pageCount",
      title: "Page count",
      type: "number",
      description: "Used in the meta line, e.g. '112 pages · Released this quarter'.",
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: "releaseLabel",
      title: "Release label",
      type: "string",
      description:
        "Free-form release line, e.g. 'Released this quarter'. Falls back to the formatted release date when empty.",
    }),
    defineField({
      name: "releaseDate",
      title: "Release date",
      type: "datetime",
      description: "Used for sorting and as a fallback for the release label.",
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
      name: "ctaUrl",
      title: "External report URL (optional)",
      type: "url",
      description:
        "Optional. If set, a secondary 'Download PDF / external' link appears next to 'Read the report'. The 'Read the report' button always opens the in-app report page.",
    }),
    defineField({
      name: "featuredOnHome",
      title: "Feature on home page",
      type: "boolean",
      description:
        "When on, this report appears in the large flagship card under Intel Library on the home page. When off, it is hidden from that slot (the page still works at its URL). Only one report should be featured at a time.",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "Meta title (SEO)",
      type: "string",
      description: "Optional. Used for the browser tab and search results. Falls back to the report title when empty.",
      validation: (Rule) => Rule.max(70).warning("Keep under ~70 characters for search results."),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description (SEO)",
      type: "text",
      rows: 3,
      description:
        "Optional. Used for the page meta description and social previews. Falls back to the summary when empty.",
      validation: (Rule) =>
        Rule.max(160).warning("Keep under ~160 characters for search snippets."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      releaseDate: "releaseDate",
      featured: "featuredOnHome",
    },
    prepare({ title, media, releaseDate, featured }) {
      const parts: string[] = [];
      if (featured) parts.push("Featured");
      if (releaseDate) {
        parts.push(
          new Date(releaseDate).toLocaleDateString(undefined, {
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
