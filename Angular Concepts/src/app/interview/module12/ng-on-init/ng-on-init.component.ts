import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng-on-init',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-on-init.component.html',
  styleUrl: './ng-on-init.component.css',
})
export class NgOnInitComponent {
  syntaxCode = [
    'import { Component, Input, OnInit } from "@angular/core";',
    '',
    '@Component({',
    '  selector: "app-user-profile",',
    '  templateUrl: "./user-profile.component.html",',
    '})',
    'export class UserProfileComponent implements OnInit {',
    '  @Input() userId!: number; // ✅ Available in ngOnInit, NOT in constructor',
    '  user: User | null = null;',
    '',
    '  constructor(private userService: UserService) {',
    '    // ❌ this.userId is undefined here!',
    '  }',
    '',
    '  ngOnInit() {',
    '    // ✅ @Input() userId is now resolved',
    '    // ✅ Best place for HTTP calls and initialization',
    '    this.userService.getById(this.userId)',
    '      .subscribe(user => this.user = user);',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// Real-world: Analytics Dashboard — loading data and setting up subscriptions',
    '',
    '@Component({',
    '  selector: "app-analytics",',
    '  templateUrl: "./analytics.component.html",',
    '})',
    'export class AnalyticsComponent implements OnInit, OnDestroy {',
    '  @Input() dateRange!: DateRange;',
    '  metrics: Metric[] = [];',
    '  private destroy$ = new Subject<void>();',
    '',
    '  constructor(',
    '    private analyticsService: AnalyticsService,',
    '    private route: ActivatedRoute',
    '  ) {}',
    '',
    '  ngOnInit() {',
    '    // ✅ Route params available here',
    '    this.route.params.pipe(',
    '      takeUntil(this.destroy$),',
    '      switchMap(params =>',
    '        this.analyticsService.getMetrics(params["id"], this.dateRange)',
    '      )',
    '    ).subscribe(m => this.metrics = m);',
    '',
    '    // ✅ @Input() dateRange is set here',
    '    console.log("Date range:", this.dateRange);',
    '  }',
    '',
    '  ngOnDestroy() {',
    '    this.destroy$.next();',
    '    this.destroy$.complete();',
    '  }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is ngOnInit and when is it called?',
      a: 'ngOnInit is an Angular lifecycle hook that is called exactly once, after Angular has initialized all @Input() bindings and run the first change detection cycle. It is the ideal place for initialization logic: HTTP calls, setting up Observables, reading route parameters, and computing derived state from @Input() values. It fires after ngOnChanges (if inputs exist) and is never called again for the same component instance.',
    },
    {
      q: 'Why should HTTP calls go in ngOnInit instead of the constructor?',
      a: 'There are three key reasons: (1) @Input() values are not set in the constructor but ARE set by ngOnInit — so API calls with input-based parameters will use undefined values from the constructor; (2) Angular Universal (SSR) depends on ngOnInit being the initialization boundary for platform-aware code; (3) unit testing is cleaner — TestBed initializes the component then calls ngOnInit, allowing you to set up mocks before initialization runs. ngOnInit is Angular\'s designed entry point for initialization.',
    },
    {
      q: 'What is the difference between ngOnInit and the constructor?',
      a: 'The constructor is called by JavaScript during class instantiation — Angular\'s DI injects services at this point, but @Input() values, route data, and DOM are all unavailable. ngOnInit is called by Angular after the first change detection cycle, once all @Input() bindings are resolved. The constructor is for dependency injection only; ngOnInit is for all initialization logic that requires a fully-constructed component with all inputs available.',
    },
    {
      q: 'Does ngOnInit run on every change detection cycle?',
      a: 'No. ngOnInit runs exactly once per component instance — after the component\'s first change detection cycle. It does not fire on subsequent input changes (that is ngOnChanges\'s role) or on every CD cycle (that is ngDoCheck). If you navigate away from a component and back, the component is destroyed and re-created, so ngOnInit fires again for the new instance. For repeatedly updating logic, use ngOnChanges or route param subscriptions in ngOnInit.',
    },
    {
      q: 'Can you use async/await in ngOnInit?',
      a: 'Yes, you can mark ngOnInit as async: async ngOnInit() { this.data = await this.service.getData().toPromise(); }. Angular does not await the return value of ngOnInit — it fires and forgets. This means errors in an async ngOnInit may go unhandled unless caught with try/catch. For production Angular apps, RxJS Observables with proper error handling (catchError) are preferred over async/await in ngOnInit for better control over cancellation and composition.',
    },
    {
      q: 'When would ngOnInit not be called?',
      a: 'ngOnInit is called once per component instance. It will NOT be called: (1) if the component is destroyed before Angular finishes initializing it (rare edge case); (2) in unit tests if you do not call fixture.detectChanges() after TestBed.createComponent() — detectChanges triggers the first CD cycle which calls ngOnInit; (3) if a component is created programmatically outside Angular\'s DI without going through the ComponentFactory/ViewContainerRef pipeline. Always call fixture.detectChanges() in tests to trigger ngOnInit.',
    },
  ];
}
