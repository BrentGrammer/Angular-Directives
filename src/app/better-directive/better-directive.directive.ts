import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding,
  Input
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]"
})
export class BetterHighlightDirective implements OnInit {
  // use prop binding to be allow for setting values dynamically:
  @Input() highlightColor: string = "purple";
  @Input() defaultColor: string = "blue";
  // remember to set an initial value to prevent errors:
  @HostBinding("style.backgroundColor") backgroundColor: string = this
    .defaultColor;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }
  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
