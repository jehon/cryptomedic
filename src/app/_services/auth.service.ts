import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<object> {
    return this.http.post(
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
    return this.http.post('/api/auth/logout', { }, httpOptions).pipe(map(() => undefined));
  }
}
