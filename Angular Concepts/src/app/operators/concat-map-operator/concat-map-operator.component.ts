// DEFINITION: `concatMap()` maps each value to an inner Observable but waits for one to complete before starting the next.
// SIMPLE ANALOGY: Like a single cashier checkout lane — customers are served one at a time, in strict order.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-concat-map-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concat-map-operator.component.html',
  styleUrl: './concat-map-operator.component.css',
})
export class ConcatMapOperatorComponent {
  syntaxExample = `of('Task1', 'Task2', 'Task3').pipe(
  concatMap(task => runTask(task))
  // strict sequential — waits for each to finish
  // results always arrive in source order
).subscribe(result => console.log(result));`;

  results: string[] = [];

  run() {
    this.results = [];

    const requests$ = of(
      { name: 'Task 1', delay: 1500 },
      { name: 'Task 2', delay: 500 },
      { name: 'Task 3', delay: 1000 }
    );

    requests$
      .pipe(
        // concatMap waits for Task 1 to finish before starting Task 2, etc.
        concatMap((req) =>
          of(`Done: ${req.name}`).pipe(delay(req.delay))
        )
      )
      .subscribe((res) => this.results.push(res));
    // Results always arrive: Task 1 → Task 2 → Task 3 (never out of order)
  }
}
