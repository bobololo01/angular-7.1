import { Pipe, PipeTransform } from '@angular/core';

const PADDING = "000000";

@Pipe({ name: "myCurrency" })
export class myCurrencyPipe implements PipeTransform {
    private DECIMAL_SEPARATOR: string;
    private THOUSANDS_SEPARATOR: string;
    constructor() {
        // TODO comes from configuration settings
        this.DECIMAL_SEPARATOR = ".";
        this.THOUSANDS_SEPARATOR = ",";
    }
    transform(value: number | string): string {
        let [integer = ""] = (value || "").toString().split(this.DECIMAL_SEPARATOR);
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
        return integer;
    }

    parse(value: string): string {
        let [integer = ""] = (value || "").split(this.DECIMAL_SEPARATOR);

        integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");
        return integer;
    }
}