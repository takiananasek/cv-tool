import { Component } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  logout(): void{
    this.authService.logout();
  }

  navigateHome(){
    if(this.authService.userValue){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/home']);
    }
  }

  navigateWorkspace(){
    const navigationExtras: NavigationExtras = {
      skipLocationChange: true
    };
    this.router.navigate(['/Refresh'], navigationExtras).then(() => {
      this.router.navigate(['/workspace']);
    });
}


  openDocsInNewTab(){
    window.open(environment.docsLink, '_blank');
  }
}
