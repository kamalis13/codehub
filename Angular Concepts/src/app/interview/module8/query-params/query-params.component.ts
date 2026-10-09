import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-query-params',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query-params.component.html',
  styleUrl: './query-params.component.css'
})
export class QueryParamsComponent {
  syntaxCode = [
    '// 1. routerLink with queryParams',
    '// <a [routerLink]="[\'/products\']"',
    '//    [queryParams]="{ search: \'angular\', page: 2 }">Search</a>',
    '',
    '// 2. Navigate programmatically',
    "this.router.navigate(['/products'], {",
    "  queryParams: { search: 'angular', page: 2 },",
    "  queryParamsHandling: 'merge'  // preserve existing params",
    '});',
    '',
    '// 3. Read via observable (reactive)',
    'this.route.queryParamMap.subscribe(params => {',
    "  this.search = params.get('search') ?? '';",
    "  this.page = Number(params.get('page') ?? 1);",
    '});',
    '',
    '// 4. Snapshot read',
    "const search = this.route.snapshot.queryParamMap.get('search');"
  ].join('\n');

  exampleCode = [
    '// Product search page: /products?search=angular&category=books&page=2',
    '@Component({ ... })',
    'export class ProductListComponent implements OnInit {',
    '  products: Product[] = [];',
    "  searchTerm = '';",
    '  page = 1;',
    '',
    '  constructor(',
    '    private route: ActivatedRoute,',
    '    private router: Router,',
    '    private productService: ProductService',
    '  ) {}',
    '',
    '  ngOnInit(): void {',
    '    this.route.queryParamMap.pipe(',
    '      debounceTime(300)',
    '    ).subscribe(params => {',
    "      this.searchTerm = params.get('search') ?? '';",
    "      this.page = Number(params.get('page') ?? 1);",
    '      this.loadProducts();',
    '    });',
    '  }',
    '',
    '  search(term: string): void {',
    "    this.router.navigate(['/products'], {",
    '      queryParams: { search: term, page: 1 },',
    "      queryParamsHandling: 'merge'",
    '    });',
    '  }',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the difference between route params and query params?',
      a: 'Route params are part of the URL path (/products/:id) and required for route matching. Query params appear after ? (/products?search=angular) and are completely optional. Use route params for resource identity, query params for filtering and options.'
    },
    {
      q: "What does queryParamsHandling: 'merge' do?",
      a: "'merge' combines new query params with existing ones. 'preserve' keeps the current query params without adding new ones. The default (null) replaces all existing query params with the new set."
    },
    {
      q: 'What is queryParamMap vs queryParams?',
      a: 'queryParamMap exposes query params via a ParamMap interface with .get() and .getAll() methods (for multi-value params). queryParams gives a plain object. queryParamMap is preferred for its type safety and multi-value support.'
    },
    {
      q: 'How do you handle multi-value query params (e.g., ?tag=a&tag=b)?',
      a: "Use queryParamMap.getAll('tag') to get an array of all values for the same key. In routerLink, pass an array: [queryParams]=\"{ tag: ['a', 'b'] }\"."
    },
    {
      q: 'How can you make search/filter state bookmarkable?',
      a: "Sync filter state to the URL via query params on every filter change using router.navigate with queryParamsHandling: 'merge'. On component init, read params from ActivatedRoute.queryParamMap to restore the filter state."
    },
    {
      q: 'What does the fragment property do in navigation?',
      a: "The fragment sets the URL hash (#section). Use { fragment: 'about' } in router.navigate() to scroll to an anchor. Read via ActivatedRoute.fragment observable."
    }
  ];
}
