import { AdvertisementModel } from "../../models/advertisement.model";
import { Observable } from "rxjs";
import { AngularFireList } from "angularfire2/database";
import { GridModel } from "../../models/gird-model";
export interface AdvertisementService {

    //#region Methods

    /*
    * Get profile information.
    * */
   selectedAds: AdvertisementModel;
    // getData(orderBy: string, startAt: number):AngularFireList<any>;
    getData();
    getById(id):Observable<AdvertisementModel>;
    insert(model: AdvertisementModel):Observable<boolean>;
    update(model: AdvertisementModel):Observable<boolean>;
    deleteOrder(id: string);
    search(search,pageIndex,sortField,sortOrder):Observable<GridModel<AdvertisementModel>>
    //#endregion

}