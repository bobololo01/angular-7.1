import { AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { GridModel } from "../../../models/gird-model";
import { HandleUnitModel } from "../../../models/handle-unit.model";

export interface IHandleUnitService{
  getData();
  getById(id):Observable<HandleUnitModel>;
  insert(model: HandleUnitModel):Observable<boolean>;
  update(model:HandleUnitModel):Observable<boolean>;
  delete(id:string):Observable<boolean>;
  search(search,pageIndex,sortField,sortOrder):Observable<GridModel<HandleUnitModel>>
}