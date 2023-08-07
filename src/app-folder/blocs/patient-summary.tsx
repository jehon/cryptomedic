import React from "react";
import Button from "react-bootstrap/Button";

import Patient from "../../../legacy/app-old/v2/models/Patient";
import "../../styles/x-style-collapsible";
import "../../styles/x-style-panel";
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
    <x-style-collabsible opened="1">
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
      <div className="columns">
        <x-style-panel label="Identification">
          <IONumber label="Entry Year" value={patient.entry_year} />
          <IONumber label="Entry Order" value={patient.entry_order} />
          <IOString label="Name" value={patient.name} />
          <IOString label="sex" value={patient.sex} />
          <IONumber label="Year of birth" value={patient.year_of_birth} />
          <IOString label="Age today" value={patient.actualAge() as string} />
          <IOString label="pathology" value={patient.pathology} />
          <IOText label="Comments" value={patient.comments} />
        </x-style-panel>
        <x-style-panel label="Address">
          <IOString width={1} label="Phone" value={patient.phone} />
          <IOString label="District" value={patient.address_district} />
          <IOString label="Union" value={patient.address_union} />
          <IOString label="Upazilla" value={patient.address_upazilla} />
          <IOString label="Address Comments" value={patient.address_comments} />
        </x-style-panel>
      </div>
    </x-style-collabsible>
  );
}
