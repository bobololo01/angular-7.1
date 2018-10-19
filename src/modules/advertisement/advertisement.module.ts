import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap';
import { AdvertisementRouteModule } from './advertisement.route';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { AdvertisementFormComponent } from './advertisement-form/advertisement-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule, 
    PaginationModule,
    AdvertisementRouteModule
  ],
  declarations: [AdvertisementListComponent, AdvertisementFormComponent],
  exports: [ ]
})

export class AdvertisementModule {
}
