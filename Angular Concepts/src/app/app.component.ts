import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// ── RxJS Learn: Concept components ──
import { SynchronousComponent } from './concepts/synchronous/synchronous.component';
import { AsynchronousComponent } from './concepts/asynchronous/asynchronous.component';
import { PromiseConceptComponent } from './concepts/promise-concept/promise-concept.component';
import { ObservableConceptComponent } from './concepts/observable-concept/observable-concept.component';
import { ObserverConceptComponent } from './concepts/observer-concept/observer-concept.component';
import { SubscriptionConceptComponent } from './concepts/subscription-concept/subscription-concept.component';
import { SubjectConceptComponent } from './concepts/subject-concept/subject-concept.component';
import { BehaviorSubjectConceptComponent } from './concepts/behavior-subject-concept/behavior-subject-concept.component';
import { HotColdConceptComponent } from './concepts/hot-cold-concept/hot-cold-concept.component';
import { ReplaySubjectConceptComponent } from './concepts/replay-subject-concept/replay-subject-concept.component';
import { AsyncSubjectConceptComponent } from './concepts/async-subject-concept/async-subject-concept.component';
import { AsyncPipeConceptComponent } from './concepts/async-pipe-concept/async-pipe-concept.component';

// ── RxJS Learn: Operator components ──
import { OfOperatorComponent } from './operators/of-operator/of-operator.component';
import { FromOperatorComponent } from './operators/from-operator/from-operator.component';
import { IntervalOperatorComponent } from './operators/interval-operator/interval-operator.component';
import { MapOperatorComponent } from './operators/map-operator/map-operator.component';
import { MergeMapOperatorComponent } from './operators/merge-map-operator/merge-map-operator.component';
import { SwitchMapOperatorComponent } from './operators/switch-map-operator/switch-map-operator.component';
import { ConcatMapOperatorComponent } from './operators/concat-map-operator/concat-map-operator.component';
import { ExhaustMapOperatorComponent } from './operators/exhaust-map-operator/exhaust-map-operator.component';
import { ScanOperatorComponent } from './operators/scan-operator/scan-operator.component';
import { StartWithOperatorComponent } from './operators/start-with-operator/start-with-operator.component';
import { FilterOperatorComponent } from './operators/filter-operator/filter-operator.component';
import { TapOperatorComponent } from './operators/tap-operator/tap-operator.component';
import { TakeOperatorComponent } from './operators/take-operator/take-operator.component';
import { TakeUntilOperatorComponent } from './operators/take-until-operator/take-until-operator.component';
import { DebounceTimeOperatorComponent } from './operators/debounce-time-operator/debounce-time-operator.component';
import { ThrottleTimeOperatorComponent } from './operators/throttle-time-operator/throttle-time-operator.component';
import { DistinctUntilChangedOperatorComponent } from './operators/distinct-until-changed-operator/distinct-until-changed-operator.component';
import { CombineLatestOperatorComponent } from './operators/combine-latest-operator/combine-latest-operator.component';
import { ForkjoinOperatorComponent } from './operators/forkjoin-operator/forkjoin-operator.component';
import { WithLatestFromOperatorComponent } from './operators/with-latest-from-operator/with-latest-from-operator.component';
import { ShareReplayOperatorComponent } from './operators/share-replay-operator/share-replay-operator.component';
import { CatchErrorOperatorComponent } from './operators/catch-error-operator/catch-error-operator.component';
import { RetryOperatorComponent } from './operators/retry-operator/retry-operator.component';
import { FinalizeOperatorComponent } from './operators/finalize-operator/finalize-operator.component';
import { SubjectOperatorComponent } from './operators/subject-operator/subject-operator.component';
import { BehaviorSubjectOperatorComponent } from './operators/behavior-subject-operator/behavior-subject-operator.component';

