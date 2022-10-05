import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChairDirective]'
})
export class ChairDirectiveDirective implements OnInit{

  // @Input('appChairDirective') chair: any;
  headingColor: string = 'holded';

  @HostBinding('class') className?: string;
  constructor(private element: ElementRef, private renderer: Renderer2) { }
  // @HostBinding('class') className = 'holded';
  ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'holded');
  }

  @HostListener('mosuseover') onover(){
    this.className = 'holded';
  }

}
