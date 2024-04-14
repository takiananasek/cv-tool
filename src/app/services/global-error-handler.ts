
// demo.interceptor.ts

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable(
)
export class ErrorInterceptor implements HttpInterceptor {

  constructor (private toastService: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {      
           this.toastService.error('Unauthorized', "You are not authorized to perform this action or session has expired.");
            console.error('Unauthorized request:', err);
          } else {
          this.toastService.error('Something went wrong:', err.error.message);
         console.error('Unauthorized request:', err);
          }
        } else {
          this.toastService.error('Something went wrong:', err.error.message);
        }
        return throwError(() => err); 
      })
    );
  }
}
 