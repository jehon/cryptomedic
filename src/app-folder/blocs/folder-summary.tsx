import React from "react";
import Button from "react-bootstrap/Button";

import { bridgeTo } from "../../bridge";
import IODate from "../../widget/io-date";
import Folder from "../../business/folder";
import PatientRelated from "../../business/patientRelated";

class FolderSummary extends React.Component<
  { folderId: string; folder: Folder },
  {}
> {
  render() {
    return (
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
    );
  }
}

bridgeTo("x-react-folder-summary", FolderSummary);

//       <IODate value={f.date} />
//     <td>summary</td>
