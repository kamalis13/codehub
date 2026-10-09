import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng-do-check',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-do-check.component.html',
  styleUrl: './ng-do-check.component.css',
})
export class NgDoCheckComponent {
  syntaxCode = [
    'import {',
    '  Component, DoCheck, Input,',
    '  KeyValueDiffer, KeyValueDiffers',
    '} from "@angular/core";',
    '',
    '@Component({',
    '  selector: "app-user-card",',
    '  templateUrl: "./user-card.component.html",',
    '})',
    'export class UserCardComponent implements DoCheck {',
    '  @Input() user!: User; // Mutable object reference',
    '',
    '  private differ: KeyValueDiffer<string, any>;',
    '',
    '  constructor(private differs: KeyValueDiffers) {',
    '    this.differ = this.differs.find({}).create();',
    '  }',
    '',
    '  ngDoCheck() {',
    '    // Called on EVERY change detection cycle — very frequently!',
    '    const changes = this.differ.diff(this.user);',
    '    if (changes) {',
    '      changes.forEachChangedItem(item => {',
    '        console.log("Changed:", item.key, item.previousValue, "->", item.currentValue);',
    '      });',
    '    }',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// Real-world: Shopping Cart — detect item quantity mutations',
    '',
    '@Component({',
    '  selector: "app-cart",',
    '  templateUrl: "./cart.component.html",',
    '})',
    'export class CartComponent implements DoCheck {',
    '  @Input() items: CartItem[] = [];',
    '',
    '  private iterDiffer: IterableDiffer<CartItem>;',
    '  totalPrice = 0;',
    '',
    '  constructor(private differs: IterableDiffers) {',
    '    this.iterDiffer = this.differs.find([]).create();',
    '  }',
    '',
    '  ngDoCheck() {',
    '    // IterableDiffer detects changes inside arrays',
    '    const changes = this.iterDiffer.diff(this.items);',
    '    if (changes) {',
    '      // Recalculate total when items array mutates',
    '      this.totalPrice = this.items.reduce(',
    '        (sum, item) => sum + item.price * item.quantity, 0',
    '      );',
    '    }',
    '  }',
    '}',
    '',
    '// ⚠️ WARNING: ngDoCheck runs extremely frequently.',
    '// Keep logic fast — avoid HTTP calls or heavy computations here.',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is ngDoCheck and when does it fire?',
      a: 'ngDoCheck is an Angular lifecycle hook that fires during every change detection cycle — after ngOnChanges and ngOnInit on the first pass, and then on every subsequent CD cycle triggered by events, timers, HTTP responses, or manual calls to ChangeDetectorRef.detectChanges(). It is Angular\'s escape hatch for implementing custom change detection logic beyond what the default mechanism provides.',
    },
    {
      q: 'When would you use ngDoCheck instead of ngOnChanges?',
      a: 'Use ngDoCheck when you need to detect mutations INSIDE objects or arrays — things that ngOnChanges cannot see because it only performs reference equality checks. For example, if a parent passes an array and pushes items into it without changing the reference, ngOnChanges never fires. ngDoCheck runs every cycle, so you can use KeyValueDiffer or IterableDiffer to detect deep mutations. However, ngDoCheck carries a performance cost — use it only when necessary.',
    },
    {
      q: 'What are KeyValueDiffers and IterableDiffers?',
      a: 'KeyValueDiffers and IterableDiffers are Angular services that track changes inside objects and arrays respectively. KeyValueDiffer.diff(obj) returns a KeyValueChanges object describing added, removed, and changed keys. IterableDiffer.diff(array) returns an IterableChanges object describing added, moved, and removed items. Both are injected via the constructor and used in ngDoCheck to efficiently detect internal mutations without manually comparing every property.',
    },
    {
      q: 'What are the performance implications of ngDoCheck?',
      a: 'ngDoCheck fires on every change detection cycle — which in a typical Angular app with Zone.js happens on every click, keypress, setTimeout, HTTP response, or Promise resolution. This means it can fire dozens or hundreds of times per second. Any heavy computation in ngDoCheck will cause noticeable UI lag. Best practice: use Differs for efficient O(n) comparison; avoid HTTP calls, complex calculations, or DOM manipulation in ngDoCheck. Consider ChangeDetectionStrategy.OnPush to reduce CD frequency.',
    },
    {
      q: 'Can ngDoCheck and ngOnChanges coexist on the same component?',
      a: 'Yes, but they serve different purposes. ngOnChanges fires only when @Input() references change (new object/array reference). ngDoCheck fires on every CD cycle and can detect mutations within the same reference. If you implement both, ngOnChanges fires first (when applicable), then ngDoCheck. However, implementing both on the same component is uncommon — typically you choose one pattern. If using ngDoCheck for deep comparison, ngOnChanges may be redundant.',
    },
    {
      q: 'Does ngDoCheck work with ChangeDetectionStrategy.OnPush?',
      a: 'Yes, ngDoCheck still fires with OnPush strategy, but much less frequently — only when an @Input() reference changes, an event is triggered inside the component, an Observable with async pipe emits, or ChangeDetectorRef.markForCheck() is called. With OnPush + ngDoCheck, you get the performance benefit of reduced CD cycles while still having custom change detection when a cycle does run. This combination is used by Angular\'s built-in NgFor directive (which uses IterableDiffer internally).',
    },
  ];
}
