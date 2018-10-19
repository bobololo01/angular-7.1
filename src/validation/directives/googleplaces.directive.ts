import { Directive, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { } from '@types/googlemaps';

@Directive({
    selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    private element: HTMLInputElement;
    public autocomplete: google.maps.places.Autocomplete;
    constructor(private elRef: ElementRef) {
        //elRef will get a reference to the element where the directive is placed
        this.element = this.elRef.nativeElement;
    }

    ngOnInit() {
        this.autocomplete = new google.maps.places.Autocomplete(this.element);
        this.autocomplete.addListener('place_changed', () => {
            // let locate = this.autocomplete.getPlace().formatted_address;
            this.onSelect.emit(this.autocomplete.getPlace().name);
            // console.log(this.order.diemNhanHang)
        });

    }
}