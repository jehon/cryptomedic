import React from "react";

import ButtonsGroup from "../styles/buttons-group";
import "./panel.css";

export default function Panel({
  header,
  label,
  closed,
  actions,
  children,
  fixed,
  testid,
  onToggle
}: {
  header?: React.ReactNode;
  label?: string;
  actions?: React.ReactNode;
  closed?: boolean;
  fixed?: boolean;
  children: React.ReactNode;
  testid?: string;
  onToggle?: (state: boolean) => void;
}): React.ReactNode {
  const [statusOpened, toggleOpened] = React.useState(!closed);

  // TODO: no display if no children? does not seem to work perfectly...
  //
  // https://react.dev/reference/react/useLayoutEffect
  //
  //   https://react.dev/reference/react/Component#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function
  //   => idea: useEffect ? https://react.dev/reference/react/useEffect#my-effect-runs-after-every-re-render

  if (React.Children.count(children) === 0) {
    // Show nothing if no children...
    return null;
  }

  function onOpenClose() {
    if (!fixed) {
      const newState = !statusOpened;
      toggleOpened(newState);
      if (onToggle) onToggle(newState);
    }
  }

  return (
    <div className="panel" data-role="panel" data-testid={testid}>
      <div data-role="header" className="header" onClick={onOpenClose}>
        {fixed || (
          <div id="triangle" className={statusOpened ? "opened" : "closed"}>
            ⏵
          </div>
        )}
        <div id="custom">
          {label ? <label>{label}</label> : null}
          {header}
        </div>
      </div>
      {statusOpened ? (
        <>
          {actions ? <ButtonsGroup>{actions}</ButtonsGroup> : null}
          <div data-role="body" className="body">
            {children}
          </div>
        </>
      ) : null}
    </div>
  );
}
