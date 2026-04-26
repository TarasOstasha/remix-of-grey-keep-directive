import { createFileRoute } from "@tanstack/react-router";
import { Studio } from "sanity";

import { studioConfig, studioEnv } from "../sanity/config";

export const Route = createFileRoute("/studio/$")({
  component: StudioRouteComponent,
});

function StudioRouteComponent() {
  if (!studioEnv.projectId || !studioEnv.dataset || !studioEnv.apiVersion) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10 text-foreground">
        <h1 className="text-2xl font-semibold">Sanity Studio is not configured</h1>
        <p className="mt-4 text-muted-foreground">
          Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and
          `NEXT_PUBLIC_SANITY_API_VERSION` to `.env.local`, then restart the dev server.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <Studio config={studioConfig} />
    </div>
  );
}
