// DEFINITION: `map()` transforms each emitted value by applying a function to it.
// SIMPLE ANALOGY: Like a machine on a conveyor belt — each item goes in, gets modified, then comes out changed.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-operator.component.html',
  styleUrl: './map-operator.component.css'
})
export class MapOperatorComponent {
  results: string[] = [];

  syntaxExample = [
    "import { of } from 'rxjs';",
    "import { map } from 'rxjs/operators';",
    '',
    'of(1, 2, 3).pipe(',
    '  map(n => n * 10)  // transform each value',
    ').subscribe(val => console.log(val)); // 10, 20, 30',
    '',
    '// map() returns a NEW value — it does NOT change the source',
    "of('alice', 'bob').pipe(",
    '  map(name => name.toUpperCase())',
    ").subscribe(val => console.log(val)); // ALICE, BOB",
  ].join('\n');

  run() {
    this.results = [];
    const numbers$ = of(1, 2, 3, 4, 5);
    numbers$
      // map() multiplies each number by 10 before it reaches subscribe()
      .pipe(map((n) => n * 10))
      .subscribe((val) => this.results.push(`${val}`));
  }
}
