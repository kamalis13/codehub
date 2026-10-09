// DEFINITION: `catchError()` catches errors in an Observable stream and lets you recover with a fallback value or new Observable.
// SIMPLE ANALOGY: Like a try-catch block — when something goes wrong, you handle it gracefully instead of crashing.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-catch-error-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catch-error-operator.component.html',
  styleUrl: './catch-error-operator.component.css',
})
export class CatchErrorOperatorComponent {
  syntaxExample = `apiCall$.pipe(
  catchError(err => {
    console.error('Caught:', err.message);
    return of('fallback data');  // stream continues
  })
).subscribe(val => console.log(val));`;

  results: string[] = [];

  runSuccess() {
    this.results = [];

    of(10, 20, 30)
      .pipe(
        map((n) => n * 2),
        // catchError is here but nothing goes wrong — it just passes through
        catchError((err) => of(`Handled error: ${err.message}`))
      )
      .subscribe((val) => this.results.push(`${val}`));
  }

  runError() {
    this.results = [];

    // throwError() simulates a failed API call or broken stream
    throwError(() => new Error('API request failed!'))
      .pipe(
        // catchError intercepts the error and returns a safe fallback Observable
        catchError((err) => {
          this.results.push(`⚠️ Error caught: ${err.message}`);
          return of('Fallback data loaded'); // stream continues normally
        })
      )
      .subscribe((val) => this.results.push(`✅ Got: ${val}`));
  }
}
