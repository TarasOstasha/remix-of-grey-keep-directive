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
      name: "contentType",
      title: "Content Type",
      type: "string",
      options: {
        list: [
          { title: "Dispatch", value: "Dispatch" },
          { title: "Method", value: "Method" },
        ],
        layout: "radio",
      },
      initialValue: "Dispatch",
      validation: (Rule) => Rule.required(),
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
      title: "Feature on home page (From The Keep)",
      type: "boolean",
      description:
        "When on, this article becomes the Intel card in the 'From The Keep' section on the home page. Only one Intel article should be featured at a time - if multiple are on, the most recently published wins.",
      initialValue: false,
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
      contentType: "contentType",
      featuredOnHome: "featuredOnHome",
    },
    prepare({ title, media, date, contentType, featuredOnHome }) {
      const parts: string[] = [];
      if (contentType) parts.push(contentType);
      if (featuredOnHome) parts.push("On home");
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
