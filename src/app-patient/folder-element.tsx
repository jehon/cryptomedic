import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PatientRelated from "../business/abstracts/patient-related";
import Appointment from "../business/appointment";
import Bill from "../business/bill";
import ConsultClubfoot from "../business/consult-clubfoot";
import ConsultOther from "../business/consult-other";
import ConsultRicket from "../business/consult-ricket";
import Folder, { type2Class } from "../business/folder";
import Picture from "../business/picture";
import Surgery from "../business/surgery";
import * as config from "../config";
import { getLastSeen, getNextAppointment } from "../utils/calculations";
import ButtonsGroup from "../widget/buttons-group";
import type { ModesList } from "../widget/io-abstract";
import IODate from "../widget/io-date";
import Panel from "../widget/panel";
import AppointmentElement from "./appointment-element";
import BillElement from "./bill-element";
import ConsultClubfootElement from "./consult-clubfoot-element";
import ConsultOtherElement from "./consult-other-element";
import ConsultRicketElement from "./consult-ricket-element";
import patientElementGenerator from "./patient-element";
import PictureElement from "./picture-element";
import SurgeryElement from "./surgery-element";

export default function FolderElement({
  folder: initialFolder,
  selectedType,
  selectedId,
  mode
}: {
  folder: Folder;
  selectedType?: string;
  selectedId?: string;
  mode: ModesList;
}): React.ReactNode {
  const navigate = useNavigate();
  const [folder, folderUpdated] = useState<Folder>(initialFolder);

  const folderUpdatedCallback = (folder: Folder | undefined) => {
    if (folder) {
      folderUpdated(folder);
    } else {
      navigate("/home");
    }
  };

  if (!folder) {
    return <div key="no-folder-selected">No folder selected</div>;
  }

  if (selectedId == "add") {
    const typeName = selectedType as config.BusinessType;
    const typeClass = type2Class(typeName) as typeof PatientRelated;

    // Test if the added item is already present
    if (
      folder.list.filter(
        (f) => `${f._type}.${f.id ?? "add"}` == `${selectedType}.${selectedId}`
      ).length == 0
    ) {
      folderUpdated(
        folder.withFileOLD(typeClass.factory({}, typeName) as PatientRelated)
      );
    }
  }

  const commonProps = {
    folder,
    selectedUid: selectedId
      ? `${selectedType}.${selectedId}`
      : `patient.${folder.id!}`,
    mode,
    onUpdate: folderUpdatedCallback
  };

  return (
    <div
      key="top-folder"
      data-testid={"folder-" + folder.id}
      className="reduce-width"
    >
      {/* ------------ Header  --------------------*/}
      <ButtonsGroup>
        <button
          id="btnAddSelector"
          type="button"
          className="action-alternate btn btn-secondary dropdown-toggle"
          data-testid="add"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Add
        </button>
        <div
          className="dropdown-menu dropdown-menu-right text-right"
          aria-labelledby="btnGroupDrop1"
        >
          {(
            [
              "appointment",
              "bill",
              "consult_clubfoot",
              "consult_other",
              "consult_ricket",
              "picture",
              "surgery"
            ] as config.BusinessType[]
          ).map((type) => (
            <Link
              className="dropdown-item"
              key={type}
              data-testid={`add-${type}`}
              to={`/patient/${folder.id!}/${type}/add`}
            >
              {config.type2Title(type)}
            </Link>
          ))}
        </div>
      </ButtonsGroup>
      {/* ------------ Key dates  --------------------*/}
      <Panel key="key-dates" label="Key dates">
        <IODate label="Last seen" value={getLastSeen(folder)} />
        <IODate label="Next appointment" value={getNextAppointment(folder)} />
      </Panel>

      {patientElementGenerator(folder.getPatient(), commonProps)}

      {(folder.getChildren() as PatientRelated[]).map(
        (file: PatientRelated) => {
          if (file instanceof Appointment) {
            return (
              <AppointmentElement
                key={`appointment/${file.id ?? "add"}`}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof Bill) {
            return (
              <BillElement
                key={`bill/${file.id ?? "add"}`}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof ConsultClubfoot) {
            return (
              <ConsultClubfootElement
                key={`consult_clubfoot/${file.id ?? "add"}`}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof ConsultOther) {
            return (
              <ConsultOtherElement
                key={`consult_other/${file.id ?? "add"}`}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof ConsultRicket) {
            return (
              <ConsultRicketElement
                key={`consult_ricket/${file.id ?? "add"}`}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof Picture) {
            return (
              <PictureElement
                key={`consult_picture/${file.id ?? "add"}`}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof Surgery) {
            return (
              <SurgeryElement
                key={`consult_surgery/${file.id ?? "add"}`}
                file={file}
                props={commonProps}
              />
            );
          }
          return null;
        }
      )}
    </div>
  );
}
