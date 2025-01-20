import { ActionStyles, type ActionStyleType } from "./action-button";
import "./popup.css";

export default function Popup({
  title,
  style,
  children
}: {
  title?: string;
  style?: ActionStyleType;
  children: React.ReactNode;
}) {
  return (
    <div className="popup" data-testid="popup">
      <div className={"box " + (style ? ActionStyles[style].css : "")}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
