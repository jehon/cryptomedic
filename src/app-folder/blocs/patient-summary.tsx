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
            <img
              src="/static/img/patient.gif"
              alt="Patient"
              className="inline"
            />
            <span className="no-mobile">Patient</span>
            <span>
              {patient.entry_year}-{patient.entry_order}
            </span>
            <span className="no-mobile">{patient.name}</span>
            <span className="no-mobile">{patient.year_of_birth}</span>
            <img src="/static/img/view.svg" alt="View" className="inline" />
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
                value={patient.entry_year}
              />
              <IONumber
                width={0.5}
                label="Entry Order"
                value={patient.entry_order}
              />
              <IOString width={0.5} label="Name" value={patient.name} />
              <IOString width={0.5} label="sex" value={patient.sex} />
              <IONumber
                width={0.5}
                label="Year of birth"
                value={patient.year_of_birth}
              />
              <IOString
                width={0.5}
                label="pathology"
                value={patient.pathology}
              />
              <IOText label="Comments" value={patient.comments} />
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

bridgeTo("x-react-patient-summary", PatientSummary);
