import { CarModel } from "../../models/car.model";
import { Observable } from "rxjs";
import { AngularFireList } from "angularfire2/database";
import { UserModel } from "../../models/user.model";

export interface ILocationService {

    //#region Methods

    /*
    * Get profile information.
    * */
   
    getAllLocation():AngularFireList<any>;
    searchLocationByBienSo(bienSo);
    getBymaDonHang(maDonHang):Observable<any>;
    getByUserId(userFireBaseId: string):Observable<UserModel>;
   

    //#endregion

}
