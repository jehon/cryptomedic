import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../widget/action-button";
import { Modes } from "../../widget/io-abstract";
import IONumber from "../../widget/io-number";
import { patientCreate } from "../loaders-home";
import { MenuItem } from "./menu-item";

export function MenuPatientGenerateReference() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // TODO

  return (
    <form
      ref={formRef}
      onSubmit={async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const patient = await patientCreate(new FormData(event.currentTarget));
        navigate(`/patient/${patient.id}/patient/${patient.id}/edit`);
      }}
    >
      <MenuItem
        title="Generate a reference"
        requires="folder.edit"
        // versalIcon={icons.models.patient}
        buttons={[
          <ActionButton
            action="Generate"
            key="generate"
            style={"Add"}
            default
          />
        ]}
      >
        <IONumber
          mode={Modes.input}
          name="entry_year"
          value={currentYear}
          htmlProps={{ min: 2000, max: currentYear }}
        />
      </MenuItem>
    </form>
  );
}
