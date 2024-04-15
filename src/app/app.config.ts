import { ApplicationConfig, Provider, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorInterceptor } from './services/global-error-handler';
import { ToastrModule } from 'ngx-toastr';
import { GoogleLoginProvider, GoogleSigninButtonDirective, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([ToastrModule.forRoot(), SocialLoginModule]),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '171182157733-j4rpv074jseq1cfor0ucfljc2roptian.apps.googleusercontent.com'
            )
          }
        ],
        onError: (error) => {
          console.error(error);
        }
      } as SocialAuthServiceConfig
    },
    GoogleSigninButtonDirective,
    GoogleSigninButtonModule 
  ],
};
