import { getList } from "../utils/session";
import IODate from "../widget/io-date";
import IOList from "../widget/io-list";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import type { Appointment } from "./objects";
import patientRelatedElementGenerator, {
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function AppointmentElement({
  file,
  props
}: {
  file: Appointment;
  props: PatientRelatedElementGeneratorProps;
}): React.ReactNode {
  return patientRelatedElementGenerator<Appointment>({
    ...props,
    type: "appointment",
    file,
    canBeDeleted: true,
    canBeLocked: true,
    elementHeader: <span>{file.center}</span>,
    elementBody: (
      <TwoColumns>
        <Panel fixed label="Information">
          <input
            type="hidden"
            name="patient_id"
            defaultValue={props.folder.id}
          />
          <IODate name="date" value={file.date} required />
          <IOList
            name="center"
            value={file.center as string}
            list={getList("Centers")}
          />
        </Panel>
        <Panel fixed label="Objective">
          <IOText name="purpose" value={file.purpose as string} />
        </Panel>
      </TwoColumns>
    )
  });
}
