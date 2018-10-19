import { Directive } from '@angular/core';
import {Validator, AbstractControl, ValidatorFn, Validators, NG_VALIDATORS} from '@angular/forms';
import {isPresent} from './util.lang';

@Directive({
  selector: '[email]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true}]
})
export class EmailValidator implements Validator {
    validate(c: AbstractControl): {[key: string]: any} {
        return this.email(c);
      }
      email: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
        if (isPresent(Validators.required(control))) { return null; }
        const v: string = control.value;
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) ? null : {'email': true};

    }
}
