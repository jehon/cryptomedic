import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";

import ConsultClubfoot from "../business/consult-clubfoot";
import { getList } from "../utils/session";
import { string2number, tryOrMessage } from "../utils/strings";
import { ImgSideLeft, ImgSideRight } from "../widget/images";
import IOBoolean from "../widget/io-boolean";
import IOFunction from "../widget/io-function";
import IOList from "../widget/io-list";
import IONumber from "../widget/io-number";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

function getPiraniLeft(file: ConsultClubfoot) {
  try {
    return (
      string2number(file.curved_lateral_border_left) +
      string2number(file.medial_crease_left) +
      string2number(file.talar_head_coverage_left) +
      string2number(file.posterior_crease_left) +
      string2number(file.rigid_equinus_left) +
      string2number(file.empty_heel_left)
    );
  } catch (_e) {
    throw new Error("?");
  }
}

function getPiraniRight(file: ConsultClubfoot) {
  try {
    return (
      string2number(file.curved_lateral_border_right) +
      string2number(file.medial_crease_right) +
      string2number(file.talar_head_coverage_right) +
      string2number(file.posterior_crease_right) +
      string2number(file.rigid_equinus_right) +
      string2number(file.empty_heel_right)
    );
  } catch (_e) {
    throw new Error("?");
  }
}

