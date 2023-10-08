import React from "react";

import { bridgeTo } from "../bridge";
import Folder from "../business/folder";
import PatientRelated from "../business/abstracts/patient-related";

import Patient from "../business/patient";
import PatientElement from "./patient-element";

import Appointment from "../business/appointment";
import AppointmentElement from "./appointment-element";
import Bill from "../business/bill";
import BillElement from "./bill-element";
import ConsultClubfoot from "../business/consult-clubfoot";
import ConsultClubfootElement from "./consult-clubfoot-element";
import ConsultOther from "../business/consult-other";
import ConsultOtherElement from "./consult-other-element";
import ConsultRicket from "../business/consult-ricket";
import ConsultRicketElement from "./consult-ricket-element";
import Picture from "../business/picture";
import PictureElement from "./picture-element";
import Surgery from "../business/surgery";
import SurgeryElement from "./surgery-element";

import Panel from "../widget/panel";
import IO from "../widget/io";
import { defaultWidthScreen } from "../styles/style-helpers";

export default function FolderElement({
  folder
}: {
  folder: Folder;
}): React.ReactNode {
  if (!folder) {
    return <div>No folder selected</div>;
  }
  return (
    <div
      data-role="summary"
      style={{ width: defaultWidthScreen, margin: "0 auto" }}
    >
      <Panel key="key-dates" label="Key dates" closed>
        <IO.Date label="Last seen" value={folder.getLastSeen()} />
        <IO.Date label="Next appointment" value={folder.getNextAppoinment()} />
      </Panel>
      <PatientElement
        key={(folder.getPatient() as Patient).uid()}
        file={folder.getPatient() as Patient}
        folder={folder}
      ></PatientElement>
      {(folder.getFilesRelatedToPatient() as PatientRelated[]).map(
        (file: PatientRelated, index: number) => {
          if (file instanceof Appointment) {
            return (
              <AppointmentElement
                key={file.uid()}
                folder={folder}
                file={file}
              ></AppointmentElement>
            );
          }
          if (file instanceof Bill) {
            return (
              <BillElement
                key={file.uid()}
                folder={folder}
                file={file}
              ></BillElement>
            );
          }
          if (file instanceof ConsultClubfoot) {
            return (
              <ConsultClubfootElement
                key={file.uid()}
                folder={folder}
                file={file}
              ></ConsultClubfootElement>
            );
          }
          if (file instanceof ConsultOther) {
            return (
              <ConsultOtherElement
                key={file.uid()}
                folder={folder}
                file={file}
              ></ConsultOtherElement>
            );
          }
          if (file instanceof ConsultRicket) {
            return (
              <ConsultRicketElement
                key={file.uid()}
                folder={folder}
                file={file}
              ></ConsultRicketElement>
            );
          }
          if (file instanceof Picture) {
            return (
              <PictureElement
                key={file.uid()}
                folder={folder}
                file={file}
              ></PictureElement>
            );
          }
          if (file instanceof Surgery) {
            return (
              <SurgeryElement
                key={file.uid()}
                folder={folder}
                file={file}
              ></SurgeryElement>
            );
          }
          return null;
        }
      )}
    </div>
  );
}

bridgeTo("x-react-folder-element", FolderElement);
