import { getList } from "../utils/session";
import { ImgSideLeft, ImgSideRight } from "../widget/images";
import IOList from "../widget/io-list";
import IONumber from "../widget/io-number";
import IOPanelWithNavigation from "../widget/io-panel-with-navigation";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";
import type { ConsultRicket, Patient } from "./objects-patient";
import { type RelatedElementGeneratorProps } from "./patient-related-element-generator";

export default function ConsultRicketElement(
  props: { patient: Patient } & RelatedElementGeneratorProps<ConsultRicket>
): React.ReactNode {
  return (
    <IOPanelWithNavigation<ConsultRicket>
      key={`consult_ricket.${props.file.id}`}
      type="consult_ricket"
      file={props.file}
      apiRootUrl={`fiche/consult_ricket`} // No leading slash!
      edit={props.edit}
      closed={props.closed}
      restrictedTo="folder"
      canBeDeleted={true}
      canBeLocked={true}
      onCreated={props.onCreated}
      onUpdated={props.onUpdated}
      onDeleted={props.onDeleted}
      basePath={`${props.parentPath}/consult_ricket/${props.file.id ?? "add"}`}
      header={
        <>
          <span className="with-image">
            <ImgSideRight></ImgSideRight>
            {props.file.right_leg}/{props.file.right_leg_angle}
          </span>
          <span className="with-image">
            <ImgSideLeft></ImgSideLeft>
            {props.file.left_leg}/{props.file.left_leg_angle}
          </span>
        </>
      }
    >
      <ConsultAbstractIntroduction
        file={props.file}
        patient={props.patient}
      ></ConsultAbstractIntroduction>
      <TwoColumns>
        <Panel label="Ricket Data">
          <IOList
            name="walking_difficulties"
            value={props.file.walking_difficulties}
            list={getList("WalkingCapacities")}
          ></IOList>
          <IOList
            name="pain"
            value={props.file.pain}
            list={getList("Pain")}
          ></IOList>
          <IOList
            name="wrist_enlargement"
            value={props.file.wrist_enlargement}
            list={getList("Eval03")}
          ></IOList>
          <IOList
            name="rib_heading"
            value={props.file.rib_heading}
            list={getList("Eval03")}
          ></IOList>
          <IOText name="xray" label="XRay" value={props.file.xray}></IOText>
          <IONumber
            name="IMIC_distance"
            label="IMIC Distance"
            value={props.file.IMIC_distance}
          ></IONumber>
        </Panel>
      </TwoColumns>
      <TwoColumns>
        <Panel
          header={
            <>
              <ImgSideRight></ImgSideRight>
              <span>Right Leg</span>
            </>
          }
        >
          <IOList
            name="right_leg"
            value={props.file.right_leg}
            list={getList("LegAnalysis")}
          ></IOList>
          <IONumber
            name="right_leg_angle"
            value={props.file.right_leg_angle}
          ></IONumber>
          <IONumber
            label="Right Cross T"
            name="cross_right_T"
            value={props.file.cross_right_T}
          ></IONumber>
          <IONumber
            label="Right Cross F"
            name="cross_right_F"
            value={props.file.cross_right_F}
          ></IONumber>
        </Panel>
        <Panel
          header={
            <>
              <ImgSideLeft></ImgSideLeft>
              <span>Left leg</span>
            </>
          }
        >
          <IOList
            name="left_leg"
            value={props.file.left_leg}
            list={getList("LegAnalysis")}
          ></IOList>
          <IONumber
            name="left_leg_angle"
            value={props.file.left_leg_angle}
          ></IONumber>
          <IONumber
            name="cross_left_T"
            label="Left Cross T"
            value={props.file.cross_left_T}
          ></IONumber>
          <IONumber
            name="cross_left_F"
            label="Left Cross F"
            value={props.file.cross_left_F}
          ></IONumber>
        </Panel>
      </TwoColumns>
      <ConsultAbstractConclusion file={props.file}></ConsultAbstractConclusion>
    </IOPanelWithNavigation>
  );
}
