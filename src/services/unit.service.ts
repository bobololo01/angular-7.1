import { Injectable } from '@angular/core';
import { Constant } from '../constants/constant';
import { UnitModel } from '../models/unit.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observer } from '@firebase/util';
import { GridModel } from '../models/gird-model';
import { Observable,of } from 'rxjs';
import { environment } from '../environments/environment';
import { AppSettings } from '../constants/app-settings.constant';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable()
export class UnitService {
    
    constructor(private http: HttpClient,private appsetting:AppSettings) { }
    url: string = environment.baseUrl + "/DonViTinh";
 
    
    getData():Observable<GridModel<UnitModel>>{
      return this.http.get<GridModel<UnitModel>>(this.url);
    }

    getDvKhoiLuong(id):Observable<UnitModel>{
        var url = this.url+"/"+id;
        return this.http.get<UnitModel>(url);
    }
    getDvTheTich(id):Observable<UnitModel>{
        var url = this.url+"/"+id;
        return this.http.get<UnitModel>(url);
    }


    search(search,pageIndex,sortField,sortOrder):Observable<GridModel<UnitModel>> {
        const url = `${this.url}?search=${search}&pageIndex=${pageIndex}&pageSize=${this.appsetting.pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
        return this.http.get<GridModel<UnitModel>>(url)
    }
    searchActive(isActive,pageIndex,sortField,sortOrder):Observable<GridModel<UnitModel>>{
        const url = `${this.url}?isActived=${isActive}&pageIndex=${pageIndex}&pageSize=${this.appsetting.pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
        return this.http.get<GridModel<UnitModel>>(url)
    }
    insert(model: UnitModel): Observable<boolean> {
        return this.http.post<boolean>(this.url, model ,environment.httpOptions)
        .pipe(catchError(this.handleError<boolean>('addHero')))
    }
    update(model: UnitModel): Observable<boolean> {
        const url = `${this.url}/${model.id}`;
        return this.http.put<boolean>(url, model,environment.httpOptions)
    }
    delete(id: string): Observable<boolean> {
        const url = `${this.url}/${id}`;
        return this.http.delete<boolean>(url);
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
           console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}