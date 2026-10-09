import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angular-architecture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular-architecture.component.html',
  styleUrl: './angular-architecture.component.css',
})
export class AngularArchitectureComponent {
  syntaxCode = [
    '// Angular 8 Core Building Blocks',
    '',
    '// 1. Component — View + Logic',
    '@Component({ selector: "app-login", templateUrl: "./login.component.html" })',
    'export class LoginComponent { }',
    '',
    '// 2. NgModule — Groups related components/services',
    '@NgModule({ declarations: [LoginComponent], imports: [CommonModule] })',
    'export class AuthModule { }',
    '',
    '// 3. Template — HTML with Angular directives & bindings',
    '// <form (ngSubmit)="onLogin()"><input [(ngModel)]="email" /></form>',
    '',
    '// 4. Directive — Extends HTML behavior',
    '@Directive({ selector: "[appHighlight]" })',
    'export class HighlightDirective { }',
    '',
    '// 5. Service — Shared business logic',
    '@Injectable({ providedIn: "root" })',
    'export class AuthService { }',
    '',
    '// 6. Pipe — Transforms template output',
    '@Pipe({ name: "truncate" })',
    'export class TruncatePipe implements PipeTransform { }',
    '',
    '// 7. Router — Maps URLs to components',
    'const routes: Routes = [{ path: "login", component: LoginComponent }];',
    '',
    '// 8. DI — Inject services via constructor',
    'constructor(private authService: AuthService) { }',
  ].join('\n');

  exampleCode = [
    '// Login Feature — All 8 building blocks collaborating',
    '',
    '// auth.service.ts — Service handles HTTP + logic',
    '@Injectable({ providedIn: "root" })',
    'export class AuthService {',
    '  constructor(private http: HttpClient) {}',
    '  login(creds: Credentials): Observable<User> {',
    '    return this.http.post<User>("/api/login", creds);',
    '  }',
    '}',
    '',
    '// login.component.ts — Component orchestrates the view',
    '@Component({ selector: "app-login", templateUrl: "./login.component.html" })',
    'export class LoginComponent {',
    '  email = ""; password = "";',
    '  constructor(private auth: AuthService, private router: Router) {}',
    '  onLogin() {',
    '    this.auth.login({ email: this.email, password: this.password })',
    '      .subscribe(() => this.router.navigate(["/dashboard"]));',
    '  }',
    '}',
    '',
    '// login.component.html — Template with two-way binding',
    '// <input [(ngModel)]="email" />',
    '// <input [(ngModel)]="password" type="password" />',
    '// <button (click)="onLogin()">Login</button>',
    '',
    '// app.routes.ts — Router maps URL to component',
    '// { path: "login", component: LoginComponent }',
  ].join('\n');

  interviewQA = [
    {
      q: 'What are the 8 core building blocks of Angular?',
      a: 'The 8 core building blocks are: (1) Modules (NgModule) — group related features; (2) Components — combine view + logic; (3) Templates — HTML with Angular bindings and directives; (4) Metadata/Decorators — configure classes; (5) Data Binding — sync component and view; (6) Directives — extend HTML behavior; (7) Services — shareable business logic; (8) Dependency Injection — provide and consume services.',
    },
    {
      q: 'What is the difference between a Component and a Directive?',
      a: 'A Component is a directive with a template — it has its own view (HTML). A Directive adds behavior to existing DOM elements without creating a new view. There are three types of directives: component directives (with template), structural directives (*ngIf, *ngFor — alter DOM structure), and attribute directives ([ngClass], [ngStyle] — change element appearance/behavior).',
    },
    {
      q: 'What is Angular\'s hierarchical dependency injection system?',
      a: 'Angular\'s DI has a tree of injectors mirroring the component tree. When a component requests a dependency, Angular walks up the injector hierarchy — from the component\'s own injector to its parent, up to the root injector. Services provided at root (providedIn: "root") are singletons app-wide; services provided in a component are scoped to that component\'s subtree and destroyed with it.',
    },
    {
      q: 'What are the types of data binding in Angular?',
      a: 'Angular has four types: (1) Interpolation {{ expr }} — component to view; (2) Property binding [property]="expr" — component to DOM property; (3) Event binding (event)="handler()" — DOM to component; (4) Two-way binding [(ngModel)]="prop" — combines property + event binding to keep model and view in sync simultaneously.',
    },
    {
      q: 'What is NgModule and what are its key metadata properties?',
      a: 'NgModule is a decorator that groups related Angular artifacts. Key properties: declarations (components, directives, pipes belonging to this module), imports (other modules whose exports this module needs), exports (artifacts this module makes available to other modules), providers (services to register in this module\'s injector), and bootstrap (root component to bootstrap — only in AppModule).',
    },
    {
      q: 'How do Services and Components interact in Angular?',
      a: 'Components inject services via constructor injection: constructor(private myService: MyService). Angular\'s DI system provides the service instance (creating it if needed). Components call service methods for data fetching, business logic, or shared state — keeping components lean (only view logic) and services reusable. Services can also inject other services.',
    },
  ];
}
