import { toAttributeCase } from "../../utils/strings";
import Panel from "../../widget/panel";
import Restricted from "../../widget/restricted";
import "./menu-item.css";

export function MenuItem({
  title,
  requires: restrictedBy,
  versalIcon,
  html,
  toRoute,
  toLocation,
  buttonText,
  children
}: {
  title: string;
  requires?: string;
  versalIcon?: string;
  html?: string;
  toRoute?: string;
  toLocation?: string;
  buttonText?: string;
  children: React.ReactNode;
}) {
  return (
    <Restricted requires={restrictedBy}>
      <div className="menu-item">
        <Panel header={title} fixed={true} testid={toAttributeCase(title)}>
          {/* createElementWithTag("img", { slot: "versal", src: versalIcon }) */}
          {children}

          {/* //       createElementWithObject(XButtons, {}, [
  //         toRoute || toLocation
  //           ? createElementWithObject(
  //               XButton,
  //               {
  //                 action: XButton.Default,
  //                 "to-route": toRoute ?? false,
  //                 "to-location": toLocation ?? false
  //               },
  //               buttonText
  //             )
  //           : null
  //       ]) */}
        </Panel>
      </div>
    </Restricted>
  );
}
