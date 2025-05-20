import { getList } from "../utils/session";
import IODate from "../widget/io-date";
import IOList from "../widget/io-list";
import IOPanelWithNavigation from "../widget/io-panel-with-navigation";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import type { Appointment, Patient } from "./objects-patient";
import { type RelatedElementGeneratorProps } from "./patient-related-element-generator";

export default function AppointmentElement(
  props: { patient: Patient } & RelatedElementGeneratorProps<Appointment>
): React.ReactNode {
  return (
    <IOPanelWithNavigation<Appointment>
      key={`appointment.${props.file.id}`}
      type="appointment"
      file={props.file}
      apiRootUrl={`fiche/appointment`} // No leading slash!
      edit={props.edit}
      closed={props.closed}
      requireBase="folder"
      canBeDeleted={true}
      canBeLocked={false}
      onCreated={props.onCreated}
      onUpdated={props.onUpdated}
      onDeleted={props.onDeleted}
      basePath={`${props.parentPath}/appointment/${props.file.id ?? "add"}`}
      header={<span>{props.file.center}</span>}
    >
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
    </IOPanelWithNavigation>
  );
}
