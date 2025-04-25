/* Packages */
import { createHashRouter, RouterProvider } from "react-router-dom";

/* Styles */
import "bootstrap4/dist/css/bootstrap.min.css";
import "bootstrap4/dist/js/bootstrap";
import "./main.css";

/* Application */
import { HomeRouter } from "./app-home/home-router";
import { patientRouterConfig } from "./app-patient/patient-router";
import { bridgeTo } from "./utils/react";
import ErrorPage from "./widget/error-page";
import RouteLoading from "./widget/route-loading";

// Thanks to: https:/rm /reactrouter.com/en/main/start/tutorial#setup
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createHashRouter([
  {
    errorElement: <ErrorPage />
  },
  {
    // TODO: Temporary
    path: "/login/*",
    element: (
      <RouteLoading
        message="Authenticating and loading"
        element={<div>Ready</div>}
      />
    )
  },
  ...HomeRouter(),
  ...patientRouterConfig()
]);

export function routeTo(target: string = "") {
  document.location.hash = "#" + target;
}

bridgeTo("x-react-router", <RouterProvider router={router}></RouterProvider>);
