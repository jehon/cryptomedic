import React, { useState } from "react";
import ActionButton, { ActionStyle, ActionStyles } from "./action-button";
import Popup from "./popup";

export default function ActionConfirm({
  style,
  discrete,
  buttonText,
  title,
  onOk,
  children
}: {
  style?: ActionStyle;
  discrete?: boolean;
  buttonText: string;
  title?: string;
  onOk: () => void;
  children: React.ReactNode;
}): React.ReactNode {
  const [isOpen, doOpen] = useState(false);

  style = style ?? ActionStyles.View;
  title = title ?? "Confirm";

  return (
    <>
      <ActionButton
        style={style}
        discrete={discrete}
        text={buttonText}
        onClick={() => doOpen(true)}
      ></ActionButton>
      {isOpen ? (
        <Popup title="Confirmation" style={ActionStyles.Confirm}>
          {children}
          <div>
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
          </div>
        </Popup>
      ) : null}
    </>
  );
}
