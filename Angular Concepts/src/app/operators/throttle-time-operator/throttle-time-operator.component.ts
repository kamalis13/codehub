import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { throttleTime, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-throttle-time-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './throttle-time-operator.component.html',
  styleUrl: './throttle-time-operator.component.css',
})
export class ThrottleTimeOperatorComponent implements OnDestroy {
  syntaxExample = [
    "// Emits FIRST value, then ignores for N ms",
    "clicks$.pipe(",
    "  throttleTime(1000)  // one click per second max",
    ").subscribe(handleClick);",
    "",
    "// vs debounceTime: emits LAST value after pause",
    "// throttleTime: emits FIRST value, silences rest",
  ].join('\n');

  clicks$ = new Subject<void>();
  throttleLog: string[] = [];
  debounceLog: string[] = [];
  rawCount = 0;
  private subs: Subscription[] = [];

  constructor() {
    const throttleSub = this.clicks$.pipe(
      throttleTime(1000)
    ).subscribe(() => this.throttleLog.push(`Passed through (raw click #${this.rawCount})`));

    const debounceSub = this.clicks$.pipe(
      debounceTime(1000)
    ).subscribe(() => this.debounceLog.push(`Fired after 1s pause (raw clicks: ${this.rawCount})`));

    this.subs.push(throttleSub, debounceSub);
  }

  click() {
    this.rawCount++;
    this.clicks$.next();
  }

  reset() {
    this.throttleLog = [];
    this.debounceLog = [];
    this.rawCount = 0;
  }

  ngOnDestroy() { this.subs.forEach(s => s.unsubscribe()); }
}
