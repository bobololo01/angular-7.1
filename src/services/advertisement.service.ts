import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OVERLAY_PROVIDERS } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../constants/app-settings.constant';
import { GridModel } from '../models/gird-model';
import { AdvertisementModel } from '../models/advertisement.model';
@Injectable()
export class Advertisement {
    // orderList: AngularFireList<any>;
    // selectedOrder: OrderViewModel = new OrderViewModel()
    // constructor(private afData: AngularFireDatabase) { }
    constructor(private http: HttpClient,private appsetting:AppSettings) { }
    url: string = environment.baseUrl + "/quangcao"
    search(search,pageIndex,sortField,sortOrder):Observable<GridModel<AdvertisementModel>> {
        const url = `${this.url}?search=${search}&pageIndex=${pageIndex}&pageSize=${this.appsetting.pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
        return this.http.get<GridModel<AdvertisementModel>>(url)
    }
    getData(): Observable<AdvertisementModel[]> {
        return this.http.get<AdvertisementModel[]>(this.url)
    }
    getById(id):Observable<AdvertisementModel>{
        var url = this.url+"/"+id;
        return this.http.get<AdvertisementModel>(url);
    }
    insert(model: AdvertisementModel) {
         return this.http.post<boolean>(this.url, model ,environment.httpOptions)
        .pipe(catchError(this.handleError<boolean>('addHero')))
        // this.orderList.push(
        //     {
        //         tenHang: order.tenHang,
        //         diemNhanHang: order.diemNhanHang,
        //         diemTraHang: order.diemTraHang,
        //         khoiLuong: order.khoiLuong,
        //         dai: order.dai,
        //         loaiHang: order.loaiHang,
        //         rong: order.rong,
        //         cao: order.cao,
        //         donViTinhKhoiLuong: order.donViTinhKhoiLuong,
        //         donViTinhKichThuoc: order.donViTinhKichThuoc,
        //         userId: ""
        //     }
        // )
    }
    update(model: AdvertisementModel):Observable<boolean>{
        var url = this.url+"/"+model.id;
        return this.http.put<boolean>(url, model ,environment.httpOptions);
      
    }
    updateOrder(order: AdvertisementModel) {
        // this.orderList.update(order.$key, {
        //     tenHang: order.tenHang,
        //     diemNhanHang: order.diemNhanHang,
        //     diemTraHang: order.diemTraHang,
        //     khoiLuong: order.khoiLuong,
        //     dai: order.dai,
        //     rong: order.rong,
        //     cao: order.cao,
        //     donViTinhKhoiLuong: order.donViTinhKhoiLuong,
        //     donViTinhKichThuoc: order.donViTinhKichThuoc,
        //     userId: order.userId,
        //     loaiHang: order.loaiHang,
        // })
    }
    // update(model: OrderViewModel): Observable<boolean> {
    //     // const url = `${this.url}/${model.id}`;
    //     // return this.http.put<boolean>(url, model,environment.httpOptions)
    // }
    deleteOrder(id: string) {
        // this.orderList.remove($key)
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