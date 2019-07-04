import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appCuposRows]'
})
export class CuposRowsDirective {

  constructor(private el: ElementRef) {
  }

  @Input('appCuposRows') cupos: number;

  ngAfterViewInit() {
    if (this.cupos < 10)
      this.el.nativeElement.style.backgroundColor = "red";
    else if (this.cupos >= 20)
      this.el.nativeElement.style.backgroundColor = "green";
    else
      this.el.nativeElement.style.backgroundColor = "yellow";
  }
}
