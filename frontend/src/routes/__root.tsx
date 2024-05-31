import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return <p>This is the notFoundComponent configured on root route</p>;
  },
});

function RootComponent() {
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
      </div>
      <hr />
      <Outlet />
      {/* Start rendering router matches */}
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
