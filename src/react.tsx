/* Packages */
import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

/* Styles */
import "bootstrap4/dist/css/bootstrap.min.css";
import "./main.css";
import "./main-media.css";

/* Application */
import "./app-folder/folder-element";
import FolderRouter, { folderLoader } from "./app-folder/folder-router";
import { bridgeTo } from "./bridge";
import ErrorPage from "./widget/error-page";

// Thanks to: https:/rm /reactrouter.com/en/main/start/tutorial#setup
// https://reactrouter.com/en/main/routers/create-browser-router
const router = createHashRouter([
  {
    errorElement: <ErrorPage />
  },
  {
    path: "/folder/:folderId/summary",
    element: <FolderRouter />,
    loader: folderLoader
  }
]);

bridgeTo("x-react-router", RouterProvider, { router });
