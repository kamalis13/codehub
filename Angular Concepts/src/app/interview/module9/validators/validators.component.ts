import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validators.component.html',
  styleUrl: './validators.component.css'
})
export class ValidatorsComponent {

  syntaxCode = [
    '// Built-in Validators',
    'Validators.required',
    'Validators.min(18)',
    'Validators.max(100)',
    'Validators.minLength(3)',
    'Validators.maxLength(50)',
    'Validators.email',
    'Validators.pattern(/^[a-zA-Z]+$/)',
    'Validators.nullValidator       // always returns null (no-op)',
    'Validators.requiredTrue        // checkbox must be checked',
    '',
    '// Compose multiple validators',
    'Validators.compose([Validators.required, Validators.email])',
    '// or pass an array directly — Angular handles composition:',
    "new FormControl('', [Validators.required, Validators.email])",
    '',
    '// Validator function return type',
    '// ValidationErrors | null',
    '',
    '// Validator signature',
    'function myValidator(control: AbstractControl): ValidationErrors | null {',
    "  return control.value === 'bad' ? { forbidden: true } : null;",
    '}'
  ].join('\n');

  exampleCode = [
    '// registration-form.component.ts',
    'export class RegistrationFormComponent {',
    '  form = this.fb.group({',
    "    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],",
    "    email:    ['', [Validators.required, Validators.email]],",
    "    age:      ['', [Validators.required, Validators.min(18), Validators.max(120)]],",
    "    website:  ['', Validators.pattern(/^https?:\\/\\/.+/)]",
    '  });',
    '}',
    '',
    '// Error display in template:',
    "// <div *ngIf=\"form.get('username')?.invalid && form.get('username')?.touched\">",
    "//   <span *ngIf=\"form.get('username')?.errors?.['required']\">",
    "//     Username is required",
    "//   </span>",
    "//   <span *ngIf=\"form.get('username')?.errors?.['minlength']\">",
    "//     Minimum 3 characters required",
    "//   </span>",
    "//   <span *ngIf=\"form.get('username')?.errors?.['maxlength']\">",
    "//     Maximum 20 characters allowed",
    "//   </span>",
    "// </div>",
    "// <div *ngIf=\"form.get('email')?.invalid && form.get('email')?.touched\">",
    "//   <span *ngIf=\"form.get('email')?.errors?.['required']\">Email is required</span>",
    "//   <span *ngIf=\"form.get('email')?.errors?.['email']\">Invalid email format</span>",
    '// </div>'
  ].join('\n');

  interviewQA = [
    {
      q: 'What are the built-in Angular validators and what does each check?',
      a: "required: non-empty value. email: valid email format. min(n)/max(n): numeric range. minLength(n)/maxLength(n): string length. pattern(regex): regex match against the full value. nullValidator: always returns null (useful as a placeholder). requiredTrue: value must be exactly true (for checkboxes). compose([...]): combines multiple validators into one function."
    },
    {
      q: 'How do you compose multiple validators, and is Validators.compose() different from an array?',
      a: 'Both achieve the same result. Validators.compose([v1, v2]) returns a single composed validator function. Passing an array directly as the second argument to FormControl is syntactic sugar — Angular calls Validators.compose() internally. Either form is acceptable; the array form is more common and concise in practice.'
    },
    {
      q: 'What is the difference between Validators.minLength and the HTML minlength attribute?',
      a: "Validators.minLength integrates with Angular's form model and adds a 'minlength' error key to the control's errors object, enabling programmatic checks and reactive error display. The HTML minlength attribute triggers native browser validation, which is unrelated to Angular's control status and cannot be read via control.errors."
    },
    {
      q: 'How do you display specific validation errors in the template?',
      a: "Access control.errors with optional chaining: form.get('field')?.errors?.['required']. Wrap each error message in *ngIf. Show the container only when the control is invalid and touched (or the form has been submitted) to avoid showing errors before the user interacts with the field."
    },
    {
      q: 'How do async validators differ from sync validators, and when does the pending state appear?',
      a: "Async validators are passed as the third argument to FormControl and must return Observable<ValidationErrors | null> or Promise<ValidationErrors | null>. The control's status becomes PENDING immediately after sync validators pass and async validators are invoked. It resolves to VALID or INVALID once the Observable/Promise completes."
    },
    {
      q: 'How do you use Validators.pattern and what are common regex patterns?',
      a: "Pass a RegExp or regex string to Validators.pattern(). It anchors the match (checks the entire value). Common examples: phone /^\\d{10}$/, alphanumeric /^[a-zA-Z0-9]+$/, URL /^https?:\\/\\/.+/, strong password /^(?=.*[A-Z])(?=.*\\d).{8,}$/. The error key is 'pattern' with requiredPattern and actualValue info."
    }
  ];
}
