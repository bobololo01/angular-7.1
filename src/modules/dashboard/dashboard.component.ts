import { Component, OnInit, inject, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { ILocationService, } from '../../interfaces/services/location.interface';
import { LocationModel, marker } from '../../models/location.model';
import { Marker } from '@agm/core/services/google-maps-types';
import { UserInfo } from '@firebase/auth-types';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserModel } from '../../models/user.model';
import * as $ from 'jquery';
import { Subject, Observable } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { query } from '@angular/core/src/render3/query';
import { OrderViewModel } from '../../models/oder.view-model';
import { ToastrService } from 'ngx-toastr';
import { error } from '@firebase/database/dist/src/core/util/util';
import { IBlockUIService } from '../../interfaces/services/blockui-service.interface';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  zoom: number = 12;
  // initial center position for the map
  lat: number = 21.026074;
  lng: number = 105.852027;
  bienSo: string = "";
  maDonHang: string = "";
  markers: marker[];
  idFirebase: string;
  icon = {
    url: "../assets/images/Truck10.png",
    scaledSize: {
      width: 100,
      height: 70
    }
  }
  selectedInfo: UserModel;
  detail: UserModel;
  modalRef: BsModalRef;
  public disabled: boolean = true;
  searchvalue: string = "";
  constructor(@Inject("ILocationService") private _iLocationService: ILocationService, @Inject("ISearchService") private SearchService: ILocationService, private modalService: BsModalService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.loadLocation();
    this.detail = new UserModel;


  }
  ButtonSelected(bienSo, maDonHang) {
    console.log(bienSo,maDonHang)
    debugger;
    if(bienSo == "" && maDonHang == ""){
      this.toastService.error('Hãy điền thông tin muốn tìm kiếm');
      this.loadLocation();
    } else{
      if (bienSo != "") {
        console.log(bienSo);
        this.loadcars(bienSo);
      } else { 
        this.loadmaHang(maDonHang);
      } 
    }
  }
  
  // is_disabled(bienSo, maDonHang){
  //   if(bienSo == "" && maDonHang == ""){
  //     return this.disabled;
  //   } else {
  //     return this.disabled = false;
  //   }
  // }
  
  loadcars(bienSo) {

    let scar = this.SearchService.searchLocationByBienSo(bienSo);
    scar.snapshotChanges().subscribe(bs => {
      console.log(bs.status)
      this.markers = [];
     
      bs.forEach(c => {
        
        let car = c.payload.toJSON() as LocationModel;
       
        this.markers.push({
          lat: car.latitude,
          lng: car.longitude,
          label: car.bienSo,
          draggable: false,
          keyfirebase: c.key

        })
        console.log(this.markers)
      })
    })
  }

  loadmaHang(maDonHang) {

    this._iLocationService.getBymaDonHang(maDonHang).subscribe(DH => {

      let scar = this.SearchService.searchLocationByBienSo(DH.bienso);

      scar.snapshotChanges().subscribe(bs => {
        this.markers = [];
       
        bs.forEach(c => {
         
          let car = c.payload.toJSON() as LocationModel;
          this.markers.push({
            lat: car.latitude,
            lng: car.longitude,
            label: car.bienSo,
            draggable: false,
            keyfirebase: c.key

          })
          console.log(this.markers)
        })
      })
    })
  }

  loadLocation() {
    let a = this._iLocationService.getAllLocation();
    a.snapshotChanges().subscribe(locations => {
      this.markers = [];
     
      locations.forEach(o => {
        let location = o.payload.toJSON() as LocationModel;
        this.markers.push({
          lat: location.latitude,
          lng: location.longitude,
          label: location.bienSo,
          draggable: false,
          keyfirebase: o.key
        })
      })

    })
   
  }

  // google maps zoom level

  clickedMarker(label: string, keyfire: string, index: number, template: TemplateRef<any>) {
    if(label != undefined){
      this.modalRef = this.modalService.show(template);
      this._iLocationService.getByUserId(keyfire).subscribe(value => {
      console.log(value);
      
      this.detail = value;
    });
    } else{
      this.toastService.warning('Thông tin đang được cập nhật');
    }

  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  //   console.log(this.markers);
  // }

}

// just an interface for type safety.

