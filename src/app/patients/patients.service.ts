import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import Patient from "./business/patient";

@Injectable({
  providedIn: "root"
})
export default class PatientsService {
  constructor(private http: HttpClient) {}

  load(id: string): Observable<Patient> {
    return (
      this.http
        .get<{ [key: string]: Patient }>("/api/patients/" + id)
        // https://www.npmjs.com/package/class-transformer#plaintoclass
        .pipe(map((json) => plainToClass(Patient, json)))
    );
  }
}
