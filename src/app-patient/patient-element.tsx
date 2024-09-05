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
import * as config from "../config.js";
import ButtonsGroup from "../styles/buttons-group";
import { defaultWidthScreen } from "../styles/style-helpers";
import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import appointmentElementGenerator from "./appointment-element";
import billElementGenerator from "./bill-element";
import FilePanel, { isTodoMigration } from "./blocs/file-panel";
import consultClubfootElementGenerator from "./consult-clubfoot-element";
import consultRicketElementGenerator from "./consult-ricket-element";
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

export default function PatientElement({
  folder: givenPatient,
  selectedUid,
  mode
}: {
  folder: Folder;
  selectedUid?: string;
  mode?: string;
}): React.ReactNode {
  const [folder, folderUpdated] = useState<Folder>(givenPatient);
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
        <IO.Date label="Next appointment" value={folder.getNextAppoinment()} />
      </Panel>

      {/* ------------ Patient file  --------------------*/}
      <FilePanel
        closed={patient.uid() !== selectedUid && !!selectedUid}
        file={patient}
        onUpdate={folderUpdatedCallback}
        header={
          <>
            <span>
              {patient.entry_year}-{patient.entry_order}
            </span>
            <span className="no-mobile">{patient.name}</span>
            <span className="no-mobile">{patient.year_of_birth}</span>
          </>
        }
      >
        <>
          <TwoColumns>
            <Panel fixed label="Identification">
              <IO.Number
                name="entry_year"
                value={patient.entry_year}
                min={1980}
                max={2100}
              />
              <IO.Number name="entry_order" value={patient.entry_order} />
              <IO.String name="name" value={patient.name} />
              <IO.String name="sex" value={patient.sex} />
              <IO.String
                name="year_of_birth"
                label="Year of Birth"
                value={patient.year_of_birth}
              />
              <IO.String
                label="Age today"
                value={patient.actualAge() as string}
                e2eExcluded
              />
              <IO.String name="pathology" value={patient.pathology} />
              <IO.Text name="comments" value={patient.comments} />
            </Panel>
            <Panel fixed label="Address">
              <IO.String name="phone" value={patient.phone} />
              <IO.String
                name="address_district"
                label="District"
                value={patient.address_district}
              />
              <IO.String
                name="address_upazilla"
                label="Upazilla"
                value={patient.address_upazilla}
              />
              <IO.String
                name="address_union"
                label="Union"
                value={patient.address_union}
              />
              <IO.Text
                name="address_comments"
                value={patient.address_comments}
              />
            </Panel>
          </TwoColumns>
        </>
      </FilePanel>

      {/* ------------ Related files List  --------------------*/}

      {(folder.getFilesRelatedToPatient() as PatientRelated[]).map(
        (file: PatientRelated) => {
          const commonProps = {
            selectedUid,
            mode,
            onUpdate: folderUpdatedCallback
          };

          if (file instanceof Appointment) {
            return appointmentElementGenerator(file, commonProps);
          }
          if (file instanceof Bill) {
            return billElementGenerator(file, commonProps);
          }
          if (file instanceof ConsultClubfoot) {
            return consultClubfootElementGenerator(file, commonProps);
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
