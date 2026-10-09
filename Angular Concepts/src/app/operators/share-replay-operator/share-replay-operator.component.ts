import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { shareReplay, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-share-replay-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-replay-operator.component.html',
  styleUrl: './share-replay-operator.component.css',
})
export class ShareReplayOperatorComponent {
  syntaxExample = [
    "// Angular service pattern — cache HTTP response",
    "private data$ = this.http.get('/api/config').pipe(",
    "  shareReplay(1)  // cache 1 result, share with all subscribers",
    ");",
    "",
    "// Component A subscribes → HTTP call fires",
    "// Component B subscribes → gets CACHED result, no new HTTP call",
    "// Late component → gets the replayed cached value instantly",
  ].join('\n');

  withoutLog: string[] = [];
  withLog: string[] = [];
  httpCallCount = 0;
  sharedHttpCallCount = 0;

  private shared$: Observable<string> | null = null;

  runWithout() {
    this.withoutLog = [];
    this.httpCallCount = 0;

    const makeRequest = () => {
      this.httpCallCount++;
      const callNum = this.httpCallCount;
      this.withoutLog.push(`🌐 HTTP call #${callNum} fired!`);
      return of(`Data from call #${callNum}`).pipe(delay(500));
    };

    // Without shareReplay — each subscriber makes its own HTTP call
    makeRequest().subscribe(v => this.withoutLog.push(`Sub1: ${v}`));
    makeRequest().subscribe(v => this.withoutLog.push(`Sub2: ${v}`));
    makeRequest().subscribe(v => this.withoutLog.push(`Sub3: ${v}`));
  }

  runWith() {
    this.withLog = [];
    this.sharedHttpCallCount = 0;

    // shareReplay(1): ONE HTTP call, result cached and shared
    this.shared$ = of('Shared config data').pipe(
      delay(500),
      tap(() => {
        this.sharedHttpCallCount++;
        this.withLog.push(`🌐 HTTP call fired (only once!)`);
      }),
      shareReplay(1)
    );

    this.shared$.subscribe(v => this.withLog.push(`Sub1: ${v}`));
    this.shared$.subscribe(v => this.withLog.push(`Sub2: ${v}`));
    this.shared$.subscribe(v => this.withLog.push(`Sub3: ${v}`));

    // Late subscriber also gets the cached value
    setTimeout(() => {
      if (this.shared$) {
        this.withLog.push('--- Late subscriber joins after 1s ---');
        this.shared$.subscribe(v => this.withLog.push(`Late: ${v} (from cache!)`));
      }
    }, 1200);
  }
}
