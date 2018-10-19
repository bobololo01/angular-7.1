import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { OrderViewModel } from "../models/oder.view-model";

@Injectable()
export class changeStatusService{
    constructor(private http: HttpClient) { }
    urlchangStatus: string = environment.baseUrl + "/hanghoa/ChangeStatus"

    updateChangeStatus(id:string, status: number):Observable<boolean>{
        var url = this.urlchangStatus+"?id="+id+"&currentStatus="+status;
        return this.http.post<boolean>(url,environment.httpOptions)
    }
    clearChangeStatus(id:string):Observable<boolean>{
        var url = this.urlchangStatus+"?id="+id+"&currentStatus=0";
        return this.http.post<boolean>(url,environment.httpOptions)
    }
    
}