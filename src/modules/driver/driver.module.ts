
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import { PaginationModule } from 'ngx-bootstrap';
import { OrderService } from '../../services/oder.service';
import { QRCodeModule } from 'angularx-qrcode';
import { statusModule } from '../workflow/workflow.module';
import { DriverRouteModule } from './driver.route';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { DriverViewComponent } from './driver-view/driver-view.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PaginationModule,
    DriverRouteModule,
    statusModule

  ],
  declarations: [
     DriverListComponent,
    DriverFormComponent,
    DriverViewComponent

    ],
 
  exports: [
    
  ]
  
})

export class DriverModule {
}

