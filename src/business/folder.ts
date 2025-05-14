import { plainToInstance } from "class-transformer";
import { produce } from "immer";
import "reflect-metadata"; // plainToInstance
import type { BusinessType } from "../config";
import { patientRelatedOrdering } from "../utils/calculations";
import { removeNull } from "../utils/objects";
import type PatientRelated from "./abstracts/patient-related";
import Pojo from "./abstracts/pojo";
import Appointment from "./appointment";
import Bill from "./bill";
import ConsultClubfoot from "./consult-clubfoot";
import ConsultOther from "./consult-other";
import ConsultRicket from "./consult-ricket";
import Patient from "./patient";
import Payment from "./payment";
import Picture from "./picture";
import Surgery from "./surgery";

export function type2Class(type: string): typeof Pojo {
  switch (type) {
    case "appointment":
    case "Appointment":
      return Appointment;
    case "bill":
    case "Bill":
      return Bill;
    case "consult_clubfoot":
    case "ClubFoot":
      return ConsultClubfoot;
    case "consult_other":
    case "OtherConsult":
      return ConsultOther;
    case "consult_ricket":
    case "RicketConsult":
      return ConsultRicket;
    case "Patient":
      return Patient;
    case "Payment":
      return Payment;
    case "picture":
    case "Picture":
      return Picture;
    case "surgery":
    case "Surgery":
      return Surgery;
    default:
      throw new Error(`Unknown type: ${type} in type2Class in patient-element`);
  }
}

function serverType2BusinessType(type: string): BusinessType {
  switch (type) {
    case "appointment":
    case "Appointment":
      return "appointment";
    case "bill":
    case "Bill":
      return "bill";
    case "consult_clubfoot":
    case "ClubFoot":
      return "consult_clubfoot";
    case "consult_other":
    case "OtherConsult":
      return "consult_other";
    case "consult_ricket":
    case "RicketConsult":
      return "consult_ricket";
    case "Patient":
      return "patient";
    case "Payment":
      return "payment";
    case "picture":
    case "Picture":
      return "picture";
    case "surgery":
    case "Surgery":
      return "surgery";
    default:
      throw new Error(`Unknown type: ${type} in type2Class in patient-element`);
  }
}

export default class Folder extends Pojo {
  list: PatientRelated[];

  constructor(listing: any = []) {
    super();
    const id =
      "" +
      (listing
        .filter(
          (v: { type: string; [key: string]: string }) => v.type == "Patient"
        )
        .pop()?.id ?? -1);
    this.id = id;
    this.list = [];

    // create the objects
    for (const i in listing) {
      const v = listing[i];
      this.list.push(
        plainToInstance(
          type2Class(v.type) as unknown as new () => PatientRelated,
          {
            ...removeNull(v.record),
            _type: serverType2BusinessType(v.type)
          },
          { enableImplicitConversion: true }
        )
      );
    }
    this.list.sort(patientRelatedOrdering);
    try {
      this.getPatient();
    } catch (_e) {
      this.list.push(Patient.factory({}, "patient"));
    }
  }

  withFileOLD(file: PatientRelated): Folder {
    //
    // We remove and add in one run
    // to avoid building twice the folder
    //
    return produce(this.withoutFileOLD(file), (draft) => {
      draft.list.push(file);
    });
  }

  withoutFileOLD(file: PatientRelated): Folder {
    const fileUid = `${file._type}.${file.id ?? "add"}`;
    const i = this.list.findIndex(
      (val) => `${val._type}.${val.id ?? "add"}` === fileUid
    );
    if (i < 0) {
      return this;
    }

    return produce(this, (draft) => {
      draft.list.splice(i, 1);
    });
  }

  getListByType<T extends PatientRelated>(type: BusinessType): T[] {
    return this.list.filter((v) => v._type == type) as T[];
  }

  getByTypeAndId<T extends PatientRelated>(type: BusinessType, id: string): T {
    const list = this.getListByType(type).filter((v) => `${v.id}` == `${id}`);
    if (list.length != 1)
      throw new Error(`Could not find ${type}#${id}} in getByTypeAndId`);
    return list.pop() as T;
  }

  private getByFieldValue(field: string, value?: string): PatientRelated[] {
    const res = [];
    for (const i in this.list) {
      // Not exactly exact, but close enough
      if ((this.list[i][field as keyof PatientRelated] as string) == value) {
        res.push(this.list[i] as PatientRelated);
      }
    }
    return res;
  }

  getPatient(): Patient {
    const list = this.list.filter((v) => v._type == "patient");
    if (list.length != 1) {
      throw new Error(`Can not get Patient ${JSON.stringify(list)}`);
    }
    return list.pop() as Patient;
  }

  getChildren(): PatientRelated[] {
    if (!this.getPatient().id) {
      return [];
    }
    return this.list
      .filter((v) => v._type != "patient")
      .filter((v) => v._type != "payment");
  }

  // TODO: move this to bill
  getFilesRelatedToBill(id?: string): Payment[] {
    return this.getByFieldValue("bill_id", id).sort(
      patientRelatedOrdering
    ) as unknown as Payment[];
  }
}
