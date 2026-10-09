// DEFINITION: `tap()` lets you "peek" at each value without changing it — useful for logging/debugging.
// SIMPLE ANALOGY: Like a security camera on a conveyor belt — it watches items go by but doesn't touch them.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-tap-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tap-operator.component.html',
  styleUrl: './tap-operator.component.css',
})
export class TapOperatorComponent {
  syntaxExample = `source$.pipe(
  tap(val => console.log('Before:', val)),  // side-effect only, no change
  map(val => val * 2),
  tap(val => console.log('After:', val))
).subscribe();`;

  results: string[] = [];

  run() {
    this.results = [];

    const numbers$ = of(1, 2, 3);

    numbers$
      .pipe(
        // tap() logs the ORIGINAL value before map() changes it
        tap((n) => this.results.push(`[tap] Before map: ${n}`)),

        // map() doubles the value
        map((n) => n * 2),

        // another tap() logs the value AFTER map()
        tap((n) => this.results.push(`[tap] After map: ${n}`))
      )
      .subscribe((val) => {
        this.results.push(`✅ Final value: ${val}`);
      });
  }
}
