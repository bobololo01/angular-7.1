import {ProfileViewModel} from "../../models/profile.view-model";
import {Observable} from "rxjs";

export interface IAccountService {

  //#region Methods

  /*
  * Get profile information.
  * */
  getProfile(): Observable<ProfileViewModel>;

  //#endregion

}
