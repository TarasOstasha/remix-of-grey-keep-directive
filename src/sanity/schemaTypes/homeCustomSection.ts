import { defineField, defineType } from "sanity";

export const homeCustomSection = defineType({
  name: "homeCustomSection",
  title: "Custom section",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Show on home page",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sectionId",
      title: "Section ID (anchor)",
      type: "slug",
      description: "Optional URL anchor, e.g. #partners",
      options: { source: "headline", maxLength: 48 },
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small uppercase label above the headline.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      description: "Optional supporting copy shown beside the headline on larger screens.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Centered", value: "centered" },
          { title: "With image", value: "withImage" },
        ],
        layout: "radio",
      },
      initialValue: "standard",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "string",
      description: "Internal path (e.g. /contact) or full URL.",
    }),
  ],
  preview: {
    select: {
      headline: "headline",
      eyebrow: "eyebrow",
      enabled: "enabled",
      media: "image",
    },
    prepare({ headline, eyebrow, enabled, media }) {
      return {
        title: headline || "Custom section",
        subtitle: [eyebrow, enabled === false ? "Hidden" : "Visible"].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
