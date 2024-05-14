import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, firstValueFrom, from, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        const user = this.authenticationService.userValue;
        if (user) {
            return of(true);
        } else {
            return from(this.authenticationService.validateSession()).pipe(
                map(result => {
                  if (result) {
                    this.authenticationService.user.set(result);
                    this.authenticationService.startRefreshTokenTimer();
                    return true;
                  } else {
                    this.router.navigate(['/login']);
                    return false;
                  }
                })
              );
        }
    }
}