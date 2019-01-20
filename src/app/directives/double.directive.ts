import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appDouble]',
  providers: [NgModel]
})
export class DoubleDirective {

  constructor(
    private el: ElementRef,
    private ngModel: NgModel
  ) { }

  @HostListener('click') onMouseEnter() {
    //this.el.nativeElement.value
    if (this.ngModel.value) {
      this.ngModel.update.emit(this.ngModel.value * 2);
    }
  }
}
