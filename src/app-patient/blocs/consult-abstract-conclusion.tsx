import Consult from "../../business/abstracts/consult";

import { getList } from "../../utils/session";
import { string2Boolean } from "../../utils/strings";
import IOBoolean from "../../widget/io-boolean";
import IOList from "../../widget/io-list";
import IOText from "../../widget/io-text";
import Panel from "../../widget/panel";
import TwoColumns from "../../widget/two-columns";

export default function ConsultAbstractConclusion(props: {
  file: Consult;
}): React.ReactNode {
  return (
    <TwoColumns>
      <Panel fixed label="Conclusions">
        <IOText
          name="comments"
          label="Others Comments and Treatments"
          value={props.file.comments as string}
        />
        <IOBoolean
          name="suggested_for_surgery"
          label="Suggested for Surgery"
          value={string2Boolean(props.file.suggested_for_surgery)}
        />
        <IOList
          name="treatment_evaluation"
          value={props.file.treatment_evaluation}
          list={getList("TreatmentEvaluation")}
        />
        <IOBoolean
          name="treatment_finished"
          value={string2Boolean(props.file.treatment_finished)}
        />
      </Panel>
    </TwoColumns>
  );
}
