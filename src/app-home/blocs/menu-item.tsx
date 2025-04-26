import { ButtonGroup } from "react-bootstrap";
import { routeTo } from "../../main";
import { toAttributeCase } from "../../utils/strings";
import ActionButton from "../../widget/action-button";
import Panel from "../../widget/panel";
import Restricted from "../../widget/restricted";
import TwoColumns from "../../widget/two-columns";
import "./menu-item.css";

export function MenuItem({
  title,
  requires: restrictedBy,
  versalIcon,
  toRoute,
  toLocation,
  buttonText,
  children
}: {
  title: string;
  requires?: string;
  versalIcon?: string;
  toRoute?: string;
  toLocation?: string;
  buttonText?: string;
  children: React.ReactNode;
}) {
  return (
    <Restricted requires={restrictedBy}>
      <div className="menu-item">
        <Panel header={title} fixed={true} testid={toAttributeCase(title)}>
          <TwoColumns>
            {versalIcon && <img className="versal-icon" src={versalIcon} />}
            <div className="description">{children}</div>
          </TwoColumns>
          <ButtonGroup>
            <ActionButton
              action={buttonText}
              onOk={() =>
                toLocation ? (document.location = toLocation) : routeTo(toRoute)
              }
            />
          </ButtonGroup>
        </Panel>
      </div>
    </Restricted>
  );
}
