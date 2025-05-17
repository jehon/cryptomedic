import { produce } from "immer";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Folder from "../business/folder";
import * as config from "../config";
import { patientRelatedOrdering } from "../utils/calculations";
import ButtonsGroup from "../widget/buttons-group";
import { Modes, type ModesList } from "../widget/io-abstract";
import IODate from "../widget/io-date";
import Panel from "../widget/panel";
import Waiting from "../widget/waiting";
import AppointmentElement from "./appointment-element";
import BillElement from "./bill-element";
import ConsultClubfootElement from "./consult-clubfoot-element";
import ConsultOtherElement from "./consult-other-element";
import ConsultRicketElement from "./consult-ricket-element";
import { getFolder } from "./loaders-patient";
import type {
  Appointment,
  Bill,
  ConsultClubfoot,
  ConsultOther,
  ConsultRicket,
  Patient,
  PatientRelated,
  Picture,
  Surgery
} from "./objects-patient";
import PatientElement from "./patient-element";
import PictureElement from "./picture-element";
import SurgeryElement from "./surgery-element";

// ts-unused-exports:disable-next-line
export function getNextAppointment(folder: Folder): Date | undefined {
  const today = new Date();
  return folder.list
    .filter((v) => v._type == "appointment")
    .map((v) => (v as Appointment).date)
    .filter((d) => d != undefined)
    .map((d) => new Date(d))
    .filter((d) => d > today)
    .sort((a, b) => b.getTime() - a.getTime()) // Bigger at top
    .shift();
}

// ts-unused-exports:disable-next-line
export function getLastSeen(folder: Folder): Date | undefined {
  const today = new Date();
  return folder
    .getChildren()
    .filter((v) => v._type != "appointment") // We take everything except Appointment
    .map((v) => "date" in v && v.date)
    .filter((d) => d)
    .map((d) => new Date(d as string))
    .filter((d) => d < today)
    .sort((a, b) => a.getTime() - b.getTime())
    .pop();
}

function withFile(folder: Folder, file: PatientRelated): Folder {
  return produce(withoutFile(folder, file), (draft) => {
    draft.list.push(file);
    draft.list.sort(patientRelatedOrdering);
  });
}

function withoutFile(folder: Folder, file: PatientRelated): Folder {
  return produce(folder, (draft) => {
    draft.list = draft.list.filter(
      (item) => !(item.id == file.id && item._type == file._type)
    );
  });
}

function withoutAdded(folder: Folder): Folder {
  return produce(folder, (draft) => {
    draft.list = draft.list.filter((f) => f.id);
  });
}

export default function PagePatient(): React.ReactNode {
  const params = useParams();
  const props: {
    id: string;
    selectedType?: string;
    selectedId?: string;
    mode: ModesList;
  } = {
    id: params["id"]!,
    selectedType: params["selectedType"],
    selectedId: params["selectedId"],
    mode: params["mode"] == "edit" ? Modes.input : Modes.output
  };

  const navigate = useNavigate();

  const [folder, folderUpdated] = useState<Folder | undefined>(undefined);
  useEffect(() => {
    getFolder(props.id).then((folder) => folderUpdated(folder));
  }, [props.id]);

  if (!folder) {
    return <Waiting message={`folder ${props.id}`} />;
  }

  const patient = folder?.list.filter((f) => f._type == "patient")?.[0];
  if (!patient) {
    return <div key="no-patient-selected">No Patient selected</div>;
  }

  const folderUpdatedCallback = (folder: Folder | undefined) => {
    if (folder) {
      folderUpdated(folder);
    } else {
      navigate("/home");
    }
  };

  const selectedUid = props.selectedType
    ? `${props.selectedType}.${props.selectedId ?? "add"}`
    : `patient.${props.selectedId}`;

  if (props.selectedId == "add") {
    const typeName = props.selectedType as config.BusinessType;

    // Test if the added item is already present
    if (
      folder.list.filter(
        (f) =>
          `${f._type}.${f.id ?? "add"}` ==
          `${props.selectedType}.${props.selectedId}`
      ).length == 0
    ) {
      folderUpdated(
        folder.withFile({
          _type: typeName,
          patient_id: folder.id
        } as PatientRelated)
      );
    }
  }

  return (
    <div
      key="top-folder"
      data-testid={"folder-" + patient.id}
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
              to={`/patient/${patient.id!}/${type}/add`}
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

      <PatientElement
        key={`patient/${patient.id ?? "add"}`}
        patient={patient}
        closed={`patient.${patient.id}` !== selectedUid}
        canBeDeleted={folder.getChildren().length == 0}
        edit={
          `patient.${patient.id}` == selectedUid
            ? props.mode === Modes.input
            : false
        }
        onUpdated={(file: Patient) =>
          // TODO: Fix this horrible hack
          folderUpdatedCallback(
            withFile(folder, file as unknown as PatientRelated)
          )
        }
        onDeleted={(file: Patient) => navigate("/")}
      />

      {(folder.getChildren() as PatientRelated[]).map(
        (file: PatientRelated) => {
          const uid = `${file._type}.${file.id ?? "add"}`;
          const commonProps = {
            patient,
            closed: uid !== selectedUid,
            parentPath: `/patient/${patient.id}`,
            edit: uid == selectedUid ? props.mode === Modes.input : false,
            onCreated: (file: PatientRelated) => {
              folderUpdatedCallback(withFile(withoutAdded(folder), file));
            },
            onUpdated: (file: PatientRelated) =>
              folderUpdatedCallback(withFile(folder, file)),
            onDeleted: (file: PatientRelated) =>
              folderUpdatedCallback(withoutFile(folder, file))
          };

          if (file._type == "appointment") {
            return (
              <AppointmentElement
                key={`appointment/${file.id ?? "add"}`}
                file={file as Appointment}
                {...commonProps}
              />
            );
          }
          if (file._type == "bill") {
            return (
              <BillElement
                key={`bill/${file.id ?? "add"}`}
                file={file as Bill}
                {...commonProps}
              />
            );
          }
          if (file._type == "consult_clubfoot") {
            return (
              <ConsultClubfootElement
                key={`consult_clubfoot/${file.id ?? "add"}`}
                file={file as ConsultClubfoot}
                {...commonProps}
              />
            );
          }
          if (file._type == "consult_other") {
            return (
              <ConsultOtherElement
                key={`consult_other/${file.id ?? "add"}`}
                file={file as ConsultOther}
                {...commonProps}
              />
            );
          }
          if (file._type == "consult_ricket") {
            return (
              <ConsultRicketElement
                key={`consult_ricket/${file.id ?? "add"}`}
                file={file as ConsultRicket}
                {...commonProps}
              />
            );
          }
          if (file._type == "picture") {
            return (
              <PictureElement
                key={`consult_picture/${file.id ?? "add"}`}
                file={file as Picture}
                {...commonProps}
              />
            );
          }
          if (file._type == "surgery") {
            return (
              <SurgeryElement
                key={`consult_surgery/${file.id ?? "add"}`}
                file={file as Surgery}
                {...commonProps}
              />
            );
          }
          throw new Error(`Type is unknown: ${file._type}`);
        }
      )}
    </div>
  );
}
