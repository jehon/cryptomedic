import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      '/api/auth/mylogin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post('/api/auth/logout', { }, httpOptions);
  }
}
