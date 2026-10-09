/*
 * ══════════════════════════════════════════════════════════
 *  OBSERVABLE
 * ══════════════════════════════════════════════════════════
 *
 *  DEFINITION:
 *    An Observable is a stream of data that can emit
 *    ZERO, ONE, or MANY values over time — either synchronously
 *    or asynchronously — and eventually completes or errors.
 *
 *  REAL-LIFE ANALOGY:
 *    A YouTube channel subscription.
 *    • The channel (Observable) produces videos over time.
 *    • You (the Observer) subscribe to receive them.
 *    • You can unsubscribe any time to stop receiving.
 *
 *  KEY CHARACTERISTICS:
 *    1. LAZY — does nothing until someone subscribes.
 *    2. MULTIPLE VALUES — can emit many items over time.
 *    3. CANCELLABLE — unsubscribe() stops the stream.
 *    4. OPERATORS — pipe(map(), filter(), ...) to transform data.
 *
 *  3 POSSIBLE EVENTS:
 *    next(value)  → a new value arrived
 *    error(err)   → something went wrong, stream ends
 *    complete()   → stream is done, no more values
 * ══════════════════════════════════════════════════════════
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observable-concept.component.html',
  styleUrl: './observable-concept.component.css'
})
export class ObservableConceptComponent {
  events: { type: string; badge: string; msg: string }[] = [];
  running = false;

  // Code example stored as a string — safe to render via [innerText]
  codeExample = [
    "import { Observable } from 'rxjs';",
    '',
    '// 1. CREATE — define what the stream will emit',
    'const myStream$ = new Observable(observer => {',
    "  observer.next('First value');   // emit value 1",
    "  observer.next('Second value');  // emit value 2",
    "  observer.next('Third value');   // emit value 3",
    '  observer.complete();            // stream is done',
    '});',
    '',
    '// 2. SUBSCRIBE — start listening (stream starts NOW)',
    'myStream$.subscribe({',
    "  next:     value => console.log('Got:', value),",
    "  error:    err   => console.log('Error:', err),",
    "  complete: ()    => console.log('All done!')",
    '});',
  ].join('\n');

  runBasic() {
    this.events = [];
    this.running = true;

    // Lazy: nothing runs until subscribe() is called below
    const stream$ = new Observable<string>((observer) => {
      observer.next('First value');
      observer.next('Second value');
      observer.next('Third value');
      observer.complete();
    });

    stream$.subscribe({
      next: (val) => this.events.push({ type: 'next', badge: '📦', msg: `next → "${val}"` }),
      error: (err) => this.events.push({ type: 'error', badge: '❌', msg: `error → ${err}` }),
      complete: () => {
        this.events.push({ type: 'complete', badge: '✅', msg: 'complete → stream is done' });
        this.running = false;
      }
    });
  }

  runAsync() {
    this.events = [];
    this.running = true;

    const stream$ = new Observable<string>((observer) => {
      this.events.push({ type: 'info', badge: '🚀', msg: 'Stream started (subscribed!)' });
      setTimeout(() => observer.next('Value after 500ms'), 500);
      setTimeout(() => observer.next('Value after 1s'), 1000);
      setTimeout(() => observer.next('Value after 1.5s'), 1500);
      setTimeout(() => observer.complete(), 2000);
    });

    stream$.subscribe({
      next: (val) => this.events.push({ type: 'next', badge: '📦', msg: `next → "${val}"` }),
      complete: () => {
        this.events.push({ type: 'complete', badge: '✅', msg: 'complete → stream finished' });
        this.running = false;
      }
    });
  }

  runLazy() {
    this.events = [];

    // Observable defined — nothing runs yet
    const lazyStream$ = new Observable<string>((observer) => {
      this.events.push({ type: 'next', badge: '📦', msg: 'Observable STARTED (subscribe was called)' });
      observer.next('Hello!');
      observer.complete();
    });

    this.events.push({ type: 'info', badge: '📝', msg: 'Observable is defined — but NOT running yet' });
    this.events.push({ type: 'info', badge: '⏳', msg: 'Calling subscribe() now...' });

    // Only NOW does the Observable start executing
    lazyStream$.subscribe({
      next: (v) => this.events.push({ type: 'next', badge: '📦', msg: `Received: "${v}"` }),
      complete: () => this.events.push({ type: 'complete', badge: '✅', msg: 'Done!' })
    });
  }
}
