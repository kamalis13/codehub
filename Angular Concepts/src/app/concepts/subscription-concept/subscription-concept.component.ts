/*
 * ══════════════════════════════════════════════════════════
 *  SUBSCRIPTION
 * ══════════════════════════════════════════════════════════
 *
 *  DEFINITION:
 *    A Subscription is the object returned when you call
 *    subscribe() on an Observable. It represents the
 *    "live connection" between the Observable and the Observer.
 *
 *    Most importantly, calling subscription.unsubscribe()
 *    CANCELS the stream and frees all resources.
 *
 *  REAL-LIFE ANALOGY:
 *    Like a Netflix subscription.
 *    • Subscribing   → you start receiving content
 *    • Unsubscribing → you cancel and content stops arriving
 *    • If you don't cancel, you keep paying (memory leaks in code!)
 *
 *  KEY RULES:
 *    1. subscribe() returns a Subscription object.
 *    2. Always unsubscribe() when you're done — especially in Angular
 *       components — to prevent memory leaks.
 *    3. You can add multiple subscriptions together and unsubscribe all at once.
 *    4. subscription.closed tells you if it's already unsubscribed.
 *
 *  IN ANGULAR:
 *    Best practice: unsubscribe in ngOnDestroy().
 *    Or better: use the async pipe (it auto-unsubscribes).
 * ══════════════════════════════════════════════════════════
 */

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-concept.component.html',
  styleUrl: './subscription-concept.component.css'
})
export class SubscriptionConceptComponent implements OnDestroy {
  log: string[] = [];
  isSubscribed = false;
  tickCount = 0;
  sub!: Subscription;

  // Code syntax stored as a string — rendered safely via [innerText] in the template
  leakExample = [
    '// ❌ BAD — never unsubscribes, timer runs forever after component is gone',
    'ngOnInit() {',
    '  interval(1000).subscribe(n => this.count = n);',
    '}',
  ].join('\n');

  fixExample = [
    '// ✅ GOOD — unsubscribe in ngOnDestroy',
    'private sub!: Subscription;',
    'ngOnInit() {',
    '  this.sub = interval(1000).subscribe(n => this.count = n);',
    '}',
    'ngOnDestroy() { this.sub.unsubscribe(); }',
    '',
    '// ✅ BEST — async pipe auto-unsubscribes in the template',
    '// <p>{{ count$ | async }}</p>',
  ].join('\n');

  syntaxExample = [
    '// 1. subscribe() returns a Subscription object',
    'const subscription = observable$.subscribe({',
    '  next:     val => console.log(val),',
    '  error:    err => console.log(err),',
    '  complete: ()  => console.log("Done")',
    '});',
    '',
    '// 2. Check if still active',
    'console.log(subscription.closed); // false = still running',
    '',
    '// 3. STOP the stream (cancel + free resources)',
    'subscription.unsubscribe();',
    'console.log(subscription.closed); // true = stopped',
    '',
    '// 4. Group multiple subscriptions',
    'const group = new Subscription();',
    'group.add(sub1);',
    'group.add(sub2);',
    'group.unsubscribe(); // cancels both at once',
  ].join('\n');

  subscribe() {
    this.log = [];
    this.tickCount = 0;
    this.isSubscribed = true;
    this.log.push('✅ subscribe() called — stream is now ACTIVE');

    // interval emits every 800ms — runs forever until unsubscribed
    this.sub = interval(800).subscribe((n) => {
      this.tickCount = n + 1;
      this.log.push(`📦 Received tick #${n + 1}  |  closed: ${this.sub?.closed}`);
    });

    this.log.push(`🔍 subscription.closed = ${this.sub.closed}`); // false = active
  }

  unsubscribe() {
    if (this.sub) {
      // unsubscribe() stops the stream and frees resources
      this.sub.unsubscribe();
      this.isSubscribed = false;
      this.log.push('⛔ unsubscribe() called — stream is now STOPPED');
      this.log.push(`🔍 subscription.closed = ${this.sub.closed}`); // true = closed
    }
  }

  // Always unsubscribe when the component is destroyed to prevent memory leaks
  ngOnDestroy() {
    if (this.sub && !this.sub.closed) this.sub.unsubscribe();
  }
}
