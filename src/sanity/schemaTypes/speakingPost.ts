import { defineField, defineType } from "sanity";

export const speakingPost = defineType({
  name: "speakingPost",
  title: "Speaking post",
  type: "document",
  fields: [
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      description: 'Title shown in the list, e.g. "Keynotes".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL for the speaking detail page.",
      options: { source: "format", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "oneLineEssence",
      title: "One-line essence",
      type: "text",
      rows: 2,
      description: "Short italic line on the home list and detail page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullContent",
      title: "Full content",
      type: "text",
      rows: 8,
      description: "Full speaking copy for the detail page.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "closingLine",
      title: "Closing line",
      type: "text",
      rows: 2,
      description: "Closing line after the full content.",
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
    select: { format: "format", oneLineEssence: "oneLineEssence", enabled: "enabled" },
    prepare({ format, oneLineEssence, enabled }) {
      return {
        title: format || "Untitled",
        subtitle: [oneLineEssence, enabled === false ? "Hidden" : null].filter(Boolean).join(" · "),
      };
    },
  },
});
