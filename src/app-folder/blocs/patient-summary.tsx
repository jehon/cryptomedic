import React from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

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
    <Accordion defaultActiveKey="">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <div className="row-spread">
            <span className="no-mobile">Patient</span>
            <span>
              {patient.entryyear}-{patient.entryorder}
            </span>
            <span className="no-mobile">{patient.Name}</span>
            <span className="no-mobile">{patient.Yearofbirth}</span>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Button
              href="#/folder/{patient.getId()}/"
              variant="outline-info"
              style={{ width: "100%" }}
            >
              View the Patient
            </Button>
            <Labelled label="Entry Year">{patient.entryyear}</Labelled>
            <Labelled label="Entry Order">{patient.entryorder}</Labelled>
            <Labelled label="Name">{patient.Name}</Labelled>
            <Labelled label="Year of birth">{patient.Yearofbirth}</Labelled>
            <Labelled label="Sex">{patient.Sex}</Labelled>
            <Labelled label="Pathology">{patient.Pathology}</Labelled>
            <Labelled label="Other Comments">{patient.other_comments}</Labelled>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

bridgeTo("x-react-patient-summary", PatientSummary);
