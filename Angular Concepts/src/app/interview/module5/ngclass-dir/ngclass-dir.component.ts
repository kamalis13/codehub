import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngclass-dir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngclass-dir.component.html',
  styleUrl: './ngclass-dir.component.css'
})
export class NgclassDirComponent {

  syntaxCode = [
    '// String syntax — space-separated class names',
    '<div [ngClass]="\'btn btn-primary active\'">...</div>',
    '',
    '// Array syntax — each element is a class name',
    '<div [ngClass]="[\'btn\', \'btn-primary\', isActive ? \'active\' : \'\']">...</div>',
    '',
    '// Object syntax — { className: booleanExpression }',
    '<div [ngClass]="{',
    '  \'btn\': true,',
    '  \'btn-primary\': isPrimary,',
    '  \'active\': isActive,',
    '  \'disabled\': isDisabled',
    '}">...</div>',
    '',
    '// Binding to a computed object in the component',
    '<div [ngClass]="buttonClasses">...</div>',
    '// In component: buttonClasses = { active: true, disabled: false }',
    '',
    '// Single class shorthand (alternative)',
    '<div [class.active]="isActive">...</div>',
  ].join('\n');

  exampleCode = [
    '// form-field.component.ts',
    'export class FormFieldComponent {',
    "  fieldStatus: 'pristine' | 'valid' | 'invalid' | 'warning' = 'pristine';",
    '  isFocused = false;',
    '  isRequired = true;',
    '',
    '  get fieldClasses() {',
    '    return {',
    "      'field-pristine': this.fieldStatus === 'pristine',",
    "      'field-valid': this.fieldStatus === 'valid',",
    "      'field-invalid': this.fieldStatus === 'invalid',",
    "      'field-warning': this.fieldStatus === 'warning',",
    "      'field-focused': this.isFocused,",
    "      'field-required': this.isRequired,",
    '    };',
    '  }',
    '}',
    '',
    '// form-field.component.html',
    '<div class="form-field" [ngClass]="fieldClasses">',
    '  <label>Email</label>',
    '  <input type="email"',
    '         (focus)="isFocused = true"',
    '         (blur)="isFocused = false" />',
    '</div>',
    '',
    '// Toggle buttons (active state)',
    '<button *ngFor="let tab of tabs"',
    '        [ngClass]="{ active: tab === selectedTab }"',
    '        (click)="selectedTab = tab">',
    '  {{ tab }}',
    '</button>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What are the three ways to use [ngClass]?',
      a: "(1) String: [ngClass]=\"'btn active'\" — adds space-separated classes. (2) Array: [ngClass]=\"['btn', isPrimary ? 'btn-primary' : 'btn-secondary']\" — each element is a class. (3) Object: [ngClass]=\"{ 'active': isActive, 'disabled': isDisabled }\" — adds class when value is truthy. The object form is the most flexible and commonly used."
    },
    {
      q: 'What is the difference between [ngClass] and [class.name]?',
      a: "[class.name]=\"expr\" binds a single class based on one boolean expression — clean and performant. [ngClass] can handle multiple classes conditionally using the object syntax. Use [class.name] for toggling one class; use [ngClass] for conditionally applying multiple classes or when the class list is dynamic."
    },
    {
      q: 'Does [ngClass] replace static class attributes?',
      a: "No. [ngClass] merges with any static class attribute: <div class=\"btn\" [ngClass]=\"{ 'active': isActive }\"> — the element will always have btn class, and active will be added/removed dynamically. Static classes are preserved; [ngClass] only manages the dynamically bound classes."
    },
    {
      q: 'How do you toggle multiple classes based on a single condition?',
      a: "Use the object syntax: [ngClass]=\"{ 'text-success': isValid, 'bg-success': isValid, 'text-danger': !isValid, 'bg-danger': !isValid }\". Alternatively, compute a class object in the component as a getter: get statusClasses() { return { success: this.isValid, error: !this.isValid }; } and bind [ngClass]=\"statusClasses\"."
    },
    {
      q: 'Can [ngClass] accept an Observable or computed property?',
      a: "Yes. [ngClass] accepts any expression that evaluates to a string, array, or object. You can bind it to a getter (get myClasses() { return {...}; }), a computed signal (Angular 17+), or even combine with async pipe: [ngClass]=\"(status$ | async) === 'active' ? 'active-class' : 'inactive-class'\"."
    },
    {
      q: 'How does [ngClass] affect performance?',
      a: "Angular re-evaluates the [ngClass] expression on every change detection cycle. If the expression is an object literal in the template ({}), Angular creates a new object reference each cycle, causing DoCheck to flag a difference even if values haven't changed. Best practice: use a getter or a tracked field to avoid unnecessary class recalculations."
    },
    {
      q: 'What is the difference between [ngClass] and [class] binding?',
      a: "[class]=\"classString\" replaces the entire class attribute with the string value — it does not merge. [ngClass] adds/removes classes while preserving others. [class.active]=\"cond\" is a single-class toggle. For the most control with merging, [ngClass] with the object syntax is the safest choice."
    },
  ];
}
