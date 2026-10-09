import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { finalize, catchError, delay } from 'rxjs/operators';

@Component({
  selector: 'app-finalize-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finalize-operator.component.html',
  styleUrl: './finalize-operator.component.css',
})
export class FinalizeOperatorComponent {
  syntaxExample = [
    "loading = true;",
    "",
    "this.api.getData().pipe(",
    "  catchError(err => of('fallback')),",
    "  finalize(() => this.loading = false)  // ALWAYS runs",
    "  // runs on: complete, error, and unsubscribe",
    ").subscribe(data => this.display(data));",
  ].join('\n');

  log: string[] = [];
  loading = false;

  runSuccess() {
    this.log = [];
    this.loading = true;
    this.log.push('⏳ Loading started...');

    of('Server data').pipe(
      delay(1000),
      finalize(() => {
        this.loading = false;
        this.log.push('🏁 finalize() ran — loading = false');
      })
    ).subscribe(val => this.log.push(`✅ Got: ${val}`));
  }

  runError() {
    this.log = [];
    this.loading = true;
    this.log.push('⏳ Loading started...');

    throwError(() => new Error('Network error')).pipe(
      catchError(err => {
        this.log.push(`⚠️ Error caught: ${err.message}`);
        return of('Fallback data');
      }),
      finalize(() => {
        this.loading = false;
        this.log.push('🏁 finalize() ran even after error — loading = false');
      })
    ).subscribe(val => this.log.push(`Got: ${val}`));
  }
}
