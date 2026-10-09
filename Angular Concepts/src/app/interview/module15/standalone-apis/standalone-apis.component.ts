import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standalone-apis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standalone-apis.component.html',
  styleUrl: './standalone-apis.component.css',
})
export class StandaloneApisComponent {
  definition = 'Standalone APIs allow Angular components, directives, and pipes to be self-contained without requiring an NgModule. A standalone component declares its own imports array directly, bootstraps the application via bootstrapApplication(), and uses provider functions (provideRouter, provideHttpClient) instead of module-level imports.';

  whyNeeded = 'NgModules added boilerplate and indirection — every component needed a module, and modules needed to import/export other modules. Standalone APIs eliminate NgModules as the mandatory organizational unit, reduce boilerplate by 40-60%, enable better tree-shaking, simplify lazy loading to a single loadComponent() call, and are the Angular 17+ default for new projects.';

  syntaxCode = [
    '// main.ts — standalone bootstrap',
    'import { bootstrapApplication } from "@angular/platform-browser";',
    'import { provideRouter } from "@angular/router";',
    'import { provideHttpClient } from "@angular/common/http";',
    'import { provideAnimations } from "@angular/platform-browser/animations";',
    '',
    'bootstrapApplication(AppComponent, {',
    '  providers: [',
    '    provideRouter(routes, withPreloading(PreloadAllModules)),',
    '    provideHttpClient(withInterceptors([authInterceptor])),',
    '    provideAnimations(),',
    '  ]',
    '});',
    '',
    '// Standalone component',
    '@Component({',
    '  selector: "app-user-card",',
    '  standalone: true,',
    '  imports: [CommonModule, RouterModule, FormsModule],',
    '  templateUrl: "./user-card.component.html",',
    '})',
    'export class UserCardComponent { }',
  ].join('\n');

  exampleCode = [
    '// Standalone pipe',
    '@Pipe({ name: "formatDate", standalone: true })',
    'export class FormatDatePipe implements PipeTransform {',
    '  transform(value: string): string {',
    '    return new Date(value).toLocaleDateString();',
    '  }',
    '}',
    '',
    '// Standalone directive',
    '@Directive({ selector: "[appHighlight]", standalone: true })',
    'export class HighlightDirective {',
    '  @HostBinding("style.background") bg = "yellow";',
    '}',
    '',
    '// Using both in a standalone component',
    '@Component({',
    '  standalone: true,',
    '  imports: [FormatDatePipe, HighlightDirective],',
    '  template: `<p appHighlight>{{ date | formatDate }}</p>`',
    '})',
    'export class MyComponent { date = "2024-01-01"; }',
  ].join('\n');

  internalWorking = 'In NgModule architecture, Angular resolves component dependencies through the module injector hierarchy and the module\'s declarations/imports arrays at compile time. With standalone components, each component carries its own imports metadata. The Angular compiler processes these imports to build optimized component factories. Tree-shaking is more effective because unused imports in one component are not accidentally included through a shared module.';

  advantages = [
    'Eliminates NgModule boilerplate (40-60% less code in many cases)',
    'Better tree-shaking — unused code is not pulled in through shared modules',
    'Simpler lazy loading with loadComponent() — no route module needed',
    'Easier to understand — component declares exactly what it needs',
    'Simpler testing — no TestBed module setup for imported components',
    'Default in Angular 17+ — aligns with framework direction',
    'provideX() functions are typed and auto-complete-friendly',
  ];

  disadvantages = [
    'Migration from NgModule to standalone requires careful refactoring',
    'Large shared component libraries need to update all exports to standalone',
    'Some third-party libraries still require NgModule-based setup',
    'Developers familiar with NgModule need to learn new mental model',
    'Duplicate imports possible if the same directive is imported in many components',
  ];

  bestPractices = [
    'Use standalone: true for all new components, directives, and pipes',
    'Use bootstrapApplication instead of platformBrowserDynamic().bootstrapModule()',
    'Use provideRouter(), provideHttpClient(), provideAnimations() instead of module imports',
    'Use ng generate with --standalone flag (or configure in schematics defaults)',
    'For migration, use ng generate @angular/core:standalone migration schematic',
    'Create a shared imports array/const to avoid repetitive imports across components',
  ];

  commonMistakes = [
    'Adding standalone components to an NgModule declarations array — causes compile error',
    'Forgetting to add imported components to the standalone imports array',
    'Importing NgModules (like BrowserModule) instead of using provide functions',
    'Mixing NgModule bootstrapModule with standalone components without proper migration',
    'Not updating lazy routes to use loadComponent for standalone route components',
  ];

  interviewQA = [
    {
      q: 'What are standalone components and how do they differ from NgModule-based components?',
      a: 'Standalone components (standalone: true) declare their own imports array and do not belong to any NgModule. NgModule components are declared inside a module that manages their dependencies. Standalone components have less boilerplate, better tree-shaking, and are the default in Angular 17+.'
    },
    {
      q: 'What is bootstrapApplication and how does it differ from bootstrapModule?',
      a: 'bootstrapApplication(AppComponent, appConfig) bootstraps a standalone component directly, using provider functions (provideRouter, provideHttpClient) instead of NgModule imports. bootstrapModule(AppModule) bootstraps via a root NgModule. bootstrapApplication is the modern approach for standalone-first applications.'
    },
    {
      q: 'What are Angular provider functions like provideRouter and provideHttpClient?',
      a: 'They are typed factory functions that configure Angular features for the application injector without requiring an NgModule. provideRouter(routes, withPreloading(Strategy)) sets up routing. provideHttpClient(withInterceptors([fn])) sets up HTTP with functional interceptors. They are tree-shakeable and type-safe.'
    },
    {
      q: 'How does tree-shaking improve with standalone components?',
      a: 'With NgModules, importing one component from a shared module can accidentally include all components declared in that module. Standalone components declare exactly what they import, so the bundler knows precisely which code is used. Unused directives and pipes in unused components are safely removed from the bundle.'
    },
    {
      q: 'How do you migrate an NgModule-based Angular app to standalone?',
      a: 'Use the Angular standalone migration schematic: ng generate @angular/core:standalone --mode=convert-to-standalone. It auto-converts components to standalone, adds imports arrays, and moves module-level providers. Follow with the --mode=remove-modules pass to eliminate the NgModules. Review and test carefully after each pass.'
    },
    {
      q: 'What is the difference between imports in @NgModule and imports in @Component?',
      a: 'NgModule imports lists other NgModules whose exported declarations are available to all components in that module. @Component imports (standalone only) lists specific components, directives, pipes, and NgModules whose exports are available in that component\'s template only. The standalone imports are scoped to the component, not shared globally.'
    },
  ];
}
