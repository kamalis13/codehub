import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-params',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-params.component.html',
  styleUrl: './route-params.component.css'
})
export class RouteParamsComponent {
  syntaxCode = [
    '// 1. Define route with parameter',
    "{ path: 'products/:id', component: ProductDetailComponent }",
    '',
    '// 2. Navigate with param',
    "// Template: <a [routerLink]=\"['/products', product.id]\">View</a>",
    "// Code: this.router.navigate(['/products', productId]);",
    '',
    '// 3. Read param — snapshot (static)',
    'export class ProductDetailComponent implements OnInit {',
    '  constructor(private route: ActivatedRoute) {}',
    '',
    '  ngOnInit(): void {',
    "    const id = this.route.snapshot.paramMap.get('id');",
    '  }',
    '}',
    '',
    '// 4. Read param — observable (reactive, reuse on same route)',
    'this.route.paramMap.subscribe(params => {',
    "  const id = params.get('id');",
    '  this.loadProduct(id);',
    '});'
  ].join('\n');

  exampleCode = [
    '// Product detail page — reactive approach',
    "@Component({ selector: 'app-product-detail', ... })",
    'export class ProductDetailComponent implements OnInit, OnDestroy {',
    '  product: Product | null = null;',
    '  private sub = Subscription.EMPTY;',
    '',
    '  constructor(',
    '    private route: ActivatedRoute,',
    '    private productService: ProductService',
    '  ) {}',
    '',
    '  ngOnInit(): void {',
    '    // React to param changes without re-creating the component',
    '    this.sub = this.route.paramMap.pipe(',
    "      map(params => params.get('id')!),",
    '      switchMap(id => this.productService.getProduct(id))',
    '    ).subscribe(product => this.product = product);',
    '  }',
    '',
    '  ngOnDestroy(): void { this.sub.unsubscribe(); }',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the difference between snapshot.params and params$ observable?',
      a: 'snapshot.params reads the current param value once, suitable for initial load. The params$ observable emits whenever the param changes — essential when navigating between different instances of the same component (e.g., next/prev product) without re-creating it.'
    },
    {
      q: 'What is paramMap vs params?',
      a: 'Both expose route parameters. params is a plain object (ActivatedRouteSnapshot.params). paramMap provides a typed Map-like interface with .get(), .getAll(), and .has() methods — safer and more robust, especially for optional parameters.'
    },
    {
      q: 'How do you navigate to a route with parameters programmatically?',
      a: "Use this.router.navigate(['/products', productId]) or this.router.navigateByUrl('/products/' + productId). The array form is preferred — it handles encoding and is more readable."
    },
    {
      q: 'Can a route have multiple parameters?',
      a: "Yes. Define them as { path: 'users/:userId/posts/:postId' }. Both userId and postId are accessible via paramMap.get('userId') and paramMap.get('postId')."
    },
    {
      q: 'What happens if a required route param is missing?',
      a: 'Angular will not match the route at all — the URL must contain all path segments. If you need optional params in the path, use query params instead.'
    },
    {
      q: 'What is the withComponentInputBinding() router feature?',
      a: 'A feature added in Angular 16 that maps route parameters, query parameters, and data directly to @Input() properties of the routed component, eliminating the need to inject ActivatedRoute for simple read scenarios.'
    }
  ];
}
