import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { plainToClass } from "class-transformer";
import "reflect-metadata";
import { BehaviorSubject, Observable, map } from "rxjs";
import constants from "../generic/constants";
import Pojo from "./business/abstracts/pojo";
import Patient from "./business/patient";

@Injectable({
  providedIn: "root"
})
export default class PatientsService {
  #patientId?: string;
  #patient?: Patient;
  #observablePatient = new BehaviorSubject<Patient | undefined>(undefined);

  constructor(private http: HttpClient) {}

  getPatientObservable(): Observable<Patient | undefined> {
    return this.#observablePatient;
  }

  dismiss() {
    this.#patient = undefined;
  }

  load(id: string): void {
    if (id == this.#patient?.id) {
      return;
    }
    this.#patientId = id;

    this.http
      .get("/api/patients/" + id)
      // https://www.npmjs.com/package/class-transformer#plaintoclass
      .pipe(map((json: any) => plainToClass(Patient, json)))
      .subscribe((patient: Patient) => {
        this.#patient = patient;
        this.#observablePatient.next(this.#patient);
      });
  }

  deleteFile(file: Pojo) {
    if (!this.#patientId) {
      throw new Error("Invalid state: no patientId in PatientsService");
    }
    const id = this.#patientId;

    this.dismiss();
    this.http
      .delete(
        `/api/fiche/${constants.models[file.getTechnicalName()].remote}/${file.id}`
      )
      .subscribe(() => this.load(id));
  }
}
