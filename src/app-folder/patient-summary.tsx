import React from "react";
import Button from "react-bootstrap/Button";

import Folder from "../business/folder";
import Patient from "../business/patient";

import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";

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
    <Panel
      headers={[
        <img src={icons.models.patient} alt="Patient" className="inline" />,
        <span className="no-mobile">Patient</span>,
        <span>
          {file.entry_year}-{file.entry_order}
        </span>,
        <span className="no-mobile">{file.name}</span>,
        <span className="no-mobile">{file.year_of_birth}</span>
      ]}
    >
      <Button
        href={"#/folder/" + folder.getId() + "/"}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <TwoColumns>
        <Panel fixed label="Identification">
          <IO.Number label="Entry Year" value={file.entry_year} />
          <IO.Number label="Entry Order" value={file.entry_order} />
          <IO.String label="Name" value={file.name} />
          <IO.String label="sex" value={file.sex} />
          <IO.Number label="Year of birth" value={file.year_of_birth} />
          <IO.String label="Age today" value={file.actualAge() as string} />
          <IO.String label="pathology" value={file.pathology} />
          <IO.Text label="Comments" value={file.comments} />
        </Panel>
        <Panel fixed label="Address">
          <IO.String width={1} label="Phone" value={file.phone} />
          <IO.String label="District" value={file.address_district} />
          <IO.String label="Union" value={file.address_union} />
          <IO.String label="Upazilla" value={file.address_upazilla} />
          <IO.String label="Address Comments" value={file.address_comments} />
        </Panel>
      </TwoColumns>
    </Panel>
  );
}
