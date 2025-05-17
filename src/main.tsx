import {
  createHashRouter,
  Navigate,
  Outlet,
  RouterProvider
} from "react-router-dom";
import { RouterHome } from "./app-home/router-home";
import { RouterPatient } from "./app-patient/router-patient";
import { bridgeTo } from "./utils/legacy";
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

function ReloadToOldApp() {
  // setTimeout(() => location.reload(), 100);
  location.reload();
  return <div>Going to old application</div>;
}

// Thanks to: https:/rm /reactrouter.com/en/main/start/tutorial#setup
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createHashRouter([
  {
    path: "/",
    element: <PageMain />,
    errorElement: <ErrorPage />,
    children: [
      // All sub routes
      ...RouterHome(),
      ...RouterPatient(),

      // Legacy code to be migrated into react
      { path: "/home", element: <ReloadToOldApp /> },
      { path: "/login/:redirect", element: <ReloadToOldApp /> },
      { path: "/search", element: <ReloadToOldApp /> },
      { path: "/reports/:report", element: <ReloadToOldApp /> },
      { path: "/users/:uid/password", element: <ReloadToOldApp /> },
      { path: "/users/:uid", element: <ReloadToOldApp /> },
      { path: "/users", element: <ReloadToOldApp /> },
      { path: "/prices", element: <ReloadToOldApp /> },

      { path: "/*", element: <Navigate to="/home" /> }
    ]
  }
]);

bridgeTo("x-react-router", <RouterProvider router={router}></RouterProvider>);
