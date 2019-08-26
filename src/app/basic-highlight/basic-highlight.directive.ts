import { Directive, ElementRef, OnInit } from "@angular/core";

/**
 * Pass in a config object:
 *  -needs a unique selector in camelCase (i.e. it's label used in the html template) wrapped in sqaure brackets (this means
 *   that appBasicHighlight attribute without square brackets will be recognized in the template)
 *   It tells Angular to access this as an attribute on an element.
 *    common convention is to prepend the name with `app`
 */
@Directive({
  selector: "[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }
}
