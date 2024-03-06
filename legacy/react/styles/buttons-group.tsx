import React from "react";
import "./buttons-group.css";

export default function ButtonsGroup({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="buttons-group">{children}</div>;
}
