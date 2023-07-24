import React from "react";
import Button from "react-bootstrap/Button";

import { bridgeTo } from "../../bridge";
import Labelled from "../../widget/labelled";

import Patient from "../../../legacy/app-old/v2/models/Patient";

export default function PatientSummary({
  patient
}: {
  patient: Patient;
}): React.ReactNode {
  if (!patient) {
    return <div>No patient selected</div>;
  }
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
        <Labelled label="Entry Year">{patient.entryyear}</Labelled>
        <Labelled label="Entry Order">{patient.entryorder}</Labelled>
        <Labelled label="Name">{patient.Name}</Labelled>
        <Labelled label="Year of birth">{patient.Yearofbirth}</Labelled>
        <Labelled label="Sex">{patient.Sex}</Labelled>
        <Labelled label="Pathology">{patient.Pathology}</Labelled>
        <Labelled label="Other Comments">{patient.other_comments}</Labelled>
      </td>
    </tr>
  );
}

bridgeTo("x-react-patient-summary", PatientSummary);
