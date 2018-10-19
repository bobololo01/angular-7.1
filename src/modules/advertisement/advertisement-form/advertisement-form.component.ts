import { Component, OnInit, Inject } from '@angular/core';
import { AdvertisementModel } from '../../../models/advertisement.model';
import { IBlockUIService } from '../../../interfaces/services/blockui-service.interface';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { AdvertisementService } from '../../../interfaces/services/advertisement.interface';
@Component({
    selector: 'advertisement-form',
    templateUrl: 'advertisement-form.component.html'
})
export class AdvertisementFormComponent implements OnInit {

    model: AdvertisementModel=  new AdvertisementModel();
    constructor(@Inject("AdvertisementService") private _iAdsService: AdvertisementService, private location: Location,
        @Inject("IBlockUIService") private _iBlockUI: IBlockUIService, private toastService: ToastrService, private route: ActivatedRoute) { }
    Title: string = "Tạo Mới"

    ngOnInit() {
        
        this.route.params.subscribe(params => {
            this.Title = "Cập Nhật"
            let id = params['id'];
            if (id != undefined) {
                this._iAdsService.getById(id).subscribe(i => {

                    this.model = i;
                })
            }

        });
    }
    submitForm(AdsForm: NgForm) {
        this._iBlockUI.show()
        var model = AdsForm.value as AdvertisementModel;
        console.log(this.model);
        
        if (model.id != undefined) {
            this._iAdsService.update(model).subscribe(i => {
                debugger;
                console.log(model)
                this._iBlockUI.stop();
                this.toastService.show("Cập Nhật Thành Công", "Cập Nhật");
                this.location.back();
                console.log(i)
            });
        } else
            this._iAdsService.insert(model).subscribe(i => {
                this._iBlockUI.stop();
                this.toastService.show("Tạo Thành Công", "Cập Nhật")
                this.location.back();
                console.log(model)
            });


    }
    cancel() {
        this.location.back();
    }

}