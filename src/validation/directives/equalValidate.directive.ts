import {Directive, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators} from '@angular/forms';
import {isPresent} from './util.lang';



// @ts-ignore
@Directive({
  selector: '[equal]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualValidator,
    multi: true
  }]
})
export  class EqualValidator implements Validator, OnInit, OnChanges {
  @Input() equal: any;
  private  validator: ValidatorFn;
  private  onChange: () => void;

  validate(c: AbstractControl): {[key: string]: any} {
    return this.validator(c);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (key === 'equal') {
        this.validator = this.equalValidate(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  ngOnInit(): void {
    this.validator = this.equalValidate(this.equal);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
  equalValidate(val: any): ValidatorFn {
    return(c: AbstractControl): {[key: string]: any} => {
      if (isPresent(Validators.required(c))) {
        return null;
      }
      const  v: any = c.value;
      return val === v ? null : {equal: true};
    };
  }
}