// ── Interview: Module 1 — Angular Fundamentals ──
import { LatestAngularUpdatesComponent } from './interview/module1/latest-angular-updates/latest-angular-updates.component';
import { WhatIsAngularComponent } from './interview/module1/what-is-angular/what-is-angular.component';
import { WhyAngularComponent } from './interview/module1/why-angular/why-angular.component';
import { AngularVersionsComponent } from './interview/module1/angular-versions/angular-versions.component';
import { SpaComponent } from './interview/module1/spa/spa.component';
import { AngularArchitectureComponent } from './interview/module1/angular-architecture/angular-architecture.component';
import { AngularCliComponent } from './interview/module1/angular-cli/angular-cli.component';
import { ProjectStructureComponent } from './interview/module1/project-structure/project-structure.component';
import { AngularCompilationComponent } from './interview/module1/angular-compilation/angular-compilation.component';
import { JitVsAotComponent } from './interview/module1/jit-vs-aot/jit-vs-aot.component';
import { BootstrappingComponent } from './interview/module1/bootstrapping/bootstrapping.component';

// ── Interview: Module 2 — Components ──
import { ComponentsIntroComponent } from './interview/module2/components-intro/components-intro.component';
import { ComponentLifecycleComponent } from './interview/module2/component-lifecycle/component-lifecycle.component';
import { ComponentCommunicationComponent } from './interview/module2/component-communication/component-communication.component';
import { InputDecoratorComponent } from './interview/module2/input-decorator/input-decorator.component';
import { OutputDecoratorComponent } from './interview/module2/output-decorator/output-decorator.component';
import { EventEmitterTopicComponent } from './interview/module2/event-emitter/event-emitter.component';
import { ViewChildComponent } from './interview/module2/view-child/view-child.component';
import { ContentChildComponent } from './interview/module2/content-child/content-child.component';
import { ContentProjectionComponent } from './interview/module2/content-projection/content-projection.component';
import { DynamicComponentsComponent } from './interview/module2/dynamic-components/dynamic-components.component';

// ── Interview: Module 3 — Modules ──
import { AppModuleComponent } from './interview/module3/app-module/app-module.component';
import { FeatureModuleComponent } from './interview/module3/feature-module/feature-module.component';
import { SharedModuleComponent } from './interview/module3/shared-module/shared-module.component';
import { CoreModuleComponent } from './interview/module3/core-module/core-module.component';
import { StandaloneCompComponent } from './interview/module3/standalone-comp/standalone-comp.component';

// ── Interview: Module 4 — Templates ──
import { InterpolationComponent } from './interview/module4/interpolation/interpolation.component';
import { PropertyBindingComponent } from './interview/module4/property-binding/property-binding.component';
import { EventBindingComponent } from './interview/module4/event-binding/event-binding.component';
import { TwoWayBindingComponent } from './interview/module4/two-way-binding/two-way-binding.component';
import { TemplateRefVarComponent } from './interview/module4/template-ref-var/template-ref-var.component';

// ── Interview: Module 5 — Directives ──
import { ComponentDirectiveComponent } from './interview/module5/component-directive/component-directive.component';
import { StructuralDirectiveComponent } from './interview/module5/structural-directive/structural-directive.component';
import { AttributeDirectiveComponent } from './interview/module5/attribute-directive/attribute-directive.component';
import { NgifDirComponent } from './interview/module5/ngif-dir/ngif-dir.component';
import { NgforDirComponent } from './interview/module5/ngfor-dir/ngfor-dir.component';
import { NgswitchDirComponent } from './interview/module5/ngswitch-dir/ngswitch-dir.component';
import { NgclassDirComponent } from './interview/module5/ngclass-dir/ngclass-dir.component';
import { NgstyleDirComponent } from './interview/module5/ngstyle-dir/ngstyle-dir.component';
import { CustomDirectiveComponent } from './interview/module5/custom-directive/custom-directive.component';

// ── Interview: Module 6 — Pipes ──
import { BuiltInPipesComponent } from './interview/module6/built-in-pipes/built-in-pipes.component';
import { PureImpurePipeComponent } from './interview/module6/pure-impure-pipe/pure-impure-pipe.component';
import { AsyncPipeIntComponent } from './interview/module6/async-pipe-int/async-pipe-int.component';
import { CustomPipeComponent } from './interview/module6/custom-pipe/custom-pipe.component';

// ── Interview: Module 7 — Services ──
import { ServicesIntroComponent } from './interview/module7/services-intro/services-intro.component';
import { DependencyInjectionComponent } from './interview/module7/dependency-injection/dependency-injection.component';
import { ProvidersComponent } from './interview/module7/providers/providers.component';
import { InjectorComponent } from './interview/module7/injector/injector.component';
import { SingletonServiceComponent } from './interview/module7/singleton-service/singleton-service.component';

