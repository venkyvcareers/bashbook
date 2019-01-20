import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCustomDiv]'
})
export class CustomDivDirective {

  @Output() onClick: EventEmitter<any> = new EventEmitter();
  constructor( private el: ElementRef) { 
    el.nativeElement.style.backgroundColor = "aqua";
    el.nativeElement.style.borderRadius = "50px"
  }

  ngOnInit(){
    this.onClick.emit("hello");
  }
}
