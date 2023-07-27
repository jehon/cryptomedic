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
            <div className="form-flexible">
              <Button
                href={"#/folder/" + patient.getId() + "/"}
                variant="outline-info"
                style={{ width: "100%" }}
              >
                View the Patient
              </Button>
              <IONumber
                width={0.5}
                label="Entry Year"
                value={patient.entryyear}
              />
              <IONumber
                width={0.5}
                label="Entry Order"
                value={patient.entryorder}
              />
              <IOString width={0.5} label="Name" value={patient.Name} />
              <IOString width={0.5} label="Sex" value={patient.Sex} />
              <IONumber
                width={0.5}
                label="Year of birth"
                value={patient.Yearofbirth}
              />
              <IOString
                width={0.5}
                label="Pathology"
                value={patient.Pathology}
              />
              <IOText label="Other Comments" value={patient.other_comments} />
              <IOText label="Other Comments" value={patient.other_comments} />
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

bridgeTo("x-react-patient-summary", PatientSummary);
