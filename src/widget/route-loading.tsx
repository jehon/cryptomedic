import React, { useEffect, useState } from "react";

export default function RouteLoading({ message }: { message?: string }) {
  const [started, start] = useState(false);

  useEffect(() => {
    // // https://stackoverflow.com/a/24195559/1954789
    // window.getComputedStyle(document.body); // Trigger the rendering
    // We need some time otherwise the browser render it transitionned
    setTimeout(() => start(true), 100);
  }, []);

  return (
    <div className="route-loading">
      <div className={"bar" + (started ? " go" : "")}></div>
      <div>{message ?? "Loading"}</div>
    </div>
  );
}
