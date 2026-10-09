import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng-after-content-init',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-after-content-init.component.html',
  styleUrl: './ng-after-content-init.component.css',
})
export class NgAfterContentInitComponent {
  syntaxCode = [
    'import {',
    '  Component, AfterContentInit,',
    '  ContentChild, ContentChildren, QueryList',
    '} from "@angular/core";',
    '',
    '@Component({',
    '  selector: "app-tabs",',
    '  template: `',
    '    <div class="tabs">',
    '      <ng-content></ng-content>',
    '    </div>',
    '  `',
    '})',
    'export class TabsComponent implements AfterContentInit {',
    '  // Query projected content (children inside <app-tabs>...</app-tabs>)',
    '  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;',
    '',
    '  // Runs ONCE after ng-content is projected and initialized',
    '  ngAfterContentInit() {',
    '    console.log("Projected tabs:", this.tabs.length);',
    '    // ✅ this.tabs is available here',
    '    if (this.tabs.length > 0) {',
    '      this.tabs.first.isActive = true; // Activate first tab',
    '    }',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// Real-world: Accordion Component with projected panels',
    '',
    '@Component({',
    '  selector: "app-accordion",',
    '  template: `',
    '    <div class="accordion">',
    '      <ng-content select="app-accordion-panel"></ng-content>',
    '    </div>',
    '  `',
    '})',
    'export class AccordionComponent implements AfterContentInit {',
    '  @ContentChildren(AccordionPanelComponent)',
    '  panels!: QueryList<AccordionPanelComponent>;',
    '',
    '  ngAfterContentInit() {',
    '    // ✅ All projected panels are now available',
    '    this.panels.forEach((panel, index) => {',
    '      panel.toggle.subscribe(() => this.onPanelToggle(index));',
    '    });',
    '',
    '    // Subscribe to future additions (lazy-loaded panels)',
    '    this.panels.changes.subscribe(updatedPanels => {',
    '      console.log("Panels updated:", updatedPanels.length);',
    '    });',
    '  }',
    '',
    '  onPanelToggle(index: number) {',
    '    this.panels.forEach((p, i) => p.isOpen = i === index);',
    '  }',
    '}',
    '',
    '// Usage in parent:',
    '// <app-accordion>',
    '//   <app-accordion-panel title="Section 1">Content 1</app-accordion-panel>',
    '//   <app-accordion-panel title="Section 2">Content 2</app-accordion-panel>',
    '// </app-accordion>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is ngAfterContentInit and when does it fire?',
      a: 'ngAfterContentInit is an Angular lifecycle hook that fires once, after Angular has projected external content into the component\'s view via <ng-content> and initialized the projected content. At this point, @ContentChild and @ContentChildren queries are fully resolved and the projected components are initialized. It fires after ngDoCheck on the first cycle and never fires again — it is a one-time "content ready" signal.',
    },
    {
      q: 'What is content projection in Angular?',
      a: 'Content projection is a pattern where a parent component passes HTML (including other components) into a child component\'s template slot defined by <ng-content>. Example: <app-card><h2>Title</h2><p>Body</p></app-card> — the CardComponent\'s template has <ng-content></ng-content> which renders the projected h2 and p. This enables reusable wrapper components (modals, cards, tabs, accordions) that accept arbitrary content from their parent.',
    },
    {
      q: 'What is @ContentChild and @ContentChildren?',
      a: '@ContentChild queries the first matching component/directive/element projected into the component via <ng-content>. @ContentChildren queries all matching items and returns a QueryList<T>. Both are only available (non-null) in ngAfterContentInit and later — they are undefined in the constructor and ngOnInit. This is a common interview trap: trying to access @ContentChild in ngOnInit will always return undefined.',
    },
    {
      q: 'What is the difference between @ContentChild and @ViewChild?',
      a: '@ContentChild queries elements projected into the component from outside (via ng-content) — these are the host\'s children in the DOM sense. @ViewChild queries elements that are part of the component\'s own template (defined inside the component\'s templateUrl/template). @ContentChild is resolved in ngAfterContentInit; @ViewChild is resolved in ngAfterViewInit. Mixing them up is a common interview mistake.',
    },
    {
      q: 'Can you access @ContentChild in ngOnInit?',
      a: 'No. @ContentChild is null/undefined in ngOnInit because Angular has not yet projected the content into the view at that point. Content projection happens after ngOnInit and ngDoCheck — the lifecycle hook specifically designed for accessing projected content is ngAfterContentInit. If you try to access @ContentChild in ngOnInit you will get undefined and a potential null pointer error. Always access @ContentChild/@ContentChildren in ngAfterContentInit or later.',
    },
    {
      q: 'How does QueryList.changes work in ngAfterContentInit?',
      a: 'QueryList<T> (returned by @ContentChildren) is a live list that updates when the projected content changes dynamically. In ngAfterContentInit, you can subscribe to queryList.changes (an Observable) to react whenever projected content is added or removed — for example, when items are lazily loaded or conditionally rendered with *ngIf. This subscription should be cleaned up in ngOnDestroy using takeUntil or unsubscribe.',
    },
  ];
}
