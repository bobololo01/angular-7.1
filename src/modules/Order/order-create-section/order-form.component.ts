import { Component, OnInit, Inject, Input, Output, EventEmitter, NgZone, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IOrderService } from '../../../interfaces/services/order-service.interface'
import { ToastrService } from "ngx-toastr";
import { timeInterval } from 'rxjs/operators';
import { OrderViewModel } from '../../../models/oder.view-model';
import { IBlockUIService } from '../../../interfaces/services/blockui-service.interface';
import { UnitModel } from '../../../models/unit.model';
import { IUnitService } from '../../../interfaces/services/administrator/unit.interface';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QRCodeComponent } from "angularx-qrcode";
import * as $ from 'jquery';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthorizationToken } from '../../../models/authorization-token';
import { MyCurrencyFormatterDirective } from '../../../validation/directives/currency.directive';


@Component({
    selector: 'order-form',
    templateUrl: 'order-form.component.html',

})
export class OrderFormComponent implements OnInit {

    angularxQrCode: string = null;
    changepipe: MyCurrencyFormatterDirective
    imageUrl: string;
    order: OrderViewModel;
    authToken: AuthorizationToken;
    statusName: string = '';
    classStatus: string = "";
    minDate: Date;
    constructor(private zone: NgZone, @Inject("IOrderService") private _iOrderService: IOrderService, @Inject("IUnitService") private _iunitService: IUnitService, @Inject("IBlockUIService") private _iBlockUI: IBlockUIService, private storage: AngularFireStorage, private toastService: ToastrService, private route: ActivatedRoute, private _location: Location) {
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate());
    }
    Title: string = "Tạo Mới"
    lstDonViTinhTheTich: UnitModel[];
    lstDonViTinhKhoiLuong: UnitModel[];
    ngOnInit() {
        this._iBlockUI.show()
        this.order = new OrderViewModel();
        this._iunitService.getData().subscribe(i => {
            this.lstDonViTinhTheTich = new Array<UnitModel>();
            this.lstDonViTinhKhoiLuong = new Array<UnitModel>();
            var ctr = this;
            i.data.forEach(function (value) {
                if (value.loaiDonVi == 0) {
                    ctr.lstDonViTinhTheTich.push(value);
                } else {
                    ctr.lstDonViTinhKhoiLuong.push(value);
                }
            })

            this._iBlockUI.stop();
        });

        this.route.params.subscribe(params => {
            this.Title = "Cập Nhật"
            let id = params['id'];
            if (id != undefined) {
                this._iOrderService.getById(id).subscribe(i => {

                    this.order = i;
                    this.angularxQrCode = i.maDonHang;
                    this.imageUrl = i.imageUrl;
                    switch (i.status) {
                        case 0:
                            this.statusName = "Created";
                            break;
                        case 1:
                            this.statusName = "Active";
                            break;
                        case 2:
                            this.statusName = "approved";
                            break;
                        case 3:
                            this.statusName = "Assigned";
                            break;
                        default:
                            this.statusName = "Assigned";
                    }
                })
            }

        });

    }
    submitForm(OderForm: NgForm) {
        this._iBlockUI.show()
        var model = OderForm.value as OrderViewModel;
        console.log(model);
        debugger;
        model.imageUrl = this.imageUrl;
        if (model.id != undefined) {
            this._iOrderService.update(model).subscribe(i => {
                console.log(i);
                if (i == true) {
                    this._iBlockUI.stop();
                    this.toastService.show("Cập Nhật đơn hàng Thành Công", "Cập Nhật");
                    this._location.back();
                } else {
                    this._iBlockUI.stop();
                    this.toastService.show("Cập Nhật đơn hàng Thất Bại", "Cập Nhật");
                }
            });
        } else
            this._iOrderService.insert(model).subscribe(i => {
                debugger;
                this._iBlockUI.stop();
                this.toastService.show("Tạo mới đơn hàng Thành Công", "Tạo Mới")
                this._location.back();

            });

    }
    cancel() {
        this._location.back();
    }
    setAddress1(addrObj) {
        //We are wrapping this in a NgZone to reflect the changes
        //to the object in the DOM.
        this.zone.run(() => {
            this.order.diemNhanHang = addrObj
            console.log(this.order.diemNhanHang);
        });
    }
    setAddress2(addrObj) {
        //We are wrapping this in a NgZone to reflect the changes
        //to the object in the DOM.
        this.zone.run(() => {
            this.order.diemTraHang = addrObj
            console.log(this.order.diemTraHang);
        });
    }

    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    //still work but dont know why LOL :)
    pipeChanged(value) {
        var num = value.replace(/[,]/g, "");
        console.log(num)
        return Number(num);
    }

    print(): void {


        let popupWinindow
        let innerContents = document.getElementById('print-image').innerHTML;
        popupWinindow = window.open('', '_blank', 'left=0, right=0,width=100%,height=auto,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }

    ChangeSelectedFile(event, image) {
        this.uploadImage(event.target.files[0], image)
    }
    uploadImage(selectedFile: File, image: string) {
        let path = `/CarImages/${selectedFile.name}`
        let storageRef = this.storage.ref(path);
        let task = this.storage.upload(path, selectedFile)
        task.snapshotChanges().pipe(
            finalize(() => {
                if (image == "anhHang") {
                    storageRef.getDownloadURL().subscribe(

                        (vaule: any) => {
                            this.imageUrl = vaule
                            console.log(vaule);
                        }
                    );
                }


            }
            )
        ).subscribe()
    }


}
