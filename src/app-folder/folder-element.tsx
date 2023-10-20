import React from "react";

import PatientRelated from "../business/abstracts/patient-related";
import Folder from "../business/folder";

import Patient from "../business/patient";
import PatientElement from "./patient-element";

import Appointment from "../business/appointment";
import Bill from "../business/bill";
import ConsultClubfoot from "../business/consult-clubfoot";
import ConsultOther from "../business/consult-other";
import ConsultRicket from "../business/consult-ricket";
import Picture from "../business/picture";
import Surgery from "../business/surgery";
import AppointmentElement from "./appointment-element";
import BillElement from "./bill-element";
import ConsultClubfootElement from "./consult-clubfoot-element";
import ConsultOtherElement from "./consult-other-element";
import ConsultRicketElement from "./consult-ricket-element";
import PictureElement from "./picture-element";
import SurgeryElement from "./surgery-element";

import { defaultWidthScreen } from "../styles/style-helpers";
import IO from "../widget/io";
import Panel from "../widget/panel";

export default function FolderElement({
  folder,
  uid
}: {
  folder: Folder;
  uid?: string;
}): React.ReactNode {
  const updated = () => {};

    return <div>No folder selected</div>;
  }
  return (
    <div
      data-role="summary"
      style={{ width: defaultWidthScreen, margin: "0 auto" }}
    >
      <Panel key="key-dates" label="Key dates">
        <IO.Date label="Last seen" value={folder.getLastSeen()} />
        <IO.Date label="Next appointment" value={folder.getNextAppoinment()} />
      </Panel>
      <PatientElement
        key={(folder.getPatient() as Patient).uid()}
        file={folder.getPatient() as Patient}
        folder={folder}
        opened={folder.getPatient().uid() == uid || !uid}
      ></PatientElement>
      {(folder.getFilesRelatedToPatient() as PatientRelated[]).map(
        (file: PatientRelated, index: number) => {
          if (file instanceof Appointment) {
            return (
              <AppointmentElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() == uid}
                onUpdate={updated}
              ></AppointmentElement>
            );
          }
          if (file instanceof Bill) {
            return (
              <BillElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() == uid}
                onUpdate={updated}
              ></BillElement>
            );
          }
          if (file instanceof ConsultClubfoot) {
            return (
              <ConsultClubfootElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() == uid}
                onUpdate={updated}
              ></ConsultClubfootElement>
            );
          }
          if (file instanceof ConsultOther) {
            return (
              <ConsultOtherElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() == uid}
                onUpdate={updated}
              ></ConsultOtherElement>
            );
          }
          if (file instanceof ConsultRicket) {
            return (
              <ConsultRicketElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() == uid}
                onUpdate={updated}
              ></ConsultRicketElement>
            );
          }
          if (file instanceof Picture) {
            return (
              <PictureElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() == uid}
                onUpdate={updated}
              ></PictureElement>
            );
          }
          if (file instanceof Surgery) {
            return (
              <SurgeryElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() == uid}
                onUpdate={updated}
              ></SurgeryElement>
            );
          }
          return null;
        }
      )}
    </div>
  );
}
