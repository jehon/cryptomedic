import Patient from "../business/patient";

import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function patientElementGenerator(
  file: Patient,
  props: PatientRelatedElementGeneratorProps
) {
  const patient = file;
  return patientRelatedElementGenerator<Patient>(file, props, {
    header: (
      <>
        <span>
          {patient.entry_year}-{patient.entry_order}
        </span>
        <span className="no-mobile">{patient.name}</span>
        <span className="no-mobile">{patient.year_of_birth}</span>
      </>
    ),
    body: (
      <>
        <TwoColumns>
          <Panel fixed label="Identification">
            <IO.Number
              label="Entry Year"
              value={parseInt(patient.entry_year)}
              min={1980}
              max={2100}
            />
            <IO.Number
              label="Entry Order"
              value={parseInt(patient.entry_order)}
            />
            <IO.String name="name" value={patient.name} />
            <IO.List name="sex" value={patient.sex} />
            <IO.Number
              name="year_of_birth"
              label="Year of Birth"
              value={parseInt(patient.year_of_birth ?? "")}
            />
            <IO.String
              label="Age today"
              value={patient.actualAge() as string}
              e2eExcluded
            />
            <IO.List name="pathology" value={patient.pathology} />
            <IO.Text name="comments" value={patient.comments} />
          </Panel>
          <Panel fixed label="Address">
            <IO.String name="phone" value={patient.phone ?? ""} />
            <IO.List
              name="address_district"
              label="District"
              value={patient.address_district}
            />
            <IO.List
              name="address_upazilla"
              label="Upazilla"
              value={patient.address_upazilla}
            />
            <IO.List
              name="address_union"
              label="Union"
              value={patient.address_union}
            />
            <IO.Text name="address_comments" value={patient.address_comments} />
          </Panel>
        </TwoColumns>
      </>
    )
  });
}
