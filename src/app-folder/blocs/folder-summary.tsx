import React from "react";

import { bridgeTo } from "../../bridge";
import Folder from "../business/folder";
import PatientRelated from "../business/patient-related";

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

class FolderSummary extends React.Component<
  { folderId: string; folder: Folder },
  {}
> {
  render() {
    return (
      <div>
        <PatientSummary
          key={(this.props.folder.getPatient() as Patient).uid()}
          file={this.props.folder.getPatient() as Patient}
          folder={this.props.folder}
        ></PatientSummary>
        {(this.props.folder.getFilesRelatedToPatient() as PatientRelated[]).map(
          (file: PatientRelated, index: number) => {
            if (file instanceof Appointment) {
              return (
                <AppointmentSummary
                  key={file.uid()}
                  folder={this.props.folder}
                  file={file}
                ></AppointmentSummary>
              );
            }
            if (file instanceof Bill) {
              return (
                <BillSummary
                  key={file.uid()}
                  folder={this.props.folder}
                  file={file}
                ></BillSummary>
              );
            }
            if (file instanceof ConsultClubfoot) {
              return (
                <ConsultClubfootSummary
                  key={file.uid()}
                  folder={this.props.folder}
                  file={file}
                ></ConsultClubfootSummary>
              );
            }
            if (file instanceof ConsultOther) {
              return (
                <ConsultOtherSummary
                  key={file.uid()}
                  folder={this.props.folder}
                  file={file}
                ></ConsultOtherSummary>
              );
            }
            if (file instanceof ConsultRicket) {
              return (
                <ConsultRicketSummary
                  key={file.uid()}
                  folder={this.props.folder}
                  file={file}
                ></ConsultRicketSummary>
              );
            }
            if (file instanceof Picture) {
              return (
                <PictureSummary
                  key={file.uid()}
                  folder={this.props.folder}
                  file={file}
                ></PictureSummary>
              );
            }
            if (file instanceof Surgery) {
              return (
                <SurgerySummary
                  key={file.uid()}
                  folder={this.props.folder}
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
}

bridgeTo("x-react-folder-summary", FolderSummary);
