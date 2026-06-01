import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "fromTheDeskEyebrow",
      title: "From the desk — eyebrow",
      type: "string",
      description: "Small label above the headline.",
      initialValue: "From the desk",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fromTheDeskHeadline",
      title: "From the desk — headline",
      type: "string",
      description: "Large display line over the hero image.",
      initialValue: "We do not sell comfort. We offer a clear view.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fromTheDeskBody",
      title: "From the desk — body",
      type: "text",
      rows: 4,
      description: "Supporting copy below the headline.",
      initialValue:
        "The purpose is not to amplify fear or soften reality. The purpose is to see enough, early enough, to make better decisions.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fromTheDeskImage",
      title: "From the desk — image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Brief description for screen readers and SEO.",
          initialValue: "A long mountain ridgeline fading into mist at first light",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
