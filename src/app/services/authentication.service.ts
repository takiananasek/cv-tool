import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExternalAuth } from '../models/externalAuth';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';
declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  serviceName = 'ExternalAuth';
  public user: WritableSignal<User | null> = signal(null);

  constructor(private http: HttpClient, private router: Router) {}

  public get userValue(){
    return this.user();
  }

  externalLogin(route: string, body: ExternalAuth) :Observable<any> {
    return this.http.post(
      `${environment.baseUrl}${this.serviceName}/externalLogin/`,
      body
    ).pipe(
      map((user: User) => {
        this.user.set(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );;
  }

  public signOutExternal = () => {
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
  };

  logout() {
    this.http
      .post<any>(
        `${environment.baseUrl}${this.serviceName}/revokeToken`,
        {token: localStorage.getItem("refreshToken"), userId: this.userValue?.id}
      )
      .subscribe();
    this.stopRefreshTokenTimer();
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  validateSession(){
    return this.http
      .post<User>(
        `${environment.baseUrl}${this.serviceName}/validateSession`,{}
      ).pipe(map(data => data));
  }

  refreshToken() {
    return this.http
      .post(
        `${environment.baseUrl}${this.serviceName}/refreshToken`,
        {}
      )
      .pipe(
        map((user: User) => {
          this.user.set(user);
          localStorage.setItem('token', user.jwtToken ?? "");
          localStorage.setItem('refreshToken', user.refreshToken ?? "");
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  private refreshTokenTimeout?: any;

  startRefreshTokenTimer() {
    const jwtBase64 = this.userValue!.jwtToken!.split('.')[1];
    const jwtToken = JSON.parse(atob(jwtBase64));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
