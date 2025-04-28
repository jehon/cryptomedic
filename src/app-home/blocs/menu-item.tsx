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
  children,
  buttonText,
  buttons,
  toRoute,
  toLocation
}: {
  title: string;
  requires?: string;
  versalIcon?: string;
  children: React.ReactNode;
  buttonText?: string;
  toRoute?: string;
  toLocation?: string;
  buttons?: React.ReactNode[];
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
            {buttons || (
              <ActionButton
                action={buttonText}
                discrete={true}
                onOk={() =>
                  toLocation
                    ? (document.location = toLocation)
                    : routeTo(toRoute)
                }
              />
            )}
          </ButtonGroup>
        </Panel>
      </div>
    </Restricted>
  );
}
