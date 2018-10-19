import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthorizeLayoutComponent} from "../shared/authorize-layout/authorize-layout.component";
import {IsAuthorizedGuard} from "../../guards/is-authorized-guard";
import { AdvertisementListComponent } from "./advertisement-list/advertisement-list.component";
import { AdvertisementFormComponent } from "./advertisement-form/advertisement-form.component";


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
        component: AdvertisementListComponent,
        pathMatch: 'full'
      },
      {
        path:'add',
        component: AdvertisementFormComponent,
        
        data:{
          appCssClasses: ['skin-blue', 'fixed', 'sidebar-mini', 'sidebar-mini-expand-feature']
        },
      },
      {
        path: 'edit/:id',
        component: AdvertisementFormComponent,
      
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
export class AdvertisementRouteModule {
}

//#endregion
