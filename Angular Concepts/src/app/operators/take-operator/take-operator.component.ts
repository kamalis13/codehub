// DEFINITION: `take(n)` takes only the first N values from a stream and then automatically completes.
// SIMPLE ANALOGY: Like telling a waiter "give me 3 samples" — after 3, they stop, no matter how many are left.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-take-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './take-operator.component.html',
  styleUrl: './take-operator.component.css',
})
export class TakeOperatorComponent {
  syntaxExample = `interval(1000).pipe(
  take(3)  // only first 3 values, then auto-completes
).subscribe({
  next: n => console.log(n),    // 0, 1, 2
  complete: () => console.log('Auto-completed!')
});`;

  results: string[] = [];

  run() {
    this.results = [];

    // interval() would emit forever — but take(5) stops it after 5 values
    interval(500)
      .pipe(
        take(5) // only allow the first 5 emissions through
      )
      .subscribe({
        next: (n) => this.results.push(`Tick: ${n}`),
        complete: () => this.results.push('✅ Auto-completed after 5 ticks')
      });
  }
}
