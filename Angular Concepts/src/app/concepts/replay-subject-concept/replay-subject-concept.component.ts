import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaySubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-replay-subject-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './replay-subject-concept.component.html',
  styleUrl: './replay-subject-concept.component.css',
})
export class ReplaySubjectConceptComponent implements OnDestroy {
  syntaxExample = [
    "const replay$ = new ReplaySubject<number>(2); // buffer last 2",
    "",
    "replay$.next(1);",
    "replay$.next(2);",
    "replay$.next(3);",
    "",
    "// Late subscriber immediately receives 2 and 3 (last 2 buffered)",
    "replay$.subscribe(val => console.log(val)); // 2, 3",
  ].join('\n');

  earlyLog: string[] = [];
  lateLog: string[] = [];
  private subs: Subscription[] = [];
  replay$ = new ReplaySubject<string>(3); // buffer last 3 values

  pushValue(val: string) {
    this.replay$.next(val);
    this.earlyLog.push(`Pushed: "${val}"`);
  }

  addLateSubscriber() {
    this.lateLog = [];
    this.lateLog.push('--- Late subscriber joined ---');
    const sub = this.replay$.subscribe(v => this.lateLog.push(`Got: "${v}"`));
    this.subs.push(sub);
  }

  reset() {
    this.subs.forEach(s => s.unsubscribe());
    this.subs = [];
    this.earlyLog = [];
    this.lateLog = [];
    this.replay$ = new ReplaySubject<string>(3);
  }

  ngOnDestroy() { this.subs.forEach(s => s.unsubscribe()); }
}
