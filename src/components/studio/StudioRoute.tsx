import { lazy, Suspense, useEffect, useState } from "react";
import type { Config } from "sanity";

const Studio = lazy(() => import("sanity").then((module) => ({ default: module.Studio })));

type StudioEnv = {
  projectId?: string;
  dataset?: string;
  apiVersion?: string;
};

function StudioNotConfigured() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10 text-foreground">
      <h1 className="text-2xl font-semibold">Sanity Studio is not configured</h1>
      <p className="mt-4 text-muted-foreground">
        Add `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, and `VITE_SANITY_API_VERSION` to
        `.env.local`, then restart the dev server.
      </p>
    </div>
  );
}

function StudioLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center text-muted-foreground">
      Loading Studio…
    </div>
  );
}

export function StudioRoute() {
  const [studioConfig, setStudioConfig] = useState<Config | null>(null);
  const [studioEnv, setStudioEnv] = useState<StudioEnv | null>(null);

  useEffect(() => {
    void import("@/sanity/config").then((module) => {
      setStudioConfig(module.studioConfig);
      setStudioEnv(module.studioEnv);
    });
  }, []);

  if (!studioEnv) {
    return <StudioLoading />;
  }

  if (!studioEnv.projectId || !studioEnv.dataset || !studioEnv.apiVersion) {
    return <StudioNotConfigured />;
  }

  if (!studioConfig) {
    return <StudioLoading />;
  }

  return (
    <Suspense fallback={<StudioLoading />}>
      <div className="h-screen w-full">
        <Studio config={studioConfig} />
      </div>
    </Suspense>
  );
}
