import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BackendAuthInterface from "./backend.auth";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<BackendAuthInterface> {
    return this.http.post<BackendAuthInterface>(
      '/api/auth/mylogin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<void> {
    // Nothing to be sent back...
    return this.http.post<void>('/api/auth/logout', { }, httpOptions);
  }
}

// https://www.vitamindev.com/angular/how-to-initialize-a-service-on-startup/
export const authServiceFactory = (httpClient: HttpClient) => {
  const au = new AuthService(httpClient);
  return au;
};