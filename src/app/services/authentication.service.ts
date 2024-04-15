import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();

  constructor(
    private http: HttpClient,
    private externalAuthService: SocialAuthService
  ) {
    this.externalAuthService.authState.subscribe((user) => {
      console.log(user);
      this.extAuthChangeSub.next(user);
    });
  }

  public signInWithGoogle = () => {
    this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  };
  public signOutExternal = () => {
    this.externalAuthService.signOut();
  };
}
