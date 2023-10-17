import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

import "./route-loading.css";

export default function RouteLoading({
  element,
  message
}: {
  element: React.ReactNode;
  message?: string;
}) {
  const [started, start] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // We need some time otherwise the browser render it transitionned
    setTimeout(() => start(true), 100);
  }, []);

  // See https://reactrouter.com/en/main/hooks/use-navigation
  let ctxMessage = message;
  switch (navigation.state) {
    case "idle":
      //   idle       = ok -> show the element
      return element;
    case "submitting":
      //   submitting = submit current page
      ctxMessage = message;
      break;
    case "loading":
      //   loading    = load next page
      ctxMessage = "Loading next page";
      break;
  }

  return (
    <div className="route-loading">
      <div className={"bar" + (started ? " go" : "")}></div>
      <div>{ctxMessage}</div>
    </div>
  );
}
