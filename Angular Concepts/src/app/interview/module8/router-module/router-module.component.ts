import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-router-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './router-module.component.html',
  styleUrl: './router-module.component.css'
})
export class RouterModuleComponent {
  syntaxCode = [
    '// NgModule-based app',
    '@NgModule({',
    '  imports: [RouterModule.forRoot(routes)],',
    '  exports: [RouterModule]',
    '})',
    'export class AppRoutingModule {}',
    '',
    '// Standalone app (Angular 14+)',
    'export const appConfig: ApplicationConfig = {',
    '  providers: [',
    '    provideRouter(routes, withPreloading(PreloadAllModules))',
    '  ]',
    '};',
    '',
    '// In template',
    '// <router-outlet></router-outlet>',
    '// <a routerLink="/home" routerLinkActive="active">Home</a>'
  ].join('\n');

  exampleCode = [
    '// app.routes.ts',
    'export const routes: Routes = [',
    "  { path: '', redirectTo: 'home', pathMatch: 'full' },",
    "  { path: 'home', component: HomeComponent },",
    "  { path: 'products', component: ProductListComponent },",
    "  { path: '**', component: PageNotFoundComponent }",
    '];',
    '',
    '// app.component.html',
    '// <nav>',
    '//   <a routerLink="/home" routerLinkActive="active-link">Home</a>',
    '//   <a routerLink="/products" routerLinkActive="active-link">Products</a>',
    '// </nav>',
    '// <router-outlet></router-outlet>'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is RouterModule.forRoot() vs RouterModule.forChild()?',
      a: 'forRoot() registers the router with the application root and is called once in AppRoutingModule. forChild() registers additional routes in feature modules without re-initializing the router. In standalone apps, provideRouter() replaces forRoot().'
    },
    {
      q: 'What is router-outlet?',
      a: "router-outlet is a placeholder directive that Angular replaces with the component matching the active route. A page can have multiple named outlets for auxiliary routes (e.g., sidebar + main content)."
    },
    {
      q: 'What is routerLink?',
      a: "routerLink is a directive that binds an anchor tag to a route path. Unlike href, it uses Angular's router for navigation — no full page reload, state is preserved, and guards are respected."
    },
    {
      q: 'What does routerLinkActive do?',
      a: 'routerLinkActive adds a CSS class to an element when its associated routerLink route is active. Use routerLinkActiveOptions: {exact: true} to apply the class only for exact path matches.'
    },
    {
      q: 'What is provideRouter() in standalone apps?',
      a: 'provideRouter() is the standalone equivalent of RouterModule.forRoot(). It accepts route configuration and feature providers like withPreloading() and withComponentInputBinding(). Added to ApplicationConfig.providers.'
    },
    {
      q: 'What is withComponentInputBinding()?',
      a: 'A router feature (Angular 16+) that automatically binds route params, query params, and data to component @Input() properties, eliminating the need to inject ActivatedRoute in simple cases.'
    }
  ];
}
