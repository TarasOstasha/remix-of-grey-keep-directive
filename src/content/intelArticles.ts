export type IntelArticle = {
  slug: string;
  title: string;
  summary: string;
  category: "Intel";
  tags: string[];
  publishedAt: string;
  readTime: string;
};

export const INTEL_ARTICLES: IntelArticle[] = [
  {
    slug: "methodology",
    title: "Methodology",
    summary:
      "How we evaluate open and commercial reporting to separate strategic signal from narrative noise.",
    category: "Intel",
    tags: ["Method"],
    publishedAt: "Apr 4, 2026",
    readTime: "1 min read",
  },
  {
    slug: "ai-in-the-shadows",
    title: "AI in the Shadows",
    summary:
      "How adversarial use of AI is reshaping reconnaissance, social engineering, and campaign pacing.",
    category: "Intel",
    tags: ["AI"],
    publishedAt: "Apr 4, 2026",
    readTime: "2 min read",
  },
  {
    slug: "signals-and-noise",
    title: "Signals and Noise",
    summary:
      "A practical framework for deciding what matters now versus what only appears urgent.",
    category: "Intel",
    tags: ["Signal"],
    publishedAt: "Apr 4, 2026",
    readTime: "1 min read",
  },
  {
    slug: "threat-landscape",
    title: "Threat Landscape",
    summary:
      "A concise read on the operators, capabilities, and pressure points leadership teams should monitor.",
    category: "Intel",
    tags: ["Threat"],
    publishedAt: "Apr 4, 2026",
    readTime: "1 min read",
  },
];

export function getIntelArticleBySlug(slug: string) {
  return INTEL_ARTICLES.find((article) => article.slug === slug);
}
