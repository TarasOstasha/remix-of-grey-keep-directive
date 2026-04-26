import { defineField, defineType } from "sanity";

export const storySeries = defineType({
  name: "storySeries",
  title: "Story series",
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
      name: "premise",
      title: "Premise",
      type: "text",
      rows: 5,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled",
        media,
      };
    },
  },
});
