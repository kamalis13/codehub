// DEFINITION: `distinctUntilChanged()` only emits a value if it is DIFFERENT from the previous one.
// SIMPLE ANALOGY: Like a sensor that only alerts you when temperature actually changes — ignores repeated identical readings.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-distinct-until-changed-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './distinct-until-changed-operator.component.html',
  styleUrl: './distinct-until-changed-operator.component.css',
})
export class DistinctUntilChangedOperatorComponent {
  syntaxExample = `of(1, 1, 2, 2, 3, 1).pipe(
  distinctUntilChanged()
).subscribe(val => console.log(val)); // 1, 2, 3, 1
// skips consecutive DUPLICATES only
// the last 1 IS emitted (previous was 3)`;

  results: string[] = [];
  sourceValues: string[] = [];

  run() {
    this.results = [];
    this.sourceValues = [];

    // Note: 1,1 → duplicate; 2,2 → duplicate; 1 at end is different from previous 2
    const data = [1, 1, 2, 2, 3, 1];

    from(data).subscribe((val) => this.sourceValues.push(`${val}`));

    from(data)
      .pipe(
        // emits 1, 2, 3, 1 — skips the second 1 and second 2
        distinctUntilChanged()
      )
      .subscribe((val) => this.results.push(`${val}`));
  }
}
