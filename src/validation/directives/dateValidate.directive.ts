import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators} from '@angular/forms';
import {isDate, isPresent, parseDate} from './util.lang';



export const date: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (isPresent(Validators.required(control))) {
    return null;
  }
  let v  = control.value;
  v = parseDate(v);
  return isDate(v) ? null : {date: true};
};

@Directive({
  providers: [{provide: NG_VALIDATORS, useExisting: DateValidator, multi: true}],
  selector: '[date]'
})
export class DateValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    return date(c);
  }

}

