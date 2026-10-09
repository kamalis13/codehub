import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { startWith, scan } from 'rxjs/operators';

@Component({
  selector: 'app-start-with-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-with-operator.component.html',
  styleUrl: './start-with-operator.component.css',
})
export class StartWithOperatorComponent {
  syntaxExample = [
    "// Emit an initial value before the source starts",
    "const status$ = apiCall$.pipe(",
    "  startWith('Loading...')  // shows immediately while waiting",
    ");",
    "",
    "// Combine with scan for state:",
    "actions$.pipe(",
    "  startWith({ type: 'INIT' }),",
    "  scan(reducer, initialState)",
    ")",
  ].join('\n');

  results: string[] = [];
  statusResults: string[] = [];

  run() {
    this.results = [];
    // startWith prepends 'Loading...' before the delayed data arrives
    of('Data loaded from server').pipe(
      startWith('Loading...', 'Connecting...')
    ).subscribe(val => this.results.push(val));
  }

  runCounter() {
    this.statusResults = [];
    const clicks$ = new Subject<string>();

    clicks$.pipe(
      startWith('No clicks yet'),
      scan((acc, curr) => curr === 'No clicks yet' ? curr : `Clicked (total: ${acc.includes('total') ? parseInt(acc.match(/\d+/)![0]) + 1 : 1})`, '')
    ).subscribe(v => this.statusResults.push(v));

    // Simulate 3 clicks
    setTimeout(() => clicks$.next('click'), 300);
    setTimeout(() => clicks$.next('click'), 600);
    setTimeout(() => clicks$.next('click'), 900);
  }
}
