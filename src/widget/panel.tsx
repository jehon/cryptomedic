import React from "react";

export default function Panel(
  {
    headers,
    label,
    opened,
    children
  }: {
    headers?: React.ReactNode;
    label?: string;
    opened?: boolean;
    children: React.ReactNode;
  } = {
    headers: null,
    label: "",
    opened: false,
    children: null
  }
): React.ReactNode {
  const [statusOpened, toggleOpened] = React.useState(opened);

  if (React.Children.count(children) === 0) {
    // Show nothing if no children...
    return null;
  }

  function onOpenClose() {
    toggleOpened(!statusOpened);
  }

  return (
    <div className="panel">
      <div className="header" onClick={onOpenClose}>
        {label ? <label>{label}</label> : null}
        {headers}
      </div>
      {statusOpened ? <div className="body">{children}</div> : null}
    </div>
  );
}
