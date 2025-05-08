import { plainToInstance } from "class-transformer";
import { produce } from "immer";
import "reflect-metadata"; // plainToInstance
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
          removeNull(v.record),
          { enableImplicitConversion: true }
        ).registerParent(this)
      );
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
    const i = this.list.findIndex((val) => val.uid() === file.uid());
    if (i < 0) {
      return this;
    }

    return produce(this, (draft) => {
      draft.list.splice(i, 1);
    });
  }

  getListByType<T extends PatientRelated>(type: typeof PatientRelated): T[] {
    console.assert(
      type instanceof Function,
      "getListByType[type/1] expect a class"
    );
    const res = [];
    for (const i in this.list) {
      if (this.list[i] instanceof type) {
        res.push(this.list[i] as T);
      }
    }
    return res;
  }

  getByTypeAndId<T extends PatientRelated>(
    type: typeof PatientRelated,
    id: string
  ): T {
    const list = this.getListByType(type);
    for (const i in list) {
      if (list[i].id + "" === id + "") {
        return list[i] as T;
      }
    }
    throw new Error(`Could not find ${type}#${id}} in getByTypeAndId`);
  }

  getByUid<T extends PatientRelated>(uid: string): T {
    if (uid === "Patient") {
      return this.getPatient() as PatientRelated as T;
    }
    for (const i in this.list) {
      if (this.list[i].uid && this.list[i].uid() === uid) {
        return this.list[i] as T;
      }
    }
    throw new Error(`Could not find ${uid} in getByUid`);
  }

  #getByFieldValue(field: string, value?: string): PatientRelated[] {
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
    const list = this.getListByType(Patient);
    if (list.length === 0) {
      // Always have a patient
      const p = new Patient();
      this.list.push(p);
      return p;
    }
    return list[0] as Patient;
  }

  getChildren(): PatientRelated[] {
    if (!this.getPatient().id) {
      return [];
    }
    return (
      this.#getByFieldValue("patient_id", this.getPatient().id)
        .sort(patientRelatedOrdering)
        .filter((v) => !(v instanceof Patient))
        // TODO: this is not in the correct place
        .filter((v) => !(v instanceof Payment))
    );
  }

  // TODO: move this to bill
  getFilesRelatedToBill(id?: string): Payment[] {
    return this.#getByFieldValue("bill_id", id).sort(
      patientRelatedOrdering
    ) as unknown as Payment[];
  }
}
