import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-by',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-by.component.html',
  styleUrl: './track-by.component.css',
})
export class TrackByComponent {
  definition = 'trackBy is a function passed to *ngFor that returns a unique identifier for each item. Angular uses this identifier to track items across list mutations, reusing existing DOM nodes instead of destroying and recreating all of them when the array changes.';

  whyNeeded = 'Without trackBy, when an array reference changes (even with the same data), Angular destroys ALL existing DOM nodes and recreates them from scratch. For large lists (100+ items), this causes visible jank and unnecessary layout/paint operations. trackBy tells Angular which items changed so it can surgically update only those.';

  syntaxCode = [
    '// component.ts',
    'products = [',
    '  { id: 1, name: "Laptop", price: 999 },',
    '  { id: 2, name: "Phone", price: 599 },',
    '];',
    '',
    '// trackBy function — returns the unique identifier',
    'trackByProductId(index: number, product: Product): number {',
    '  return product.id;',
    '}',
    '',
    '// component.html',
    '<div *ngFor="let product of products; trackBy: trackByProductId">',
    '  {{ product.name }} — {{ product.price | currency }}',
    '</div>',
  ].join('\n');

  exampleCode = [
    '// Real-world: refreshing product list from API',
    '// WITHOUT trackBy — all 500 DOM nodes destroyed and recreated on every refresh',
    '<tr *ngFor="let item of items">',
    '  <td>{{ item.name }}</td>',
    '</tr>',
    '',
    '// WITH trackBy — only updated rows are touched',
    '<tr *ngFor="let item of items; trackBy: trackById">',
    '  <td>{{ item.name }}</td>',
    '</tr>',
    '',
    'trackById(index: number, item: Item): number {',
    '  return item.id; // Angular diffs by id, not object reference',
    '}',
    '',
    '// Performance difference on 1000-item list:',
    '// Without trackBy: ~85ms render (destroy + create 1000 nodes)',
    '// With trackBy:     ~2ms render (update only changed 3 rows)',
  ].join('\n');

  internalWorking = 'Angular\'s *ngFor directive maintains an internal differ that tracks items using the trackBy return value as a key. On each change detection cycle, it builds a new key map and compares it with the previous one. Items with matching keys have their existing DOM nodes reused and only their bound properties updated. New keys cause node creation; removed keys cause node destruction. Without trackBy, object references are used as keys — a new array always triggers full re-render.';

  advantages = [
    'Prevents unnecessary DOM destruction and recreation',
    'Dramatically improves rendering performance for large lists',
    'Preserves DOM state (scroll position, focus, CSS transitions)',
    'Reduces memory churn and garbage collection pauses',
    'Works with any unique identifier — id, name, index, etc.',
    'Compatible with animations and CDK virtual scrolling',
  ];

  disadvantages = [
    'Requires a unique identifier on each item (needs backend cooperation)',
    'Using index as trackBy key negates most benefits (still recreates on reorder)',
    'Adds a small amount of boilerplate per *ngFor usage',
    'If IDs are not truly unique, can cause display bugs',
  ];

  bestPractices = [
    'Always use trackBy for lists longer than 20–30 items',
    'Use the database primary key (id) as the trackBy identifier',
    'Never use array index as trackBy — it defeats the purpose on reorder/insert',
    'Define trackBy functions in the component class, not as inline lambdas',
    'Combine with OnPush change detection for maximum performance',
    'Use trackBy in CDK virtual scroll viewports as well',
  ];

  commonMistakes = [
    'Using index as trackBy (trackByIndex) — does not help with reorder/insert operations',
    'Not using trackBy on large API-driven lists that refresh frequently',
    'Using non-unique identifiers — causes Angular to incorrectly reuse DOM nodes',
    'Skipping trackBy for lists that have animations (causes flicker)',
    'Defining trackBy as an arrow function in the template (causes re-evaluation every cycle)',
  ];

  interviewQA = [
    {
      q: 'What is trackBy in Angular and why is it important?',
      a: 'trackBy is a function passed to *ngFor that returns a unique key for each list item. Angular uses these keys to identify which items changed, allowing it to reuse existing DOM nodes instead of destroying and recreating all of them. Critical for performance on large or frequently updated lists.'
    },
    {
      q: 'What happens without trackBy when an array is reassigned?',
      a: 'Without trackBy, Angular uses object references as keys. When a new array is assigned (even with the same data), every object reference is new, so Angular destroys ALL existing DOM nodes and recreates them from scratch, causing unnecessary layout and paint work.'
    },
    {
      q: 'Why is using array index as trackBy value a bad practice?',
      a: 'Array index does not uniquely identify the data. When items are reordered, inserted at the beginning, or deleted from the middle, the index of every subsequent item changes, causing Angular to recreate most DOM nodes anyway — offering no benefit over no trackBy.'
    },
    {
      q: 'How does Angular\'s list differ work internally with trackBy?',
      a: 'Angular\'s IterableDiffer builds a map from trackBy keys to current items. On each CD cycle, it compares the new key map with the previous one: matching keys reuse DOM nodes (only updating bindings), new keys create nodes, and missing keys remove nodes.'
    },
    {
      q: 'Can you combine trackBy with OnPush change detection?',
      a: 'Yes, and it is the recommended combination. OnPush prevents unnecessary change detection cycles, and trackBy prevents unnecessary DOM operations within those cycles. Together they provide maximum rendering performance for list-heavy components.'
    },
    {
      q: 'What is the correct way to define a trackBy function?',
      a: 'Define it as a method in the component class: trackById(index: number, item: Item): number { return item.id; }. Then bind it in the template: *ngFor="let item of items; trackBy: trackById". Avoid inline arrow functions in the template as they create new function references on every change detection cycle.'
    },
  ];
}
