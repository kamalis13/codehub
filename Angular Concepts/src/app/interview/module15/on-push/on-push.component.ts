import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-on-push',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './on-push.component.html',
  styleUrl: './on-push.component.css',
})
export class OnPushComponent {
  definition = 'OnPush is a change detection strategy (ChangeDetectionStrategy.OnPush) that tells Angular to skip checking a component unless an @Input reference changes, an event fires inside the component, an Observable marked with async pipe emits, or ChangeDetectorRef.markForCheck() is called manually. It trades automatic synchronization for performance.';

  whyNeeded = 'Angular\'s Default change detection checks EVERY component in the tree on EVERY browser event (click, keypress, timer, XHR). In an app with 200 components, a single click triggers 200 checks. OnPush tells Angular to skip components entirely unless something that can change their state actually happened, reducing checks from 200 to perhaps 3-5.';

  syntaxCode = [
    'import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";',
    '',
    '@Component({',
    '  selector: "app-product-card",',
    '  standalone: true,',
    '  changeDetection: ChangeDetectionStrategy.OnPush,',
    '  templateUrl: "./product-card.component.html",',
    '})',
    'export class ProductCardComponent {',
    '  @Input() product!: Product; // triggers check on new reference only',
    '',
    '  constructor(private cdr: ChangeDetectorRef) {}',
    '',
    '  // Manually trigger check after async operation',
    '  loadDetails() {',
    '    this.service.getDetails().subscribe(data => {',
    '      this.details = data;',
    '      this.cdr.markForCheck(); // schedules check at next CD cycle',
    '    });',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// Real-world: product list with OnPush + async pipe',
    '@Component({',
    '  changeDetection: ChangeDetectionStrategy.OnPush,',
    '  template: `',
    '    <div *ngFor="let p of products$ | async; trackBy: trackById">',
    '      {{ p.name }}',
    '    </div>',
    '  `',
    '})',
    'export class ProductListComponent {',
    '  products$ = this.store.select(selectProducts); // Observable',
    '',
    '  trackById = (_: number, p: Product) => p.id;',
    '}',
    '',
    '// async pipe automatically calls markForCheck() on each emission',
    '// OnPush + async pipe + trackBy = maximum performance combo',
  ].join('\n');

  internalWorking = 'Angular maintains a component tree. In Default mode, it traverses the entire tree bottom-up on every change detection run. In OnPush mode, a component and its subtree are marked as "clean" and skipped unless: a new object/array reference arrives via @Input, a DOM event fires within the component, an Observable completes through the async pipe, or markForCheck()/detectChanges() is called. markForCheck() marks the component and all ancestors dirty; detectChanges() immediately runs CD on the component subtree synchronously.';

  advantages = [
    'Dramatically reduces change detection cycles in large component trees',
    'Improves frame rate and responsiveness on complex UIs',
    'Forces immutable data patterns (better predictability)',
    'Works seamlessly with NgRx/signals/async pipe',
    'Can reduce CPU usage by 70-90% in data-heavy applications',
    'Encourages better component architecture (pure/dumb components)',
  ];

  disadvantages = [
    'Requires immutable data patterns — mutating objects does not trigger updates',
    'Steeper learning curve — requires understanding when checks are skipped',
    'Manual markForCheck()/detectChanges() needed for non-Observable async data',
    'Debugging missed updates can be tricky',
    'Requires discipline across the entire team to use correctly',
  ];

  bestPractices = [
    'Use OnPush on all leaf/presentational (dumb) components',
    'Combine with async pipe to let Angular handle markForCheck() automatically',
    'Use immutable updates — always create new objects/arrays instead of mutating',
    'Use markForCheck() for manually triggered async operations',
    'Use detectChanges() sparingly — only when you need synchronous immediate update',
    'Pair with NgRx, Signals, or BehaviorSubject for reactive state management',
  ];

  commonMistakes = [
    'Mutating @Input objects/arrays — Angular does not detect mutation, only reference changes',
    'Calling detectChanges() inside the constructor — component is not fully initialized',
    'Using OnPush on container/smart components that manage lots of async state (use async pipe instead)',
    'Forgetting markForCheck() after subscribing inside the component without async pipe',
    'Mixing mutable and immutable patterns inconsistently across the team',
  ];

  interviewQA = [
    {
      q: 'What is the difference between Default and OnPush change detection?',
      a: 'Default checks every component on every change detection cycle regardless of whether its data changed. OnPush skips a component unless: its @Input reference changed, an event fired inside it, an async pipe emitted, or markForCheck() was called — reducing checks dramatically in large trees.'
    },
    {
      q: 'What triggers change detection in an OnPush component?',
      a: 'Four things: (1) A new object reference arrives via @Input, (2) a DOM event fires inside the component or its children, (3) an Observable completes through the async pipe, (4) ChangeDetectorRef.markForCheck() or detectChanges() is called manually.'
    },
    {
      q: 'What is the difference between markForCheck() and detectChanges()?',
      a: 'markForCheck() marks the component and all its ancestors as dirty and schedules a check at the next change detection cycle (asynchronous). detectChanges() immediately runs change detection synchronously on the component and its subtree. Use markForCheck() in most cases; detectChanges() when you need an immediate synchronous update.'
    },
    {
      q: 'Why does mutating an @Input object not trigger OnPush?',
      a: 'OnPush uses reference equality (===) to compare @Input values. Mutating an object changes its properties but not its reference — the before and after references are the same object. Angular sees no change and skips the component. Always create new objects/arrays for OnPush to work correctly.'
    },
    {
      q: 'How does the async pipe work with OnPush change detection?',
      a: 'The async pipe subscribes to an Observable and calls ChangeDetectorRef.markForCheck() every time a new value is emitted. This is why async pipe + OnPush is the ideal combination — the pipe handles the CD trigger automatically, eliminating the need for manual markForCheck() calls.'
    },
    {
      q: 'What performance improvement can OnPush provide in a real application?',
      a: 'In a typical enterprise Angular app with 100-200 components, Default change detection may check all components hundreds of times per second. OnPush can reduce this by 70-90%, especially on data-heavy dashboards, list views, and real-time update screens where most components do not change on every event.'
    },
  ];
}
