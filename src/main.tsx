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

// Thanks to: https:/rm /reactrouter.com/en/main/start/tutorial#setup
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createHashRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      // All sub routes
      ...HomeRouter(),
      ...patientRouterConfig(),

      // Legacy code to be migrated into react
      { path: "/login/:redirect", element: <div>to legacy code</div> },
      { path: "/search", element: <div>to legacy code</div> },
      { path: "/reports/:report", element: <div>to legacy code</div> },
      { path: "/users/:uid/password", element: <div>to legacy code</div> },
      { path: "/users/:uid", element: <div>to legacy code</div> },
      { path: "/users", element: <div>to legacy code</div> },
      { path: "/prices", element: <div>to legacy code</div> },

      // To be removed
      { path: "/folder/*", element: <div></div> }
    ]
  }
]);

bridgeTo("x-react-router", <RouterProvider router={router}></RouterProvider>);
