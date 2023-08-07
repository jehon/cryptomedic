import React from "react";
import Button from "react-bootstrap/Button";

import Patient from "../../../legacy/app-old/v2/models/Patient";
import "../../styles/x-style-collapsible";
import "../../styles/x-style-panel";
import IONumber from "../../widget/io-number";
import IOString from "../../widget/io-string";
import IOText from "../../widget/io-text";
import Folder from "../../../legacy/app-old/v2/models/Folder";

export default function PatientSummary({
  file,
  folder
}: {
  file: Patient;
  folder: Folder;
}): React.ReactNode {
  if (!folder) {
    return <div>No folder selected</div>;
  }
  if (!file) {
    return <div>No file selected</div>;
  }
  return (
    <x-style-collabsible opened="1">
      <span slot="header" className="no-mobile">
        <img
          slot="header"
          src="/static/img/model_patient.gif"
          alt="Patient"
          className="inline"
        />
        Patient
      </span>
      <span slot="header">
        {file.entry_year}-{file.entry_order}
      </span>
      <span slot="header" className="no-mobile">
        {file.name}
      </span>
      <span slot="header" className="no-mobile">
        {file.year_of_birth}
      </span>
      <Button
        href={"#/folder/" + folder.getId() + "/"}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View the Patient
      </Button>
      <div className="columns">
        <x-style-panel label="Identification">
          <IONumber label="Entry Year" value={file.entry_year} />
          <IONumber label="Entry Order" value={file.entry_order} />
          <IOString label="Name" value={file.name} />
          <IOString label="sex" value={file.sex} />
          <IONumber label="Year of birth" value={file.year_of_birth} />
          <IOString label="Age today" value={file.actualAge() as string} />
          <IOString label="pathology" value={file.pathology} />
          <IOText label="Comments" value={file.comments} />
        </x-style-panel>
        <x-style-panel label="Address">
          <IOString width={1} label="Phone" value={file.phone} />
          <IOString label="District" value={file.address_district} />
          <IOString label="Union" value={file.address_union} />
          <IOString label="Upazilla" value={file.address_upazilla} />
          <IOString label="Address Comments" value={file.address_comments} />
        </x-style-panel>
      </div>
    </x-style-collabsible>
  );
}
