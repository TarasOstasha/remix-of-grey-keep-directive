import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { getSiteUrl } from "@/lib/seo/pageMeta";
import { absoluteAssetUrl, buildFaviconLinks, siteOgImageSrc } from "@/lib/seo/siteAssets";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter+Tight:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gray Keep - Cyber Intelligence for an Uncertain World" },
      {
        name: "description",
        content:
          "Gray Keep delivers strategic cyber intelligence, advisory, and narrative analysis for leaders navigating uncertainty.",
      },
      { name: "author", content: "Gray Keep" },
      { property: "og:title", content: "Gray Keep - Cyber Intelligence for an Uncertain World" },
      {
        property: "og:description",
        content:
          "Strategic intelligence for an uncertain world. Reporting, stories, and advisory built for clear judgment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gray Keep - Cyber Intelligence for an Uncertain World" },
      {
        name: "twitter:description",
        content:
          "Strategic intelligence for an uncertain world. Reporting, stories, and advisory built for clear judgment.",
      },
      {
        property: "og:image",
        content: absoluteAssetUrl(siteOgImageSrc, getSiteUrl()),
      },
      {
        name: "twitter:image",
        content: absoluteAssetUrl(siteOgImageSrc, getSiteUrl()),
      },
    ],
    links: [
      ...buildFaviconLinks(),
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", href: GOOGLE_FONTS_URL, as: "style" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link
          rel="stylesheet"
          href={GOOGLE_FONTS_URL}
          media="print"
          onLoad={(event) => {
            (event.currentTarget as HTMLLinkElement).media = "all";
          }}
        />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
