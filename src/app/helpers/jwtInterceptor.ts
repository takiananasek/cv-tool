import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {}
  private totalRequests = 0;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.spinner.show();
    const user = this.authenticationService.userValue;
    const isLoggedIn = user?.jwtToken;
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    const jwtToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
          RefreshToken: `${refreshToken}`,
        },
      });
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.spinner.hide();
        }
      })
    );
  }
}
