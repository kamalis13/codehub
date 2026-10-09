import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-output-decorator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './output-decorator.component.html',
  styleUrl: './output-decorator.component.css',
})
export class OutputDecoratorComponent {
  syntaxCode = [
    "import { Component, Output, EventEmitter } from '@angular/core';",
    '',
    '// Basic @Output — emitting a simple string',
    '@Output() formSubmit = new EventEmitter<string>();',
    '',
    '// @Output with alias',
    "@Output('submitForm') formSubmit = new EventEmitter<string>();",
    '',
    '// Emitting a complex object',
    '@Output() userCreated = new EventEmitter<{ name: string; email: string }>();',
    '',
    '// Emitting without a payload (void)',
    '@Output() cancelled = new EventEmitter<void>();',
    '',
    '// Triggering the emit from a method',
    'onSubmit() {',
    "  this.formSubmit.emit(this.formValue);   // emit with payload",
    '  this.cancelled.emit();                  // emit void',
    '}',
    '',
    '// Parent template — listening to the event',
    '<app-signup-form',
    '  (formSubmit)="handleSubmit($event)"',
    '  (cancelled)="onCancel()">',
    '</app-signup-form>',
  ].join('\n');

  exampleCode = [
    '// signup-form.component.ts — child emits events to parent',
    "import { Component, Output, EventEmitter } from '@angular/core';",
    "import { FormsModule } from '@angular/forms';",
    '',
    "interface SignupData { name: string; email: string; }",
    '',
    "@Component({",
    "  selector: 'app-signup-form',",
    '  standalone: true,',
    '  imports: [FormsModule],',
    '  template: `',
    '    <form (ngSubmit)="onSubmit()">',
    '      <input [(ngModel)]="name" name="name" placeholder="Name">',
    '      <input [(ngModel)]="email" name="email" placeholder="Email">',
    '      <button type="submit">Register</button>',
    '      <button type="button" (click)="onCancel()">Cancel</button>',
    '    </form>',
    '  `',
    '})',
    'export class SignupFormComponent {',
    '  @Output() registered = new EventEmitter<SignupData>();',
    '  @Output() cancelled  = new EventEmitter<void>();',
    "  name = ''; email = '';",
    '',
    '  onSubmit() {',
    '    this.registered.emit({ name: this.name, email: this.email });',
    '  }',
    '  onCancel() { this.cancelled.emit(); }',
    '}',
    '',
    '// parent.component.ts',
    'export class ParentComponent {',
    '  onRegistered(data: SignupData) {',
    '    console.log(\'New user:\', data);',
    '  }',
    '  onCancel() { /* navigate away */ }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is @Output and why is it needed in Angular?',
      a: '@Output is a decorator that exposes an EventEmitter on a child component, allowing it to send data or notifications to its parent. A child component should never directly modify parent state — doing so would break unidirectional data flow. @Output is the sanctioned, explicit mechanism for child-to-parent communication, making data flow traceable and components decoupled.',
    },
    {
      q: 'What is the naming convention for @Output and how does it relate to two-way binding?',
      a: 'For a regular output, name it descriptively (e.g., userSelected, formSubmit). For two-way binding with the [(x)] banana-in-a-box syntax, the output MUST be named exactly as the input plus "Change" (e.g., @Input() value and @Output() valueChange). Angular desugars [(value)]="x" into [value]="x" (valueChange)="x=$event" automatically.',
    },
    {
      q: 'What is the generic type parameter in EventEmitter<T>?',
      a: 'The generic type T specifies the type of data the EventEmitter emits. EventEmitter<string> emits strings, EventEmitter<User> emits User objects, EventEmitter<void> emits no payload. Typing EventEmitters is important because the parent\'s event handler receives $event which TypeScript will type-check. Avoid using EventEmitter<any> as it loses type safety.',
    },
    {
      q: 'What is the difference between @Output and a shared service for event communication?',
      a: '@Output is for direct parent-child event propagation — the parent must be directly wrapping the child in its template. Shared services (with Subjects/BehaviorSubjects) work for any components regardless of their position in the tree. For local, well-scoped parent-child interaction prefer @Output for its simplicity and explicitness. Use services when events need to propagate across unrelated parts of the app.',
    },
    {
      q: 'Can multiple parents listen to the same @Output event?',
      a: 'An @Output event is consumed by the direct parent that embeds the component in its template. Only one parent template can bind to it. If multiple parts of the app need to react to the same event, use a shared service — inject it into the child, and when the action occurs, call a service method that notifies all subscribers via a Subject or BehaviorSubject.',
    },
    {
      q: 'What happens if you emit an @Output event but no parent is listening?',
      a: 'Nothing happens and there is no error. EventEmitter.emit() simply calls next() on the underlying Subject. If no parent template has bound (eventName)="handler()", there are no subscribers, and the emission is ignored. This is safe and is different from throwing — the component does not need to know whether anyone is listening.',
    },
  ];
}
