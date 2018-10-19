import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { CarTypeComponent } from './car-type/car-type-list/car-type-list.component';
import { UnitFormComponent } from './units/unit-form/unit-form.component';
import { UnitListComponent } from './units/unit-list/unit-list.component';
import { AdministratorRouteModule } from './administrator.route';
import { CarTypeFormComponent } from './car-type/car-type-form/car-type-form.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PaginationModule } from 'ngx-bootstrap';
import { HandleUnitListComponent } from './handle-unit/handle-unit-list/handle-unit-list-component';
import { HandleUnitFormComponent } from './handle-unit/handle-unit-form/handle-unit-form-component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,PaginationModule,
    SharedModule,PaginationModule,
   
    AdministratorRouteModule
  ],
  declarations: [CarTypeComponent,CarTypeFormComponent,UnitFormComponent,UnitListComponent,UserFormComponent,UserListComponent,HandleUnitListComponent,HandleUnitFormComponent ],
  exports: [CarTypeComponent,CarTypeFormComponent,UnitFormComponent,UnitListComponent,HandleUnitListComponent,HandleUnitFormComponent  ]
})

export class AdminitratorModule {
}
