import React from "react";
import Button from "react-bootstrap/Button";

import { bridgeTo } from "../../bridge";
import Patient from "../../../legacy/app-old/v2/models/Patient";
import "../../styles/style-io-block";
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
    <x-style-io-block>
      <span slot="header" className="no-mobile">
        <img
          slot="header"
          src="/static/img/patient.gif"
          alt="Patient"
          className="inline"
        />
        Patient
      </span>
      <span slot="header">
        {patient.entry_year}-{patient.entry_order}
      </span>
      <span slot="header" className="no-mobile">
        {patient.name}
      </span>
      <span slot="header" className="no-mobile">
        {patient.year_of_birth}
      </span>
      <Button
        href={"#/folder/" + patient.getId() + "/"}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View the Patient
      </Button>
      <IONumber width={0.5} label="Entry Year" value={patient.entry_year} />
      <IONumber width={0.5} label="Entry Order" value={patient.entry_order} />
      <IOString width={0.5} label="Name" value={patient.name} />
      <IOString width={0.5} label="sex" value={patient.sex} />
      <IONumber
        width={0.5}
        label="Year of birth"
        value={patient.year_of_birth}
      />
      Age today
      <hr />
      <IOString width={1} label="Phone" value={patient.phone} />
      <IOString width={0.5} label="District" value={patient.address_district} />
      <IOString width={0.5} label="Union" value={patient.address_union} />
      <IOString width={0.5} label="Upazilla" value={patient.address_upazilla} />
      <IOString width={0.5} label="Comments" value={patient.address_comments} />
      <hr />
      <IOString width={0.5} label="pathology" value={patient.pathology} />
      <IOText label="Comments" value={patient.comments} />
    </x-style-io-block>
  );
}

bridgeTo("x-react-patient-summary", PatientSummary);
