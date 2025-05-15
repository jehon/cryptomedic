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

export default function AppointmentElement(
  props: PatientRelatedElementGeneratorProps<Appointment>
): React.ReactNode {
  return patientRelatedElementGenerator<Appointment>({
    ...props,
    type: "appointment",
    canBeDeleted: true,
    canBeLocked: true,
    elementHeader: <span>{props.file.center}</span>,
    elementBody: (
      <TwoColumns>
        <Panel fixed label="Information">
          <input
            type="hidden"
            name="patient_id"
            defaultValue={props.patient.id}
          />
          <IODate name="date" value={props.file.date} required />
          <IOList
            name="center"
            value={props.file.center as string}
            list={getList("Centers")}
          />
        </Panel>
        <Panel fixed label="Objective">
          <IOText name="purpose" value={props.file.purpose as string} />
        </Panel>
      </TwoColumns>
    )
  });
}
