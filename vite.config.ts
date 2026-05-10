// @lovable.dev/vite-tanstack-config already includes the following - do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
//
// For Vercel: `cloudflare: false` disables the Workers bundle; Nitro's `vercel` preset emits
// the output Vercel expects (see https://vercel.com/docs/frameworks/full-stack/tanstack-start).
// Use ESM entry: package `main` is CJS and `require("vite")` fails against Vite 7 (ESM-only).
import { defineConfig } from "@lovable.dev/vite-tanstack-config/dist/index.js";
import { nitro } from "nitro/vite";

export default defineConfig({
  cloudflare: false,
  plugins: [
    nitro({
      preset: "vercel",
    }),
  ],
  vite: {
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    server: {
      port: 8080,
    },
  },
});
