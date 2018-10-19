
import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from "ngx-toastr";
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LaiXeService } from '../../../services/driver.service';
import { IOrderService } from '../../../interfaces/services/order-service.interface';
import { OrderViewModel } from '../../../models/oder.view-model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
    selector: 'driver-form',
    templateUrl: 'driver-form.component.html'
})
export class DriverFormComponent implements OnInit {

    user: UserModel;
    orderList: OrderViewModel[];
    Title: string = "Tạo mới";
    anhDangKyMatTruocUrl: string;
    anhDangKyMatSauUrl: string;
    constructor(@Inject("ILaiXeService") private _iuserService: LaiXeService,@Inject('IOrderService') private _iOderService: IOrderService,  private route: ActivatedRoute, private storage: AngularFireStorage, private _location: Location, private toastService: ToastrService ) { }

    ngOnInit() {
        
        this.user = new UserModel();
        this.route.params.subscribe(params => {
            this.Title = "Cập Nhật"
            let id = params['id'];
            if (id != undefined) {
                this._iuserService.getById(id).subscribe(i => {

                    this.user = i;
                    this.anhDangKyMatTruocUrl = i.anhDangKyMatTruocUrl;
                    this.anhDangKyMatSauUrl = i.anhDangKyMatSauUrl;
                });
           
            }

        });
    }
    submitForm(UserForm: NgForm) {

        var model = UserForm.value;
        console.log(model);
        model.anhDangKyMatTruocUrl = this.anhDangKyMatTruocUrl;
        model.anhDangKyMatSauUrl = this.anhDangKyMatSauUrl;
        // model.sdt = this.areacode + model.sdt;
        model.userName = model.sdt;
        console.log(model.sdt);
        debugger;
        if (model.id != undefined) {
            this._iuserService.update(model).subscribe(i => {
                debugger;
                console.log(i);
                this.toastService.show("Cập Nhật User Thành Công", "Cập Nhật");
                this._location.back();
            });
        } else
            this._iuserService.insert(model).subscribe(i => {
                debugger;
                console.log(i);
                this.toastService.show("Tạo User Thành Công", "Cập Nhật")
                this._location.back();

            });
        
    }
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
        console.log('aaaa');
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
                if (image == "anhDangKyMatTruoc") {
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
    cancel() {
        this._location.back();
    }


}

