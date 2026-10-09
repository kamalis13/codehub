/*
 * ══════════════════════════════════════════════════════════
 *  ASYNCHRONOUS
 * ══════════════════════════════════════════════════════════
 *
 *  DEFINITION:
 *    Asynchronous means "start it and move on — deal with the
 *    result later when it's ready".
 *    The program does NOT wait. It kicks off a task, continues
 *    with other work, and gets notified when the task finishes.
 *
 *  REAL-LIFE ANALOGY:
 *    Ordering food at a restaurant.
 *    You place your order and then sit and chat with friends.
 *    You don't stand at the kitchen door watching the chef cook.
 *    When the food is ready, the waiter BRINGS IT TO YOU.
 *    You were free to do other things in between.
 *
 *  IN CODE:
 *    JavaScript uses callbacks, Promises, and Observables to
 *    handle async work. The most common async tasks are:
 *      • HTTP/API calls  (waiting for server response)
 *      • Timers          (setTimeout / setInterval)
 *      • File reading    (reading a file from disk)
 *      • User events     (waiting for a button click)
 *
 *  KEY DIFFERENCE FROM SYNC:
 *    Sync  → Line 1 blocks until done, then Line 2.
 *    Async → Line 1 starts, then Line 2 runs immediately,
 *             Line 1's result arrives later.
 * ══════════════════════════════════════════════════════════
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asynchronous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asynchronous.component.html',
  styleUrl: './asynchronous.component.css'
})
export class AsynchronousComponent {
  log: { time: string; msg: string; highlight: boolean }[] = [];
  running = false;
  private start = 0;

  syncCode = [
    'console.log("A");   // 1st',
    'console.log("B");   // 2nd (waits)',
    'console.log("C");   // 3rd (waits)',
    '',
    '// Output: A → B → C (always)',
  ].join('\n');

  asyncCode = [
    'console.log("A");            // 1st',
    'setTimeout(callback, 2000);  // async — B is delayed',
    'console.log("C");            // 2nd — runs immediately!',
    '// callback fires: "B"       // 3rd — arrives 2s later',
    '',
    '// Output: A → C → B',
  ].join('\n');

  private ts() {
    return `+${Date.now() - this.start}ms`;
  }

  run() {
    this.log = [];
    this.running = true;
    this.start = Date.now();

    // ── A: Runs immediately (synchronous line)
    this.log.push({ time: this.ts(), msg: 'A — Synchronous: "Hello!" (runs right now)', highlight: false });

    // ── setTimeout is ASYNC: JavaScript registers it and moves on immediately
    setTimeout(() => {
      // This runs ~2000ms later, AFTER C has already printed
      this.log.push({ time: this.ts(), msg: 'B — setTimeout callback fires after 2s ⏰', highlight: true });
      this.running = false;
    }, 2000);

    // ── C: Runs BEFORE B even though B comes first in the code
    this.log.push({ time: this.ts(), msg: 'C — Synchronous: "World!" (runs before B!)', highlight: false });

    this.log.push({ time: this.ts(), msg: '... waiting 2 seconds for B ...', highlight: false });
  }
}
