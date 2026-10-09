import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-binding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './two-way-binding.component.html',
  styleUrl: './two-way-binding.component.css',
})
export class TwoWayBindingComponent {
  syntaxCode = [
    '<!-- Two-way binding with ngModel (FormsModule required) -->',
    '<input [(ngModel)]="username" placeholder="Enter username">',
    '<p>Hello, {{ username }}</p>',
    '',
    '<!-- ngModel is shorthand for: -->',
    '<input',
    '  [ngModel]="username"',
    '  (ngModelChange)="username = $event"',
    '  placeholder="Enter username">',
    '',
    '<!-- Select element -->',
    '<select [(ngModel)]="selectedCountry">',
    '  <option *ngFor="let c of countries" [value]="c.code">{{ c.name }}</option>',
    '</select>',
    '',
    '<!-- Checkbox -->',
    '<input type="checkbox" [(ngModel)]="isTermsAccepted"> Accept Terms',
    '',
    '<!-- Custom component two-way binding -->',
    '<app-counter [(count)]="cartItemCount"></app-counter>',
  ].join('\n');

  exampleCode = [
    '// search-bar.component.ts',
    "import { FormsModule } from '@angular/forms';",
    '',
    '@Component({',
    "  selector: 'app-search-bar',",
    '  standalone: true,',
    '  imports: [FormsModule, CommonModule],',
    "  template: `",
    '    <input [(ngModel)]="searchQuery"',
    '           (ngModelChange)="onSearch($event)"',
    '           placeholder="Search products...">',
    '    <p *ngIf="searchQuery">Searching for: {{ searchQuery }}</p>',
    '    <button (click)="clearSearch()">Clear</button>',
    '  `',
    '})',
    'export class SearchBarComponent {',
    "  searchQuery = '';",
    '',
    '  onSearch(query: string): void {',
    '    this.productService.search(query);',
    '  }',
    '',
    '  clearSearch(): void {',
    "    this.searchQuery = '';",
    '  }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is two-way binding in Angular and what is the "banana in a box" syntax?',
      a: '[(ngModel)] is called "banana in a box" — the parentheses () represent event binding (banana) nested inside square brackets [] representing property binding (box). Together they create two-way data flow: [ngModel] pushes the component value to the input, and (ngModelChange) pushes the input value back to the component property on every change.',
    },
    {
      q: 'Why must FormsModule be imported for [(ngModel)] to work?',
      a: 'ngModel is a directive provided by FormsModule (@angular/forms). Without importing FormsModule in the module or standalone component\'s imports array, Angular does not recognise [(ngModel)] and throws a template compilation error: "Can\'t bind to \'ngModel\' since it isn\'t a known property of \'input\'".',
    },
    {
      q: 'How does Angular internally implement [(ngModel)]?',
      a: '[(ngModel)] desugars to [ngModel]="property" (NgModel directive reads this as the value to set on the input) + (ngModelChange)="property = $event" (NgModel emits the new input value through ngModelChange). Angular\'s NgModel directive bridges the DOM input event to the ngModelChange output EventEmitter, completing the two-way cycle.',
    },
    {
      q: 'What is the difference between Template-driven forms (ngModel) and Reactive Forms?',
      a: 'Template-driven forms use [(ngModel)] and directives in the template; the form model is created implicitly by Angular. They are simple but harder to test and scale. Reactive Forms use FormGroup and FormControl defined in the component class; the template just binds to the model. Reactive Forms are more powerful — easier to validate, test, and handle complex dynamic forms.',
    },
    {
      q: 'Can you create a custom two-way binding for your own component?',
      a: 'Yes. Define an @Input() count property and an @Output() countChange EventEmitter. When the input changes internally, emit the new value: this.countChange.emit(newValue). The parent can then use [(count)]="cartItemCount". This is the Angular convention: @Output must be named exactly as the @Input name followed by "Change".',
    },
    {
      q: 'Why is two-way binding harder to debug than one-way binding?',
      a: 'Two-way binding creates a circular data flow — component → template → component. If either side mutates the value unexpectedly (e.g., a pipe or directive transforms it), tracking the source of a bug requires checking both directions. One-way binding (property + event separately) makes data flow explicit and traceable. Reactive Forms encourage one-way flow with valueChanges observables.',
    },
  ];
}
