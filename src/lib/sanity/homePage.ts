import { getSanityClient } from "./client";

export type HomeFromTheDesk = {
  eyebrow: string;
  headline: string;
  body: string;
  imageUrl: string | null;
  imageAlt: string;
};

type HomePageRow = {
  fromTheDeskEyebrow: string | null;
  fromTheDeskHeadline: string | null;
  fromTheDeskBody: string | null;
  fromTheDeskImageUrl: string | null;
  fromTheDeskImageAlt: string | null;
};

export const DEFAULT_FROM_THE_DESK: HomeFromTheDesk = {
  eyebrow: "From the desk",
  headline: "We do not sell comfort. We offer a clear view.",
  body: "The purpose is not to amplify fear or soften reality. The purpose is to see enough, early enough, to make better decisions.",
  imageUrl: null,
  imageAlt: "A long mountain ridgeline fading into mist at first light",
};

function resolveFromTheDesk(row: HomePageRow | null): HomeFromTheDesk {
  if (!row) return DEFAULT_FROM_THE_DESK;

  return {
    eyebrow: row.fromTheDeskEyebrow?.trim() || DEFAULT_FROM_THE_DESK.eyebrow,
    headline: row.fromTheDeskHeadline?.trim() || DEFAULT_FROM_THE_DESK.headline,
    body: row.fromTheDeskBody?.trim() || DEFAULT_FROM_THE_DESK.body,
    imageUrl: row.fromTheDeskImageUrl ?? null,
    imageAlt: row.fromTheDeskImageAlt?.trim() || DEFAULT_FROM_THE_DESK.imageAlt,
  };
}

export async function getHomeFromTheDeskFromSanity(): Promise<HomeFromTheDesk> {
  const client = getSanityClient();
  if (!client) return DEFAULT_FROM_THE_DESK;

  const row = await client.fetch<HomePageRow | null>(
    `*[_type == "homePage"][0] {
      fromTheDeskEyebrow,
      fromTheDeskHeadline,
      fromTheDeskBody,
      "fromTheDeskImageUrl": fromTheDeskImage.asset->url,
      "fromTheDeskImageAlt": fromTheDeskImage.alt
    }`,
  );

  return resolveFromTheDesk(row);
}
