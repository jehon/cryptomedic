/* Packages */
import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

/* Styles */
import "bootstrap4/dist/css/bootstrap.min.css";
import "./main.css";
// After main
import "./main-media.css";

/* Application */
import FolderRouter, { folderLoader } from "./app-folder/folder-router";
import { bridgeTo } from "./bridge";
import ErrorPage from "./widget/error-page";
import RouteLoading from "./widget/route-loading";

// Thanks to: https:/rm /reactrouter.com/en/main/start/tutorial#setup
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createHashRouter([
  {
    errorElement: <ErrorPage />
  },
  {
    // Temporary
    path: "/login/*",
    element: (
      <RouteLoading
        message="Authenticating and loading"
        element={<div>Ready</div>}
      />
    )
  },
  {
    path: "/folder/:folderId/summary/:uid?",
    loader: folderLoader,
    element: <RouteLoading element={<FolderRouter />} />
  }
]);

bridgeTo("x-react-router", RouterProvider, { router });
