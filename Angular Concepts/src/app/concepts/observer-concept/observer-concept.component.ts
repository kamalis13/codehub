/*
 * ══════════════════════════════════════════════════════════
 *  OBSERVER
 * ══════════════════════════════════════════════════════════
 *
 *  DEFINITION:
 *    An Observer is the LISTENER — the object that receives
 *    values emitted by an Observable.
 *
 *    An Observer has exactly 3 handler functions:
 *      next(value)    → called each time a new value arrives
 *      error(err)     → called if the stream errors out
 *      complete()     → called when the stream is fully done
 *
 *  REAL-LIFE ANALOGY:
 *    Imagine an Observable is a RADIO STATION broadcasting music.
 *    The Observer is YOUR RADIO — it receives the signal.
 *      next()     → a new song plays on your radio
 *      error()    → the signal is lost / interference
 *      complete() → the station signs off for the night
 *
 *  KEY INSIGHT:
 *    Observable   = PRODUCER (creates / emits data)
 *    Observer     = CONSUMER (receives / reacts to data)
 *    subscribe()  = the CONNECTION between them
 * ══════════════════════════════════════════════════════════
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-observer-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observer-concept.component.html',
  styleUrl: './observer-concept.component.css'
})
export class ObserverConceptComponent {
  nextLog: string[] = [];
  errorLog: string[] = [];
  completeLog: string[] = [];
  nextFired = false;
  errorFired = false;
  completeFired = false;
  running = false;

  // Code example stored as string — safe to render via [innerText]
  codeExample = [
    '// WAY 1: Full Observer object (most explicit)',
    'source$.subscribe({',
    "  next:     (val) => console.log('Value:', val),",
    "  error:    (err) => console.log('Error:', err),",
    "  complete: ()    => console.log('Complete!')",
    '});',
    '',
    '// WAY 2: Just a next callback (short form)',
    'source$.subscribe(val => console.log(val));',
    '',
    '// WAY 3: Angular AsyncPipe (template-level Observer)',
    '// <p>{{ data$ | async }}</p>',
    '// Angular auto-subscribes AND auto-unsubscribes for you',
  ].join('\n');

  private reset() {
    this.nextLog = [];
    this.errorLog = [];
    this.completeLog = [];
    this.nextFired = this.errorFired = this.completeFired = false;
  }

  runSuccess() {
    this.reset();
    this.running = true;

    const stream$ = new Observable<string>((obs) => {
      setTimeout(() => obs.next('Apple'), 300);
      setTimeout(() => obs.next('Banana'), 700);
      setTimeout(() => obs.next('Cherry'), 1100);
      setTimeout(() => obs.complete(), 1500);
    });

    // Full Observer object with all 3 handlers
    const myObserver: Observer<string> = {
      next: (val) => {
        this.nextFired = true;
        this.nextLog.push(`"${val}"`);
      },
      error: (err) => {
        this.errorFired = true;
        this.errorLog.push(err.message);
        this.running = false;
      },
      complete: () => {
        this.completeFired = true;
        this.completeLog.push('Stream finished!');
        this.running = false;
      }
    };

    stream$.subscribe(myObserver);
  }

  runError() {
    this.reset();
    this.running = true;

    const stream$ = new Observable<string>((obs) => {
      setTimeout(() => obs.next('Value 1'), 300);
      setTimeout(() => obs.next('Value 2'), 700);
      // Error fires — complete() will NEVER be called after this
      setTimeout(() => obs.error(new Error('Connection lost!')), 1100);
    });

    stream$.subscribe({
      next: (val) => {
        this.nextFired = true;
        this.nextLog.push(`"${val}"`);
      },
      error: (err) => {
        // Stream ended by error — complete() won't fire
        this.errorFired = true;
        this.errorLog.push(err.message);
        this.running = false;
      },
      complete: () => {
        this.completeFired = true;
        this.completeLog.push('(never reached when error fires)');
      }
    });
  }
}
