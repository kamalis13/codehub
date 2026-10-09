/*
 * ══════════════════════════════════════════════════════════
 *  PROMISE
 * ══════════════════════════════════════════════════════════
 *
 *  DEFINITION:
 *    A Promise is JavaScript's built-in way to handle a
 *    single asynchronous result.
 *    It represents a value that is NOT available yet, but
 *    WILL be available in the future — or it failed.
 *
 *    A Promise has exactly 3 states:
 *      🟡 PENDING   → the async work is still running
 *      ✅ FULFILLED → it succeeded and has a value
 *      ❌ REJECTED  → it failed with an error
 *
 *  REAL-LIFE ANALOGY:
 *    When you order a package online, you get a TRACKING NUMBER.
 *    That tracking number is the Promise — it's not the package,
 *    but it PROMISES the package will arrive.
 *    • While shipping   → PENDING
 *    • Delivered        → FULFILLED (you got the value)
 *    • Lost in transit  → REJECTED (error occurred)
 *
 *  KEY RULES:
 *    1. A Promise emits exactly ONE value (or one error), then it's done.
 *    2. Once settled (fulfilled or rejected), it CANNOT change state.
 *    3. Use .then() for success, .catch() for errors, .finally() for cleanup.
 *    4. You cannot cancel a Promise once it starts.
 *
 *  LIMITATION (vs Observable):
 *    A Promise can only deliver ONE result.
 *    You cannot use it for streams of data (e.g., live updates, multiple values).
 *    That is why we use Observables in Angular.
 * ══════════════════════════════════════════════════════════
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promise-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promise-concept.component.html',
  styleUrl: './promise-concept.component.css'
})
export class PromiseConceptComponent {
  state: 'idle' | 'pending' | 'fulfilled' | 'rejected' = 'idle';

  // Stored as a string so [innerText] can render it safely (braces won't confuse Angular's template compiler)
  codeExample = [
    '// Creating a Promise',
    'const myPromise = new Promise((resolve, reject) => {',
    '  const success = true;',
    '  if (success) {',
    '    resolve("Here is your data! ✅");  // fulfilled',
    '  } else {',
    '    reject("Something went wrong! ❌"); // rejected',
    '  }',
    '});',
    '',
    '// Consuming a Promise',
    'myPromise',
    '  .then(data  => console.log(data))   // runs on success',
    '  .catch(err  => console.log(err))    // runs on error',
    '  .finally(() => console.log("Done")) // always runs',
  ].join('\n');
  result = '';
  finallyRan = false;
  running = false;

  runSuccess() {
    this.reset();
    this.running = true;
    this.state = 'pending'; // Promise is now PENDING

    // Simulates an async API call that takes 1.5s and succeeds
    const apiCall = new Promise<string>((resolve) => {
      setTimeout(() => resolve('Data loaded successfully! 🎉'), 1500);
    });

    apiCall
      .then((data) => {
        this.state = 'fulfilled'; // Promise resolved with a value
        this.result = data;
      })
      .catch((err) => {
        this.state = 'rejected';
        this.result = err;
      })
      .finally(() => {
        // finally() always runs — perfect for hiding a loading spinner
        this.finallyRan = true;
        this.running = false;
      });
  }

  runFail() {
    this.reset();
    this.running = true;
    this.state = 'pending';

    // Simulates an API call that fails after 1.5s
    const apiCall = new Promise<string>((_, reject) => {
      setTimeout(() => reject('Server returned 500: Internal Error 💥'), 1500);
    });

    apiCall
      .then((data) => {
        this.state = 'fulfilled';
        this.result = data;
      })
      .catch((err) => {
        this.state = 'rejected'; // Promise rejected with an error
        this.result = err;
      })
      .finally(() => {
        this.finallyRan = true;
        this.running = false;
      });
  }

  private reset() {
    this.state = 'idle';
    this.result = '';
    this.finallyRan = false;
  }
}
