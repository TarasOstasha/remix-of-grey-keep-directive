import { absoluteAssetUrl, siteOgImageSrc } from "./siteAssets";

const DEFAULT_SITE_URL = "https://graykeep.ai";

export function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return DEFAULT_SITE_URL;
}

type PageMetaOptions = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
};

export function buildPageMeta({ title, description, path, ogImage }: PageMetaOptions) {
  const image = ogImage ?? absoluteAssetUrl(siteOgImageSrc, getSiteUrl());
  const canonical = path ? `${getSiteUrl()}${path}` : undefined;

  const meta: Array<{ title?: string; name?: string; property?: string; content?: string }> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { property: "og:image", content: image },
    { name: "twitter:image", content: image },
  ];

  if (canonical) {
    meta.push({ property: "og:url", content: canonical });
  }

  const links = canonical ? [{ rel: "canonical", href: canonical }] : [];

  return { meta, links };
}
