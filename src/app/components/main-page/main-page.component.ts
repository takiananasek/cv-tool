declare var google: any;
import { Component, NgZone, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ExternalAuth } from '../../models/externalAuth';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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


//     gsap.registerPlugin(ScrollTrigger);

// //Loop over all the sections and set animations
// gsap.utils.toArray("section").forEach((section: any, i:any) => {
  
//   // Set the bg variable for the section
//   section.bg = section.querySelector(".bg");

//   // Give the backgrounds some random images
//   section.bg.style.backgroundImage = `url(https://picsum.photos/${innerWidth}/${innerHeight}?random=${i})`;

//   // Set the initial position for the background
//   section.bg.style.backgroundPosition = `50% ${-innerHeight / 2}px`;

//   // Do the parallax effect on each section
//   gsap.to(section.bg, {
//     backgroundPosition: `50% ${innerHeight / 2}px`,
//     ease: "none", // Don't apply any easing function.
//     scrollTrigger: {
//       // Trigger the animation as soon as the section comes into view
//       trigger: section, 
//       // Animate on scroll/scrub
//       scrub: true
//     }
//   });
// });
  }

  openDocsInNewTab(){
    window.open(environment.docsLink, '_blank');
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
          console.log("Authentication failed");
        }
      });;
  }
}
