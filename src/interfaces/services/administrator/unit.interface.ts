
import { Observable } from "rxjs";
import { UnitModel } from "../../../models/unit.model";
import { AngularFireList } from "angularfire2/database";
import { GridModel } from "../../../models/gird-model";

export interface IUnitService {

  //#region Methods

  /*
  * Get profile information.
  * */
  
  getData();
  getDvKhoiLuong(id: string);
  getDvTheTich(id: string);
  insert(model: UnitModel):Observable<boolean>;
  update(model:UnitModel):Observable<boolean>;
  delete(id:string):Observable<boolean>;
  search(search,pageIndex,sortField,sortOrder):Observable<GridModel<UnitModel>>
  searchActive(isActive,pageIndex,sortField,sortOrder):Observable<GridModel<UnitModel>>
  //#endregion

}
