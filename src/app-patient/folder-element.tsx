import { useState } from "react";
import { Link } from "react-router-dom";
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
import IODate from "../widget/io-date";
import Panel from "../widget/panel";
import AppointmentElement from "./appointment-element";
import BillElement from "./bill-element";
import { isTodoMigration } from "./blocs/file-panel";
import ConsultClubfootElement from "./consult-clubfoot-element";
import ConsultOtherElement from "./consult-other-element";
import ConsultRicketElement from "./consult-ricket-element";
import patientElementGenerator from "./patient-element";
import PictureElement from "./picture-element";
import SurgeryElement from "./surgery-element";

export default function FolderElement({
  folder: initialFolder,
  selectedUid,
  mode
}: {
  folder: Folder;
  selectedUid?: string;
  mode?: string;
}): React.ReactNode {
  const [folder, folderUpdated] = useState<Folder>(initialFolder);

  const folderUpdatedCallback = (folder: Folder | undefined) => {
    if (folder) {
      folderUpdated(folder);
    } else {
      document.location.href = config.urls.home;
    }
  };

  if (!folder) {
    return <div key="no-folder-selected">No folder selected</div>;
  }

  if (selectedUid?.endsWith(".add")) {
    const typeName = selectedUid.replace(".add", "");
    const typeClass = type2Class(typeName) as typeof PatientRelated;
    if (isTodoMigration(typeClass)) {
      location.hash = `/folder/${folder.id}/file/${typeClass.getModel()}`;
      return;
    }
    if (folder.list.filter((f) => f.uid() == selectedUid).length == 0) {
      const nf = typeClass.factory() as PatientRelated;
      nf.registerParent(folder);
      folderUpdated(folder.withFileOLD(nf));
    }
  }

  const commonProps = {
    folder,
    selectedUid: selectedUid ?? `patient.${folder.id!}`,
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
          {[
            Appointment,
            Bill,
            ConsultClubfoot,
            ConsultOther,
            ConsultRicket,
            Picture,
            Surgery
          ].map((type) => (
            <Link
              className="dropdown-item"
              key={type.getTechnicalName()}
              data-testid={"add-" + type.getTechnicalName()}
              to={`/patient/${folder.id!}/${type.getTechnicalName()}.add`}
            >
              {config.type2Title(type.getTechnicalName())}
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
                key={file.uid()}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof Bill) {
            return (
              <BillElement key={file.uid()} file={file} props={commonProps} />
            );
          }
          if (file instanceof ConsultClubfoot) {
            return (
              <ConsultClubfootElement
                key={file.uid()}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof ConsultOther) {
            return (
              <ConsultOtherElement
                key={file.uid()}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof ConsultRicket) {
            return (
              <ConsultRicketElement
                key={file.uid()}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof Picture) {
            return (
              <PictureElement
                key={file.uid()}
                file={file}
                props={commonProps}
              />
            );
          }
          if (file instanceof Surgery) {
            return (
              <SurgeryElement
                key={file.uid()}
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
