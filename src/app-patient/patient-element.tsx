import { useState } from "react";
import Patient, { yearOfBirthPattern } from "../business/patient";
import { getList } from "../utils/config";

import IO from "../widget/io";
import { IOListType } from "../widget/io-list";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

function getListFor(category: string, value: string): IOListType {
  // "district.other"
  //
  try {
    return getList(`${category}.${value}`);
  } catch (_e) {
    // acceptable
  }
  return [];
}

export default function patientElementGenerator(
  file: Patient,
  props: PatientRelatedElementGeneratorProps
) {
  const patient = file;

  const [districtValue, districtValueUpdate] = useState<string>(
    patient.address_district
  );
  const [upazilaValue, upazilaValueUpdate] = useState<string>(
    patient.address_upazilla
  );

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
              htmlProps={{
                min: 1980,
                max: 2030
              }}
            />
            <IO.Number
              label="Entry Order"
              value={parseInt(patient.entry_order)}
            />
            <IO.String name="name" value={patient.name} />
            <IO.List name="sex" value={patient.sex} list={getList("sex")} />
            <IO.String
              name="year_of_birth"
              label="Year of Birth"
              value={patient.year_of_birth}
              htmlProps={{
                pattern: yearOfBirthPattern
              }}
              inputHelp={<div>YYYY or YYYY-MM - between 1980 and 2029</div>}
            />
            <IO.Function
              label="Age today"
              value={() => patient.actualAge() as string}
              e2eExcluded
            />
            <IO.List
              name="pathology"
              value={patient.pathology}
              list={getList("Pathologies")}
            />
            <IO.Text name="comments" value={patient.comments} />
          </Panel>
          <Panel fixed label="Address">
            <IO.String name="phone" value={patient.phone ?? ""} />
            <IO.List
              name="address_district"
              label="District"
              value={districtValue}
              list={getList("Districts")}
              onChange={(v) => districtValueUpdate(v)}
            />
            <IO.List
              name="address_upazilla"
              label="Upazila"
              value={upazilaValue}
              list={getListFor("district", districtValue)}
              onChange={(v) => upazilaValueUpdate(v)}
            />
            <IO.List
              name="address_union"
              label="Union"
              value={patient.address_union}
              list={getListFor("upazilla", upazilaValue)}
            />
            <IO.Text name="address_comments" value={patient.address_comments} />
          </Panel>
        </TwoColumns>
      </>
    )
  });
}
