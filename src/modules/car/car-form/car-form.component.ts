import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { ICarService } from '../../../interfaces/services/car-service.interface';
import { NgForm } from '@angular/forms';
import { CarModel } from '../../../models/car.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ICarTypeService } from '../../../interfaces/services/administrator/car-type.interfacve';
import { CarTypeModel } from '../../../models/car-type.model';
import { UnitModel } from '../../../models/unit.model';
import { IUnitService } from '../../../interfaces/services/administrator/unit.interface';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { IHandleUnitService } from '../../../interfaces/services/administrator/handle-unit.interface';
import { HandleUnitModel } from '../../../models/handle-unit.model';
import { Location } from '@angular/common';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { IBlockUIService } from '../../../interfaces/services/blockui-service.interface';
import { LaiXeService } from '../../../services/driver.service';
@Component({
    selector: 'car-form',
    templateUrl: 'car-form.component.html'
})
export class CarFormComponent implements OnInit {
    selectedCar: CarModel;
    user: UserModel;
    anhDauXeUrl: string;
    anhThanXeUrl: string;
    anhDangKyMatTruocUrl: string;
    anhDangKyMatSauUrl: string;
    lstCarType: CarTypeModel[];
    lstDonViTinhTheTich: UnitModel[];
    lstDonViTinhKhoiLuong: UnitModel[];
    lstUser: UserModel[];
    lstDonVi: HandleUnitModel[];
    pageindex: number = 1;
    isActive: boolean = true;
    classActive: boolean;
    clicked: string;
    tenLaixe: string;
    constructor(@Inject("ICarService") private _iCarService: ICarService, private route: ActivatedRoute, @Inject("ILaiXeService") private _iuserLaixe: LaiXeService, @Inject("IBlockUIService") private _iBlockUI: IBlockUIService, @Inject("IUnitService") private _iunitService: IUnitService, @Inject("IHandleUnitService") private _iHandelService: IHandleUnitService, private storage: AngularFireStorage, @Inject("ICarTypeService") private _iCarTypeService: ICarTypeService, private toastService: ToastrService, private _location: Location) { }
    ngOnInit() {
        this._iBlockUI.show();
        this.selectedCar = new CarModel();
        this._iuserLaixe.getData().subscribe(i => {
            this.lstUser = i.data;
        });
        this._iCarTypeService.searchActive(this.isActive,this.pageindex,"isActive",0).subscribe(i =>{
            console.log(i)
            this.lstCarType = i.data;
        });
        this._iHandelService.getData().subscribe(i => {
            this.lstDonVi = i.data;
        });
        this._iunitService.searchActive(this.isActive,this.pageindex,"isActive",0).subscribe(i => {
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
            let id = params['id'];
            if (id != undefined) {
                this._iCarService.getById(id).subscribe(i => {
                    this.selectedCar = i;
                    this.anhDangKyMatTruocUrl = i.anhDangKyMatTruocUrl;
                    this.anhDangKyMatSauUrl = i.anhDangKyMatSauUrl;
                    this.anhDauXeUrl = i.anhDauXeUrl;
                    this.anhThanXeUrl = i.anhThanXeUrl;
                    this.classActive = i.isActive;

                    if (i.isActive == true) {
                        this.clicked = "Inactive";
                    } else {
                        this.clicked = "Active";
                    }
                    this._iuserLaixe.getById(i.laiXeId).subscribe(user => {
                        this.tenLaixe = user.hoTen;
                    })

                });

            }
        });
    }

    submitForm(UserForm: NgForm) {
        let model = UserForm.value;
        console.log(model)
        model.anhDangKyMatTruocUrl = this.anhDangKyMatTruocUrl;
        model.anhDangKyMatSauUrl = this.anhDangKyMatSauUrl;
        model.anhDauXeUrl = this.anhDauXeUrl;
        model.anhThanXeUrl = this.anhThanXeUrl;
        debugger;

        this._iCarService.updateCar(model).subscribe(i => {
            console.log(i);
            this.toastService.show("Cập Nhật Thành Công", "Cập Nhật");
            this._location.back();
            debugger;
        });
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
                if (image == "anhDauXe") {
                    storageRef.getDownloadURL().subscribe(

                        (vaule: any) => {
                            this.anhDauXeUrl = vaule
                            console.log(vaule);
                        }
                    );
                } else if (image == "anhThanXe") {
                    storageRef.getDownloadURL().subscribe(

                        (vaule: any) => {
                            this.anhThanXeUrl = vaule
                            console.log(vaule);
                        }
                    );
                } else if (image == "anhDangKyMatTruoc") {
                    storageRef.getDownloadURL().subscribe(

                        (vaule: any) => {
                            this.anhDangKyMatTruocUrl = vaule
                            console.log(vaule);
                        }
                    );
                }

                else {
                    storageRef.getDownloadURL().subscribe(
                        (vaule: any) => {
                            this.anhDangKyMatSauUrl = vaule;
                            console.log('matsau' + vaule)
                        }
                    );
                }
            }
            )
        ).subscribe()
    }

    onCancel(model: NgForm) {
        this._location.back();
    }

    onActive(event) {
        console.log("envent" + event.text);

        this.route.params.subscribe(params => {
            let id = params['id'];
            if (id != undefined) {
                this._iCarService.updateActive(id).subscribe();


            }
        });
    }


}