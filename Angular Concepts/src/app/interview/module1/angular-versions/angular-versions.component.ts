import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angular-versions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular-versions.component.html',
  styleUrl: './angular-versions.component.css',
})
export class AngularVersionsComponent {
  syntaxCode = [
    '// AngularJS 1.x — Controller + $scope (JavaScript)',
    'angular.module("myApp", [])',
    '  .controller("MyCtrl", function($scope) {',
    '    $scope.name = "World";',
    '    $scope.greet = function() {',
    '      alert("Hello " + $scope.name);',
    '    };',
    '  });',
    '// Template: <div ng-controller="MyCtrl">',
    '//   <input ng-model="name" /><button ng-click="greet()">Go</button>',
    '// </div>',
    '',
    '// Angular 2+ — Component + Decorator (TypeScript)',
    '@Component({',
    '  selector: "app-root",',
    '  template: `<input [(ngModel)]="name" />',
    '             <button (click)="greet()">Go</button>`',
    '})',
    'export class AppComponent {',
    '  name = "World";',
    '  greet() { alert("Hello " + this.name); }',
    '}',
  ].join('\n');

  exampleCode = [
    '// Angular Version Timeline & Key Features',
    '',
    '// Angular 2  (Sep 2016) — Complete rewrite, TypeScript, Components',
    '// Angular 4  (Mar 2017) — Smaller bundles, router guard improvements',
    '// Angular 5  (Nov 2017) — HttpClient, build optimizer',
    '// Angular 6  (May 2018) — Angular Elements, ng add, CLI workspaces',
    '// Angular 7  (Oct 2018) — Virtual scrolling, drag-and-drop CDK',
    '// Angular 8  (May 2019) — Ivy preview, dynamic imports, web workers',
    '// Angular 9  (Feb 2020) — Ivy default, smaller bundles',
    '// Angular 10 (Jun 2020) — TypeScript 3.9, strict mode',
    '// Angular 11 (Nov 2020) — Faster builds, webpack 5',
    '// Angular 12 (May 2021) — Ivy everywhere, Tailwind support',
    '// Angular 13 (Nov 2021) — No IE11, inline fonts, ESM',
    '// Angular 14 (Jun 2022) — Standalone components (preview), typed forms',
    '// Angular 15 (Nov 2022) — Standalone stable, directive composition',
    '// Angular 16 (May 2023) — Signals stable, SSR improvements',
    '// Angular 17 (Nov 2023) — @defer, @if, @for new template syntax',
    '// Angular 18 (May 2024) — Zoneless change detection, Material 3',
    '// Angular 19 (Nov 2024) — Incremental hydration, linked signals',
  ].join('\n');

  interviewQA = [
    {
      q: 'What are the major differences between AngularJS and Angular?',
      a: 'AngularJS uses a controller + $scope MVC pattern with JavaScript, while Angular uses component-based architecture with TypeScript. AngularJS uses dirty-checking for change detection ($digest cycle), while Angular uses Zone.js and Ivy. Angular has a proper module system, CLI, better performance, mobile support, and TypeScript\'s type safety. AngularJS is in long-term support (LTS ended Dec 2021).',
    },
    {
      q: 'Why did Angular skip version 3?',
      a: 'Angular skipped version 3 to align the version numbers of the core packages. The @angular/router package was already at version 3 when Angular 2 shipped, so the team skipped to version 4 to make all @angular/* packages version-consistent and avoid confusion in the ecosystem.',
    },
    {
      q: 'What were the key improvements introduced in Angular 9 (Ivy)?',
      a: 'Angular 9 made Ivy the default compilation and rendering pipeline. Ivy produces smaller bundle sizes through better tree-shaking, enables faster testing (no TestBed needed for simple component tests), provides better error messages with source-mapped stack traces, enables incremental compilation for faster rebuilds, and allows more powerful metaprogramming with component factories.',
    },
    {
      q: 'What are Angular Signals introduced in Angular 16?',
      a: 'Signals are a reactive primitive introduced as an alternative to Zone.js-based change detection. A signal is a wrapper around a value that notifies consumers when the value changes. They enable fine-grained reactivity — Angular can update only the specific DOM nodes that depend on a changed signal, rather than checking the entire component tree. Signals work toward making Angular zoneless.',
    },
    {
      q: 'What are standalone components introduced in Angular 15?',
      a: 'Standalone components eliminate the need for NgModule. Instead of declaring a component in a module, you mark it with standalone: true and import its dependencies directly in the component decorator. This simplifies the mental model, reduces boilerplate, and makes components more portable. Angular 17+ generates standalone components by default in the CLI.',
    },
    {
      q: 'What is the new template syntax introduced in Angular 17?',
      a: 'Angular 17 introduced built-in control flow syntax: @if/@else instead of *ngIf, @for instead of *ngFor, and @switch instead of ngSwitch. It also added @defer for declarative lazy loading of template blocks. The new syntax is more readable, supports better type inference, and does not require importing CommonModule for basic directives.',
    },
  ];
}
