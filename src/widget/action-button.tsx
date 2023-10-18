import React, { useSyncExternalStore } from "react";

import "./action-button.css";
import useRequiresTransaction from "../utils/use-requires-transaction";

export type ActionStyle = {
  css: string;
  text: string;
};

export const ActionStyles: Record<string, ActionStyle> = {
  Alternate: {
    css: "action-alternate",
    text: "Alternate"
  } as const,
  Cancel: {
    css: "action-cancel",
    text: "Cancel"
  } as const,
  Confirm: {
    css: "action-confirm",
    text: "confirm"
  } as const,
  Delete: {
    css: "action-delete",
    text: "Delete"
  } as const,
  View: {
    css: "action-view",
    text: "View"
  } as const
};

export default function ActionButton({
  style,
  text,
  onClick,
  linkTo,
  requiresTransaction
}: {
  style?: ActionStyle;
  text?: string;
  onClick?: () => void;
  linkTo?: string | string[];
  requiresTransaction?: string;
}): React.ReactNode {
  const isAllowed = useRequiresTransaction(requiresTransaction);

  style = style ?? ActionStyles.View;
  text = text ?? style.text;
  linkTo = linkTo ?? "";
  if (Array.isArray(linkTo)) {
    linkTo = "#/" + linkTo.join("/");
  }
  onClick =
    onClick ??
    (() => {
      document.location.href = linkTo as string;
    });

  return (
    <div className={"action-button" + " " + style.css} onClick={onClick}>
      {text}
    </div>
  );
}

// To simplify import
ActionButton.ActionStyles = ActionStyles;
