import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, BehaviorSubject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-with-latest-from-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './with-latest-from-operator.component.html',
  styleUrl: './with-latest-from-operator.component.css',
})
export class WithLatestFromOperatorComponent {
  syntaxExample = [
    "// When button clicked, grab the CURRENT input value",
    "btnClick$.pipe(",
    "  withLatestFrom(inputValue$)",
    "  // emits [clickEvent, latestInputValue]",
    ").subscribe(([click, value]) => {",
    "  console.log('Searched for:', value);",
    "});",
  ].join('\n');

  results: string[] = [];
  currentInput = '';

  input$ = new BehaviorSubject<string>('');
  search$ = new Subject<void>();

  constructor() {
    this.search$.pipe(
      withLatestFrom(this.input$)
    ).subscribe(([_, value]) => {
      if (value.trim()) {
        this.results.push(`🔍 Searched for: "${value}"`);
      } else {
        this.results.push('⚠️ Search triggered but input was empty');
      }
    });
  }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.currentInput = val;
    this.input$.next(val);
  }

  search() {
    this.search$.next();
  }

  reset() {
    this.results = [];
    this.currentInput = '';
    this.input$.next('');
  }
}
