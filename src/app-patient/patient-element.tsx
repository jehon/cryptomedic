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
import ActionButton from "../widget/action-button";
import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import AppointmentElement from "./appointment-element";
import BillElement from "./bill-element";
import FilePanel from "./blocs/file-panel";
import ConsultClubfootElement from "./consult-clubfoot-element";
import ConsultOtherElement from "./consult-other-element";
import ConsultRicketElement from "./consult-ricket-element";
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

  return (
    <div
      data-role="summary"
      data-testid={"folder-" + folder.getId()}
      style={{ width: defaultWidthScreen, margin: "0 auto" }}
    >
      {/* ------------ Header  --------------------*/}
      <ButtonsGroup>
        <ActionButton
          style="Add"
          linkTo={["folder", "" + folder.getId(), "addfile"]}
        />
      </ButtonsGroup>

      {/* ------------ Key dates  --------------------*/}
      <Panel key="key-dates" label="Key dates">
        <IO.Date label="Last seen" value={folder.getLastSeen()} readonly />
        <IO.Date
          label="Next appointment"
          value={folder.getNextAppoinment()}
          readonly
        />
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
                readonly
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
