import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngswitch-dir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngswitch-dir.component.html',
  styleUrl: './ngswitch-dir.component.css'
})
export class NgswitchDirComponent {

  syntaxCode = [
    '// [ngSwitch] on container, *ngSwitchCase on children',
    '<div [ngSwitch]="expression">',
    '  <p *ngSwitchCase="\'value1\'">Matched value1</p>',
    '  <p *ngSwitchCase="\'value2\'">Matched value2</p>',
    '  <p *ngSwitchCase="\'value3\'">Matched value3</p>',
    '  <p *ngSwitchDefault>No match — default case</p>',
    '</div>',
    '',
    '// Can match numbers, strings, booleans',
    '<div [ngSwitch]="statusCode">',
    '  <p *ngSwitchCase="200">OK</p>',
    '  <p *ngSwitchCase="404">Not Found</p>',
    '  <p *ngSwitchCase="500">Server Error</p>',
    '  <p *ngSwitchDefault>Unknown status</p>',
    '</div>',
    '',
    '// Multiple cases sharing same template (use ng-container)',
    '<ng-container [ngSwitch]="role">',
    '  <app-admin-panel *ngSwitchCase="\'admin\'"></app-admin-panel>',
    '  <app-user-panel *ngSwitchCase="\'user\'"></app-user-panel>',
    '  <app-guest-panel *ngSwitchDefault></app-guest-panel>',
    '</ng-container>',
  ].join('\n');

  exampleCode = [
    '// order-status.component.ts',
    'export class OrderStatusComponent {',
    "  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' = 'pending';",
    '',
    '  statuses = [',
    "    'pending', 'processing', 'shipped', 'delivered', 'cancelled'",
    '  ];',
    '',
    '  setStatus(s: string) {',
    '    this.orderStatus = s as any;',
    '  }',
    '}',
    '',
    '// order-status.component.html',
    '<div class="status-buttons">',
    '  <button *ngFor="let s of statuses" (click)="setStatus(s)">{{ s }}</button>',
    '</div>',
    '',
    '<div class="status-display" [ngSwitch]="orderStatus">',
    '  <div *ngSwitchCase="\'pending\'" class="badge pending">',
    '    ⏳ Order Pending',
    '  </div>',
    '  <div *ngSwitchCase="\'processing\'" class="badge processing">',
    '    🔄 Processing Your Order',
    '  </div>',
    '  <div *ngSwitchCase="\'shipped\'" class="badge shipped">',
    '    🚚 Your Order is Shipped',
    '  </div>',
    '  <div *ngSwitchCase="\'delivered\'" class="badge delivered">',
    '    ✅ Delivered!',
    '  </div>',
    '  <div *ngSwitchDefault class="badge cancelled">',
    '    ❌ Order Cancelled',
    '  </div>',
    '</div>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is ngSwitch and what are its three parts?',
      a: 'ngSwitch has three parts: (1) [ngSwitch]="expression" — a property binding on the container element that holds the value to switch on; (2) *ngSwitchCase="value" — structural directive on each child, renders when expression === value; (3) *ngSwitchDefault — structural directive that renders when no case matches. Note: [ngSwitch] is a property binding, but *ngSwitchCase is a structural directive.'
    },
    {
      q: 'When should you use ngSwitch instead of multiple *ngIf directives?',
      a: 'Use ngSwitch when switching between 3+ mutually exclusive views based on a single value. ngSwitch is more readable and maintainable than chaining *ngIf="status===x" / *ngIf="status===y". ngSwitch also renders only ONE matched case, which is semantically clearer. For 2 conditions, *ngIf with else is often cleaner.'
    },
    {
      q: 'Can multiple *ngSwitchCase elements match and render simultaneously?',
      a: 'No. ngSwitch renders only the first matching case (or default if none match). If multiple *ngSwitchCase elements have the same value, only the first one in the DOM order is rendered. This is unlike a JavaScript switch without break statements — ngSwitch always has implicit breaks.'
    },
    {
      q: 'What types of values can [ngSwitch] compare against?',
      a: 'ngSwitch uses strict equality (===) internally. It can compare strings, numbers, booleans, and any primitive. It does NOT do deep object comparison — comparing object references requires custom logic. For enum values, compare the enum member: [ngSwitch]="status" *ngSwitchCase="Status.Active".'
    },
    {
      q: 'How does ngSwitch differ from a JavaScript switch statement?',
      a: 'JavaScript switch: runs code imperatively, supports fall-through, works with statements. Angular ngSwitch: renders DOM declaratively, no fall-through (each case is independent), works with templates. Angular ngSwitch is the template-level equivalent for conditionally rendering entire HTML blocks, not executing logic.'
    },
    {
      q: 'Can you use ng-container with ngSwitch?',
      a: 'Yes — ng-container is the preferred way. Using [ngSwitch] on ng-container avoids adding an extra DOM element: <ng-container [ngSwitch]="role"><app-admin *ngSwitchCase="\'admin\'">. This is important when the switch container should not appear in the rendered HTML (e.g., no extra div in a flex or grid layout).'
    },
    {
      q: 'What is *ngSwitchDefault and when does it render?',
      a: "*ngSwitchDefault renders when none of the *ngSwitchCase values match the [ngSwitch] expression. It's equivalent to the default branch in a JavaScript switch. It is optional — if omitted, nothing is rendered when no case matches. Best practice: always include *ngSwitchDefault as a fallback (error state, unknown status, etc.)."
    },
  ];
}
