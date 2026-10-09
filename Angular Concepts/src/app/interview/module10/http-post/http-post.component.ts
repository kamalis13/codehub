import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-post.component.html',
  styleUrl: './http-post.component.css'
})
export class HttpPostComponent {

  syntaxCode = [
    '// Basic POST — Angular auto-sets Content-Type: application/json',
    'http.post<User>(\'/api/users\', { name: \'Alice\', email: \'alice@example.com\' })',
    '  .subscribe(createdUser => console.log(createdUser));',
    '',
    '// POST with custom Authorization header',
    'const headers = new HttpHeaders({',
    '  \'Authorization\': `Bearer ${token}`,',
    '  \'X-Request-Id\': generateUuid()',
    '});',
    'http.post<User>(\'/api/users\', body, { headers });',
    '',
    '// Access full HttpResponse to read 201 Created + Location header',
    'http.post<User>(\'/api/users\', body, { observe: \'response\' })',
    '  .subscribe(res => {',
    '    if (res.status === 201) {',
    '      const location = res.headers.get(\'Location\');',
    '      console.log(\'New resource at:\', location);',
    '    }',
    '  });',
    '',
    '// Typed request DTO and response interface',
    'interface RegisterDto { name: string; email: string; password: string; }',
    'interface User        { id: number; name: string; email: string; }',
    '',
    'register(dto: RegisterDto): Observable<User> {',
    '  return this.http.post<User>(\'/api/auth/register\', dto);',
    '}'
  ].join('\n');

  exampleCode = [
    '// auth.service.ts',
    'interface RegisterDto { name: string; email: string; password: string; }',
    'interface User { id: number; name: string; email: string; }',
    'interface OrderDto { items: string[]; total: number; }',
    'interface Order { id: number; items: string[]; total: number; status: string; }',
    '',
    '@Injectable({ providedIn: \'root\' })',
    'export class AuthService {',
    '  private http = inject(HttpClient);',
    '',
    '  register(dto: RegisterDto): Observable<User> {',
    '    return this.http.post<User>(\'/api/auth/register\', dto);',
    '  }',
    '',
    '  createOrder(order: OrderDto): Observable<Order> {',
    '    const headers = new HttpHeaders({ Authorization: \'Bearer \' + this.getToken() });',
    '    return this.http.post<Order>(\'/api/orders\', order, { headers }).pipe(',
    '      tap(created => this.orderStore.add(created)),    // optimistic add to local store',
    '      catchError(err => {',
    '        this.orderStore.rollback();                    // revert on failure',
    '        throw err;',
    '      })',
    '    );',
    '  }',
    '}',
    '',
    '// register.component.ts',
    '@Component({ standalone: true, imports: [CommonModule, ReactiveFormsModule] })',
    'export class RegisterComponent {',
    '  private auth = inject(AuthService);',
    '  private router = inject(Router);',
    '  loading = false;',
    '  errorMsg = \'\';',
    '',
    '  onSubmit(dto: RegisterDto) {',
    '    this.loading = true;',
    '    this.auth.register(dto).subscribe({',
    '      next: () => this.router.navigate([\'/dashboard\']),',
    '      error: err => { this.errorMsg = err.message; this.loading = false; },',
    '      complete: () => (this.loading = false)',
    '    });',
    '  }',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is HTTP POST used for and how does it differ from GET?',
      a: 'POST is used to create a new resource on the server or trigger a server-side operation. Unlike GET, POST carries a request body, is not idempotent (calling it twice creates two resources), and should not be cached. GET only retrieves data, has no body, and is idempotent and cacheable.'
    },
    {
      q: 'Does Angular automatically set Content-Type for JSON bodies in a POST request?',
      a: 'Yes. When you pass a plain JavaScript object as the body to http.post(), Angular automatically serialises it to a JSON string and sets the Content-Type: application/json header. You only need to set Content-Type manually when sending a different format such as FormData or URL-encoded data.'
    },
    {
      q: 'How do you send an Authorization header with a POST request?',
      a: 'Create an HttpHeaders instance and pass it in the options object: const headers = new HttpHeaders({ Authorization: \'Bearer \' + token }); http.post<T>(url, body, { headers }). In production apps, use an HTTP interceptor to attach the token to every outgoing request automatically instead of doing it manually in each service method.'
    },
    {
      q: 'How do you handle a 201 Created response and read the Location header?',
      a: 'Pass observe: \'response\' in the options to receive the full HttpResponse<T> instead of just the body: http.post<User>(url, body, { observe: \'response\' }).subscribe(res => { if (res.status === 201) { const loc = res.headers.get(\'Location\'); } }). This gives access to all response headers and the status code alongside the typed body.'
    },
    {
      q: 'What is the semantic difference between POST and PUT?',
      a: 'POST creates a new resource at a server-determined URL (non-idempotent — calling twice creates two resources). PUT replaces an existing resource at a client-specified URL (idempotent — calling twice yields the same result). PATCH is similar to PUT but performs a partial update rather than a full replacement.'
    },
    {
      q: 'How do you show a loading spinner while a POST request is in progress?',
      a: 'Set a loading flag to true before subscribing, and reset it to false in both the error and complete callbacks: this.loading = true; this.svc.create(dto).subscribe({ next: () => ..., error: () => (this.loading = false), complete: () => (this.loading = false) }). Alternatively, use the finalize operator in the service pipe: .pipe(finalize(() => (this.loading = false))) so the flag resets regardless of success or failure.'
    }
  ];
}
