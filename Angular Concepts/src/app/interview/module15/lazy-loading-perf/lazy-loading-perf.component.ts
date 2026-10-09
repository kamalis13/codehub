import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lazy-loading-perf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-loading-perf.component.html',
  styleUrl: './lazy-loading-perf.component.css',
})
export class LazyLoadingPerfComponent {
  definition = 'Lazy loading is a design pattern that defers loading of non-critical modules or components until they are actually needed. It splits the application into multiple JavaScript chunks, dramatically reducing the initial bundle size and improving startup performance.';

  whyNeeded = 'Without lazy loading, Angular bundles ALL application code into one main.js file. For large enterprise apps this can be 5–10 MB+, causing slow initial page loads. Lazy loading lets users download only the code needed for the current page, with other chunks loaded on demand.';

  syntaxCode = [
    '// app.routes.ts — lazy route with loadChildren (NgModule style)',
    'const routes: Routes = [',
    '  { path: "", component: HomeComponent },',
    '  {',
    '    path: "admin",',
    '    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)',
    '  },',
    '  // Standalone component — use loadComponent',
    '  {',
    '    path: "dashboard",',
    '    loadComponent: () => import("./dashboard/dashboard.component")',
    '                         .then(m => m.DashboardComponent)',
    '  }',
    '];',
    '',
    '// Preloading strategy — in main.ts / app.config.ts',
    'bootstrapApplication(AppComponent, {',
    '  providers: [',
    '    provideRouter(routes, withPreloading(PreloadAllModules))',
    '  ]',
    '});',
  ].join('\n');

  exampleCode = [
    '// Angular 17+ @defer block — template-level lazy loading',
    '@defer (on viewport) {',
    '  <app-heavy-analytics-chart />',
    '} @placeholder {',
    '  <div class="placeholder">Chart coming into view...</div>',
    '} @loading (minimum 300ms) {',
    '  <app-spinner />',
    '} @error {',
    '  <p>Failed to load chart.</p>',
    '}',
    '',
    '// Custom preloading strategy',
    'export class SelectivePreloadStrategy implements PreloadingStrategy {',
    '  preload(route: Route, load: () => Observable<any>): Observable<any> {',
    '    return route.data?.["preload"] ? load() : of(null);',
    '  }',
    '}',
  ].join('\n');

  internalWorking = 'Webpack (or ESBuild in Angular 17+) creates separate JavaScript chunk files for each lazy-loaded route during the build phase. At runtime, the Angular Router intercepts navigation events and checks whether the required chunk is already loaded. If not, it injects a dynamic <script> tag to fetch the chunk from the server. The browser caches chunks after the first download, so subsequent navigations are instant.';

  advantages = [
    'Dramatically reduces initial bundle size and startup time',
    'Improves Time to Interactive (TTI) and First Contentful Paint (FCP)',
    'Better Core Web Vitals scores (LCP, FID)',
    'Users only download code they actually visit',
    'Enables efficient caching — individual chunks can be cached independently',
    'Angular defer block enables component-level lazy loading in templates',
  ];

  disadvantages = [
    'Small delay on first navigation to a lazy-loaded route',
    'More complex routing configuration and mental model',
    'Requires careful service injection strategy (avoid singleton issues)',
    'Over-splitting can cause too many small HTTP requests',
    'Custom preloading strategies add boilerplate',
  ];

  bestPractices = [
    'Use loadComponent for standalone components — simpler than loadChildren',
    'Apply PreloadAllModules strategy for better perceived navigation speed',
    'Use @defer blocks for below-the-fold and heavy visual components',
    'Group related features into the same lazy chunk (avoid micro-splitting)',
    'Provide root-level services in AppConfig, not in lazy modules',
    'Monitor bundle sizes with ng build and webpack-bundle-analyzer',
  ];

  commonMistakes = [
    'Eagerly importing lazy modules in AppModule — defeats the purpose entirely',
    'Declaring shared services inside lazy modules — causes multiple instances',
    'Not using preloading — causes noticeable delay on every first navigation',
    'Lazy loading too granularly — results in hundreds of tiny chunks',
    'Forgetting to set router data.preload for custom preloading strategies',
  ];

  interviewQA = [
    {
      q: 'What is lazy loading and how does it improve Angular performance?',
      a: 'Lazy loading defers the download of feature modules or components until the user navigates to that route. It splits the build output into multiple chunks, reducing the initial bundle size and improving Time to Interactive (TTI) and First Contentful Paint (FCP).'
    },
    {
      q: 'What is the difference between loadChildren and loadComponent?',
      a: 'loadChildren loads an entire route module or route array (used with NgModule or a routes file), while loadComponent directly loads a single standalone component. loadComponent is simpler and preferred in standalone-first Angular 17+ projects.'
    },
    {
      q: 'What are Angular preloading strategies and why are they needed?',
      a: 'Preloading strategies control which lazy modules are downloaded in the background after the initial app loads. PreloadAllModules preloads everything, NoPreloading (default) loads on demand, and custom strategies let you selectively preload based on route data or user permissions — balancing bandwidth and UX.'
    },
    {
      q: 'What is the Angular @defer block introduced in Angular 17?',
      a: '@defer is a template-level lazy loading mechanism. It defers rendering of a block of UI until a trigger condition is met: on viewport (IntersectionObserver), on idle (requestIdleCallback), on interaction (click/focus), on timer, or on immediate. It supports @placeholder, @loading, and @error sub-blocks.'
    },
    {
      q: 'How do you implement a custom preloading strategy?',
      a: 'Implement the PreloadingStrategy interface with a preload() method. Return load() to preload or of(null) to skip. Attach data to routes (e.g., data: { preload: true }) and check it in the strategy. Register it via provideRouter(routes, withPreloading(YourStrategy)).'
    },
    {
      q: 'How do you analyze Angular bundle size to verify lazy loading is working?',
      a: 'Run ng build --stats-json to generate stats.json, then use webpack-bundle-analyzer or source-map-explorer to visualize chunk composition. Angular also logs chunk file names during build. Check angular.json budgets to get warnings when a bundle exceeds size thresholds.'
    },
  ];
}
