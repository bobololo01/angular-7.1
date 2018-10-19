import { Component, OnInit, Inject } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { PageChangedEvent } from 'ngx-bootstrap';
import { LaiXeService } from '../../../services/driver.service';
import { IOrderService } from '../../../interfaces/services/order-service.interface';
import { OrderViewModel } from '../../../models/oder.view-model';
import { ActivatedRoute } from '@angular/router';
import { IUnitService } from '../../../interfaces/services/administrator/unit.interface';
@Component({
    selector: 'driver-view',
    templateUrl: 'driver-view.component.html'
})
export class DriverViewComponent implements OnInit {
    userList: UserModel;
    detailProduct: OrderViewModel;
    orderList: OrderViewModel[];
    currentPage: number=1;
    totalRecord: number=0; 
    pageSize: number = 15;
    donViTinhKhoiLuong: string;
    donViTinhTheTich:string;
    angularxQrCode: string = null;
    constructor(@Inject("ILaiXeService") private _iuserService: LaiXeService, @Inject('IOrderService') private _iOderService: IOrderService,@Inject("IUnitService") private _unitService: IUnitService, private route: ActivatedRoute,  private toasrt: ToastrService) {}

    ngOnInit() { 
        this.userList = new UserModel();
        this.detailProduct = new OrderViewModel();
        this.route.params.subscribe(params => {
           
            let id = params['id'];
            if (id != undefined) {
                this._iuserService.getById(id).subscribe(i => {

                    this.userList = i;
                    console.log(this.userList)

                    
                });
                this._iOderService.getByLaixe(id).subscribe(hanghoa=>{
                      this.orderList = hanghoa.data;
                      console.log(this.orderList);
                      debugger;
                });
            }

        });
    }
  

    pageChanged(event: PageChangedEvent): void {
        // const startItem = (event.page - 1) * event.itemsPerPage;
        // const endItem = event.page * event.itemsPerPage;
        // this.carList = this.allCar.slice(startItem, endItem);
        this.currentPage = event.page;
        
    }
    getDetailProduct(id: string){
        this._iOderService.getById(id).subscribe(data=>{
            console.log(data)
           this.detailProduct = data;
           this.angularxQrCode = data.maDonHang;
           this._unitService.getDvKhoiLuong(data.donViTinhKhoiLuongId).subscribe(dvkl=>{
               console.log(dvkl.ten)
                  this.donViTinhKhoiLuong= dvkl.ten;
           });
           this._unitService.getDvTheTich(data.donViTinhTheTichId).subscribe(dvtt=>{
               this.donViTinhTheTich = dvtt.ten;
           })
            
        })
        
    }

}