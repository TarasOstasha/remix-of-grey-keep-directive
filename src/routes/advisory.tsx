import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/advisory")({
  component: AdvisoryLayout,
});

function AdvisoryLayout() {
  return <Outlet />;
}
