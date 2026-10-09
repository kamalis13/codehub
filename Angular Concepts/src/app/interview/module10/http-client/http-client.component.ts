import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-client.component.html',
  styleUrl: './http-client.component.css'
})
export class HttpClientTopicComponent {

  syntaxCode = [
    '// app.config.ts — register HttpClient (modern Angular v15+)',
    'import { provideHttpClient, withInterceptors } from \'@angular/common/http\';',
    '',
    'export const appConfig: ApplicationConfig = {',
    '  providers: [',
    '    provideHttpClient(withInterceptors([authInterceptor]))',
    '  ]',
    '};',
    '',
    '// Inject HttpClient in a service',
    'import { HttpClient, HttpHeaders, HttpParams } from \'@angular/common/http\';',
    '',
    'export class MyService {',
    '  // Modern functional injection (Angular v14+)',
    '  private http = inject(HttpClient);',
    '  // OR constructor injection: constructor(private http: HttpClient) {}',
    '',
    '  // Typed GET — cold Observable, nothing sent until subscribe',
    '  getItem(id: number): Observable<Product> {',
    '    return this.http.get<Product>(`/api/products/${id}`);',
    '  }',
    '',
    '  // POST with custom auth header',
    '  create(data: CreateDto): Observable<Product> {',
    '    const headers = new HttpHeaders({ Authorization: `Bearer ${getToken()}` });',
    '    return this.http.post<Product>(\'/api/products\', data, { headers });',
    '  }',
    '',
    '  // PUT — full replacement',
    '  update(id: number, data: Product): Observable<Product> {',
    '    return this.http.put<Product>(`/api/products/${id}`, data);',
    '  }',
    '',
    '  // PATCH — partial update',
    '  patch(id: number, changes: Partial<Product>): Observable<Product> {',
    '    return this.http.patch<Product>(`/api/products/${id}`, changes);',
    '  }',
    '',
    '  // DELETE',
    '  remove(id: number): Observable<void> {',
    '    return this.http.delete<void>(`/api/products/${id}`);',
    '  }',
    '}'
  ].join('\n');

  exampleCode = [
    '// product.service.ts',
    'export interface Product { id: number; name: string; price: number; }',
    '',
    '@Injectable({ providedIn: \'root\' })',
    'export class ProductService {',
    '  private http = inject(HttpClient);',
    '  private baseUrl = \'/api/products\';',
    '',
    '  getAll(): Observable<Product[]> {',
    '    return this.http.get<Product[]>(this.baseUrl);',
    '  }',
    '',
    '  create(product: Omit<Product, \'id\'>): Observable<Product> {',
    '    const headers = new HttpHeaders({ Authorization: \'Bearer \' + getToken() });',
    '    return this.http.post<Product>(this.baseUrl, product, { headers });',
    '  }',
    '}',
    '',
    '// product-list.component.ts',
    '@Component({ standalone: true, imports: [CommonModule] })',
    'export class ProductListComponent {',
    '  private svc = inject(ProductService);',
    '  private destroyRef = inject(DestroyRef);',
    '',
    '  // Option 1: async pipe — no manual subscribe, auto-cleanup on destroy',
    '  products$ = this.svc.getAll().pipe(catchError(() => of([])));',
    '',
    '  // Option 2: manual subscribe with takeUntilDestroyed',
    '  products: Product[] = [];',
    '  ngOnInit() {',
    '    this.svc.getAll()',
    '      .pipe(takeUntilDestroyed(this.destroyRef))',
    '      .subscribe(data => (this.products = data));',
    '  }',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is HttpClient and how do you provide it in a modern Angular app?',
      a: 'HttpClient is Angular\'s built-in service for HTTP communication from @angular/common/http. In modern Angular (v15+) you provide it by calling provideHttpClient() inside the providers array of appConfig in app.config.ts, replacing the older HttpClientModule approach.'
    },
    {
      q: 'Why does HttpClient return Observables instead of Promises?',
      a: 'HttpClient returns cold Observables because they are lazy — the HTTP request is NOT sent until something subscribes. This allows cancellation via unsubscribe, operator composition (map, catchError, retry), and seamless integration with the async pipe.'
    },
    {
      q: 'How do you type the response of an HttpClient call?',
      a: 'You use TypeScript generics: http.get<Product[]>(\'/api/products\'). Angular deserialises the JSON response and TypeScript treats it as Product[]. Note this is a compile-time cast — Angular does not validate the shape at runtime, so a mismatched server response will not throw but may cause subtle bugs.'
    },
    {
      q: 'How do interceptors integrate with HttpClient?',
      a: 'Interceptors are registered via provideHttpClient(withInterceptors([myInterceptorFn])). They form a middleware pipeline — each request passes through all interceptors in order before reaching the backend, and each response passes back in reverse. They are commonly used for auth headers, logging, and caching.'
    },
    {
      q: 'What is the difference between HttpClientModule and provideHttpClient()?',
      a: 'HttpClientModule is the legacy NgModule-based approach imported in AppModule. provideHttpClient() is the modern functional API used in standalone Angular apps via app.config.ts. Both provide the same HttpClient service but provideHttpClient() supports tree-shakable functional interceptors and is recommended for Angular v17+.'
    },
    {
      q: 'How does the async pipe help with HttpClient subscriptions?',
      a: 'The async pipe subscribes to an Observable when the component renders and automatically unsubscribes when the component is destroyed, preventing memory leaks. You assign the Observable to a property (products$ = this.svc.getAll()) and bind it in the template with *ngIf="products$ | async as products", completely avoiding manual subscribe and unsubscribe.'
    }
  ];
}
