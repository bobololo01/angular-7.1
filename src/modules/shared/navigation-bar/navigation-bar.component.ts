import { Component, Inject, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { IAuthenticationService } from "../../../interfaces/services/authentication-service.interface";
import { ProfileViewModel } from "../../../models/profile.view-model";
import { IOrderService } from '../../../interfaces/services/order-service.interface';
import { Observable, of, interval } from 'rxjs';
@Component({
  selector: 'navigation-bar',
  templateUrl: 'navigation-bar.component.html'
})

export class NavigationBarComponent {
  iconUrl = "../../../assets/images/gundam.jpg";
  imageUrl = "../../../assets/images/gundam.jpg";
  userName = "VinhChu";

  //#region Properties

  // Account property.
  @Input('profile')
  private profile: ProfileViewModel;
  totalRecord: number = 0;
  totalTimeOut: number;
  currentPage: number = 1;
  tenHang: string = "";
  pageSize: number = 15
  //#endregion

  //#region Constructor

  // Initiate instance with IoC.
  public constructor(@Inject("IAuthenticationService") public authenticationService: IAuthenticationService,
    @Inject('IOrderService') private _iOderService: IOrderService,
    public router: Router) {
  }
  ngOnInit() {



  }

  
  //#endregion

  //#region Methods

  /*
  * Sign the user out.
  * */
  public clickSignOut(): void {
    // Clear the authentication service.
    this.authenticationService.clearIdentity();

    // Re-direct to login page.
    this.router.navigate(['/login']);
  }

  //#endregion
}
