import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthorizeLayoutComponent} from "../shared/authorize-layout/authorize-layout.component";
import {IsAuthorizedGuard} from "../../guards/is-authorized-guard";
import { DriverFormComponent } from "./driver-form/driver-form.component";
import { DriverListComponent } from "./driver-list/driver-list.component";
import { DriverViewComponent } from "./driver-view/driver-view.component";


//#region Route configuration

const routes: Routes = [
  {
    path: '',
    component: AuthorizeLayoutComponent,
    canActivate: [IsAuthorizedGuard],
    data:{
      appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
    },
    children: [
      {
        path: '',
        component: DriverListComponent,
        pathMatch: 'full'
      },
      {
        path: 'add',
        component: DriverFormComponent,
      
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        }
      },
      {
        path: 'edit/:id',
        component: DriverFormComponent,
      
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        }
      },
      {
        path: 'view/:id',
        component: DriverViewComponent,
      
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        }
      }
    ]
  }
];


//#endregion

//#region Module configuration

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRouteModule {
}

//#endregion
