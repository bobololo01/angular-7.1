/**
 * Created by Linh Nguyen on 6/7/2017.
 */
import {Injectable} from "@angular/core";
import {AuthorizationToken} from "../models/authorization-token";
import {Router} from "@angular/router";
import {IAuthenticationService} from "../interfaces/services/authentication-service.interface";
import {AppSettings} from "../constants/app-settings.constant";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthenticationService implements IAuthenticationService {

  //#region Constructor

  /*
  * Initiate component with injectors.
  * */
  public constructor(private router: Router, private appSettings: AppSettings,private http:HttpClient){

  }

  //#endregion

  //#region Methods

  /*
   * Store identity into local storage.
   * */
  public setAuthorization(identity: AuthorizationToken): void {
    localStorage.setItem(this.appSettings.identityStorage, JSON.stringify(identity));
  }

  /*
   * Remove identity from cache.
   * */
  public clearIdentity(): void {
    localStorage.removeItem(this.appSettings.identityStorage);
  }

  /*
  * Get authorization token from local storage.
  * */
  public getAuthorization(): AuthorizationToken{

    // Get authorization token from local storage.
    let authorizationToken = localStorage.getItem(this.appSettings.identityStorage);

    // Authorization is invalid.
    if (authorizationToken == null || authorizationToken.length < 1)
      return null;

    return <AuthorizationToken> JSON.parse(authorizationToken);
  };

  /*
  * Check whether authorization token is valid or not.
  * */
  public isAuthorizationValid(authorizationToken: AuthorizationToken): boolean{

    // Token is not valid.
    if (authorizationToken == null)
      return false;

    // Authorization token code is not valid.
    if (authorizationToken.code == null || authorizationToken.code.length < 1)
      return false;

    // Authorization token has been expired.
    //!this.jwtHelper.isTokenExpired(authorizationToken.code);

    // if (authorizationToken.expires >= Date.now())
    //   return false;

    return true;
  };
  public loginWithEmailAndPass(userName,password):Observable<AuthorizationToken>{
      var url =  environment.baseUrl +"/Auth/login"
      var model = {
        "userName": userName,
        "password":password
      }
    return this.http.post<AuthorizationToken>(url, model,environment.httpOptions);   
  }
  /*
  * Redirect to login page.
  * */
  public redirectToLogin(): void{
    this.router.navigate(['/login']);
  }
  //#endregion
}
