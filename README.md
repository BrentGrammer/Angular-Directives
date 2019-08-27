# Angular app exploring Directives following course by Maximilian Schwarzmueller on Udemy

## Topics covered:

### Custom Directives:

- Generate a Directive with:
  `$ ng g d directive-name`

1. create a new folder in the app/ directory of the project named after the directive to create
   Ex: app/directive-name/

2. create a directive file in the directory:
   Ex: app/directive-name/directive-name.directive.ts

3. create a class that is wrapped in a @Directive attribute and export the class as a named export:


    Ex:
      import { Directive } from "@angular/core";

      /**
      * Pass in a config object:
      *  -needs a unique selector in camelCase (i.e. it's label used in the html template) wrapped in sqaure brackets
      *   (this means
      *   that appBasicHighlight attribute without square brackets will be recognized in the template)
      *    common convention is to prepend the name with `app`
      */
      ```
      @Directive({
        selector: "[appBasicHighlight]"
      })
      export class BasicHighlightDirective {}
      ```

4.  Access the ref to the element the directive is applied to - Angular allows you to access the injected element ref
    in the constructor as an automatically passed in argument (you can name it whatever, but its type must be
    ElementRef).
    You need to assign the value to a property on the class (either explicitly or implicitly by adding an access
    modifier in front of the argument):

    Ex:

    ```
    export class BasicHighlightDirective {
       constructor(private elementRef: ElementRef) {}
    }
    ```

### NOTE: It is BAD PRACTICE to access and manipulat the ref directly in the class.

    **It is better to use the passed in renderer from Angular - access in the constructor with type Renderer2

    Ex:

    - Pass in the Angular provided ElementRef arg and renderer to the constructor and use setStyle in the
      ngOnInit method.
    - in the setStyle method, make sure to access the nativeElement to set the style on

    ```
      { Directive, OnInit, Renderer2, ElementRef } from "@angular/core";

      @Directive({
        selector: "[appBetterHighlight]"
      })
      export class BetterHighlightDirective implements OnInit {
        constructor(elementRef: ElementRef, renderer: Renderer2) {}

        ngOnInit() {
          renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue')
        }
      }
    ```

         Renderer2 docs: https://angular.io/api/core/Renderer2

    ```

    ```

5.  Do something with the element ref (best place is in the onInit lifecycle method):
    -access the nativeElement prop on the passed in element ref assigned to a property

    Ex:

    ```
    export class BasicHighlightDirective implements OnInit {
     constructor(private elementRef: ElementRef) {}

     ngOnInit() {
       this.elementRef.nativeElement.style.backgroundColor = "green";
     }
    }
    ```

6.  Inform Angular about your directive in app.module.ts - add it to the declarations:


    Ex in app.module.ts:

      ```
      ...imports
      import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';

      @NgModule({
        declarations: [
          AppComponent,
          BasicHighlightDirective
        ],
        ...})
      ```

7. In the html template, add the directive by using the label specified in the selector prop of the @Directive
   decorator (without sq brackets) as an attribute to the element:

   Ex:
   `<p appBasicHighlight>Style me</p>`
