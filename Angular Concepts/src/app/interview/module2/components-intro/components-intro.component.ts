import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-components-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './components-intro.component.html',
  styleUrl: './components-intro.component.css',
})
export class ComponentsIntroComponent {
  syntaxCode = [
    "import { Component } from '@angular/core';",
    "import { CommonModule } from '@angular/common';",
    '',
    '@Component({',
    "  selector: 'app-user-card',      // custom HTML tag",
    '  standalone: true,               // no NgModule needed',
    '  imports: [CommonModule],        // declare dependencies here',
    "  templateUrl: './user-card.component.html',",
    "  styleUrl: './user-card.component.css',",
    '  // Optional:',
    "  // encapsulation: ViewEncapsulation.Emulated, // default",
    "  // changeDetection: ChangeDetectionStrategy.OnPush,",
    '})',
    'export class UserCardComponent {',
    "  title = 'Hello Angular';",
    '  count = 0;',
    '',
    '  increment() {',
    '    this.count++;',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// user-card.component.ts',
    "import { Component, Input } from '@angular/core';",
    '',
    '@Component({',
    "  selector: 'app-user-card',",
    '  standalone: true,',
    "  template: `",
    '    <div class="card">',
    '      <img [src]="user.avatar" [alt]="user.name">',
    '      <h3>{{ user.name }}</h3>',
    '      <p>{{ user.email }}</p>',
    '      <span class="badge">{{ user.role }}</span>',
    '    </div>',
    '  `',
    '})',
    'export class UserCardComponent {',
    "  @Input() user = { name: '', email: '', role: '', avatar: '' };",
    '}',
    '',
    '// app.component.html — parent usage',
    '<app-user-card',
    '  [user]="{ name: \'Alice\', email: \'alice@example.com\', role: \'Admin\', avatar: \'/alice.png\' }"',
    '></app-user-card>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is an Angular component and what are its four core parts?',
      a: 'An Angular component is a TypeScript class decorated with @Component that controls a portion of the screen (a view). Its four core parts are: (1) Selector — the custom HTML tag used to embed the component; (2) Template — HTML that defines what is rendered; (3) Styles — CSS scoped to this component; (4) Class — TypeScript logic containing properties and methods that the template binds to.',
    },
    {
      q: 'What is the difference between a standalone component and a module-based component?',
      a: 'A module-based component must be declared inside an NgModule\'s declarations array and uses that module\'s imports. A standalone component (Angular 14+) has standalone: true in @Component and declares its own dependencies in its imports array. Standalone components eliminate the need for NgModules and make the architecture simpler and more tree-shakable.',
    },
    {
      q: 'What is the role of the selector in @Component and what types of selectors can you use?',
      a: 'The selector defines how the component is embedded in templates. Angular supports three types: (1) Element selector (app-user-card) — most common for components; (2) Attribute selector ([appHighlight]) — common for directives; (3) Class selector (.app-card) — least common. Element selectors are the Angular convention for components.',
    },
    {
      q: 'What is View Encapsulation in Angular?',
      a: 'View Encapsulation controls how component CSS is scoped. Three modes: (1) Emulated (default) — Angular adds unique attribute selectors to component elements, mimicking shadow DOM scoping without using it; (2) ShadowDom — uses native browser Shadow DOM for true style isolation; (3) None — styles are applied globally with no scoping. Emulated is recommended for most cases.',
    },
    {
      q: 'What is ChangeDetectionStrategy.OnPush and when should you use it?',
      a: 'OnPush tells Angular to skip change detection for a component unless: (1) an @Input reference changes, (2) an event originates from the component or its children, (3) an Observable used with the async pipe emits, or (4) change detection is triggered manually via ChangeDetectorRef. Use it for performance optimization in large component trees where inputs are immutable objects.',
    },
    {
      q: 'What happens when Angular bootstraps an application?',
      a: 'Angular starts by loading the root component (e.g., AppComponent) specified in bootstrapApplication() or the AppModule\'s bootstrap array. It creates a component tree rooted at AppComponent, initializes change detection, renders the root template into the index.html host element (typically <app-root>), and recursively creates all child components. The zone.js library patches async APIs to trigger change detection automatically.',
    },
  ];
}
