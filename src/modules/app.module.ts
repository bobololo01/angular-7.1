import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IsAuthorizedGuard } from '../guards/is-authorized-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { SharedModule } from './shared/shared.module';
import { AppRouteModule } from './app.route';
import { AppSettings } from '../constants/app-settings.constant';
import { ServiceModule } from '../services/service.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoaderFactory } from '../factories/ngx-translate.factory';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { PaginationModule, ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from "../environments/environment";
import { Constant } from '../constants/constant';
import { AgmCoreModule } from "@agm/core";
import { QRCodeModule } from 'angularx-qrcode';
import { httpInterceptorProviders } from '../interceptors';
import { AuthenticationService } from '../services/authentication.service';
import { myCurrencyPipe } from '../pipe/currency.pipe';

//#region Module declaration

@NgModule({
  declarations: [],
  imports: [
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MomentModule,
    HttpClientModule,
    
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyDfD7TvF8FfnrLGPSeQpd0W_mmlldGq9gM',
      libraries: ["places"] 
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceModule.forRoot(),
    SharedModule,
    AppRouteModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule, 
    QRCodeModule,
   
   
  ],
  providers: [
    
    IsAuthorizedGuard,
    AppSettings, 
    Constant,
    myCurrencyPipe,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}

//#endregion
