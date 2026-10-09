import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngif-dir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngif-dir.component.html',
  styleUrl: './ngif-dir.component.css'
})
export class NgifDirComponent {

  syntaxCode = [
    '// Basic *ngIf',
    '<div *ngIf="isVisible">Visible content</div>',
    '',
    '// *ngIf with else template',
    '<div *ngIf="isLoggedIn; else guestTpl">',
    '  Welcome back, {{ username }}!',
    '</div>',
    '<ng-template #guestTpl>',
    '  <p>Please log in.</p>',
    '</ng-template>',
    '',
    '// *ngIf with then and else',
    '<ng-container *ngIf="status === \'loading\'; then loadTpl; else dataTpl">',
    '</ng-container>',
    '<ng-template #loadTpl><app-spinner></app-spinner></ng-template>',
    '<ng-template #dataTpl><app-data-table></app-data-table></ng-template>',
    '',
    '// *ngIf with async pipe',
    '<div *ngIf="user$ | async as user">',
    '  Hello, {{ user.name }}',
    '</div>',
  ].join('\n');

  exampleCode = [
    '// Component class',
    'export class DashboardComponent {',
    '  isLoggedIn = false;',
    '  isLoading = true;',
    "  username = 'Alice';",
    '  user$ = this.authService.currentUser$;',
    '',
    '  constructor(private authService: AuthService) {}',
    '',
    '  toggleLogin() {',
    '    this.isLoggedIn = !this.isLoggedIn;',
    '  }',
    '}',
    '',
    '// Template — *ngIf with else + async',
    '<button (click)="toggleLogin()">Toggle Login</button>',
    '',
    '<div *ngIf="isLoggedIn; else loginBanner">',
    '  <h2>Dashboard</h2>',
    '  <ng-container *ngIf="user$ | async as user">',
    '    <p>Welcome, {{ user.name }}!</p>',
    '  </ng-container>',
    '</div>',
    '',
    '<ng-template #loginBanner>',
    '  <p class="alert">Please log in to access the dashboard.</p>',
    '</ng-template>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What does *ngIf do and how does it differ from [hidden]?',
      a: '*ngIf removes the element and its children entirely from the DOM when false, destroying all child components and stopping change detection for that subtree. [hidden] only sets display:none, keeping everything in the DOM. Use *ngIf for heavy components you want to destroy; use [hidden] for lightweight elements where you need instant re-show.'
    },
    {
      q: 'What is the *ngIf else syntax and how does it work?',
      a: '*ngIf="condition; else templateRef" renders the element when condition is true, and renders the named ng-template when it is false. The template is declared with <ng-template #name>. You can also use the full form: *ngIf="condition; then thenTpl; else elseTpl" to use named templates for both branches.'
    },
    {
      q: 'How does *ngIf interact with the async pipe?',
      a: 'The pattern *ngIf="obs$ | async as value" subscribes to the observable, unwraps the value into a local variable, and hides the section while the observable has not emitted. This ensures child components only render once data is available. Using ng-container keeps it clean without adding an extra DOM element.'
    },
    {
      q: 'Does *ngIf run lifecycle hooks when toggled?',
      a: 'Yes. When *ngIf becomes true, Angular creates the element (ngOnInit, ngAfterViewInit fire). When *ngIf becomes false, Angular destroys it (ngOnDestroy fires). This means subscriptions are cleaned up and memory is freed. This is an important distinction from [hidden] where the component stays alive.'
    },
    {
      q: 'What are the performance implications of *ngIf?',
      a: 'Pros: removes hidden subtrees from change detection, saves memory and CPU. Cons: creation/destruction cost on each toggle — ngOnInit, DOM creation, etc. For components that toggle frequently and are expensive to initialize, consider [hidden] or caching the component with a CSS class. For infrequent toggles, *ngIf is preferred.'
    },
    {
      q: 'Can you use *ngIf and *ngFor on the same element?',
      a: 'No. Angular does not allow two structural directives on the same element. The correct pattern is to wrap with ng-container: <ng-container *ngIf="showList"><li *ngFor="let item of items">...</li></ng-container>. This is a common interview gotcha — always remember to use ng-container as a wrapper.'
    },
    {
      q: 'What is ng-template and how does *ngIf use it internally?',
      a: 'ng-template is an Angular element that holds template content but does not render it. *ngIf is syntactic sugar — <div *ngIf="cond"> desugars to <ng-template [ngIf]="cond"><div>...</div></ng-template>. The NgIf directive receives the TemplateRef and ViewContainerRef, calling createEmbeddedView or clear based on the condition.'
    },
  ];
}
