import { ActionStyles, type ActionStyleType } from "./action-button";
import "./popup.css";

export default function Popup(props: {
  title?: string;
  style?: ActionStyleType;
  children: React.ReactNode;
}) {
  return (
    <div className="popup" data-testid="popup">
      <div
        className={"box " + (props.style ? ActionStyles[props.style].css : "")}
      >
        <h2>{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
}
