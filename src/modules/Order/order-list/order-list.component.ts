import { Component, OnInit, Inject } from '@angular/core';
import { OrderViewModel } from "../../../models/oder.view-model";
import { IOrderService } from "../../../interfaces/services/order-service.interface";
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subject } from 'rxjs';
import { OrderFormComponent } from '../order-create-section/order-form.component';
import { IBlockUIService } from '../../../interfaces/services/blockui-service.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUnitService } from '../../../interfaces/services/administrator/unit.interface';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { LaiXeService } from '../../../services/driver.service';
import { UserModel } from '../../../models/user.model';
import { IStatusService } from '../../../interfaces/services/changeStatus-service.interface';


@Component({
    selector: 'order-list',
    templateUrl: 'order-list.component.html'
})
export class OrderListComponent implements OnInit {
    constructor(@Inject('IOrderService') private _iOderService: IOrderService, @Inject("IUnitService") private _unitService: IUnitService, @Inject("ILaiXeService") private _laiXeService: LaiXeService, @Inject('IStatusService') private _IStatusService: IStatusService, private toastService: ToastrService) { }
    orderList: OrderViewModel[];
    detailProduct: OrderViewModel;
    allOrder: OrderViewModel[];
    selectedOrder: OrderViewModel;
    laixeList: UserModel[];
    totalRecord: number = 0;
    currentPage: number = 1;
    tenHang: string = "";
    diemNhanHang: string = "";
    startWith = new Subject()
    endWith = new Subject();
    id: string;
    donViTinhKhoiLuong: string;
    donViTinhTheTich: string;
    angularxQrCode: string = null;
    pageSize: number = 15;
    orderby: number = 0;
    classgiaohang: string = "hidden";
    ngOnInit() {

        this.loadListData();
        this.detailProduct = new OrderViewModel();
        this._laiXeService.getData().subscribe(laixe => {
            this.laixeList = laixe.data;

        })

    }
    loadListData() {

        this._iOderService.search(this.tenHang, this.currentPage, "TenHang", 0, this.pageSize)
            .subscribe(loaixe => {
                this.orderList = loaixe.data;
                this.totalRecord = loaixe.total;

                for (let i = 0; i < loaixe.data.length; i++) {
                    if (this.orderList[i].status == 0) {
                        this.orderList[i].statusName = "Created";
                    } else if (this.orderList[i].status == 1) {
                        this.orderList[i].statusName = "Active";
                    } else if (this.orderList[i].status == 2) {
                        this.orderList[i].statusName = " Aproved";
                    } else if (this.orderList[i].status == 3) {
                        this.orderList[i].statusName = " Assigned";
                    } else {
                        this.orderList[i].statusName = "Delivered";
                    }
                }
            });
    }
    loadlocation() {
        this._iOderService.search(this.diemNhanHang, this.currentPage, "diemNhanHang", 0, this.pageSize).subscribe(diemNhan => {
            console.log(diemNhan)
            this.orderList = diemNhan.data;
            this.totalRecord = diemNhan.total;

            for (let i = 0; i < diemNhan.data.length; i++) {
                if (this.orderList[i].status == 0) {
                    this.orderList[i].statusName = "Created";
                } else if (this.orderList[i].status == 1) {
                    this.orderList[i].statusName = "Active";
                } else if (this.orderList[i].status == 2) {
                    this.orderList[i].statusName = " Aproved";
                } else if (this.orderList[i].status == 3) {
                    this.orderList[i].statusName = " Assigned";
                } else {
                    this.orderList[i].statusName = "Delivered";
                }
            }
        });
    }
    searchbutton(tenHang, diemNhanHang) {
        if(tenHang == "" && diemNhanHang == ""){
            this.toastService.error('Hãy điền thông tin muốn tìm kiếm');
            this.loadListData();
          } else{
            if (tenHang != "") {
              console.log(tenHang);
              this.loadListData();
            } else { 
              this.loadlocation();
            } 
          }
        
    }
    sortDate() {
        this._iOderService.sortDate(this.currentPage, this.pageSize, "CreateDate", this.orderby).subscribe(date => {
            this.orderList = date.data;
            this.totalRecord = date.total;
            for (let i = 0; i < date.data.length; i++) {
                if (this.orderList[i].status == 0) {
                    this.orderList[i].statusName = "Created";
                } else if (this.orderList[i].status == 1) {
                    this.orderList[i].statusName = "Active"
                } else if (this.orderList[i].status == 2) {
                    this.orderList[i].statusName = " Aproved";
                } else if (this.orderList[i].status == 3) {
                    this.orderList[i].statusName = " Assigned";
                } else {
                    this.orderList[i].statusName = "Delivered";
                }
            }
        });
    }
    Sort(x: number) {
        this.orderby = x;
        this.sortDate();
    }

    pageChanged(event: PageChangedEvent): void {

        // const startItem = (event.page - 1) * event.itemsPerPage;
        // const endItem = event.page * event.itemsPerPage;
        // this.orderList = this.allOrder.slice(startItem, endItem);
        this.currentPage = event.page;
        console.log("page" + event.page);
        this.loadListData();

    }

    Changed(pageNumber: number) {

        this.pageSize = pageNumber;
        this.loadListData();
    }

    onEdit(order: OrderViewModel) {

        this._iOderService.selectedOrder = order;
    }

    onDelete(id: string) {
        if (confirm("bạn cho chắc là muốn xóa bản ghi ??")) {
            this._iOderService.deleteOrder(id).subscribe(i => {
                if (i == true) {
                    this.toastService.show("Xóa Đơn Hàng Thành Công", "Đơn Hàng")
                }
                this.loadListData();
            });
        }

    }

    onSearch() {
        debugger;
        if (this.tenHang != "") {
            this.startWith.next(this.tenHang)
            this.endWith.next(this.tenHang + '\uf8ff')
        }

    }
    onCreate() {

    }
    updateLaxe(userid: string,iddonhang: string, madon: string) {
        console.log(userid,madon);
        debugger;
        var model = {
            "userId": userid,
            "maDonHang": madon,
        }
        this._iOderService.insertlaixe(model).subscribe(i => {
            console.log(i);
            this.loadListData();
            debugger;
        });
        this._IStatusService.updateChangeStatus(iddonhang, 2).subscribe(i => {
            this.loadListData();
            debugger;
        });
    }
    getDetailProduct(id: string) {
        this._iOderService.getById(id).subscribe(data => {
            console.log(data)
            this.detailProduct = data;
            this.angularxQrCode = data.maDonHang;
            this._unitService.getDvKhoiLuong(data.donViTinhKhoiLuongId).subscribe(dvkl => {
                console.log(dvkl.ten)
                this.donViTinhKhoiLuong = dvkl.ten;
            });
            this._unitService.getDvTheTich(data.donViTinhTheTichId).subscribe(dvtt => {
                console.log(dvtt.ten)
                this.donViTinhTheTich = dvtt.ten;
            })
            if (data.status == 2) {
                this.classgiaohang = "show";
            }

        })

    }
    print(): void {


        let popupWinindow
        let innerContents = document.getElementById('print-image').innerHTML;
        popupWinindow = window.open('', '_blank', 'left=0, right=0,width=100%,height=auto,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }

    componentData = null;

}



