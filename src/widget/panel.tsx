import React from "react";

export default function Panel(
  {
    headers,
    label,
    closed,
    children,
    fixed
  }: {
    headers?: React.ReactNode;
    label?: string;
    closed?: boolean;
    fixed?: boolean;
    children: React.ReactNode;
  } = {
    headers: null,
    label: "",
    closed: false,
    fixed: false,
    children: null
  }
): React.ReactNode {
  const [statusOpened, toggleOpened] = React.useState(!closed);

  // TODO: no display if no children? does not seem to work perfectly...

  // // const res = React.Children.toArray(children).filter((child) =>
  // //   React.isValidElement(child)
  // // );

  // // const res2 = React.Children.toArray(children).filter(
  // //   (child) =>
  // //     !React.isValidElement(child) || (child as any as React.ReactElement).type
  // // );

  // console.log({
  //   label,
  //   c: React.Children.count(children),
  //   e: children === ""
  //   // res,
  //   // res2
  // });

  if (React.Children.count(children) === 0) {
    // Show nothing if no children...
    return null;
  }

  function onOpenClose() {
    if (!fixed) {
      toggleOpened(!statusOpened);
    }
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
