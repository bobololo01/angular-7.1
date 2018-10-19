import { OrderViewModel } from "../../models/oder.view-model";
import { Observable } from "rxjs";
import { AngularFireList } from "angularfire2/database";
import { GridModel } from "../../models/gird-model";

export interface IOrderService {

    //#region Methods

    /*
    * Get profile information.
    * */
   selectedOrder: OrderViewModel;
    // getData(orderBy: string, startAt: number):AngularFireList<any>;
    getData():Observable<OrderViewModel>;
  
    getById(id):Observable<OrderViewModel>;
    getByLaixe(id):Observable<GridModel<OrderViewModel>>;
    changeStatus(status):Observable<OrderViewModel>;
    insert(model: OrderViewModel):Observable<boolean>;
    insertlaixe(model);
    update(model: OrderViewModel):Observable<boolean>;
    deleteOrder(id: string);
    search(search,pageIndex,sortField,sortOrder,pageSizeNumber):Observable<GridModel<OrderViewModel>>
    sortDate(pageIndex,pageSizeNumber,sortField,sortOrder):Observable<GridModel<OrderViewModel>>
    //#endregion

}
