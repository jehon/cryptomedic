import React from "react";
import { Link } from "react-router-dom";

const ActionsEnum = {
  Alternate: {
    css: "action-alternate",
    text: "Alternate"
  },
  Cancel: {
    css: "action-cancel",
    text: "Cancel"
  },
  Confirm: {
    css: "action-confirm",
    text: "confirm"
  },
  Delete: {
    css: "action-delete",
    text: "Delete"
  },
  View: {
    css: "action-view",
    text: "View"
  }
};

type Actions = (typeof ActionsEnum)[keyof typeof ActionsEnum];

export default function ActionButton({
  style,
  text,
  accessRight,
  onClick,
  linkTo
}: {
  style?: Actions;
  text?: string;
  accessRight?: string;
  onClick?: () => void;
  linkTo?: string | string[];
}): React.ReactNode {
  style = style ?? ActionsEnum.View;
  text = text ?? style.text;
  onClick = onClick ?? (() => {});
  linkTo = linkTo ?? "";
  if (Array.isArray(linkTo)) {
    linkTo = "#/" + linkTo.join("/");
  }

  return (
    <a href={linkTo}>
      <div className={"action-button" + " " + style.css} onClick={onClick}>
        {text}
      </div>
    </a>
  );
}

// To simplify import
ActionButton.Actions = ActionsEnum;
