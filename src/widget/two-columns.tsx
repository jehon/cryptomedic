import React from "react";

export default function TwoColumns({
  children
}: {
  children?: React.ReactNode;
}): React.ReactNode {
  return <div className="two-columns">{children}</div>;
}
