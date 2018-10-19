import { Component, OnInit, Inject } from '@angular/core';
import { ICarTypeService } from '../../../../interfaces/services/administrator/car-type.interfacve';
import { AngularFireList } from 'angularfire2/database';
import { CarTypeModel } from '../../../../models/car-type.model';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";
import { IBlockUIService } from '../../../../interfaces/services/blockui-service.interface';
import { PageChangedEvent, TabHeadingDirective } from 'ngx-bootstrap';


@Component({
    selector: 'car-type',
    templateUrl: 'car-type-list.component.html'
})
export class CarTypeComponent implements OnInit {


    selectedCarType: CarTypeModel;
    viewModel: CarTypeModel;
    lstCarType: CarTypeModel[];
    currentPage: number = 1;
    totalRecord: number;
    LoaiXe: string = "";
    constructor(@Inject('ICarTypeService') private _iCarTypeService: ICarTypeService, private toatr: ToastrService) { }
    ngOnInit(): void {
        this.loadListData();
    }
    loadListData() {
        this.lstCarType = [];

        this._iCarTypeService.search(this.LoaiXe, this.currentPage, "Ten", 0)
            .subscribe(loaixe => {
                this.lstCarType = loaixe.data;
                this.totalRecord = loaixe.total

            });
        this.selectedCarType = null;
    }
    clearSelectedCarType() {
        this.selectedCarType = null;
        this.loadListData();
    }
    onEdit(data: CarTypeModel) {
        this.selectedCarType = data;
    }
    onCreate() {
        this.selectedCarType = new CarTypeModel();
    }
    onDelete(key: string) {

        if (confirm("bạn cho chắc là muốn xóa bản ghi ??")) {

            this._iCarTypeService.delete(key).subscribe(i => {
                if (i == true) {
                    this.toatr.show("Xóa Thành Công", "Thông Báo");
                    this.loadListData();
                }
            });
        }
    }
    pageChanged(event: PageChangedEvent): void {

        // const startItem = (event.page - 1) * event.itemsPerPage;
        // const endItem = event.page * event.itemsPerPage;
        // console.log("start"+ startItem);
        // console.log("end"+ endItem);
        // debugger;
        console.dir(event);
        this.currentPage = event.page;
        this.loadListData();


    }



}