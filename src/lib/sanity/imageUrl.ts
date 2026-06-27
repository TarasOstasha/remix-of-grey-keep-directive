type SanityImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
};

function isSanityCdnUrl(url: string) {
  return url.includes("cdn.sanity.io");
}

export function sanityImageUrl(
  url: string | null | undefined,
  { width, height, quality = 80 }: SanityImageOptions = {},
): string | null {
  if (!url) return null;
  if (!isSanityCdnUrl(url)) return url;

  const params = new URLSearchParams();
  if (width) params.set("w", String(width));
  if (height) params.set("h", String(height));
  params.set("auto", "format");
  params.set("q", String(quality));

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${params.toString()}`;
}

export function sanityImageSrcSet(
  url: string | null | undefined,
  widths: number[],
  quality = 80,
): string | undefined {
  if (!url || !isSanityCdnUrl(url)) return undefined;

  return widths
    .map((width) => `${sanityImageUrl(url, { width, quality }) ?? url} ${width}w`)
    .join(", ");
}

export function optimizedImageSrc(
  url: string | null | undefined,
  fallback: string,
  width: number,
  quality = 80,
): string {
  if (!url) return fallback;
  return sanityImageUrl(url, { width, quality }) ?? url;
}
