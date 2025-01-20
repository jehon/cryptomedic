import { useState } from "react";
import ButtonsGroup from "../styles/buttons-group";
import ActionButton, { type ButtonActionProps } from "./action-button";
import Popup from "./popup";

export default function ActionConfirm(
  props: {
    title?: string;
    children: React.ReactNode;
    onOk: () => void;
  } & ButtonActionProps
): React.ReactNode {
  const [isOpen, doOpen] = useState(false);

  const title = props.title ?? props.action;

  return (
    <>
      <ActionButton
        style={props.style}
        discrete={props.discrete}
        action={props.action}
        onOk={() => doOpen(true)}
        requires={props.requires}
      ></ActionButton>
      {isOpen ? (
        <Popup title={title} style={props.style}>
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
