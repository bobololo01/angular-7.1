import { AngularFireList } from "angularfire2/database";
import { UserModel } from "../../models/user.model";
import { Observable } from "rxjs";
import { GridModel } from "../../models/gird-model";

export interface ILaiXeService {
  getData();
  getById(id):Observable<UserModel>;
  insert(model: UserModel):Observable<boolean>;
  update(model:UserModel):Observable<boolean>;
  delete(id:string):Observable<boolean>;
  search(search,pageIndex,sortField,sortOrder):Observable<GridModel<UserModel>>
  searchDriver(search,pageIndex,sortField,sortOrder):Observable<GridModel<UserModel>>
  
}