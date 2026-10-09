// DEFINITION: `switchMap()` cancels the previous inner Observable when a new value arrives, and starts a fresh one.
// SIMPLE ANALOGY: Like a search box — if you type fast, old search requests are cancelled and only the latest one runs.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-switch-map-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch-map-operator.component.html',
  styleUrl: './switch-map-operator.component.css',
})
export class SwitchMapOperatorComponent {
  syntaxExample = `searchInput$.pipe(
  switchMap(term => searchApi(term))
  // cancels previous search when user types again
  // only the LATEST search completes
).subscribe(results => console.log(results));`;

  results: string[] = [];

  // Subject acts as a trigger — each keystroke pushes a new value
  search$ = new Subject<string>();

  constructor() {
    this.search$
      .pipe(
        // switchMap cancels the old "API call" when user types again
        switchMap((term) =>
          of(`Result for: "${term}"`).pipe(delay(800))
        )
      )
      .subscribe((res) => {
        this.results = [res]; // only show the latest result
      });
  }
}
