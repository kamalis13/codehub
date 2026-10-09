import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dependency-injection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dependency-injection.component.html',
  styleUrl: './dependency-injection.component.css'
})
export class DependencyInjectionComponent {
  syntaxCode = [
    '// Constructor injection — most common pattern',
    '@Component({ ... })',
    'export class ProductComponent {',
    '  constructor(',
    '    private productService: ProductService,  // Angular resolves this',
    '    private router: Router,',
    "    @Inject(API_URL) private apiUrl: string  // inject by token",
    '  ) {}',
    '}',
    '',
    '// @Inject with InjectionToken',
    "export const API_URL = new InjectionToken<string>('API_URL');"
  ].join('\n');

  exampleCode = [
    '// Hierarchical DI example',
    "// Root level provider (singleton)",
    "@Injectable({ providedIn: 'root' })",
    'export class AuthService { ... }',
    '',
    '// Component-level provider (new instance per component)',
    '@Component({',
    "  selector: 'app-cart',",
    '  providers: [CartService]  // scoped instance',
    '})',
    'export class CartComponent {',
    '  constructor(',
    '    private auth: AuthService,   // from root injector',
    '    private cart: CartService    // from component injector',
    '  ) {}',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is Dependency Injection in Angular?',
      a: "DI is a design pattern where a class declares its dependencies as constructor parameters instead of creating them. Angular's injector reads these declarations and provides the correct instances automatically."
    },
    {
      q: "What are the three levels of Angular's DI hierarchy?",
      a: 'Platform injector (highest) → Root injector (app-wide singletons) → Module injector (feature singletons) → Element/Component injector (scoped instances). Angular walks up the tree until it finds a provider.'
    },
    {
      q: 'What is the @Inject decorator used for?',
      a: '@Inject explicitly specifies the injection token when TypeScript type alone is insufficient — for example, injecting primitive values or InjectionTokens like API_URL that are not classes.'
    },
    {
      q: 'What is constructor injection vs property injection?',
      a: "Constructor injection is Angular's standard approach — dependencies are declared in the constructor and resolved before the component is created. Property injection (inject() function) is the modern alternative for standalone contexts."
    },
    {
      q: 'How does Angular resolve a dependency?',
      a: "Angular starts at the requesting component's injector, walks up the injector hierarchy toward the root, and uses the first matching provider found. If no provider is found, it throws a NullInjectorError unless @Optional is used."
    },
    {
      q: 'What is the inject() function introduced in Angular 14+?',
      a: 'inject() is a functional alternative to constructor injection, usable inside constructors, factory functions, and injection contexts. It improves tree-shakability and enables DI outside class constructors.'
    }
  ];
}
