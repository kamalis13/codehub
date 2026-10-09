import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-emitter-topic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-emitter.component.html',
  styleUrl: './event-emitter.component.css',
})
export class EventEmitterTopicComponent {
  syntaxCode = [
    "import { EventEmitter } from '@angular/core';",
    "import { Subject } from 'rxjs';",
    '',
    '// EventEmitter extends Subject — synchronous by default',
    'const emitter = new EventEmitter<string>();',
    '',
    '// Emit a value',
    "emitter.emit('hello');",
    '',
    '// Subscribe (use only inside Angular templates or for testing)',
    'emitter.subscribe(value => console.log(value));',
    '',
    '// Async mode (runs emit inside setTimeout(fn, 0))',
    'const asyncEmitter = new EventEmitter<number>(true);',
    '',
    '// Typical usage with @Output in a component',
    '@Output() clicked = new EventEmitter<MouseEvent>();',
    '@Output() countChanged = new EventEmitter<number>();',
    '',
    'handleClick(event: MouseEvent) {',
    '  this.clicked.emit(event);',
    '}',
    '',
    '// In template: (click)="handleClick($event)"',
    '// Parent:      (clicked)="onChildClick($event)"',
  ].join('\n');

  exampleCode = [
    '// custom-button.component.ts — tracks clicks and emits count',
    "import { Component, Output, EventEmitter } from '@angular/core';",
    '',
    "@Component({",
    "  selector: 'app-custom-button',",
    '  standalone: true,',
    '  template: `',
    '    <button (click)="onClick()">',
    '      Click me ({{ clickCount }} times)',
    '    </button>',
    '  `',
    '})',
    'export class CustomButtonComponent {',
    '  @Output() clickCount$ = new EventEmitter<number>();',
    '  clickCount = 0;',
    '',
    '  onClick() {',
    '    this.clickCount++;',
    '    this.clickCount$.emit(this.clickCount);',
    '  }',
    '}',
    '',
    '// parent.component.html',
    '<app-custom-button (clickCount$)="handleCount($event)">',
    '</app-custom-button>',
    '<p>Parent received: {{ lastCount }}</p>',
    '',
    '// parent.component.ts',
    'export class ParentComponent {',
    '  lastCount = 0;',
    '  handleCount(count: number) { this.lastCount = count; }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is Angular\'s EventEmitter and how does it differ from an RxJS Subject?',
      a: 'EventEmitter extends RxJS Subject and adds an emit() method (which calls next() internally). The key differences are: (1) EventEmitter is Angular-specific and designed for @Output bindings; (2) Subject is a general RxJS primitive for multi-cast observables; (3) EventEmitter can be asynchronous via new EventEmitter(true), whereas Subject is always synchronous. Outside of @Output, you should use Subject instead of EventEmitter.',
    },
    {
      q: 'Should you use EventEmitter in a service for cross-component communication?',
      a: 'No. Angular documentation explicitly discourages using EventEmitter in services. EventEmitter is designed only for @Output bindings in components. In services, use RxJS Subject or BehaviorSubject for broadcasting events. EventEmitter in a service is an anti-pattern because it leaks Angular-specific concerns into the service layer and loses some Observable features.',
    },
    {
      q: 'What is the difference between synchronous and asynchronous EventEmitter?',
      a: 'new EventEmitter<T>() (default, false) emits synchronously — the parent\'s event handler runs in the same call stack as emit(). new EventEmitter<T>(true) emits asynchronously — it wraps the notification in setTimeout(fn, 0), deferring it to the next event loop tick. Synchronous is the default and is almost always what you want for @Output bindings.',
    },
    {
      q: 'Is it safe to call .subscribe() directly on an EventEmitter?',
      a: 'While technically possible (since EventEmitter is a Subject), subscribing to an @Output EventEmitter directly in TypeScript code is an anti-pattern. Angular may replace or complete the EventEmitter between view re-renders, leading to missed events or memory leaks. For programmatic access to a child\'s events, use @ViewChild to get the child instance and subscribe via the EventEmitter, but manage unsubscription carefully in ngOnDestroy.',
    },
    {
      q: 'How do you pass the event object from a template event to an @Output EventEmitter?',
      a: 'In the template, use $event as the argument: (click)="handleClick($event)". In the method, emit it: handleClick(ev: MouseEvent) { this.clicked.emit(ev); }. The parent then receives it as $event in (clicked)="onClicked($event)". For custom payloads you create, just pass any value to emit() and type the EventEmitter accordingly.',
    },
    {
      q: 'What happens if you emit from an EventEmitter after the component is destroyed?',
      a: 'Emitting after destruction can cause "expression changed after checked" errors or call handlers on destroyed components, potentially causing memory leaks if those handlers reference DOM nodes. Best practice: call complete() on EventEmitters in ngOnDestroy, or use takeUntilDestroyed() operator so that any internal subscriptions clean themselves up. For @Output bindings, Angular unsubscribes the parent binding automatically when the child is destroyed.',
    },
  ];
}
