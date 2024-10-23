import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";

import ConsultClubfoot from "../business/consult-clubfoot";
import { getList } from "../utils/config";
import { tryOrMessage } from "../utils/strings";
import { ImgSideLeft, ImgSideRight } from "../widget/images";
import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import patientRelatedElementGenerator, {
  PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function consultClubfootElementGenerator(
  file: ConsultClubfoot,
  props: PatientRelatedElementGeneratorProps
) {
  return patientRelatedElementGenerator<ConsultClubfoot>(file, props, {
    header: (
      <>
        <span className="with-image">
          <ImgSideRight></ImgSideRight>
          {file.getPiraniRight() as number}
        </span>
        <span className="with-image">
          <ImgSideLeft></ImgSideLeft>
          {file.getPiraniLeft() as number}
        </span>
      </>
    ),

    body: (
      <>
        <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
        <TwoColumns>
          <Panel
            fixed
            header={
              <>
                <ImgSideRight></ImgSideRight>
                <span>Pirani Right (&lt; 3 years)</span>
                {tryOrMessage(() => file.getPiraniRight(), "")}
              </>
            }
          >
            <div className="separator">Mid Foot</div>
            <IO.List
              name="curved_lateral_border_right"
              value={file.curved_lateral_border_right}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="medial_crease_right"
              value={file.medial_crease_right}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="talar_head_coverage_right"
              value={file.talar_head_coverage_right}
              list={getList("Pirani")}
            ></IO.List>
            <div className="separator">Hind Foot</div>
            <IO.List
              name="posterior_crease_right"
              value={file.posterior_crease_right}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="rigid_equinus_right"
              value={file.rigid_equinus_right}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="empty_heel_right"
              value={file.empty_heel_right}
              list={getList("Pirani")}
            ></IO.List>
            <div className="separator">Score</div>
            <IO.Function
              label="Score"
              value={() => file.getPiraniRight() + ""}
            ></IO.Function>
          </Panel>
          <Panel
            fixed
            header={
              <>
                <ImgSideLeft></ImgSideLeft>
                <span>Pirani Left (&lt; 3 years)</span>
                {tryOrMessage(() => file.getPiraniLeft(), "")}
              </>
            }
          >
            <div className="separator">Mid Foot</div>
            <IO.List
              name="curved_lateral_border_left"
              value={file.curved_lateral_border_left}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="medial_crease_left"
              value={file.medial_crease_left}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="talar_head_coverage_left"
              value={file.talar_head_coverage_left}
              list={getList("Pirani")}
            ></IO.List>
            <div className="separator">Hind Foot</div>
            <IO.List
              name="posterior_crease_left"
              value={file.posterior_crease_left}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="rigid_equinus_left"
              value={file.rigid_equinus_left}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="empty_heel_left"
              value={file.empty_heel_left}
              list={getList("Pirani")}
            ></IO.List>
            <div className="separator">Score</div>
            <IO.Function
              label="Score"
              value={() => file.getPiraniLeft() + ""}
            ></IO.Function>
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
            <IO.List
              label="Pain"
              value={file.pain_right}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="walking_floor_contact_right"
              value={file.walking_floor_contact_right}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="walking_first_contact_right"
              value={file.walking_first_contact_right}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="jumping_one_leg_right"
              value={file.jumping_one_leg_right}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="run_right"
              value={file.run_right}
              list={getList("Eval02")}
            ></IO.List>
            <IO.Number
              name="adduction_angle_right"
              value={file.adduction_angle_right}
            ></IO.Number>
            <IO.Number
              name="hind_foot_angle_W_right"
              value={file.hind_foot_angle_W_right}
            ></IO.Number>
            <IO.Number
              name="dorsal_flexion_max_right"
              value={file.dorsal_flexion_max_right}
            ></IO.Number>
            <IO.Number
              name="plantar_flexion_max_right"
              value={file.plantar_flexion_max_right}
            ></IO.Number>
            <IO.Boolean
              name="muscular_inbalance_right"
              value={file.muscular_inbalance_right}
            ></IO.Boolean>
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
            <IO.List
              label="Pain"
              value={file.pain_left}
              list={getList("")}
            ></IO.List>
            <IO.List
              name="walking_floor_contact_left"
              value={file.walking_floor_contact_left}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="walking_first_contact_left"
              value={file.walking_first_contact_left}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="jumping_one_leg_left"
              value={file.jumping_one_leg_left}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="run_left"
              value={file.run_left}
              list={getList("Eval02")}
            ></IO.List>
            <IO.Number
              name="adduction_angle_left"
              value={file.adduction_angle_left}
            ></IO.Number>
            <IO.Number
              name="hind_foot_angle_W_left"
              value={file.hind_foot_angle_W_left}
            ></IO.Number>
            <IO.Number
              name="dorsal_flexion_max_left"
              value={file.dorsal_flexion_max_left}
            ></IO.Number>
            <IO.Number
              name="plantar_flexion_max_left"
              value={file.plantar_flexion_max_left}
            ></IO.Number>
            <IO.Boolean
              name="muscular_inbalance_left"
              value={file.muscular_inbalance_left}
            ></IO.Boolean>
          </Panel>
        </TwoColumns>
        <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
      </>
    )
  });
}
