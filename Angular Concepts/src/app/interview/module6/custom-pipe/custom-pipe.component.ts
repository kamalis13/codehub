import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-pipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-pipe.component.html',
  styleUrl: './custom-pipe.component.css'
})
export class CustomPipeComponent {

  syntaxCode = [
    '// Step 1: Define the pipe',
    "import { Pipe, PipeTransform } from '@angular/core';",
    '',
    '@Pipe({',
    "  name: 'truncate',   // name used in template: {{ value | truncate }}",
    '  pure: true,         // default — only runs when input reference changes',
    '  standalone: true,   // standalone pipes (Angular 14+)',
    '})',
    'export class TruncatePipe implements PipeTransform {',
    '  transform(value: string, limit = 100, ellipsis = \'...\'): string {',
    '    if (!value || value.length <= limit) return value;',
    '    return value.substring(0, limit) + ellipsis;',
    '  }',
    '}',
    '',
    '// Step 2: Import in standalone component',
    '@Component({',
    "  selector: 'app-blog',",
    '  standalone: true,',
    "  imports: [CommonModule, TruncatePipe],  // import the pipe",
    '  ...',
    '})',
    '',
    '// Step 3: Use in template',
    "{{ article.body | truncate:150:'...' }}",
    "{{ article.body | truncate }}  // uses defaults",
  ].join('\n');

  exampleCode = [
    '// phone-format.pipe.ts — Real-world custom pipe',
    "import { Pipe, PipeTransform } from '@angular/core';",
    '',
    '@Pipe({',
    "  name: 'phoneFormat',",
    '  standalone: true,',
    '  pure: true',
    '})',
    'export class PhoneFormatPipe implements PipeTransform {',
    "  transform(value: string, format: 'us' | 'in' | 'uk' = 'us'): string {",
    '    if (!value) return \'\';',
    "    const digits = value.replace(/\\D/g, '');  // strip non-digits",
    '',
    '    switch (format) {',
    "      case 'us':",
    "        return digits.replace(/(\\d{3})(\\d{3})(\\d{4})/, '($1) $2-$3');",
    "      case 'in':",
    "        return digits.replace(/(\\d{2})(\\d{5})(\\d{5})/, '+$1 $2 $3');",
    "      case 'uk':",
    "        return digits.replace(/(\\d{4})(\\d{6})/, '$1 $2');",
    '      default:',
    '        return value;',
    '    }',
    '  }',
    '}',
    '',
    '// truncate.pipe.ts',
    '@Pipe({ name: \'truncate\', standalone: true })',
    'export class TruncatePipe implements PipeTransform {',
    '  transform(value: string, limit = 100, suffix = \'...\'): string {',
    '    if (!value || value.length <= limit) return value ?? \'\';',
    '    return value.substring(0, limit).trimEnd() + suffix;',
    '  }',
    '}',
    '',
    '// Template usage',
    '<p>{{ article.content | truncate:200 }}</p>',
    '<p>{{ \'9876543210\' | phoneFormat:\'in\' }}</p>  // +98 76543 21000',
    '<p>{{ customer.phone | phoneFormat }}</p>      // (123) 456-7890',
  ].join('\n');

  interviewQA = [
    {
      q: 'How do you create a custom pipe in Angular?',
      a: "Create a class with @Pipe({ name: 'pipeName', standalone: true }) decorator. Implement the PipeTransform interface with a transform(value: T, ...args: any[]): R method. Import the pipe in any standalone component that uses it (via the imports array). Use it in templates as {{ value | pipeName:arg1:arg2 }}."
    },
    {
      q: 'What is the PipeTransform interface?',
      a: "PipeTransform is a TypeScript interface from @angular/core with one required method: transform(value: any, ...args: any[]): any. By implementing this interface, the class declares it is a valid pipe. The transform() method receives the piped value as the first argument, and any pipe arguments (:arg1:arg2) as subsequent parameters."
    },
    {
      q: 'How do you pass arguments to a custom pipe?',
      a: "In the template, pipe arguments follow the pipe name separated by colons: {{ text | truncate:150:'...' }}. In the transform() method, they map to parameters after value: transform(value: string, limit = 100, ellipsis = '...'). Multiple arguments: {{ value | myPipe:arg1:arg2:arg3 }} → transform(value, arg1, arg2, arg3)."
    },
    {
      q: 'Should custom pipes be pure or impure by default and why?',
      a: 'Custom pipes should always be pure (the default) unless you have a specific reason for impurity. Pure pipes are memoized — they only run when the input reference changes, which is very efficient. Make a pipe impure only when it must detect changes inside mutable objects/arrays or depends on external state that changes without triggering a new reference.'
    },
    {
      q: 'How do you use a custom pipe inside a component class (not just template)?',
      a: "Inject the pipe using Angular's DI: constructor(private truncate: TruncatePipe) — but you must add the pipe to the providers array for injection. Then call it directly: this.truncate.transform(text, 100). Alternatively, import and instantiate directly: const pipe = new TruncatePipe(); pipe.transform(text). The provider approach integrates better with testing."
    },
    {
      q: 'How do you register a custom pipe in a standalone component vs NgModule?',
      a: "Standalone: add standalone: true in @Pipe, then add the pipe class to the component's imports array: @Component({ imports: [TruncatePipe] }). NgModule: add the pipe to the NgModule's declarations array, and optionally exports if other modules need it. With standalone, no NgModule registration is needed at all."
    },
    {
      q: 'What are best practices for naming and organizing custom pipes?',
      a: "Naming: use camelCase for the pipe name, descriptive of what it does: 'truncate', 'phoneFormat', 'relativeTime'. File naming: truncate.pipe.ts. Keep pipes in a shared/pipes folder or colocate with the feature if feature-specific. Always implement PipeTransform for type safety. Handle null/undefined inputs gracefully — always check if value exists before processing."
    },
  ];
}
