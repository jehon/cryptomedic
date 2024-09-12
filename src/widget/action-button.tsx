import "./action-button.css";
import Restricted from "./restricted";

export type ActionStyleType = keyof typeof ActionStyles;

export type ButtonActionProps = {
  style?: ActionStyleType;
  default?: boolean;
  discrete?: boolean;
  action?: string;
  onOk?: () => void;
  linkTo?: string | string[];
  requires?: string;
};

export const ActionStyles = {
  Add: {
    css: "action-alternate",
    text: "Add"
  } as const,
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
  // https://getbootstrap.com/docs/4.0/components/buttons/

  const as = ActionStyles[props.style ?? "View"];
  const action = props.action ?? as.text;
  const linkToRaw = props.linkTo ?? "";
  const linkTo = Array.isArray(linkToRaw)
    ? "#/" + linkToRaw.join("/")
    : linkToRaw;
  const onOk =
    props.onOk ??
    (() => {
      document.location.href = linkTo;
    });

  return (
    <Restricted requires={props.requires}>
      <button
        className={"btn " + as.css + (props.discrete ? " discrete " : "")}
        onClick={onOk}
        {...(props.default ? { type: "submit" } : {})}
      >
        {action}
      </button>
    </Restricted>
  );
}
