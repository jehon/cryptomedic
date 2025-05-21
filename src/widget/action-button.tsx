import "./action-button.css";
import Restricted from "./restricted";

export type ActionStyleType = keyof typeof ActionStyles;

export type ButtonActionProps = {
  style?: ActionStyleType;
  default?: boolean;
  discrete?: boolean;
  action?: string;
  onOk?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  linkTo?: string | string[];
  restrictedTo?: string;
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
  } as const,
  Reset: {
    css: "action-alternate",
    text: "Reset"
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
    (props.linkTo
      ? () => {
          document.location.href = linkTo;
        }
      : undefined);

  return (
    <Restricted to={props.restrictedTo}>
      <button
        className={"btn " + as.css + (props.discrete ? " discrete " : "")}
        onClick={onOk}
        {
          //https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type
          // by default, it is a submit button
          ...(props.default ? { type: "submit" } : { type: "button" })
        }
      >
        {action}
      </button>
    </Restricted>
  );
}
