import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standalone-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standalone-comp.component.html',
  styleUrl: './standalone-comp.component.css',
})
export class StandaloneCompComponent {
  syntaxCode = [
    '// user-profile.component.ts — Angular 14+ standalone',
    "import { Component } from '@angular/core';",
    "import { CommonModule } from '@angular/common';",
    "import { RouterModule } from '@angular/router';",
    "import { AvatarComponent } from '../avatar/avatar.component';",
    '',
    '@Component({',
    "  selector: 'app-user-profile',",
    '  standalone: true,            // no NgModule needed',
    '  imports: [',
    '    CommonModule,              // ngIf, ngFor, etc.',
    '    RouterModule,              // routerLink, routerLinkActive',
    '    AvatarComponent            // another standalone component',
    '  ],',
    "  templateUrl: './user-profile.component.html',",
    "  styleUrl: './user-profile.component.css',",
    '})',
    'export class UserProfileComponent {',
    '  user = { name: "Alice", role: "Admin" };',
    '}',
    '',
    '// main.ts — bootstrapApplication replaces AppModule',
    "import { bootstrapApplication } from '@angular/platform-browser';",
    "import { provideRouter } from '@angular/router';",
    "import { provideHttpClient } from '@angular/common/http';",
    "import { AppComponent } from './app/app.component';",
    "import { routes } from './app/app.routes';",
    '',
    'bootstrapApplication(AppComponent, {',
    '  providers: [',
    '    provideRouter(routes),',
    '    provideHttpClient()',
    '  ]',
    '});',
  ].join('\n');

  exampleCode = [
    '// app.routes.ts — standalone lazy routing',
    "import { Routes } from '@angular/router';",
    '',
    'export const routes: Routes = [',
    '  {',
    "    path: 'dashboard',",
    "    loadComponent: () => import('./dashboard/dashboard.component')",
    '      .then(m => m.DashboardComponent)',
    '  },',
    '  {',
    "    path: 'profile',",
    "    loadComponent: () => import('./user-profile/user-profile.component')",
    '      .then(m => m.UserProfileComponent)',
    '  }',
    '];',
    '',
    '// dashboard.component.ts — self-contained',
    '@Component({',
    "  selector: 'app-dashboard',",
    '  standalone: true,',
    '  imports: [CommonModule, ChartComponent, DataTableComponent],',
    "  templateUrl: './dashboard.component.html'",
    '})',
    'export class DashboardComponent { }',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is a standalone component in Angular?',
      a: 'A standalone component is a component with standalone: true in its @Component decorator. It does not need to be declared in any NgModule. Instead, it declares its own dependencies (components, directives, pipes, modules) in its own imports array. Introduced in Angular 14, this is the default in Angular 17+.',
    },
    {
      q: 'How do you bootstrap an Angular application using standalone components?',
      a: 'Use bootstrapApplication(AppComponent, { providers: [...] }) in main.ts instead of platformBrowserDynamic().bootstrapModule(AppModule). Providers like routing and HTTP are configured with provideRouter(routes), provideHttpClient(), provideAnimations(), etc., instead of importing RouterModule.forRoot() in a module.',
    },
    {
      q: 'What is the difference between loadChildren and loadComponent in Angular routing?',
      a: 'loadChildren lazily loads an entire NgModule (classic pattern). loadComponent lazily loads a single standalone component directly without a wrapping module. loadComponent is simpler, produces smaller chunks, and is preferred in standalone Angular 14+ apps.',
    },
    {
      q: 'What are the benefits of standalone components over NgModule-based components?',
      a: 'Reduced boilerplate — no NgModule declarations needed. Better tree-shaking — each component imports only what it uses. Simpler mental model — dependencies are co-located with the component. Easier lazy loading via loadComponent. Better testability — TestBed.configureTestingModule only needs the component and its direct imports.',
    },
    {
      q: 'Can standalone components and NgModule-based components coexist?',
      a: 'Yes. Angular supports a gradual migration. A standalone component can be added to an NgModule\'s imports array (not declarations). An NgModule-based component can use a standalone component by importing it in the module\'s imports array. This enables incremental migration of existing apps.',
    },
    {
      q: 'How do you provide services in a standalone Angular app without CoreModule?',
      a: 'Use app.config.ts (or inline providers in bootstrapApplication). For services: use providedIn: "root" in @Injectable for singletons. For HTTP interceptors: use provideHttpClient(withInterceptors([tokenInterceptorFn])). For routing: use provideRouter(routes, withPreloading(PreloadAllModules)). Each provider function is tree-shakable.',
    },
  ];
}
