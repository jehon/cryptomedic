import React from "react";

import { ActionStyle } from "./action-button";
import "./popup.css";

export default function Popup({
  title,
  style,
  children
}: {
  title?: string;
  style?: ActionStyle;
  children: React.ReactNode;
}) {
  return (
    <div className="popup">
      <div className={"box " + style?.css}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
