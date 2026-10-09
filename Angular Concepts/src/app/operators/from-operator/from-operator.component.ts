// DEFINITION: `from()` converts an Array, Promise, or iterable into an Observable.
// SIMPLE ANALOGY: Like unboxing a package — each item inside the array/promise is delivered one at a time.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-from-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './from-operator.component.html',
  styleUrl: './from-operator.component.css'
})
export class FromOperatorComponent {
  results: string[] = [];

  syntaxExample = [
    "import { from } from 'rxjs';",
    '',
    '// From an array — emits each element one by one',
    "from(['Red', 'Green', 'Blue']).subscribe(val => console.log(val));",
    '',
    '// From a Promise — emits the resolved value then completes',
    "from(fetch('/api/data')).subscribe(res => console.log(res));",
    '',
    '// From a string — emits each character',
    "from('Hello').subscribe(char => console.log(char)); // H,e,l,l,o",
  ].join('\n');

  runArray() {
    this.results = [];
    // from() unwraps an array and emits each element one by one
    const colors$ = from(['Red', 'Green', 'Blue']);
    colors$.subscribe({
      next: (color) => this.results.push(`Color: ${color}`),
      complete: () => this.results.push('✅ Done')
    });
  }

  runPromise() {
    this.results = [];
    // from() also wraps a Promise — it emits the resolved value then completes
    const promise$ = from(Promise.resolve('Hello from Promise!'));
    promise$.subscribe({
      next: (val) => this.results.push(`Promise resolved: ${val}`),
      complete: () => this.results.push('✅ Done')
    });
  }
}
