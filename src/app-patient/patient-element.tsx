import { useState } from "react";
import { actualAge } from "../utils/calculations";
import { getList } from "../utils/session";
import { yearOfBirthPattern } from "../utils/strings";
import { Modes } from "../widget/io-abstract";
import IOFunction from "../widget/io-function";
import IOList, { type IOListType } from "../widget/io-list";
import IONumber from "../widget/io-number";
import IOString from "../widget/io-string";
import IOText from "../widget/io-text";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel from "./blocs/file-panel";
import type { Patient, PatientRelated } from "./objects";
import { type PatientRelatedElementGeneratorProps } from "./patient-related-element-generator";

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

export default function PatientElement(
  props: PatientRelatedElementGeneratorProps<Patient>
) {
  const patient = props.file;

  const [districtValue, districtValueUpdate] = useState<string>(
    patient.address_district ?? ""
  );
  const [upazilaValue, upazilaValueUpdate] = useState<string>(
    patient.address_upazilla ?? ""
  );

  const uid = `patient.${patient.id}`;
  return (
    <FilePanel<Patient>
      key={`patient.${props.file.id}`}
      type="patient"
      file={props.file}
      selfUrl={`/patient/${props.patient.id}/patient/${props.file.id ?? "add"}`}
      apiRootUrl={`fiche/patient`} // No leading slash!
      closed={uid !== props.selectedUid}
      canBeDeleted={props.folder.getChildren().length == 0}
      canBeLocked={false}
      onCreated={(file: Patient) => {
        props.onUpdate(
          props.folder.withFile(file as unknown as PatientRelated)
        );
      }}
      onDeleted={(file: Patient) =>
        props.onUpdate(
          props.folder.withoutFile(file as unknown as PatientRelated)
        )
      }
      onUpdated={(file: Patient) =>
        props.onUpdate(props.folder.withFile(file as unknown as PatientRelated))
      }
      edit={uid == props.selectedUid ? props.mode === Modes.input : false}
      header={
        <>
          <span>
            {patient.entry_year}-{patient.entry_order}
          </span>
          <span className="no-mobile">{patient.name}</span>
          <span className="no-mobile">{patient.year_of_birth}</span>
        </>
      }
    >
      <TwoColumns>
        <Panel fixed label="Identification">
          <IONumber
            label="Entry Year"
            value={parseInt(patient.entry_year ?? "")}
            htmlProps={{
              min: 1980,
              max: 2030
            }}
          />
          <IONumber
            label="Entry Order"
            value={parseInt(patient.entry_order ?? "")}
          />
          <IOString name="name" value={patient.name} />
          <IOList name="sex" value={patient.sex} list={getList("sex")} />
          <IOString
            name="year_of_birth"
            label="Year of Birth"
            value={patient.year_of_birth}
            htmlProps={{
              pattern: yearOfBirthPattern
            }}
            inputHelp={<div>YYYY or YYYY-MM - between 1980 and 2029</div>}
          />
          <IOFunction
            label="Age today"
            value={() => actualAge(patient) as string}
            e2eExcluded
          />
          <IOList
            name="pathology"
            value={patient.pathology}
            list={getList("Pathologies")}
          />
          <IOText name="comments" value={patient.comments} />
        </Panel>
        <Panel fixed label="Address">
          <IOString name="phone" value={patient.phone ?? ""} />
          <IOList
            name="address_district"
            label="District"
            value={districtValue}
            list={getList("Districts")}
            onChange={(v) => districtValueUpdate(v)}
          />
          <IOList
            name="address_upazilla"
            label="Upazila"
            value={upazilaValue}
            list={getListFor("district", districtValue)}
            onChange={(v) => upazilaValueUpdate(v)}
          />
          <IOList
            name="address_union"
            label="Union"
            value={patient.address_union}
            list={getListFor("upazilla", upazilaValue)}
          />
          <IOText name="address_comments" value={patient.address_comments} />
        </Panel>
      </TwoColumns>
    </FilePanel>
  );
}
