import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-hot-cold-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hot-cold-concept.component.html',
  styleUrl: './hot-cold-concept.component.css',
})
export class HotColdConceptComponent implements OnDestroy {
  coldCode = [
    "// COLD: each subscriber gets its OWN stream from scratch",
    "const cold$ = interval(1000).pipe(take(4));",
    "",
    "cold$.subscribe(v => console.log('Sub1:', v)); // 0,1,2,3",
    "setTimeout(() => {",
    "  cold$.subscribe(v => console.log('Sub2:', v)); // also 0,1,2,3",
    "}, 2000); // Sub2 starts fresh — misses nothing",
  ].join('\n');

  hotCode = [
    "// HOT: all subscribers share ONE running stream",
    "const hot$ = new Subject<number>();",
    "",
    "hot$.subscribe(v => console.log('Sub1:', v)); // sees all values",
    "// ... time passes, hot$ emits 0, 1 ...",
    "hot$.subscribe(v => console.log('Sub2:', v)); // joins mid-stream",
    "// Sub2 MISSES 0 and 1 — they already happened",
  ].join('\n');

  coldLog: string[] = [];
  hotLog: string[] = [];
  private subs: Subscription[] = [];
  hotSubject$ = new Subject<number>();
  hotCounter = 0;
  hotInterval: ReturnType<typeof setInterval> | null = null;

  runCold() {
    this.coldLog = [];
    const cold$ = interval(500).pipe(take(4));

    const sub1 = cold$.subscribe(v => this.coldLog.push(`Sub1 got: ${v}`));
    this.subs.push(sub1);

    setTimeout(() => {
      this.coldLog.push('--- Sub2 joins after 1.2s ---');
      const sub2 = cold$.subscribe(v => this.coldLog.push(`Sub2 got: ${v}`));
      this.subs.push(sub2);
    }, 1200);
  }

  startHot() {
    this.hotLog = [];
    this.hotCounter = 0;
    if (this.hotInterval) clearInterval(this.hotInterval);

    this.hotSubject$ = new Subject<number>();
    const sub1 = this.hotSubject$.subscribe(v => this.hotLog.push(`Sub1 got: ${v}`));
    this.subs.push(sub1);
    this.hotLog.push('Sub1 subscribed');

    this.hotInterval = setInterval(() => {
      this.hotSubject$.next(this.hotCounter++);
    }, 600);

    setTimeout(() => {
      this.hotLog.push('--- Sub2 joins late ---');
      const sub2 = this.hotSubject$.subscribe(v => this.hotLog.push(`Sub2 got: ${v}`));
      this.subs.push(sub2);
    }, 1800);

    setTimeout(() => {
      if (this.hotInterval) clearInterval(this.hotInterval);
      this.hotSubject$.complete();
    }, 4000);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
    if (this.hotInterval) clearInterval(this.hotInterval);
  }
}
