import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-child.component.html',
  styleUrl: './content-child.component.css',
})
export class ContentChildComponent {
  syntaxCode = [
    "import { Component, ContentChild, ContentChildren,",
    "         AfterContentInit, ElementRef, QueryList } from '@angular/core';",
    '',
    '// 1. Access a projected component by class',
    '@ContentChild(CardHeaderComponent) header!: CardHeaderComponent;',
    '',
    '// 2. Access a projected element by template ref variable (#title)',
    "@ContentChild('title') titleEl!: ElementRef;",
    '',
    '// 3. Multiple projected children',
    '@ContentChildren(TabPanelComponent) panels!: QueryList<TabPanelComponent>;',
    '',
    '// Safe to access in ngAfterContentInit',
    'ngAfterContentInit() {',
    '  if (this.header) {',
    "    this.header.setTheme('dark');",
    '  }',
    '  this.panels.forEach((p, i) => (p.index = i));',
    '}',
    '',
    '// Component template that uses ng-content',
    '// <ng-content select="app-card-header"></ng-content>',
    '// <ng-content></ng-content>',
  ].join('\n');

  exampleCode = [
    '// card.component.ts — reusable card that reads projected header',
    "import { Component, ContentChild, AfterContentInit } from '@angular/core';",
    "import { CardHeaderComponent } from './card-header.component';",
    '',
    "@Component({",
    "  selector: 'app-card',",
    '  standalone: true,',
    '  imports: [CardHeaderComponent],',
    '  template: `',
    '    <div class="card">',
    '      <ng-content select="app-card-header"></ng-content>',
    '      <div class="card-body">',
    '        <ng-content></ng-content>',
    '      </div>',
    '    </div>',
    '  `',
    '})',
    'export class CardComponent implements AfterContentInit {',
    '  @ContentChild(CardHeaderComponent) header!: CardHeaderComponent;',
    '',
    '  ngAfterContentInit() {',
    '    if (this.header) {',
    '      console.log(\'Projected header title:\', this.header.title);',
    '    }',
    '  }',
    '}',
    '',
    '// card-header.component.ts',
    "@Component({ selector: 'app-card-header', standalone: true, template: '<h2>{{title}}</h2>' })",
    'export class CardHeaderComponent {',
    "  @Input() title = '';",
    '}',
    '',
    '// Usage in parent',
    '<app-card>',
    '  <app-card-header title="User Profile"></app-card-header>',
    '  <p>User details go here...</p>',
    '</app-card>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is @ContentChild and how does it differ from @ViewChild?',
      a: '@ViewChild queries elements defined in the component\'s own template. @ContentChild queries elements projected into the component from outside via <ng-content>. The crucial difference: @ViewChild is available after ngAfterViewInit; @ContentChild is available after ngAfterContentInit, which runs earlier. If you have a reusable card where consumers supply a header via projection, you use @ContentChild to access that header.',
    },
    {
      q: 'When does @ContentChild become available?',
      a: '@ContentChild becomes available after ngAfterContentInit fires. This lifecycle hook runs after Angular has projected external content into the component\'s <ng-content> slots. Accessing @ContentChild before ngAfterContentInit (e.g., in the constructor or ngOnInit) will yield undefined. Always put logic that uses @ContentChild inside ngAfterContentInit.',
    },
    {
      q: 'What is the difference between @ContentChild and @ContentChildren?',
      a: '@ContentChild retrieves the first matching projected element or component and returns a single reference. @ContentChildren retrieves all matching projected elements and returns a live QueryList<T> that updates when the projected content changes (e.g., with *ngIf or *ngFor inside the projected content). Use @ContentChildren for tab panels, list items, or any scenario with multiple projected items.',
    },
    {
      q: 'How is @ContentChild used to build flexible, reusable container components?',
      a: 'Container components (cards, modals, accordions) use <ng-content> to project consumer-provided content. With @ContentChild, the container can inspect or configure projected components — for example, a TabGroup uses @ContentChildren(TabPanelComponent) to know how many tabs to render in its navigation. This avoids requiring @Input arrays, letting consumers write declarative HTML instead.',
    },
    {
      q: 'Can @ContentChild access elements across multiple levels of projection?',
      a: 'By default, @ContentChild only looks at directly projected content (descendants: false). Setting { descendants: true } (default for @ContentChildren in some versions) allows it to reach deeper into projected subtrees. However, deep content querying creates tight coupling. For complex hierarchies, prefer a service-based or signal-based approach to communicate between projected components and their container.',
    },
    {
      q: 'What is the relationship between ng-content, @ContentChild, and ngAfterContentInit?',
      a: 'They form a trio: <ng-content> is the template slot that accepts projected content; @ContentChild queries that projected content and injects a reference into the class; ngAfterContentInit is the lifecycle hook Angular calls after the projected content is initialized and @ContentChild is resolved. You must use all three together for robust projected-content access: define the slot, query it, and access it in the correct hook.',
    },
  ];
}
