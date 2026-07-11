import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/speaking")({
  component: SpeakingLayout,
});

function SpeakingLayout() {
  return <Outlet />;
}
