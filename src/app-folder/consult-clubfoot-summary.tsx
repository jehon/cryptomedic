import React from "react";

import ConsultClubfoot from "../business/club-foot";
import Folder from "../business/folder";

import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";
import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";

import FilePanel from "./blocs/file-panel";
import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { ImgSideLeft, ImgSideRight } from "../widget/images";
import { tryOrMessage } from "../utils/strings";

export default function ConsultClubfootSummary({
  file,
  folder
}: {
  file: ConsultClubfoot;
  folder: Folder;
}): React.ReactNode {
  return (
    <FilePanel
      closed
      file={file}
      folder={folder}
      headers={
        <>
          <span className="with-image">
            <ImgSideRight></ImgSideRight>
            {file.getPiraniRight() as number}
          </span>
          <span className="with-image">
            <ImgSideLeft></ImgSideLeft>
            {file.getPiraniLeft() as number}
          </span>
        </>
      }
    >
      <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
      <TwoColumns>
        <Panel
          fixed
          headers={[
            <ImgSideRight></ImgSideRight>,
            <span>Pirani Right (&lt; 3 years)</span>,
            tryOrMessage(() => file.getPiraniRight(), "")
          ]}
        >
          <div className="separator">Mid Foot</div>
          <IO.List
            right
            label="Curved Lateral Border"
            value={file.curved_lateral_border_right}
          ></IO.List>
          <IO.List
            right
            label="Medial Crease"
            value={file.medial_crease_right}
          ></IO.List>
          <IO.List
            right
            label="Talar Head Coverage"
            value={file.talar_head_coverage_right}
          ></IO.List>
          <div className="separator">Hind Foot</div>
          <IO.List
            right
            label="Posterior Crease"
            value={file.posterior_crease_right}
          ></IO.List>
          <IO.List
            right
            label="Rigid Equinus"
            value={file.rigid_equinus_right}
          ></IO.List>
          <IO.List
            right
            label="Empty Heel"
            value={file.empty_heel_right}
          ></IO.List>
          <div className="separator">Score</div>
          <IO.Function
            right
            label="Score"
            value={() => file.getPiraniRight() + ""}
          ></IO.Function>
        </Panel>
        <Panel
          fixed
          headers={[
            <ImgSideLeft></ImgSideLeft>,
            <span>Pirani Left (&lt; 3 years)</span>,
            tryOrMessage(() => file.getPiraniLeft(), "")
          ]}
        >
          <div className="separator">Mid Foot</div>
          <IO.List
            left
            label="Curved Lateral Border"
            value={file.curved_lateral_border_left}
          ></IO.List>
          <IO.List
            left
            label="Medial Crease"
            value={file.medial_crease_left}
          ></IO.List>
          <IO.List
            left
            label="Talar Head Coverage"
            value={file.talar_head_coverage_left}
          ></IO.List>
          <div className="separator">Hind Foot</div>
          <IO.List
            left
            label="Posterior Crease"
            value={file.posterior_crease_left}
          ></IO.List>
          <IO.List
            left
            label="Rigid Equinus"
            value={file.rigid_equinus_left}
          ></IO.List>
          <IO.List
            left
            label="Empty Heel"
            value={file.empty_heel_left}
          ></IO.List>
          <div className="separator">Score</div>
          <IO.Function
            left
            label="Score"
            value={() => file.getPiraniLeft() + ""}
          ></IO.Function>
        </Panel>
      </TwoColumns>
      <TwoColumns>
        <Panel fixed label="Pirani Right (> 3 years)">
          <div className="with-image">
            <ImgSideRight></ImgSideRight>
            Right side
          </div>
          <IO.List right label="Pain" value={file.pain_right}></IO.List>
          <IO.List
            right
            label="Walking Floor Contact"
            value={file.walking_floor_contact_right}
          ></IO.List>
          <IO.List
            right
            label="Walking First Contact"
            value={file.walking_first_contact_right}
          ></IO.List>
          <IO.List
            right
            label="Jumping One Leg"
            value={file.jumping_one_leg_right}
          ></IO.List>
          <IO.List right label="Empty Heel" value={file.run_right}></IO.List>
          <IO.Number
            right
            label="Adduction Angle"
            value={file.adduction_angle_right}
          ></IO.Number>
          <IO.Number
            right
            label="Hind Foot Angle W"
            value={file.hind_foot_angle_W_right}
          ></IO.Number>
          <IO.Number
            right
            label="Dorsal Flexion Max"
            value={file.dorsal_flexion_max_right}
          ></IO.Number>
          <IO.Number
            right
            label="Plantar Flexion Max"
            value={file.plantar_flexion_max_right}
          ></IO.Number>
          <IO.Boolean
            right
            label="Muscular Inbalance"
            value={file.muscular_inbalance_right}
          ></IO.Boolean>
        </Panel>

        <Panel fixed label="Pirani Left (> 3 years)">
          <div className="with-image">
            <ImgSideLeft></ImgSideLeft>
            Left side
          </div>
          <IO.List left label="Pain" value={file.pain_left}></IO.List>
          <IO.List
            left
            label="Walking Floor Contact"
            value={file.walking_floor_contact_left}
          ></IO.List>
          <IO.List
            left
            label="Walking First Contact"
            value={file.walking_first_contact_left}
          ></IO.List>
          <IO.List
            left
            label="Jumping One Leg"
            value={file.jumping_one_leg_left}
          ></IO.List>
          <IO.List left label="Empty Heel" value={file.run_left}></IO.List>
          <IO.Number
            left
            label="Adduction Angle"
            value={file.adduction_angle_left}
          ></IO.Number>
          <IO.Number
            left
            label="Hind Foot Angle W"
            value={file.hind_foot_angle_W_left}
          ></IO.Number>
          <IO.Number
            left
            label="Dorsal Flexion Max"
            value={file.dorsal_flexion_max_left}
          ></IO.Number>
          <IO.Number
            left
            label="Plantar Flexion Max"
            value={file.plantar_flexion_max_left}
          ></IO.Number>
          <IO.Boolean
            left
            label="Muscular Inbalance"
            value={file.muscular_inbalance_left}
          ></IO.Boolean>
        </Panel>
      </TwoColumns>
      <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
    </FilePanel>
  );
}
