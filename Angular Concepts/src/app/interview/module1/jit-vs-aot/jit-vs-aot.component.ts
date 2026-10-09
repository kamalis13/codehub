import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jit-vs-aot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jit-vs-aot.component.html',
  styleUrl: './jit-vs-aot.component.css',
})
export class JitVsAotComponent {
  syntaxCode = [
    '# JIT — Just-In-Time (legacy dev default)',
    'ng serve                              # JIT in older Angular versions',
    '',
    '# AOT — Ahead-Of-Time (default since Angular 9)',
    'ng serve                              # AOT by default (Angular 9+)',
    'ng build                              # Always AOT in production',
    'ng build --configuration=production   # AOT + full optimization',
    '',
    '# Force AOT in older projects',
    'ng serve --aot=true',
    'ng build --aot',
    '',
    '# tsconfig.json — AOT strict template checking',
    '{',
    '  "angularCompilerOptions": {',
    '    "strictTemplates": true,          // Template type checking (AOT)',
    '    "strictInjectionParameters": true,',
    '    "strictInputAccessModifiers": true',
    '  }',
    '}',
  ].join('\n');

  exampleCode = [
    '// JIT vs AOT — Side-by-Side Comparison',
    '',
    '// JIT (Just-In-Time):',
    '// WHERE: Compilation happens IN THE BROWSER at runtime',
    '// WHEN:  User opens app → browser downloads compiler → compiles templates',
    '// RESULT: Slower startup, larger bundle (includes Angular compiler ~40KB)',
    '// ERRORS: Template errors appear at RUNTIME in the browser console',
    '// BEST:   Development in older Angular versions (faster rebuilds)',
    '',
    '// AOT (Ahead-Of-Time):',
    '// WHERE: Compilation happens on BUILD MACHINE (CI/CD, developer machine)',
    '// WHEN:  ng build runs → templates compiled to JS → browser gets compiled code',
    '// RESULT: Faster startup, smaller bundle (no compiler shipped to browser)',
    '// ERRORS: Template errors caught at BUILD TIME (fail fast, before deployment)',
    '// BEST:   All production deployments; default since Angular 9 for all builds',
    '',
    '// Angular 9+ Ivy: AOT is the default even for ng serve',
    '// The JIT/AOT distinction is largely historical — modern Angular always AOT',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the difference between JIT and AOT compilation?',
      a: 'JIT (Just-In-Time) compiles Angular templates in the browser at runtime — the Angular compiler is shipped to the browser and runs when the user loads the app. AOT (Ahead-Of-Time) compiles templates during the build process on the developer\'s machine or CI server — the browser receives pre-compiled JavaScript. AOT results in faster startup, smaller bundles, and catches template errors at build time rather than runtime.',
    },
    {
      q: 'Which compilation mode does Angular use by default?',
      a: 'Since Angular 9 with the Ivy compiler, AOT is the default for all builds — including ng serve (development). Before Angular 9 with View Engine, JIT was the default for development and AOT was only used for production builds. In modern Angular, the distinction is mostly historical — Ivy\'s AOT is so fast that there is no longer a need for JIT in development.',
    },
    {
      q: 'What are the advantages of AOT over JIT?',
      a: 'AOT advantages: (1) Faster rendering — no compilation step in the browser; (2) Smaller bundle — the Angular compiler (~40KB) is not shipped to the browser; (3) Earlier error detection — template binding errors are caught at build time; (4) Security — HTML injection attacks are less likely since templates are pre-compiled; (5) Better tree-shaking — the build process can eliminate unused framework code.',
    },
    {
      q: 'How does AOT improve security?',
      a: 'With AOT, Angular templates are pre-compiled into JavaScript. Since the HTML templates are converted to JavaScript instructions before deployment, there is no need to evaluate HTML strings at runtime. This eliminates a class of injection vulnerabilities where attackers might try to inject Angular template expressions through user input. Angular also sanitizes property bindings at compile time in AOT mode.',
    },
    {
      q: 'What types of errors does AOT catch that JIT does not catch until runtime?',
      a: 'AOT with strictTemplates catches: (1) Binding to properties that do not exist on the component (e.g., [value]="nonExistent"); (2) Calling methods with wrong argument types; (3) Using pipes that are not imported; (4) Referencing template variables incorrectly; (5) Type mismatches between bound values and property types. These would only surface as runtime errors in JIT mode — often after the app reaches a user.',
    },
    {
      q: 'What is the ngc compiler and how does it relate to AOT?',
      a: 'ngc (Angular Compiler) is the command-line tool for AOT compilation. It extends the TypeScript compiler (tsc) with Angular-specific compilation that processes decorators and template metadata. When you run ng build, the Angular CLI invokes ngc internally. With Ivy, the compiler is now ngtsc — fully integrated into the TypeScript compiler as a transformer plugin — enabling single-pass compilation of both TypeScript and Angular templates.',
    },
  ];
}
