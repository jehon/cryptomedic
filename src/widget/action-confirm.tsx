import React, { useState } from "react";
import ButtonsGroup from "../styles/buttons-group";
import ActionButton, { ActionStyle, ActionStyles } from "./action-button";
import Popup from "./popup";

export default function ActionConfirm({
  buttonText,
  style,
  discrete,
  title,
  onOk,
  children
}: {
  buttonText: string;
  title?: string;
  style?: ActionStyle;
  discrete?: boolean;
  onOk: () => void;
  children: React.ReactNode;
}): React.ReactNode {
  const [isOpen, doOpen] = useState(false);

  style = style ?? ActionStyles.View;
  title = title ?? buttonText;

  return (
    <>
      <ActionButton
        style={style}
        discrete={discrete}
        text={buttonText}
        onClick={() => doOpen(true)}
      ></ActionButton>
      {isOpen ? (
        <Popup title={title} style={style}>
          {children}
          <ButtonsGroup>
            <ActionButton
              style={ActionStyles.Cancel}
              discrete={true}
              text="Cancel"
              onClick={() => doOpen(false)}
            />
            <ActionButton
              style={style}
              discrete={discrete}
              text={buttonText}
              onClick={() => {
                doOpen(false);
                onOk();
              }}
            />
          </ButtonsGroup>
        </Popup>
      ) : null}
    </>
  );
}
