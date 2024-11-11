import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable(
)
export class ErrorInterceptor implements HttpInterceptor {

  constructor (private toastService: ToastService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: unknown) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {      
           this.toastService.error('Unauthorized', "You are not authorized to perform this action or your session has expired.");
            console.error('Unauthorized request:', err);
          } else {
          this.toastService.error('Something went wrong:', err.error.message);
         console.error('Unauthorized request:', err);
          }
        } else {
          this.toastService.error('','Something went wrong');
        }
        return throwError(() => err); 
      })
    );
  }
}
 