import ConsultRicket from "../business/consult-ricket";

import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";

import { getList } from "../utils/session";
import { ImgSideLeft, ImgSideRight } from "../widget/images";
import IOList from "../widget/io-list";
import IONumber from "../widget/io-number";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function ConsultRicketElement({
  file,
  props
}: {
  file: ConsultRicket;
  props: PatientRelatedElementGeneratorProps;
}): React.ReactNode {
  return patientRelatedElementGenerator<ConsultRicket>({
    ...props,
    type: "consult_ricket",
    file,
    elementHeader: (
      <>
        <span className="with-image">
          <ImgSideRight></ImgSideRight>
          {file.right_leg}/{file.right_leg_angle}
        </span>
        <span className="with-image">
          <ImgSideLeft></ImgSideLeft>
          {file.left_leg}/{file.left_leg_angle}
        </span>
      </>
    ),
    elementBody: (
      <>
        <ConsultAbstractIntroduction
          file={file}
          patient={props.folder.getPatient()}
        ></ConsultAbstractIntroduction>
        <TwoColumns>
          <Panel label="Ricket Data">
            <IOList
              name="walking_difficulties"
              value={file.walking_difficulties}
              list={getList("WalkingCapacities")}
            ></IOList>
            <IOList
              name="pain"
              value={file.pain}
              list={getList("Pain")}
            ></IOList>
            <IOList
              name="wrist_enlargement"
              value={file.wrist_enlargement}
              list={getList("Eval03")}
            ></IOList>
            <IOList
              name="rib_heading"
              value={file.rib_heading}
              list={getList("Eval03")}
            ></IOList>
            <IOText name="xray" label="XRay" value={file.xray}></IOText>
            <IONumber
              name="IMIC_distance"
              label="IMIC Distance"
              value={file.IMIC_distance}
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
              value={file.right_leg}
              list={getList("LegAnalysis")}
            ></IOList>
            <IONumber
              name="right_leg_angle"
              value={file.right_leg_angle}
            ></IONumber>
            <IONumber
              label="Right Cross T"
              name="cross_right_T"
              value={file.cross_right_T}
            ></IONumber>
            <IONumber
              label="Right Cross F"
              name="cross_right_F"
              value={file.cross_right_F}
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
              value={file.left_leg}
              list={getList("LegAnalysis")}
            ></IOList>
            <IONumber
              name="left_leg_angle"
              value={file.left_leg_angle}
            ></IONumber>
            <IONumber
              name="cross_left_T"
              label="Left Cross T"
              value={file.cross_left_T}
            ></IONumber>
            <IONumber
              name="cross_left_F"
              label="Left Cross F"
              value={file.cross_left_F}
            ></IONumber>
          </Panel>
        </TwoColumns>
        <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
      </>
    )
  });
}
