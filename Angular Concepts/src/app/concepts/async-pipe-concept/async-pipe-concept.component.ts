import { Component, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable, interval, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-async-pipe-concept',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './async-pipe-concept.component.html',
  styleUrl: './async-pipe-concept.component.css',
})
export class AsyncPipeConceptComponent implements OnDestroy {
  withoutPipeCode = [
    "// Without async pipe — manual subscription (risk: memory leak)",
    "export class MyComponent implements OnInit, OnDestroy {",
    "  data: string = '';",
    "  private sub: Subscription;",
    "",
    "  ngOnInit() {",
    "    this.sub = this.dataService.getData().subscribe(",
    "      val => this.data = val",
    "    );",
    "  }",
    "  ngOnDestroy() { this.sub.unsubscribe(); } // must remember!",
    "}",
  ].join('\n');

  withPipeCode = [
    "// With async pipe — zero boilerplate, auto-unsubscribes",
    "export class MyComponent {",
    "  data$ = this.dataService.getData(); // just expose the Observable",
    "}",
    "",
    "// In template:",
    "// <p>{{ data$ | async }}</p>",
    "// Angular subscribes AND unsubscribes automatically",
  ].join('\n');

  // A live counter Observable — async pipe subscribes in template
  counter$: Observable<number> = interval(1000).pipe(
    map(n => n + 1),
    take(20)
  );

  greeting$: Observable<string> = of('Hello, RxJS!');

  // Manual subscription demo
  manualValue = 0;
  private manualSub: Subscription | null = null;

  startManual() {
    if (this.manualSub) this.manualSub.unsubscribe();
    this.manualValue = 0;
    this.manualSub = interval(1000).pipe(map(n => n + 1), take(10))
      .subscribe(n => this.manualValue = n);
  }

  ngOnDestroy() {
    if (this.manualSub) this.manualSub.unsubscribe();
  }
}
