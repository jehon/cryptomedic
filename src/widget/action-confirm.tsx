import { useState } from "react";
import ActionButton, { type ButtonActionProps } from "./action-button";
import ButtonsGroup from "./buttons-group";
import Popup from "./popup";

export default function ActionConfirm(
  props: {
    title?: string;
    children: React.ReactNode;
    onOk: () => void;
  } & ButtonActionProps
): React.ReactNode {
  const [opened, setOpened] = useState(false);

  const title = props.title ?? props.action;

  return (
    <>
      <ActionButton
        style={props.style}
        discrete={props.discrete}
        action={props.action}
        onOk={() => setOpened(true)}
        restrictedTo={props.restrictedTo}
      ></ActionButton>
      {opened ? (
        <Popup title={title} style={props.style}>
          {props.children}
          <ButtonsGroup>
            <ActionButton
              style="Cancel"
              discrete={true}
              action="Cancel"
              onOk={() => setOpened(false)}
            />
            <ActionButton
              style={props.style}
              discrete={props.discrete}
              action={props.action}
              onOk={() => {
                setOpened(false);
                props.onOk();
              }}
            />
          </ButtonsGroup>
        </Popup>
      ) : null}
    </>
  );
}
