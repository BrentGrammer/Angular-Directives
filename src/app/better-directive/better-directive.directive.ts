import { Directive, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]"
})
export class BetterHighlightDirective implements OnInit {
  constructor(renderer: Renderer2) {}

  ngOnInit() {}
}
