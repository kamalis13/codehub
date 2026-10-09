// DEFINITION: `forkJoin()` runs multiple Observables in parallel and emits ONCE when ALL of them complete, with their last values.
// SIMPLE ANALOGY: Like waiting for ALL members of a group to arrive before starting the meeting.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-forkjoin-operator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forkjoin-operator.component.html',
  styleUrl: './forkjoin-operator.component.css',
})
export class ForkjoinOperatorComponent {
  syntaxExample = `forkJoin({
  user:   fetchUser(1),
  posts:  fetchPosts(1),
  config: fetchConfig()
}).subscribe(({ user, posts, config }) => {
  // fires ONCE when ALL complete
});`;

  results: string[] = [];
  loading = false;

  run() {
    this.results = [];
    this.loading = true;

    // Simulate 3 parallel API calls with different response times
    const user$ = of({ name: 'Alice' }).pipe(delay(1000));
    const posts$ = of({ count: 42 }).pipe(delay(1500));
    const settings$ = of({ theme: 'dark' }).pipe(delay(800));

    // forkJoin runs all 3 at once and waits until ALL finish
    forkJoin({ user: user$, posts: posts$, settings: settings$ })
      .subscribe((data) => {
        this.loading = false;
        this.results.push(`User: ${data.user.name}`);
        this.results.push(`Posts: ${data.posts.count}`);
        this.results.push(`Theme: ${data.settings.theme}`);
        this.results.push('✅ All API calls completed!');
      });
  }
}
