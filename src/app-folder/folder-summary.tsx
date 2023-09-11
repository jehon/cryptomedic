import React from "react";

import { bridgeTo } from "../bridge";
import Folder from "../business/folder";
import PatientRelated from "../business/abstracts/patient-related";

import Patient from "../business/patient";
import PatientSummary from "./patient-summary";

import Appointment from "../business/appointment";
import AppointmentSummary from "./appointment-summary";
import Bill from "../business/bill";
import BillSummary from "./bill-summary";
import ConsultClubfoot from "../business/club-foot";
import ConsultClubfootSummary from "./consult-clubfoot-summary";
import ConsultOther from "../business/other-consult";
import ConsultOtherSummary from "./consult-other-summary";
import ConsultRicket from "../business/ricket-consult";
import ConsultRicketSummary from "./consult-ricket-summary";
import Picture from "../business/picture";
import PictureSummary from "./picture-summary";
import Surgery from "../business/surgery";
import SurgerySummary from "./surgery-summary";

import Panel from "../widget/panel";
import IO from "../widget/io";
import { defaultWidthScreen } from "../styles/style-helpers";

export default function FolderSummary({
  folderId,
  folder
}: {
  folderId: string;
  folder: Folder;
}): React.ReactNode {
  return (
    <div style={{ width: defaultWidthScreen, margin: "0 auto" }}>
      <Panel label="Key dates" closed>
        <IO.Date label="Last seen" value={folder.getLastSeen()} />
        <IO.Date label="Next appointment" value={folder.getNextAppoinment()} />
      </Panel>
      <PatientSummary
        key={(folder.getPatient() as Patient).uid()}
        file={folder.getPatient() as Patient}
        folder={folder}
      ></PatientSummary>
      {(folder.getFilesRelatedToPatient() as PatientRelated[]).map(
        (file: PatientRelated, index: number) => {
          if (file instanceof Appointment) {
            return (
              <AppointmentSummary
                key={file.uid()}
                folder={folder}
                file={file}
              ></AppointmentSummary>
            );
          }
          if (file instanceof Bill) {
            return (
              <BillSummary
                key={file.uid()}
                folder={folder}
                file={file}
              ></BillSummary>
            );
          }
          if (file instanceof ConsultClubfoot) {
            return (
              <ConsultClubfootSummary
                key={file.uid()}
                folder={folder}
                file={file}
              ></ConsultClubfootSummary>
            );
          }
          if (file instanceof ConsultOther) {
            return (
              <ConsultOtherSummary
                key={file.uid()}
                folder={folder}
                file={file}
              ></ConsultOtherSummary>
            );
          }
          if (file instanceof ConsultRicket) {
            return (
              <ConsultRicketSummary
                key={file.uid()}
                folder={folder}
                file={file}
              ></ConsultRicketSummary>
            );
          }
          if (file instanceof Picture) {
            return (
              <PictureSummary
                key={file.uid()}
                folder={folder}
                file={file}
              ></PictureSummary>
            );
          }
          if (file instanceof Surgery) {
            return (
              <SurgerySummary
                key={file.uid()}
                folder={folder}
                file={file}
              ></SurgerySummary>
            );
          }
          return null;
        }
      )}
    </div>
  );
}

bridgeTo("x-react-folder-summary", FolderSummary);
