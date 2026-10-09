import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spa.component.html',
  styleUrl: './spa.component.css',
})
export class SpaComponent {
  syntaxCode = [
    '// app.routes.ts — Define all application routes',
    'import { Routes } from "@angular/router";',
    '',
    'export const routes: Routes = [',
    '  { path: "", component: HomeComponent },',
    '  { path: "products", component: ProductsComponent },',
    '  { path: "products/:id", component: ProductDetailComponent },',
    '  { path: "cart", component: CartComponent },',
    '  { path: "**", component: NotFoundComponent },',
    '];',
    '',
    '// app.component.html — Single outlet renders all views',
    '<nav>',
    '  <a routerLink="/">Home</a>',
    '  <a routerLink="/products">Products</a>',
    '  <a routerLink="/cart">Cart</a>',
    '</nav>',
    '<router-outlet></router-outlet>',
    '<!-- Angular swaps component here WITHOUT page reload -->',
  ].join('\n');

  exampleCode = [
    '// Gmail-like SPA — No full page reload on navigation',
    '',
    '// app.routes.ts',
    'export const routes: Routes = [',
    '  { path: "inbox", component: InboxComponent },',
    '  {',
    '    path: "sent",',
    '    loadComponent: () =>',
    '      import("./sent/sent.component").then(m => m.SentComponent),',
    '  },',
    '  { path: "compose", component: ComposeComponent },',
    '  { path: "", redirectTo: "inbox", pathMatch: "full" },',
    '];',
    '',
    '// Navigation — History API updates URL, NO server request',
    '// inbox → sent: only SentComponent loads, layout stays intact',
    '// Browser history: Back/Forward buttons work as expected',
    '',
    '// Programmatic navigation in component',
    'constructor(private router: Router) {}',
    'openEmail(id: string) {',
    '  this.router.navigate(["/email", id]);',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is a Single Page Application (SPA)?',
      a: 'A SPA is a web application that loads a single HTML file and dynamically updates the view by swapping components in the DOM rather than requesting new HTML pages from the server. Navigation is handled client-side by a JavaScript router (Angular Router), which updates the browser URL via the History API without a full page refresh, making the experience fast and app-like.',
    },
    {
      q: 'How does Angular implement SPA behavior?',
      a: 'Angular uses the Angular Router to map URL paths to components. When the user clicks a routerLink or programmatic navigation is triggered, the Router matches the URL to a route configuration, destroys the current component, and renders the new component inside the <router-outlet>. The browser URL is updated via the History API pushState method — no server request is made.',
    },
    {
      q: 'What is the History API and how does Angular use it?',
      a: 'The History API (window.history.pushState) allows JavaScript to change the browser URL without triggering a server request. Angular Router uses pushState to update the address bar when navigating between routes. This gives users bookmarkable URLs and working back/forward buttons while keeping all rendering client-side. Angular also supports hash-based routing (/#/route) for environments without server-side URL rewriting.',
    },
    {
      q: 'What are the SEO challenges of SPAs and how does Angular solve them?',
      a: 'SPAs render content with JavaScript, so search engine crawlers that do not execute JS see an empty HTML shell and cannot index the content. Angular solves this with Angular Universal (server-side rendering), which pre-renders the application on the server and sends complete HTML to the browser. Angular 17+ also supports partial hydration and deferred loading for improved SEO and performance.',
    },
    {
      q: 'What is lazy loading in Angular and why is it important for SPAs?',
      a: 'Lazy loading defers the loading of feature modules or standalone components until the user navigates to the corresponding route. This reduces the initial bundle size, improving Time-to-Interactive (TTI). In Angular, lazy loading is configured using the loadChildren (for modules) or loadComponent (for standalone components) properties in the route configuration.',
    },
    {
      q: 'What is the difference between RouterModule.forRoot() and RouterModule.forChild()?',
      a: 'RouterModule.forRoot() is called once in the root AppModule (or app.config.ts via provideRouter) and registers the global Router service, location strategy, and root-level routes. RouterModule.forChild() is called in feature modules to register child routes without re-providing the Router service. Calling forRoot() in a feature module would create a second Router instance, causing navigation issues.',
    },
  ];
}
