import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-singleton-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './singleton-service.component.html',
  styleUrl: './singleton-service.component.css'
})
export class SingletonServiceComponent {
  syntaxCode = [
    "// Guaranteed singleton — use providedIn: 'root'",
    "@Injectable({ providedIn: 'root' })",
    'export class AuthService {',
    '  private currentUser: User | null = null;',
    '',
    '  login(user: User): void { this.currentUser = user; }',
    '  getUser(): User | null { return this.currentUser; }',
    '  isLoggedIn(): boolean { return this.currentUser !== null; }',
    '}',
    '',
    '// forRoot() pattern — for module-based apps',
    '@NgModule({})',
    'export class SharedModule {',
    '  static forRoot(): ModuleWithProviders<SharedModule> {',
    '    return { ngModule: SharedModule, providers: [AuthService] };',
    '  }',
    '}'
  ].join('\n');

  exampleCode = [
    '// Detecting multiple instances — use a counter',
    "@Injectable({ providedIn: 'root' })",
    'export class AuthService {',
    '  static instanceCount = 0;',
    '',
    '  constructor() {',
    '    AuthService.instanceCount++;',
    "    console.log('AuthService instance #' + AuthService.instanceCount);",
    '    // Should always print #1. If you see #2, you have a duplicate.',
    '  }',
    '}',
    '',
    '// WRONG — creates a second instance in LazyModule',
    '@NgModule({',
    "  providers: [AuthService]  // DON'T re-provide root services here!",
    '})',
    'export class LazyModule {}'
  ].join('\n');

  interviewQA = [
    {
      q: "How does providedIn: 'root' guarantee a singleton?",
      a: "Angular registers the service in the root injector which spans the entire application. Since there is only one root injector, only one instance is ever created and that same instance is returned to every class that injects it."
    },
    {
      q: 'When can you accidentally get multiple service instances?',
      a: "When a service with providedIn: 'root' is also listed in a component's or module's providers array — that creates a second instance scoped to that provider. Lazy-loaded modules that re-provide the service also get their own instance."
    },
    {
      q: 'What is the forRoot() pattern and why is it used?',
      a: 'forRoot() is a convention for NgModule-based apps. Only import SharedModule.forRoot() in AppModule (which runs once) and SharedModule elsewhere (without providers). This prevents re-creating singleton services in feature modules.'
    },
    {
      q: 'How would you detect if a service has multiple instances?',
      a: 'Add a static counter to the service constructor. If instanceCount exceeds 1, you have multiple instances. Alternatively, add a unique ID (Math.random()) and log it to see different IDs from different components.'
    },
    {
      q: 'Do lazy-loaded modules break the singleton pattern?',
      a: "They can, if the service is listed in the lazy module's providers array. With providedIn: 'root', the lazy module uses the existing root instance. Only explicitly re-providing a service in a lazy module creates a new scoped instance."
    },
    {
      q: 'Is a singleton service safe for shared mutable state?',
      a: 'It can be, but requires care. Use RxJS BehaviorSubject to expose state as an Observable so all consumers react to changes. Avoid directly mutating arrays or objects — use immutable patterns to prevent hidden side effects.'
    }
  ];
}
