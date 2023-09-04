import React from "react";

import Consult from "../../business/consult";

import IO from "../../widget/io";

import { roundTo } from "../../utils/strings";
import { yearsToYM } from "../../utils/date";

export default function ConsultAbstractIntroduction({
  file
}: {
  file: Consult;
}): React.ReactNode {
  return (
    <div className="columns">
      <x-style-panel label="Informations">
        <IO.Date label="Date" value={file.date as Date} />
        <IO.String label="Examiner" value={file.examiner as string} />
        <IO.List label="Center" value={file.center as string} />
        <IO.Function
          label="Age at consultation time"
          value={() => yearsToYM(file.getAgeAtThatTime())}
        />
      </x-style-panel>
      <x-style-panel label="Nutritional data">
        <IO.Number label="Weitght (kg)" value={file.weight_kg as number} />
        <IO.Function
          label="Weitght sd"
          note
          value={() => roundTo(file.getWeightSd())}
        />
        <IO.Number label="Height (cm)" value={file.height_cm as number} />
        <IO.Function
          label="Height sd"
          note
          value={() => roundTo(file.getHeightSd())}
        />
        <IO.Number
          label="Brachial Circumference (c.m)"
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
      </x-style-panel>
    </div>
  );
}
