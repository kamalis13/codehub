import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lazy-loading-route',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-loading-route.component.html',
  styleUrl: './lazy-loading-route.component.css'
})
export class LazyLoadingRouteComponent {
  syntaxCode = [
    '// loadChildren — lazy load a routes array (standalone approach)',
    '{',
    "  path: 'admin',",
    '  loadChildren: () =>',
    "    import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)",
    '}',
    '',
    '// loadComponent — lazy load a single standalone component',
    '{',
    "  path: 'settings',",
    '  loadComponent: () =>',
    "    import('./settings/settings.component')",
    '      .then(m => m.SettingsComponent)',
    '}',
    '',
    '// Preloading strategy — load lazily but eagerly in background',
    'export const appConfig: ApplicationConfig = {',
    '  providers: [',
    '    provideRouter(routes, withPreloading(PreloadAllModules))',
    '  ]',
    '};'
  ].join('\n');

  exampleCode = [
    '// app.routes.ts — mixing eager and lazy routes',
    'export const routes: Routes = [',
    "  { path: '', component: HomeComponent },           // eager",
    "  { path: 'about', component: AboutComponent },     // eager",
    '',
    '  // Lazy — only downloaded when user navigates to /admin',
    '  {',
    "    path: 'admin',",
    '    canActivate: [AdminGuard],',
    '    loadChildren: () =>',
    "      import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)",
    '  },',
    '',
    '  // Lazy single component',
    '  {',
    "    path: 'profile',",
    '    loadComponent: () =>',
    "      import('./profile/profile.component')",
    '        .then(c => c.ProfileComponent)',
    '  }',
    '];',
    '',
    '// admin/admin.routes.ts',
    'export const ADMIN_ROUTES: Routes = [',
    "  { path: '', component: AdminDashboardComponent },",
    "  { path: 'users', component: AdminUsersComponent }",
    '];'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is lazy loading in Angular routing?',
      a: 'Lazy loading defers the download of a route\'s JavaScript bundle until the user first navigates to that route. Instead of loading everything at startup, Angular downloads feature code on demand, reducing initial bundle size and improving Time to Interactive.'
    },
    {
      q: 'What is the difference between loadChildren and loadComponent?',
      a: 'loadChildren lazy-loads an entire Routes array (a group of routes), used for feature modules or standalone route collections. loadComponent lazy-loads a single standalone component for a single route. Prefer loadComponent for simple cases, loadChildren for feature areas with multiple routes.'
    },
    {
      q: 'What is a preloading strategy and why does it matter?',
      a: "After the initial load, Angular can silently download lazy bundles in the background. PreloadAllModules downloads all lazy modules after the app is ready. Custom strategies preload only specific modules. This gives lazy loading's fast initial load plus instant subsequent navigation."
    },
    {
      q: 'How does lazy loading affect route guards?',
      a: 'Lazy routes can use canMatch/canLoad to prevent even downloading the bundle if the user is unauthorized — more secure than canActivate which downloads the bundle first. canActivate still runs after the bundle loads.'
    },
    {
      q: "What happens to the service providers in a lazy-loaded feature?",
      a: "If a service is declared in the lazy module's providers array, a new instance is created scoped to that module. Services with providedIn: 'root' are not affected — they use the root instance regardless."
    },
    {
      q: 'How do you measure the benefit of lazy loading?',
      a: "Use Angular CLI's ng build --stats-json with webpack-bundle-analyzer to visualize bundle chunks. Check browser DevTools Network tab to see which .js files are downloaded on navigation. Lighthouse reports initial bundle size and TTI improvements."
    }
  ];
}
