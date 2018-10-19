import { Component, OnInit, Inject } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { PageChangedEvent } from 'ngx-bootstrap';
import { LaiXeService } from '../../../services/driver.service';
@Component({
    selector: 'driver-list',
    templateUrl: 'driver-list.component.html'
})
export class DriverListComponent implements OnInit {
    userList: UserModel[];
    currentPage: number=1;
    pageSize: number = 10;
    totalRecord: number=0;
    hoTen: string='';
    keyword: string = '';
    
    constructor(@Inject("ILaiXeService") private _laiXeService: LaiXeService,   private toasrt: ToastrService) {}

    ngOnInit() { 
       this.loadListData();
    //    this.searchDriver(this.keyword);
    }
    loadListData() {
        
        this._laiXeService.search(this.hoTen, this.currentPage, "hoTen", 0)
        .subscribe(i => { 
            debugger;
            this.userList = i.data;
            this.totalRecord = i.total;
        });
    }
    searchDriver(keyword){
        this._laiXeService.searchDriver(keyword, this.currentPage, "hoTen", 0, this.pageSize).subscribe(d =>{
            console.log(keyword)
            this.userList = d.data;
            console.log(this.userList)
            debugger;
            this.totalRecord = d.total;
        })
    }
    onCreate(){
        
    }
    onDelete(id: string) {
        if (confirm("bạn cho chắc là muốn xóa bản ghi ??")) {
            
            this._laiXeService.delete(id).subscribe(i=>{
               if(i==true){
                   this.toasrt.show("Xóa Đơn Hàng Thành Công","Đơn Hàng")
                   this. loadListData();
               }
             
            });
        }

    }
    pageChanged(event: PageChangedEvent): void {
        // const startItem = (event.page - 1) * event.itemsPerPage;
        // const endItem = event.page * event.itemsPerPage;
        // this.carList = this.allCar.slice(startItem, endItem);
        this.currentPage = event.page;
        this.loadListData();
    }

}
