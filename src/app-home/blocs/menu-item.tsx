import type { ReactElement } from "react";
import { ButtonGroup } from "react-bootstrap";
import { routeTo } from "../../main";
import { toAttributeCase } from "../../utils/strings";
import ActionButton from "../../widget/action-button";
import Panel from "../../widget/panel";
import Restricted from "../../widget/restricted";
import TwoColumns from "../../widget/two-columns";
import "./menu-item.css";

export function MenuItem(props: {
  title: string;
  requires?: string;
  versalIcon?: string;
  children: React.ReactNode;
  buttonText?: string;
  toRoute?: string;
  toLocation?: string;
  buttons?: ReactElement<typeof ActionButton>[];
}) {
  return (
    <Restricted requires={props.requires}>
      <div className="menu-item">
        <Panel
          header={props.title}
          fixed={true}
          testid={toAttributeCase(props.title)}
        >
          <TwoColumns>
            {props.versalIcon && (
              <img className="versal-icon" src={props.versalIcon} />
            )}
            <div className="description">{props.children}</div>
          </TwoColumns>
          <ButtonGroup>
            {props.buttons || (
              <ActionButton
                action={props.buttonText}
                discrete={true}
                onOk={() =>
                  props.toLocation
                    ? (document.location = props.toLocation)
                    : routeTo(props.toRoute)
                }
              />
            )}
          </ButtonGroup>
        </Panel>
      </div>
    </Restricted>
  );
}
