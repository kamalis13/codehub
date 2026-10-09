// DEFINITION: `mergeMap()` maps each value to an inner Observable and subscribes to ALL of them at once (concurrently).
// SIMPLE ANALOGY: Like ordering multiple deliveries simultaneously — all are processed in parallel, results arrive as they finish.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-merge-map-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merge-map-operator.component.html',
  styleUrl: './merge-map-operator.component.css',
})
export class MergeMapOperatorComponent {
  syntaxExample = `clicks$.pipe(
  mergeMap(click => fetchUser(click.userId))
  // all inner Observables run concurrently
  // results arrive in order of completion, NOT source order
).subscribe(user => console.log(user));`;

  results: string[] = [];

  run() {
    this.results = [];

    // Simulates 3 API calls with different delays
    const requests$ = of(
      { name: 'User A', delay: 1500 },
      { name: 'User B', delay: 500 },
      { name: 'User C', delay: 1000 }
    );

    requests$
      .pipe(
        // mergeMap subscribes to each inner Observable immediately (all at once)
        mergeMap((req) =>
          of(`Response for ${req.name}`).pipe(delay(req.delay))
        )
      )
      .subscribe((res) => this.results.push(res));
    // Results arrive as: B → C → A (by completion speed, not source order)
  }
}
