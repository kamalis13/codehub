import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-what-is-angular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './what-is-angular.component.html',
  styleUrl: './what-is-angular.component.css',
})
export class WhatIsAngularComponent {
  syntaxCode = [
    'import { Component } from "@angular/core";',
    '',
    '@Component({',
    '  selector: "app-root",',
    '  templateUrl: "./app.component.html",',
    '  styleUrl: "./app.component.css",',
    '})',
    'export class AppComponent {',
    '  title = "my-angular-app";',
    '  count = 0;',
    '',
    '  increment() {',
    '    this.count++;',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// E-commerce SPA — ProductListComponent',
    '@Component({',
    '  selector: "app-product-list",',
    '  templateUrl: "./product-list.component.html",',
    '})',
    'export class ProductListComponent implements OnInit {',
    '  products: Product[] = [];',
    '',
    '  constructor(',
    '    private productService: ProductService,',
    '    private cartService: CartService,',
    '  ) {}',
    '',
    '  ngOnInit() {',
    '    this.productService.getAll().subscribe(p => this.products = p);',
    '  }',
    '',
    '  addToCart(product: Product) {',
    '    this.cartService.add(product);',
    '  }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is Angular and who develops it?',
      a: 'Angular is a TypeScript-based open-source web application framework developed and maintained by Google. It is a complete platform for building scalable single-page applications (SPAs), providing built-in solutions for routing, forms, HTTP communication, dependency injection, and testing — all without needing additional third-party libraries.',
    },
    {
      q: 'What is the difference between Angular and AngularJS?',
      a: 'AngularJS (1.x) is a JavaScript MVC framework using $scope, controllers, and two-way data binding via dirty checking. Angular (2+) is a complete rewrite using TypeScript, a component-based architecture, decorators, and a hierarchical DI system. Angular 2+ also uses the Ivy compiler, AOT compilation, and Zone.js for change detection — making it fundamentally different from AngularJS.',
    },
    {
      q: 'Is Angular a framework or a library?',
      a: 'Angular is a full-fledged, opinionated framework — not just a library. Unlike React (UI library), Angular provides everything out of the box: Angular Router for navigation, HttpClient for HTTP, ReactiveForms for form handling, Jasmine/Karma for testing, and the Angular CLI for tooling. You adopt Angular as a platform, not just a rendering engine.',
    },
    {
      q: 'What are the key features of Angular?',
      a: 'Angular offers component-based architecture, two-way data binding, a hierarchical dependency injection system, TypeScript-first development, the Angular CLI, AOT compilation with Ivy, lazy loading, RxJS-based reactive programming, Angular Material for UI components, and comprehensive testing tools — making it an all-in-one enterprise-ready framework.',
    },
    {
      q: 'What is Zone.js and why does Angular use it?',
      a: 'Zone.js is a library that monkey-patches browser async APIs (setTimeout, Promise, DOM events) to intercept asynchronous operations. Angular uses Zone.js to automatically trigger change detection after any async event completes — so developers do not need to manually notify Angular when data changes. With Angular 18+, zoneless mode is available using signals.',
    },
    {
      q: 'What is the Ivy compiler in Angular?',
      a: 'Ivy is Angular\'s next-generation compilation and rendering pipeline introduced in Angular 9 as the default. Ivy compiles Angular templates into highly optimized JavaScript instructions that directly manipulate the DOM, resulting in smaller bundle sizes, faster compilation, better tree-shaking, improved debugging, and incremental compilation support.',
    },
  ];
}
