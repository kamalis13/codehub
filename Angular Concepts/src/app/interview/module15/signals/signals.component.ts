import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css',
})
export class SignalsComponent {
  definition = 'Angular Signals (introduced in Angular 16, stabilized in Angular 17) are fine-grained reactive primitives. A signal is a wrapper around a value that notifies interested consumers when that value changes. Angular uses signals to enable zone-less change detection — only the specific parts of the DOM that depend on a changed signal are re-rendered.';

  whyNeeded = 'Zone.js-based change detection is a coarse-grained approach — any async operation triggers a full change detection sweep. Signals enable fine-grained reactivity: only components and computed values that depend on a changed signal are updated. This eliminates unnecessary checks and allows Angular to eventually drop Zone.js entirely, matching the performance model of SolidJS and Preact Signals.';

  syntaxCode = [
    'import { signal, computed, effect } from "@angular/core";',
    '',
    '// signal() — writable reactive value',
    'const count = signal(0);',
    'count();          // read: returns 0',
    'count.set(5);     // set: replaces value',
    'count.update(v => v + 1); // update: transforms current value',
    '',
    '// computed() — derived value, recalculates only when dependencies change',
    'const doubled = computed(() => count() * 2);',
    'doubled(); // 12 (after count is 6)',
    '',
    '// effect() — side-effect when signals change',
    'effect(() => {',
    '  console.log("count changed to:", count());',
    '  // runs whenever count changes',
    '});',
  ].join('\n');

  exampleCode = [
    '// Signal-based component (Angular 17+)',
    '@Component({',
    '  standalone: true,',
    '  template: `',
    '    <p>Count: {{ count() }}</p>',
    '    <p>Doubled: {{ doubled() }}</p>',
    '    <button (click)="increment()">+1</button>',
    '  `',
    '})',
    'export class CounterComponent {',
    '  count = signal(0);',
    '  doubled = computed(() => this.count() * 2);',
    '',
    '  increment() {',
    '    this.count.update(v => v + 1);',
    '  }',
    '}',
    '',
    '// input() and output() signal-based (Angular 17.1+)',
    'export class CardComponent {',
    '  title = input<string>("Default Title"); // signal-based @Input',
    '  clicked = output<void>();               // signal-based @Output',
    '}',
  ].join('\n');

  internalWorking = 'Signals implement a push-pull reactive graph. When you read a signal inside a reactive context (template, computed(), effect()), Angular records that context as a dependency of the signal. When the signal value changes, Angular schedules re-evaluation only for the dependent contexts — not the entire component tree. computed() values are lazy: they only recalculate when read after a dependency change. effect() runs synchronously in the next microtask after a dependency changes.';

  advantages = [
    'Fine-grained reactivity — only dependent DOM parts update on signal change',
    'No Zone.js required — enables zoneless Angular applications',
    'Synchronous by default — easier to reason about than Observables for simple state',
    'automatic dependency tracking — no manual subscription/unsubscription',
    'Smaller bundle size when Zone.js is dropped',
    'Better DevTools integration — signal graph is inspectable',
    'Works with standalone components and traditional NgModule apps',
  ];

  disadvantages = [
    'Still maturing — some APIs were experimental in Angular 16/17',
    'Requires calling signals as functions (count()) — unfamiliar syntax for beginners',
    'Interop with RxJS requires toSignal() and toObservable() helpers',
    'Cannot replace all RxJS patterns (complex async compositions)',
    'Effect cleanup is manual (use DestroyRef or takeUntilDestroyed)',
  ];

  bestPractices = [
    'Use signal() for local component state instead of plain class properties',
    'Use computed() for derived values instead of getters with side effects',
    'Use toSignal() to convert Observables (HTTP, store selects) to signals',
    'Use input() and output() for component I/O in Angular 17.1+',
    'Use effect() only for side effects (logging, DOM manipulation) — not for state updates',
    'Avoid mutating signal array/object values — use .update() with spread for immutability',
  ];

  commonMistakes = [
    'Forgetting to call the signal as a function: using count instead of count() in templates',
    'Updating signals inside computed() — computed is derived, not writable',
    'Creating effects that write to signals causing infinite loops',
    'Not using toSignal() for HTTP observables — trying to use signals where Observable is needed',
    'Using effect() for state derivation instead of computed()',
  ];

  interviewQA = [
    {
      q: 'What are Angular Signals and why were they introduced?',
      a: 'Signals are fine-grained reactive primitives (signal, computed, effect) that enable granular change detection without Zone.js. They were introduced to overcome Zone.js\'s coarse-grained approach where any async event triggers full CD sweeps. Signals update only the specific DOM parts that depend on changed values.'
    },
    {
      q: 'What is the difference between signal(), computed(), and effect()?',
      a: 'signal() creates a writable reactive value with set/update methods. computed() creates a read-only derived signal that recalculates only when its dependencies change (lazy). effect() registers a side-effect callback that runs whenever its signal dependencies change — used for logging, DOM manipulation, not for state updates.'
    },
    {
      q: 'How do Angular Signals differ from RxJS Observables?',
      a: 'Signals are synchronous, always have a current value (like BehaviorSubject), and have automatic dependency tracking. Observables are lazy, asynchronous, support complex operators (debounce, switchMap, combineLatest), and require explicit subscription. Signals are simpler for local state; RxJS is more powerful for async data flows. Use toSignal() and toObservable() to bridge them.'
    },
    {
      q: 'What is the difference between signal.set() and signal.update()?',
      a: 'set() replaces the signal value with a new value directly: count.set(10). update() receives the current value and returns the new value via a transform function: count.update(v => v + 1). Use update() when the new value depends on the current value to avoid reading the signal separately.'
    },
    {
      q: 'What are signal-based inputs and outputs in Angular 17.1+?',
      a: 'input() creates a signal-based @Input: title = input<string>(). Reading title() gives the current input value, and it auto-updates when the parent changes it. output() replaces @Output EventEmitter: clicked = output<void>(); clicked.emit(). These integrate signals throughout the component I/O API.'
    },
    {
      q: 'How do you convert an Observable to a Signal?',
      a: 'Use the toSignal() function from @angular/core/rxjs-interop: const data = toSignal(this.http.get(url), { initialValue: [] }). This subscribes automatically and unsubscribes when the component is destroyed. The initialValue is required unless the Observable is guaranteed to emit synchronously.'
    },
  ];
}
