// DEFINITION: `combineLatest()` combines multiple Observables and emits whenever ANY of them emits, using the latest value from each.
// SIMPLE ANALOGY: Like a scoreboard that updates whenever any team scores — it always shows the current total from all teams.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-combine-latest-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './combine-latest-operator.component.html',
  styleUrl: './combine-latest-operator.component.css',
})
export class CombineLatestOperatorComponent {
  syntaxExample = `combineLatest([firstName$, lastName$]).pipe(
  map(([first, last]) => first + ' ' + last)
).subscribe(fullName => console.log(fullName));
// emits whenever ANY source changes
// uses the LATEST value from ALL sources`;

  fullName = '';

  // BehaviorSubject holds an initial value and emits on every change
  firstName$ = new BehaviorSubject<string>('John');
  lastName$ = new BehaviorSubject<string>('Doe');

  constructor() {
    // combineLatest waits until BOTH streams have emitted at least once
    // then emits an array of [latestFirst, latestLast] on every change
    combineLatest([this.firstName$, this.lastName$])
      .pipe(
        map(([first, last]) => `${first} ${last}`)
      )
      .subscribe((name) => (this.fullName = name));
  }
}
