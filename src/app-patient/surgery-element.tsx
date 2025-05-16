import IOBoolean from "../widget/io-boolean";
import IODate from "../widget/io-date";
import IOString from "../widget/io-string";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel from "./blocs/file-panel";
import type { Surgery } from "./objects";
import { type PatientRelatedElementGeneratorProps } from "./patient-related-element-generator";

export default function SurgeryElement(
  props: PatientRelatedElementGeneratorProps<Surgery>
): React.ReactNode {
  return (
    <FilePanel<Surgery>
      key={`surgery.${props.file.id}`}
      type="surgery"
      file={props.file}
      apiRootUrl={`fiche/surgery`} // No leading slash!
      edit={props.edit}
      closed={props.closed}
      canBeDeleted={true}
      canBeLocked={true}
      onCreated={props.onCreated}
      onUpdated={props.onUpdated}
      onDeleted={props.onDeleted}
      selfPath={`/patient/${props.patient.id}/surgery/${props.file.id ?? "add"}`}
      header={
        <>
          <span>{props.file.report_diagnostic}</span>
          <span>{props.file.report_surgeon}</span>
        </>
      }
    >
      <TwoColumns>
        <Panel fixed label="Report">
          <input
            type="hidden"
            name="patient_id"
            defaultValue={props.patient.id}
          />
          <IODate name="date" value={props.file.date} required />
          <IOString
            name="report_diagnostic"
            label="Diagnostic"
            value={props.file.report_diagnostic as string}
          />
          <IOString
            name="report_surgeon"
            label="Surgeon"
            value={props.file.report_surgeon as string}
          />
          <IOBoolean
            name="report_side_right"
            label="Side Right"
            value={props.file.report_side_right as string}
          />
          <IOBoolean
            name="report_side_left"
            label="Side Left"
            value={props.file.report_side_left as string}
          />
          <IOString
            name="report_procedure"
            label="Procedure"
            value={props.file.report_procedure as string}
          />
        </Panel>
        <Panel fixed label="Hospitalization Follow-up">
          <IOText
            name="follow_up_complication"
            label="Follow-Up Complications"
            value={props.file.follow_up_complication as string}
          />
        </Panel>
      </TwoColumns>
    </FilePanel>
  );
}
