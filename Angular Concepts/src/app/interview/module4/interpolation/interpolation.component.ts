import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interpolation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interpolation.component.html',
  styleUrl: './interpolation.component.css',
})
export class InterpolationComponent {
  syntaxCode = [
    '<!-- Basic property interpolation -->',
    '<h1>{{ title }}</h1>',
    '',
    '<!-- Method call -->',
    '<p>{{ getFullName() }}</p>',
    '',
    '<!-- Object property -->',
    '<span>{{ user.email }}</span>',
    '',
    '<!-- Arithmetic expression -->',
    '<p>Total: {{ price * quantity }}</p>',
    '',
    '<!-- Ternary expression -->',
    '<p>{{ isLoggedIn ? "Welcome!" : "Please log in" }}</p>',
    '',
    '<!-- String concatenation -->',
    '<p>{{ firstName + " " + lastName }}</p>',
    '',
    '<!-- Pipe usage -->',
    '<p>{{ birthday | date:"longDate" }}</p>',
  ].join('\n');

  exampleCode = [
    '// product-card.component.ts',
    'export class ProductCardComponent {',
    "  productName = 'Wireless Headphones';",
    '  price = 2999;',
    '  discount = 0.1;',
    '  inStock = true;',
    '  rating = 4.5;',
    '',
    '  get finalPrice(): number {',
    '    return this.price * (1 - this.discount);',
    '  }',
    '',
    '  getStarLabel(): string {',
    "    return `${this.rating} / 5.0 stars`;",
    '  }',
    '}',
    '',
    '<!-- product-card.component.html -->',
    '<div class="product-card">',
    '  <h2>{{ productName }}</h2>',
    '  <p class="price">₹{{ finalPrice }}</p>',
    '  <p>{{ getStarLabel() }}</p>',
    '  <span>{{ inStock ? "In Stock" : "Out of Stock" }}</span>',
    '</div>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is interpolation in Angular?',
      a: 'Interpolation is a one-way data-binding technique that embeds TypeScript expressions into HTML templates using double curly braces {{ }}. Angular evaluates the expression and converts the result to a string, updating the DOM whenever the bound value changes. It is the simplest form of template binding.',
    },
    {
      q: 'What kinds of expressions can you use inside {{ }}?',
      a: 'You can use: property access (user.name), method calls (getTitle()), arithmetic (+, -, *, /), ternary operators, template literals via method calls, string concatenation, and pipe transformations (value | pipe). You cannot use: assignments (=, +=), new keyword, increment/decrement operators (++/--), bitwise operators, or multi-line statements.',
    },
    {
      q: 'How is interpolation different from property binding?',
      a: 'Interpolation {{ value }} always produces a string and is best for inserting text content into the DOM. Property binding [property]="value" sets a DOM property to any type (string, boolean, number, object). For example, [disabled]="isDisabled" works correctly because disabled is a boolean DOM property; using {{ isDisabled }} would set it to the string "true"/"false", not the boolean.',
    },
    {
      q: 'Can you use Angular pipes inside interpolation?',
      a: 'Yes. Pipes are used by appending | pipeName inside the double braces: {{ price | currency:"INR" }} or {{ date | date:"longDate" }}. Pipes transform the display value without mutating the original data. You can chain multiple pipes: {{ text | uppercase | slice:0:20 }}.',
    },
    {
      q: 'What are the security implications of interpolation?',
      a: 'Angular automatically sanitises interpolated values against XSS (cross-site scripting). If a value contains HTML tags, Angular HTML-encodes them before rendering — the tags are displayed as plain text, not executed as HTML. This prevents script injection. If you intentionally need to render HTML, use [innerHTML] with the DomSanitizer service instead.',
    },
    {
      q: 'When should you move logic from interpolation to the component class?',
      a: 'Move logic to the component when: (1) the expression is used more than once, (2) it involves complex computation better memoised with a getter or method, (3) it is difficult to read/test inline, or (4) it involves side effects. Templates should express what to display; components should express how to compute it. Heavy calculations in templates also execute on every change detection cycle.',
    },
  ];
}
