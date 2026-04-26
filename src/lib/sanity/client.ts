import { createClient } from "@sanity/client";

function readEnv(name: string): string | undefined {
  const viteValue = import.meta.env[name as keyof ImportMetaEnv];
  if (typeof viteValue === "string" && viteValue.length > 0) {
    return viteValue;
  }

  if (typeof process !== "undefined" && process.env) {
    const processValue = process.env[name];
    if (typeof processValue === "string" && processValue.length > 0) {
      return processValue;
    }
  }

  return undefined;
}

export function getSanityClient() {
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
    "2026-04-25";
  const token = readEnv("SANITY_API_TOKEN") ?? readEnv("VITE_SANITY_API_TOKEN");

  if (!projectId || !dataset) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token,
  });
}
