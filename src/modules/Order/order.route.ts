import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthorizeLayoutComponent} from "../shared/authorize-layout/authorize-layout.component";
import {IsAuthorizedGuard} from "../../guards/is-authorized-guard";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderFormComponent } from "./order-create-section/order-form.component";

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
        component: OrderListComponent,
        pathMatch: 'full'
      },
      {
        path: 'add',
        component: OrderFormComponent,
      
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        }
      },
      {
        path: 'edit/:id',
        component: OrderFormComponent,
      
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
export class OrderRouteModule {
}

//#endregion
