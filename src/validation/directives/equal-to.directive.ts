import {Directive, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';

@Directive({
  selector: '[equalTo][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualToValidator, multi: true}]
})
export  class EqualToValidator implements Validator, OnInit {
  @Input() equalTo: FormControl;
  // @ts-ignore
  private validator: ValidateFn;

  ngOnInit(): void {
    this.validator = this.equalToValidate(this.equalTo);
  }
  validate(c: AbstractControl): { [key: string]: any } {
    return this.validator(c);
  }

  // @ts-ignore
  equalToValidate(equalToControl: AbstractControl): ValidateFn {
    let sub = false;
    return (control: AbstractControl): { [key: string]: boolean } => {
      if (!sub) {
        sub = true;
        equalToControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
        });
      }
      const v = control.value;
      return equalToControl.value === v ? null : {equalTo: true};
    };

  }
}

