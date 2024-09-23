import ConsultRicket from "../business/consult-ricket";

import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";

import { getList } from "../utils/config";
import { ImgSideLeft, ImgSideRight } from "../widget/images";
import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function consultRicketElementGenerator(
  file: ConsultRicket,
  props: PatientRelatedElementGeneratorProps
) {
  return patientRelatedElementGenerator<ConsultRicket>(file, props, {
    header: (
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
    body: (
      <>
        <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
        <TwoColumns>
          <Panel label="Ricket Data">
            <IO.List
              name="walking_difficulties"
              value={file.walking_difficulties}
              list={getList("")}
            ></IO.List>
            <IO.List
              label="Pain"
              value={file.pain}
              list={getList("")}
            ></IO.List>
            <IO.List
              name="wrist_enlargement"
              value={file.wrist_enlargement}
              list={getList("")}
            ></IO.List>
            <IO.List
              name="rib_heading"
              value={file.rib_heading}
              list={getList("")}
            ></IO.List>
            <IO.Text left name="xray" label="XRay" value={file.xray}></IO.Text>
            <IO.Number
              right
              name="IMIC_distance"
              label="IMIC Distance"
              value={file.IMIC_distance}
            ></IO.Number>
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
            <IO.List
              right
              label="Leg"
              value={file.right_leg}
              list={getList("")}
            ></IO.List>
            <IO.Number
              right
              name="right_leg_angle"
              label="Leg Angle"
              value={file.right_leg_angle}
            ></IO.Number>
            <IO.Number
              right
              name="cross_right_T"
              value={file.cross_right_T}
            ></IO.Number>
            <IO.Number
              right
              name="cross_right_F"
              value={file.cross_right_F}
            ></IO.Number>
          </Panel>
          <Panel
            header={
              <>
                <ImgSideLeft></ImgSideLeft>
                <span>Left leg</span>
              </>
            }
          >
            <IO.List
              left
              label="Leg"
              value={file.left_leg}
              list={getList("")}
            ></IO.List>
            <IO.Number
              left
              name="left_leg_angle"
              label="Leg Angle"
              value={file.left_leg_angle}
            ></IO.Number>
            <IO.Number
              left
              name="cross_left_T"
              label="Cross T"
              value={file.cross_left_T}
            ></IO.Number>
            <IO.Number
              left
              name="cross_left_F"
              label="Cross F"
              value={file.cross_left_F}
            ></IO.Number>
            <IO.Number
              left
              name="IMIC_distance"
              label="IMIC Distance"
              value={file.IMIC_distance}
            ></IO.Number>
          </Panel>
        </TwoColumns>
        <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
      </>
    )
  });
}
