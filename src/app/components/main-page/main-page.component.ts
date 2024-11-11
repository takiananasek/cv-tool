import { Component, NgZone, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ExternalAuth } from '../../models/externalAuth';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';
import { User } from '../../models/user';

export interface GoogleAuthResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit{
  errorMessage: WritableSignal<string | null> = signal(null);
  showError: WritableSignal<boolean> = signal(false);
  constructor(private authService: AuthenticationService, private toast: ToastService,  private router: Router, private ngZone:NgZone) {}

  ngOnInit(): void {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        google.accounts.id.initialize({
          client_id: environment.googleClientId,
          callback: (resp: google.accounts.id.CredentialResponse) => this.handleLogin(resp)
        });
        google.accounts.id.renderButton(<HTMLElement>document.getElementById("google-btn"),{
          theme: 'filled_blue',
          size: 'large',
          width: 350,
          type: 'standard'
        })
      };
  }

  openDocsInNewTab(){
    window.open(environment.docsLink, '_blank');
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: google.accounts.id.CredentialResponse){
    if(response){
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      const externalAuth: ExternalAuth = {
            provider: payload.iss,
            idToken: response.credential
          };
      this.validateExternalAuth(externalAuth);
    }
  }

  private validateExternalAuth(externalAuth: ExternalAuth) {
    this.authService
      .externalLogin(externalAuth)
      .subscribe({
        next: (res: User) => {
          if(res.jwtToken) localStorage.setItem('token', res.jwtToken);
          if(res.sessionId) localStorage.setItem('sessionId', res.sessionId);
         this.ngZone.run(() =>{
          this.router.navigate(['/workspace']);
         })
        },
        error: (err: HttpErrorResponse) => {
          this.toast.error("Error", "Authentication failed. Try again later.");
        }
      });;
  }
}
