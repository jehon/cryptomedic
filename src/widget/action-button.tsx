import React from "react";

import "./action-button.css";

export type ActionStyleType = keyof typeof ActionStyles;

export type ButtonActionProps = {
  style?: ActionStyleType;
  discrete?: boolean;
  action?: string;
  onOk?: () => void;
  linkTo?: string | string[];
};

export const ActionStyles = {
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
  Edit: {
    css: "action-view",
    text: "Edit"
  } as const,
  View: {
    css: "action-view",
    text: "View"
  } as const
};

export default function ActionButton(
  props: ButtonActionProps
): React.ReactNode {
  const as = ActionStyles[props.style ?? "View"];
  const action = props.action ?? as.text;
  const linkToRaw = props.linkTo ?? "";
  const linkTo = Array.isArray(linkToRaw)
    ? "#/" + linkToRaw.join("/")
    : linkToRaw;
  const onOk =
    props.onOk ??
    (() => {
      document.location.href = linkTo as string;
    });

  return (
    <div
      className={
        " action-button " + as.css + (props.discrete ? " discrete " : "")
      }
      onClick={onOk}
    >
      {action}
    </div>
  );
}