// ── Interview: Module 8 — Routing ──
import { RouterModuleComponent } from './interview/module8/router-module/router-module.component';
import { RouteConfigComponent } from './interview/module8/route-config/route-config.component';
import { RouteParamsComponent } from './interview/module8/route-params/route-params.component';
import { QueryParamsComponent } from './interview/module8/query-params/query-params.component';
import { ChildRoutesComponent } from './interview/module8/child-routes/child-routes.component';
import { LazyLoadingRouteComponent } from './interview/module8/lazy-loading-route/lazy-loading-route.component';
import { RouteGuardsComponent } from './interview/module8/route-guards/route-guards.component';
import { WildcardRoutesComponent } from './interview/module8/wildcard-routes/wildcard-routes.component';

// ── Interview: Module 9 — Forms ──
import { TemplateDrivenFormsComponent } from './interview/module9/template-driven-forms/template-driven-forms.component';
import { ReactiveFormsComponent } from './interview/module9/reactive-forms/reactive-forms.component';
import { FormGroupComponent } from './interview/module9/form-group/form-group.component';
import { FormControlComponent } from './interview/module9/form-control/form-control.component';
import { FormArrayComponent } from './interview/module9/form-array/form-array.component';
import { ValidatorsComponent } from './interview/module9/validators/validators.component';
import { CustomValidatorsComponent } from './interview/module9/custom-validators/custom-validators.component';

// ── Interview: Module 10 — HTTP ──
import { HttpClientTopicComponent } from './interview/module10/http-client/http-client.component';
import { HttpGetComponent } from './interview/module10/http-get/http-get.component';
import { HttpPostComponent } from './interview/module10/http-post/http-post.component';
import { HttpPutComponent } from './interview/module10/http-put/http-put.component';
import { HttpDeleteComponent } from './interview/module10/http-delete/http-delete.component';
import { HttpPatchComponent } from './interview/module10/http-patch/http-patch.component';
import { HttpErrorComponent } from './interview/module10/http-error/http-error.component';

// ── Interview: Module 12 — Lifecycle Hooks ──
import { ConstructorHookComponent } from './interview/module12/constructor-hook/constructor-hook.component';
import { NgOnChangesComponent } from './interview/module12/ng-on-changes/ng-on-changes.component';
import { NgOnInitComponent } from './interview/module12/ng-on-init/ng-on-init.component';
import { NgDoCheckComponent } from './interview/module12/ng-do-check/ng-do-check.component';
import { NgAfterContentInitComponent } from './interview/module12/ng-after-content-init/ng-after-content-init.component';
import { NgAfterContentCheckedComponent } from './interview/module12/ng-after-content-checked/ng-after-content-checked.component';
import { NgAfterViewInitComponent } from './interview/module12/ng-after-view-init/ng-after-view-init.component';
import { NgAfterViewCheckedComponent } from './interview/module12/ng-after-view-checked/ng-after-view-checked.component';
import { NgOnDestroyComponent } from './interview/module12/ng-on-destroy/ng-on-destroy.component';

// ── Interview: Module 13 — Authentication ──
import { JwtComponent } from './interview/module13/jwt/jwt.component';
import { RefreshTokenComponent } from './interview/module13/refresh-token/refresh-token.component';
import { LocalStorageComponent } from './interview/module13/local-storage/local-storage.component';
import { SessionStorageComponent } from './interview/module13/session-storage/session-storage.component';

// ── Interview: Module 14 — Interceptors ──
import { HttpInterceptorTopicComponent } from './interview/module14/http-interceptor/http-interceptor.component';
import { TokenInterceptorComponent } from './interview/module14/token-interceptor/token-interceptor.component';
import { ErrorInterceptorComponent } from './interview/module14/error-interceptor/error-interceptor.component';

// ── Interview: Module 15 — Performance ──
import { LazyLoadingPerfComponent } from './interview/module15/lazy-loading-perf/lazy-loading-perf.component';
import { TrackByComponent } from './interview/module15/track-by/track-by.component';
import { OnPushComponent } from './interview/module15/on-push/on-push.component';
import { VirtualScrollingComponent } from './interview/module15/virtual-scrolling/virtual-scrolling.component';
import { SignalsComponent } from './interview/module15/signals/signals.component';
import { StandaloneApisComponent } from './interview/module15/standalone-apis/standalone-apis.component';

