import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.css'
})
export class ProvidersComponent {
  syntaxCode = [
    '// Four provider types',
    'providers: [',
    '  // 1. useClass — provide a different implementation',
    '  { provide: LoggerService, useClass: ConsoleLoggerService },',
    '',
    '  // 2. useValue — provide a plain value or object',
    "  { provide: API_URL, useValue: 'https://api.example.com' },",
    '',
    '  // 3. useFactory — create instance via a function',
    '  { provide: DataService, useFactory: (http: HttpClient) =>',
    '      new DataService(http), deps: [HttpClient] },',
    '',
    '  // 4. useExisting — alias one token to another',
    '  { provide: OldService, useExisting: NewService }',
    ']'
  ].join('\n');

  exampleCode = [
    '// InjectionToken for environment config',
    "export const API_URL = new InjectionToken<string>('API_URL');",
    '',
    '// app.config.ts (standalone app)',
    'export const appConfig: ApplicationConfig = {',
    '  providers: [',
    '    provideRouter(routes),',
    '    provideHttpClient(),',
    '    { provide: API_URL, useValue: environment.apiUrl },',
    '    { provide: LoggerService, useClass:',
    '        environment.production ? SilentLogger : ConsoleLogger }',
    '  ]',
    '};',
    '',
    '// Consuming the token',
    "@Injectable({ providedIn: 'root' })",
    'export class UserService {',
    '  constructor(@Inject(API_URL) private apiUrl: string) {}',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'What are the four types of Angular providers?',
      a: 'useClass (provide a different class), useValue (provide a literal value/object), useFactory (provide an instance created by a factory function), and useExisting (alias one token to another existing provider).'
    },
    {
      q: 'What is an InjectionToken and when do you use it?',
      a: "An InjectionToken is a unique identifier for injecting non-class values like strings, numbers, or configuration objects. Use it when the DI token cannot be a class — for example, injecting an API URL string or a configuration object."
    },
    {
      q: "What is the difference between providedIn: 'root' and providedIn: 'any'?",
      a: "'root' creates a single shared instance for the entire application (true singleton). 'any' creates a unique instance for each lazy-loaded module plus one shared instance for eagerly-loaded modules."
    },
    {
      q: 'What are tree-shakable providers and why do they matter?',
      a: "When you use providedIn: 'root' in @Injectable, Angular can remove the service from the bundle if nothing injects it. Providers in NgModule.providers arrays are always included, even if unused."
    },
    {
      q: 'When would you use useFactory over useClass?',
      a: 'Use useFactory when you need to run initialization logic or make the provider conditional at runtime — for example, choosing between mock and real implementations based on environment, or passing configuration into a constructor.'
    },
    {
      q: 'What does useExisting do differently from useClass?',
      a: 'useExisting creates an alias — both tokens point to the same instance. useClass creates a new instance of the specified class. Use useExisting to make an old API token redirect to a new service without breaking existing code.'
    }
  ];
}
