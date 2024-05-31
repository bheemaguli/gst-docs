import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/commonapi/v11/search" as never)({
  component: () => <div>Hello /commonapi/v11/search!</div>,
});
