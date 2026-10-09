import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-storage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-storage.component.html',
  styleUrl: './session-storage.component.css',
})
export class SessionStorageComponent {
  syntaxCode = [
    '// sessionStorage API — same interface as localStorage',
    '',
    '// Write',
    'sessionStorage.setItem("step", "2");',
    'sessionStorage.setItem("formData", JSON.stringify({',
    '  name: "Alice",',
    '  email: "alice@example.com"',
    '}));',
    '',
    '// Read',
    'const step = sessionStorage.getItem("step"); // "2" | null',
    'const formData = JSON.parse(sessionStorage.getItem("formData") || "null");',
    '',
    '// Delete one item',
    'sessionStorage.removeItem("step");',
    '',
    '// Clear all session data',
    'sessionStorage.clear();',
    '',
    '// Key differences from localStorage:',
    '// ✅ Cleared when tab or browser window is closed',
    '// ✅ Per-tab isolation — two tabs from same origin have SEPARATE sessionStorage',
    '// ✅ NOT shared across tabs (unlike localStorage)',
    '// ✅ Same ~5MB limit per tab',
  ].join('\n');

  exampleCode = [
    '// Real-world: Multi-step registration form with sessionStorage',
    '',
    '@Injectable({ providedIn: "root" })',
    'export class RegistrationFormService {',
    '  private readonly KEY = "reg_form_state";',
    '',
    '  saveStep(step: number, data: Partial<RegistrationForm>) {',
    '    const existing = this.load();',
    '    const updated = { ...existing, ...data, currentStep: step };',
    '    sessionStorage.setItem(this.KEY, JSON.stringify(updated));',
    '  }',
    '',
    '  load(): Partial<RegistrationForm> {',
    '    const raw = sessionStorage.getItem(this.KEY);',
    '    return raw ? JSON.parse(raw) : {};',
    '  }',
    '',
    '  clear() { sessionStorage.removeItem(this.KEY); }',
    '}',
    '',
    '// In Step 1 Component:',
    '// this.registrationService.saveStep(1, { name: "Alice", email: "alice@app.com" });',
    '',
    '// In Step 2 Component (navigated back):',
    '// const saved = this.registrationService.load();',
    '// Pre-populate form with saved.name and saved.email',
    '',
    '// On form submission:',
    '// this.registrationService.clear(); // Clean up session state',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is sessionStorage and how does it differ from localStorage?',
      a: 'sessionStorage is a Web Storage API that provides per-session, per-tab key-value storage. The critical differences from localStorage: (1) Lifetime — sessionStorage is automatically cleared when the tab or browser window is closed; localStorage persists indefinitely; (2) Tab isolation — each browser tab has its own separate sessionStorage, even for the same origin; localStorage is shared across all tabs from the same origin; (3) Use case — sessionStorage for temporary, tab-specific state (form progress, wizards); localStorage for persistent preferences (theme, language).',
    },
    {
      q: 'What happens to sessionStorage data when the user opens a new tab?',
      a: 'Opening a completely new tab creates an empty sessionStorage for that tab — it does NOT inherit the parent tab\'s sessionStorage. However, when a page is duplicated via Ctrl+D or "Duplicate Tab" in Chrome, the duplicate tab gets a copy of the original tab\'s sessionStorage at that point in time, but subsequent changes are independent. When a user navigates within the same tab (including SPA route changes), sessionStorage persists — it only clears on tab/window close.',
    },
    {
      q: 'What are the best use cases for sessionStorage in an Angular app?',
      a: 'Best use cases: (1) Multi-step wizard/form state — save form progress between steps so users can navigate back without losing data; (2) Tab-specific filters and sort preferences — each tab can have different view states; (3) Temporary authentication nonce or PKCE code verifier for OAuth flows; (4) Recently viewed items within a session; (5) Page scroll position restoration within a session. The key signal: if the data should be private to this tab and auto-cleanup on close, use sessionStorage.',
    },
    {
      q: 'How does sessionStorage behave during Angular route navigation?',
      a: 'In an Angular SPA, route navigation does NOT create a new browser tab or reload the page — it is all in-memory navigation handled by the Angular Router. Therefore, sessionStorage persists across all route changes within the same tab. This makes it useful for storing state that should survive internal navigation (going from step 1 to step 2 of a form) but be discarded when the user closes the tab or browser. The data is tab-scoped, not route-scoped.',
    },
    {
      q: 'What is the difference between sessionStorage, localStorage, and cookies?',
      a: 'Comparison: localStorage — persists forever, shared across tabs, same origin, ~5MB, never sent to server, XSS-vulnerable. sessionStorage — cleared on tab close, isolated per tab, same origin, ~5MB, never sent to server, somewhat XSS-vulnerable. Cookies — configurable expiry, shared across tabs, sent with every HTTP request (overhead), ~4KB, can be httpOnly (JS-inaccessible, XSS-safe), can be Secure and SameSite. For auth tokens: use httpOnly cookies. For preferences: localStorage. For wizard state: sessionStorage.',
    },
    {
      q: 'How do you handle sessionStorage in Angular Universal (SSR)?',
      a: 'sessionStorage does not exist in Node.js (SSR environment) — accessing it will throw a ReferenceError. The fix is the same as with localStorage: inject PLATFORM_ID, check isPlatformBrowser(platformId) before any sessionStorage access. Example: if (isPlatformBrowser(this.platformId)) { sessionStorage.setItem("key", value); }. Alternatively, wrap all storage access in a dedicated Angular service that returns null on the server. This is critical for Angular Universal apps.',
    },
    {
      q: 'Can sessionStorage be accessed from a Service Worker?',
      a: 'No. Service Workers run in a separate thread (not the main browser thread) and do not have access to Web Storage APIs (localStorage or sessionStorage). Service Workers can only use the Cache API and IndexedDB for storage. This is by design — Service Workers intercept network requests and need asynchronous, non-blocking storage. IndexedDB is the recommended storage solution for Service Workers, with Promise-based access (or libraries like idb that wrap it).',
    },
  ];
}
