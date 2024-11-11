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
    private spinner: NgxSpinnerService
  ) {}
  private totalRequests = 0;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.spinner.show();
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    const jwtToken = localStorage.getItem('token');
    const sessionId = localStorage.getItem('sessionId');
    if (isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
          SessionId: `${sessionId}`,
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
