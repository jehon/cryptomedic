import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import Folder from "../../../legacy/react/business/folder";

@Injectable({
  providedIn: "root"
})
export default class PatientsService {
  constructor(private http: HttpClient) {}

  load(id: string): Observable<Folder> {
    return this.http
      .get("/api/folder/Patient/" + id)
      .pipe(map((json) => new Folder(json["folder"])));
  }
}
