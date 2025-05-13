import React from "react";
import ButtonsGroup from "./buttons-group";
import "./panel.css";

export default function Panel(props: {
  header?: React.ReactNode;
  label?: string;
  actions?: React.ReactNode;
  closed?: boolean;
  fullscreen?: boolean;
  fixed?: boolean;
  children: React.ReactNode;
  testid?: string;
  onToggle?: (state: boolean) => void;
}): React.ReactNode {
  const [statusOpened, toggleOpened] = React.useState(!props.closed);

  // TODO: no display if no children? does not seem to work perfectly...
  //
  // https://react.dev/reference/react/useLayoutEffect
  //
  //   https://react.dev/reference/react/Component#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function
  //   => idea: useEffect ? https://react.dev/reference/react/useEffect#my-effect-runs-after-every-re-render

  if (React.Children.count(props.children) === 0) {
    // Show nothing if no children...
    return null;
  }

  function onOpenClose() {
    if (!props.fixed) {
      const newState = !statusOpened;
      toggleOpened(newState);
      if (props.onToggle) props.onToggle(newState);
    }
  }

  return (
    <div
      className={props.fullscreen ? "fullscreen" : ""}
      data-testid={props.testid}
    >
      <div
        className="panel"
        data-role="panel"
        data-testid={props.testid + (statusOpened ? "/opened" : "/closed")}
      >
        <div data-role="header" className="header" onClick={onOpenClose}>
          {props.fixed || (
            <div id="triangle" className={statusOpened ? "opened" : "closed"}>
              &#9205;
            </div>
          )}
          <div id="custom">
            {props.label ? <label>{props.label}</label> : null}
            {props.header}
          </div>
        </div>
        {statusOpened ? (
          <>
            {props.actions ? (
              <div data-testid={`panel-actions-${props.testid}`}>
                <ButtonsGroup>{props.actions}</ButtonsGroup>
              </div>
            ) : null}
            <div data-role="body" className="body">
              {props.children}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
