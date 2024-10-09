import Consult from "../../business/abstracts/consult";

import IO from "../../widget/io";
import Panel from "../../widget/panel";
import TwoColumns from "../../widget/two-columns";

import { getList } from "../../utils/config";
import { yearsToYM } from "../../utils/date";
import { roundTo, string2number } from "../../utils/strings";

export default function ConsultAbstractIntroduction({
  file
}: {
  file: Consult;
}): React.ReactNode {
  return (
    <TwoColumns>
      <Panel fixed label="Information">
        <IO.Date name="date" value={file.date} />
        <IO.List
          name="examiner"
          value={file.examiner as string}
          list={getList("Examiners")}
        />
        <IO.List
          name="center"
          value={file.center as string}
          list={getList("Centers")}
        />
        <IO.Function
          label="Age at consultation time"
          value={() => yearsToYM(file.getAgeAtThatTime())}
        />
      </Panel>
      <Panel fixed label="Nutritional data">
        <IO.Number
          name="weight_kg"
          label="Weight (kg)"
          value={string2number(file.weight_kg)}
        />
        {file.weight_kg && (
          <IO.Function
            label="Weight sd"
            value={() => roundTo(file.getWeightSd())}
          />
        )}
        <IO.Number
          name="height_cm"
          label="Height (cm)"
          value={string2number(file.height_cm)}
        />
        {file.height_cm && (
          <IO.Function
            label="Height sd"
            value={() => roundTo(file.getHeightSd())}
          />
        )}
        <IO.Number
          name="brachial_circumference_cm"
          label="Brachial Circumference (cm)"
          value={string2number(file.brachial_circumference_cm)}
        />
        {file.weight_kg && file.height_cm && (
          <>
            <IO.Function
              label="Weight/Height ratio"
              value={() => roundTo(file.wh())}
            />
            <IO.Function
              label="Weight/Height sd"
              value={() => roundTo(file.getWHSd())}
            />
            <IO.Function label="BMI" value={() => roundTo(file.bmi())} />
            <IO.Function
              label="BMI sd"
              value={() => roundTo(file.getBMISd())}
            />
          </>
        )}
      </Panel>
    </TwoColumns>
  );
}
