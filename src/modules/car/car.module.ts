import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarRouteModule } from './car.route';

import { CarListComponent } from './car-list/car-list.component';
import { CarFormComponent } from './car-form/car-form.component';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule, 
    PaginationModule,
    CarRouteModule
  ],
  declarations: [CarListComponent, CarFormComponent],
  exports: [CarListComponent, CarFormComponent]
})

export class CarModule {
}
