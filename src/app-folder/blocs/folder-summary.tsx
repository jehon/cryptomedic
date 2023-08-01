import React from "react";
import Button from "react-bootstrap/Button";

import { bridgeTo } from "../../bridge";
import PatientSummary from "./patient-summary";
import IODate from "../../widget/io-date";
import Folder from "../../../legacy/app-old/v2/models/Folder";
import Patient from "../../../legacy/app-old/v2/models/Patient";

class FolderSummary extends React.Component<
  { folderId: string; folder: Folder },
  {}
> {
  render() {
    return (
      <div>
        <PatientSummary
          patient={this.props.folder.getPatient() as Patient}
        ></PatientSummary>
        <table id="table_summary" className="summary table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Element</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <IODate value={new Date()} />
              </td>
            </tr>
            {this.props.folder
              .getFilesRelatedToPatient()
              .map((file: PatientRelated, index: number) => (
                <tr key={index}>
                  <td>#{index}</td>
                  <td>
                    <Button
                      href="#/folder/{folder.getId()}/file/{f.getModel()}/{f.id}"
                      style={{ width: "100%" }}
                    >
                      {file.getModel()}
                    </Button>
                  </td>
                  <td></td>
                  <td>summary</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

bridgeTo("x-react-folder-summary", FolderSummary);

//       <IODate value={f.date} />
//     <td>summary</td>
