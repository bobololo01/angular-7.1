import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {isPresent} from './util.lang';

@Directive({
  selector: '[number][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumberValidator, multi: true}]
})
export class NumberValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: boolean} {
    if (isPresent(c)) {
      return null;
    }
    const  v = c.value;

    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) ? null : {'number': true};
  }

}
