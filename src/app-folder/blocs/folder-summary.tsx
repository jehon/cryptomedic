import React from "react";

import { bridgeTo } from "../../bridge";
import Folder from "../business/folder";
import PatientRelated from "../business/patient-related";

import Patient from "../business/patient";
import PatientSummary from "./patient-summary";

import Appointment from "../business/appointment";
import AppointmentSummary from "./appointment-summary";
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
