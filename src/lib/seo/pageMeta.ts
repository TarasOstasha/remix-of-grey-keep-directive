const DEFAULT_SITE_URL = "https://graykeep.ai";

const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/J0hntSB55dN8cbdJ3xUcfA2iXEo1/social-images/social-1776735364298-replicate-prediction-knv05a1bk1rmr0cxnnha53snqm.webp";

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
  const image = ogImage ?? DEFAULT_OG_IMAGE;
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
