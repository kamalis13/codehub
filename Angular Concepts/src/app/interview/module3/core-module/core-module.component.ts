import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-core-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core-module.component.html',
  styleUrl: './core-module.component.css',
})
export class CoreModuleComponent {
  syntaxCode = [
    '// core/core.module.ts',
    "import { NgModule, Optional, SkipSelf } from '@angular/core';",
    "import { CommonModule } from '@angular/common';",
    "import { HTTP_INTERCEPTORS } from '@angular/common/http';",
    "import { AuthService } from './auth/auth.service';",
    "import { LoggingService } from './logging/logging.service';",
    "import { TokenInterceptor } from './interceptors/token.interceptor';",
    '',
    '@NgModule({',
    '  imports: [CommonModule],',
    '  providers: [',
    '    AuthService,',
    '    LoggingService,',
    '    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }',
    '  ]',
    '})',
    'export class CoreModule {',
    '  // Guard: prevent re-import in feature modules',
    '  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {',
    '    if (parentModule) {',
    "      throw new Error('CoreModule is already loaded. Import only in AppModule.');",
    '    }',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// auth/auth.service.ts — singleton across the whole app',
    "@Injectable({ providedIn: 'root' })",
    'export class AuthService {',
    '  private currentUser$ = new BehaviorSubject<User | null>(null);',
    '',
    '  login(credentials: Credentials): Observable<User> {',
    '    return this.http.post<User>("/api/login", credentials).pipe(',
    '      tap(user => this.currentUser$.next(user))',
    '    );',
    '  }',
    '',
    '  logout() {',
    '    this.currentUser$.next(null);',
    '    this.router.navigate(["/login"]);',
    '  }',
    '}',
    '',
    '// core/interceptors/token.interceptor.ts',
    '@Injectable()',
    'export class TokenInterceptor implements HttpInterceptor {',
    '  intercept(req: HttpRequest<any>, next: HttpHandler) {',
    '    const token = localStorage.getItem("token");',
    '    const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });',
    '    return next.handle(cloned);',
    '  }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the purpose of CoreModule in Angular?',
      a: 'CoreModule provides singleton services and app-wide infrastructure that must exist as a single instance throughout the application — such as AuthService, LoggingService, HTTP interceptors, route guards, and error handlers. It is imported once in AppModule and never again, ensuring one DI instance per service.',
    },
    {
      q: 'What is the forRoot guard pattern and why is it used in CoreModule?',
      a: 'The forRoot guard uses @Optional() @SkipSelf() constructor injection to detect if CoreModule is being imported a second time. If a parent CoreModule already exists in the injector tree, the constructor throws an error. This prevents accidental imports in feature modules that would create duplicate service instances.',
    },
    {
      q: 'What is the difference between CoreModule and providing services with providedIn: "root"?',
      a: 'Both achieve singleton services. providedIn: "root" registers the service tree-shakably in the root injector directly in the @Injectable decorator — no module needed. CoreModule is a pre-Angular 6 pattern for centralising providers. Today, prefer providedIn: "root" for services and use CoreModule only for HTTP interceptors and tokens that cannot use providedIn.',
    },
    {
      q: 'What should be placed in CoreModule vs SharedModule?',
      a: 'CoreModule contains singleton services, interceptors, guards, and app-wide providers — things that should not be duplicated. SharedModule contains reusable UI components, pipes, and directives that can be imported by multiple feature modules. The key rule: CoreModule = services (one instance); SharedModule = UI pieces (no services).',
    },
    {
      q: 'What happens if you import CoreModule in a lazy-loaded feature module?',
      a: 'A lazy-loaded module has its own child injector. Importing CoreModule there creates a second instance of all its providers — two AuthService instances, two interceptor registrations, etc. The constructor guard prevents this by throwing a clear error. This is why CoreModule must only be imported in AppModule.',
    },
    {
      q: 'Can you have multiple HTTP interceptors? How are they ordered?',
      a: 'Yes. Register multiple interceptors using the multi: true flag with HTTP_INTERCEPTORS. Angular chains them in the order they are provided, passing the request through each interceptor in sequence (like middleware). The response travels back in reverse order. Place authentication before logging so logs include auth headers.',
    },
  ];
}
