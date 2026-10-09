// DEFINITION: `Subject` is both an Observable (you can subscribe) AND an Observer (you can push values into it manually).
// SIMPLE ANALOGY: Like a radio station — it broadcasts to anyone tuned in, and you can broadcast whenever you want.

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject-operator.component.html',
  styleUrl: './subject-operator.component.css',
})
export class SubjectOperatorComponent implements OnDestroy {
  syntaxExample = `const event$ = new Subject();
event$.subscribe(val => console.log('Sub1:', val));
event$.subscribe(val => console.log('Sub2:', val));
event$.next('Hello');  // both subscribers receive 'Hello'
event$.complete();`;

  log1: string[] = [];
  log2: string[] = [];
  counter = 0;

  // Subject: no initial value, only emits values pushed AFTER subscription
  subject$ = new Subject<number>();

  private sub1: Subscription;
  private sub2: Subscription;

  constructor() {
    // Two separate subscribers listening to the same Subject
    this.sub1 = this.subject$.subscribe((val) => this.log1.push(`Sub1 got: ${val}`));
    this.sub2 = this.subject$.subscribe((val) => this.log2.push(`Sub2 got: ${val}`));
  }

  push() {
    // next() pushes a new value into the Subject — all subscribers receive it
    this.subject$.next(++this.counter);
  }

  complete() {
    // complete() signals the stream is done — no more values will be emitted
    this.subject$.complete();
    this.log1.push('✅ Completed');
    this.log2.push('✅ Completed');
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
