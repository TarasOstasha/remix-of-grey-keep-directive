import { defineField, defineType } from "sanity";

export const intelArticle = defineType({
  name: "intelArticle",
  title: "Intel article",
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
      name: "featuredOnHome",
      title: "Feature on home page",
      type: "boolean",
      description:
        "When on, this article is used in the 'From The Keep' dispatch on the home page. Only one article should be featured at a time.",
      initialValue: false,
    }),
    defineField({
      name: "featuredAsFlagship",
      title: "Feature as flagship (Intel Library)",
      type: "boolean",
      description:
        "When on, this article fills the large flagship card on the home page under Intel Library. Only one article should be featured at a time.",
      initialValue: false,
    }),
    defineField({
      name: "flagshipTier",
      title: "Flagship tier label",
      type: "string",
      description: 'Shown on the flagship card, e.g. "Flagship Report". Leave empty to use the default.',
    }),
    defineField({
      name: "flagshipPageCount",
      title: "Flagship page count",
      type: "number",
      description: "Optional. Shown in the meta line on the home page flagship card.",
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: "flagshipReleaseLabel",
      title: "Flagship release label",
      type: "string",
      description:
        'Optional. E.g. "Released this quarter". If empty, the article publish date is used in the meta line.',
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      description: "Optional. Falls back to the article title when empty.",
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
      flagship: "featuredAsFlagship",
    },
    prepare({ title, media, date, flagship }) {
      const parts: string[] = [];
      if (flagship) parts.push("Flagship");
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
