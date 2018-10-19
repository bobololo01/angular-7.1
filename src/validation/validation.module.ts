import {NgModule} from '@angular/core';
import {EmailValidator} from './directives/emailValidate.directive';
import {DateValidator} from './directives/dateValidate.directive';
import {EqualValidator} from './directives/equalValidate.directive';
import {EqualToValidator} from './directives/equal-to.directive';
import {NumberValidator} from './directives/numberValidate.directive';
import { GooglePlacesDirective } from './directives/googleplaces.directive';

@NgModule({
  declarations: [EmailValidator, DateValidator, EqualValidator, EqualToValidator, NumberValidator,GooglePlacesDirective],
  exports: [EmailValidator, DateValidator, EqualValidator, EqualToValidator, NumberValidator,GooglePlacesDirective]
})

export class CustomValidateModule {
}
