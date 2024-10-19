import Consult from "../../business/abstracts/consult";

import { getList } from "../../utils/config";
import { string2Boolean } from "../../utils/strings";
import IO from "../../widget/io";
import { optionalList } from "../../widget/io-list";
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
        <IO.Text
          name="comments"
          label="Others Comments and Treatments"
          value={file.comments as string}
        />
        <IO.Boolean
          name="suggested_for_surgery"
          label="Suggested for Surgery"
          value={string2Boolean(file.suggested_for_surgery)}
        />
        <IO.List
          name="treatment_evaluation"
          value={file.treatment_evaluation}
          list={optionalList(getList("TreatmentEvaluation"))}
        />
        <IO.Boolean
          name="treatment_finished"
          value={string2Boolean(file.treatment_finished)}
        />
      </Panel>
    </TwoColumns>
  );
}
