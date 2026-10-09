import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-guards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-guards.component.html',
  styleUrl: './route-guards.component.css'
})
export class RouteGuardsComponent {
  syntaxCode = [
    '// Modern functional guard (Angular 14+) — preferred',
    'export const authGuard: CanActivateFn = (route, state) => {',
    '  const auth = inject(AuthService);',
    '  const router = inject(Router);',
    '',
    '  if (auth.isLoggedIn()) {',
    '    return true;',
    '  }',
    '  // Redirect to login, preserve intended URL',
    "  return router.createUrlTree(['/login'], {",
    '    queryParams: { returnUrl: state.url }',
    '  });',
    '};',
    '',
    '// Apply to route',
    "{ path: 'dashboard', component: DashboardComponent,",
    '  canActivate: [authGuard] }'
  ].join('\n');

  exampleCode = [
    '// CanDeactivate guard — unsaved changes warning',
    'export const unsavedChangesGuard: CanDeactivateFn<FormComponent> =',
    '  (component: FormComponent) => {',
    '    if (component.hasUnsavedChanges()) {',
    "      return confirm('You have unsaved changes. Leave anyway?');",
    '    }',
    '    return true;',
    '  };',
    '',
    '// Resolve guard — prefetch data before navigation',
    'export const productResolver: ResolveFn<Product> =',
    '  (route: ActivatedRouteSnapshot) => {',
    "    const id = route.paramMap.get('id')!;",
    '    return inject(ProductService).getProduct(id);',
    '  };',
    '',
    '// Route with multiple guards and resolver',
    '{',
    "  path: 'products/:id/edit',",
    '  component: EditProductComponent,',
    '  canActivate: [authGuard, adminGuard],',
    '  canDeactivate: [unsavedChangesGuard],',
    '  resolve: { product: productResolver }',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'What are the types of Angular route guards?',
      a: 'canActivate (can you enter?), canActivateChild (can you enter child routes?), canDeactivate (can you leave?), canMatch/canLoad (can the lazy bundle even be fetched?), and resolve (fetch data before entering). Angular 14+ supports all as functional guards.'
    },
    {
      q: 'What should a guard return to redirect instead of just blocking?',
      a: 'Return a UrlTree (created with router.createUrlTree()). Angular uses it to redirect the user. Returning false blocks navigation with no redirect. Returning true allows navigation. Guards can also return an Observable<boolean | UrlTree>.'
    },
    {
      q: 'What is the difference between canActivate and canMatch?',
      a: "canActivate runs after the route's lazy bundle is downloaded — it can block entry but the code was already transferred. canMatch runs before downloading the lazy bundle, preventing even the fetch for unauthorized users. More secure and efficient for protected lazy routes."
    },
    {
      q: 'What is CanDeactivate used for?',
      a: 'To intercept navigation away from a component, usually to warn users about unsaved changes. The guard receives the component instance and can check its state — e.g., if a form is dirty, show a confirmation dialog.'
    },
    {
      q: 'What is the resolve guard?',
      a: 'Resolve prefetches data before the route component is rendered. The resolved data is available in ActivatedRoute.data. This prevents the component from rendering with empty/loading state — useful when you need data before showing the page.'
    },
    {
      q: 'How do functional guards (Angular 14+) differ from class-based guards?',
      a: 'Functional guards are plain functions decorated with inject() calls — no class, no implements, no registration in providers. They are simpler, tree-shakable, and composable. Class-based guards required implementing a GuardInterface and providing the class.'
    }
  ];
}