// ── Interview: Modules 16–19 ──
import { CodingQuestionsComponent } from './interview/module16/coding-questions/coding-questions.component';
import { ScenarioQuestionsComponent } from './interview/module17/scenario-questions/scenario-questions.component';
import { ProjectDiscussionComponent } from './interview/module18/project-discussion/project-discussion.component';
import { HrQuestionsComponent } from './interview/module19/hr-questions/hr-questions.component';

// ─────────────────────────────────────────────

type NavItem = { label: string; key: string };
type NavGroup = { category: string; items: NavItem[] };
type InterviewModule = { module: number; title: string; icon: string; items: NavItem[] };

const RXJS_GROUPS: NavGroup[] = [
  {
    category: '📚 Core Concepts',
    items: [
      { label: 'Synchronous', key: 'sync' },
      { label: 'Asynchronous', key: 'async' },
      { label: 'Promise', key: 'promise' },
      { label: 'Observable', key: 'observable' },
      { label: 'Observer', key: 'observer' },
      { label: 'Subscription', key: 'subscription' },
      { label: 'Hot vs Cold', key: 'hotCold' },
      { label: 'async pipe', key: 'asyncPipeConcept' },
    ],
  },
  {
    category: '📡 Subjects',
    items: [
      { label: 'Subject', key: 'subjectConcept' },
      { label: 'BehaviorSubject', key: 'behaviorSubjectConcept' },
      { label: 'ReplaySubject', key: 'replaySubjectConcept' },
      { label: 'AsyncSubject', key: 'asyncSubjectConcept' },
    ],
  },
  {
    category: '🏗️ Creation',
    items: [
      { label: 'of()', key: 'of' },
      { label: 'from()', key: 'from' },
      { label: 'interval()', key: 'interval' },
    ],
  },
  {
    category: '🔄 Transformation',
    items: [
      { label: 'map()', key: 'map' },
      { label: 'mergeMap()', key: 'mergeMap' },
      { label: 'switchMap()', key: 'switchMap' },
      { label: 'concatMap()', key: 'concatMap' },
      { label: 'exhaustMap()', key: 'exhaustMap' },
      { label: 'scan()', key: 'scan' },
      { label: 'startWith()', key: 'startWith' },
    ],
  },
  {
    category: '🔍 Filtering',
    items: [
      { label: 'filter()', key: 'filter' },
      { label: 'tap()', key: 'tap' },
      { label: 'take()', key: 'take' },
      { label: 'takeUntil()', key: 'takeUntil' },
      { label: 'debounceTime()', key: 'debounceTime' },
      { label: 'throttleTime()', key: 'throttleTime' },
      { label: 'distinctUntilChanged()', key: 'distinctUntilChanged' },
    ],
  },
  {
    category: '🔗 Combination',
    items: [
      { label: 'combineLatest()', key: 'combineLatest' },
      { label: 'forkJoin()', key: 'forkJoin' },
      { label: 'withLatestFrom()', key: 'withLatestFrom' },
      { label: 'shareReplay()', key: 'shareReplay' },
    ],
  },
  {
    category: '🛡️ Error Handling',
    items: [
      { label: 'catchError()', key: 'catchError' },
      { label: 'retry()', key: 'retry' },
      { label: 'finalize()', key: 'finalize' },
    ],
  },
  {
    category: '🔬 Subject Demos',
    items: [
      { label: 'Subject', key: 'subject' },
      { label: 'BehaviorSubject', key: 'behaviorSubject' },
    ],
  },
];

