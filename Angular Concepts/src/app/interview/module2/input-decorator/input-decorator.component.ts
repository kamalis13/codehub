import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-decorator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-decorator.component.html',
  styleUrl: './input-decorator.component.css',
})
export class InputDecoratorComponent {
  syntaxCode = [
    "import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';",
    '',
    '// Basic @Input',
    '@Input() title: string = \'\';',
    '',
    '// @Input with alias (parent uses \'productData\', class uses \'product\')',
    "@Input('productData') product!: Product;",
    '',
    '// @Input with required (Angular 16+)',
    "@Input({ required: true }) userId!: string;",
    '',
    '// @Input with transform (Angular 16.1+)',
    "@Input({ transform: booleanAttribute }) disabled = false;",
    "@Input({ transform: numberAttribute }) count = 0;",
    '',
    '// Reacting to @Input changes with ngOnChanges',
    'ngOnChanges(changes: SimpleChanges) {',
    "  if (changes['userId']) {",
    '    const prev = changes[\'userId\'].previousValue;',
    '    const curr = changes[\'userId\'].currentValue;',
    '    console.log(`userId changed from ${prev} to ${curr}`);',
    '    this.loadUser(curr);',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// product-card.component.ts — receives product data from parent',
    "import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';",
    '',
    'interface Product {',
    '  id: number;',
    '  name: string;',
    '  price: number;',
    '  inStock: boolean;',
    '}',
    '',
    "@Component({ selector: 'app-product-card', standalone: true, template: `",
    '  <div class="card" [class.out-of-stock]="!product.inStock">',
    '    <h3>{{ product.name }}</h3>',
    '    <p>Price: {{ product.price | currency }}</p>',
    "    <span>{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</span>",
    '  </div>',
    '` })',
    'export class ProductCardComponent implements OnChanges {',
    '  @Input({ required: true }) product!: Product;',
    '',
    '  ngOnChanges(changes: SimpleChanges) {',
    "    if (changes['product']) {",
    '      console.log(\'Product updated:\', changes[\'product\'].currentValue);',
    '    }',
    '  }',
    '}',
    '',
    '// parent template',
    '<app-product-card [product]="selectedProduct"></app-product-card>',
    '<app-product-card [product]="{ id:2, name:\'Tablet\', price:499, inStock:true }">',
    '</app-product-card>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is @Input and how does it enable data flow in Angular?',
      a: '@Input is a decorator that marks a class property as an input binding, allowing a parent component to pass data to a child. It implements one-way data flow: data flows from parent to child via property binding [childProp]="parentValue". The child receives the value but should never mutate it directly — mutations should flow back up via @Output events.',
    },
    {
      q: 'How do you use an alias with @Input and why would you need one?',
      a: 'You use an alias by passing a string to @Input: @Input(\'externalName\') internalName. The parent binds to the alias ([externalName]="value") while the component class uses internalName internally. Aliases are useful when: (1) the public API name should differ from the internal property name; (2) avoiding name collisions; (3) maintaining a stable public API while refactoring internals.',
    },
    {
      q: 'What is the required option in @Input and when was it introduced?',
      a: 'Angular 16 introduced @Input({ required: true }) which makes an input mandatory. If a parent does not provide the input, Angular throws a compile-time error rather than silently using an undefined value. This is preferable to using TypeScript\'s ! non-null assertion alone because Angular itself enforces the constraint at the template level.',
    },
    {
      q: 'Why should you not mutate @Input properties?',
      a: 'Mutating @Input properties breaks unidirectional data flow — the parent owns the data and does not know the child changed it. This causes state inconsistencies, especially with OnPush change detection (which only checks reference equality). It also makes bugs hard to trace. Instead, emit changes via @Output EventEmitter so the parent can decide whether to update its own state.',
    },
    {
      q: 'How do you detect when an @Input value changes?',
      a: 'Three approaches: (1) Implement OnChanges and use ngOnChanges(changes: SimpleChanges) — fires for every @Input change with previous and current values; (2) Use a setter: set myInput(val: string) { this._val = val; this.onInputChanged(val); } — fires on each assignment; (3) Use Angular Signals with input() (Angular 17+) and computed() to reactively derive values. The setter approach is most flexible for a single input.',
    },
    {
      q: 'What is the difference between @Input() and the new input() signal function in Angular 17+?',
      a: 'The classic @Input() decorator is imperative — you use ngOnChanges to react to changes. The new signal-based input() function (Angular 17+) returns a Signal: title = input<string>(\'default\'). You can then use computed() to derive values reactively without ngOnChanges. Signal inputs also work seamlessly with OnPush change detection and Angular\'s fine-grained reactivity system.',
    },
  ];
}
