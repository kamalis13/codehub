import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pure-impure-pipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pure-impure-pipe.component.html',
  styleUrl: './pure-impure-pipe.component.css'
})
export class PureImpurePipeComponent {

  syntaxCode = [
    '// Pure pipe (default) — pure: true',
    '@Pipe({',
    "  name: 'filterActive',",
    '  pure: true,   // default, can be omitted',
    '  standalone: true',
    '})',
    'export class FilterActivePipe implements PipeTransform {',
    '  transform(items: Item[]): Item[] {',
    '    console.log(\'Pure pipe called\'); // only on new array reference',
    '    return items.filter(i => i.active);',
    '  }',
    '}',
    '',
    '// Impure pipe — pure: false',
    '@Pipe({',
    "  name: 'filterActiveImpure',",
    '  pure: false,  // runs every change detection cycle',
    '  standalone: true',
    '})',
    'export class FilterActiveImpurePipe implements PipeTransform {',
    '  transform(items: Item[]): Item[] {',
    '    console.log(\'Impure pipe called\'); // runs on EVERY CD cycle',
    '    return items.filter(i => i.active);',
    '  }',
    '}',
    '',
    '// Usage — same syntax in templates',
    "{{ items | filterActive | json }}",
    "{{ items | filterActiveImpure | json }}",
  ].join('\n');

  exampleCode = [
    '// When to use impure — filtering with mutable mutation',
    'export class TaskComponent {',
    '  tasks = [',
    "    { id: 1, title: 'Design', done: false },",
    "    { id: 2, title: 'Develop', done: true },",
    "    { id: 3, title: 'Test', done: false },",
    '  ];',
    '',
    '  addTask() {',
    '    // push() mutates the existing array — pure pipe WON\'T detect this!',
    "    this.tasks.push({ id: 4, title: 'Deploy', done: false });",
    '    // For pure pipe to work, you must reassign:',
    '    // this.tasks = [...this.tasks, newTask];',
    '  }',
    '',
    '  markDone(id: number) {',
    '    // Mutating a property — pure pipe WON\'T re-run',
    '    const task = this.tasks.find(t => t.id === id);',
    '    if (task) task.done = true;',
    '    // For pure pipe: this.tasks = [...this.tasks];  // new reference',
    '  }',
    '}',
    '',
    '// Template',
    '// Pure (efficient but misses mutations):',
    '<li *ngFor="let t of tasks | filterDone:false">{{ t.title }}</li>',
    '',
    '// Impure (always current but runs every CD cycle):',
    '<li *ngFor="let t of tasks | filterDoneImpure:false">{{ t.title }}</li>',
    '',
    '// Best practice — use pure pipe with immutable updates:',
    '// this.tasks = [...this.tasks, newTask];  // new reference triggers pure pipe',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the difference between a pure and an impure pipe?',
      a: 'A pure pipe (default) only re-executes when the input reference changes (new object/array reference, new primitive value). Angular caches the last result and reuses it when the reference is unchanged. An impure pipe (pure: false) re-executes on every change detection cycle regardless of whether the input changed — this is expensive but necessary when dealing with mutated objects/arrays.'
    },
    {
      q: 'Why does a pure pipe not detect changes inside a mutable array?',
      a: "Pure pipes use reference equality (===) to detect input changes. If you do tasks.push(newItem), the array reference stays the same, so Angular thinks nothing changed and the pure pipe does not re-run. To trigger a pure pipe, you must create a new reference: this.tasks = [...this.tasks, newItem]. This is why immutability is important when using pure pipes."
    },
    {
      q: 'What are the performance implications of impure pipes?',
      a: "Impure pipes run on every change detection cycle — which in Default strategy fires on every mouse move, keystroke, HTTP response, and timer. This can be called hundreds of times per second. Never put expensive operations (complex filtering, API calls, complex computation) in an impure pipe. Consider using memoization or moving the logic to a service instead."
    },
    {
      q: 'Why is the async pipe impure?',
      a: 'The async pipe is impure (pure: false) because it needs to check for new emissions from the Observable on every change detection cycle — the Observable may emit at any time, independent of input reference changes. If async pipe were pure, it would only check for new values when the Observable reference itself changes, missing intermediate emissions entirely.'
    },
    {
      q: 'How does Angular optimize pure pipe execution?',
      a: 'Angular memoizes the last result of a pure pipe call. When change detection runs, it compares the current input(s) to the previously seen input(s) using strict equality (===). If they are equal, the cached result is returned immediately without calling the transform() function. This makes pure pipes very efficient for stable data.'
    },
    {
      q: 'When would you intentionally create an impure pipe?',
      a: 'Use impure pipes when: (1) filtering/transforming a mutable data structure that is mutated directly (push, splice, property mutation) without creating new references, (2) the transformation depends on external state that changes independently (current time, global store), (3) you need the pipe to check the Observable state on every cycle (like async does). Always benchmark performance first.'
    },
    {
      q: 'What is the recommended alternative to using an impure pipe for filtering?',
      a: "The best alternative is to keep filtering in the component: this.filteredTasks = this.tasks.filter(t => !t.done); — update this property when tasks change. This runs once on your terms, not on every CD cycle. Another approach: use immutable updates (new array references) so a pure pipe detects the change reliably."
    },
  ];
}
