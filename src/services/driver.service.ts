import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../constants/app-settings.constant';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { GridModel } from '../models/gird-model';
import { UserModel } from '../models/user.model';
import { catchError } from 'rxjs/operators';



@Injectable()
export class LaiXeService {

    constructor(private http: HttpClient, private appsetting: AppSettings) { }
    url: string = environment.baseUrl + "/LaiXe";
    urlDriver: string = environment.baseUrl + "/LaiXe/Search";
    urlAdd: string = environment.baseUrl + "/LaiXe/Register";

    getData(): Observable<GridModel<UserModel>> {
        return this.http.get<GridModel<UserModel>>(this.url);
    }

    getById(id): Observable<UserModel> {
        var url = this.url + "/" + id;
        return this.http.get<UserModel>(url);
    }

    search(search, pageIndex, sortField, sortOrder): Observable<GridModel<UserModel>> {
        const url = `${this.url}?search=${search}&pageIndex=${pageIndex}&pageSize=${this.appsetting.pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
        return this.http.get<GridModel<UserModel>>(url)
    }
    searchDriver(search, pageIndex, sortField, sortOrder, pageSize): Observable<GridModel<UserModel>> {
        const urlDriver = `${this.urlDriver}?search=${search}&pageIndex=${pageIndex}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
        return this.http.get<GridModel<UserModel>>(urlDriver)
    }

    insert(model: UserModel): Observable<boolean> {
        debugger;
        return this.http.post<boolean>(this.urlAdd, model, environment.httpOptions).pipe(catchError(this.handleError<boolean>('addHero')))

    }

    update(model: UserModel): Observable<boolean> {
        debugger;
        const url = `${this.url}/${model.id}`;
        return this.http.put<boolean>(url, model, environment.httpOptions)
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