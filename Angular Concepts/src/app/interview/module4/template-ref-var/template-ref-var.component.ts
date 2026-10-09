import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-ref-var',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-ref-var.component.html',
  styleUrl: './template-ref-var.component.css',
})
export class TemplateRefVarComponent {
  syntaxCode = [
    '<!-- #varName on a plain DOM element — ref to HTMLElement -->',
    '<input #emailInput type="email" placeholder="Enter email">',
    '<button (click)="log(emailInput.value)">Log Value</button>',
    '',
    '<!-- #varName on a form — ref to NgForm directive instance -->',
    '<form #loginForm="ngForm" (submit)="onSubmit(loginForm)">',
    '  <input name="email" ngModel required>',
    '  <button [disabled]="loginForm.invalid">Login</button>',
    '</form>',
    '',
    '<!-- Passing ref to a method -->',
    '<input #phoneInput>',
    '<button (click)="validatePhone(phoneInput)">Validate</button>',
    '',
    '<!-- Ref to child component instance -->',
    '<app-video-player #player></app-video-player>',
    '<button (click)="player.play()">Play</button>',
    '<button (click)="player.pause()">Pause</button>',
    '',
    '<!-- ng-template ref for structural directives -->',
    '<ng-template #loadingTpl>',
    '  <p>Loading...</p>',
    '</ng-template>',
    '<ng-container *ngTemplateOutlet="loadingTpl"></ng-container>',
  ].join('\n');

  exampleCode = [
    '// contact-form.component.ts',
    'export class ContactFormComponent {',
    '  onSubmit(form: NgForm): void {',
    '    if (form.valid) {',
    '      this.contactService.send(form.value);',
    '      form.resetForm();   // reset all fields and validation state',
    '    }',
    '  }',
    '',
    '  focusField(el: HTMLInputElement): void {',
    '    el.focus();',
    '    el.select();',
    '  }',
    '}',
    '',
    '<!-- contact-form.component.html -->',
    '<form #contactForm="ngForm" (submit)="onSubmit(contactForm)">',
    '  <input #nameInput name="name" ngModel required placeholder="Your name">',
    '  <button type="button" (click)="focusField(nameInput)">',
    '    Focus Name',
    '  </button>',
    '',
    '  <input name="email" ngModel email required placeholder="Email">',
    '',
    '  <p *ngIf="contactForm.submitted && contactForm.invalid">',
    '    Please fix errors above.',
    '  </p>',
    '',
    '  <button type="submit" [disabled]="contactForm.invalid">Send</button>',
    '</form>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is a template reference variable in Angular?',
      a: 'A template reference variable is a local variable declared in the HTML template using the # prefix (e.g., #inputRef). It holds a reference to the DOM element, Angular directive, or component instance it is placed on. The variable is accessible anywhere in the same template, allowing you to read properties or call methods without ViewChild.',
    },
    {
      q: 'What does a template reference variable point to?',
      a: 'On a plain DOM element (#ref), it points to the HTMLElement. On an Angular directive (#ref="directiveName"), it points to the directive instance. On a component (#ref), it points to the component instance. On an ng-template (#ref), it points to a TemplateRef object. The = exportAs assignment controls which directive instance is captured when multiple directives are on the same element.',
    },
    {
      q: 'What is the scope of a template reference variable?',
      a: 'A template reference variable is scoped to the template it is declared in. Inside a structural directive like *ngIf or *ngFor, the variable is scoped to that directive\'s embedded view and is NOT accessible outside it. This is a common source of "Property does not exist" errors when devs try to use a #ref declared inside an *ngIf block from outside.',
    },
    {
      q: 'What is the difference between a template reference variable and ViewChild?',
      a: 'A template reference variable is accessible only in the template — you cannot use it directly in the component\'s TypeScript class. @ViewChild accesses the same element or component from the TypeScript class, available after ngAfterViewInit. Use template variables for simple template-only access (e.g., passing to a method); use ViewChild when you need programmatic access in the component class.',
    },
    {
      q: 'How do you access NgForm through a template reference variable?',
      a: 'Use the exportAs name of the directive: <form #myForm="ngForm">. This sets #myForm to the NgForm directive instance (not the HTMLFormElement). You can then read myForm.valid, myForm.value, myForm.submitted, and call myForm.resetForm() or myForm.setValue(). Without ="ngForm", #myForm would point to the HTMLFormElement, which lacks these Angular-specific properties.',
    },
    {
      q: 'Can you access a template reference variable from the TypeScript class directly?',
      a: 'No — template reference variables are only available in the template. To access a referenced element or component from the class, use @ViewChild("refName") or @ViewChild(ComponentType). The component or element becomes available in the ngAfterViewInit lifecycle hook. @ViewChildren gives a QueryList when multiple elements share the same ref name or selector.',
    },
  ];
}
