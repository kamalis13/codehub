import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-delete.component.html',
  styleUrl: './http-delete.component.css'
})
export class HttpDeleteComponent {

  syntaxCode = [
    '// Basic DELETE syntax',
    'http.delete<T>(url: string, options?: object): Observable<T>',
    '',
    '// When no response body is expected (204 No Content)',
    'http.delete<void>(url)',
    '',
    '// URL must include the resource ID',
    'const url = `/api/products/${id}`;',
    '',
    '// DELETE with optional request body via options (rare, but allowed)',
    'http.delete<void>(url, {',
    '  body: { reason: "User requested deletion" }',
    '})',
    '',
    '// Idempotency note',
    '// First DELETE  → 200 OK or 204 No Content (resource removed)',
    '// Second DELETE → 404 Not Found (already gone)',
    '// Server state is the same both times: resource does not exist',
  ].join('\n');

  exampleCode = [
    '// --- Service ---',
    'export class ProductService {',
    '  constructor(private http: HttpClient) {}',
    '',
    '  deleteProduct(id: number): Observable<void> {',
    '    return this.http.delete<void>(`/api/products/${id}`);',
    '  }',
    '}',
    '',
    '// --- Component: PESSIMISTIC delete ---',
    '// Wait for the API to confirm, then update the UI',
    'deletePessimistic(id: number) {',
    '  if (!confirm("Delete this product?")) return;',
    '  this.productService.deleteProduct(id).subscribe({',
    '    next: () => {',
    '      this.products = this.products.filter(p => p.id !== id);',
    '    },',
    '    error: err => alert("Delete failed: " + err.message)',
    '  });',
    '}',
    '',
    '// --- Component: OPTIMISTIC delete ---',
    '// Remove from UI immediately, restore on API failure',
    'deleteOptimistic(id: number) {',
    '  if (!confirm("Delete this product?")) return;',
    '  const backup = [...this.products];',
    '  this.products = this.products.filter(p => p.id !== id); // instant UI update',
    '  this.productService.deleteProduct(id).subscribe({',
    '    error: err => {',
    '      this.products = backup;          // restore on failure',
    '      alert("Delete failed — item restored");',
    '    }',
    '  });',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is HTTP DELETE and what are its semantics?',
      a: 'DELETE tells the server to remove the resource identified by the URL. The server responds with 200 OK (with body), 204 No Content (no body), or 404 if the resource does not exist. The response body is typically empty.'
    },
    {
      q: 'What is the difference between optimistic and pessimistic delete, and what are the tradeoffs?',
      a: 'Optimistic delete removes the item from the UI immediately and rolls back on error — it feels fast but can confuse users if the rollback happens. Pessimistic delete waits for the API to confirm before updating the UI — it is safer and predictable but feels slower. Use optimistic for fast UX in low-error scenarios; pessimistic when accuracy is critical.'
    },
    {
      q: 'Should a DELETE request have a request body?',
      a: 'The HTTP spec technically allows a body on DELETE, but most servers and proxies ignore it. It is generally avoided for simplicity. If extra data is needed (e.g., a deletion reason), send it as a query parameter or use a custom endpoint instead.'
    },
    {
      q: 'Is DELETE idempotent? What happens when you call DELETE twice?',
      a: 'DELETE is defined as idempotent by the HTTP spec — the server state after multiple identical DELETE calls is the same as after one. The first call removes the resource (200/204). The second call returns 404 because the resource is already gone. The server state is identical: the resource does not exist.'
    },
    {
      q: 'How should you implement a confirmation dialog before delete?',
      a: 'Guard the delete call with a confirm() check or a modal dialog. Only proceed with the HTTP call if the user confirms. For more polished UX, use an Angular Material dialog and pipe the dialog afterClosed() observable into the delete call using switchMap.'
    },
    {
      q: 'How do you remove an item from a local array after a successful DELETE?',
      a: 'Use Array.filter() to return a new array excluding the deleted item: this.products = this.products.filter(p => p.id !== id). Call this inside the next callback of subscribe() for pessimistic delete, or before the subscribe() call for optimistic delete.'
    }
  ];
}
