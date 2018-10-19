import { Observable } from "rxjs";

export interface IStatusService {

    updateChangeStatus(id:string, status: number):Observable<any>;
    clearChangeStatus(id:string):Observable<any>;
}