import Consult from "../../business/abstracts/consult";

import Panel from "../../widget/panel";
import TwoColumns from "../../widget/two-columns";

import type Patient from "../../business/patient";
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

export default function ConsultAbstractIntroduction(props: {
  file: Consult;
  patient: Patient;
}): React.ReactNode {
  return (
    <TwoColumns>
      <Panel fixed label="Information">
        <input
          type="hidden"
          name="patient_id"
          defaultValue={props.patient.id}
        />
        <IODate name="date" value={props.file.date} />
        <IOList
          name="examiner"
          value={props.file.examiner as string}
          list={getList("Examiners")}
          required
        />
        <IOList
          name="center"
          value={props.file.center as string}
          list={getList("Centers")}
          required
        />
        <IOFunction
          label="Age at consultation time"
          value={() => yearsToYM(getAgeAtThatTime(props.file, props.patient))}
        />
      </Panel>
      <Panel fixed label="Nutritional data">
        <IONumber
          name="weight_kg"
          label="Weight (kg)"
          value={string2number(props.file.weight_kg)}
          htmlProps={{
            min: 3,
            max: 150
          }}
        />
        {props.file.weight_kg && (
          <IOFunction
            label="Weight sd"
            value={() => roundTo(getWeightSd(props.file, props.patient))}
          />
        )}
        <IONumber
          name="height_cm"
          label="Height (cm)"
          value={string2number(props.file.height_cm)}
          htmlProps={{
            min: 30,
            max: 200
          }}
        />
        {props.file.height_cm && (
          <IOFunction
            label="Height sd"
            value={() => roundTo(getHeightSd(props.file, props.patient))}
          />
        )}
        <IONumber
          name="brachial_circumference_cm"
          label="Brachial Circumference (cm)"
          value={string2number(props.file.brachial_circumference_cm)}
          htmlProps={{
            min: 6,
            max: 26
          }}
        />
        {props.file.weight_kg && props.file.height_cm && (
          <>
            <IOFunction
              label="Weight/Height ratio"
              value={() => roundTo(wh(props.file))}
            />
            <IOFunction
              label="Weight/Height sd"
              value={() => roundTo(getWHSd(props.file, props.patient))}
            />
            <IOFunction label="BMI" value={() => roundTo(bmi(props.file))} />
            <IOFunction
              label="BMI sd"
              value={() => roundTo(getBMISd(props.file, props.patient))}
            />
          </>
        )}
      </Panel>
    </TwoColumns>
  );
}
