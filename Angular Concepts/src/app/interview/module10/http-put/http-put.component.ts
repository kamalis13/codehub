import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-put',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-put.component.html',
  styleUrl: './http-put.component.css'
})
export class HttpPutComponent {

  syntaxCode = [
    '// Basic PUT syntax',
    'http.put<T>(url: string, body: any, options?: object): Observable<T>',
    '',
    '// PUT is idempotent — same request produces the same result every time',
    '// PUT replaces the ENTIRE resource at the given URL',
    '',
    '// Typical REST URL pattern',
    'const url = `/api/users/${id}`;',
    '',
    '// Full replacement — every field must be present in the body',
    'http.put<UserProfile>(url, fullUserObject)',
    '',
    '// With options (custom headers)',
    'http.put<UserProfile>(url, fullUserObject, {',
    '  headers: { Authorization: `Bearer ${token}` }',
    '})',
    '',
    '// Idempotency guarantee',
    '// PUT /api/users/42  { name: "Alice", email: "a@b.com", age: 30 }',
    '// calling it 1 time or 10 times → same stored state',
  ].join('\n');

  exampleCode = [
    '// --- Service ---',
    'export class UserService {',
    '  constructor(private http: HttpClient) {}',
    '',
    '  // PUT: send the FULL profile — omitted fields are cleared on the server',
    '  updateUserProfile(id: number, fullProfile: UserProfile): Observable<UserProfile> {',
    '    return this.http.put<UserProfile>(`/api/users/${id}`, fullProfile);',
    '  }',
    '',
    '  // PATCH (for contrast): send only the changed fields',
    '  patchUserProfile(id: number, partial: Partial<UserProfile>): Observable<UserProfile> {',
    '    return this.http.patch<UserProfile>(`/api/users/${id}`, partial);',
    '  }',
    '}',
    '',
    '// --- Component ---',
    'export class EditProfileComponent implements OnInit {',
    '  profile!: UserProfile;',
    '  private originalProfile!: UserProfile;',
    '',
    '  ngOnInit() {',
    '    this.userService.getProfile(this.userId)',
    '      .subscribe(p => { this.profile = p; this.originalProfile = { ...p }; });',
    '  }',
    '',
    '  onSave() {',
    '    // Optimistic update: apply immediately, rollback on error',
    '    this.userService.updateUserProfile(this.profile.id, this.profile)',
    '      .subscribe({',
    '        next: updated => this.profile = updated,',
    '        error: err => {',
    '          this.profile = { ...this.originalProfile }; // rollback',
    '          console.error("PUT failed:", err);',
    '        }',
    '      });',
    '  }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is HTTP PUT and what are its semantics?',
      a: 'PUT sends a complete replacement of the resource at the target URL. The request body must contain the full object — missing fields are cleared or set to null on the server. It is the standard REST method for full-update operations.'
    },
    {
      q: 'What is the difference between PUT and PATCH?',
      a: 'PUT replaces the entire resource — all fields must be sent. PATCH updates only the provided fields and leaves the rest unchanged. Use PUT when you always have the complete object; use PATCH for partial or single-field updates.'
    },
    {
      q: 'What does idempotent mean, and why is PUT idempotent?',
      a: 'Idempotent means calling the same operation multiple times produces the same server state as calling it once. PUT is idempotent because sending the same full object repeatedly results in the resource always being in the same state — making it safe to retry on network failures.'
    },
    {
      q: 'When should you use PUT vs PATCH in real applications?',
      a: 'Use PUT when the client owns the full object and sends every field (e.g., a full profile edit form with all fields rendered). Use PATCH when updating a single field like toggling isActive, or when you want to send only dirty/changed fields to reduce payload size.'
    },
    {
      q: 'What happens if you omit a field in a PUT request?',
      a: 'The omitted field is treated as absent — the server will either clear it (set to null or default value) or return a validation error, depending on the API design. This is a very common mistake when developers confuse PUT with PATCH.'
    },
    {
      q: 'How do you handle optimistic updates with PUT?',
      a: 'Store a copy of the original state before the PUT call. Apply the new state to the UI immediately. On catchError, restore the original copy and show an error message. On success, update with the server response to keep client and server in sync.'
    }
  ];
}
