import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component-directive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-directive.component.html',
  styleUrl: './component-directive.component.css'
})
export class ComponentDirectiveComponent {

  syntaxCode = [
    "import { Component } from '@angular/core';",
    '',
    '@Component({',
    "  selector: 'app-my-widget',",
    '  standalone: true,',
    '  imports: [CommonModule],',
    "  templateUrl: './my-widget.component.html',",
    "  styleUrl: './my-widget.component.css'",
    '})',
    'export class MyWidgetComponent {',
    "  title = 'Hello Angular';",
    '}',
  ].join('\n');

  exampleCode = [
    '// user-card.component.ts',
    '@Component({',
    "  selector: 'app-user-card',",
    '  standalone: true,',
    '  imports: [CommonModule],',
    "  templateUrl: './user-card.component.html',",
    '})',
    'export class UserCardComponent {',
    "  @Input() name = '';",
    "  @Input() role = '';",
    "  @Input() avatar = '';",
    '}',
    '',
    '// user-card.component.html',
    '<div class="card">',
    '  <img [src]="avatar" [alt]="name" />',
    '  <h3>{{ name }}</h3>',
    '  <p>{{ role }}</p>',
    '</div>',
    '',
    '// Usage in parent',
    '<app-user-card name="Alice" role="Developer" avatar="/alice.jpg">',
    '</app-user-card>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is a Component Directive in Angular?',
      a: 'A Component Directive is a directive with its own template and styles, defined using @Component decorator. Every Angular component is a directive — @Component extends @Directive by adding template, styles, and view-related options. It is the most common directive type used to build UI building blocks.'
    },
    {
      q: 'How does @Component relate to @Directive internally?',
      a: '@Component extends @Directive. @Directive provides the foundational features (selector, host bindings, inputs, outputs, providers), while @Component adds templateUrl/template, styleUrl/styles, changeDetection, and encapsulation. You can think of every component as a directive that renders a view.'
    },
    {
      q: 'What are the mandatory and optional properties in @Component decorator?',
      a: 'Selector is the only practically required property (Angular needs to know where to insert the component). templateUrl or template is needed to define the view. Other important optional properties include: standalone, imports, providers, changeDetection, encapsulation, and styleUrl/styles.'
    },
    {
      q: 'What is the difference between templateUrl and inline template?',
      a: "templateUrl points to an external .html file, enabling IDE support, syntax highlighting, and separation of concerns. Inline template (template: `...`) is convenient for simple components. Best practice: use templateUrl for anything beyond 2–3 lines to keep .ts files focused on logic."
    },
    {
      q: 'What does standalone: true mean in Angular?',
      a: 'standalone: true removes the need for the component to be declared in an NgModule. Instead, it declares its own dependencies via the imports array (e.g., CommonModule, RouterModule, other standalone components). This is the recommended pattern from Angular 14+ and is the default from Angular 17+.'
    },
    {
      q: 'What types of selectors can a component have?',
      a: "A component selector can be: (1) element selector: 'app-hero' — used as <app-hero>, (2) attribute selector: '[appHero]' — used as <div appHero>, (3) class selector: '.app-hero' — used as <div class=\"app-hero\">. Element selectors are the standard convention for components."
    },
    {
      q: 'What is ChangeDetectionStrategy.OnPush and when should you use it?',
      a: "OnPush tells Angular to only re-render the component when: (1) an @Input reference changes, (2) an event originates from the component or its children, (3) an async pipe resolves, or (4) ChangeDetectorRef.markForCheck() is called. Use it for performance-intensive components with immutable data to avoid unnecessary re-renders."
    },
  ];
}
