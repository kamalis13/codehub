import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-built-in-pipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './built-in-pipes.component.html',
  styleUrl: './built-in-pipes.component.css'
})
export class BuiltInPipesComponent {

  syntaxCode = [
    '// date pipe',
    "{{ today | date }}                    // Oct 7, 2026",
    "{{ today | date:'yyyy-MM-dd' }}       // 2026-10-07",
    "{{ today | date:'fullDate' }}         // Wednesday, October 7, 2026",
    '',
    '// currency pipe',
    "{{ 4500 | currency }}                 // $4,500.00",
    "{{ 4500 | currency:'EUR':'symbol' }}  // €4,500.00",
    "{{ 4500 | currency:'INR':'symbol':'1.0-0' }} // ₹4,500",
    '',
    '// number (DecimalPipe)',
    "{{ 3.14159 | number:'1.2-2' }}        // 3.14",
    "{{ 1000000 | number }}                // 1,000,000",
    '',
    '// percent pipe',
    "{{ 0.85 | percent }}                  // 85%",
    "{{ 0.85 | percent:'1.1-1' }}          // 85.0%",
    '',
    '// string case pipes',
    "{{ 'hello world' | uppercase }}       // HELLO WORLD",
    "{{ 'HELLO WORLD' | lowercase }}       // hello world",
    "{{ 'the quick fox' | titlecase }}     // The Quick Fox",
    '',
    '// slice pipe',
    "{{ [1,2,3,4,5] | slice:1:3 }}        // [2, 3]",
    "{{ 'Hello World' | slice:0:5 }}      // Hello",
    '',
    '// json pipe (debugging)',
    "{{ user | json }}",
    '',
    '// keyvalue pipe (iterate objects)',
    "<div *ngFor=\"let kv of obj | keyvalue\">",
    "  {{ kv.key }}: {{ kv.value }}",
    "</div>",
    '',
    '// async pipe',
    "{{ observable$ | async }}",
    '',
    '// Chaining pipes',
    "{{ 'hello' | uppercase | slice:0:3 }} // HEL",
  ].join('\n');

  exampleCode = [
    '// product-list.component.ts',
    'export class ProductListComponent {',
    '  today = new Date();',
    '  price = 1299.99;',
    '  discount = 0.15;',
    "  productName = 'wireless gaming headset pro';",
    '  tags = [\'electronics\', \'gaming\', \'audio\'];',
    '  metadata = { brand: \'SoundMax\', model: \'X500\', year: 2026 };',
    '  products$ = this.productService.getProducts();',
    '  constructor(private productService: ProductService) {}',
    '}',
    '',
    '// product-list.component.html',
    '<h1>{{ productName | titlecase }}</h1>',
    '<p>Price: {{ price | currency:\'USD\':\'symbol\':\'1.2-2\' }}</p>',
    '<p>Discount: {{ discount | percent:\'1.0-0\' }}</p>',
    '<p>Sale Price: {{ price * (1 - discount) | currency }}</p>',
    '<p>Last Updated: {{ today | date:\'medium\' }}</p>',
    '',
    '<h3>Tags:</h3>',
    '<span *ngFor="let tag of tags | slice:0:2">{{ tag | uppercase }} | </span>',
    '',
    '<h3>Metadata:</h3>',
    '<div *ngFor="let kv of metadata | keyvalue">',
    '  <strong>{{ kv.key | titlecase }}:</strong> {{ kv.value }}',
    '</div>',
    '',
    '<div *ngIf="products$ | async as products">',
    '  <div *ngFor="let p of products">{{ p.name }}</div>',
    '</div>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What are Angular built-in pipes and name all of them?',
      a: 'Angular built-in pipes: date (format dates), currency (format money), number/DecimalPipe (format numbers), percent (format percentages), uppercase, lowercase, titlecase (string case), slice (slice arrays/strings), json (JSON.stringify for debugging), keyvalue (iterate object entries), async (subscribe to Observable/Promise). Chaining: {{ value | pipe1 | pipe2 }}.'
    },
    {
      q: 'How does the date pipe work and what are common format strings?',
      a: "The date pipe formats a Date object or timestamp using Angular's DatePipe. Common formats: 'short' (10/7/26, 3:45 PM), 'medium' (Oct 7, 2026, 3:45:00 PM), 'long', 'fullDate', 'yyyy-MM-dd', 'dd/MM/yyyy HH:mm'. Format: {{ date | date:'formatString':'timezone':'locale' }}. Uses the LOCALE_ID token for localization."
    },
    {
      q: 'How does the currency pipe work?',
      a: "{{ amount | currency:'currencyCode':'display':'digitsInfo':'locale' }}. currencyCode: 'USD', 'EUR', 'INR'. display: 'code' (USD), 'symbol' ($), 'symbol-narrow', or custom string. digitsInfo: '1.2-2' means min 1 integer digit, min 2 decimal, max 2 decimal. Default: '$ 1,234.00'."
    },
    {
      q: 'What is the keyvalue pipe and when do you use it?',
      a: 'The keyvalue pipe transforms an Object or Map into an array of {key, value} pairs, making it iterable with *ngFor. Usage: *ngFor="let kv of myObject | keyvalue". By default it sorts by key alphabetically. You can pass a custom comparator function as an argument to change the sort order.'
    },
    {
      q: 'How do you chain multiple pipes?',
      a: "Pipes are chained with the | character and evaluated left-to-right: {{ value | pipe1:arg | pipe2 | pipe3 }}. Each pipe receives the output of the previous one as its input. Example: {{ 'hello world' | titlecase | slice:0:5 }} = 'Hello'. Keep chains short — long chains reduce readability."
    },
    {
      q: 'What is the json pipe used for and why is it useful in development?',
      a: "The json pipe calls JSON.stringify() on any value and displays the result in the template: {{ user | json }}. It is primarily a debugging tool — you can inspect object structure directly in the UI without console.log. In production, remove json pipe usages from templates as they can expose internal data structures."
    },
    {
      q: 'What is the slice pipe and how does it work for both arrays and strings?',
      a: "The slice pipe works like JavaScript's .slice() method. For arrays: {{ [1,2,3,4,5] | slice:1:4 }} returns [2,3,4]. For strings: {{ 'Hello World' | slice:0:5 }} returns 'Hello'. Negative indices count from the end: slice:-2 returns last 2 elements. Commonly used for client-side pagination."
    },
  ];
}
