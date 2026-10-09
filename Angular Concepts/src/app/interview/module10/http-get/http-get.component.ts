import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-get',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-get.component.html',
  styleUrl: './http-get.component.css'
})
export class HttpGetComponent {

  syntaxCode = [
    '// Basic typed GET requests',
    'http.get<Product>(\'/api/products/1\')      // Observable<Product>',
    'http.get<Product[]>(\'/api/products\')       // Observable<Product[]>',
    '',
    '// Query parameters with HttpParams (immutable builder)',
    'const params = new HttpParams()',
    '  .set(\'page\', \'1\')',
    '  .set(\'limit\', \'20\')',
    '  .append(\'tag\', \'angular\');',
    '',
    'http.get<Product[]>(\'/api/products\', { params });',
    '',
    '// observe: \'body\' (default) — emits just the response body',
    'http.get<Product[]>(url, { observe: \'body\' });',
    '',
    '// observe: \'response\' — emits full HttpResponse with headers and status',
    'http.get<Product[]>(url, { observe: \'response\' })',
    '  .subscribe(res => {',
    '    console.log(res.status);                    // 200',
    '    console.log(res.headers.get(\'X-Total-Count\')); // pagination total',
    '    console.log(res.body);                      // Product[]',
    '  });',
    '',
    '// observe: \'events\' — low-level progress events (upload/download)',
    'http.get<Product[]>(url, { observe: \'events\', reportProgress: true });',
    '',
    '// responseType for non-JSON responses',
    'http.get(\'/api/report\', { responseType: \'blob\' });   // file download',
    'http.get(\'/api/health\', { responseType: \'text\' });   // plain text'
  ].join('\n');

  exampleCode = [
    '// product.service.ts',
    'export interface Product {',
    '  id: number; name: string; price: number; category: string;',
    '}',
    '',
    '@Injectable({ providedIn: \'root\' })',
    'export class ProductService {',
    '  private http = inject(HttpClient);',
    '  private url = \'/api/products\';',
    '',
    '  getProducts(category?: string, page = 1): Observable<Product[]> {',
    '    let params = new HttpParams().set(\'page\', String(page));',
    '    if (category) params = params.set(\'category\', category);',
    '    return this.http.get<Product[]>(this.url, { params }).pipe(',
    '      catchError(() => EMPTY)   // swallow error, complete silently',
    '    );',
    '  }',
    '',
    '  getWithPaginationHeaders(): Observable<HttpResponse<Product[]>> {',
    '    return this.http.get<Product[]>(this.url, { observe: \'response\' });',
    '  }',
    '}',
    '',
    '// product-list.component.ts',
    '@Component({ standalone: true, imports: [CommonModule] })',
    'export class ProductListComponent {',
    '  private svc = inject(ProductService);',
    '  loading = false;',
    '  error = \'\';',
    '',
    '  // async pipe handles subscription and cancellation automatically',
    '  products$ = this.svc.getProducts().pipe(',
    '    tap(() => (this.loading = true)),',
    '    finalize(() => (this.loading = false)),',
    '    catchError(err => {',
    '      this.error = err.message;',
    '      return EMPTY;',
    '    })',
    '  );',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'How do you make a typed GET request with HttpClient?',
      a: 'Use the generic overload: http.get<Product[]>(\'/api/products\'). Angular deserialises the JSON response body and TypeScript types it as Product[]. The request is cold — nothing is sent until you subscribe or use the async pipe.'
    },
    {
      q: 'How do you pass query parameters to a GET request?',
      a: 'Use HttpParams: const params = new HttpParams().set(\'page\', \'1\').set(\'category\', \'books\'); then pass it as http.get<T>(url, { params }). HttpParams is immutable — each .set() returns a new instance, so you must reassign: params = params.set(...).'
    },
    {
      q: 'What is the difference between observe: \'body\', \'response\', and \'events\'?',
      a: '\'body\' (default) emits only the deserialised response body typed as T. \'response\' emits the full HttpResponse<T> object giving access to status codes, headers, and body — useful for pagination totals or Location headers. \'events\' emits low-level HttpEvent objects including upload/download progress — used for progress bars.'
    },
    {
      q: 'How do you handle errors in a GET request?',
      a: 'Pipe catchError after the http.get(): this.http.get<T>(url).pipe(catchError(err => { this.error = err.message; return EMPTY; })). catchError receives an HttpErrorResponse for HTTP errors. Returning EMPTY completes the stream silently; returning of(defaultValue) emits a fallback value.'
    },
    {
      q: 'How do you cancel a GET request in Angular?',
      a: 'Unsubscribing from the Observable cancels the underlying XHR. With the async pipe this happens automatically when the component is destroyed. With manual subscribe, use takeUntilDestroyed(destroyRef) or store the Subscription and call .unsubscribe() in ngOnDestroy. Switching operators like switchMap also cancel the previous in-flight request.'
    },
    {
      q: 'How can you cache GET responses to avoid repeated network calls?',
      a: 'Pipe shareReplay(1) on the Observable to multicasts and replay the last response to new subscribers: this.products$ = this.http.get<Product[]>(url).pipe(shareReplay(1)). For application-wide caching, use an HTTP interceptor that stores responses in a Map keyed by URL and returns a cached Observable instead of forwarding the request.'
    }
  ];
}
