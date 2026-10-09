import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-binding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-binding.component.html',
  styleUrl: './property-binding.component.css',
})
export class PropertyBindingComponent {
  syntaxCode = [
    '<!-- DOM property binding -->',
    '<img [src]="imageUrl" [alt]="imageAlt">',
    '',
    '<!-- Boolean property -->',
    '<button [disabled]="isSubmitting">Submit</button>',
    '',
    '<!-- Class binding -->',
    '<div [class.active]="isActive">Tab</div>',
    '<div [class]="cssClasses">Card</div>',
    '',
    '<!-- Style binding -->',
    '<p [style.color]="textColor">Hello</p>',
    '<p [style.font-size.px]="fontSize">Text</p>',
    '',
    '<!-- Attribute binding (for non-property HTML attributes) -->',
    '<td [attr.colspan]="colSpan">Cell</td>',
    '<button [attr.aria-label]="btnLabel">Icon</button>',
    '',
    '<!-- Input property of a child component -->',
    '<app-user-card [user]="currentUser"></app-user-card>',
  ].join('\n');

  exampleCode = [
    '// product-form.component.ts',
    'export class ProductFormComponent {',
    "  imageUrl = 'https://cdn.example.com/headphones.jpg';",
    "  imageAlt = 'Wireless Headphones';",
    '  isSubmitting = false;',
    "  formStatus: 'valid' | 'invalid' = 'invalid';",
    '  stockLevel = 5;',
    '',
    '  get submitDisabled(): boolean {',
    "    return this.isSubmitting || this.formStatus === 'invalid';",
    '  }',
    '',
    '  get stockClass(): string {',
    "    return this.stockLevel > 0 ? 'in-stock' : 'out-of-stock';",
    '  }',
    '}',
    '',
    '<!-- product-form.component.html -->',
    '<img [src]="imageUrl" [alt]="imageAlt" [style.width.px]="300">',
    '<button [disabled]="submitDisabled" [class.loading]="isSubmitting">',
    '  {{ isSubmitting ? "Saving..." : "Save Product" }}',
    '</button>',
    '<span [class]="stockClass">',
    '  {{ stockLevel > 0 ? "In Stock" : "Out of Stock" }}',
    '</span>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is property binding in Angular?',
      a: 'Property binding is a one-way data-binding technique that sets a DOM element\'s property (or a child component\'s @Input property) to a TypeScript expression value. The syntax is [property]="expression". Angular evaluates the expression in the component\'s context and assigns the result to the target property, keeping it updated on every change detection cycle.',
    },
    {
      q: 'What is the difference between attribute binding and property binding?',
      a: 'HTML attributes initialise DOM elements (e.g., the value attribute sets the initial input value). DOM properties reflect current runtime state (e.g., the value property holds what the user typed). Property binding ([property]) targets DOM properties. Attribute binding ([attr.name]) is needed for attributes that have no corresponding DOM property, such as colspan, aria-*, and SVG attributes.',
    },
    {
      q: 'Why should you use [disabled]="flag" instead of disabled="{{ flag }}"?',
      a: 'The disabled DOM property expects a boolean. Interpolation always produces a string. disabled="false" (the string "false") still disables the element because any non-empty string is truthy in HTML. Property binding [disabled]="false" correctly removes the disabled attribute when the expression is the boolean false.',
    },
    {
      q: 'How does class binding work in Angular?',
      a: 'Angular provides three forms: [class.className]="boolExpr" — toggles a single class based on a boolean. [class]="stringExpr" — replaces the entire class attribute with a string. [ngClass]="objectOrArray" — conditionally adds/removes multiple classes. The first form is preferred for toggling individual classes cleanly.',
    },
    {
      q: 'How does style binding differ from inline styles?',
      a: '[style.property]="value" — binds a single CSS property to a dynamic value. [style.property.unit]="number" — binds a numeric value with a unit, e.g., [style.width.px]="300". [ngStyle]="object" — applies multiple styles from an object. These are preferable to inline styles because they respond to component data changes dynamically.',
    },
    {
      q: 'Can property binding be used to pass data to child components?',
      a: 'Yes. When a child component declares an @Input() property, the parent binds to it using [inputName]="value". For example, <app-user-card [user]="currentUser"> passes the currentUser object to the child\'s @Input() user property. This is the primary mechanism for parent-to-child communication in Angular.',
    },
  ];
}
