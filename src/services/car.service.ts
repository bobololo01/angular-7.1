import { Injectable } from '@angular/core';
import { CarModel } from "../models/car.model";
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../constants/app-settings.constant';
import { GridModel } from '../models/gird-model';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class CarService {
 
    constructor(private http: HttpClient,private appsetting:AppSettings) {
       
        // this.afSrore.firestore.
    }
    url: string = environment.baseUrl + "/xe";
    urlActive: string = environment.baseUrl + "/xe/ActiveXe";
    search(search,pageIndex,sortField,sortOrder):Observable<GridModel<CarModel>> {
        const url = `${this.url}?search=${search}&pageIndex=${pageIndex}&pageSize=${this.appsetting.pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
        return this.http.get<GridModel<CarModel>>(url);
    }
    getData(): Observable<CarModel[]> {
        return this.http.get<CarModel[]>(this.url);
    }
    getById(id):Observable<CarModel>{
        var url = this.url+"/"+id;
        return this.http.get<CarModel>(url);
    }
    // insertCar(model: CarModel): Observable<boolean> {
    //     debugger;
    //     return this.http.post<boolean>(this.url, model ,environment.httpOptions)
    //     .pipe(catchError(this.handleError<boolean>('addHero')))
    // }
    updateCar(model: CarModel):Observable<boolean>{
        debugger;
        var url = this.url+"/"+ model.id;
        return this.http.put<boolean>(url, model ,environment.httpOptions)
      
    }
    updateActive(model: CarModel):Observable<boolean>{
        var url = this.urlActive+"/"+ model;
        return this.http.put<boolean>(url, model ,environment.httpOptions)
      
    }
    deleteCar(id: string) {
        const url = `${this.url}/${id}`;
        return this.http.delete<boolean>(url);
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            debugger;
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
           console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }


}