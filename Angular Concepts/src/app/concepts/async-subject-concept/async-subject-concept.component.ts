import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-async-subject-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './async-subject-concept.component.html',
  styleUrl: './async-subject-concept.component.css',
})
export class AsyncSubjectConceptComponent implements OnDestroy {
  syntaxExample = [
    "const async$ = new AsyncSubject<number>();",
    "",
    "async$.subscribe(val => console.log('Sub1:', val));",
    "",
    "async$.next(1); // stored but NOT emitted yet",
    "async$.next(2); // replaces 1 as the 'last' value",
    "async$.next(3); // replaces 2",
    "",
    "async$.complete(); // NOW emits 3 to Sub1",
    "// Any new subscriber ALSO gets 3 immediately",
  ].join('\n');

  log: string[] = [];
  lateLog: string[] = [];
  async$ = new AsyncSubject<number>();
  private subs: Subscription[] = [];
  isCompleted = false;

  constructor() {
    const sub = this.async$.subscribe(v => this.log.push(`Sub1 got: ${v}`));
    this.subs.push(sub);
    this.log.push('Sub1 subscribed (waiting...)');
  }

  push(val: number) {
    if (!this.isCompleted) {
      this.async$.next(val);
      this.log.push(`Pushed: ${val} (buffered, not emitted yet)`);
    }
  }

  complete() {
    if (!this.isCompleted) {
      this.isCompleted = true;
      this.async$.complete();
      this.log.push('complete() called → Sub1 receives last value!');
    }
  }

  addLateSubscriber() {
    if (this.isCompleted) {
      this.lateLog = [];
      const sub = this.async$.subscribe(v => this.lateLog.push(`Late got: ${v}`));
      this.subs.push(sub);
      this.lateLog.push('Subscribed after complete — got last value instantly!');
    } else {
      this.lateLog = ['Complete the subject first!'];
    }
  }

  reset() {
    this.subs.forEach(s => s.unsubscribe());
    this.subs = [];
    this.log = [];
    this.lateLog = [];
    this.isCompleted = false;
    this.async$ = new AsyncSubject<number>();
    const sub = this.async$.subscribe(v => this.log.push(`Sub1 got: ${v}`));
    this.subs.push(sub);
    this.log.push('Sub1 subscribed (waiting...)');
  }

  ngOnDestroy() { this.subs.forEach(s => s.unsubscribe()); }
}
