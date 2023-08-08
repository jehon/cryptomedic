import React from "react";

import { bridgeTo } from "../../bridge";
import Folder from "../business/folder";
import Patient from "../business/patient";
import Picture from "../business/picture";
import PatientRelated from "../business/patient-related";

import PatientSummary from "./patient-summary";
import PictureSummary from "./picture-summary";

class FolderSummary extends React.Component<
  { folderId: string; folder: Folder },
  {}
> {
  render() {
    return (
      <div>
        <PatientSummary
          file={this.props.folder.getPatient() as Patient}
          folder={this.props.folder}
        ></PatientSummary>
        {(this.props.folder.getFilesRelatedToPatient() as PatientRelated[]).map(
          (file: PatientRelated, index: number) => {
            if (file instanceof Picture) {
              return (
                <PictureSummary
                  folder={this.props.folder}
                  file={file}
                ></PictureSummary>
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
