import React from "react";
import Button from "react-bootstrap/Button";

import Patient from "../business/Patient";
import Labelled from "../../widget/labelled";

export default function PatientHeader({
  patient
}: {
  patient: Patient;
}): React.ReactNode {
  return (
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
        <Labelled label="Name">{this.props.folder.getPatient().Name}</Labelled>
        <Labelled label="Year of birth">
          {this.props.folder.getPatient().Yearofbirth}
        </Labelled>
        <Labelled label="Sex">{this.props.folder.getPatient().Sex}</Labelled>
        <Labelled label="Pathology">
          {this.props.folder.getPatient().Pathology}
        </Labelled>
        <Labelled label="Other Comments">
          {this.props.folder.getPatient().other_comments}
        </Labelled>
      </td>
    </tr>
  );
}
