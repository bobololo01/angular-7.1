import { Component, OnInit, Inject } from '@angular/core';
import { AdvertisementService } from '../../../interfaces/services/advertisement.interface';
import { IBlockUIService } from '../../../interfaces/services/blockui-service.interface';
import { ToastrService } from 'ngx-toastr';
import { AdvertisementModel } from '../../../models/advertisement.model';
import { Subject } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap';

@Component({
    selector: 'advertisement-list',
    templateUrl: 'advertisement-list.component.html'
})
export class AdvertisementListComponent implements OnInit {
    
    constructor(@Inject('AdvertisementService') private _iAdService: AdvertisementService, private toasrt :ToastrService) { }
    tieuDe: string="";
    currentPage: number=1;
    totalRecord: number = 0;
    adsList:AdvertisementModel[];
    AllAds:AdvertisementModel[];
    startWith = new Subject()
    endWith = new Subject();
    selectedAds: AdvertisementModel;
    ngOnInit() { 
        
        this.loadListData();
    }
    loadListData() {
       
        this._iAdService.search(this.tieuDe, this.currentPage, "tieuDe", 0)
            .subscribe(i => { 
                this.adsList = i.data;
                this.totalRecord = i.total
       
            });
    }
    onCreate() {
         
          
    }
    onEdit(ads: AdvertisementModel) {
       
        this._iAdService.selectedAds = ads;
    }
    pageChanged(event: PageChangedEvent): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.adsList = this.AllAds.slice(startItem, endItem);
    }
    onDelete(id: string) {
        if (confirm("bạn cho chắc là muốn xóa bản ghi ??")) {
          
            this._iAdService.deleteOrder(id).subscribe(i=>{
          
               if(i==true){
                   this.toasrt.show("Xóa Thành Công","Quảng cáo");
                   this. loadListData();
               }
              
            });
        }

    }

}