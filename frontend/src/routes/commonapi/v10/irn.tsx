import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/commonapi/v10/irn" as never)({
  component: () => <div>Hello /commonapi/v10/irn!</div>,
});
