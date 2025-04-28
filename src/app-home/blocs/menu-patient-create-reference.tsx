import { useRef } from "react";
import IONumber from "../../widget/io-number";
import { MenuItem } from "./menu-item";

export function MenuPatientCreateReference() {
  const formRef = useRef<HTMLFormElement>(null);

  // TODO

  return (
    <MenuItem
      title="Create a reference"
      requires="folder.edit"
      // versalIcon={icons.models.patient}
      toRoute=""
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
