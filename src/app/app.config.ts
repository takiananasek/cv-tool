import { APP_INITIALIZER, ApplicationConfig, Provider, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorInterceptor } from './services/global-error-handler';
import { ToastrModule } from 'ngx-toastr';
import { appInitializer } from './helpers/appInitializer';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptor } from './helpers/jwtInterceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClipboardModule } from 'ngx-clipboard';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([ToastrModule.forRoot(), ClipboardModule, NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })]),
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
};
