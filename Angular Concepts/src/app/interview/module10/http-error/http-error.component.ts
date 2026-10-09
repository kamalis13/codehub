import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-error.component.html',
  styleUrl: './http-error.component.css'
})
export class HttpErrorComponent {

  syntaxCode = [
    '// Imports for error handling',
    'import { catchError, retry, retryWhen, delay, take } from "rxjs/operators";',
    'import { HttpErrorResponse } from "@angular/common/http";',
    'import { throwError, EMPTY, of } from "rxjs";',
    '',
    '// HttpErrorResponse key properties',
    '// err.status      — HTTP status code (0 = network error, 401, 404, 500...)',
    '// err.statusText  — "Not Found", "Unauthorized", "Internal Server Error"',
    '// err.error       — parsed response body (JSON object or string)',
    '// err.message     — Angular-generated description string',
    '// err.url         — the request URL that failed',
    '',
    '// Basic catchError pattern',
    'this.http.get<T>(url).pipe(',
    '  catchError((err: HttpErrorResponse) => {',
    '    if (err.status === 0) {',
    '      return throwError(() => new Error("Network error — check your connection"));',
    '    }',
    '    return throwError(() => new Error(`Server error: ${err.status} ${err.statusText}`));',
    '  })',
    ')',
    '',
    '// Retry on transient failures',
    'this.http.get<T>(url).pipe(retry(3))',
    '',
    '// Global interceptor structure',
    'export class ErrorInterceptor implements HttpInterceptor {',
    '  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {',
    '    return next.handle(req).pipe(',
    '      catchError((err: HttpErrorResponse) => throwError(() => err))',
    '    );',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// 1. Local error handling in a service',
    'getProducts(): Observable<Product[]> {',
    '  return this.http.get<Product[]>("/api/products").pipe(',
    '    catchError((err: HttpErrorResponse) => {',
    '      if (err.status === 404) {',
    '        return of([]);    // resource not found — return empty list',
    '      }',
    '      if (err.status === 401) {',
    '        this.router.navigate(["/login"]);',
    '        return EMPTY;     // stop the stream silently',
    '      }',
    '      if (err.status >= 500) {',
    '        this.toastService.show("Server error — please try again later");',
    '      }',
    '      return throwError(() => new Error(err.message));',
    '    })',
    '  );',
    '}',
    '',
    '// 2. Global error interceptor — handles ALL requests centrally',
    'intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {',
    '  return next.handle(req).pipe(',
    '    catchError((err: HttpErrorResponse) => {',
    '      const userMsg = err.error?.message ?? err.statusText ?? "Unknown error";',
    '      this.snackBar.open(`Error ${err.status}: ${userMsg}`, "Close", { duration: 4000 });',
    '      console.error("[HTTP Error]", err.url, err.status, err.error);',
    '      return throwError(() => err);',
    '    })',
    '  );',
    '}',
    '',
    '// 3. Retry pattern for transient network failures',
    'getData(): Observable<Data> {',
    '  return this.http.get<Data>("/api/data").pipe(',
    '    retry(3),    // automatically retry up to 3 times on any error',
    '    catchError(err => {',
    '      console.error("Failed after 3 retries:", err);',
    '      return throwError(() => new Error("Service unavailable — please try later"));',
    '    })',
    '  );',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is HttpErrorResponse and what are its key properties?',
      a: 'HttpErrorResponse is Angular\'s error object for failed HTTP requests. Key properties: status (HTTP code), statusText (text description), error (parsed response body), message (Angular description), and url (the failing endpoint URL). It extends Error so it can be thrown and caught like a standard JavaScript error.'
    },
    {
      q: 'What is the difference between a network error and an HTTP error?',
      a: 'A network error (status === 0) means the request never reached the server — caused by no internet, CORS pre-flight failure, or firewall blocking. An HTTP error (4xx/5xx) means the server received the request and responded with an error code. They require different handling: network errors often warrant a retry; HTTP errors require reading the status to decide (401 → login, 404 → show empty state, 500 → show error message).'
    },
    {
      q: 'How does catchError work in an HTTP pipeline?',
      a: 'catchError intercepts the error channel of an Observable. When the HTTP request fails, catchError receives the HttpErrorResponse, lets you inspect it, and must return a new Observable — either a fallback value (of([]), EMPTY), or re-throw via throwError(() => err). The returned Observable replaces the failed stream and continues to any downstream operators or subscribers.'
    },
    {
      q: 'When should you use local error handling vs a global interceptor?',
      a: 'Use global interceptors for cross-cutting concerns: logging all errors, showing a generic snackbar, or redirecting on 401. Use local catchError in services for context-specific recovery: returning empty arrays on 404, showing domain-specific messages, or navigating to specific routes. They compose — the local handler runs first, and the global interceptor can still log what slips through.'
    },
    {
      q: 'What are retry and retryWhen, and when should you use them?',
      a: 'retry(n) immediately resubscribes to the source Observable up to n times on error — useful for transient network blips. retryWhen accepts a factory function returning an Observable that controls when to retry (e.g., with delay or exponential backoff). Use retry(3) for simple cases; use retryWhen or the modern retry({ count, delay }) for controlled backoff before each retry.'
    },
    {
      q: 'How do you show a user-friendly error message from an API error response?',
      a: 'Read err.error for the parsed API response body (e.g., err.error?.message or err.error?.detail). If absent, fall back to err.statusText. Map known status codes to readable strings (401 → "Please log in again", 403 → "You do not have permission"). Display with a toast, snackbar, or inline error message in the template.'
    },
    {
      q: 'How do you implement a global HTTP error interceptor?',
      a: 'Create a class that implements HttpInterceptor. In the intercept() method, call next.handle(req) and pipe catchError to it. Register it in the providers array using { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true } in your AppModule or provideHttpClient() with withInterceptors() in standalone apps.'
    }
  ];
}
