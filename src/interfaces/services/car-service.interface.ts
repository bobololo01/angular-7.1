import { CarModel } from "../../models/car.model";
import { Observable } from "rxjs";
import { AngularFireList } from "angularfire2/database";
import { GridModel } from "../../models/gird-model";
export interface ICarService {

    //#region Methods

    /*
    * Get profile information.
    * */
    selectedCar: CarModel;
    getData();
    getById(id):Observable<CarModel>;
    insertCar(model: CarModel);
    updateCar(model: CarModel);
    updateActive(model: CarModel);
    deleteCar(id: string);
    uploadImage(selectedFile:File);
    search(search,pageIndex,sortField,sortOrder):Observable<GridModel<CarModel>>
    //#endregion

}
