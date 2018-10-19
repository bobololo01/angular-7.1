import { Component, OnInit, Input, Inject } from '@angular/core';

import { IUserService } from '../../../../interfaces/services/administrator/user.interface';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import { ToastrService } from "ngx-toastr";
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HandleUnitModel } from '../../../../models/handle-unit.model';
import { IHandleUnitService } from '../../../../interfaces/services/administrator/handle-unit.interface';
@Component({
    selector: 'handle-form',
    templateUrl: 'handle-unit-form-component.html'
})
export class HandleUnitFormComponent implements OnInit {

    handel:HandleUnitModel;
    Title:string="Taọ mới";
    anhDangKyMatTruocUrl: Observable<string>;
    anhDangKyMatSauUrl: Observable<string>;
    constructor(@Inject("IHandleUnitService") private _iHandelService: IHandleUnitService,private route: ActivatedRoute, private storage: AngularFireStorage,  private _location: Location,private toastService :ToastrService,) {}

    ngOnInit() { 
        this.handel  = new HandleUnitModel();
        this.route.params.subscribe(params => {
            this.Title = "Cập Nhật"
            let id = params['id'];
            if(id != undefined){
                this._iHandelService.getById(id).subscribe(i=>{
                    console.log(i);
                    this.handel= i;
                })
            }
           
         });
    }
    submitForm(HandelForm:NgForm) {
        
        var model = HandelForm.value as HandleUnitModel;
        console.log(model)
        debugger;
        if (model.id != undefined) {
            this._iHandelService.update(model).subscribe(i => {
                debugger;
                this.toastService.show("Cập Nhật User Thành Công", "Cập Nhật");
                this._location.back();
                
            });
        } else
            this._iHandelService.insert(model).subscribe(i => {
                debugger;
                this.toastService.show("Tạo User Thành Công", "Cập Nhật")
                this._location.back();
                
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
              if(image == "anhDangKyMatTruoc"){
                    this.anhDangKyMatTruocUrl = storageRef.getDownloadURL();
                }
                   
                else this.anhDangKyMatSauUrl = storageRef.getDownloadURL();

            }
            )
        ).subscribe()
    }
    cancel() {
        this._location.back();
    }

}