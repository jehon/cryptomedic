import { plainToInstance } from "class-transformer";
import { produce } from "immer";
import "reflect-metadata"; // plainToInstance
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
    throw new Error(`Could not find ${uid}} in getByUid`);
  }

  getByFieldValue(field: string, value?: string): PatientRelated[] {
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
      this.getByFieldValue("patient_id", this.getPatient().id)
        .sort(Folder.ordering)
        .filter((v) => !(v instanceof Patient))
        // TODO: this is not in the correct place
        .filter((v) => !(v instanceof Payment))
    );
  }

  // TODO: move this to bill
  getFilesRelatedToBill(id?: string): Payment[] {
    return this.getByFieldValue("bill_id", id).sort(
      Folder.ordering
    ) as unknown as Payment[];
  }

  getNextAppointment(): Date | undefined {
    const today = new Date();
    return this.getListByType<Appointment>(Appointment)
      .map((v) => v.date)
      .map((d) => new Date(d))
      .filter((d) => d > today)
      .sort((a, b) => b.getTime() - a.getTime()) // Bigger at top
      .shift();
  }

  getLastSeen(): Date | undefined {
    const today = new Date();
    return this.list
      .filter((v) => !(v instanceof Appointment)) // We take everything except Appointment
      .map((v) => "date" in v && v.date)
      .filter((d) => d)
      .map((d) => new Date(d as string))
      .filter((d) => d < today)
      .sort((a, b) => a.getTime() - b.getTime())
      .pop();
  }

  static ordering(o1: PatientRelated, o2: PatientRelated) {
    const o1First = -1;
    const o2First = 1;

    const o1id = parseInt(o1.id || "");
    const o2id = parseInt(o2.id || "");

    // Return 1 if o1 > o2 (o1 - o2) (o1 est après o2)
    // Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)

    // What to do if one 'id' is missing
    if (isNaN(o1id) && !isNaN(o2id)) {
      return 10 * o1First;
    }
    if (isNaN(o2id) && !isNaN(o1id)) {
      return 10 * o2First;
    }

    if ("date" in o1 && o1.date != undefined) {
      if ("date" in o2 && o2.date != undefined) {
        // Both 'date' are present
        if (o1.date < o2.date) return 30 * o2First;
        if (o1.date > o2.date) return 30 * o1First;
      } else {
        return 20 * o2First;
      }
    } else {
      if ("date" in o2 && o2.date != undefined) {
        return 20 * o1First;
      } else {
        // Both 'date' are absent
        // Not deciding here
      }
    }

    if (
      typeof o1.created_at != "undefined" &&
      typeof o2.created_at != "undefined"
    ) {
      if (o1.created_at < o2.created_at) return 40 * o2First;
      if (o1.created_at > o2.created_at) return 40 * o1First;
    }

    // Both 'id' are present
    if (!isNaN(o1id) && !isNaN(o2id)) {
      if (o1id > o2id) return 50 * o1First;
      if (o1id < o2id) return 50 * o2First;
    }

    // Both 'type' are present
    if (o1.getStatic().getTitle() < o2.getStatic().getTitle())
      return 40 * o1First;
    if (o1.getStatic().getTitle() > o2.getStatic().getTitle())
      return 40 * o2First;

    return 0;
  }
}
