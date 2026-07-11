import { defineField, defineType } from "sanity";
import { HOME_BUILT_IN_SECTION_OPTIONS } from "@/lib/sanity/homePage";

const DEFAULT_HOME_SECTIONS = HOME_BUILT_IN_SECTION_OPTIONS.map((option) => ({
  _type: "homeBuiltInSection" as const,
  _key: option.value,
  section: option.value,
  enabled: true,
}));

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      description:
        "Drag to reorder sections. Toggle visibility on built-in sections or add custom blocks between them.",
      of: [{ type: "homeBuiltInSection" }, { type: "homeCustomSection" }],
      initialValue: DEFAULT_HOME_SECTIONS,
    }),
    defineField({
      name: "fromTheDeskEyebrow",
      title: "From the desk - eyebrow",
      type: "string",
      description: "Small label above the headline.",
      initialValue: "From the desk",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fromTheDeskHeadline",
      title: "From the desk - headline",
      type: "string",
      description: "Large display line over the hero image.",
      initialValue: "We do not sell comfort. We offer a clear view.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fromTheDeskBody",
      title: "From the desk - body",
      type: "text",
      rows: 4,
      description: "Supporting copy below the headline.",
      initialValue:
        "The purpose is not to amplify fear or soften reality. The purpose is to see enough, early enough, to make better decisions.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fromTheDeskImage",
      title: "From the desk - image",
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
    defineField({
      name: "advisoryEyebrow",
      title: "Advisory - eyebrow",
      type: "string",
      description: "Small label above the headline.",
      initialValue: "Advisory",
    }),
    defineField({
      name: "advisoryHeadline",
      title: "Advisory - headline",
      type: "text",
      rows: 2,
      description: "Large display headline. Use a new line for a line break.",
      initialValue: "What we actually do\nfor the people we work with.",
    }),
    defineField({
      name: "advisoryIntro",
      title: "Advisory - intro",
      type: "text",
      rows: 3,
      description: "Supporting copy beside the headline on larger screens.",
      initialValue:
        "Advisory is where the work becomes personal. A small number of engagements - quiet, written, and deliberately few - for leaders who need judgment before they need volume. Four ways to be of use: to brief, to translate, to frame, and to stand. Each is a different answer to the same question - what do you actually need to see, to decide, and to do?",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
