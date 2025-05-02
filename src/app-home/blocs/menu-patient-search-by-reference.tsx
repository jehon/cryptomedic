import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../widget/action-button";
import IONumber from "../../widget/io-number";
import { patientSearch } from "../loaders";
import { MenuItem } from "./menu-item";

export function MenuPatientSearchByReference() {
  const [state, updateState] = useState<"" | "create" | "error">("");
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <form
      ref={formRef}
      onSubmit={async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const patients = await patientSearch(new FormData(event.currentTarget));
        switch (patients.length) {
          case 1: {
            const patient = patients[0];
            navigate(`/patient/${patient.id}/patient.${patient.id}`);
            break;
          }
        }
      }}
    >
      <MenuItem
        title="Create a reference"
        requires="folder.edit"
        // versalIcon={icons.models.patient}
        buttons={[<ActionButton key="view" style="View" default />]}
      >
        <IONumber
          mode="input"
          name="entry_year"
          value={currentYear}
          htmlProps={{ min: 2000, max: currentYear }}
        />
        <IONumber
          mode="input"
          name="entry_order"
          value={0}
          htmlProps={{ min: 1 }}
        />
      </MenuItem>
    </form>
  );
}
