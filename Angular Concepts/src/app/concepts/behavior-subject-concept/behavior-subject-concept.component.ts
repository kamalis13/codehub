/*
 * ══════════════════════════════════════════════════════════
 *  BEHAVIORSUBJECT
 * ══════════════════════════════════════════════════════════
 *
 *  DEFINITION:
 *    A BehaviorSubject is a Subject that:
 *    1. Requires an INITIAL VALUE when created.
 *    2. Always stores the LATEST emitted value.
 *    3. Gives any NEW subscriber the current (latest) value IMMEDIATELY
 *       upon subscription — without waiting for the next next() call.
 *
 *  REAL-LIFE ANALOGY:
 *    A notice board / scoreboard.
 *    • The scoreboard always shows the CURRENT score.
 *    • When you walk into the room (late subscriber), you immediately
 *      see the current score — you don't wait for the next goal.
 *    • When a new goal is scored, everyone (all subscribers) sees it.
 *
 *  KEY DIFFERENCES FROM SUBJECT:
 *    Subject          → late subscribers get NOTHING (no memory)
 *    BehaviorSubject  → late subscribers get the CURRENT value immediately
 *
 *  KEY RULES:
 *    1. Must provide an initial value: new BehaviorSubject(initialValue)
 *    2. getValue() reads the current value synchronously (without subscribing)
 *    3. next(value) pushes a new value and becomes the new "current" value
 *    4. All subscribers (early and late) receive the same current value
 *
 *  USE IN ANGULAR:
 *    Perfect for shared state management — e.g., current user, theme,
 *    cart items, search filters. Any component can read the current state
 *    immediately upon subscribing.
 * ══════════════════════════════════════════════════════════
 */

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-behavior-subject-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './behavior-subject-concept.component.html',
  styleUrl: './behavior-subject-concept.component.css'
})
export class BehaviorSubjectConceptComponent implements OnDestroy {
  earlyLog: string[] = [];
  lateLog: string[] = [];
  hasLate = false;
  private subs: Subscription[] = [];

  // BehaviorSubject with initial value 0 — always holds the current value
  readonly count$ = new BehaviorSubject<number>(0);

  syntaxExample = [
    "import { BehaviorSubject } from 'rxjs';",
    '',
    '// MUST provide an initial value',
    'const count$ = new BehaviorSubject<number>(0);',
    '',
    '// Read current value synchronously (no subscribe needed)',
    'console.log(count$.getValue()); // 0',
    '',
    '// Subscribe — immediately receives current value (0)',
    "const sub = count$.subscribe(val => console.log('Got:', val));",
    '',
    '// Push new values',
    'count$.next(1); // all subscribers get 1',
    'count$.next(2); // all subscribers get 2',
    '',
    '// Late subscriber — instantly gets current value (2)',
    "count$.subscribe(val => console.log('Late got:', val)); // prints 2 immediately",
    '',
    '// Read current value without subscribing',
    'console.log(count$.getValue()); // 2',
  ].join('\n');

  subjectVsBehavior = [
    'const subject$ = new Subject<number>();',
    'const behavior$ = new BehaviorSubject<number>(42);',
    '',
    '// Late subscriber joins now (AFTER stream started)',
    "subject$.subscribe(v  => console.log('Subject got:', v));   // gets NOTHING",
    "behavior$.subscribe(v => console.log('Behavior got:', v));  // gets 42 immediately",
  ].join('\n');

  constructor() {
    // Early subscriber — joins at the start
    const s = this.count$.subscribe((val) => {
      this.earlyLog.push(`📩 Got: ${val}  (current stored value)`);
    });
    this.subs.push(s);
  }

  increment() {
    // next() pushes a new value AND stores it as the new current value
    this.count$.next(this.count$.getValue() + 1);
  }

  decrement() {
    this.count$.next(this.count$.getValue() - 1);
  }

  addLateSubscriber() {
    this.hasLate = true;
    // This subscriber joins late — it immediately gets the CURRENT value via BehaviorSubject
    const s = this.count$.subscribe((val) => {
      this.lateLog.push(`📩 Got: ${val}`);
    });
    this.subs.push(s);
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
