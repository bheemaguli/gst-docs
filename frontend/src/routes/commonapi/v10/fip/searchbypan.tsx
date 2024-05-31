import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/commonapi/v10/fip/searchbypan" as never)(
  {
    component: () => <div>Hello /commonapi/v10/fip/searchbypan!</div>,
  },
);
