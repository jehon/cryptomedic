import React, { useState } from "react";
import ButtonsGroup from "../styles/buttons-group";
import ActionButton, { ButtonActionProps } from "./action-button";
import Popup from "./popup";

export default function ActionConfirm(
  props: {
    title?: string;
    children: React.ReactNode;
    onOk: () => void;
  } & ButtonActionProps
): React.ReactNode {
  const [isOpen, doOpen] = useState(false);

  props.title = props.title ?? props.action;

  return (
    <>
      <ActionButton
        style={props.style}
        discrete={props.discrete}
        action={props.action}
        onOk={() => doOpen(true)}
      ></ActionButton>
      {isOpen ? (
        <Popup title={props.title} style={props.style}>
          {props.children}
          <ButtonsGroup>
            <ActionButton
              style="Cancel"
              discrete={true}
              action="Cancel"
              onOk={() => doOpen(false)}
            />
            <ActionButton
              style={props.style}
              discrete={props.discrete}
              action={props.action}
              onOk={() => {
                doOpen(false);
                props.onOk();
              }}
            />
          </ButtonsGroup>
        </Popup>
      ) : null}
    </>
  );
}
