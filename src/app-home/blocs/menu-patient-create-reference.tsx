import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../widget/action-button";
import IONumber from "../../widget/io-number";
import { MenuItem } from "./menu-item";

export function MenuPatientCreateReference() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  // TODO

  return (
    <MenuItem
      title="Create a reference"
      requires="folder.edit"
      // versalIcon={icons.models.patient}
      buttons={[
        <ActionButton
          discrete={true}
          style={"Add"}
          onOk={() => {
            const year = new FormData(formRef.current!).get("entry_year");
            navigate(`/patient/create/${year}`);
          }}
        />
      ]}
    >
      <form ref={formRef}>
        <IONumber
          mode="input"
          name="entry_year"
          value={new Date().getFullYear()}
        />
      </form>
    </MenuItem>
  );
}
