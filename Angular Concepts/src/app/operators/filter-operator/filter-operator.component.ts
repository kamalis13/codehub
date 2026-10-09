// DEFINITION: `filter()` only lets values through that pass a given condition (like a gatekeeper).
// SIMPLE ANALOGY: Like a bouncer at a club — only people who meet the criteria get in.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-filter-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-operator.component.html',
  styleUrl: './filter-operator.component.css',
})
export class FilterOperatorComponent {
  syntaxExample = `of(1,2,3,4,5).pipe(
  filter(n => n % 2 === 0)  // only even numbers pass through
).subscribe(val => console.log(val)); // 2, 4`;

  results: string[] = [];

  run() {
    this.results = [];

    const numbers$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    numbers$
      // filter() keeps only even numbers; odd ones are silently discarded
      .pipe(
        filter((n) => n % 2 === 0)
      )
      .subscribe((val) => {
        this.results.push(`Even: ${val}`);
      });
  }
}
