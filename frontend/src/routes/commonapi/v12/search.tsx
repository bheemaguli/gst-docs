import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/commonapi/v12/search" as never)({
  component: () => <div>Hello /commonapi/v12/search!</div>,
});
