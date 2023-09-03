import React from "react";

import Consult from "../business/consult";

import IOString from "../widget/io-string";
import IOList from "../widget/io-list";
import IOBoolean from "../widget/io-boolean";

export default function ConsultAbstractConclusion({
  file
}: {
  file: Consult;
}): React.ReactNode {
  return (
    <div className="columns">
      <x-style-panel label="Conclusions">
        <IOString
          label="Others Comments/Treatments"
          value={file.comments as string}
        />
        <IOBoolean
          label="Suggested for surgery"
          value={file.suggested_for_surgery as boolean}
        />
        <IOList
          label="Treatment Evaluation"
          value={file.treatment_evaluation}
        ></IOList>
        <IOBoolean
          label="Treatment Finished"
          value={file.treatment_finished as boolean}
        />
      </x-style-panel>
    </div>
  );
}
