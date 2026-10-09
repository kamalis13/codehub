import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-patch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-patch.component.html',
  styleUrl: './http-patch.component.css'
})
export class HttpPatchComponent {

  syntaxCode = [
    '// Basic PATCH syntax',
    'http.patch<T>(url: string, partialBody: Partial<T>, options?: object): Observable<T>',
    '',
    '// TypeScript Partial<T> — makes all fields optional',
    'interface UserProfile {',
    '  id: number;',
    '  name: string;',
    '  email: string;',
    '  isActive: boolean;',
    '}',
    'type PatchUser = Partial<UserProfile>;',
    '// PatchUser = { id?: number; name?: string; email?: string; isActive?: boolean }',
    '',
    '// PATCH vs PUT comparison',
    '// PUT  → replaces entire resource (ALL fields required)',
    '// PATCH → merges only provided fields (unspecified fields untouched)',
    '',
    '// Example calls',
    'http.patch<UserProfile>(`/api/users/${id}`, { email: newEmail })',
    'http.patch<Product>(`/api/products/${id}`, { isActive: false })',
  ].join('\n');

  exampleCode = [
    '// 1. Update only the email field',
    'patchUserEmail(id: number, newEmail: string): Observable<UserProfile> {',
    '  return this.http.patch<UserProfile>(`/api/users/${id}`, { email: newEmail });',
    '}',
    '',
    '// 2. Toggle active status (single boolean field)',
    'toggleProductActive(id: number, currentStatus: boolean): Observable<Product> {',
    '  return this.http.patch<Product>(`/api/products/${id}`, { isActive: !currentStatus });',
    '}',
    '',
    '// 3. Send only dirty (changed) fields from a Reactive Form',
    'saveChanges(form: FormGroup, userId: number): void {',
    '  const dirtyFields: Record<string, any> = {};',
    '  Object.keys(form.controls).forEach(key => {',
    '    if (form.controls[key].dirty) {',
    '      dirtyFields[key] = form.controls[key].value;',
    '    }',
    '  });',
    '',
    '  if (Object.keys(dirtyFields).length === 0) {',
    '    console.log("No changes detected — skipping PATCH");',
    '    return;',
    '  }',
    '',
    '  this.http.patch<UserProfile>(`/api/users/${userId}`, dirtyFields)',
    '    .subscribe({',
    '      next: updated => {',
    '        console.log("Patched fields:", dirtyFields);',
    '        console.log("Updated profile:", updated);',
    '      },',
    '      error: err => console.error("PATCH failed:", err)',
    '    });',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is HTTP PATCH and what are its semantics?',
      a: 'PATCH sends a partial update to the server — only the fields included in the request body are changed. The server merges these fields into the existing resource, leaving all other fields untouched. It is ideal for single-field updates or partial edits.'
    },
    {
      q: 'What is the difference between PATCH and PUT?',
      a: 'PATCH is a partial update — only send the fields that changed. PUT is a full replacement — all fields must be present; omitted fields are cleared. Use PATCH when you want to update one or a few fields without affecting the rest of the resource.'
    },
    {
      q: 'Is PATCH idempotent?',
      a: 'PATCH is not required to be idempotent by the HTTP spec, unlike PUT. For example, a PATCH that increments a counter changes the result each time. However, many PATCH operations in practice are effectively idempotent (e.g., setting a field to a specific value). Always check your API documentation.'
    },
    {
      q: 'How do you send only the changed fields using form dirty state?',
      a: 'Iterate over form.controls, check if each control is dirty (control.dirty === true), and collect those keys into a partial object. Send only that object to http.patch(). This avoids sending unchanged fields and keeps payloads minimal.'
    },
    {
      q: 'What are real-world use cases for PATCH?',
      a: 'Status toggling (isActive, isPublished), single field updates (change just the email or phone), order status transitions (pending → processing → shipped), partial profile edits, and any scenario where the client only knows about a subset of the resource fields.'
    },
    {
      q: 'How does the server process a PATCH request?',
      a: 'The server loads the existing resource from the database, merges only the fields present in the PATCH body into the stored object, validates the result, and saves. Fields not present in the PATCH body are left exactly as they were. The server typically returns the full updated resource.'
    }
  ];
}
