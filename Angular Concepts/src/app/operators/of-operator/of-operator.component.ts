// DEFINITION: `of()` creates an Observable that emits the values you pass to it, one by one, then completes.
// SIMPLE ANALOGY: Like handing someone a bag of items — they receive each item, then the bag is empty.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-of-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './of-operator.component.html',
  styleUrl: './of-operator.component.css'
})
export class OfOperatorComponent implements OnInit {
  results: string[] = [];

  // Syntax shown in the code block panel
  syntaxExample = [
    "import { of } from 'rxjs';",
    '',
    "// Pass any values — of() emits them one by one",
    "const fruits$ = of('Apple', 'Banana', 'Cherry');",
    '',
    'fruits$.subscribe({',
    '  next:     fruit => console.log(fruit), // Apple, Banana, Cherry',
    '  complete: ()    => console.log("Done!")',
    '});',
  ].join('\n');

  ngOnInit() {}

  run() {
    this.results = [];

    // of() takes any values and emits them as a stream
    const fruits$ = of('Apple', 'Banana', 'Cherry');

    // subscribe() listens to each emitted value
    fruits$.subscribe({
      next: (fruit) => this.results.push(`Received: ${fruit}`),
      complete: () => this.results.push('✅ Stream completed')
    });
  }
}
