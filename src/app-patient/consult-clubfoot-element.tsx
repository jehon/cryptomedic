import React from "react";

import ConsultClubfoot from "../business/consult-clubfoot";
import Folder from "../business/folder";

import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";

import { tryOrMessage } from "../utils/strings";
import { ImgSideLeft, ImgSideRight } from "../widget/images";
import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel, { FolderUpdateCallback } from "./blocs/file-panel";

export default function ConsultClubfootElement({
  file,
  folder,
  opened,
  onUpdate
}: {
  file: ConsultClubfoot;
  folder: Folder;
  opened?: boolean;
  onUpdate: FolderUpdateCallback;
}): React.ReactNode {
  return (
    <FilePanel
      closed={!opened}
      file={file}
      folder={folder}
      onUpdate={onUpdate}
      header={
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
          header={
            <>
              <ImgSideRight></ImgSideRight>
              <span>Pirani Right (&lt; 3 years)</span>
              {tryOrMessage(() => file.getPiraniRight(), "")}
            </>
          }
        >
          <div className="separator">Mid Foot</div>
          <IO.List
            right
            name="curved_lateral_border_right"
            label="Curved Lateral Border"
            value={file.curved_lateral_border_right}
          ></IO.List>
          <IO.List
            right
            name="medial_crease_right"
            label="Medial Crease"
            value={file.medial_crease_right}
          ></IO.List>
          <IO.List
            right
            name="talar_head_coverage_right"
            label="Talar Head Coverage"
            value={file.talar_head_coverage_right}
          ></IO.List>
          <div className="separator">Hind Foot</div>
          <IO.List
            right
            name="posterior_crease_right"
            label="Posterior Crease"
            value={file.posterior_crease_right}
          ></IO.List>
          <IO.List
            right
            name="rigid_equinus_right"
            label="Rigid Equinus"
            value={file.rigid_equinus_right}
          ></IO.List>
          <IO.List
            right
            name="empty_heel_right"
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
          header={
            <>
              <ImgSideLeft></ImgSideLeft>
              <span>Pirani Left (&lt; 3 years)</span>
              {tryOrMessage(() => file.getPiraniLeft(), "")}
            </>
          }
        >
          <div className="separator">Mid Foot</div>
          <IO.List
            left
            name="curved_lateral_border_left"
            label="Curved Lateral Border"
            value={file.curved_lateral_border_left}
          ></IO.List>
          <IO.List
            left
            name="medial_crease_left"
            label="Medial Crease"
            value={file.medial_crease_left}
          ></IO.List>
          <IO.List
            left
            name="talar_head_coverage_left"
            label="Talar Head Coverage"
            value={file.talar_head_coverage_left}
          ></IO.List>
          <div className="separator">Hind Foot</div>
          <IO.List
            left
            name="posterior_crease_left"
            label="Posterior Crease"
            value={file.posterior_crease_left}
          ></IO.List>
          <IO.List
            left
            name="rigid_equinus_left"
            label="Rigid Equinus"
            value={file.rigid_equinus_left}
          ></IO.List>
          <IO.List
            left
            name="empty_heel_left"
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
        <Panel
          fixed
          header={
            <>
              <ImgSideRight></ImgSideRight>
              <span>Pirani Right (&gt; 3 years)</span>
            </>
          }
        >
          <IO.List right label="Pain" value={file.pain_right}></IO.List>
          <IO.List
            right
            name="walking_floor_contact_right"
            label="Walking Floor Contact"
            value={file.walking_floor_contact_right}
          ></IO.List>
          <IO.List
            right
            name="walking_first_contact_right"
            label="Walking First Contact"
            value={file.walking_first_contact_right}
          ></IO.List>
          <IO.List
            right
            name="jumping_one_leg_right"
            label="Jumping One Leg"
            value={file.jumping_one_leg_right}
          ></IO.List>
          <IO.List
            right
            name="run_right"
            label="Run"
            value={file.run_right}
          ></IO.List>
          <IO.Number
            right
            name="adduction_angle_right"
            label="Adduction Angle"
            value={file.adduction_angle_right}
          ></IO.Number>
          <IO.Number
            right
            name="hind_foot_angle_W_right"
            label="Hind Foot Angle W"
            value={file.hind_foot_angle_W_right}
          ></IO.Number>
          <IO.Number
            right
            name="dorsal_flexion_max_right"
            label="Dorsal Flexion Max"
            value={file.dorsal_flexion_max_right}
          ></IO.Number>
          <IO.Number
            right
            name="plantar_flexion_max_right"
            label="Plantar Flexion Max"
            value={file.plantar_flexion_max_right}
          ></IO.Number>
          <IO.Boolean
            right
            name="muscular_inbalance_right"
            label="Muscular Inbalance"
            value={file.muscular_inbalance_right}
          ></IO.Boolean>
        </Panel>

        <Panel
          fixed
          header={
            <>
              <ImgSideLeft></ImgSideLeft>
              <span>Pirani Left (&gt; 3 years)</span>
            </>
          }
        >
          <IO.List left label="Pain" value={file.pain_left}></IO.List>
          <IO.List
            left
            name="walking_floor_contact_left"
            label="Walking Floor Contact"
            value={file.walking_floor_contact_left}
          ></IO.List>
          <IO.List
            left
            name="walking_first_contact_left"
            label="Walking First Contact"
            value={file.walking_first_contact_left}
          ></IO.List>
          <IO.List
            left
            name="jumping_one_leg_left"
            label="Jumping One Leg"
            value={file.jumping_one_leg_left}
          ></IO.List>
          <IO.List
            left
            name="run_left"
            label="Run"
            value={file.run_left}
          ></IO.List>
          <IO.Number
            left
            name="adduction_angle_left"
            label="Adduction Angle"
            value={file.adduction_angle_left}
          ></IO.Number>
          <IO.Number
            left
            name="hind_foot_angle_W_left"
            label="Hind Foot Angle W"
            value={file.hind_foot_angle_W_left}
          ></IO.Number>
          <IO.Number
            left
            name="dorsal_flexion_max_left"
            label="Dorsal Flexion Max"
            value={file.dorsal_flexion_max_left}
          ></IO.Number>
          <IO.Number
            left
            name="plantar_flexion_max_left"
            label="Plantar Flexion Max"
            value={file.plantar_flexion_max_left}
          ></IO.Number>
          <IO.Boolean
            left
            name="muscular_inbalance_left"
            label="Muscular Inbalance"
            value={file.muscular_inbalance_left}
          ></IO.Boolean>
        </Panel>
      </TwoColumns>
      <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
    </FilePanel>
  );
}
