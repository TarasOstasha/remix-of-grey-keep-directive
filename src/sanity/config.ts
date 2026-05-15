import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { elevateDestructiveActionsToDocumentMenu } from "./documentActions";
import { schemaTypes } from "./schemaTypes";

function readEnv(
  name:
    | "VITE_SANITY_PROJECT_ID"
    | "SANITY_PROJECT_ID"
    | "NEXT_PUBLIC_SANITY_PROJECT_ID"
    | "VITE_SANITY_DATASET"
    | "SANITY_DATASET"
    | "NEXT_PUBLIC_SANITY_DATASET"
    | "VITE_SANITY_API_VERSION"
    | "SANITY_API_VERSION"
    | "NEXT_PUBLIC_SANITY_API_VERSION",
) {
  const value = import.meta.env[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

const projectId =
  readEnv("VITE_SANITY_PROJECT_ID") ??
  readEnv("SANITY_PROJECT_ID") ??
  readEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");

const dataset =
  readEnv("VITE_SANITY_DATASET") ??
  readEnv("SANITY_DATASET") ??
  readEnv("NEXT_PUBLIC_SANITY_DATASET");

const apiVersion =
  readEnv("VITE_SANITY_API_VERSION") ??
  readEnv("SANITY_API_VERSION") ??
  readEnv("NEXT_PUBLIC_SANITY_API_VERSION") ??
  "2024-01-01";

export const studioEnv = {
  projectId,
  dataset,
  apiVersion,
};

export const studioConfig = defineConfig({
  name: "default",
  title: "Gray Keep",
  basePath: "/studio",
  projectId: projectId ?? "",
  dataset: dataset ?? "",
  apiVersion,
  plugins: [structureTool()],
  document: {
    actions: (previous) => elevateDestructiveActionsToDocumentMenu(previous),
  },
  schema: {
    types: schemaTypes,
  },
});
