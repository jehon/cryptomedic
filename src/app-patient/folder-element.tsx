import { useState } from "react";
import { Link } from "react-router-dom";
import PatientRelated from "../business/abstracts/patient-related";
import Appointment from "../business/appointment";
import Bill from "../business/bill";
import ConsultClubfoot from "../business/consult-clubfoot";
import ConsultOther from "../business/consult-other";
import ConsultRicket from "../business/consult-ricket";
import Folder from "../business/folder";
import Picture from "../business/picture";
import Surgery from "../business/surgery";
import * as config from "../config";
import ButtonsGroup from "../styles/buttons-group";
import { defaultWidthScreen } from "../styles/style-helpers";
import IO from "../widget/io";
import Panel from "../widget/panel";
import appointmentElementGenerator from "./appointment-element";
import billElementGenerator from "./bill-element";
import { isTodoMigration } from "./blocs/file-panel";
import consultClubfootElementGenerator from "./consult-clubfoot-element";
import consultOtherElementGenerator from "./consult-other-element";
import consultRicketElementGenerator from "./consult-ricket-element";
import patientElementGenerator from "./patient-element";
import { patientRouterToFileAdd } from "./patient-router";
import pictureElementGenerator from "./picture-element";
import surgeryElementGenerator from "./surgery-element";

export function type2Class(type: string): typeof PatientRelated {
  switch (type) {
    case "appointment":
      return Appointment;
    case "bill":
      return Bill;
    case "consult_clubfoot":
      return ConsultClubfoot;
    case "consult_other":
      return ConsultOther;
    case "consult_ricket":
      return ConsultRicket;
    case "picture":
      return Picture;
    case "surgery":
      return Surgery;
    default:
      throw new Error(`Unknown type: ${type} in type2Class in patient-element`);
  }
}

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
  const patient = folder.getPatient();

  const folderUpdatedCallback = (folder: Folder | undefined) => {
    if (folder) {
      folderUpdated(folder);
    } else {
      document.location.href = config.urls.home;
    }
  };

  if (!folder) {
    return <div>No folder selected</div>;
  }

  if (selectedUid?.endsWith(".add")) {
    const typeName = selectedUid.replace(".add", "");
    const typeClass = type2Class(typeName);
    if (isTodoMigration(typeClass)) {
      location.hash = `/folder/${folder.getId()}/file/${typeClass.getModel()}`;
      return;
    }
    if (folder.list.filter((f) => f.uid() == selectedUid).length == 0) {
      const nf = new typeClass();
      nf.registerParent(folder);
      folderUpdated(folder.withFile(nf));
    }
  }

  const commonProps = {
    selectedUid,
    mode,
    onUpdate: folderUpdatedCallback
  };

  return (
    <div
      data-role="summary"
      data-testid={"folder-" + folder.getId()}
      style={{ width: defaultWidthScreen, margin: "0 auto" }}
    >
      {/* ------------ Header  --------------------*/}
      <ButtonsGroup>
        <button
          id="btnAddSelector"
          type="button"
          className="action-alternate btn btn-secondary dropdown-toggle"
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
              to={patientRouterToFileAdd(folder, type)}
            >
              {type.getTitle()}
            </Link>
          ))}
        </div>
      </ButtonsGroup>
      {/* ------------ Key dates  --------------------*/}
      <Panel key="key-dates" label="Key dates">
        <IO.Date label="Last seen" value={folder.getLastSeen()} />
        <IO.Date label="Next appointment" value={folder.getNextAppointment()} />
      </Panel>

      {patientElementGenerator(patient, commonProps)}

      {(folder.getFilesRelatedToPatient() as PatientRelated[]).map(
        (file: PatientRelated) => {
          if (file instanceof Appointment) {
            return appointmentElementGenerator(file, commonProps);
          }
          if (file instanceof Bill) {
            return billElementGenerator(file, commonProps);
          }
          if (file instanceof ConsultClubfoot) {
            return consultClubfootElementGenerator(file, commonProps);
          }
          if (file instanceof ConsultOther) {
            return consultOtherElementGenerator(file, commonProps);
          }
          if (file instanceof ConsultRicket) {
            return consultRicketElementGenerator(file, commonProps);
          }
          if (file instanceof Picture) {
            return pictureElementGenerator(file, commonProps);
          }
          if (file instanceof Surgery) {
            return surgeryElementGenerator(file, commonProps);
          }
          return null;
        }
      )}
    </div>
  );
}
