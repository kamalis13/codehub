import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-module.component.html',
  styleUrl: './app-module.component.css',
})
export class AppModuleComponent {
  syntaxCode = [
    "import { NgModule } from '@angular/core';",
    "import { BrowserModule } from '@angular/platform-browser';",
    "import { AppRoutingModule } from './app-routing.module';",
    "import { AppComponent } from './app.component';",
    "import { HomeComponent } from './home/home.component';",
    '',
    '@NgModule({',
    '  declarations: [AppComponent, HomeComponent],',
    '  imports: [',
    '    BrowserModule,',
    '    AppRoutingModule,',
    '    HttpClientModule',
    '  ],',
    '  providers: [',
    '    AuthService,',
    '    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }',
    '  ],',
    '  bootstrap: [AppComponent]',
    '})',
    'export class AppModule { }',
  ].join('\n');

  exampleCode = [
    '// app.module.ts — wiring routing + HTTP',
    '@NgModule({',
    '  declarations: [AppComponent],',
    '  imports: [',
    '    BrowserModule,        // provides CommonModule + browser APIs',
    '    AppRoutingModule,     // handles all route configurations',
    '    HttpClientModule      // enables HTTP calls across the app',
    '  ],',
    '  providers: [',
    '    AuthService,',
    '    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }',
    '  ],',
    '  bootstrap: [AppComponent]  // entry point component',
    '})',
    'export class AppModule { }',
    '',
    '// main.ts — starts the app',
    "platformBrowserDynamic().bootstrapModule(AppModule)",
    "  .catch(err => console.error(err));",
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the role of AppModule in Angular?',
      a: 'AppModule is the root NgModule that bootstraps the Angular application. It declares the root component (AppComponent), imports platform-level modules like BrowserModule, and lists providers. Angular uses it as the entry point to build the dependency injection tree and compile all declared templates.',
    },
    {
      q: 'What are the four main metadata properties of @NgModule?',
      a: 'declarations — registers components, directives, and pipes that belong to this module. imports — brings in other NgModules to use their exported members. providers — registers services/tokens into the DI system. bootstrap — specifies the root component Angular instantiates on startup (only in AppModule).',
    },
    {
      q: 'Why is BrowserModule imported only in AppModule and not in feature modules?',
      a: 'BrowserModule includes CommonModule plus browser-specific bootstrapping providers. Importing it more than once causes an error. Feature modules import CommonModule instead, which provides ngIf, ngFor, etc., without the bootstrapping overhead.',
    },
    {
      q: 'What happens if you add BrowserModule to a feature module?',
      a: 'Angular throws a runtime error: "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead." This protects against double-providing critical browser services.',
    },
    {
      q: 'What is the bootstrap array in @NgModule used for?',
      a: 'The bootstrap array specifies which component Angular should create and insert into the DOM when the app starts. Angular looks for a matching element (e.g., <app-root>) in index.html and renders the root component there. Only AppModule should have a bootstrap array.',
    },
    {
      q: 'How does AppModule differ from the standalone bootstrapApplication approach?',
      a: 'AppModule uses the classic NgModule pattern. Standalone components (Angular 14+) skip AppModule entirely and use bootstrapApplication(AppComponent, { providers: [...] }) in main.ts. The standalone approach reduces boilerplate and improves tree-shaking. Angular 17+ scaffolds standalone by default.',
    },
  ];
}
