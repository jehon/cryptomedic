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
              label="Curved Lateral Border"
              value={file.curved_lateral_border_right}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="medial_crease_right"
              label="Medial Crease"
              value={file.medial_crease_right}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="talar_head_coverage_right"
              label="Talar Head Coverage"
              value={file.talar_head_coverage_right}
              list={getList("Pirani")}
            ></IO.List>
            <div className="separator">Hind Foot</div>
            <IO.List
              name="posterior_crease_right"
              label="Posterior Crease"
              value={file.posterior_crease_right}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="rigid_equinus_right"
              label="Rigid Equinus"
              value={file.rigid_equinus_right}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="empty_heel_right"
              label="Empty Heel"
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
              label="Curved Lateral Border"
              value={file.curved_lateral_border_left}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="medial_crease_left"
              label="Medial Crease"
              value={file.medial_crease_left}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="talar_head_coverage_left"
              label="Talar Head Coverage"
              value={file.talar_head_coverage_left}
              list={getList("Pirani")}
            ></IO.List>
            <div className="separator">Hind Foot</div>
            <IO.List
              name="posterior_crease_left"
              label="Posterior Crease"
              value={file.posterior_crease_left}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="rigid_equinus_left"
              label="Rigid Equinus"
              value={file.rigid_equinus_left}
              list={getList("Pirani")}
            ></IO.List>
            <IO.List
              name="empty_heel_left"
              label="Empty Heel"
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
              label="Walking Floor Contact"
              value={file.walking_floor_contact_right}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="walking_first_contact_right"
              label="Walking First Contact"
              value={file.walking_first_contact_right}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="jumping_one_leg_right"
              label="Jumping One Leg"
              value={file.jumping_one_leg_right}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="run_right"
              label="Run"
              value={file.run_right}
              list={getList("Eval02")}
            ></IO.List>
            <IO.Number
              name="adduction_angle_right"
              label="Adduction Angle"
              value={file.adduction_angle_right}
            ></IO.Number>
            <IO.Number
              name="hind_foot_angle_W_right"
              label="Hind Foot Angle W"
              value={file.hind_foot_angle_W_right}
            ></IO.Number>
            <IO.Number
              name="dorsal_flexion_max_right"
              label="Dorsal Flexion Max"
              value={file.dorsal_flexion_max_right}
            ></IO.Number>
            <IO.Number
              name="plantar_flexion_max_right"
              label="Plantar Flexion Max"
              value={file.plantar_flexion_max_right}
            ></IO.Number>
            <IO.Boolean
              name="muscular_inbalance_right"
              label="Muscular Inbalance"
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
              label="Walking Floor Contact"
              value={file.walking_floor_contact_left}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="walking_first_contact_left"
              label="Walking First Contact"
              value={file.walking_first_contact_left}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="jumping_one_leg_left"
              label="Jumping One Leg"
              value={file.jumping_one_leg_left}
              list={getList("Eval02")}
            ></IO.List>
            <IO.List
              name="run_left"
              label="Run"
              value={file.run_left}
              list={getList("Eval02")}
            ></IO.List>
            <IO.Number
              name="adduction_angle_left"
              label="Adduction Angle"
              value={file.adduction_angle_left}
            ></IO.Number>
            <IO.Number
              name="hind_foot_angle_W_left"
              label="Hind Foot Angle W"
              value={file.hind_foot_angle_W_left}
            ></IO.Number>
            <IO.Number
              name="dorsal_flexion_max_left"
              label="Dorsal Flexion Max"
              value={file.dorsal_flexion_max_left}
            ></IO.Number>
            <IO.Number
              name="plantar_flexion_max_left"
              label="Plantar Flexion Max"
              value={file.plantar_flexion_max_left}
            ></IO.Number>
            <IO.Boolean
              name="muscular_inbalance_left"
              label="Muscular Inbalance"
              value={file.muscular_inbalance_left}
            ></IO.Boolean>
          </Panel>
        </TwoColumns>
        <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
      </>
    )
  });
}
