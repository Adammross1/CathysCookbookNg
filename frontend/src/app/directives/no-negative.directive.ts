import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoNegative]',
  standalone: true,
})
export class NoNegativeDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input') onInput() {
    const currentValue = this.el.nativeElement.value;
    const parsedValue = parseFloat(currentValue);
    if (isNaN(parsedValue) || parsedValue < 0) {
      this.el.nativeElement.value = '0';
    }
  }
}
