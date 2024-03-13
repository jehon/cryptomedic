import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Observable, map } from "rxjs";
import BackendAuthInterface from "./backend.auth";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export default class AuthService implements OnInit {
  public events: EventEmitter<BackendAuthInterface> = new EventEmitter();
  currentUser: BackendAuthInterface | undefined;

  constructor(private http: HttpClient) {
    this.hydrate();
  }

  ngOnInit(): void {
    this.#emit();
  }

  hydrate() {
    return fetch("/api/auth/settings", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (response) => {
      if (response.ok) {
        this.currentUser = (await response.json()) as BackendAuthInterface;
      } else {
        this.currentUser = undefined;
      }
    });
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
    // Nothing to be sent back...
    this.currentUser = undefined;
    this.#emit();

    return this.http.post<void>("/api/auth/logout", {}, httpOptions);
  }

  #emit() {
    console.log("emit", this.currentUser);
    this.events.emit(this.currentUser);
  }
}
