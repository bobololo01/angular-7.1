import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { myCurrencyPipe } from '../../pipe/currency.pipe';

@Directive({ selector: "[myCurrencyFormatter]" })
export class MyCurrencyFormatterDirective implements OnInit {
    private el: HTMLInputElement;
    constructor(
        private elementRef: ElementRef,
        private CurrencyPipe: myCurrencyPipe
      ) {
        this.el = this.elementRef.nativeElement;
      }
    ngOnInit(){
        this.el.value = this.CurrencyPipe.transform(this.el.value);
    }
    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        this.el.value = this.CurrencyPipe.parse(value); // opossite of transform
    }
  
    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        this.el.value = this.CurrencyPipe.transform(value);
    }
}