import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngfor-dir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngfor-dir.component.html',
  styleUrl: './ngfor-dir.component.css'
})
export class NgforDirComponent {

  syntaxCode = [
    '// Basic *ngFor',
    '<li *ngFor="let item of items">{{ item.name }}</li>',
    '',
    '// With index and local variables',
    '<li *ngFor="let item of items;',
    '            let i = index;',
    '            let first = first;',
    '            let last = last;',
    '            let even = even;',
    '            let odd = odd">',
    '  [{{ i }}] {{ item.name }}',
    '  <span *ngIf="first">(First!)</span>',
    '  <span *ngIf="last">(Last!)</span>',
    '</li>',
    '',
    '// With trackBy for performance',
    '<li *ngFor="let item of items; trackBy: trackById">',
    '  {{ item.name }}',
    '</li>',
    '',
    '// In component class',
    'trackById(index: number, item: Item): number {',
    '  return item.id;',
    '}',
  ].join('\n');

  exampleCode = [
    '// products.component.ts',
    'export class ProductsComponent {',
    '  products = [',
    "    { id: 1, name: 'Laptop', price: 999 },",
    "    { id: 2, name: 'Phone', price: 699 },",
    "    { id: 3, name: 'Tablet', price: 499 },",
    '  ];',
    '',
    '  // Nested ngFor',
    '  categories = [',
    "    { name: 'Electronics', items: ['Laptop', 'Phone'] },",
    "    { name: 'Clothing', items: ['Shirt', 'Pants'] },",
    '  ];',
    '',
    '  trackById(index: number, product: any): number {',
    '    return product.id;',
    '  }',
    '}',
    '',
    '// Template',
    '<div *ngFor="let product of products; let i = index; trackBy: trackById"',
    '     [class.even-row]="i % 2 === 0">',
    '  {{ i + 1 }}. {{ product.name }} — ${{ product.price }}',
    '</div>',
    '',
    '// Nested *ngFor',
    '<div *ngFor="let cat of categories">',
    '  <h3>{{ cat.name }}</h3>',
    '  <span *ngFor="let item of cat.items">{{ item }} | </span>',
    '</div>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is *ngFor and what local variables does it expose?',
      a: '*ngFor is a structural directive that renders a template for each item in an iterable. It exposes: index (position), first (boolean), last (boolean), even (boolean), odd (boolean), and count (total items). These are declared with "let varName = variable" inside the *ngFor expression.'
    },
    {
      q: 'What is trackBy and why is it critical for performance?',
      a: "Without trackBy, Angular re-renders all list items whenever the array changes, even if only one item changed. trackBy provides a unique identity function — Angular uses the returned key to identify which items changed, added, or removed. Only those items' DOM nodes are updated, significantly improving performance for large lists."
    },
    {
      q: 'How do you implement a trackBy function?',
      a: 'trackBy is a method on the component class: trackById(index: number, item: MyType): number { return item.id; }. In the template: *ngFor="let item of items; trackBy: trackById". The function receives the index and the item, and must return a unique primitive value (usually the item id).'
    },
    {
      q: 'Can you use *ngFor with non-array iterables?',
      a: '*ngFor works with any JavaScript iterable — arrays, Sets, and anything that implements the Iterable protocol. For Objects/Maps, you need to transform them first: use a keyvalue pipe (for Objects), or Array.from(map.entries()), etc. *ngFor does not work directly on plain Objects.'
    },
    {
      q: 'How do you handle nested *ngFor?',
      a: 'Apply *ngFor to the parent and child elements. Each *ngFor is scoped to its element: <div *ngFor="let cat of categories"><span *ngFor="let item of cat.items">. Variables from the outer loop (cat) are accessible in the inner loop. Be careful about performance — nested loops are O(n*m).'
    },
    {
      q: 'What happens to the DOM when you mutate an array vs. reassigning it?',
      a: 'Without trackBy: both mutation (push, splice) and reassignment cause Angular to re-render the list. With trackBy: reassigning a new array reference triggers re-evaluation of trackBy keys — only items with new/changed keys are re-rendered. Direct mutation (push/splice) on an existing array also triggers change detection in Default strategy but not in OnPush (where you need a new reference).'
    },
    {
      q: 'How do you style alternate rows with *ngFor?',
      a: "Use the even and odd local variables: <li *ngFor=\"let item of items; let even = even\" [class.even]=\"even\">. This applies the 'even' CSS class to every other row. Alternatively, use [ngClass]=\"{ 'even-row': even, 'odd-row': odd }\" for multiple class conditions."
    },
  ];
}
