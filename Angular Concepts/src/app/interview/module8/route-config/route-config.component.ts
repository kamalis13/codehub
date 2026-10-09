import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-config.component.html',
  styleUrl: './route-config.component.css'
})
export class RouteConfigComponent {
  syntaxCode = [
    '// app.routes.ts — complete route configuration',
    'export const routes: Routes = [',
    '  // 1. Redirect default empty path',
    "  { path: '', redirectTo: '/home', pathMatch: 'full' },",
    '',
    '  // 2. Static route',
    "  { path: 'home', component: HomeComponent },",
    '',
    '  // 3. Route with param',
    "  { path: 'products/:id', component: ProductDetailComponent },",
    '',
    '  // 4. Lazy-loaded feature',
    "  { path: 'admin', loadChildren: () =>",
    "      import('./admin/admin.routes').then(m => m.ADMIN_ROUTES) },",
    '',
    '  // 5. Wildcard — MUST be last',
    "  { path: '**', component: PageNotFoundComponent }",
    '];'
  ].join('\n');

  exampleCode = [
    '// Practical e-commerce route table',
    'export const routes: Routes = [',
    "  { path: '', redirectTo: '/home', pathMatch: 'full' },",
    "  { path: 'home', component: HomeComponent, title: 'Home' },",
    "  { path: 'products', component: ProductListComponent, title: 'Products' },",
    "  { path: 'products/:id', component: ProductDetailComponent },",
    "  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },",
    "  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },",
    "  { path: 'admin', loadChildren: () =>",
    "      import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),",
    '    canActivate: [AdminGuard] },',
    "  { path: '**', component: PageNotFoundComponent }",
    '];'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the Routes array in Angular?',
      a: "Routes is a typed array (Route[]) that maps URL paths to components, redirects, or lazy-loaded modules. Angular's Router iterates this array from top to bottom and uses the first matching route."
    },
    {
      q: 'Why does route order matter?',
      a: 'Angular uses first-match-wins. If a wildcard ** is placed first, it matches every URL and no other route is reachable. Specific routes must appear before general ones; ** must always be last.'
    },
    {
      q: "What is the difference between pathMatch: 'full' and pathMatch: 'prefix'?",
      a: "'prefix' (default) matches if the URL starts with the path. 'full' matches only if the entire URL equals the path. Always use pathMatch: 'full' with redirectTo on an empty path to prevent the redirect from matching every route."
    },
    {
      q: 'What is the title property in a Route?',
      a: 'The title property (Angular 14+) sets the document title when the route is activated. Combined with TitleStrategy, it enables automatic, consistent page titles without manual document.title manipulation.'
    },
    {
      q: 'Can a route have both component and loadChildren?',
      a: 'No — a route uses either component (eager-loaded), loadComponent (standalone lazy), or loadChildren (module/routes lazy). Mixing them is invalid and causes a runtime error.'
    },
    {
      q: 'What is a data property on a route used for?',
      a: "The data property lets you attach static metadata to a route — e.g., { data: { role: 'admin', breadcrumb: 'Dashboard' } }. It is accessible via ActivatedRoute.data observable and commonly used in guards and breadcrumbs."
    }
  ];
}
