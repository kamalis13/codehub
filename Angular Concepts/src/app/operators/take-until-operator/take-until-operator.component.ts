import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-take-until-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './take-until-operator.component.html',
  styleUrl: './take-until-operator.component.css',
})
export class TakeUntilOperatorComponent implements OnDestroy {
  syntaxExample = [
    "// THE Angular pattern for memory-safe subscriptions",
    "private destroy$ = new Subject<void>();",
    "",
    "ngOnInit() {",
    "  interval(1000).pipe(",
    "    takeUntil(this.destroy$)  // auto-stops when destroy$ emits",
    "  ).subscribe(val => this.doSomething(val));",
    "}",
    "",
    "ngOnDestroy() {",
    "  this.destroy$.next(); // signal all takeUntil streams to stop",
    "  this.destroy$.complete();",
    "}",
  ].join('\n');

  results: string[] = [];
  isRunning = false;
  private stop$ = new Subject<void>();

  start() {
    if (this.isRunning) return;
    this.results = [];
    this.isRunning = true;
    this.stop$ = new Subject<void>();

    interval(600).pipe(
      takeUntil(this.stop$)
    ).subscribe({
      next: n => this.results.push(`Tick: ${n}`),
      complete: () => {
        this.results.push('✅ Stream completed (takeUntil fired)');
        this.isRunning = false;
      }
    });
  }

  stop() {
    this.stop$.next();
    this.stop$.complete();
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}
