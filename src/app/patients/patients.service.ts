import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { plainToClass } from "class-transformer";
import "reflect-metadata";
import { BehaviorSubject, Observable, firstValueFrom, map } from "rxjs";
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

  load(id: string): Promise<Patient> {
    if (this.#patient?.id == id) {
      return Promise.resolve(this.#patient);
    }
    this.#patientId = id;

    // This observable fire only once
    const obs = this.http
      .get("/api/patients/" + id)
      .pipe(map((json: any) => plainToClass(Patient, json)));

    obs.subscribe((patient: Patient) => {
      this.#patient = patient;
      this.#observablePatient.next(this.#patient);
    });

    return firstValueFrom<Patient>(obs);
  }

  async unlockFile(file: Pojo) {
    if (!this.#patientId) {
      throw new Error(
        "Invalid state (Unlock): no patientId in PatientsService"
      );
    }

    if (!file.isLocked()) {
      throw new Error(
        `Invalid state (Unlock): file is not locked ${file.uuid}`
      );
    }

    this.dismiss();
    // TODO: should be PUT
    await firstValueFrom(
      this.http.get(
        `/api/fiche/${constants.models[file.getTechnicalName()].remote}/unlock/${file.id}`
      )
    );

    return this.load(this.#patientId);
  }

  async deleteFile(file: Pojo): Promise<Patient | undefined> {
    if (!this.#patientId) {
      throw new Error(
        "Invalid state (Delete): no patientId in PatientsService"
      );
    }

    if (!file.canDelete()) {
      throw new Error(
        `Invalid state (Delete): file could not be deleted ${file.uuid}`
      );
    }

    this.dismiss();
    await firstValueFrom(
      this.http.delete(
        `/api/fiche/${constants.models[file.getTechnicalName()].remote}/${file.id}`
      )
    );

    if (file.isTop()) {
      return;
    }

    return this.load(this.#patientId);
  }
}
