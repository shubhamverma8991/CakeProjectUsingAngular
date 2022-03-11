import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef) {
    console.log('from directive');
    this.element.nativeElement.style.color = 'yellow';
  }
}
