import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-constructor-hook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './constructor-hook.component.html',
  styleUrl: './constructor-hook.component.css',
})
export class ConstructorHookComponent {
  syntaxCode = [
    'import { Component, Inject, OnInit } from "@angular/core";',
    'import { UserService } from "./user.service";',
    'import { APP_CONFIG, AppConfig } from "./app.config";',
    '',
    '@Component({',
    '  selector: "app-example",',
    '  templateUrl: "./example.component.html",',
    '})',
    'export class ExampleComponent implements OnInit {',
    '  users: User[] = [];',
    '',
    '  // ✅ Constructor: ONLY for Dependency Injection',
    '  constructor(',
    '    private userService: UserService,',
    '    @Inject(APP_CONFIG) private config: AppConfig',
    '  ) {',
    '    // DI happens here — services are injected',
    '    // ❌ Do NOT call HTTP or access @Input() here',
    '  }',
    '',
    '  // ✅ ngOnInit: correct place for initialization logic',
    '  ngOnInit() {',
    '    this.userService.getAll().subscribe(u => this.users = u);',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// Real-world: E-commerce Order Dashboard',
    '',
    '// Custom InjectionToken',
    'export const CONFIG_TOKEN = new InjectionToken<AppConfig>("APP_CONFIG");',
    '',
    '@Component({',
    '  selector: "app-dashboard",',
    '  templateUrl: "./dashboard.component.html",',
    '})',
    'export class DashboardComponent implements OnInit {',
    '  orders: Order[] = [];',
    '  isAdmin = false;',
    '',
    '  constructor(',
    '    private orderService: OrderService,',
    '    private authService: AuthService,',
    '    @Inject(CONFIG_TOKEN) private config: AppConfig',
    '  ) {',
    '    // ✅ Only inject — services available after this line',
    '    this.isAdmin = this.authService.hasRole("ADMIN"); // ✅ ok (synchronous)',
    '  }',
    '',
    '  ngOnInit() {',
    '    // ✅ HTTP calls in ngOnInit — @Input() values are now set',
    '    const endpoint = this.config.apiUrl + "/orders";',
    '    this.orderService.getOrders(endpoint).subscribe(o => this.orders = o);',
    '  }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the constructor in an Angular component and when is it called?',
      a: 'The constructor is a standard TypeScript class method called by the JavaScript engine when the class is instantiated — it is the very first thing that runs. Angular\'s DI framework resolves and injects constructor parameters at this point. However, Angular\'s infrastructure (bindings, view, content) is NOT yet set up, so @Input() values, @ViewChild, and @ContentChild references are all undefined at this stage.',
    },
    {
      q: 'What is the primary purpose of the constructor in Angular?',
      a: 'The primary — and ideally only — purpose of the constructor in Angular is Dependency Injection. You declare services as constructor parameters, and Angular\'s hierarchical injector resolves and provides them automatically. Think of the constructor as a manifest of what this component needs. All initialization logic (HTTP calls, subscriptions, DOM setup) belongs in ngOnInit().',
    },
    {
      q: 'What is the difference between constructor and ngOnInit?',
      a: 'The constructor runs during class instantiation (JavaScript engine); at this point, @Input() bindings are not yet resolved and the component view is not created. ngOnInit() is an Angular lifecycle hook called after the first change detection run, once all @Input() values are set. Use constructor for DI only; use ngOnInit for any logic that may depend on @Input values, route data, or async operations.',
    },
    {
      q: 'Can you make HTTP calls in the constructor?',
      a: 'Technically you can, but it is a serious anti-pattern. Problems: (1) @Input() properties are not yet set, so API calls may use undefined parameters; (2) it breaks Server-Side Rendering (Angular Universal) which does not support certain async ops during construction; (3) unit tests must mock services before instantiation, complicating test setup; (4) Angular specifically introduced ngOnInit() to be the canonical initialization entry point. Always use ngOnInit() for HTTP calls.',
    },
    {
      q: 'What is @Inject and when do you use it in the constructor?',
      a: '@Inject is a parameter decorator used in the constructor to tell Angular\'s DI system which token to use when injecting a value. It is required when injecting non-class tokens, such as InjectionToken<T>. Example: constructor(@Inject(API_URL) private apiUrl: string) — since string is not a class, Angular cannot infer the token; @Inject maps the parameter to the API_URL token. For class-based services (UserService, HttpClient), @Inject is implicit and not needed.',
    },
    {
      q: 'What is the inject() function and how does it compare to constructor injection?',
      a: 'Angular 14+ introduced inject() — a standalone function that can be called in injection context (constructor, field initializer, or factory function) to retrieve a dependency without listing it in the constructor. Example: private userService = inject(UserService). This is especially useful in functional patterns, standalone components, and signals-based code. Both approaches work; inject() is preferred in modern Angular for its composability and works outside class constructors (e.g., in functions, guards, resolvers).',
    },
  ];
}
