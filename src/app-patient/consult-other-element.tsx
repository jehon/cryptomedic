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

export default function ConsultOtherElement({
  file,
  props
}: {
  file: ConsultOther;
  props: PatientRelatedElementGeneratorProps;
}): React.ReactNode {
  return patientRelatedElementGenerator<ConsultOther>({
    ...props,
    type: "consult_other",
    file,
    canBeDeleted: true,
    canBeLocked: true,
    elementHeader: <>{file.side}</>,
    elementBody: (
      <>
        <ConsultAbstractIntroduction
          file={file}
          patient={props.folder.getPatient()}
        ></ConsultAbstractIntroduction>
        <TwoColumns>
          <Panel label="Orthopedic data">
            <IOList
              name="side"
              value={file.side}
              list={getList("Side")}
              required
            ></IOList>
            <IOString
              name="joints_or_bones_affected"
              label="Joints or Bones Affected"
              value={file.joints_or_bones_affected}
            ></IOString>
            <IOString name="deformity" value={file.deformity}></IOString>
            <IOString
              name="articulation_mobility"
              value={file.articulation_mobility}
            ></IOString>
            <IOString
              name="muscle_strength"
              value={file.muscle_strength}
            ></IOString>
            <IOList
              name="pain"
              value={file.pain}
              list={getList("Pain")}
            ></IOList>
            <IOList
              name="walk"
              value={file.walk}
              list={getList("WalkingCapacities")}
            ></IOList>
            <IOString name="xray" label="XRay" value={file.xray}></IOString>
          </Panel>
          <Panel label="Orthopedic observations">
            <IOText
              name="examination_data"
              value={file.examination_data}
            ></IOText>
          </Panel>
        </TwoColumns>
        <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
      </>
    )
  });
}
