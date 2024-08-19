import React, { useState } from "react";
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
import AppointmentElement from "./appointment-element";
import BillElement from "./bill-element";
import FilePanel, { isTodoMigration } from "./blocs/file-panel";
import ConsultClubfootElement from "./consult-clubfoot-element";
import ConsultOtherElement from "./consult-other-element";
import ConsultRicketElement from "./consult-ricket-element";
import { patientRouterToFile } from "./patient-router";
import PictureElement from "./picture-element";
import SurgeryElement from "./surgery-element";

export default function PatientElement({
  folder: givenPatient,
  selectedUid
}: {
  folder: Folder;
  selectedUid?: string;
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

  const addOne = function (type: typeof PatientRelated) {
    if (isTodoMigration(type)) {
      location.hash = `#/folder/${folder.getId()}/file/${type.getModel()}`;
      return;
    }
    const nf = new type();
    nf.registerParent(folder);
    folderUpdated(folder.withFile(nf));
    location.hash = patientRouterToFile(folder, nf);
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
            <a
              className="dropdown-item"
              key={type.getTechnicalName()}
              onClick={() => addOne(type)}
              data-testid={"add-" + type.getTechnicalName()}
            >
              {type.getTitle()}
            </a>
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
        folder={folder}
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
          if (file instanceof Appointment) {
            return (
              <AppointmentElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() === selectedUid}
                onUpdate={folderUpdatedCallback}
              ></AppointmentElement>
            );
          }
          if (file instanceof Bill) {
            return (
              <BillElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() === selectedUid}
                onUpdate={folderUpdatedCallback}
              ></BillElement>
            );
          }
          if (file instanceof ConsultClubfoot) {
            return (
              <ConsultClubfootElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() === selectedUid}
                onUpdate={folderUpdatedCallback}
              ></ConsultClubfootElement>
            );
          }
          if (file instanceof ConsultOther) {
            return (
              <ConsultOtherElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() === selectedUid}
                onUpdate={folderUpdatedCallback}
              ></ConsultOtherElement>
            );
          }
          if (file instanceof ConsultRicket) {
            return (
              <ConsultRicketElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() === selectedUid}
                onUpdate={folderUpdatedCallback}
              ></ConsultRicketElement>
            );
          }
          if (file instanceof Picture) {
            return (
              <PictureElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() === selectedUid}
                onUpdate={folderUpdatedCallback}
              ></PictureElement>
            );
          }
          if (file instanceof Surgery) {
            return (
              <SurgeryElement
                key={file.uid()}
                folder={folder}
                file={file}
                opened={file.uid() === selectedUid}
                onUpdate={folderUpdatedCallback}
              ></SurgeryElement>
            );
          }
          return null;
        }
      )}
    </div>
  );
}
