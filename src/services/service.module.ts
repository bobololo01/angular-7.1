import { NgModule, ModuleWithProviders } from '@angular/core';
import { IAccountService } from '../interfaces/services/account-service.interface';
import { AccountService } from './account.service';
import { IAuthenticationService } from '../interfaces/services/authentication-service.interface';
import { AuthenticationService } from './authentication.service';
import { IOrderService } from "../interfaces/services/order-service.interface";
import { OrderService } from "./oder.service";
import { CarService } from "./car.service";
import { ICarService } from "../interfaces/services/car-service.interface";
import { UnitService } from './unit.service';
import { CarTypeService } from './car-type.service';
import { LocationService } from './location.service';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';
import { BlockUIService } from './blockUiService';
import { Advertisement } from './advertisement.service';
import { HandelUnitService } from './handle-unit.service';
import { changeStatusService } from './changeStatus.service';
import { LaiXeService } from './driver.service';
@NgModule({})

export class ServiceModule {

  //#region Methods

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        { provide: 'IAccountService', useClass: AccountService },
        { provide: 'IAuthenticationService', useClass: AuthenticationService },
        { provide: 'IOrderService', useClass: OrderService },
        { provide: 'AdvertisementService', useClass: Advertisement },
        { provide: 'ICarService', useClass: CarService },
        { provide: 'IUnitService', useClass: UnitService },
        { provide: 'ICarTypeService', useClass: CarTypeService },
        { provide: 'ILocationService', useClass: LocationService },
        { provide: 'ISearchService', useClass: LocationService },
        { provide: 'IUserService', useClass: UserService },
        { provide: "INotificationService", useClass: NotificationService },
        { provide: "IBlockUIService", useClass: BlockUIService },
        { provide: "IStatusService", useClass: changeStatusService },
        { provide: 'IHandleUnitService', useClass: HandelUnitService },
        { provide: 'ILaiXeService', useClass: LaiXeService },
      ]
    };
  }

  //#endregion
}


