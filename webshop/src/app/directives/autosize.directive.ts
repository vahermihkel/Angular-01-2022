import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[autosize]'
})
export class AutosizeDirective {

  constructor(public element: ElementRef) { 
    // this.element.nativeElement.style.backgroundColor = "yellow";
  }

  @HostListener('input',['$event.target'])
  adjust() {
    const textarea = this.element.nativeElement;
    textarea.style.overflow = "hidden";
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }
}
