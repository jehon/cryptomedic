import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import BackendAuthInterface from "./backend.auth";

@Injectable({
  providedIn: "root"
})
export default class AuthService {
  currentUser: BackendAuthInterface | undefined;

  constructor(private http: HttpClient) {}

  hydrate(): Observable<BackendAuthInterface | undefined> {
    return this.http
      .get<BackendAuthInterface | undefined>("/api/auth/settings")
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (!(error.error instanceof ErrorEvent)) {
            if (401 === error.status) {
              return of(undefined);
            }
          }
          return throwError(() => error);
        })
      )
      .pipe(
        map((v) => {
          this.currentUser = v;
          return v;
        })
      );
  }

  login(username: string, password: string): Observable<BackendAuthInterface> {
    return this.http
      .post<BackendAuthInterface>("/api/auth/mylogin", {
        username,
        password
      })
      .pipe(
        map((data) => {
          this.currentUser = data;
          return data;
        })
      );
  }

  logout(): Observable<void> {
    this.currentUser = undefined;
    return this.http.get<void>("/api/auth/logout");
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
