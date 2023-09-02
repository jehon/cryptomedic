import React from "react";

import Consult from "../business/consult";

import IODate from "../../widget/io-date";
import IONumber from "../../widget/io-number";
import IOString from "../../widget/io-string";
import IOFunction from "../../widget/io-function";
import IOList from "../../widget/io-list";

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
        <IODate label="Date" value={file.date as Date} />
        <IOString label="Examiner" value={file.examiner as string} />
        <IOList label="Center" value={file.center as string} />
        <IOFunction
          label="Age at consultation time"
          value={() => yearsToYM(file.getAgeAtThatTime())}
        />
      </x-style-panel>
      <x-style-panel label="Nutritional data">
        <IONumber label="Weitght (kg)" value={file.weight_kg as number} />
        <IOFunction
          label="Weitght sd"
          note
          value={() => roundTo(file.getWeightSd())}
        />
        <IONumber label="Height (cm)" value={file.height_cm as number} />
        <IOFunction
          label="Height sd"
          note
          value={() => roundTo(file.getHeightSd())}
        />
        <IONumber
          label="Brachial Circumference (c.m)"
          value={file.brachial_circumference_cm as number}
        />
        <IOFunction
          note
          label="Weight/Height ratio"
          value={() => roundTo(file.wh())}
        />
        <IOFunction
          label="Weight/Height sd"
          note
          value={() => roundTo(file.getWHSd())}
        />
        <IOFunction note label="BMI" value={() => roundTo(file.bmi())} />
        <IOFunction
          label="BMI sd"
          note
          value={() => roundTo(file.getBMISd())}
        />
      </x-style-panel>
    </div>
  );
}
