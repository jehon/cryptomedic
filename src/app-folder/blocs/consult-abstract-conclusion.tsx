import React from "react";

import Consult from "../../business/abstracts/consult";

import TwoColumns from "../../widget/two-columns";
import Panel from "../../widget/panel";
import IO from "../../widget/io";

export default function ConsultAbstractConclusion({
  file
}: {
  file: Consult;
}): React.ReactNode {
  return (
    <TwoColumns>
      <Panel fixed label="Conclusions">
        <IO.String
          label="Others Comments/Treatments"
          value={file.comments as string}
        />
        <IO.Boolean
          label="Suggested for surgery"
          value={file.suggested_for_surgery as boolean}
        />
        <IO.List
          label="Treatment Evaluation"
          value={file.treatment_evaluation}
        />
        <IO.Boolean
          label="Treatment Finished"
          value={file.treatment_finished as boolean}
        />
      </Panel>
    </TwoColumns>
  );
}