const INTERVIEW_MODULES: InterviewModule[] = [
  {
    module: 1, title: 'Angular Fundamentals', icon: '🏗️',
    items: [
      { label: '🆕 Latest Updates (v17-v20)', key: 'latest-angular-updates' },
      { label: 'What is Angular?', key: 'what-is-angular' },
      { label: 'Why Angular?', key: 'why-angular' },
      { label: 'Angular Versions', key: 'angular-versions' },
      { label: 'SPA', key: 'spa' },
      { label: 'Angular Architecture', key: 'angular-architecture' },
      { label: 'Angular CLI', key: 'angular-cli' },
      { label: 'Project Structure', key: 'project-structure' },
      { label: 'Angular Compilation', key: 'angular-compilation' },
      { label: 'JIT vs AOT', key: 'jit-vs-aot' },
      { label: 'Bootstrapping', key: 'bootstrapping' },
    ],
  },
  {
    module: 2, title: 'Components', icon: '🧩',
    items: [
      { label: 'Components', key: 'components-intro' },
      { label: 'Component Lifecycle', key: 'component-lifecycle' },
      { label: 'Component Communication', key: 'component-communication' },
      { label: '@Input', key: 'input-decorator' },
      { label: '@Output', key: 'output-decorator' },
      { label: 'EventEmitter', key: 'event-emitter-topic' },
      { label: 'ViewChild', key: 'view-child' },
      { label: 'ContentChild', key: 'content-child' },
      { label: 'Content Projection', key: 'content-projection' },
      { label: 'Dynamic Components', key: 'dynamic-components' },
    ],
  },
  {
    module: 3, title: 'Modules', icon: '📦',
    items: [
      { label: 'AppModule', key: 'app-module' },
      { label: 'Feature Module', key: 'feature-module' },
      { label: 'Shared Module', key: 'shared-module' },
      { label: 'Core Module', key: 'core-module' },
      { label: 'Standalone Components', key: 'standalone-comp' },
    ],
  },
  {
    module: 4, title: 'Templates', icon: '📄',
    items: [
      { label: 'Interpolation', key: 'interpolation' },
      { label: 'Property Binding', key: 'property-binding' },
      { label: 'Event Binding', key: 'event-binding' },
      { label: 'Two-way Binding', key: 'two-way-binding' },
      { label: 'Template Ref Variable', key: 'template-ref-var' },
    ],
  },
  {
    module: 5, title: 'Directives', icon: '🎯',
    items: [
      { label: 'Component Directive', key: 'component-directive' },
      { label: 'Structural Directive', key: 'structural-directive' },
      { label: 'Attribute Directive', key: 'attribute-directive' },
      { label: 'ngIf', key: 'ngif-dir' },
      { label: 'ngFor', key: 'ngfor-dir' },
      { label: 'ngSwitch', key: 'ngswitch-dir' },
      { label: 'ngClass', key: 'ngclass-dir' },
      { label: 'ngStyle', key: 'ngstyle-dir' },
      { label: 'Custom Directive', key: 'custom-directive' },
    ],
  },
  {
    module: 6, title: 'Pipes', icon: '🔧',
    items: [
      { label: 'Built-in Pipes', key: 'built-in-pipes' },
      { label: 'Pure vs Impure Pipe', key: 'pure-impure-pipe' },
      { label: 'Async Pipe', key: 'async-pipe-int' },
      { label: 'Custom Pipe', key: 'custom-pipe' },
    ],
  },
  {
    module: 7, title: 'Services', icon: '⚙️',
    items: [
      { label: 'Services', key: 'services-intro' },
      { label: 'Dependency Injection', key: 'dependency-injection' },
      { label: 'Providers', key: 'providers' },
      { label: 'Injector', key: 'injector' },
      { label: 'Singleton Service', key: 'singleton-service' },
    ],
  },
  {
    module: 8, title: 'Routing', icon: '🗺️',
    items: [
      { label: 'RouterModule', key: 'router-module' },
      { label: 'Route Configuration', key: 'route-config' },
      { label: 'Route Parameters', key: 'route-params' },
      { label: 'Query Parameters', key: 'query-params' },
      { label: 'Child Routes', key: 'child-routes' },
      { label: 'Lazy Loading', key: 'lazy-loading-route' },
      { label: 'Route Guards', key: 'route-guards' },
      { label: 'Wildcard Routes', key: 'wildcard-routes' },
    ],
  },
  {
    module: 9, title: 'Forms', icon: '📝',
    items: [
      { label: 'Template-driven Forms', key: 'template-driven-forms' },
      { label: 'Reactive Forms', key: 'reactive-forms' },
      { label: 'FormGroup', key: 'form-group' },
      { label: 'FormControl', key: 'form-control' },
      { label: 'FormArray', key: 'form-array' },
      { label: 'Validators', key: 'validators' },
      { label: 'Custom Validators', key: 'custom-validators' },
    ],
  },
  {
    module: 10, title: 'HTTP', icon: '🌐',
    items: [
      { label: 'HttpClient', key: 'http-client' },
      { label: 'GET', key: 'http-get' },
      { label: 'POST', key: 'http-post' },
      { label: 'PUT', key: 'http-put' },
      { label: 'DELETE', key: 'http-delete' },
      { label: 'PATCH', key: 'http-patch' },
      { label: 'Error Handling', key: 'http-error' },
    ],
  },
  {
    module: 11, title: 'RxJS', icon: '📡',
    items: [
      { label: 'Observable', key: 'int-observable' },
      { label: 'Observer', key: 'int-observer' },
      { label: 'Subscription', key: 'int-subscription' },
      { label: 'Subject', key: 'int-subject' },
      { label: 'BehaviorSubject', key: 'int-behavior-subject' },
      { label: 'ReplaySubject', key: 'int-replay-subject' },
      { label: 'AsyncSubject', key: 'int-async-subject' },
      { label: 'switchMap', key: 'int-switchmap' },
      { label: 'mergeMap', key: 'int-mergemap' },
      { label: 'concatMap', key: 'int-concatmap' },
      { label: 'exhaustMap', key: 'int-exhaustmap' },
    ],
  },
  {
    module: 12, title: 'Lifecycle Hooks', icon: '🔄',
    items: [
      { label: 'Constructor', key: 'constructor-hook' },
      { label: 'ngOnChanges', key: 'ng-on-changes' },
      { label: 'ngOnInit', key: 'ng-on-init' },
      { label: 'ngDoCheck', key: 'ng-do-check' },
      { label: 'ngAfterContentInit', key: 'ng-after-content-init' },
      { label: 'ngAfterContentChecked', key: 'ng-after-content-checked' },
      { label: 'ngAfterViewInit', key: 'ng-after-view-init' },
      { label: 'ngAfterViewChecked', key: 'ng-after-view-checked' },
      { label: 'ngOnDestroy', key: 'ng-on-destroy' },
    ],
  },
  {
    module: 13, title: 'Authentication', icon: '🔐',
    items: [
      { label: 'JWT', key: 'jwt' },
      { label: 'Refresh Token', key: 'refresh-token' },
      { label: 'Local Storage', key: 'local-storage' },
      { label: 'Session Storage', key: 'session-storage' },
    ],
  },
  {
    module: 14, title: 'Interceptors', icon: '🛡️',
    items: [
      { label: 'HTTP Interceptor', key: 'http-interceptor' },
      { label: 'Token Interceptor', key: 'token-interceptor' },
      { label: 'Error Interceptor', key: 'error-interceptor' },
    ],
  },
  {
    module: 15, title: 'Performance', icon: '⚡',
    items: [
      { label: 'Lazy Loading', key: 'lazy-loading-perf' },
      { label: 'TrackBy', key: 'track-by' },
      { label: 'OnPush Change Detection', key: 'on-push' },
      { label: 'Virtual Scrolling', key: 'virtual-scrolling' },
      { label: 'Signals', key: 'signals' },
      { label: 'Standalone APIs', key: 'standalone-apis' },
    ],
  },
  {
    module: 16, title: 'Angular Coding', icon: '💻',
    items: [{ label: '50 Coding Questions', key: 'coding-questions' }],
  },
  {
    module: 17, title: 'Scenario-Based', icon: '🎭',
    items: [{ label: '100 Real Questions', key: 'scenario-questions' }],
  },
  {
    module: 18, title: 'Project Discussion', icon: '📊',
    items: [{ label: 'Project Explanation', key: 'project-discussion' }],
  },
  {
    module: 19, title: 'HR Questions', icon: '🤝',
    items: [{ label: 'HR Q&A', key: 'hr-questions' }],
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    // RxJS Learn
    SynchronousComponent, AsynchronousComponent, PromiseConceptComponent,
    ObservableConceptComponent, ObserverConceptComponent, SubscriptionConceptComponent,
    SubjectConceptComponent, BehaviorSubjectConceptComponent, HotColdConceptComponent,
    ReplaySubjectConceptComponent, AsyncSubjectConceptComponent, AsyncPipeConceptComponent,
    OfOperatorComponent, FromOperatorComponent, IntervalOperatorComponent,
    MapOperatorComponent, MergeMapOperatorComponent, SwitchMapOperatorComponent,
    ConcatMapOperatorComponent, ExhaustMapOperatorComponent, ScanOperatorComponent,
    StartWithOperatorComponent, FilterOperatorComponent, TapOperatorComponent,
    TakeOperatorComponent, TakeUntilOperatorComponent, DebounceTimeOperatorComponent,
    ThrottleTimeOperatorComponent, DistinctUntilChangedOperatorComponent,
    CombineLatestOperatorComponent, ForkjoinOperatorComponent, WithLatestFromOperatorComponent,
    ShareReplayOperatorComponent, CatchErrorOperatorComponent, RetryOperatorComponent,
    FinalizeOperatorComponent, SubjectOperatorComponent, BehaviorSubjectOperatorComponent,
    // Interview Module 1
    LatestAngularUpdatesComponent,
    WhatIsAngularComponent, WhyAngularComponent, AngularVersionsComponent, SpaComponent,
    AngularArchitectureComponent, AngularCliComponent, ProjectStructureComponent,
    AngularCompilationComponent, JitVsAotComponent, BootstrappingComponent,
    // Interview Module 2
    ComponentsIntroComponent, ComponentLifecycleComponent, ComponentCommunicationComponent,
    InputDecoratorComponent, OutputDecoratorComponent, EventEmitterTopicComponent,
    ViewChildComponent, ContentChildComponent, ContentProjectionComponent, DynamicComponentsComponent,
    // Interview Module 3
    AppModuleComponent, FeatureModuleComponent, SharedModuleComponent,
    CoreModuleComponent, StandaloneCompComponent,
    // Interview Module 4
    InterpolationComponent, PropertyBindingComponent, EventBindingComponent,
    TwoWayBindingComponent, TemplateRefVarComponent,
    // Interview Module 5
    ComponentDirectiveComponent, StructuralDirectiveComponent, AttributeDirectiveComponent,
    NgifDirComponent, NgforDirComponent, NgswitchDirComponent,
    NgclassDirComponent, NgstyleDirComponent, CustomDirectiveComponent,
    // Interview Module 6
    BuiltInPipesComponent, PureImpurePipeComponent, AsyncPipeIntComponent, CustomPipeComponent,
    // Interview Module 7
    ServicesIntroComponent, DependencyInjectionComponent, ProvidersComponent,
    InjectorComponent, SingletonServiceComponent,
    // Interview Module 8
    RouterModuleComponent, RouteConfigComponent, RouteParamsComponent, QueryParamsComponent,
    ChildRoutesComponent, LazyLoadingRouteComponent, RouteGuardsComponent, WildcardRoutesComponent,
    // Interview Module 9
    TemplateDrivenFormsComponent, ReactiveFormsComponent, FormGroupComponent,
    FormControlComponent, FormArrayComponent, ValidatorsComponent, CustomValidatorsComponent,
    // Interview Module 10
    HttpClientTopicComponent, HttpGetComponent, HttpPostComponent, HttpPutComponent,
    HttpDeleteComponent, HttpPatchComponent, HttpErrorComponent,
    // Interview Module 12
    ConstructorHookComponent, NgOnChangesComponent, NgOnInitComponent, NgDoCheckComponent,
    NgAfterContentInitComponent, NgAfterContentCheckedComponent,
    NgAfterViewInitComponent, NgAfterViewCheckedComponent, NgOnDestroyComponent,
    // Interview Module 13
    JwtComponent, RefreshTokenComponent, LocalStorageComponent, SessionStorageComponent,
    // Interview Module 14
    HttpInterceptorTopicComponent, TokenInterceptorComponent, ErrorInterceptorComponent,
    // Interview Module 15
    LazyLoadingPerfComponent, TrackByComponent, OnPushComponent,
    VirtualScrollingComponent, SignalsComponent, StandaloneApisComponent,
    // Interview Modules 16-19
    CodingQuestionsComponent, ScenarioQuestionsComponent,
    ProjectDiscussionComponent, HrQuestionsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  appMode: 'rxjs' | 'interview' = 'rxjs';
  groups = RXJS_GROUPS;
  interviewModules = INTERVIEW_MODULES;
  selected = 'sync';
  selectedInterview = 'what-is-angular';

  select(key: string) { this.selected = key; }
  selectInterview(key: string) { this.selectedInterview = key; }
  setMode(mode: 'rxjs' | 'interview') { this.appMode = mode; }
}
