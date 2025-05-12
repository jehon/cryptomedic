import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../widget/action-button";
import { Modes } from "../../widget/io-abstract";
import IONumber from "../../widget/io-number";
import { patientCreate, patientSearch } from "../loaders";
import { MenuItem } from "./menu-item";

export function MenuPatientSearchByReference() {
  const currentYear = new Date().getFullYear();
  const [data, updateData] = useState<Record<string, number>>({
    entry_year: currentYear,
    entry_order: 0
  });
  const [state, updateState] = useState<"" | "create" | "error">("");
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const formMode = state == "" ? Modes.input : Modes.output;

  return (
    <form
      ref={formRef}
      onSubmit={async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const patients = await patientSearch(formData);
        if (patients.length == 1) {
          const patient = patients[0];
          navigate(`/patient/${patient.id}`);
        }

        if (patients.length == 0) {
          updateState("create");
        } else {
          updateState("error");
        }
      }}
    >
      <MenuItem
        title="Search a reference"
        requires="folder.edit"
        // versalIcon={icons.models.patient}
        buttons={[
          ...(state == ""
            ? [
                <ActionButton
                  action="Search"
                  key="search"
                  style="View"
                  default
                />
              ]
            : []),
          ...(state != ""
            ? [
                <ActionButton
                  key="reset"
                  style="Reset"
                  discrete
                  default
                  onOk={() => updateState("")}
                />
              ]
            : []),
          ...(state == "create"
            ? [
                <ActionButton
                  key="create"
                  style="Add"
                  action="Create"
                  onOk={() => {
                    const fd = new FormData();
                    fd.append("entry_year", "" + data["entry_year"]);
                    fd.append("entry_order", "" + data["entry_order"]);
                    patientCreate(fd).then((patient) =>
                      navigate(`/patient/${patient.id}`)
                    );
                  }}
                />
              ]
            : [])
        ]}
      >
        <IONumber
          mode={formMode}
          name="entry_year"
          value={data["entry_year"]}
          htmlProps={{ min: 2000, max: currentYear }}
          onChange={(val) => updateData({ ...data, entry_year: val })}
        />
        <IONumber
          mode={formMode}
          name="entry_order"
          value={data["entry_order"]}
          htmlProps={{ min: 1 }}
          onChange={(val) => updateData({ ...data, entry_order: val })}
        />
        {state == "error" && <div>Server error: multiple results received</div>}
        {state == "create" && <div>Create the selected reference?</div>}
      </MenuItem>
    </form>
  );
}
