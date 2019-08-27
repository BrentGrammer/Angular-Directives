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

### Reactive Directives: Targeting events on the element to react to:

- Use the @HostListener decorator in the directive class
- You can pass in any event that is supported by the element to listen to it and react to it to change style.
- Add the decorator to some method to execute when the event occurs (the method can receive the event data as an arg)

```
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
```

### @HOSTBINDING

- You can also use @HostBinding decorator to bind the style property of the host element to a value of a property in your
  directive class

- Pass in the property of the element (in JavaScript DOM prop format) to the decorator and apply it to a property on
  your class which you can then set a value to (i.e. in the ngOnInit)

Ex:

```
export class BetterHighlightDirective implements OnInit {

  // remember to set an initial value to prevent errors:
  @HostBinding("style.backgroundColor") backgroundColor: string = "blue";

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  // no need to initialize it in onInit
  ngOnInit() {}

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.backgroundColor = "purple";
  }
  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.backgroundColor = "blue";
  }
}
```

### Making values in the directive dynamic:

- Add property binding with @Input decorator to allow values to be set by the user to use in the directive.
- on the element in the html template, the user can bind to these to set them for use in the directive
- In the directive class set values to these properties instead of hard coding them.

Ex:

```
  export class BetterHighlightDirective implements OnInit {

    // use prop binding to be allow for setting values dynamically:
    @Input() highlightColor: string = "purple";
    @Input() defaultColor: string = "blue";

    @HostBinding("style.backgroundColor") backgroundColor: string = this
      .defaultColor;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    // set the default in oninit to prevent first render not showing the user set default color
    ngOnInit() {
      this.backgroundColor = this.defaultColor
    }

    @HostListener("mouseenter") mouseover(eventData: Event) {
      this.backgroundColor = this.highlightColor;
    }
    @HostListener("mouseleave") mouseleave(eventData: Event) {
      this.backgroundColor = this.defaultColor;
    }
  }

```

// In the html template:
`<p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">`

NOTE: you can alias a property to set in the directive to the same name as the directive which enables you to set a
value by enclosing the directive name in square brackets instead of having to add that property on the element in addition
to having the directive name (not in square brackets).
An example of this use case is [ngClass] which is a directive that allows the setting of a property aliased to the same
name.

Ex:

```
export class BetterHighlightDirective implements OnInit {

      // use prop binding to be allow for setting values dynamically:
      @Input('appBetterHighlight') highlightColor: string = "purple";

      ...
```

      // Now in the html template:
      `<p [appBetterHighlight]="'yellow'">text</p>`

#### NOTE: If you are just passing a string in a bound prop, you can remove the square brackets and just have one set

of quotes:

Ex:
`<p [myprop]="'string'">`

becomes

`<p myprop="string">`
// works the same without sq brackets
