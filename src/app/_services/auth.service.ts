import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import BackendAuthInterface from "./backend.auth";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export default class AuthService {
  public events: EventEmitter<BackendAuthInterface> = new EventEmitter();
  currentUser: BackendAuthInterface | undefined;

  constructor(private http: HttpClient) {}

  hydrate() {
    return fetch("/api/auth/settings", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      async (response) => {
        if (response.ok) {
          this.currentUser = (await response.json()) as BackendAuthInterface;
        } else {
          this.currentUser = undefined;
        }
        this.#emit();
      },
      () => {
        this.currentUser = undefined;
        this.#emit();
      }
    );
  }

  login(username: string, password: string): Observable<BackendAuthInterface> {
    return this.http
      .post<BackendAuthInterface>(
        "/api/auth/mylogin",
        {
          username,
          password
        },
        httpOptions
      )
      .pipe(
        map((data) => {
          this.currentUser = data;
          this.#emit();
          return data;
        })
      );
  }

  logout(): Observable<void> {
    const response = this.http.get<void>("/api/auth/logout", httpOptions);
    response.subscribe(() => {
      this.currentUser = undefined;
      this.#emit();
    });
    return response;
  }

  #emit() {
    this.events.emit(this.currentUser);
  }
}
