import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-local-storage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-storage.component.html',
  styleUrl: './local-storage.component.css',
})
export class LocalStorageComponent {
  syntaxCode = [
    '// localStorage API — browser key-value store',
    '',
    '// Write (value must be a string — serialize objects with JSON.stringify)',
    'localStorage.setItem("theme", "dark");',
    'localStorage.setItem("user", JSON.stringify({ id: 1, name: "Alice" }));',
    '',
    '// Read',
    'const theme = localStorage.getItem("theme"); // "dark" | null',
    'const user = JSON.parse(localStorage.getItem("user") || "null");',
    '',
    '// Delete one item',
    'localStorage.removeItem("theme");',
    '',
    '// Clear all localStorage for this origin',
    'localStorage.clear();',
    '',
    '// Check available space (~5MB per origin)',
    'console.log(JSON.stringify(localStorage).length, "bytes used");',
    '',
    '// Listen for changes from OTHER tabs (same origin)',
    'window.addEventListener("storage", (event) => {',
    '  console.log("Key changed:", event.key, event.newValue);',
    '});',
  ].join('\n');

  exampleCode = [
    '// Real-world: Angular service wrapper for type-safe localStorage',
    '',
    '@Injectable({ providedIn: "root" })',
    'export class StorageService {',
    '  set<T>(key: string, value: T): void {',
    '    try {',
    '      localStorage.setItem(key, JSON.stringify(value));',
    '    } catch (e) {',
    '      console.error("localStorage write failed (storage full?):", e);',
    '    }',
    '  }',
    '',
    '  get<T>(key: string): T | null {',
    '    try {',
    '      const raw = localStorage.getItem(key);',
    '      return raw ? (JSON.parse(raw) as T) : null;',
    '    } catch {',
    '      return null; // Handles malformed JSON',
    '    }',
    '  }',
    '',
    '  remove(key: string): void { localStorage.removeItem(key); }',
    '  clear(): void { localStorage.clear(); }',
    '}',
    '',
    '// ThemeService using StorageService',
    '@Injectable({ providedIn: "root" })',
    'export class ThemeService {',
    '  private readonly THEME_KEY = "app_theme";',
    '  theme$ = new BehaviorSubject<string>(',
    '    this.storage.get<string>(this.THEME_KEY) || "light"',
    '  );',
    '',
    '  constructor(private storage: StorageService) {}',
    '',
    '  setTheme(theme: string) {',
    '    this.storage.set(this.THEME_KEY, theme);',
    '    this.theme$.next(theme);',
    '  }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is localStorage and what are its key characteristics?',
      a: 'localStorage is a Web Storage API that provides persistent key-value storage in the browser. Key characteristics: (1) Data persists indefinitely until explicitly cleared — survives tab/browser close and OS restart; (2) Scoped to the origin (protocol + domain + port) — two different origins cannot access each other\'s data; (3) Storage limit is approximately 5MB per origin (browser-dependent); (4) Synchronous API — reads/writes block the main thread; (5) Values must be strings — objects must be serialized with JSON.stringify/parsed with JSON.parse.',
    },
    {
      q: 'What is the difference between localStorage and sessionStorage?',
      a: 'localStorage persists indefinitely until explicitly cleared (survives browser restarts). sessionStorage is cleared when the browsing session ends — when the tab or browser window is closed. Additionally, sessionStorage is isolated per tab — two tabs on the same origin have separate sessionStorages. localStorage is shared across all tabs from the same origin. Use localStorage for settings that should survive sessions (theme, language, last viewed); use sessionStorage for temporary per-session state (shopping cart progress, multi-step form data).',
    },
    {
      q: 'Is localStorage synchronous or asynchronous? What are the implications?',
      a: 'localStorage is synchronous — all operations (get, set, remove) execute on the main thread and block it. For small data, this is negligible. However, if you store large objects and frequently read/write them, the synchronous nature can cause micro-pauses in UI rendering. The recommended approach is to wrap localStorage access in a service and cache frequently-read values in memory (BehaviorSubject) to avoid repeated disk reads. IndexedDB is the asynchronous alternative for large datasets.',
    },
    {
      q: 'What are the security risks of storing JWTs in localStorage?',
      a: 'Storing JWTs in localStorage is vulnerable to Cross-Site Scripting (XSS). If a malicious script executes in your app context (via a third-party library, injected ad, or XSS vulnerability), it can read localStorage with: localStorage.getItem("jwt") and exfiltrate the token to an attacker\'s server. The attacker then has permanent access until the token expires. Solution: store JWTs in httpOnly cookies (inaccessible to JavaScript). If localStorage must be used for access tokens, use short expiry (15 minutes) and store the refresh token in an httpOnly cookie.',
    },
    {
      q: 'How do you listen to localStorage changes across browser tabs?',
      a: 'The window storage event fires when localStorage is modified in another tab or window from the same origin. It does NOT fire in the tab that made the change: window.addEventListener("storage", (event) => { console.log(event.key, event.oldValue, event.newValue, event.storageArea); }). This enables cross-tab synchronization — e.g., if the user logs out in one tab, other tabs can listen for the token removal and redirect to /login. Remember to removeEventListener in ngOnDestroy to prevent memory leaks.',
    },
    {
      q: 'How do you handle localStorage in Angular for SSR (Server-Side Rendering)?',
      a: 'localStorage is a browser API — it does not exist on the server (Node.js). Accessing it during SSR throws a ReferenceError. Solutions: (1) Check platform: inject PLATFORM_ID and use isPlatformBrowser(platformId) guard before any localStorage access; (2) Use Angular\'s @angular/platform-browser isPlatformBrowser utility; (3) Provide a mock localStorage service for the server platform using Angular\'s InjectionToken. The recommended pattern is to wrap all localStorage access in an injectable StorageService that returns null/undefined on the server.',
    },
    {
      q: 'What is the storage limit of localStorage and what happens when it is full?',
      a: 'localStorage provides approximately 5MB of storage per origin (varies by browser: Chrome ~5MB, Firefox ~5MB, Safari ~5MB). When the storage quota is exceeded, localStorage.setItem() throws a QuotaExceededError (DOMException). Always wrap setItem in a try-catch to handle this gracefully. Common causes of exceeding quota: storing large objects, logging data, or not removing stale entries. Monitor usage with JSON.stringify(localStorage).length to track bytes used. Consider IndexedDB for larger data needs.',
    },
  ];
}
