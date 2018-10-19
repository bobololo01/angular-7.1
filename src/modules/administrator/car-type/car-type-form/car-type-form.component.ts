import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { CarTypeModel } from '../../../../models/car-type.model';
import { NgForm } from '@angular/forms';
import { ICarTypeService } from '../../../../interfaces/services/administrator/car-type.interfacve';
import { ToastrService } from 'ngx-toastr';
import { IBlockUIService } from '../../../../interfaces/services/blockui-service.interface';

@Component({
    selector: 'car-type-form',
    templateUrl: 'car-type-form.component.html'
})
export class CarTypeFormComponent implements OnInit {
    @Input() carType: CarTypeModel;
    carActive: boolean = true;
    @Output() loadList: EventEmitter <any> = new EventEmitter()
    @Output() clearSelectedCarType: EventEmitter <any> = new EventEmitter()
    constructor(@Inject("ICarTypeService") private _iCarTypeService: ICarTypeService, private toastService: ToastrService) { }

    ngOnInit() {

       
    }
    changeActive(){
        this.carActive = !this.carActive;
    }
    submitForm(formData: NgForm) {
        var model = formData.value as CarTypeModel;
        model.isActive = this.carActive
        console.log(model)
        debugger;
        if (model.id != undefined) {
            this._iCarTypeService.update(model).subscribe(i => {
                
                this.toastService.show("Cập Nhật Loại Xe Thành Công", "Cập Nhật")
            });
        } else
            this._iCarTypeService.insert(model).subscribe(i => {
                
                this.loadList.emit();
                this.toastService.show("Cập Nhật Loại Xe Thành Công", "Cập Nhật")
            });

        this.cancel();
    }
    cancel() {
        this.clearSelectedCarType.emit();
        this.carType = null;
    }

}