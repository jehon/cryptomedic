import React, { useEffect } from "react";
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
}): React.ReactNode {
  // Fullscreen is always fixed
  const fixed = props.fixed || props.fullscreen || false;

  const [opened, setOpened] = React.useState(!props.closed);

  useEffect(() => {
    setOpened(!(props.closed ?? false) || fixed);
  }, [props.closed, fixed]);

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
    if (!fixed) {
      setOpened(!opened);
    }
  }

  return (
    <div
      className={props.fullscreen ? "fullscreen" : ""}
      data-testid={props.testid + "/backdrop"}
    >
      <div
        className="panel"
        data-role="panel"
        data-testid={props.testid}
        data-status={opened ? "opened" : "closed"}
      >
        <div data-role="header" className="header" onClick={onOpenClose}>
          {fixed || (
            <div id="triangle" className={opened ? "opened" : "closed"}>
              &#9205;
            </div>
          )}
          <div id="custom">
            {props.label ? <label>{props.label}</label> : null}
            {props.header}
          </div>
        </div>
        {opened ? (
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
