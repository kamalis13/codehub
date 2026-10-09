import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-discussion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-discussion.component.html',
  styleUrl: './project-discussion.component.css',
})
export class ProjectDiscussionComponent {
  introductionTemplate = `Structure your project introduction as a 1-minute pitch using this framework:
1. What the project does (1-2 sentences)
2. Who uses it and what problem it solves (1 sentence)
3. Your role and team size (1 sentence)
4. Key technical highlights (2-3 points)
5. Business impact / results achieved (1 sentence)

Example: "I worked on an e-commerce platform serving 500K monthly users. It's a B2C marketplace that lets sellers list products and buyers place orders. I was the lead frontend developer in a team of 8, building the Angular 16 SPA. We implemented NgRx for state management, lazy loading for performance, and integrated with REST APIs. We reduced page load time by 40% and increased conversion rate by 12%."`;

  architecturePoints = [
    'Describe the high-level architecture: SPA, micro-frontend, or hybrid SSR',
    'Explain module organization: feature modules, shared module, core module',
    'Mention state management approach: NgRx, services with BehaviorSubject, signals',
    'Describe component hierarchy: smart containers vs presentational components',
    'Mention build and deployment: CI/CD pipeline, Docker, cloud provider',
    'Explain the API integration layer: REST, GraphQL, WebSockets',
  ];

  technicalStack = [
    'Angular version used and why that version was chosen',
    'State management: NgRx / Akita / Angular Signals / BehaviorSubject services',
    'UI component library: Angular Material / PrimeNG / custom design system',
    'Testing: Karma + Jasmine / Jest / Cypress for E2E',
    'Build tools: Angular CLI, Webpack, ESBuild (Angular 17+)',
    'Backend communication: REST APIs, GraphQL, WebSocket for real-time',
    'Authentication: JWT, OAuth 2.0 / OIDC, Auth0 / Keycloak',
    'Styling: SCSS/SASS, Tailwind CSS, CSS custom properties',
    'Monorepo tools: Nx, Turborepo (if applicable)',
    'Performance tools: Lighthouse, bundle analyzer, Angular DevTools',
  ];

  keyFeatures = [
    'Role-based access control (RBAC) with route guards and directive-level UI toggles',
    'Real-time dashboard with WebSocket for live data updates',
    'Complex reactive forms with multi-step wizard and cross-field validation',
    'Data table with server-side sorting, filtering, and pagination',
    'PDF/Excel export functionality from data grids',
    'Internationalization (i18n) supporting 3 languages',
    'Progressive Web App (PWA) with offline support',
    'Performance: lazy loading, OnPush, virtual scrolling for 10K+ item lists',
    'Comprehensive unit testing (80%+ coverage) and Cypress E2E tests',
  ];

  starExamples = [
    {
      situation: 'The product listing page was loading in 8 seconds on 3G networks.',
      task: 'Reduce Time to Interactive below 3 seconds without changing the backend.',
      action: 'Implemented lazy loading for all feature routes, replaced *ngFor with CDK virtual scrolling for the product grid, added OnPush change detection to 40+ components, implemented image lazy loading with IntersectionObserver, and removed unused third-party libraries reducing bundle by 60%.',
      result: 'Page load time reduced from 8s to 2.1s. Google PageSpeed score improved from 42 to 87. Conversion rate increased 18% over the next month.'
    },
    {
      situation: 'Multiple components were making duplicate HTTP requests for the same data.',
      task: 'Eliminate redundant API calls and ensure data consistency across components.',
      action: 'Refactored to a centralized service architecture. Added shareReplay(1) for frequently accessed resources. Implemented NgRx store for shared state that multiple features depend on.',
      result: 'Reduced API calls by 65%. Improved data consistency. Backend team reported a 30% reduction in API server load.'
    },
    {
      situation: 'The checkout form had critical bugs where users could submit with invalid card data.',
      task: 'Redesign the form with robust validation and better UX.',
      action: 'Migrated from template-driven to reactive forms. Added synchronous and asynchronous validators. Integrated Stripe Elements for secure card handling. Added inline validation feedback.',
      result: 'Form submission errors dropped by 94%. Customer support tickets related to checkout reduced by 78%.'
    },
  ];

