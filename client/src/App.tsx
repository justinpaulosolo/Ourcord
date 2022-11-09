import {
  Outlet,
  RouterProvider,
  createReactRouter,
  createRouteConfig,
} from "@tanstack/react-router";
import { Register } from "./pages/auth/Register";
import { SignIn } from "./pages/auth/SignIn";
import { Index } from "./pages/Index";

const routeConfig = createRouteConfig().createChildren((createRoute) => [
  createRoute({
    path: "/",
    element: <Index />,
  }),
  createRoute({
    path: "/auth/register",
    element: <Register />,
  }),
  createRoute({
    path: "/auth/signin",
    element: <SignIn />,
  }),
]);

const router = createReactRouter({ routeConfig });

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </>
  );
}

export default App;
