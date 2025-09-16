import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCaseStatus]',
  standalone: true,
})
export class CaseStatus implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.highlight();
  }

  private highlight() {
    this.renderer.setStyle(this.el.nativeElement, 'textAlign', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '50px');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '0.1rem 2rem');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    // this.renderer.setStyle(this.el.nativeElement, 'boxShadow', 'rgba(0, 0, 0, 0.35) 0px 5px 15px');
    this.customColor();
  }

  private customColor() {
    switch (this.el.nativeElement.innerText) {
      case 'مسودة':
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#4e504e63');
        this.renderer.setStyle(this.el.nativeElement, 'color', '#4e504eff');
        break;

      case 'نظر':
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#09e42652');
        this.renderer.setStyle(this.el.nativeElement, 'color', '#00e91fff');
        break;

      case 'معلق':
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#d20c054b');
        this.renderer.setStyle(this.el.nativeElement, 'color', '#d20c05ff');
        break;

      default:
        break;
    }
  }
}
