import React from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import { bridgeTo } from "../../bridge";
import Patient from "../../../legacy/app-old/v2/models/Patient";
import IONumber from "../../widget/io-number";
import IOString from "../../widget/io-string";
import IOText from "../../widget/io-text";

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
            <div className="maybe-two-columns">
              <IONumber label="Entry Year" value={patient.entryyear} />
              <IONumber label="Entry Order" value={patient.entryorder} />
            </div>
            <IOString label="Name" value={patient.Name} />
            <IONumber label="Year of birth" value={patient.Yearofbirth} />
            <IOString label="Sex" value={patient.Sex} />
            <IOString label="Pathology" value={patient.Pathology} />
            <IOText label="Other Comments" value={patient.other_comments} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

bridgeTo("x-react-patient-summary", PatientSummary);
