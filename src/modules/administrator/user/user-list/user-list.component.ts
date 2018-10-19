import { Component, OnInit, Inject } from '@angular/core';
import { UserModel } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { IBlockUIService } from '../../../../interfaces/services/blockui-service.interface';
import { ToastrService } from 'ngx-toastr';
import { PageChangedEvent } from 'ngx-bootstrap';
@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
    userList: UserModel[];
    currentPage: number=1;
    totalRecord: number=0;
    hoTen: string='';
    
    constructor(@Inject("IUserService") private _userService: UserService,   private toasrt: ToastrService) {}

    ngOnInit() { 
       this.loadListData();
    }
    loadListData() {
        
        this._userService.search(this.hoTen, this.currentPage, "hoTen", 0)
        .subscribe(i => { 
            this.userList = i.data;
            this.totalRecord = i.total
        
        });
    }

    onDelete(id: string) {
        if (confirm("bạn cho chắc là muốn xóa bản ghi ??")) {
            
            this._userService.delete(id).subscribe(i=>{
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