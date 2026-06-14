import { defineField, defineType } from "sanity";
import { HOME_BUILT_IN_SECTION_OPTIONS } from "@/lib/sanity/homePage";

export { HOME_BUILT_IN_SECTION_OPTIONS };

export const homeBuiltInSection = defineType({
  name: "homeBuiltInSection",
  title: "Built-in section",
  type: "object",
  fields: [
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: [...HOME_BUILT_IN_SECTION_OPTIONS],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "enabled",
      title: "Show on home page",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      section: "section",
      enabled: "enabled",
    },
    prepare({ section, enabled }) {
      const label =
        HOME_BUILT_IN_SECTION_OPTIONS.find((option) => option.value === section)?.title ?? section;
      return {
        title: label ?? "Built-in section",
        subtitle: enabled === false ? "Hidden" : "Visible",
      };
    },
  },
});
