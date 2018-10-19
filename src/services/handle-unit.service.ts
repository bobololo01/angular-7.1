import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../constants/app-settings.constant';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { GridModel } from '../models/gird-model';
import { catchError } from 'rxjs/operators';
import { HandleUnitModel } from '../models/handle-unit.model';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class HandelUnitService {
    
    constructor(private http: HttpClient,private appsetting:AppSettings) { }
    url: string = environment.baseUrl + "/DonViQuanLy";
    getData():Observable<GridModel<HandleUnitModel>>{
        return this.http.get<GridModel<HandleUnitModel>>(this.url);
      }
      getById(id):Observable<HandleUnitModel>{
        var url = this.url+"/"+id;
        return this.http.get<HandleUnitModel>(url);
    }
      search(search,pageIndex,sortField,sortOrder):Observable<GridModel<HandleUnitModel>> {
          const url = `${this.url}?search=${search}&pageIndex=${pageIndex}&pageSize=${this.appsetting.pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
          return this.http.get<GridModel<HandleUnitModel>>(url)
      }
      insert(model: HandleUnitModel): Observable<boolean> {
           return this.http.post<boolean>(this.url, model ,environment.httpOptions)
          .pipe(catchError(this.handleError<boolean>('addHero')))
      }
      update(model: HandleUnitModel): Observable<boolean> {
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