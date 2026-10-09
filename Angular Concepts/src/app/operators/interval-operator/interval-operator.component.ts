// DEFINITION: `interval()` creates an Observable that emits an incrementing number at a fixed time interval.
// SIMPLE ANALOGY: Like a clock ticking — it keeps emitting every N milliseconds until you stop it.

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-interval-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interval-operator.component.html',
  styleUrl: './interval-operator.component.css'
})
export class IntervalOperatorComponent implements OnDestroy {
  results: string[] = [];
  count = 0;
  running = false;
  private sub!: Subscription;

  syntaxExample = [
    "import { interval } from 'rxjs';",
    '',
    '// Emits 0, 1, 2, 3... every 1000ms',
    'const sub = interval(1000).subscribe(n => {',
    '  console.log(n); // 0, 1, 2, 3...',
    '});',
    '',
    '// MUST call unsubscribe() — interval runs forever otherwise',
    'sub.unsubscribe(); // stops the timer',
  ].join('\n');

  start() {
    this.results = [];
    this.count = 0;
    this.running = true;
    // interval(1000) emits 0, 1, 2, 3... every 1000ms
    // IMPORTANT: Must unsubscribe to stop — it never stops on its own
    this.sub = interval(1000).subscribe((n) => {
      this.count = n;
      this.results.push(`Tick #${n}`);
    });
  }

  stop() {
    this.sub.unsubscribe();
    this.running = false;
    this.results.push('⛔ Stopped');
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
