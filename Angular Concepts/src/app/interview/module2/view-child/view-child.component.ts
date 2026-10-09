import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-child.component.html',
  styleUrl: './view-child.component.css',
})
export class ViewChildComponent {
  syntaxCode = [
    "import { Component, ViewChild, ViewChildren,",
    "         AfterViewInit, ElementRef, QueryList } from '@angular/core';",
    '',
    '// 1. Reference a child component class',
    '@ViewChild(SearchComponent) searchComp!: SearchComponent;',
    '',
    '// 2. Reference a template ref variable (#myRef)',
    "@ViewChild('inputRef') inputEl!: ElementRef<HTMLInputElement>;",
    '',
    '// 3. Multiple children — QueryList',
    '@ViewChildren(TabComponent) tabs!: QueryList<TabComponent>;',
    '',
    '// 4. Static option — resolves at compile time (no ngAfterViewInit needed)',
    "@ViewChild('header', { static: true }) header!: ElementRef;",
    '',
    '// 5. Read a different token (e.g. ElementRef instead of component)',
    "@ViewChild(SearchComponent, { read: ElementRef }) searchEl!: ElementRef;",
    '',
    '// Access in ngAfterViewInit (the ONLY safe place for @ViewChild)',
    'ngAfterViewInit() {',
    '  this.searchComp.focus();',
    '  this.inputEl.nativeElement.focus();',
    '  this.tabs.forEach(t => t.activate());',
    '}',
  ].join('\n');

  exampleCode = [
    '// wizard.component.ts — parent accesses child form to validate/reset',
    "import { Component, ViewChild, AfterViewInit } from '@angular/core';",
    "import { StepFormComponent } from './step-form.component';",
    '',
    "@Component({",
    "  selector: 'app-wizard',",
    '  standalone: true,',
    '  imports: [StepFormComponent],',
    '  template: `',
    '    <app-step-form #stepForm></app-step-form>',
    '    <button (click)="next()">Next</button>',
    '    <button (click)="reset()">Reset</button>',
    '  `',
    '})',
    'export class WizardComponent implements AfterViewInit {',
    '  @ViewChild(StepFormComponent) stepForm!: StepFormComponent;',
    '  // OR by template ref: @ViewChild(\'stepForm\') stepForm!: StepFormComponent;',
    '',
    '  ngAfterViewInit() {',
    '    // Now safe to interact with stepForm',
    '    console.log(\'Form valid:\', this.stepForm.isValid());',
    '  }',
    '',
    '  next() {',
    '    if (this.stepForm.isValid()) { /* proceed */ }',
    '  }',
    '',
    '  reset() {',
    '    this.stepForm.resetForm();',
    '  }',
    '}',
    '',
    '// step-form.component.ts',
    'export class StepFormComponent {',
    '  isValid() { return true; }',
    '  resetForm() { /* clear fields */ }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is @ViewChild and what can it reference?',
      a: '@ViewChild is a decorator that queries the component\'s own template for a single element or component and injects a reference into the parent class. It can reference: (1) a child component class — gives access to the child\'s public API; (2) a template reference variable (#ref) — gives an ElementRef or TemplateRef; (3) a directive — gives the directive instance; (4) a provider token via the read option.',
    },
    {
      q: 'When does @ViewChild become available and why?',
      a: '@ViewChild (with static: false, the default) is resolved after the component\'s view is fully initialized, which happens after ngAfterViewInit runs. Before that lifecycle hook, the property is undefined. Using it in the constructor or ngOnInit will throw because the template has not been rendered yet. The static: true option resolves the query before change detection, but only works for static (non-structural-directive) elements.',
    },
    {
      q: 'What is the difference between @ViewChild and @ViewChildren?',
      a: '@ViewChild retrieves the first matching element/component and returns a single reference. @ViewChildren retrieves all matching elements/components and returns a QueryList<T>, which is an iterable live collection that updates when items are added/removed. Use @ViewChildren when you need to operate on multiple instances, for example tabbing through all TabComponent instances.',
    },
    {
      q: 'What does the static option in @ViewChild do?',
      a: 'static: true resolves the @ViewChild query before change detection runs, making the reference available in ngOnInit. It only works if the queried element is always present in the template (not wrapped in *ngIf or *ngFor). static: false (default) resolves after the first change detection run, which is safer for conditional content but requires ngAfterViewInit. Angular 9+ changed the default to false.',
    },
    {
      q: 'How does @ViewChild differ from @ContentChild?',
      a: '@ViewChild queries the component\'s own template. @ContentChild queries content projected into the component via <ng-content>. They become available at different lifecycle stages: @ViewChild at ngAfterViewInit, @ContentChild at ngAfterContentInit. If you have a reusable card component where consumers project a header, you use @ContentChild to access that projected header.',
    },
    {
      q: 'What are the risks of using @ViewChild and how do you mitigate them?',
      a: 'Risks include: (1) Tight coupling — parent knows child internals, making refactoring harder; (2) Accessing before ngAfterViewInit causes undefined errors; (3) Using nativeElement directly (ElementRef) bypasses Angular\'s security model and breaks server-side rendering. Mitigations: prefer @Input/@Output for standard communication; use Renderer2 instead of nativeElement; add null-safe access with the ?. operator; only use @ViewChild for scenarios where @Output is insufficient (like imperative focus management).',
    },
  ];
}
