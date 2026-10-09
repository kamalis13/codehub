import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng-after-content-checked',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-after-content-checked.component.html',
  styleUrl: './ng-after-content-checked.component.css',
})
export class NgAfterContentCheckedComponent {
  syntaxCode = [
    'import {',
    '  Component, AfterContentChecked,',
    '  ContentChildren, QueryList',
    '} from "@angular/core";',
    '',
    '@Component({',
    '  selector: "app-notification-list",',
    '  template: `',
    '    <div class="notifications">',
    '      <ng-content></ng-content>',
    '    </div>',
    '    <p>Active notifications: {{ activeCount }}</p>',
    '  `',
    '})',
    'export class NotificationListComponent implements AfterContentChecked {',
    '  @ContentChildren(NotificationComponent)',
    '  notifications!: QueryList<NotificationComponent>;',
    '',
    '  activeCount = 0;',
    '',
    '  // Called after EVERY change detection check on projected content',
    '  ngAfterContentChecked() {',
    '    // ✅ Recalculate count after every CD cycle on projected content',
    '    this.activeCount = this.notifications',
    '      ? this.notifications.filter(n => n.isVisible).length',
    '      : 0;',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// Real-world: Validation summary — track invalid form fields in projected content',
    '',
    '@Component({',
    '  selector: "app-form-group",',
    '  template: `',
    '    <form>',
    '      <ng-content></ng-content>',
    '      <div class="error-summary" *ngIf="errorCount > 0">',
    '        {{ errorCount }} field(s) have errors.',
    '      </div>',
    '    </form>',
    '  `',
    '})',
    'export class FormGroupComponent implements AfterContentChecked {',
    '  @ContentChildren(FormFieldComponent)',
    '  fields!: QueryList<FormFieldComponent>;',
    '',
    '  errorCount = 0;',
    '',
    '  ngAfterContentChecked() {',
    '    // Track how many projected form fields are invalid',
    '    // Called after each CD pass on projected content',
    '    this.errorCount = this.fields',
    '      ? this.fields.filter(f => f.hasError).length',
    '      : 0;',
    '  }',
    '}',
    '',
    '// ⚠️ CAUTION: Fires very frequently — keep logic simple and fast.',
    '// Avoid triggering new change detection inside ngAfterContentChecked.',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is ngAfterContentChecked and when does it fire?',
      a: 'ngAfterContentChecked is an Angular lifecycle hook that fires after every change detection cycle that checks the component\'s projected content. Unlike ngAfterContentInit (which fires only once), ngAfterContentChecked fires on every CD cycle — first after ngAfterContentInit, then after every subsequent ngDoCheck. It is the projected-content equivalent of ngAfterViewChecked.',
    },
    {
      q: 'What is the difference between ngAfterContentInit and ngAfterContentChecked?',
      a: 'ngAfterContentInit fires once — after the first time projected content is initialized. ngAfterContentChecked fires on every change detection cycle that checks the projected content. Use ngAfterContentInit for one-time setup (querying projected components, subscribing to events). Use ngAfterContentChecked only when you need to react to recurring changes in projected content state — but be very cautious of performance impact since it runs so frequently.',
    },
    {
      q: 'What causes ExpressionChangedAfterItHasBeenCheckedError in ngAfterContentChecked?',
      a: 'This error occurs in development mode when you modify a value that has already been checked in the current CD cycle. If you change a bound property (like this.activeCount) in ngAfterContentChecked, Angular will detect that the value changed after it already checked it and throw this error. The fix is to use ChangeDetectorRef.detectChanges() after the mutation, wrap in setTimeout(0) (not recommended), or restructure the logic to avoid changing state in this hook.',
    },
    {
      q: 'How does ngAfterContentChecked affect performance?',
      a: 'ngAfterContentChecked fires on every change detection cycle for the component, which can be very frequent in a Zone.js-based app (every click, keypress, setTimeout, HTTP call). Any computation inside this hook runs on every event in the entire app. Best practice: keep the logic O(1) or as simple as possible. If you have expensive operations, consider caching results and only recomputing when a flag changes, or restructure to use ngAfterContentInit with QueryList.changes subscription instead.',
    },
    {
      q: 'When is it appropriate to use ngAfterContentChecked?',
      a: 'ngAfterContentChecked is appropriate when you need to recalculate derived state from projected content on every CD cycle — for example, counting visible notifications, tracking invalid form fields, or updating a summary based on the current state of projected children. It is most useful in container/wrapper components that need to react to frequent state changes in their projected content. For infrequent changes, prefer QueryList.changes subscription set up in ngAfterContentInit.',
    },
    {
      q: 'Can you call ChangeDetectorRef.detectChanges() inside ngAfterContentChecked?',
      a: 'Yes, calling ChangeDetectorRef.detectChanges() inside ngAfterContentChecked is valid and is actually the recommended way to avoid ExpressionChangedAfterItHasBeenCheckedError when you need to update state in this hook. By calling detectChanges() after modifying state, you trigger a synchronous sub-cycle that re-checks the component in development mode without Angular seeing a stale value. However, this should be used sparingly as it adds an extra CD pass.',
    },
  ];
}
