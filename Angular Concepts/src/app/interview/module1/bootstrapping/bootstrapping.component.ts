import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bootstrapping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bootstrapping.component.html',
  styleUrl: './bootstrapping.component.css',
})
export class BootstrappingComponent {
  syntaxCode = [
    '// ── Legacy: NgModule-based bootstrapping (Angular 2–14) ──',
    '// main.ts',
    'import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";',
    'import { AppModule } from "./app/app.module";',
    '',
    'platformBrowserDynamic()',
    '  .bootstrapModule(AppModule)',
    '  .catch(err => console.error(err));',
    '',
    '// app.module.ts',
    '@NgModule({',
    '  declarations: [AppComponent],',
    '  imports: [BrowserModule],',
    '  bootstrap: [AppComponent],  // Root component to render',
    '})',
    'export class AppModule { }',
    '',
    '// ── Modern: Standalone bootstrapping (Angular 15+) ──',
    '// main.ts',
    'import { bootstrapApplication } from "@angular/platform-browser";',
    'import { AppComponent } from "./app/app.component";',
    'import { appConfig } from "./app/app.config";',
    '',
    'bootstrapApplication(AppComponent, appConfig)',
    '  .catch(err => console.error(err));',
  ].join('\n');

  exampleCode = [
    '// app.config.ts — Standalone app providers',
    'import { ApplicationConfig } from "@angular/core";',
    'import { provideRouter } from "@angular/router";',
    'import { provideHttpClient, withInterceptors } from "@angular/common/http";',
    'import { provideAnimations } from "@angular/platform-browser/animations";',
    'import { routes } from "./app.routes";',
    'import { authInterceptor } from "./core/interceptors/auth.interceptor";',
    '',
    'export const appConfig: ApplicationConfig = {',
    '  providers: [',
    '    provideRouter(routes, withViewTransitions()),',
    '    provideHttpClient(withInterceptors([authInterceptor])),',
    '    provideAnimations(),',
    '  ],',
    '};',
    '',
    '// index.html — Mount point (Angular replaces <app-root> content)',
    '// <body>',
    '//   <app-root>Loading...</app-root>',
    '// </body>',
    '',
    '// Bootstrap sequence:',
    '// 1. Browser loads index.html → fetches main.js bundle',
    '// 2. main.ts runs → calls bootstrapApplication(AppComponent, appConfig)',
    '// 3. Angular creates root injector with appConfig providers',
    '// 4. Angular renders AppComponent into <app-root>',
    '// 5. Router activates, initial navigation runs',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is Angular bootstrapping?',
      a: 'Bootstrapping is the process of starting an Angular application. It begins when the browser loads the compiled JavaScript bundle (main.js), which calls bootstrapApplication() or bootstrapModule(). Angular creates the root injector, compiles and renders the root component (AppComponent) into the <app-root> element in index.html, sets up change detection, and initiates the router. The entire process converts the static index.html shell into a live Angular application.',
    },
    {
      q: 'What is the difference between bootstrapModule and bootstrapApplication?',
      a: 'bootstrapModule(AppModule) is the NgModule-based approach used in Angular 2–14. It requires an AppModule decorated with @NgModule that lists the root component in its bootstrap array. bootstrapApplication(AppComponent, appConfig) is the modern standalone approach (Angular 15+) that directly bootstraps a standalone component with an ApplicationConfig object. The standalone approach eliminates the need for AppModule entirely.',
    },
    {
      q: 'What happens step by step when Angular bootstraps?',
      a: 'Step 1: Browser loads index.html and fetches the JS bundles. Step 2: main.ts executes and calls bootstrapApplication/bootstrapModule. Step 3: Angular creates the platform and the root ApplicationRef. Step 4: The root injector is built from appConfig providers or AppModule providers. Step 5: The root component (AppComponent) is compiled and its DOM is rendered inside the <app-root> selector. Step 6: Change detection starts, Zone.js patches async APIs, and the router performs initial navigation.',
    },
    {
      q: 'What is platformBrowserDynamic and when is it used?',
      a: 'platformBrowserDynamic() creates a JIT-compiled browser platform for Angular. It was used in NgModule-based apps (Angular 2–14) to call bootstrapModule(AppModule). The "Dynamic" part refers to JIT compilation happening in the browser. In modern Angular with AOT (Angular 9+), the compilation is done at build time, so platformBrowserDynamic is no longer needed — bootstrapApplication() is the preferred approach.',
    },
    {
      q: 'What is APP_INITIALIZER and how does it work during bootstrapping?',
      a: 'APP_INITIALIZER is a DI token that lets you run asynchronous operations before Angular renders the first view. You provide a factory function that returns a Promise or Observable — Angular waits for it to complete before bootstrapping. Use cases include: fetching runtime configuration from a server, loading translations, or initializing authentication state before the app renders. This prevents a flash of unauthenticated content.',
    },
    {
      q: 'What is the role of BrowserModule and when should you import it?',
      a: 'BrowserModule provides essential services for running Angular in a web browser — including the DOM renderer, sanitizer, platform-specific event handling, and AsyncPipe. It should only be imported ONCE in the root AppModule (or provided via bootstrapApplication\'s provideRouter/provideHttpClient equivalents in standalone apps). Feature modules should import CommonModule instead of BrowserModule — importing BrowserModule in a feature module throws an error.',
    },
  ];
}
