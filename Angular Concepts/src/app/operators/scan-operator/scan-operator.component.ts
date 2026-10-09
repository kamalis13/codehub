import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-scan-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scan-operator.component.html',
  styleUrl: './scan-operator.component.css',
})
export class ScanOperatorComponent {
  syntaxExample = [
    "// scan() is like Array.reduce() but emits each intermediate result",
    "of(1, 2, 3, 4, 5).pipe(",
    "  scan((acc, curr) => acc + curr, 0)",
    ").subscribe(console.log);",
    "// Emits: 1, 3, 6, 10, 15 (running total)",
    "",
    "// Common use: accumulate events into state",
    "actions$.pipe(",
    "  scan((state, action) => ({ ...state, ...action }), {})",
    ")",
  ].join('\n');

  total = 0;
  items: string[] = [];
  action$ = new Subject<number>();

  constructor() {
    this.action$.pipe(
      scan((acc, curr) => acc + curr, 0)
    ).subscribe(sum => this.total = sum);
  }

  add(n: number) {
    this.items.push(`+ ${n} → running total`);
    this.action$.next(n);
  }

  reset() {
    this.total = 0;
    this.items = [];
    this.action$ = new Subject<number>();
    this.action$.pipe(
      scan((acc, curr) => acc + curr, 0)
    ).subscribe(sum => this.total = sum);
  }
}
