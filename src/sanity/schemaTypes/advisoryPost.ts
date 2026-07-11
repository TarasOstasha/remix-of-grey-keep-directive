import { defineField, defineType } from "sanity";

export const advisoryPost = defineType({
  name: "advisoryPost",
  title: "Advisory post",
  type: "document",
  fields: [
    defineField({
      name: "verb",
      title: "Verb",
      type: "string",
      description: 'Gold headline on the card, e.g. "Brief".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL for the advisory detail page.",
      options: { source: "verb", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tileFace",
      title: "Tile face",
      type: "string",
      description: 'Audience or focus shown on the card, e.g. "Boards & executives".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "oneLineEssence",
      title: "One-line essence",
      type: "text",
      rows: 2,
      description: "Short italic line on the card face.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullContent",
      title: "Full content",
      type: "text",
      rows: 8,
      description: "Full advisory copy for the expanded or detail view.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "closingLine",
      title: "Closing line",
      type: "text",
      rows: 2,
      description: "Italic closing line after the full content.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
    defineField({
      name: "enabled",
      title: "Show on home page",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { verb: "verb", tileFace: "tileFace", enabled: "enabled" },
    prepare({ verb, tileFace, enabled }) {
      return {
        title: verb || "Untitled",
        subtitle: [tileFace, enabled === false ? "Hidden" : null].filter(Boolean).join(" · "),
      };
    },
  },
});
