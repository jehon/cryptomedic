import React from "react";

import Consult from "../../business/abstracts/consult";

import IO from "../../widget/io";
import Panel from "../../widget/panel";
import TwoColumns from "../../widget/two-columns";

import { getList } from "../../utils/config";
import { yearsToYM } from "../../utils/date";
import { roundTo } from "../../utils/strings";

export default function ConsultAbstractIntroduction({
  file
}: {
  file: Consult;
}): React.ReactNode {
  return (
    <TwoColumns>
      <Panel fixed label="Information">
        <IO.Date name="date" value={file.date} />
        <IO.String name="examiner" value={file.examiner as string} />
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
          value={file.weight_kg as number}
        />
        <IO.Function
          label="Weight sd"
          note
          value={() => roundTo(file.getWeightSd())}
        />
        <IO.Number
          name="height_cm"
          label="Height (cm)"
          value={file.height_cm as number}
        />
        <IO.Function
          label="Height sd"
          note
          value={() => roundTo(file.getHeightSd())}
        />
        <IO.Number
          name="brachial_circumference_cm"
          label="Brachial Circumference (cm)"
          value={file.brachial_circumference_cm as number}
        />
        <IO.Function
          note
          label="Weight/Height ratio"
          value={() => roundTo(file.wh())}
        />
        <IO.Function
          label="Weight/Height sd"
          note
          value={() => roundTo(file.getWHSd())}
        />
        <IO.Function note label="BMI" value={() => roundTo(file.bmi())} />
        <IO.Function
          label="BMI sd"
          note
          value={() => roundTo(file.getBMISd())}
        />
      </Panel>
    </TwoColumns>
  );
}
