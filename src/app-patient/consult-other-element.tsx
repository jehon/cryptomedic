import { getList } from "../utils/session";
import IOList from "../widget/io-list";
import IOString from "../widget/io-string";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";
import type { ConsultOther } from "./objects";
import patientRelatedElementGenerator, {
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function ConsultOtherElement(
  props: PatientRelatedElementGeneratorProps<ConsultOther>
): React.ReactNode {
  return patientRelatedElementGenerator<ConsultOther>({
    ...props,
    type: "consult_other",
    canBeDeleted: true,
    canBeLocked: true,
    elementHeader: <>{props.file.side}</>,
    elementBody: (
      <>
        <ConsultAbstractIntroduction
          file={props.file}
          patient={props.patient}
        ></ConsultAbstractIntroduction>
        <TwoColumns>
          <Panel label="Orthopedic data">
            <IOList
              name="side"
              value={props.file.side}
              list={getList("Side")}
              required
            ></IOList>
            <IOString
              name="joints_or_bones_affected"
              label="Joints or Bones Affected"
              value={props.file.joints_or_bones_affected}
            ></IOString>
            <IOString name="deformity" value={props.file.deformity}></IOString>
            <IOString
              name="articulation_mobility"
              value={props.file.articulation_mobility}
            ></IOString>
            <IOString
              name="muscle_strength"
              value={props.file.muscle_strength}
            ></IOString>
            <IOList
              name="pain"
              value={props.file.pain}
              list={getList("Pain")}
            ></IOList>
            <IOList
              name="walk"
              value={props.file.walk}
              list={getList("WalkingCapacities")}
            ></IOList>
            <IOString
              name="xray"
              label="XRay"
              value={props.file.xray}
            ></IOString>
          </Panel>
          <Panel label="Orthopedic observations">
            <IOText
              name="examination_data"
              value={props.file.examination_data}
            ></IOText>
          </Panel>
        </TwoColumns>
        <ConsultAbstractConclusion
          file={props.file}
        ></ConsultAbstractConclusion>
      </>
    )
  });
}
