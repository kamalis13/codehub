import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attribute-directive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attribute-directive.component.html',
  styleUrl: './attribute-directive.component.css'
})
export class AttributeDirectiveComponent {

  syntaxCode = [
    '// ngClass — add/remove CSS classes',
    '<div [ngClass]="{ active: isActive, disabled: !isActive }">...</div>',
    '',
    '// ngStyle — set inline styles',
    '<p [ngStyle]="{ color: textColor, fontSize: size + \'px\' }">...</p>',
    '',
    '// Custom attribute directive',
    '@Directive({',
    "  selector: '[appHighlight]',",
    '  standalone: true',
    '})',
    'export class HighlightDirective {',
    "  @Input() appHighlight = 'yellow';",
    '  @HostBinding(\'style.backgroundColor\') bg = this.appHighlight;',
    '',
    "  @HostListener('mouseenter') onEnter() {",
    '    this.bg = this.appHighlight;',
    '  }',
    "  @HostListener('mouseleave') onLeave() {",
    "    this.bg = 'transparent';",
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// highlight.directive.ts — real-world attribute directive',
    "import { Directive, Input, HostListener, HostBinding } from '@angular/core';",
    '',
    "@Directive({ selector: '[appHighlight]', standalone: true })",
    'export class HighlightDirective {',
    "  @Input() appHighlight = '#ffffcc';",
    "  @Input() defaultColor = 'transparent';",
    '',
    "  @HostBinding('style.backgroundColor') bgColor = this.defaultColor;",
    "  @HostBinding('style.transition') transition = 'background 0.3s';",
    '',
    "  @HostListener('mouseenter') onMouseEnter() {",
    '    this.bgColor = this.appHighlight;',
    '  }',
    '',
    "  @HostListener('mouseleave') onMouseLeave() {",
    '    this.bgColor = this.defaultColor;',
    '  }',
    '}',
    '',
    '// Usage in template',
    '<p appHighlight appHighlight="#d4edda">Hover over me!</p>',
    '<p appHighlight appHighlight="#f8d7da">Danger zone!</p>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is an Attribute Directive?',
      a: "An Attribute Directive changes the appearance or behavior of an existing DOM element without adding or removing it. It is applied as an attribute: <div myDir>. Built-in examples are ngClass and ngStyle. Custom attribute directives use @Directive with @HostListener for events and @HostBinding for property bindings."
    },
    {
      q: 'What is the difference between Component, Attribute, and Structural Directives?',
      a: 'Component Directive: has a template, renders its own view. Structural Directive: changes DOM structure (adds/removes elements). Attribute Directive: modifies behavior/appearance of existing elements without changing structure. Components are the most powerful; attribute directives are the lightest-weight option.'
    },
    {
      q: 'What is @HostListener and how is it used?',
      a: "@HostListener('eventName') decorates a method in a directive/component to listen to DOM events on the host element. Example: @HostListener('click') onClick() { ... } listens for click events on the element the directive is applied to. You can also access the event object: @HostListener('click', ['$event']) onClick(event: MouseEvent)."
    },
    {
      q: 'What is @HostBinding and how is it used?',
      a: "@HostBinding('property') binds a class property to a host element property or attribute. Example: @HostBinding('class.active') isActive = false; adds/removes the active CSS class based on isActive. It can also bind to style.color, attr.aria-label, etc. It eliminates the need to access ElementRef directly."
    },
    {
      q: 'When would you use ElementRef vs @HostBinding?',
      a: "Prefer @HostBinding over ElementRef. @HostBinding is declarative, works with Angular's change detection, and is safer. ElementRef gives direct access to the DOM element (el.nativeElement.style.color) which bypasses Angular's security and doesn't work with server-side rendering. Only use ElementRef when you have no alternative."
    },
    {
      q: 'How do you pass input values to an attribute directive?',
      a: "Use @Input() in the directive class. The input name can match the directive selector for shorthand: @Input() appHighlight = 'yellow'. Then use: <p appHighlight=\"#red\">. For additional inputs: @Input() defaultColor = 'white'. Then: <p appHighlight=\"red\" defaultColor=\"blue\">."
    },
    {
      q: 'What is the difference between [ngClass] and [class.name]?',
      a: '[class.name]="expr" is a single-class binding — adds/removes one specific class based on a boolean expression. [ngClass] is more powerful — accepts a string, array of strings, or object {className: boolean}. Use [class.name] for single classes for clarity; use [ngClass] when conditionally applying multiple classes.'
    },
  ];
}
