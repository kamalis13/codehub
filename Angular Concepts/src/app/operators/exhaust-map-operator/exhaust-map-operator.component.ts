import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { exhaustMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-exhaust-map-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exhaust-map-operator.component.html',
  styleUrl: './exhaust-map-operator.component.css',
})
export class ExhaustMapOperatorComponent {
  syntaxExample = [
    "// Prevents duplicate form submissions",
    "submitBtn$.pipe(",
    "  exhaustMap(() => this.api.saveForm(formData))",
    "  // while save is in progress, additional clicks are IGNORED",
    "  // only after the request completes can a new one start",
    ").subscribe(result => console.log(result));",
  ].join('\n');

  results: string[] = [];
  clickCount = 0;
  ignoredCount = 0;

  submit$ = new Subject<void>();

  constructor() {
    this.submit$.pipe(
      exhaustMap(() => {
        this.results.push(`🚀 Request started (click #${this.clickCount})`);
        return of('✅ Response received').pipe(delay(2000));
      })
    ).subscribe(val => this.results.push(val));
  }

  click() {
    this.clickCount++;
    this.results.push(`👆 Click #${this.clickCount} triggered`);
    this.submit$.next();
  }

  reset() {
    this.results = [];
    this.clickCount = 0;
    this.ignoredCount = 0;
  }
}
