import {
  Link,
  Outlet,
  createRootRoute,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return <p>This is the notFoundComponent configured on root route</p>;
  },
});

function RootComponent() {
  const router = useRouter();

  const matchWithTitle = [...router.state.matches]
    .reverse()
    // @ts-ignore
    .find((d) => d.routeContext.getTitle);

  // @ts-ignore
  const title = matchWithTitle?.routeContext.getTitle() || "GST Docs";
  document.title = title;

  return (
    <>
      <div className="flex gap-2 p-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
        <Link
          to={"/commonapi"}
          activeProps={{
            className: "font-bold",
          }}
        >
          CommpnApi
        </Link>
        <Link
          to={"/taxpayer/returns"}
          activeProps={{
            className: "font-bold",
          }}
        >
          Returns
        </Link>
      </div>
      <hr />
      <div className="container mx-auto py-4">
        <Outlet />
      </div>
      {process.env.NODE_ENV == 'development' ?
        <TanStackRouterDevtools position="bottom-left" /> : null
      }
    </>
  );
}
