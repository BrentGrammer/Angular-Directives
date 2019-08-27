import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

/**
 * This custom structural directive does the opposite of *ngIf
 */

@Directive({
  selector: "[appUnless]"
})
export class UnlessDirective {
  // using `set` turns the property into a setter method which will run everytime the property changes
  // NOTE: Make sure to name the property the same as the directive so you can set it on the element in the html template
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      // add the underlying ng-template to the DOM
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // remove everything from the place in the DOM specified by the ViewContianerRef:
      this.vcRef.clear();
    }
  }

  /* get access to the ng-template (under the hood Angular creates this and this is where the structural directive sits)
     TemplateRef takes a generic type 
  
     get access to where in the html template to render (use the ViewContainerRef).
     ViewContainerRef marks the place in the document thedirective is being used.
  */
  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
