import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExternalAuth } from '../models/externalAuth';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  serviceName = 'ExternalAuth';
  public user: WritableSignal<User | null> = signal(null);

  constructor(private http: HttpClient, private router: Router) {}

  public get userValue() {
    return this.user();
  }

  externalLogin(body: ExternalAuth): Observable<User> {
    return this.http
      .post(`${environment.baseUrl}${this.serviceName}/externalLogin/`, body)
      .pipe(
        map((user: User) => {
          this.user.set(user);
          return user;
        })
      );
  }

  public signOutExternal = () => {
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
  };

  logout() {
    this.http
      .post<null>(`${environment.baseUrl}${this.serviceName}/logout`, {})
      .pipe(
        map((data) => {
          this.user.set(null);
          this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }

  validateSession() {
    return this.http.post<User | null>(
      `${environment.baseUrl}${this.serviceName}/validateSession`,
      {}
    );
  }
}
