import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { RouterHome } from "./app-home/router-home";
import { RouterPatient } from "./app-patient/router-patient";
import { bridgeTo } from "./utils/legacy";
import ErrorPage from "./widget/error-page";

/* Styles */
import "bootstrap4/dist/css/bootstrap.min.css";
import "bootstrap4/dist/js/bootstrap";
import "./main.css";

function MainPage() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

// Thanks to: https:/rm /reactrouter.com/en/main/start/tutorial#setup
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      // All sub routes
      ...RouterHome(),
      ...RouterPatient(),

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
