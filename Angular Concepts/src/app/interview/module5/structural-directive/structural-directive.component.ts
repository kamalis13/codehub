import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-structural-directive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './structural-directive.component.html',
  styleUrl: './structural-directive.component.css'
})
export class StructuralDirectiveComponent {

  syntaxCode = [
    '// *ngIf — conditionally renders element',
    '<div *ngIf="isLoggedIn">Welcome back!</div>',
    '<div *ngIf="isLoggedIn; else loginTpl">Welcome!</div>',
    '<ng-template #loginTpl><p>Please log in</p></ng-template>',
    '',
    '// *ngFor — renders list',
    '<li *ngFor="let item of items; let i = index; trackBy: trackById">',
    '  {{ i }}: {{ item.name }}',
    '</li>',
    '',
    '// [ngSwitch] — renders matching case',
    '<div [ngSwitch]="status">',
    '  <p *ngSwitchCase="\'active\'">Active</p>',
    '  <p *ngSwitchCase="\'inactive\'">Inactive</p>',
    '  <p *ngSwitchDefault>Unknown</p>',
    '</div>',
  ].join('\n');

  exampleCode = [
    '// Custom structural directive: *appUnless (opposite of *ngIf)',
    "import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';",
    '',
    "@Directive({ selector: '[appUnless]', standalone: true })",
    'export class UnlessDirective {',
    '  constructor(',
    '    private templateRef: TemplateRef<any>,',
    '    private vcr: ViewContainerRef',
    '  ) {}',
    '',
    '  @Input() set appUnless(condition: boolean) {',
    '    if (!condition) {',
    '      this.vcr.createEmbeddedView(this.templateRef);',
    '    } else {',
    '      this.vcr.clear();',
    '    }',
    '  }',
    '}',
    '',
    '// Usage',
    '<p *appUnless="isLoggedIn">Please log in to continue.</p>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is a Structural Directive?',
      a: 'A Structural Directive changes the structure of the DOM by adding, removing, or manipulating elements. They are applied using the asterisk (*) shorthand syntax. Built-in examples include *ngIf, *ngFor, and *ngSwitchCase. Unlike attribute directives, they can create or destroy DOM nodes.'
    },
    {
      q: 'What does the asterisk (*) in *ngIf or *ngFor actually mean?',
      a: "The * is syntactic sugar. Angular desugars *ngIf=\"condition\" into: <ng-template [ngIf]=\"condition\"><div>...</div></ng-template>. The directive receives a TemplateRef (the wrapped element) and a ViewContainerRef (where to render it). This is the actual mechanism Angular uses internally."
    },
    {
      q: 'What are TemplateRef and ViewContainerRef?',
      a: 'TemplateRef represents a reference to an <ng-template> — it holds the template to be rendered but does not render it immediately. ViewContainerRef is a reference to a DOM location where views can be inserted. Custom structural directives inject both via DI and use vcr.createEmbeddedView(templateRef) to render, and vcr.clear() to remove.'
    },
    {
      q: 'Can you apply two structural directives to the same element?',
      a: 'No. Angular does not allow two structural directives on the same element because each transforms the element into an ng-template. To combine *ngIf and *ngFor, wrap with <ng-container *ngIf="..."> and put *ngFor on the child, or vice versa. ng-container is a grouping element that adds no DOM node.'
    },
    {
      q: 'What is the purpose of ng-container?',
      a: 'ng-container is a logical grouping element that Angular removes from the DOM — it adds no actual HTML element. It is useful for: (1) applying structural directives without adding a wrapper element, (2) grouping multiple elements under one *ngIf without a div wrapper, (3) using with async pipe (ng-container *ngIf="obs$ | async as data").'
    },
    {
      q: 'How do you create a custom structural directive?',
      a: 'Create a class with @Directive decorator. Inject TemplateRef<any> and ViewContainerRef. Use an @Input setter with the same name as the directive selector. Inside the setter, call vcr.createEmbeddedView(templateRef) to render and vcr.clear() to remove, based on your condition logic.'
    },
    {
      q: 'What is the difference between *ngIf and [hidden]?',
      a: '*ngIf removes the element from the DOM entirely when false, including destroying child components and stopping subscriptions — good for saving resources. [hidden] only toggles display:none, keeping the element and all its children alive in the DOM. Use *ngIf for complex components you want to destroy; use [hidden] when you need instant re-show without re-initialization cost.'
    },
  ];
}
