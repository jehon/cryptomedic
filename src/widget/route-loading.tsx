import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

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

  if (navigation.state === "idle") {
    return element;
  }

  return (
    <div className="route-loading">
      <div className={"bar" + (started ? " go" : "")}></div>
      <div>{message ?? "Loading"}</div>
    </div>
  );
}
