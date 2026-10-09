// DEFINITION: `BehaviorSubject` is a Subject that requires an initial value and always gives new subscribers the LATEST emitted value immediately.
// SIMPLE ANALOGY: Like a notice board — it always shows the most recent announcement, even to people who just arrived.

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-behavior-subject-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './behavior-subject-operator.component.html',
  styleUrl: './behavior-subject-operator.component.css',
})
export class BehaviorSubjectOperatorComponent implements OnDestroy {
  syntaxExample = `const count$ = new BehaviorSubject(0); // initial = 0
count$.subscribe(val => console.log(val)); // prints 0 immediately
count$.next(1); // prints 1
count$.next(2); // prints 2
console.log(count$.getValue()); // 2`;

  earlyLog: string[] = [];
  lateLog: string[] = [];
  private subs: Subscription[] = [];

  // BehaviorSubject requires an initial value — here it's 0
  count$ = new BehaviorSubject<number>(0);

  constructor() {
    // Early subscriber sees everything from the start
    const sub = this.count$.subscribe((val) => this.earlyLog.push(`Early got: ${val}`));
    this.subs.push(sub);
  }

  increment() {
    // getValue() reads the current value without subscribing
    this.count$.next(this.count$.getValue() + 1);
  }

  addLateSubscriber() {
    // Late subscriber immediately receives the CURRENT value (not just future values)
    const sub = this.count$.subscribe((val) => this.lateLog.push(`Late got: ${val}`));
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
