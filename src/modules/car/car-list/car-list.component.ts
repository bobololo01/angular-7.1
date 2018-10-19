import { Component, OnInit, Inject } from '@angular/core';
import { ICarService } from '../../../interfaces/services/car-service.interface';
import { CarModel } from '../../../models/car.model';
import { ICarTypeService } from '../../../interfaces/services/administrator/car-type.interfacve';
import { PageChangedEvent } from 'ngx-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBlockUIService } from '../../../interfaces/services/blockui-service.interface';
import { IUnitService } from '../../../interfaces/services/administrator/unit.interface';

@Component({
    selector: 'car-list',
    templateUrl: 'car-list.component.html'
})
export class CarListComponent implements OnInit {
    carList: CarModel[];

    allCar: CarModel[];
    selectedCar: CarModel;
    totalRecord: number =0;
    currentPage: number= 1;
    tenChuXe: string ="";
    bienSo: string = "";
    actived = '';
    carDetailModel: CarModel;
    DtChuXe: string;
    ten:string;
    constructor(@Inject("ICarService") private _iCarService: ICarService,@Inject("IUnitService") private _unitService: IUnitService,@Inject('ICarTypeService') private _iCarTypeService: ICarTypeService, private toasrt :ToastrService) { }
    
    ngOnInit() {
        
        this.loadListData();
        // this.loadBienSoData();
        this.carDetailModel = new CarModel();

    }
    loadListData(){
        this._iCarService.search(this.tenChuXe, this.currentPage, "bienSo",0)
        .subscribe(pt=>{
           
            this.carList = pt.data;
            this.totalRecord = pt.total;
        })
    }
    ButtonSelected(bienSo, tenChuXe) {
        if(bienSo == "" && tenChuXe == ""){
          this.toasrt.error('Hãy điền thông tin muốn tìm kiếm');
          this.loadListData();
        } else{
          if (tenChuXe != "") {
            console.log(tenChuXe);
            this.loadListData();
          } else { 
            this.loadBienSoData();
          } 
        }
      }
    loadBienSoData(){
        this._iCarService.search(this.bienSo, this.currentPage, "bienSo",0).subscribe(pb=>{
            this.carList = pb.data;
            console.log(pb.data);
            this.totalRecord = pb.total;
        })
    }
    searh() {

    }
    pageChanged(event: PageChangedEvent): void {
        // const startItem = (event.page - 1) * event.itemsPerPage;
        // const endItem = event.page * event.itemsPerPage;
        // this.carList = this.allCar.slice(startItem, endItem);
        this.currentPage = event.page;
        
        this.loadListData();
    }
    onCreate() {
        this.selectedCar = new CarModel();
    }
    onEdit(model: CarModel) {
        this.selectedCar = model;
    }
    onDelete(id: string) {
        if (confirm("bạn cho chắc là muốn xóa bản ghi ??")) {
           
            this._iCarService.deleteCar(id).subscribe(i=>{
                if(i==true){
                    this.toasrt.show('Xóa phương tiện thành công', 'Phương tiện');
                    this.loadListData();
                }
            });
        }
    }
    carDetail(id:string){
         for(var i=0; i<this.carList.length; i++){
             if(this.carList[i].id == id){
                 this.carDetailModel = this.carList[i];
             }    
         }
         this._iCarService.getById(id).subscribe(data=>{
             console.log(id)
             console.log(data)
              this.carDetailModel.cao = data.cao;
              this.carDetailModel.rong = data.rong;
              this.carDetailModel.dai = data.dai;
              this._unitService.getDvKhoiLuong(data.donViTinhKhoiLuong).subscribe(dvkl=>{
                // this.carDetailModel.donViTinhKhoiLuong = dvkl.ten
                console.log(data.donViTinhKhoiLuong);
                console.log(dvkl);
              });
              this._unitService.getDvTheTich(data.donViTinhTheTich).subscribe(dvtt=>{
                // this.carDetailModel.donViTinhTheTich = dvtt.ten;
             })
              })
    }

}