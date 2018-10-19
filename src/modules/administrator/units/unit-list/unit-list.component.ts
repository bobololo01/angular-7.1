import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { UnitModel } from '../../../../models/unit.model';
import { IUnitService } from '../../../../interfaces/services/administrator/unit.interface';
import { ToastrService } from 'ngx-toastr';
import { IBlockUIService } from '../../../../interfaces/services/blockui-service.interface';
import { PageChangedEvent, TabHeadingDirective } from 'ngx-bootstrap';
@Component({
    selector: 'unit-list',
    templateUrl: 'unit-list.component.html'
})
export class UnitListComponent implements OnInit {
    viewModel: UnitModel;
    slectedUnit: UnitModel;
    listUnit: Array<UnitModel>
    currentPage: number=1;
    totalRecord: number=0;
    ten: string = "";
    constructor(@Inject("IUnitService") private _unitService: IUnitService,   private toatr: ToastrService) {
        this.viewModel = new UnitModel();
    }

    ngOnInit() {
        // this.viewModel = this.unitService.loadDataForm();
        
        this.loadListData();
    }
    loadListData() {
        this._unitService.search(this.ten, this.currentPage, "ten", 0)
        .subscribe(donvi => { 
            this.listUnit = donvi.data;
            this.totalRecord = donvi.total
           
        });
        this.slectedUnit = null;
    }
    searh() {
        
    }
    onEdit(data: UnitModel) {
        this.slectedUnit = data;
    }
    clearSelectedUnit(){
        this.slectedUnit = null;
        this.loadListData();
    }
    onCreate() {
        this.slectedUnit = new UnitModel();
        // this.loadListData();
    }
    onDelete(key: string) {

        if (confirm("bạn cho chắc là muốn xóa bản ghi ??")) {
            
            this._unitService.delete(key).subscribe(i => {
                
                if (i == true) {
                   
                    this.toatr.show("Xóa Thành Công", "Thông Báo");
                    
                    this.loadListData();
                }
               
            });
        }
    }
    pageChanged(event: PageChangedEvent): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.loadListData();
    }

}