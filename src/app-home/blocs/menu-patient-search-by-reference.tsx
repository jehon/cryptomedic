import { useRef } from "react";
import IONumber from "../../widget/io-number";
import { MenuItem } from "./menu-item";

export function MenuPatientSearchByReference() {
  const formRef = useRef<HTMLFormElement>(null);

  // TODO

  return (
    <MenuItem
      title="Search by reference"
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
        <IONumber mode="input" name="entry_order" value={0} />
      </form>
    </MenuItem>
  );
}
