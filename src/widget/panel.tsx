import React from "react";

export default function Panel(
  {
    headers,
    label,
    collapsible,
    opened,
    children
  }: {
    headers?: React.ReactNode;
    label?: string;
    collapsible?: boolean;
    opened?: boolean;
    children: React.ReactNode;
  } = {
    headers: null,
    label: "",
    collapsible: false,
    opened: false,
    children: null
  }
): React.ReactNode {
  const [statusOpened, toggleOpened] = React.useState(opened);

  function onOpenClose() {
    toggleOpened(!statusOpened);
  }

  return (
    <div className="panel">
      <div className="header" onClick={onOpenClose}>
        {label ? <label>{label}</label> : null}
        {headers}
      </div>
      {!collapsible || statusOpened ? (
        <div className="body">{children}</div>
      ) : null}
    </div>
  );
}
