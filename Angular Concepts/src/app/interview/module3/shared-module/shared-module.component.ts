import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-module.component.html',
  styleUrl: './shared-module.component.css',
})
export class SharedModuleComponent {
  syntaxCode = [
    '// shared/shared.module.ts',
    "import { NgModule } from '@angular/core';",
    "import { CommonModule } from '@angular/common';",
    "import { ButtonComponent } from './button/button.component';",
    "import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';",
    "import { CurrencyFormatPipe } from './pipes/currency-format.pipe';",
    "import { HighlightDirective } from './directives/highlight.directive';",
    '',
    '@NgModule({',
    '  declarations: [',
    '    ButtonComponent,',
    '    LoadingSpinnerComponent,',
    '    CurrencyFormatPipe,',
    '    HighlightDirective',
    '  ],',
    '  imports: [CommonModule],',
    '  exports: [',
    '    CommonModule,          // re-export so importers get ngIf/ngFor too',
    '    ButtonComponent,',
    '    LoadingSpinnerComponent,',
    '    CurrencyFormatPipe,',
    '    HighlightDirective',
    '  ]',
    '})',
    'export class SharedModule { }',
  ].join('\n');

  exampleCode = [
    '// shared/button/button.component.ts',
    '@Component({',
    "  selector: 'app-button',",
    "  template: '<button [class]=\"variant\" [disabled]=\"disabled\"><ng-content></ng-content></button>'",
    '})',
    'export class ButtonComponent {',
    "  @Input() variant: 'primary' | 'secondary' = 'primary';",
    '  @Input() disabled = false;',
    '}',
    '',
    '// products/products.module.ts — consumes SharedModule',
    '@NgModule({',
    '  declarations: [ProductListComponent],',
    '  imports: [SharedModule]   // gets Button, Spinner, CurrencyFormat, CommonModule',
    '})',
    'export class ProductsModule { }',
    '',
    '// product-list.component.html',
    '<app-loading-spinner *ngIf="loading"></app-loading-spinner>',
    '<p>{{ price | currencyFormat }}</p>',
    '<app-button variant="primary">Add to Cart</app-button>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is a Shared Module and what goes in it?',
      a: 'A Shared Module is an NgModule that collects reusable UI components, pipes, and directives used in multiple feature modules. Typical contents include generic buttons, loading spinners, date/currency pipes, and utility directives. It also usually re-exports CommonModule so importers automatically get ngIf and ngFor.',
    },
    {
      q: 'Should you provide services in a SharedModule?',
      a: 'No. Services provided in SharedModule would create a new instance for each module that imports SharedModule, breaking the singleton pattern. Singleton services belong in CoreModule (with forRoot guard) or should use providedIn: "root" in their @Injectable decorator, which guarantees a single instance regardless of how many modules import the file.',
    },
    {
      q: 'What is the difference between declarations and exports in @NgModule?',
      a: 'declarations registers components/directives/pipes so they are available within the module. exports makes them publicly accessible to other modules that import this module. A component must be declared first and then exported to be usable outside the module. You can also export modules (e.g., CommonModule) to re-export their contents.',
    },
    {
      q: 'Why should SharedModule re-export CommonModule?',
      a: 'Re-exporting CommonModule means any feature module that imports SharedModule automatically gets access to ngIf, ngFor, ngClass, and other directives from CommonModule without a separate import. This reduces boilerplate across feature modules. However, avoid re-exporting heavy modules like ReactiveFormsModule if not every importer needs it.',
    },
    {
      q: 'Can a standalone component replace SharedModule?',
      a: 'Yes. In the standalone architecture (Angular 14+), each component declares its own imports. Reusable components, pipes, and directives are made standalone and imported directly where needed. This achieves the same DRY goal without a SharedModule class, and enables better tree-shaking because unused exports are not bundled.',
    },
    {
      q: 'What is the DRY principle in the context of SharedModule?',
      a: 'DRY stands for "Do not Repeat Yourself." Without SharedModule, each feature module would need to declare the same ButtonComponent or pipe, which is forbidden (a component can only be declared in one module). SharedModule solves this by declaring shared pieces once and exporting them for consumption across all feature modules.',
    },
  ];
}
