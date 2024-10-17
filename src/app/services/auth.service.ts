import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'api/login';
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  }
  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
  isAuthenticated(): any {
    return !!localStorage.getItem('authToken');
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string; role: string }>(this.loginUrl, {
        username,
        password,
      })
      .pipe(
        map((response) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userRole', response.role);
            return true;
          }
          return false;
        })
      );
  }
}