export default function ConsultClubfootElement({
  file,
  props
}: {
  file: ConsultClubfoot;
  props: PatientRelatedElementGeneratorProps;
}): React.ReactNode {
  return patientRelatedElementGenerator<ConsultClubfoot>(file, props, {
    header: (
      <>
        <span className="with-image">
          <ImgSideRight></ImgSideRight>
          {getPiraniRight(file) as number}
        </span>
        <span className="with-image">
          <ImgSideLeft></ImgSideLeft>
          {getPiraniLeft(file) as number}
        </span>
      </>
    ),

    body: (
      <>
        <ConsultAbstractIntroduction
          file={file}
          props={props}
        ></ConsultAbstractIntroduction>
        <TwoColumns>
          <Panel
            fixed
            header={
              <>
                <ImgSideRight></ImgSideRight>
                <span>Pirani Right (&lt; 3 years)</span>
                {tryOrMessage(() => getPiraniRight(file), "")}
              </>
            }
          >
            <div className="separator">Mid Foot</div>
            <IOList
              name="curved_lateral_border_right"
              value={file.curved_lateral_border_right}
              list={getList("Pirani")}
            ></IOList>
            <IOList
              name="medial_crease_right"
              value={file.medial_crease_right}
              list={getList("Pirani")}
            ></IOList>
            <IOList
              name="talar_head_coverage_right"
              value={file.talar_head_coverage_right}
              list={getList("Pirani")}
            ></IOList>
            <div className="separator">Hind Foot</div>
            <IOList
              name="posterior_crease_right"
              value={file.posterior_crease_right}
              list={getList("Pirani")}
            ></IOList>
            <IOList
              name="rigid_equinus_right"
              value={file.rigid_equinus_right}
              list={getList("Pirani")}
            ></IOList>
            <IOList
              name="empty_heel_right"
              value={file.empty_heel_right}
              list={getList("Pirani")}
            ></IOList>
            <div className="separator">Score</div>
            <IOFunction
              label="Score"
              value={() => getPiraniRight(file) + ""}
            ></IOFunction>
          </Panel>
          <Panel
            fixed
            header={
              <>
                <ImgSideLeft></ImgSideLeft>
                <span>Pirani Left (&lt; 3 years)</span>
                {tryOrMessage(() => getPiraniLeft(file), "")}
              </>
            }
          >
            <div className="separator">Mid Foot</div>
            <IOList
              name="curved_lateral_border_left"
              value={file.curved_lateral_border_left}
              list={getList("Pirani")}
            ></IOList>
            <IOList
              name="medial_crease_left"
              value={file.medial_crease_left}
              list={getList("Pirani")}
            ></IOList>
            <IOList
              name="talar_head_coverage_left"
              value={file.talar_head_coverage_left}
              list={getList("Pirani")}
            ></IOList>
            <div className="separator">Hind Foot</div>
            <IOList
              name="posterior_crease_left"
              value={file.posterior_crease_left}
              list={getList("Pirani")}
            ></IOList>
            <IOList
              name="rigid_equinus_left"
              value={file.rigid_equinus_left}
              list={getList("Pirani")}
            ></IOList>
            <IOList
              name="empty_heel_left"
              value={file.empty_heel_left}
              list={getList("Pirani")}
            ></IOList>
            <div className="separator">Score</div>
            <IOFunction
              label="Score"
              value={() => getPiraniLeft(file) + ""}
            ></IOFunction>
          </Panel>
        </TwoColumns>
        <TwoColumns>
          <Panel
            fixed
            header={
              <>
                <ImgSideRight></ImgSideRight>
                <span>Pirani Right (&gt; 3 years)</span>
              </>
            }
          >
            <IOList
              label="Pain"
              value={file.pain_right}
              list={getList("Eval02")}
            ></IOList>
            <IOList
              name="walking_floor_contact_right"
              value={file.walking_floor_contact_right}
              list={getList("Eval02")}
            ></IOList>
            <IOList
              name="walking_first_contact_right"
              value={file.walking_first_contact_right}
              list={getList("Eval02")}
            ></IOList>
            <IOList
              name="jumping_one_leg_right"
              value={file.jumping_one_leg_right}
              list={getList("Eval02")}
            ></IOList>
            <IOList
              name="run_right"
              value={file.run_right}
              list={getList("Eval02")}
            ></IOList>
            <IONumber
              name="adduction_angle_right"
              value={file.adduction_angle_right}
            ></IONumber>
            <IONumber
              name="hind_foot_angle_W_right"
              value={file.hind_foot_angle_W_right}
            ></IONumber>
            <IONumber
              name="dorsal_flexion_max_right"
              value={file.dorsal_flexion_max_right}
            ></IONumber>
            <IONumber
              name="plantar_flexion_max_right"
              value={file.plantar_flexion_max_right}
            ></IONumber>
            <IOBoolean
              name="muscular_inbalance_right"
              value={file.muscular_inbalance_right}
            ></IOBoolean>
          </Panel>

          <Panel
            fixed
            header={
              <>
                <ImgSideLeft></ImgSideLeft>
                <span>Pirani Left (&gt; 3 years)</span>
              </>
            }
          >
            <IOList
              label="Pain"
              value={file.pain_left}
              list={getList("")}
            ></IOList>
            <IOList
              name="walking_floor_contact_left"
              value={file.walking_floor_contact_left}
              list={getList("Eval02")}
            ></IOList>
            <IOList
              name="walking_first_contact_left"
              value={file.walking_first_contact_left}
              list={getList("Eval02")}
            ></IOList>
            <IOList
              name="jumping_one_leg_left"
              value={file.jumping_one_leg_left}
              list={getList("Eval02")}
            ></IOList>
            <IOList
              name="run_left"
              value={file.run_left}
              list={getList("Eval02")}
            ></IOList>
            <IONumber
              name="adduction_angle_left"
              value={file.adduction_angle_left}
            ></IONumber>
            <IONumber
              name="hind_foot_angle_W_left"
              value={file.hind_foot_angle_W_left}
            ></IONumber>
            <IONumber
              name="dorsal_flexion_max_left"
              value={file.dorsal_flexion_max_left}
            ></IONumber>
            <IONumber
              name="plantar_flexion_max_left"
              value={file.plantar_flexion_max_left}
            ></IONumber>
            <IOBoolean
              name="muscular_inbalance_left"
              value={file.muscular_inbalance_left}
            ></IOBoolean>
          </Panel>
        </TwoColumns>
        <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
      </>
    )
  });
}
