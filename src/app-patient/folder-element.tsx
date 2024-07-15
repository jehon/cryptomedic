import React, { useState } from "react";
import PatientRelated from "../business/abstracts/patient-related";
import Appointment from "../business/appointment";
import Bill from "../business/bill";
import ConsultClubfoot from "../business/consult-clubfoot";
import ConsultOther from "../business/consult-other";
import ConsultRicket from "../business/consult-ricket";
import Folder from "../business/folder";
import Patient from "../business/patient";
import Picture from "../business/picture";
import Surgery from "../business/surgery";
import * as config from "../config.js";
import ButtonsGroup from "../styles/buttons-group";
import { defaultWidthScreen } from "../styles/style-helpers";
import ActionButton from "../widget/action-button";
import IO from "../widget/io";
import Panel from "../widget/panel";
import AppointmentElement from "./appointment-element";
import BillElement from "./bill-element";
import ConsultClubfootElement from "./consult-clubfoot-element";
import ConsultOtherElement from "./consult-other-element";
import ConsultRicketElement from "./consult-ricket-element";
import PatientElement from "./patient-element";
import PictureElement from "./picture-element";
import SurgeryElement from "./surgery-element";

export default function FolderElement({
  folder: givenFolder,
  selectedUid
}: {
  folder: Folder;
  selectedUid?: string;
}): React.ReactNode {
  const [folder, folderUpdated] = useState<Folder>(givenFolder);

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
      <ButtonsGroup>
        <ActionButton
          style="Alternate"
          action="Add"
          linkTo={["folder", "" + folder.getId(), "addfile"]}
        />
      </ButtonsGroup>
      <Panel key="key-dates" label="Key dates">
        <IO.Date label="Last seen" value={folder.getLastSeen()} readonly />
        <IO.Date
          label="Next appointment"
          value={folder.getNextAppoinment()}
          readonly
        />
      </Panel>
      <PatientElement
        key={(folder.getPatient() as Patient).uid()}
        file={folder.getPatient() as Patient}
        folder={folder}
        opened={folder.getPatient().uid() === selectedUid || !selectedUid}
        onUpdate={folderUpdatedCallback}
      ></PatientElement>
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
