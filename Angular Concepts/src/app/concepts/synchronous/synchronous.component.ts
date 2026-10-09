/*
 * ══════════════════════════════════════════════════════════
 *  SYNCHRONOUS
 * ══════════════════════════════════════════════════════════
 *
 *  DEFINITION:
 *    Synchronous means "one at a time, in order".
 *    Each task must FINISH before the next one can START.
 *    The program waits — no shortcuts, no skipping ahead.
 *
 *  REAL-LIFE ANALOGY:
 *    Imagine a single ATM machine with a queue.
 *    Person 1 must finish and walk away before
 *    Person 2 can step up. Nobody jumps the queue.
 *
 *  IN CODE:
 *    Line 1 runs → Line 2 runs → Line 3 runs.
 *    JavaScript reads your code top-to-bottom, one line at a time.
 *    Synchronous code is PREDICTABLE — you always know the order.
 *
 *  DOWNSIDE:
 *    If one task is slow (e.g., huge calculation), everything else
 *    is BLOCKED until it finishes. The page freezes.
 * ══════════════════════════════════════════════════════════
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-synchronous',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './synchronous.component.html',
  styleUrl: './synchronous.component.css'
})
export class SynchronousComponent {
  running = false;
  done = false;

  codeExample = [
    '// Each line runs immediately after the previous',
    'console.log("Step 1: Start");    // runs first',
    'console.log("Step 2: Middle");   // runs second',
    'console.log("Step 3: End");      // runs third',
    '',
    '// Output is ALWAYS in this exact order:',
    '// Step 1: Start',
    '// Step 2: Middle',
    '// Step 3: End',
  ].join('\n');

  steps = [
    { label: 'Task 1 — Add two numbers (1 + 2)', done: false, time: '' },
    { label: 'Task 2 — Greet the user ("Hello!")', done: false, time: '' },
    { label: 'Task 3 — Calculate 10 × 10', done: false, time: '' },
    { label: 'Task 4 — Write result to screen', done: false, time: '' },
  ];

  runSync() {
    // Reset state
    this.steps.forEach((s) => { s.done = false; s.time = ''; });
    this.done = false;
    this.running = true;

    const start = Date.now();

    // Synchronous: each line runs IMMEDIATELY after the previous
    // There is NO waiting — this all executes in one go (< 1ms)
    const result1 = 1 + 2;                           // Task 1
    this.steps[0].done = true;
    this.steps[0].time = `${Date.now() - start}ms`;

    const greeting = 'Hello!';                        // Task 2
    this.steps[1].done = true;
    this.steps[1].time = `${Date.now() - start}ms`;

    const result3 = 10 * 10;                          // Task 3
    this.steps[2].done = true;
    this.steps[2].time = `${Date.now() - start}ms`;

    const output = `${result1}, ${greeting}, ${result3}`;  // Task 4
    this.steps[3].done = true;
    this.steps[3].time = `${Date.now() - start}ms`;

    this.done = true;
    this.running = false;
    // Notice all timestamps are nearly 0ms — because sync is instant (no waiting)
  }
}
