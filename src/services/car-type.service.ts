import { Injectable } from '@angular/core';
import { CarTypeComponent } from '../modules/administrator/car-type/car-type-list/car-type-list.component';
import { CarTypeModel } from '../models/car-type.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../constants/app-settings.constant';
import { GridModel } from '../models/gird-model';

@Injectable()
export class CarTypeService {

    constructor(private http: HttpClient,private appsetting:AppSettings) { }
    url: string = environment.baseUrl + "/loaixe"

    search(search,pageIndex,sortField,sortOrder):Observable<GridModel<CarTypeModel>> {
        const url = `${this.url}?search=${search}&pageIndex=${pageIndex}&pageSize=${this.appsetting.pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
        return this.http.get<GridModel<CarTypeModel>>(url)
    }
    searchActive(isActived,pageIndex,sortField,sortOrder):Observable<GridModel<CarTypeModel>> {
        const url = `${this.url}?isActived=${isActived}&pageIndex=${pageIndex}&pageSize=${this.appsetting.pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
        return this.http.get<GridModel<CarTypeModel>>(url)
    }
    getData(): Observable<CarTypeModel[]> {
        return this.http.get<CarTypeModel[]>(this.url)
    }

    insert(model: CarTypeModel): Observable<boolean> {
        return this.http.post<boolean>(this.url, model ,environment.httpOptions)
        .pipe(catchError(this.handleError<boolean>('addHero')))
    }
    update(model: CarTypeModel): Observable<boolean> {
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

