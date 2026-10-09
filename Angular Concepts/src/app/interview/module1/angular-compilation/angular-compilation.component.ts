import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angular-compilation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular-compilation.component.html',
  styleUrl: './angular-compilation.component.css',
})
export class AngularCompilationComponent {
  syntaxCode = [
    '// Step 1: Developer writes TypeScript + decorators',
    '@Component({',
    '  selector: "app-hello",',
    '  template: "<h1>Hello {{ name }}!</h1>",',
    '})',
    'export class HelloComponent {',
    '  name = "Angular";',
    '}',
    '',
    '// Step 2: Angular Ivy compiler generates optimized JS',
    '// (simplified representation of compiled output)',
    'HelloComponent.ɵcmp = defineComponent({',
    '  type: HelloComponent,',
    '  selectors: [["app-hello"]],',
    '  template: function HelloComponent_Template(rf, ctx) {',
    '    if (rf & 1) {           // Create phase',
    '      ɵɵelementStart(0, "h1");',
    '      ɵɵtext(1);',
    '      ɵɵelementEnd();',
    '    }',
    '    if (rf & 2) {           // Update phase',
    '      ɵɵadvance(1);',
    '      ɵɵtextInterpolate1("Hello ", ctx.name, "!");',
    '    }',
    '  }',
    '});',
  ].join('\n');

  exampleCode = [
    '// Production build command',
    'ng build --configuration=production',
    '',
    '// Compilation pipeline stages:',
    '// ┌─────────────────────────────────────────┐',
    '// │ 1. TypeScript Compiler (tsc)             │',
    '// │    Type checks .ts files                 │',
    '// │    Catches type errors before runtime    │',
    '// ├─────────────────────────────────────────┤',
    '// │ 2. Angular Template Compiler (ngc/Ivy)   │',
    '// │    Converts @Component templates to JS   │',
    '// │    Validates template bindings & types   │',
    '// ├─────────────────────────────────────────┤',
    '// │ 3. esbuild / Rollup (Tree-shaking)       │',
    '// │    Removes unused exports & libraries    │',
    '// ├─────────────────────────────────────────┤',
    '// │ 4. Minification + Compression            │',
    '// │    Renames variables, removes whitespace │',
    '// └─────────────────────────────────────────┘',
    '',
    '// Output bundles in dist/my-app/',
    '// main.js        ~250 KB (app code, minified)',
    '// polyfills.js   ~35 KB',
    '// runtime.js     ~5 KB (webpack/esbuild runtime)',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the Angular compilation process?',
      a: 'Angular compilation happens in multiple stages: (1) TypeScript compiler (tsc) type-checks all .ts files; (2) Angular\'s Ivy compiler reads @Component decorators and compiles HTML templates into TypeScript/JavaScript factory functions; (3) A bundler (esbuild/webpack) tree-shakes unused code; (4) The output is minified and optionally compressed. The result is optimized JS bundles deployable to any web server.',
    },
    {
      q: 'What is the Ivy compiler and why was it introduced?',
      a: 'Ivy is Angular\'s third-generation compilation and rendering engine (replacing View Engine). It was introduced as the default in Angular 9. Ivy compiles components into self-contained definition objects (ɵcmp) that include their own factory, change detection, and template instructions. Benefits include: smaller bundles through locality (each component compiled independently), faster compilation, better tree-shaking, and improved debugging with source-mapped errors.',
    },
    {
      q: 'What is the locality principle in Ivy compilation?',
      a: 'Locality means each component is compiled in isolation using only its own metadata — it does not need to understand the components it is used with. Under the old View Engine, compiling a component required knowing all components in the same NgModule. Ivy\'s locality principle enables independent component compilation, making incremental compilation much faster and enabling library distribution of pre-compiled code.',
    },
    {
      q: 'What is tree-shaking and how does Angular benefit from it?',
      a: 'Tree-shaking is the process of removing unused JavaScript code from the bundle. Bundlers (esbuild/webpack) analyze import/export relationships and eliminate code that is never imported. Ivy was designed with tree-shaking in mind — Angular framework features (pipes, directives, etc.) that are not used in your app are removed from the final bundle. This is why Angular 9+ apps have significantly smaller bundles than Angular 8 apps.',
    },
    {
      q: 'What is the difference between the compilation output for development vs production?',
      a: 'In development mode (ng serve): source maps are included for debugging, minification is skipped for readable code, bundle size is larger (typically 3-5 MB), and compilation is faster (incremental). In production mode (ng build): code is fully minified, source maps are optional, dead code is tree-shaken, bundles are gzip-compressed, and the compiler applies additional optimizations like property mangling — resulting in bundles of 200-500 KB.',
    },
    {
      q: 'What are Angular template type checks and how does Ivy enable them?',
      a: 'Template type checking validates that template bindings reference real component properties of the correct type. For example, if a component has age: number and the template binds [value]="age.toUpperCase()", the compiler catches this error at build time. Ivy made this possible through strictTemplates mode in tsconfig — errors in templates are reported with precise line numbers and type mismatch details, just like TypeScript errors.',
    },
  ];
}
