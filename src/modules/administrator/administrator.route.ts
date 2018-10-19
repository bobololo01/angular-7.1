import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthorizeLayoutComponent} from "../shared/authorize-layout/authorize-layout.component";
import {IsAuthorizedGuard} from "../../guards/is-authorized-guard";
import { UnitListComponent } from "./units/unit-list/unit-list.component";
import { CarTypeComponent } from "./car-type/car-type-list/car-type-list.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { UserFormComponent } from "./user/user-form/user-form.component";
import { HandleUnitListComponent } from "./handle-unit/handle-unit-list/handle-unit-list-component";
import { HandleUnitFormComponent } from "./handle-unit/handle-unit-form/handle-unit-form-component";



//#region Route configuration

const routes: Routes = [
  {
    path: '',
    component: AuthorizeLayoutComponent,
    canActivate: [IsAuthorizedGuard],
    data:{
      expectedRole:"Administrator",
      appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
    },
    children: [
      {
        path: 'units',
        component: UnitListComponent,
        pathMatch: 'full', 
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        },
      },
      {
        path: 'car-type',
        component: CarTypeComponent,
        pathMatch: 'full',
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        },
      } ,
      {
        path: 'users',
        component: UserListComponent,
        pathMatch: 'full',
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        },
      },
      {
        path: 'users/add',
        component: UserFormComponent,
        pathMatch: 'full',
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        },
      },
      {
        path: 'users/edit/:id',
        component: UserFormComponent,
      
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        }
      },
      {
        path: 'handleunit',
        component: HandleUnitListComponent,
        pathMatch: 'full',
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        },
      },
      {
        path: 'handleunit/add',
        component: HandleUnitFormComponent,
        pathMatch: 'full',
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        },
      },
      {
        path: 'handleunit/edit/:id',
        component: HandleUnitFormComponent,
        pathMatch: 'full',
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        },
      },
    ]
  }
];


//#endregion

//#region Module configuration

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRouteModule {
}

//#endregion
