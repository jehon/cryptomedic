import React from "react";

import Button from "react-bootstrap/Button";

import { bridgeTo } from "./bridge";
// import IODate from "./widget/io-date";
import Labelled from "./widget/labelled";
import PatientRelated from "../legacy/app-old/v2/models/PatientRelated";

class FolderSummary extends React.Component<
  { folderId: string; folder: any },
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
          <tr id="summary_patient">
            <td></td>
            <td>
              <Button
                href="#/folder/{folder.getId()}/"
                variant="outline-info"
                style={{ width: "100%" }}
              >
                Patient
              </Button>
            </td>
            <td></td>
            <td>
              <Labelled label="Entry Year">
                {this.props.folder.getPatient().entryyear}
              </Labelled>
              <Labelled label="Entry Order">
                {this.props.folder.getPatient().entryorder}
              </Labelled>
              <Labelled label="Name">
                {this.props.folder.getPatient().Name}
              </Labelled>
              <Labelled label="Year of birth">
                {this.props.folder.getPatient().Yearofbirth}
              </Labelled>
              <Labelled label="Sex">
                {this.props.folder.getPatient().Sex}
              </Labelled>
              <Labelled label="Pathology">
                {this.props.folder.getPatient().Pathology}
              </Labelled>
              <Labelled label="Other Comments">
                {this.props.folder.getPatient().other_comments}
              </Labelled>
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

//       <IODate value={f.Date} />
//     <td>summary</td>
