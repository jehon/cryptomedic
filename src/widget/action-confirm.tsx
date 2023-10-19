import React, { useState } from "react";
import ActionButton, { ActionStyle, ActionStyles } from "./action-button";
import useRequiresTransaction from "../utils/use-requires-transaction";
import Popup from "./popup";

export default function ActionConfirm({
  style,
  buttonText,
  title,
  requiresTransaction,
  onOk,
  children
}: {
  style?: ActionStyle;
  buttonText: string;
  title?: string;
  requiresTransaction?: string;
  onOk: () => void;
  children: React.ReactNode;
}): React.ReactNode {
  const isAllowed = useRequiresTransaction(requiresTransaction);
  const [isOpen, doOpen] = useState(false);

  style = style ?? ActionStyles.View;
  title = title ?? "Confirm";

  return (
    <>
      <ActionButton
        style={style}
        text={buttonText}
        onClick={() => doOpen(true)}
        requiresTransaction={requiresTransaction}
      ></ActionButton>
      {isOpen ? (
        <Popup title="Confirmation" style={ActionStyles.Confirm}>
          {children}
          <div>
            <ActionButton
              style={ActionStyles.Cancel}
              text="Cancel"
              onClick={() => doOpen(false)}
            />
            <ActionButton
              style={style}
              text="ok"
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
