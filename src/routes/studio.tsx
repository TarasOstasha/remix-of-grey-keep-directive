import { createFileRoute } from "@tanstack/react-router";

import { StudioRoute } from "@/components/studio/StudioRoute";

export const Route = createFileRoute("/studio")({
  component: StudioRoute,
});
