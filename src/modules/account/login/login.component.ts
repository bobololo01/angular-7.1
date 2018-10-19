import { Component, Inject, ViewChild } from "@angular/core";
import { LoginViewModel } from "../../../models/login.view-model";
import { IAuthenticationService } from "../../../interfaces/services/authentication-service.interface";
import { AuthorizationToken } from "../../../models/authorization-token";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'account-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {

  //#region Properties

  /*
  * Model for 2-way data binding.
  * */
  private model: LoginViewModel;

  /*
  * Whether component is busy or not.
  * */
  private bIsBusy: boolean;
  erroMessage:string;
  //#endregion

  //#region Constructor

  public constructor(@Inject('IAuthenticationService') public authenticationService: IAuthenticationService, public afAuth: AngularFireAuth,
    public router: Router) {
    if (this.afAuth.authState != null) {
      this.router.navigate(['/dashboard']);
    }
    this.model = new LoginViewModel();

  }

  //#endregion

  //#region Methods

  /*
  * Callback which is fired when login button is clicked.
  * */
  public clickLogin($event): void {
    this.erroMessage  = "";
    $event.preventDefault();
    let loginctr = this;
    this.authenticationService.loginWithEmailAndPass(this.model.userName, this.model.password).subscribe(result => {
      // Prevent default behaviour.
      console.log(result)
      loginctr.authenticationService.setAuthorization(result);
      // Redirect to dashboard.
      loginctr.router.navigate(['/dashboard']);
    },error=>{
        if(error.status==400){
          this.erroMessage = error.error.login_failure[0]
          
        }

    });
  }

  //#endregion
}
