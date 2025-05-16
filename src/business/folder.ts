import { produce } from "immer";
import "reflect-metadata"; // plainToInstance
import type {
  Bill,
  Patient,
  PatientRelated,
  Payment
} from "../app-patient/objects";
import type { BusinessType } from "../config";
import { patientRelatedOrdering } from "../utils/calculations";
import { removeNull } from "../utils/objects";
import PojoClass from "./pojo-class";

export function serverType2BusinessType(type: string): BusinessType {
  switch (type) {
    case "Appointment":
      return "appointment";
    case "Bill":
      return "bill";
    case "ClubFoot":
      return "consult_clubfoot";
    case "OtherConsult":
      return "consult_other";
    case "RicketConsult":
      return "consult_ricket";
    case "Patient":
      return "patient";
    case "Payment":
      return "payment";
    case "Picture":
      return "picture";
    case "Surgery":
      return "surgery";
    default:
      throw new Error(
        `Unknown type: ${type} in serverType2BusinessType in patient-element`
      );
  }
}

export default class Folder extends PojoClass {
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
      this.list.push({
        ...removeNull(v.record),
        _type: serverType2BusinessType(v.type)
      });
    }
    this.list.sort(patientRelatedOrdering);
    try {
      this.getPatient();
    } catch (_e) {
      this.list.push({ _type: "patient", patient_id: this.id });
    }

    for (const bill of this.list) {
      if (bill._type == "bill") {
        (bill as Bill).payment = this.list.filter(
          (payment) =>
            payment._type == "payment" &&
            (payment as Payment).bill_id == bill.id
        ) as Payment[];
      }
    }
  }

  withFile(file: PatientRelated): Folder {
    //
    // We remove and add in one run
    // to avoid building twice the folder
    //
    return produce(this.withoutFile(file), (draft) => {
      draft.list.push(file as unknown as PatientRelated); // TODO: Fix cast
    });
  }

  withoutFile(file: PatientRelated): Folder {
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
}
