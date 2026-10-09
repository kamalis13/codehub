import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-injector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './injector.component.html',
  styleUrl: './injector.component.css'
})
export class InjectorComponent {
  syntaxCode = [
    '// Using injector hierarchy decorators',
    '@Component({',
    "  selector: 'app-child',",
    '  providers: [LogService]  // component-level injector',
    '})',
    'export class ChildComponent {',
    '  constructor(',
    '    private log: LogService,           // resolved from component injector',
    '    @SkipSelf() private parent: LogService, // skip self, go to parent',
    '    @Optional() private opt?: OptService,   // null if not found',
    '    @Self() private self: LogService        // only from this injector',
    '  ) {}',
    '}'
  ].join('\n');

  exampleCode = [
    '// NullInjector (root of the hierarchy — throws NullInjectorError)',
    '//   └── PlatformInjector (platform-level services)',
    '//         └── AppInjector / RootInjector (providedIn: \'root\')',
    '//               └── ModuleInjector (NgModule providers)',
    '//                     └── ElementInjector (component/directive providers)',
    '',
    '// Practical: accessing injector programmatically',
    '@Component({ ... })',
    'export class DynamicComponent {',
    '  constructor(private injector: Injector) {',
    '    const service = this.injector.get(MyService);',
    '    // Use when you need to lazily resolve a dependency',
    '  }',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: "What is Angular's injector hierarchy?",
      a: "NullInjector (top, throws errors) → PlatformInjector → Root/AppInjector (providedIn: 'root' services) → ModuleInjector → ElementInjector (component-level providers). Angular walks from bottom to top when resolving dependencies."
    },
    {
      q: 'What does @Self() do?',
      a: "@Self() restricts injection lookup to the current component's injector only. If the token is not found there, Angular throws immediately instead of walking up the hierarchy."
    },
    {
      q: 'What does @SkipSelf() do?',
      a: "@SkipSelf() skips the current component's injector and starts the lookup at the parent injector. Useful when a child component needs the parent's instance, not its own locally-provided one."
    },
    {
      q: 'What does @Optional() do?',
      a: '@Optional() tells Angular to return null instead of throwing NullInjectorError if a provider is not found anywhere in the hierarchy. Always check for null before using an optional dependency.'
    },
    {
      q: 'When would you inject the Injector class itself?',
      a: 'When you need to lazily or conditionally resolve a dependency at runtime rather than at construction time. For example, in dynamic component creation or plugin systems where the exact service needed is not known at compile time.'
    },
    {
      q: 'What is the ElementInjector vs ModuleInjector?',
      a: 'ElementInjector is associated with component/directive tree nodes (providers in @Component). ModuleInjector is associated with NgModules (providers in @NgModule). In standalone apps, component-level providers still form an ElementInjector tree.'
    }
  ];
}
