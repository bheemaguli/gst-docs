import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/commonapi/v10/inclist" as never)({
  component: () => <div>Hello /commonapi/v10/inclist!</div>,
});
