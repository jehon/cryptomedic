import Consult from "../../business/abstracts/consult";

import { getList } from "../../utils/config";
import IO from "../../widget/io";
import Panel from "../../widget/panel";
import TwoColumns from "../../widget/two-columns";

export default function ConsultAbstractConclusion({
  file
}: {
  file: Consult;
}): React.ReactNode {
  return (
    <TwoColumns>
      <Panel fixed label="Conclusions">
        <IO.String
          name="comments"
          label="Others Comments/Treatments"
          value={file.comments as string}
        />
        <IO.Boolean
          name="suggested_for_surgery"
          value={file.suggested_for_surgery as boolean}
        />
        <IO.List
          name="treatment_evaluation"
          value={file.treatment_evaluation}
          list={getList("TreatmentEvaluation")}
        />
        <IO.Boolean
          name="treatment_finished"
          value={file.treatment_finished as boolean}
        />
      </Panel>
    </TwoColumns>
  );
}
