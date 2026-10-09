import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-binding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-binding.component.html',
  styleUrl: './event-binding.component.css',
})
export class EventBindingComponent {
  syntaxCode = [
    '<!-- Click event -->',
    '<button (click)="handleClick()">Click Me</button>',
    '',
    '<!-- Using $event object -->',
    '<input (keyup)="onKeyUp($event)" placeholder="Type...">',
    '<input (keyup.enter)="onEnter($event)">',
    '',
    '<!-- Form submit -->',
    '<form (submit)="onSubmit($event)">',
    '  <button type="submit">Submit</button>',
    '</form>',
    '',
    '<!-- Mouse events -->',
    '<div (mouseover)="onHover()" (mouseleave)="onLeave()">Hover me</div>',
    '',
    '<!-- Custom component event (@Output) -->',
    '<app-rating (ratingChanged)="onRatingChange($event)"></app-rating>',
    '',
    '<!-- Prevent default behavior -->',
    '<a href="#" (click)="navigate($event)">Go</a>',
  ].join('\n');

  exampleCode = [
    '// checkout.component.ts',
    'export class CheckoutComponent {',
    "  searchTerm = '';",
    "  orderStatus = '';",
    '',
    '  onSearch(event: Event): void {',
    '    const input = event.target as HTMLInputElement;',
    '    this.searchTerm = input.value;',
    '    this.fetchResults(this.searchTerm);',
    '  }',
    '',
    '  onSubmitOrder(event: SubmitEvent): void {',
    '    event.preventDefault();  // stop full-page reload',
    '    this.placeOrder();',
    '  }',
    '',
    '  onKeyUp(event: KeyboardEvent): void {',
    "    if (event.key === 'Escape') {",
    '      this.clearSearch();',
    '    }',
    '  }',
    '',
    '  navigate(event: MouseEvent): void {',
    '    event.preventDefault();',
    '    this.router.navigate(["/home"]);',
    '  }',
    '}',
    '',
    '<!-- checkout.component.html -->',
    '<input (keyup)="onSearch($event)" (keyup.escape)="clearSearch()" placeholder="Search products">',
    '<form (submit)="onSubmitOrder($event)">',
    '  <button type="submit">Place Order</button>',
    '</form>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is event binding in Angular?',
      a: 'Event binding listens to DOM events (click, keyup, submit, mouseover, etc.) and calls a component method when the event fires. The syntax is (eventName)="handlerExpression($event)". Angular wraps native addEventListener calls and cleans up when the component is destroyed, preventing memory leaks.',
    },
    {
      q: 'What is the $event object in event binding?',
      a: '$event is a special Angular template variable that holds the native DOM event object emitted by the event. For click it is a MouseEvent; for keyup it is a KeyboardEvent; for a custom @Output EventEmitter it is whatever value the emitter emits. You pass it to your handler method: (click)="handle($event)".',
    },
    {
      q: 'How do you prevent the default browser behaviour in Angular?',
      a: 'Access the native event via $event and call event.preventDefault() inside the handler method. For example: onSubmit(e: SubmitEvent) { e.preventDefault(); ... }. Angular templates also support the return false shorthand: (submit)="onSubmit(); false" — the false return value prevents default just like in vanilla JS.',
    },
    {
      q: 'What are key event filters like (keyup.enter) in Angular?',
      a: 'Angular supports pseudo-event filters for keyboard events: (keyup.enter)="submit()" fires only when Enter is released; (keyup.escape)="cancel()" fires on Escape. This avoids if-checks inside the handler. Angular supports common key names (enter, escape, tab, space, arrowup, arrowdown) and modifier combinations (shift.enter, ctrl.a).',
    },
    {
      q: 'How does Angular prevent memory leaks with event binding?',
      a: 'Angular automatically removes event listeners added via (event) syntax when the component is destroyed (via ngOnDestroy lifecycle). This is handled by Angular\'s renderer and differs from manual addEventListener calls, which require explicit removeEventListener cleanup. This is one advantage of using Angular template event binding over direct DOM manipulation.',
    },
    {
      q: 'What is the difference between (click) event binding on a regular element vs a child component?',
      a: 'On a regular DOM element, (click) binds to the native click DOM event. On a child component, (click) still binds to the native DOM event bubbled up from the child\'s host element — it does NOT bind to a custom output. For custom events use @Output EventEmitter in the child and (customEvent)="handler($event)" in the parent. Confusing these is a common mistake.',
    },
  ];
}
