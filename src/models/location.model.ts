import { Timestamp } from "@firebase/firestore-types";


export class LocationModel{
    public accuracy:number;
    public altitude:number;
    public heading :number;
    public latitude:number;
    public longitude :number;
    public timestamp:Timestamp
    public bienSo:string;
    public userId:string;
    
}
export interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    keyfirebase:string;
  }
  
