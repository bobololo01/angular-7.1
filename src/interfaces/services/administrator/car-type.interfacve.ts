import { Observable } from "rxjs";
import { UnitModel } from "../../../models/unit.model";
import { AngularFireList } from "angularfire2/database";
import { CarTypeModel } from "../../../models/car-type.model";
import { GridModel } from "../../../models/gird-model";

export interface ICarTypeService {

  //#region Methods

  /*
  * Get profile information.
  * */
  search(search, pageIndex, sortField, sortOrder): Observable<GridModel<CarTypeModel>>;
  searchActive(isActived, pageIndex, sortField, sortOrder): Observable<GridModel<CarTypeModel>>;
  insert(model: CarTypeModel): Observable<boolean>;
  update(model: CarTypeModel): Observable<boolean>;
  delete(id: string): Observable<boolean>;
  getData();
  //#endregion

}