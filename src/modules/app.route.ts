import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {AccountModule} from './account/account.module';

import {DashboardModule} from './dashboard/dashboard.module';
import {OrderModule} from './Order/order.module';
import {CarModule} from './car/car.module';
import { AdminitratorModule } from './administrator/administrator.module';

//#region Properties

// Application routes configuration.
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: 'modules/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'login',
        loadChildren: 'modules/account/account.module#AccountModule'
        // loadChildren: () => AccountModule
      },
      {
        path: 'order',
        // loadChildren: () => OrderModule
        loadChildren: 'modules/Order/order.module#OrderModule'
      },
      {
        path: 'Cars',
        // loadChildren: () => CarModule
        loadChildren: 'modules/car/car.module#CarModule'
      },
      {
        path: 'drivers',
        // loadChildren: () => CarModule
        loadChildren: 'modules/driver/driver.module#DriverModule'
      },
      {
        path: 'khachhang',
        loadChildren: 'modules/khachhang/khachhang.module#KhachHangModule'
      },
      {
        path: 'advertisement',
        // loadChildren: () => CarModule
        loadChildren: 'modules/advertisement/advertisement.module#AdvertisementModule'
      }
      ,
      {
        path: 'admin',
         // loadChildren: () => AdminitratorModule
        loadChildren: 'modules/administrator/administrator.module#AdminitratorModule'
      },


    ]
  }
];

//#endregion

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: false})
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})

export class AppRouteModule {
}
