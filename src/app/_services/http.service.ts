import { Injectable } from "@angular/core";

interface AppHttpError {}

@Injectable({
  providedIn: "root"
})
export class HttpService {
  errors: AppHttpError[] = [];
  running: number = 0;
}
