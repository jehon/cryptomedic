import Consult from "../../business/abstracts/consult";

import Panel from "../../widget/panel";
import TwoColumns from "../../widget/two-columns";

import {
  bmi,
  getAgeAtThatTime,
  getBMISd,
  getHeightSd,
  getWeightSd,
  getWHSd,
  wh
} from "../../utils/calculations";
import { yearsToYM } from "../../utils/date";
import { getList } from "../../utils/session";
import { roundTo, string2number } from "../../utils/strings";
import IODate from "../../widget/io-date";
import IOFunction from "../../widget/io-function";
import IOList from "../../widget/io-list";
import IONumber from "../../widget/io-number";
import type { PatientRelatedElementGeneratorProps } from "../patient-related-element-generator";

export default function ConsultAbstractIntroduction({
  file,
  props
}: {
  file: Consult;
  props: PatientRelatedElementGeneratorProps;
}): React.ReactNode {
  return (
    <TwoColumns>
      <Panel fixed label="Information">
        <input type="hidden" name="patient_id" defaultValue={props.folder.id} />
        <IODate name="date" value={file.date} />
        <IOList
          name="examiner"
          value={file.examiner as string}
          list={getList("Examiners")}
          required
        />
        <IOList
          name="center"
          value={file.center as string}
          list={getList("Centers")}
          required
        />
        <IOFunction
          label="Age at consultation time"
          value={() =>
            yearsToYM(getAgeAtThatTime(file, props.folder.getPatient()))
          }
        />
      </Panel>
      <Panel fixed label="Nutritional data">
        <IONumber
          name="weight_kg"
          label="Weight (kg)"
          value={string2number(file.weight_kg)}
          htmlProps={{
            min: 3,
            max: 150
          }}
        />
        {file.weight_kg && (
          <IOFunction
            label="Weight sd"
            value={() => roundTo(getWeightSd(file, props.folder.getPatient()))}
          />
        )}
        <IONumber
          name="height_cm"
          label="Height (cm)"
          value={string2number(file.height_cm)}
          htmlProps={{
            min: 30,
            max: 200
          }}
        />
        {file.height_cm && (
          <IOFunction
            label="Height sd"
            value={() => roundTo(getHeightSd(file, props.folder.getPatient()))}
          />
        )}
        <IONumber
          name="brachial_circumference_cm"
          label="Brachial Circumference (cm)"
          value={string2number(file.brachial_circumference_cm)}
          htmlProps={{
            min: 6,
            max: 26
          }}
        />
        {file.weight_kg && file.height_cm && (
          <>
            <IOFunction
              label="Weight/Height ratio"
              value={() => roundTo(wh(file))}
            />
            <IOFunction
              label="Weight/Height sd"
              value={() => roundTo(getWHSd(file, props.folder.getPatient()))}
            />
            <IOFunction label="BMI" value={() => roundTo(bmi(file))} />
            <IOFunction
              label="BMI sd"
              value={() => roundTo(getBMISd(file, props.folder.getPatient()))}
            />
          </>
        )}
      </Panel>
    </TwoColumns>
  );
}
