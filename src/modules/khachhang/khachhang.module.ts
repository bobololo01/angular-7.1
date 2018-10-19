
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap';
import { statusModule } from '../workflow/workflow.module';
import { KhachHangRouteModule } from './khachhang.router';
import { KhachHangListComponent } from './khachhang-list/khachhang-list.component';
import { KhachHangFormComponent } from './khachhang-form/khahchang-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PaginationModule,
    KhachHangRouteModule,
    statusModule
  ],
  declarations: [
     KhachHangListComponent,
    KhachHangFormComponent,

    ],
 
  exports: [
    
  ]
  
})

export class KhachHangModule {
}

