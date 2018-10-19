import { Component, OnInit, Input, Inject,Output, EventEmitter  } from '@angular/core';
import { UnitModel } from '../../../../models/unit.model';
import { NgForm } from '@angular/forms';
import { IUnitService } from '../../../../interfaces/services/administrator/unit.interface';
import { ToastrService } from 'ngx-toastr';
import { IBlockUIService } from '../../../../interfaces/services/blockui-service.interface';
@Component({
    selector: 'unit-form',
    templateUrl: 'unit-form.component.html'
})
export class UnitFormComponent implements OnInit {
    @Input() unit: UnitModel;
    @Output() loadList: EventEmitter <any> = new EventEmitter()
    @Output() clearSelectedUnit: EventEmitter <any> = new EventEmitter()
    constructor(@Inject("IUnitService") private _unitService: IUnitService,@Inject("IBlockUIService") private _iBlockUI: IBlockUIService, private toastService: ToastrService) { }
    ngOnInit() {
       
    }
    submitForm(formData: NgForm) {
        this._iBlockUI.show()
        var model = formData.value as UnitModel;
        console.log(model.id)
        debugger;
        if (model.id != undefined) {
            this._unitService.update(model).subscribe(i => {
                
                this.toastService.show("Cập nhật đơn vị thành công", "Cập Nhật")
                    
            });
        } else
            this._unitService.insert(model).subscribe(i => {

                this.loadList.emit();
                this.toastService.show("Thêm mới đơn vị thành công", "Cập Nhật")

            });

        this.cancel();
    }
    cancel() {
        this.clearSelectedUnit.emit();
        this.unit = null;
    }
}