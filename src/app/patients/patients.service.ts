import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { plainToClass } from "class-transformer";
import "reflect-metadata";
import { Observable, Subject, map } from "rxjs";
import Patient from "./business/patient";

@Injectable({
  providedIn: "root"
})
export default class PatientsService {
  #patient?: Patient;
  #observablePatient: Subject<Patient> = new Subject();

  constructor(private http: HttpClient) {}

  getPatientObservable(): Observable<Patient> {
    return this.#observablePatient;
  }

  dismiss() {
    this.#patient = undefined;
  }

  load(id: string): void {
    if (id == this.#patient?.id) {
      return;
    }

    this.http
      .get("/api/patients/" + id)
      // https://www.npmjs.com/package/class-transformer#plaintoclass
      .pipe(map((json: any) => plainToClass(Patient, json).normalize()))
      .subscribe((patient: Patient) => {
        this.#patient = patient;
        this.#observablePatient.next(this.#patient);
      });
  }
}
