declare var google: any;
import { Component, NgZone, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ExternalAuth } from '../../models/externalAuth';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  constructor(private authService: AuthenticationService, private router: Router, private ngZone:NgZone) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:'171182157733-j4rpv074jseq1cfor0ucfljc2roptian.apps.googleusercontent.com',
      callback: (resp:any) => this.handleLogin(resp)
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme:'filled_blue',
      size:'large',
      shape:'rectangle',
      width:350,

    })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any){
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
    console.log(externalAuth);
    this.authService
      .externalLogin('api/accounts/externallogin', externalAuth)
      .subscribe({
        next: (res:any) => {
          localStorage.setItem('token', res.jwtToken);
          localStorage.setItem('refreshToken', res.refreshToken);
         this.ngZone.run(() =>{
          this.router.navigate(['/workspace']);
         })
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });;
  }
}
