import faviconIco from "@/assets/favicon/favicon.ico?url";
import faviconSvg from "@/assets/favicon/favicon.svg?url";
import favicon96 from "@/assets/favicon/favicon-96x96.png?url";
import appleTouchIcon from "@/assets/favicon/apple-touch-icon.png?url";
import ogImage from "@/assets/favicon/web-app-manifest-512x512.png?url";

export const siteOgImageSrc = ogImage;

export function absoluteAssetUrl(path: string, siteUrl: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const origin = siteUrl.replace(/\/$/, "");
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildFaviconLinks() {
  return [
    { rel: "icon", href: faviconIco, sizes: "48x48" },
    { rel: "icon", href: faviconSvg, type: "image/svg+xml" },
    { rel: "icon", href: favicon96, type: "image/png", sizes: "96x96" },
    { rel: "apple-touch-icon", href: appleTouchIcon, sizes: "180x180" },
  ];
}
