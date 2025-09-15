import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appContractType]',
})
export class ContractType implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.highlight();
  }

  private highlight() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.textColor()
    );
    this.renderer.setStyle(this.el.nativeElement, 'textAlign', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '50px');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '0.1rem 2rem');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    this.renderer.setStyle(
      this.el.nativeElement,
      'boxShadow',
      'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    );
  }

  private textColor() {
    console.log(this.el.nativeElement.textContent);
    switch (this.el.nativeElement.innerText) {
      case 'غير محددة بمدية':
        return '#4e504ebc';

      case 'محددة':
        return '#e4b109ff';

      default:
        return 'red';
    }
  }
}
