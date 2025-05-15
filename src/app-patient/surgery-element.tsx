import IOBoolean from "../widget/io-boolean";
import IODate from "../widget/io-date";
import IOString from "../widget/io-string";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import type { Surgery } from "./objects";
import patientRelatedElementGenerator, {
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function SurgeryElement({
  file,
  props
}: {
  file: Surgery;
  props: PatientRelatedElementGeneratorProps;
}): React.ReactNode {
  return patientRelatedElementGenerator<Surgery>({
    ...props,
    type: "surgery",
    file,
    canBeDeleted: true,
    canBeLocked: true,
    elementHeader: (
      <>
        <span>{file.report_diagnostic}</span>
        <span>{file.report_surgeon}</span>
      </>
    ),
    elementBody: (
      <>
        <TwoColumns>
          <Panel fixed label="Report">
            <input
              type="hidden"
              name="patient_id"
              defaultValue={props.folder.id}
            />
            <IODate name="date" value={file.date} required />
            <IOString
              name="report_diagnostic"
              label="Diagnostic"
              value={file.report_diagnostic as string}
            />
            <IOString
              name="report_surgeon"
              label="Surgeon"
              value={file.report_surgeon as string}
            />
            <IOBoolean
              name="report_side_right"
              label="Side Right"
              value={file.report_side_right as string}
            />
            <IOBoolean
              name="report_side_left"
              label="Side Left"
              value={file.report_side_left as string}
            />
            <IOString
              name="report_procedure"
              label="Procedure"
              value={file.report_procedure as string}
            />
          </Panel>
          <Panel fixed label="Hospitalization Follow-up">
            <IOText
              name="follow_up_complication"
              label="Follow-Up Complications"
              value={file.follow_up_complication as string}
            />
          </Panel>
        </TwoColumns>
      </>
    )
  });
}
