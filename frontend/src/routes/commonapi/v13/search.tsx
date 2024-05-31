import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/commonapi/v13/search" as never)({
  component: () => <div>Hello /commonapi/v13/search!</div>,
});
