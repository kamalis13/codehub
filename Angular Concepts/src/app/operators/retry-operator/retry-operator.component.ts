// DEFINITION: `retry(n)` re-subscribes to the source Observable up to N times when an error occurs.
// SIMPLE ANALOGY: Like hitting "retry" on a failed network request — it tries again automatically before giving up.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-retry-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './retry-operator.component.html',
  styleUrl: './retry-operator.component.css',
})
export class RetryOperatorComponent {
  syntaxExample = `apiCall$.pipe(
  retry(3),  // retry up to 3 times on error
  catchError(err => of('All retries failed'))
).subscribe(val => console.log(val));`;

  results: string[] = [];
  attemptCount = 0;

  run() {
    this.results = [];
    this.attemptCount = 0;

    // Simulates a flaky source that always fails
    const flakyRequest$ = new Observable<string>((observer) => {
      this.attemptCount++;
      this.results.push(`🔄 Attempt #${this.attemptCount}`);
      observer.error(new Error('Network timeout')); // always fails
    });

    flakyRequest$
      .pipe(
        // retry(3) will re-subscribe up to 3 more times after the first failure
        retry(3),

        // After all retries are exhausted, catchError handles the final error
        catchError((err) => {
          return of(`❌ All retries failed: ${err.message}`);
        })
      )
      .subscribe((val) => this.results.push(val));
  }
}
