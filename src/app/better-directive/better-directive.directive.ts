import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]"
})
export class BetterHighlightDirective implements OnInit {
  // remember to set an initial value to prevent errors:
  @HostBinding("style.backgroundColor") backgroundColor: string = "blue";

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  // pass in elref, which style to set, value, optional: flags
  ngOnInit() {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
  }

  @HostListener("mouseenter") mouseover(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   "background-color",
    //   "purple"
    // );
    this.backgroundColor = "purple";
  }
  @HostListener("mouseleave") mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
    this.backgroundColor = "blue";
  }
}
