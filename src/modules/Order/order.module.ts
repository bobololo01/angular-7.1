import {OrderListComponent} from './order-list/order-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {OrderRouteModule} from './order.route';
import {SharedModule} from '../shared/shared.module';
import {OrderFormComponent} from './order-create-section/order-form.component';
import { PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';
import { OrderService } from '../../services/oder.service';
import { QRCodeModule } from 'angularx-qrcode';
import { statusModule } from '../workflow/workflow.module';
import { MyCurrencyFormatterDirective } from '../../validation/directives/currency.directive';
import { GooglePlacesDirective } from '../../validation/directives/googleplaces.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PaginationModule,
    OrderRouteModule,
    QRCodeModule,
    BsDatepickerModule,
    statusModule,

  ],
  declarations: [
    OrderListComponent,
    OrderFormComponent,
    MyCurrencyFormatterDirective,
    GooglePlacesDirective,
    ],
 
  exports: [
    
  ]
  
})

export class OrderModule {
}

