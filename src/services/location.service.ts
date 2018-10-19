import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { OrderViewModel } from '../models/oder.view-model';
import { UserModel } from '../models/user.model';
import { GridModel } from '../models/gird-model';

@Injectable()
export class LocationService {
    listLocation:AngularFireList<any>;
    constructor(private afData:AngularFireDatabase,private http: HttpClient) { }
    url: string = environment.baseUrl + "/hanghoa" + "/getbienso"
    userUrl:string = environment.baseUrl + "/LaiXe/GetUserByUserFireBaseId";
    getAllLocation():AngularFireList<any>{
            this.listLocation = this.afData.list("location");
            return this.listLocation;
    }

    searchLocationByBienSo(bienSo){
        //   console.log(bienSo)  
            return this.afData.list('location', 
        query =>  (bienSo== null)?query.orderByChild('bienSo').limitToFirst(10) : query.orderByChild('bienSo').startAt(bienSo).endAt(bienSo + "\uf8ff"))
        
    }

    getBymaDonHang(maDonHang: string):Observable<any>{
        var url = this.url+"/"+ maDonHang;
        return this.http.get<string>(url);

    }
    
    getByUserId(userFireBaseId: string):Observable<UserModel>{
        var userUrl = this.userUrl + "?userFireBaseId=" + userFireBaseId;
        return this.http.get<UserModel>(userUrl)
    }
}