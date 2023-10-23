import React from "react";

import "./popup.css";

export default function Popup({ children }: { children: React.ReactNode }) {
  return (
    <div className="popup">
      <div className="box">{children}</div>
    </div>
  );
}
