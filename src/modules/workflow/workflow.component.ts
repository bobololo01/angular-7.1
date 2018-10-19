import { OnInit, Component, Inject, Input, } from "@angular/core";
import { IStatusService } from "../../interfaces/services/changeStatus-service.interface";
import { ActivatedRoute } from "@angular/router";
import { IOrderService } from "../../interfaces/services/order-service.interface";
import { OrderViewModel } from "../../models/oder.view-model";
import { Location } from '@angular/common';
import { IBlockUIService } from "../../interfaces/services/blockui-service.interface";
import { ToastrService } from "ngx-toastr";
@Component({

    selector: 'workflow',
    templateUrl: './workflow.compoment.html'
})
export class testworkflow implements OnInit {
    order: OrderViewModel;
    statlist: OrderViewModel[];
    constructor(@Inject('IStatusService') private _IStatusService: IStatusService, private _location: Location, @Inject("IOrderService") private _iOrderService: IOrderService, private toastService: ToastrService, @Inject("IBlockUIService") private _iBlockUI: IBlockUIService, private route: ActivatedRoute, ) { }
    status: number;
    statusName: string = '';
    errorName: string = "";
    classStatus: string = "";
    ngOnInit() {
        this.route.params.subscribe(params => {

            let id = params['id'];
            if (id != undefined) {
                this._iOrderService.getById(id).subscribe(i => {
                    this.status = i.status;
                    switch (this.status) {
                        case 0:
                            this.statusName = "Created";
                            break;
                        case 1:
                            this.statusName = "approved";
                            break;
                        case 2:
                            this.statusName = "Assigned";
                            break;
                        default:
                            this.classStatus = "hidden";
                    }

                })
            }

        });

    }
    checkStatus() {
        this.route.params.subscribe(params => {

            let id = params['id'];
            if (id != undefined) {
                this._IStatusService.updateChangeStatus(id, this.status).subscribe(i => {
                    this._iBlockUI.stop();
                    this.toastService.show("Cập Nhật thành công", "Cập Nhật")
                    this._location.back();
                });
            }

        });

    }
    clearCheckStatus() {
        this.route.params.subscribe(params => {

            let id = params['id'];
            if (id != undefined) {
                this._IStatusService.clearChangeStatus(id).subscribe(i => {
                    this._iBlockUI.stop();
                    this.toastService.show("Cập Nhật thành công", "Cập Nhật")
                    this._location.back();
                });
            }

        });

    }
}