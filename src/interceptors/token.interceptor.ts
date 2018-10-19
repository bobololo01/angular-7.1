import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';



import { IAuthenticationService } from '../interfaces/services/authentication-service.interface';
import { IBlockUIService } from '../interfaces/services/blockui-service.interface';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(@Inject("IAuthenticationService")public auth: IAuthenticationService, @Inject("IBlockUIService")private blockUi:IBlockUIService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.blockUi.show()
    if (this.auth.isAuthorizationValid(this.auth.getAuthorization())) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getAuthorization().code}`
        }
      });
    }
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }, (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {

            // redirect to the login route
            // or show a modal
            this.auth.clearIdentity();
            this.auth.redirectToLogin();
          }
        }
      }), // Log 
      
      finalize(()=>{
      this.blockUi.stop();
    }));
  }
}