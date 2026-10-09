import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component-communication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-communication.component.html',
  styleUrl: './component-communication.component.css',
})
export class ComponentCommunicationComponent {
  syntaxCode = [
    '// ── 1. Parent → Child via @Input ──────────────────────────',
    "import { Input } from '@angular/core';",
    "// child:  @Input() product!: Product;",
    '// parent: <app-product-card [product]="selectedProduct">',
    '',
    '// ── 2. Child → Parent via @Output / EventEmitter ──────────',
    "import { Output, EventEmitter } from '@angular/core';",
    '// child:  @Output() addToCart = new EventEmitter<Product>();',
    '//         this.addToCart.emit(this.product);',
    '// parent: <app-product-card (addToCart)="onAddToCart($event)">',
    '',
    '// ── 3. Sibling / Cross-tree via Shared Service ─────────────',
    "import { Injectable } from '@angular/core';",
    "import { BehaviorSubject } from 'rxjs';",
    '@Injectable({ providedIn: \'root\' })',
    'export class CartService {',
    '  private cartItems$ = new BehaviorSubject<Product[]>([]);',
    '  cart$ = this.cartItems$.asObservable();',
    '  addItem(p: Product) { this.cartItems$.next([...this.cartItems$.getValue(), p]); }',
    '}',
    '',
    '// ── 4. Parent → Child reference via @ViewChild ─────────────',
    "import { ViewChild } from '@angular/core';",
    '// parent:  @ViewChild(CartComponent) cartRef!: CartComponent;',
    '//          ngAfterViewInit() { this.cartRef.refresh(); }',
  ].join('\n');

  exampleCode = [
    '// Shopping Cart — component communication demo',
    '',
    '// 1. product-card.component.ts (child)',
    '@Component({ selector: \'app-product-card\', standalone: true, template: \'...\' })',
    'export class ProductCardComponent {',
    '  @Input() product!: { id: number; name: string; price: number };',
    '  @Output() addToCart = new EventEmitter<{ id: number; name: string; price: number }>();',
    '',
    '  onAdd() {',
    '    this.addToCart.emit(this.product);',
    '  }',
    '}',
    '',
    '// 2. cart.service.ts (shared state for siblings)',
    '@Injectable({ providedIn: \'root\' })',
    'export class CartService {',
    '  private items = new BehaviorSubject<any[]>([]);',
    '  items$ = this.items.asObservable();',
    '  add(item: any) { this.items.next([...this.items.getValue(), item]); }',
    '}',
    '',
    '// 3. product-list.component.ts (parent)',
    'export class ProductListComponent {',
    '  products = [{ id: 1, name: \'Laptop\', price: 999 }];',
    '  constructor(private cart: CartService) {}',
    '  onAddToCart(product: any) { this.cart.add(product); }',
    '}',
    '',
    '// 3. product-list.component.html',
    '<app-product-card',
    '  *ngFor="let p of products"',
    '  [product]="p"',
    '  (addToCart)="onAddToCart($event)">',
    '</app-product-card>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What are the four main ways components communicate in Angular?',
      a: '(1) Parent to Child — via @Input property binding; (2) Child to Parent — via @Output EventEmitter; (3) Sibling or any component — via a shared service using RxJS Subjects/BehaviorSubjects; (4) Parent accessing child directly — via @ViewChild or @ContentChild. For deeply nested components, Angular Signals (16+) or a state management library (NgRx, Akita) is also an option.',
    },
    {
      q: 'When should you use a shared service for communication instead of @Input/@Output?',
      a: 'Use @Input/@Output for direct parent-child communication — it is explicit and easy to test. Use a shared service when: (1) components are siblings (no direct parent-child relationship); (2) components are deeply nested and prop-drilling through multiple levels would be ugly; (3) multiple unrelated components need the same state. Services with RxJS BehaviorSubject act as a mini state store.',
    },
    {
      q: 'What is the difference between @ViewChild and @ContentChild?',
      a: '@ViewChild accesses elements or child components declared in the component\'s own template. @ContentChild accesses elements projected into the component via <ng-content>. @ViewChild becomes available in ngAfterViewInit; @ContentChild becomes available in ngAfterContentInit. If you try to use them before their respective lifecycle hooks, they will be undefined.',
    },
    {
      q: 'Can a child component directly modify a parent\'s property?',
      a: 'You should never directly modify parent properties from a child — this breaks unidirectional data flow and makes the app hard to debug. Instead, the child emits an event via @Output EventEmitter, and the parent listens and updates its own property. This pattern keeps data flow predictable and components loosely coupled.',
    },
    {
      q: 'How does two-way data binding work with [(ngModel)] and how can you build a custom two-way binding?',
      a: '[(ngModel)] is syntactic sugar for [ngModel]="value" (property binding) combined with (ngModelChange)="value = $event" (event binding). For custom two-way binding in a component, create an @Input() named value and an @Output() named valueChange (the Change suffix is the convention). The parent can then use [(value)]="myVar" as shorthand for [value]="myVar" (valueChange)="myVar=$event".',
    },
    {
      q: 'What is prop drilling and how does Angular help avoid it?',
      a: 'Prop drilling is passing data through many layers of @Input bindings just to reach a deeply nested component. Angular avoids it through: (1) Shared services with RxJS observables; (2) Angular Signals with signal-based stores (Angular 16+); (3) Dependency injection — child components can inject a service provided by an ancestor without passing data through intermediate components; (4) State management libraries like NgRx.',
    },
  ];
}
