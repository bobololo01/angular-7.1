import { Injectable } from '@angular/core';
import * as $ from "jquery";
import "block-ui"
@Injectable()
export class BlockUIService {
    
    constructor() { }
    show(){
        $(".content-wrapper").block({ 
            message: "<img style='width:100px' src='/assets/images/spinner-loadding.gif'>", 
            css: { 
                border: 'none', 
                padding: '15px', 
                backgroundColor: 'none', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .5, 
                color: '#fff' 
            } 
        }); 
    }

  
    stop(){
        $(".content-wrapper").unblock();
    }

}