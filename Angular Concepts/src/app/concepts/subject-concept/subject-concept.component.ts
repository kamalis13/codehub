/*
 * ══════════════════════════════════════════════════════════
 *  SUBJECT
 * ══════════════════════════════════════════════════════════
 *
 *  DEFINITION:
 *    A Subject is BOTH an Observable AND an Observer at the same time.
 *    • As an Observable: you can subscribe() to it and receive values.
 *    • As an Observer: you can call next(), error(), complete() on it
 *      to push new values INTO the stream manually.
 *
 *  It is also a MULTICAST — one Subject can have MANY subscribers,
 *  and ALL of them receive the same emitted value at the same time.
 *
 *  REAL-LIFE ANALOGY:
 *    A radio station / live event broadcaster.
 *    • You (the Subject) broadcast a message.
 *    • Everyone who has "tuned in" (subscribed) hears it simultaneously.
 *    • Someone who tunes in AFTER the broadcast MISSES it — no replay.
 *
 *  KEY RULES:
 *    1. next(value)  → manually push a new value to all subscribers.
 *    2. error(err)   → push an error; all subscribers get it and stream ends.
 *    3. complete()   → signal no more values; all subscribers are notified.
 *    4. NO initial value — new subscribers get NOTHING until next() is called.
 *    5. Subscribers miss values emitted before they subscribed (hot stream).
 *
 *  TYPES OF SUBJECTS:
 *    Subject          → no memory (this component)
 *    BehaviorSubject  → remembers the LAST value
 *    ReplaySubject    → remembers N last values
 *    AsyncSubject     → only emits the LAST value on complete()
 * ══════════════════════════════════════════════════════════
 */

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject-concept.component.html',
  styleUrl: './subject-concept.component.css'
})
export class SubjectConceptComponent implements OnDestroy {
  log1: string[] = [];
  log2: string[] = [];
  lateSub: string[] = [];
  counter = 0;
  hasLate = false;
  private subs: Subscription[] = [];

  // The Subject — acts as both Observable and Observer
  readonly events$ = new Subject<string>();

  // Code syntax examples
  syntaxExample = [
    "import { Subject } from 'rxjs';",
    '',
    '// Create a Subject',
    'const subject$ = new Subject<string>();',
    '',
    '// Subscribe (Subject as Observable)',
    "const sub1 = subject$.subscribe(val => console.log('Sub1:', val));",
    "const sub2 = subject$.subscribe(val => console.log('Sub2:', val));",
    '',
    '// Push values (Subject as Observer)',
    "subject$.next('Hello');  // Both sub1 and sub2 receive 'Hello'",
    "subject$.next('World');  // Both receive 'World'",
    '',
    '// End the stream',
    'subject$.complete();',
    '',
    '// Cleanup',
    'sub1.unsubscribe();',
    'sub2.unsubscribe();',
  ].join('\n');

  constructor() {
    // Subscriber 1 — registered at start
    const s1 = this.events$.subscribe((val) => {
      this.log1.push(`📩 Got: "${val}"`);
    });
    // Subscriber 2 — registered at start
    const s2 = this.events$.subscribe((val) => {
      this.log2.push(`📩 Got: "${val}"`);
    });
    this.subs.push(s1, s2);
  }

  emit() {
    // next() pushes a new value into the Subject — all active subscribers receive it
    const message = `Message #${++this.counter}`;
    this.events$.next(message);
  }

  addLateSubscriber() {
    // This subscriber joins AFTER some values were already emitted
    // It will NOT receive past values — Subject has no memory
    this.hasLate = true;
    this.lateSub.push('(joined now — missed earlier messages)');
    const s = this.events$.subscribe((val) => {
      this.lateSub.push(`📩 Got: "${val}"`);
    });
    this.subs.push(s);
  }

  completeStream() {
    // complete() signals no more values — all subscribers are notified
    this.events$.complete();
    this.log1.push('✅ Stream completed');
    this.log2.push('✅ Stream completed');
    if (this.hasLate) this.lateSub.push('✅ Stream completed');
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