  learnings = [
    'Deep understanding of Angular change detection and when to use OnPush vs Default',
    'Importance of reactive programming — subscriptions should be minimal, async pipe preferred',
    'State management discipline — single source of truth prevents synchronization bugs',
    'Performance profiling skills — learned to use Chrome DevTools, Angular DevTools, Lighthouse',
    'Team collaboration with backend through API contracts and Swagger documentation',
    'Code review best practices — how to give and receive constructive feedback',
    'Testing discipline — test coverage prevents regressions during rapid feature development',
  ];

  interviewQA = [
    {
      q: 'Walk me through the architecture of your recent Angular project.',
      a: 'Start with the problem domain, then describe the technical architecture at a high level. Mention: module structure, state management choice (and why), component communication patterns, API integration, authentication mechanism, and any performance optimizations. Keep it concise — 2-3 minutes with a logical flow from domain to architecture to implementation choices.'
    },
    {
      q: 'What was the most challenging technical problem you faced in this project?',
      a: 'Use the STAR format (Situation, Task, Action, Result). Choose a genuinely challenging problem — performance, complex state management, race conditions in async code, or security issues. Be specific about what you tried, what did not work, and what ultimately solved it. Interviewers want to see your problem-solving process, not just the solution.'
    },
    {
      q: 'How did you handle state management in your project?',
      a: 'Explain the approach: NgRx for complex shared state (shopping cart, user session, product catalog), services with BehaviorSubject for simpler feature-level state, and component-local signals for UI state. Explain why you chose this combination — not everything needs NgRx. Describe the data flow: actions → reducers → selectors → components.'
    },
    {
      q: 'How did your team handle merge conflicts and code quality?',
      a: 'Describe the practices: feature branch strategy, small focused PRs (not week-long branches), mandatory code reviews with at least 2 approvals, ESLint + Prettier enforced via Husky pre-commit hooks, unit test coverage gates in CI, pair programming for complex features. Mention specific Angular ESLint rules you enforced.'
    },
    {
      q: 'What would you do differently if you were to rebuild this project today?',
      a: 'Show self-awareness and growth. Good answers: use standalone components from the start (we migrated later — time consuming), use signals for local component state instead of services with BehaviorSubjects, implement Nx workspace for better code sharing, write tests alongside features (not catch-up later), invest more in design system documentation early.'
    },
    {
      q: 'How did you ensure the application was performant and accessible?',
      a: 'Performance: Angular DevTools profiling, Lighthouse CI in pipeline (fail on score < 75), lazy loading, OnPush, virtual scrolling, bundle size budgets in angular.json. Accessibility: Angular CDK a11y, ARIA attributes via HostBinding, keyboard navigation testing, screen reader testing with NVDA, WCAG 2.1 AA audit with axe-core integrated in E2E tests.'
    },
    {
      q: 'How did you handle API errors and network failures gracefully?',
      a: 'Created a centralized HTTP interceptor for error handling. Used catchError in services to return fallback values or re-throw formatted errors. Implemented retry logic with exponential backoff for transient failures. Created a GlobalErrorHandler extending Angular\'s ErrorHandler for logging uncaught errors to Sentry. Showed user-friendly toast messages for different error types (network, 4xx, 5xx).'
    },
    {
      q: 'Describe how you implemented authentication and authorization in your project.',
      a: 'Used JWT for authentication. On login, stored access token in memory (not localStorage for security) and refresh token in HttpOnly cookie. Implemented an auth interceptor to attach Bearer token to API requests. Used canActivate guard for route-level protection. Created an *appHasRole structural directive for element-level access control. Handled token expiry with silent refresh via the interceptor.'
    },
  ];
}
