import React from "react";
import {
  isRouteErrorResponse,
  useNavigation,
  useRouteError
} from "react-router-dom";
import RouteLoading from "./route-loading";

// https://github.com/remix-run/react-router/discussions/9628#discussioncomment-5555901
function errorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    console.error(error);
    return "Unknown error";
  }
}

export default function ErrorPage() {
  const error = useRouteError();
  const navigation = useNavigation();

  if (navigation.state !== "idle") {
    return <RouteLoading />;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage(error)}</i>
      </p>
    </div>
  );
}
