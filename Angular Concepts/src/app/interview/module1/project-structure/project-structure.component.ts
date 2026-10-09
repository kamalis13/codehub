import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-structure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-structure.component.html',
  styleUrl: './project-structure.component.css',
})
export class ProjectStructureComponent {
  syntaxCode = [
    'my-app/',
    '├── src/',
    '│   ├── app/',
    '│   │   ├── core/              # Singleton services, interceptors, guards',
    '│   │   │   ├── services/',
    '│   │   │   ├── guards/',
    '│   │   │   └── interceptors/',
    '│   │   ├── shared/            # Reusable components, pipes, directives',
    '│   │   │   ├── components/',
    '│   │   │   └── pipes/',
    '│   │   ├── features/          # Feature modules (lazy loaded)',
    '│   │   │   ├── dashboard/',
    '│   │   │   │   ├── dashboard.component.ts',
    '│   │   │   │   ├── dashboard.component.html',
    '│   │   │   │   └── dashboard.component.css',
    '│   │   │   └── products/',
    '│   │   ├── app.component.ts   # Root component',
    '│   │   ├── app.routes.ts      # Root route config',
    '│   │   └── app.config.ts      # App-level providers',
    '│   ├── assets/                # Images, fonts, icons',
    '│   ├── environments/          # env.ts / env.prod.ts',
    '│   ├── index.html             # Single HTML shell',
    '│   ├── main.ts                # Bootstrap entry point',
    '│   └── styles.css             # Global styles',
    '├── angular.json               # CLI workspace config',
    '├── tsconfig.json              # TypeScript compiler config',
    '├── tsconfig.app.json          # App-specific TS config',
    '├── tsconfig.spec.json         # Test-specific TS config',
    '└── package.json               # NPM dependencies',
  ].join('\n');

  exampleCode = [
    '// main.ts — Application entry point (Angular 15+ standalone)',
    'import { bootstrapApplication } from "@angular/platform-browser";',
    'import { AppComponent } from "./app/app.component";',
    'import { appConfig } from "./app/app.config";',
    '',
    'bootstrapApplication(AppComponent, appConfig)',
    '  .catch(err => console.error(err));',
    '',
    '// app.config.ts — Centralized provider configuration',
    'export const appConfig: ApplicationConfig = {',
    '  providers: [',
    '    provideRouter(routes, withViewTransitions()),',
    '    provideHttpClient(withInterceptors([authInterceptor])),',
    '    provideAnimations(),',
    '  ],',
    '};',
    '',
    '// environments/environment.ts — Dev config',
    'export const environment = {',
    '  production: false,',
    '  apiUrl: "http://localhost:3000/api",',
    '};',
    '',
    '// environments/environment.prod.ts — Prod config',
    'export const environment = {',
    '  production: true,',
    '  apiUrl: "https://api.myapp.com",',
    '};',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the purpose of the src/app/core/ folder?',
      a: 'The core/ folder contains singleton services, HTTP interceptors, authentication guards, and other infrastructure code that is instantiated once and used application-wide. CoreModule (or standalone providers in app.config.ts) ensures these are singletons. Examples include AuthService, TokenInterceptor, and AuthGuard. Keeping core logic separate from feature code prevents circular dependencies.',
    },
    {
      q: 'What is the role of main.ts in an Angular project?',
      a: 'main.ts is the application\'s JavaScript entry point — the first file executed when the app loads. It calls bootstrapApplication() (standalone) or platformBrowserDynamic().bootstrapModule() (NgModule) to start Angular. It can also configure Zone.js behavior (e.g., disabling it for zoneless apps) and sets up global error handling before Angular boots.',
    },
    {
      q: 'What is angular.json and what are its key sections?',
      a: 'angular.json is the Angular CLI workspace configuration. Key sections: projects (defines each app/library), architect (build, serve, test, lint targets per project), build options (outputPath, assets, styles, scripts, file replacements for environments), and budgets (warn/error when bundle size exceeds thresholds). Modifying angular.json affects how ng build, ng serve, and ng test behave.',
    },
    {
      q: 'What is the difference between tsconfig.json, tsconfig.app.json, and tsconfig.spec.json?',
      a: 'tsconfig.json is the root TypeScript configuration with base compiler options. tsconfig.app.json extends it and includes only application source files (src/main.ts, src/app/) — used for ng build and ng serve. tsconfig.spec.json extends the root and includes test files (*.spec.ts) — used for ng test. This separation ensures test utilities are not bundled into the production app.',
    },
    {
      q: 'What is the shared/ folder and what should go in it?',
      a: 'The shared/ folder contains reusable components, directives, and pipes that are used across multiple feature modules. Examples: a ButtonComponent, a TruncatePipe, a ClickOutsideDirective. These should be stateless or receive all data via @Input(). SharedModule (or standalone imports) exports these for use in feature modules. Avoid putting services in shared/ — services belong in core/ or feature modules.',
    },
    {
      q: 'What is the purpose of environment files in Angular?',
      a: 'Environment files (environment.ts and environment.prod.ts) allow you to define environment-specific configuration — API URLs, feature flags, analytics keys — without changing application code. Angular CLI replaces environment.ts with environment.prod.ts during a production build (configured in angular.json\'s fileReplacements). This keeps secrets out of the codebase and allows the same code to target different backends.',
    },
  ];
}
