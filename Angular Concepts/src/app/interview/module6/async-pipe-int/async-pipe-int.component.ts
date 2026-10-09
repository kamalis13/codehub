import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-async-pipe-int',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './async-pipe-int.component.html',
  styleUrl: './async-pipe-int.component.css'
})
export class AsyncPipeIntComponent {

  syntaxCode = [
    '// Async pipe with Observable',
    '<p>{{ greeting$ | async }}</p>',
    '',
    '// Async pipe with Promise',
    '<p>{{ userPromise | async }}</p>',
    '',
    '// Pattern 1: *ngIf with async — unwrap into local variable',
    '<ng-container *ngIf="user$ | async as user">',
    '  <h2>{{ user.name }}</h2>',
    '  <p>{{ user.email }}</p>',
    '</ng-container>',
    '',
    '// Pattern 2: *ngIf to show loading state',
    '<div *ngIf="!(data$ | async); else dataTemplate">',
    '  <app-spinner></app-spinner>',
    '</div>',
    '<ng-template #dataTemplate>',
    '  <div *ngFor="let item of data$ | async">{{ item.name }}</div>',
    '</ng-template>',
    '',
    '// Pattern 3: Multiple Observables with combineLatest + async',
    '<ng-container *ngIf="vm$ | async as vm">',
    '  <p>User: {{ vm.user.name }}</p>',
    '  <p>Settings: {{ vm.settings.theme }}</p>',
    '</ng-container>',
  ].join('\n');

  exampleCode = [
    '// user-profile.component.ts — manual vs async pipe comparison',
    '',
    '// ❌ Manual subscription (verbose, leaks if not unsubscribed)',
    'export class ManualComponent implements OnInit, OnDestroy {',
    '  user: User | null = null;',
    '  private sub = new Subscription();',
    '',
    '  ngOnInit() {',
    '    this.sub = this.userService.getUser().subscribe(u => this.user = u);',
    '  }',
    '  ngOnDestroy() { this.sub.unsubscribe(); } // must not forget!',
    '}',
    '',
    '// ✅ Async pipe (clean, auto-unsubscribes)',
    'export class AsyncProfileComponent {',
    '  user$ = this.userService.getUser();',
    '  constructor(private userService: UserService) {}',
    '}',
    '',
    '// Template with async pipe',
    '<ng-container *ngIf="user$ | async as user; else loadingTpl">',
    '  <div class="profile-card">',
    '    <img [src]="user.avatar" [alt]="user.name" />',
    '    <h2>{{ user.name }}</h2>',
    '    <p>{{ user.role | titlecase }}</p>',
    '    <p>Joined: {{ user.joinedAt | date:\'mediumDate\' }}</p>',
    '  </div>',
    '</ng-container>',
    '<ng-template #loadingTpl>',
    '  <div class="skeleton-card">Loading profile...</div>',
    '</ng-template>',
    '',
    '// ViewModel pattern — combine multiple streams',
    'export class DashboardComponent {',
    '  vm$ = combineLatest({',
    '    user: this.userService.user$,',
    '    notifications: this.notifService.notifications$,',
    '    theme: this.settingsService.theme$,',
    '  });',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the async pipe and what problem does it solve?',
      a: 'The async pipe automatically subscribes to an Observable or Promise and returns the latest emitted value. When the component is destroyed, it automatically unsubscribes, preventing memory leaks. Without the async pipe, developers must manually subscribe (ngOnInit) and unsubscribe (ngOnDestroy) — a common source of memory leaks.'
    },
    {
      q: 'Why is the async pipe considered impure?',
      a: 'The async pipe is impure (pure: false) because it needs to check for new Observable emissions on every change detection cycle. The Observable can emit at any time, independent of Angular\'s inputs. If it were pure, it would only check when the Observable reference changed — completely missing the emitted values.'
    },
    {
      q: 'How does the async pipe handle auto-unsubscription?',
      a: 'The async pipe implements the PipeTransform and OnDestroy interfaces. When Angular destroys the component or removes the template where the async pipe is used (e.g., via *ngIf), the async pipe\'s ngOnDestroy lifecycle hook is called, which internally calls subscription.unsubscribe(). This is automatic and guaranteed — no manual cleanup needed.'
    },
    {
      q: 'What is the *ngIf with async pattern and why is it recommended?',
      a: '*ngIf="obs$ | async as value" subscribes once, renders the block only after the first emission, and provides the unwrapped value as a local variable named "value" — no need to repeat "obs$ | async" for each property. Use ng-container to avoid extra DOM elements. For the loading state, use the else template: *ngIf="obs$ | async as d; else loadingTpl".'
    },
    {
      q: 'What happens if you subscribe to the same Observable multiple times with async pipe?',
      a: 'Each | async in the template creates a separate subscription — the Observable executes multiple times. This is especially problematic with HTTP Observables (multiple API calls). Solution: (1) Share the Observable with shareReplay(1): this.data$ = this.http.get(url).pipe(shareReplay(1)); (2) Use the *ngIf as pattern to unwrap once and reference the local variable throughout.'
    },
    {
      q: 'How do you use the async pipe with multiple Observables?',
      a: "The ViewModel pattern: combine streams in the component with combineLatest({}) or forkJoin({}), then bind one vm$ Observable to the template. In template: *ngIf=\"vm$ | async as vm\" — then access vm.user, vm.settings, etc. This avoids multiple subscriptions and loading state complexity."
    },
    {
      q: 'What is the difference between async pipe and manual subscription with takeUntil?',
      a: 'Both prevent memory leaks. async pipe: automatic, declarative in template, requires *ngIf for null-safety. Manual subscription with takeUntil(destroy$): needed when you must react to emissions in the component class (update other properties, call methods). Prefer async pipe in templates; use takeUntil when you need side effects in the class (ngOnInit logic).'
    },
  ];
}
