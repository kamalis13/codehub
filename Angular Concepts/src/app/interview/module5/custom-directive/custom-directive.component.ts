import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-directive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-directive.component.html',
  styleUrl: './custom-directive.component.css'
})
export class CustomDirectiveComponent {

  syntaxCode = [
    '// 1. Declare the directive',
    "import { Directive, Input, HostListener, HostBinding, ElementRef } from '@angular/core';",
    '',
    "@Directive({",
    "  selector: '[appTooltip]',",
    '  standalone: true',
    '})',
    'export class TooltipDirective {',
    "  @Input('appTooltip') tooltipText = '';",
    "  @Input() tooltipPosition: 'top' | 'bottom' = 'top';",
    '',
    "  @HostBinding('attr.title') get title() {",
    '    return this.tooltipText;',
    '  }',
    '',
    "  @HostListener('mouseenter') onEnter() {",
    '    this.showTooltip();',
    '  }',
    '',
    "  @HostListener('mouseleave') onLeave() {",
    '    this.hideTooltip();',
    '  }',
    '',
    '  private showTooltip() { /* render tooltip */ }',
    '  private hideTooltip() { /* remove tooltip */ }',
    '}',
    '',
    '// 2. Use it in a template (import in component)',
    '<button appTooltip="Save your changes" tooltipPosition="top">',
    '  Save',
    '</button>',
  ].join('\n');

  exampleCode = [
    '// copy-to-clipboard.directive.ts',
    "import { Directive, Input, HostListener, HostBinding } from '@angular/core';",
    '',
    "@Directive({ selector: '[appCopyToClipboard]', standalone: true })",
    'export class CopyToClipboardDirective {',
    "  @Input('appCopyToClipboard') textToCopy = '';",
    '',
    "  @HostBinding('style.cursor') cursor = 'pointer';",
    "  @HostBinding('attr.title') title = 'Click to copy';",
    '',
    '  copied = false;',
    '',
    "  @HostListener('click') async onClick() {",
    '    try {',
    '      await navigator.clipboard.writeText(this.textToCopy);',
    '      this.title = \'Copied!\';',
    '      this.copied = true;',
    '      setTimeout(() => {',
    '        this.title = \'Click to copy\';',
    '        this.copied = false;',
    '      }, 2000);',
    '    } catch (e) {',
    "      console.error('Copy failed', e);",
    '    }',
    '  }',
    '}',
    '',
    '// Usage in template',
    '<code appCopyToClipboard="npm install @angular/core">',
    '  npm install @angular/core',
    '</code>',
    '',
    '<span appCopyToClipboard="user@example.com">',
    '  user@example.com 📋',
    '</span>',
  ].join('\n');

  interviewQA = [
    {
      q: 'How do you create a custom attribute directive in Angular?',
      a: "Create a class decorated with @Directive({ selector: '[appMyDir]', standalone: true }). Inject ElementRef (for DOM access) or use @HostBinding/@HostListener for declarative host manipulation. Export and import the directive in any standalone component that uses it. The directive is applied as an attribute: <div appMyDir>."
    },
    {
      q: 'What is @HostListener and what events can it listen to?',
      a: "@HostListener('eventName') decorates a directive method to handle a DOM event on the host element. It can listen to any native DOM event: 'click', 'mouseenter', 'mouseleave', 'keydown', 'focus', 'blur', 'scroll', etc. You can pass the event object: @HostListener('click', ['\\$event']) onClick(e: MouseEvent). Multiple @HostListener decorators can be stacked on one class."
    },
    {
      q: 'What is @HostBinding and what can it bind to?',
      a: "@HostBinding('property') binds a directive property to a host element property. Common bindings: 'class.active' (CSS class toggle), 'style.color' (inline style), 'attr.disabled' (HTML attribute), 'style.backgroundColor'. It eliminates the need for ElementRef for most style/class/attribute bindings. The value updates reactively during change detection."
    },
    {
      q: 'How do you pass configuration to a custom directive via @Input?',
      a: "Use @Input() in the directive class. For shorthand input matching the selector: @Input('appTooltip') text = '' — then <p appTooltip=\"Hello\">. For additional options: @Input() position = 'top' — then <p appTooltip=\"Hi\" position=\"bottom\">. You can also use a setter @Input() set config(v) to react to input changes."
    },
    {
      q: 'Why is ElementRef considered unsafe and what is the safer alternative?',
      a: "ElementRef.nativeElement gives direct DOM access, which bypasses Angular's sanitization and breaks server-side rendering. The safer alternatives are: (1) @HostBinding for property/attribute/class/style bindings, (2) Renderer2 service for programmatic DOM manipulation that works with SSR and sanitization. Only use nativeElement as a last resort for non-Angular libraries."
    },
    {
      q: 'What is Renderer2 and when should you use it in a directive?',
      a: "Renderer2 is an Angular abstraction over the DOM's native API. It provides methods like setStyle, removeClass, setAttribute, createElement, and appendChild. Use it when @HostBinding doesn't cover your need (e.g., creating child elements, adding dynamic classes to a different element). Inject it via constructor: constructor(private renderer: Renderer2, private el: ElementRef)."
    },
    {
      q: 'How does a directive differ from a component in Angular DI?',
      a: "Both directives and components participate in Angular's Dependency Injection. However, components create their own injector node in the component tree, while directives share the injector of their host element. A directive can inject its host component by type, useful for interacting with the parent: constructor(private host: MyComponent) {}."
    },
  ];
}
