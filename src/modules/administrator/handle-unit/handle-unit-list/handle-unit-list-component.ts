import { Component, OnInit, Inject } from '@angular/core';
import { IBlockUIService } from '../../../../interfaces/services/blockui-service.interface';
import { ToastrService } from 'ngx-toastr';
import { HandleUnitModel } from '../../../../models/handle-unit.model';
import { IHandleUnitService } from '../../../../interfaces/services/administrator/handle-unit.interface';
import { PageChangedEvent } from 'ngx-bootstrap';
@Component({
    selector: 'handle-list',
    templateUrl: 'handle-unit-list-component.html'
})
export class HandleUnitListComponent implements OnInit {
    userList: HandleUnitModel[];
    currentPage: number=1;
    totalRecord: number=0;
    tenDonVi: string='';
    
    constructor(@Inject("IHandleUnitService") private _userService: IHandleUnitService,  private toasrt: ToastrService) {}

    ngOnInit() { 
       this.loadListData();
    }
    loadListData() {
        
        this.userList  =[];
        this._userService.search(this.tenDonVi, this.currentPage, "tenDonVi", 0)
        .subscribe(i => { 
            this.userList = i.data;
            this.totalRecord = i.total
           
        });
    }

    onDelete(id: string) {
        console.log(id)
        if (confirm("bạn cho chắc là muốn xóa bản ghi ??")) {
            this._userService.delete(id).subscribe(i=>{
                console.log(i)
                debugger;
               if(i = true){
                   this.toasrt.show("Xóa Đơn Vị Quản Lý Thành Công","Đơn Vị Quản Lý");
                   this. loadListData();
                   debugger;
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