import Appointment from "../business/appointment";

import { getList } from "../utils/config";
import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function appointmentElementGenerator(
  file: Appointment,
  props: PatientRelatedElementGeneratorProps
) {
  return patientRelatedElementGenerator<Appointment>(file, props, {
    header: <span>{file.center}</span>,
    body: (
      <TwoColumns>
        <Panel fixed label="Information">
          <IO.Date name="date" value={file.date} required />
          {/*
            TODO: relative time
            - https://gitlab.com/catamphetamine/react-time-ago/-/issues/17
            - https://gitlab.com/catamphetamine/javascript-time-ago/-/issues/8

            <IO.Function
            label="When"
            value={() => }
          /> */}
          <IO.List
            name="center"
            value={file.center as string}
            list={getList("Centers")}
          />
        </Panel>
        <Panel fixed label="Objective">
          <IO.Text name="purpose" value={file.purpose as string} />
        </Panel>
      </TwoColumns>
    )
  });
}
