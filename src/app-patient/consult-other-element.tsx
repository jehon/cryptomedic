import ConsultOther from "../business/consult-other";

import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";

import { getList } from "../utils/config";
import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function consultOtherElementGenerator(
  file: ConsultOther,
  props: PatientRelatedElementGeneratorProps
) {
  return patientRelatedElementGenerator<ConsultOther>(file, props, {
    header: <>{file.side}</>,
    body: (
      <>
        <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
        <TwoColumns>
          <Panel label="Orthopedic data">
            <IO.List
              name="side"
              value={file.side}
              list={getList("Side")}
              required
            ></IO.List>
            <IO.String
              name="joints_or_bones_affected"
              label="Joints or Bones Affected"
              value={file.joints_or_bones_affected}
            ></IO.String>
            <IO.String name="deformity" value={file.deformity}></IO.String>
            <IO.String
              name="articulation_mobility"
              value={file.articulation_mobility}
            ></IO.String>
            <IO.String
              name="muscle_strength"
              value={file.muscle_strength}
            ></IO.String>
            <IO.List
              name="pain"
              value={file.pain}
              list={getList("Pain")}
            ></IO.List>
            <IO.List
              name="walk"
              value={file.walk}
              list={getList("WalkingCapacities")}
            ></IO.List>
            <IO.String name="xray" label="XRay" value={file.xray}></IO.String>
          </Panel>
          <Panel label="Orthopedic observations">
            <IO.Text
              name="examination_data"
              value={file.examination_data}
            ></IO.Text>
          </Panel>
        </TwoColumns>
        <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
      </>
    )
  });
}
