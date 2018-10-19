import { TokenInterceptor } from "./token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NoopInterceptor } from "./noop-interceptor";


export const httpInterceptorProviders  = [
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
       
       
    ];
