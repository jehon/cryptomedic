import { createRoot } from "react-dom/client";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { RouterHome } from "./app-home/router-home";
import { RouterLegacy } from "./app-legacy/legacy-router";
import { RouterPatient } from "./app-patient/_router";
import ErrorPage from "./widget/error-page";

/* Styles */
import "bootstrap4/dist/css/bootstrap.min.css";
import "bootstrap4/dist/js/bootstrap";
import "./main.css";

function PageMain() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

// Thanks to: https:/rm /reactrouter.com/en/main/start/tutorial#setup
// https://reactrouter.com/en/main/routers/create-browser-router
const mainRouter = createHashRouter([
  {
    path: "/",
    element: <PageMain />,
    errorElement: <ErrorPage />,
    children: [
      // All sub routes
      ...RouterHome(),
      ...RouterPatient(),
      ...RouterLegacy()
      // {
      //   path: "*",
      //   element: <Navigate to="/" />
      // }
    ]
  }
]);

createRoot(document.getElementById("app")!).render(
  <RouterProvider router={mainRouter} />
);
