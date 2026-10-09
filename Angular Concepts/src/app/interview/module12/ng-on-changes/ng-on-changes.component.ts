import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng-on-changes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-on-changes.component.html',
  styleUrl: './ng-on-changes.component.css',
})
export class NgOnChangesComponent {
  syntaxCode = [
    'import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";',
    '',
    '@Component({',
    '  selector: "app-child",',
    '  templateUrl: "./child.component.html",',
    '})',
    'export class ChildComponent implements OnChanges {',
    '  @Input() userId!: number;',
    '  @Input() role!: string;',
    '',
    '  ngOnChanges(changes: SimpleChanges) {',
    '    // SimpleChanges is an object keyed by input property name',
    '    if (changes["userId"]) {',
    '      const change = changes["userId"];',
    '      console.log("Previous:", change.previousValue);',
    '      console.log("Current:", change.currentValue);',
    '      console.log("First change?", change.isFirstChange());',
    '',
    '      if (!change.isFirstChange()) {',
    '        // Only run when userId actually changes (not on first load)',
    '        this.loadUserProfile(change.currentValue);',
    '      }',
    '    }',
    '  }',
    '',
    '  loadUserProfile(id: number) { /* ... */ }',
    '}',
  ].join('\n');

  exampleCode = [
    '// Real-world: Product Detail component reacting to route param changes',
    '',
    '@Component({',
    '  selector: "app-product-detail",',
    '  templateUrl: "./product-detail.component.html",',
    '})',
    'export class ProductDetailComponent implements OnChanges {',
    '  @Input() productId!: string;',
    '  product: Product | null = null;',
    '  loading = false;',
    '',
    '  constructor(private productService: ProductService) {}',
    '',
    '  ngOnChanges(changes: SimpleChanges) {',
    '    const idChange = changes["productId"];',
    '    if (idChange && idChange.currentValue) {',
    '      this.loading = true;',
    '      this.productService.getById(idChange.currentValue)',
    '        .subscribe(p => {',
    '          this.product = p;',
    '          this.loading = false;',
    '        });',
    '    }',
    '  }',
    '}',
    '',
    '// Parent template:',
    '// <app-product-detail [productId]="selectedId"></app-product-detail>',
    '// Whenever selectedId changes in parent, ngOnChanges fires in child',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is ngOnChanges and when does it fire?',
      a: 'ngOnChanges is an Angular lifecycle hook that fires whenever one or more @Input() bound properties of a component change. It runs before ngOnInit on the first change detection cycle, and then again every time an @Input() value changes. It receives a SimpleChanges object which is a dictionary where each key is an @Input() property name and the value is a SimpleChange object containing previousValue, currentValue, and firstChange flag.',
    },
    {
      q: 'What is the SimpleChanges parameter in ngOnChanges?',
      a: 'SimpleChanges is a dictionary (object map) where each key is the name of an @Input() property and each value is a SimpleChange object. SimpleChange has three properties: previousValue (the old value before the change), currentValue (the new value after the change), and firstChange (boolean, true only the very first time this input gets a value). The isFirstChange() method is also available on each SimpleChange object and returns the same boolean as firstChange.',
    },
    {
      q: 'What is the difference between ngOnChanges and ngOnInit?',
      a: 'ngOnChanges fires before ngOnInit on first render and fires again every time an @Input() value changes — it can fire many times. ngOnInit fires only once, after the first ngOnChanges (if inputs exist) or after the component is initialized. ngOnChanges always receives the SimpleChanges map; ngOnInit receives nothing. Use ngOnChanges to react to input value changes dynamically; use ngOnInit for one-time initialization logic.',
    },
    {
      q: 'Does ngOnChanges fire for all property changes or only @Input() changes?',
      a: 'ngOnChanges fires ONLY when @Input()-decorated properties change. If you mutate a component\'s own non-input property (e.g., this.title = "new"), ngOnChanges does NOT fire. Also, ngOnChanges does NOT fire for changes to object properties or array elements (shallow comparison) — if you pass an object reference and mutate it without creating a new reference, Angular\'s change detection will not detect the change and ngOnChanges will not trigger. You must replace the object reference to trigger ngOnChanges.',
    },
    {
      q: 'How do you prevent unnecessary API calls on first load in ngOnChanges?',
      a: 'Use the isFirstChange() method on the SimpleChange object. If isFirstChange() returns true, it means this is the initial binding (same as ngOnInit for this input). You can guard the API call: if (!changes["inputName"].isFirstChange()) { // make API call }. Alternatively, load initial data in ngOnInit() and use ngOnChanges only for subsequent changes — a clean separation of concerns.',
    },
    {
      q: 'Why does ngOnChanges not detect mutations to objects or arrays?',
      a: 'Angular\'s change detection performs a reference equality check (===) on @Input() bindings. If you pass an object or array and mutate its contents without changing the reference, the reference stays the same — Angular sees the same object pointer and does not trigger ngOnChanges. The solution is immutability: always create a new object/array reference when the data changes (spread operator, Object.assign, array.slice()). This is why the OnPush strategy works well with immutable data patterns.',
    },
  ];
}
