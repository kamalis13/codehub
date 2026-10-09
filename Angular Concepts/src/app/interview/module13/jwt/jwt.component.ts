import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jwt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jwt.component.html',
  styleUrl: './jwt.component.css',
})
export class JwtComponent {
  syntaxCode = [
    '// JWT Structure: header.payload.signature',
    '// Each part is Base64Url encoded (NOT encrypted)',
    '',
    '// Header (algorithm + token type)',
    '{ "alg": "HS256", "typ": "JWT" }',
    '',
    '// Payload (claims)',
    '{',
    '  "sub": "user123",        // Subject (user ID)',
    '  "email": "user@app.com",',
    '  "roles": ["ADMIN"],',
    '  "iat": 1700000000,       // Issued At (Unix timestamp)',
    '  "exp": 1700003600        // Expiry (1 hour from iat)',
    '}',
    '',
    '// Signature',
    '// HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)',
    '',
    '// Full token: eyJhbGc....eyJzdWIi....SflKxwRJSMeKKF',
    '',
    '// Decoding in Angular (DO NOT store sensitive data in payload)',
    'const payload = JSON.parse(atob(token.split(".")[1]));',
    'console.log(payload.sub, payload.roles, payload.exp);',
  ].join('\n');

  exampleCode = [
    '// Real-world: Angular HTTP Interceptor adding Bearer token',
    '',
    '@Injectable()',
    'export class AuthInterceptor implements HttpInterceptor {',
    '  constructor(private authService: AuthService) {}',
    '',
    '  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {',
    '    const token = this.authService.getToken(); // Read from httpOnly cookie or memory',
    '',
    '    if (token) {',
    '      // Clone request — HttpRequest is immutable',
    '      const cloned = req.clone({',
    '        headers: req.headers.set("Authorization", `Bearer ${token}`)',
    '      });',
    '      return next.handle(cloned);',
    '    }',
    '    return next.handle(req);',
    '  }',
    '}',
    '',
    '// Token storage comparison:',
    '// httpOnly cookie: XSS-safe, vulnerable to CSRF (use SameSite=Strict)',
    '// localStorage: XSS-vulnerable (JS can read it), no CSRF risk',
    '// Memory (variable): safest, lost on tab refresh',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is a JWT and what are its three parts?',
      a: 'JWT (JSON Web Token) is a compact, URL-safe token format for representing claims between two parties. It has three Base64Url-encoded parts separated by dots: (1) Header — contains the token type ("JWT") and signing algorithm ("HS256" or "RS256"); (2) Payload — contains claims (sub, exp, iat, roles, email); (3) Signature — the server signs header+payload with a secret key to verify the token hasn\'t been tampered with. The format is: header.payload.signature.',
    },
    {
      q: 'Is JWT encrypted or just encoded? What is the security implication?',
      a: 'JWT is Base64Url-encoded, NOT encrypted. Anyone can decode the header and payload using atob() or jwt.io — no secret key needed. This means you should NEVER store sensitive data in the JWT payload (passwords, credit cards, PII). The signature ensures integrity (tamper detection) but not confidentiality. If you need the payload to be private, use JWE (JSON Web Encryption) — a different standard. Always use HTTPS to prevent token interception in transit.',
    },
    {
      q: 'What are standard JWT claims and what do they mean?',
      a: 'Standard registered claims: sub (subject — user ID), iss (issuer — who created the token), aud (audience — intended recipient), exp (expiration — Unix timestamp when the token expires), iat (issued at — when the token was created), nbf (not before — earliest valid time), jti (JWT ID — unique identifier for the token). These are optional but recommended. exp is the most important — always set a short expiry (15 minutes for access tokens) and validate it on every API call.',
    },
    {
      q: 'Where should you store JWTs in an Angular app and what are the trade-offs?',
      a: 'Three options: (1) httpOnly Cookie — server sets it; JavaScript cannot read it (XSS-safe), but susceptible to CSRF attacks (mitigate with SameSite=Strict and CSRF tokens). Recommended for production. (2) localStorage — JavaScript-readable; convenient but XSS-vulnerable (a malicious script can steal the token). Easy to implement. (3) Memory (component/service variable) — safest against both XSS and CSRF, but token is lost on page refresh (use with a refresh token flow). Best practice: httpOnly cookie with SameSite=Strict.',
    },
    {
      q: 'How does token expiry work and how do you handle it in Angular?',
      a: 'The JWT payload\'s exp claim is a Unix timestamp. The server validates exp on every request and rejects expired tokens with 401 Unauthorized. In Angular, before making an API call, you can decode the payload and check if (Date.now() / 1000 > payload.exp) to proactively refresh the token. The preferred approach is to let the interceptor handle 401 responses and trigger a silent refresh flow using a refresh token — a cleaner separation of concerns than pre-checking every request.',
    },
    {
      q: 'What is the difference between HS256 and RS256 signing algorithms?',
      a: 'HS256 (HMAC-SHA256) uses a single shared secret key for both signing and verification — fast and simple, but the secret must be shared with all services verifying the token, creating a security risk in microservices. RS256 (RSA-SHA256) uses a private/public key pair — the auth server signs with the private key, and other services verify using the public key (safely distributable). RS256 is the recommended algorithm for microservices and federated auth (Google, Auth0) because services can verify tokens without needing the private signing key.',
    },
    {
      q: 'How do you decode a JWT payload in Angular without a library?',
      a: 'Split the token on "." to get the three parts, then Base64Url-decode the second part (payload). Base64Url replaces "+" with "-" and "/" with "_", and omits padding "=". The decode function: function decodeJwt(token: string) { const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"); return JSON.parse(atob(base64)); }. Never use this decoded data for security decisions on the client — always validate the token server-side. Client-side decoding is only for UX (e.g., showing the user\'s name without an API call).',
    },
  ];
}
