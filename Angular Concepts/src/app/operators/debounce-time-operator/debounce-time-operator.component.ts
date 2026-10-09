// DEFINITION: `debounceTime(ms)` waits for a pause of N milliseconds after the last emission before passing the value through.
// SIMPLE ANALOGY: Like a search box that only fires when you stop typing — ignores all rapid keystrokes in between.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-debounce-time-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './debounce-time-operator.component.html',
  styleUrl: './debounce-time-operator.component.css',
})
export class DebounceTimeOperatorComponent implements OnInit {
  syntaxExample = `searchInput$.pipe(
  debounceTime(600)  // wait 600ms after last keystroke
).subscribe(term => searchApi(term));
// ignores rapid-fire keystrokes
// only fires after user PAUSES typing`;

  debouncedValue = '';
  rawCount = 0;

  keystrokes$ = new Subject<string>();

  ngOnInit() {
    this.keystrokes$.subscribe(() => this.rawCount++); // count every keystroke

    this.keystrokes$
      .pipe(
        // debounceTime waits 600ms after the LAST keystroke before emitting
        debounceTime(600)
      )
      .subscribe((val) => (this.debouncedValue = val));
  }
}
