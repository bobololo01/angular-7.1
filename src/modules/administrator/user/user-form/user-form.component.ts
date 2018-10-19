import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserModel } from '../../../../models/user.model';
import { IBlockUIService } from '../../../../interfaces/services/blockui-service.interface';
import { IUserService } from '../../../../interfaces/services/administrator/user.interface';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import { ToastrService } from "ngx-toastr";
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'user-form',
    templateUrl: 'user-form.component.html'
})
export class UserFormComponent implements OnInit {
    
    user:UserModel;
    Title:string="Tạo mới";
    anhDangKyMatTruocUrl: string;
    anhDangKyMatSauUrl: string;
    constructor(@Inject("IUserService") private _iuserService: IUserService, @Inject("IBlockUIService") private _iBlockUII: IBlockUIService,private route: ActivatedRoute, private storage: AngularFireStorage,  private _location: Location,private toastService :ToastrService,) {}

    ngOnInit() { 
    //    this._iBlockUII.show();
        this.user  = new UserModel();
        this.route.params.subscribe(params => {
            this.Title = "Cập Nhật"
            let id = params['id'];
            if(id != undefined){
                this._iuserService.getById(id).subscribe(i=>{
                    
                    this.user= i;
                    this.anhDangKyMatTruocUrl=i.anhDangKyMatTruocUrl;
                    this.anhDangKyMatSauUrl = i.anhDangKyMatSauUrl;
                });
                this._iBlockUII.stop();
            }
           
         });
    }
    submitForm(UserForm:NgForm) {
        
        var model = UserForm.value ;
        console.log(model);
        model.anhDangKyMatTruocUrl= this.anhDangKyMatTruocUrl;
        model.anhDangKyMatSauUrl = this.anhDangKyMatSauUrl;
        model.userName = model.sdt;
        debugger;
        if (model.id != undefined) {
            this._iuserService.update(model).subscribe(i => {
                if(i){
                this.toastService.show("Cập Nhật User Thành Công", "Cập Nhật");
                this._location.back();
                }
            });
        } else
            this._iuserService.insert(model).subscribe(i => {
                if(i){
                    this.toastService.show("Tạo User Thành Công", "Cập Nhật")
                    this._location.back();
                 }
                    console.log(i);
              
               
               
            });
            this._iBlockUII.stop();

      
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
                     storageRef.getDownloadURL().subscribe(
                         
                        (vaule:any) =>{
                            this.anhDangKyMatTruocUrl = vaule
                            console.log(vaule);
                        } 
                    );
                }
                   
                else {
                    storageRef.getDownloadURL().subscribe(
                    (vaule:any)=>{
                        this.anhDangKyMatSauUrl = vaule;
                        console.log('matsau'+ vaule)
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