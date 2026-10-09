import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-validators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-validators.component.html',
  styleUrl: './custom-validators.component.css'
})
export class CustomValidatorsComponent {

  syntaxCode = [
    '// 1. Synchronous validator function signature',
    'function myValidator(control: AbstractControl): ValidationErrors | null {',
    "  return control.value === 'bad' ? { forbidden: true } : null;",
    '}',
    '',
    '// 2. Asynchronous validator function signature',
    'function asyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {',
    '  return someService.check(control.value).pipe(',
    '    map(result => result.taken ? { taken: true } : null)',
    '  );',
    '}',
    '',
    '// 3. Cross-field validator at FormGroup level',
    'function passwordMatch(group: AbstractControl): ValidationErrors | null {',
    "  const pw  = group.get('password')?.value;",
    "  const cpw = group.get('confirmPassword')?.value;",
    '  return pw !== cpw ? { passwordMismatch: true } : null;',
    '}',
    '',
    '// 4. Applying custom validators',
    "new FormControl('', myValidator);                        // sync on control",
    "new FormControl('', null, asyncValidator);               // async on control",
    "this.fb.group({ ... }, { validators: passwordMatch })    // sync on group"
  ].join('\n');

  exampleCode = [
    '// 1. passwordMatch — cross-field validator applied at FormGroup level',
    'export function passwordMatch(group: AbstractControl): ValidationErrors | null {',
    "  const pw  = group.get('password')?.value;",
    "  const cpw = group.get('confirmPassword')?.value;",
    '  return pw && cpw && pw !== cpw ? { passwordMismatch: true } : null;',
    '}',
    '',
    '// 2. usernameAvailable — async validator using factory pattern',
    'export function usernameAvailableFactory(userService: UserService) {',
    '  return (control: AbstractControl): Observable<ValidationErrors | null> => {',
    '    return timer(300).pipe(',
    '      switchMap(() => userService.checkUsername(control.value)),',
    '      map(taken => taken ? { usernameTaken: true } : null),',
    '      first()',
    '    );',
    '  };',
    '}',
    '',
    '// 3. Usage in FormBuilder',
    'export class RegisterComponent {',
    '  form = this.fb.group({',
    "    username:        ['', Validators.required, usernameAvailableFactory(this.userService)],",
    "    password:        ['', Validators.required],",
    "    confirmPassword: ['', Validators.required]",
    '  }, { validators: passwordMatch });',
    '}',
    '',
    '// Template — show cross-field error',
    "// *ngIf=\"form.errors?.['passwordMismatch'] && form.get('confirmPassword')?.touched\"",
    '//   Passwords do not match'
  ].join('\n');

  interviewQA = [
    {
      q: 'How do you write a synchronous custom validator?',
      a: "Write a function that accepts AbstractControl and returns ValidationErrors | null. Return null for valid, or an object like { myError: true } for invalid. Pass it as the second argument to FormControl or include it in the validators array. The error key you return appears in control.errors and can be read in the template."
    },
    {
      q: 'How do you write an asynchronous custom validator?',
      a: "Write a function that accepts AbstractControl and returns Observable<ValidationErrors | null> or Promise<ValidationErrors | null>. Always call first() or take(1) to complete the Observable so Angular can resolve the status. Pass it as the third argument to FormControl. The control status becomes PENDING until it resolves to VALID or INVALID."
    },
    {
      q: 'How do you implement cross-field validation such as password confirmation?',
      a: "Apply the validator at the FormGroup level, not on an individual FormControl. The validator receives the AbstractControl representing the FormGroup; use group.get('fieldName') to read child values. Attach it via: fb.group({...}, { validators: passwordMatch }). The error appears on form.errors, not on an individual control's errors."
    },
    {
      q: 'How do you use a custom validator in reactive forms?',
      a: "For a sync validator: new FormControl('', myValidator) or new FormControl('', [Validators.required, myValidator]). For an async validator: new FormControl('', null, myAsyncValidator). For a FormGroup-level validator: fb.group({...}, { validators: myGroupValidator, asyncValidators: myAsyncGroupValidator })."
    },
    {
      q: 'How do you use a custom validator in template-driven forms?',
      a: "Create a directive that implements the Validator interface (or AsyncValidator) and provides itself using the NG_VALIDATORS token (or NG_ASYNC_VALIDATORS). Implement the validate(control: AbstractControl) method with the same signature as a reactive validator. Apply the directive as an attribute on the input element and Angular calls it automatically during validation."
    },
    {
      q: 'When does the PENDING state appear with async validators?',
      a: "PENDING appears immediately after all synchronous validators pass and async validators are invoked. The control remains PENDING until every async validator's Observable or Promise completes. After resolution, status transitions to VALID or INVALID. Show a spinner in the template using *ngIf=\"control.pending\" to give users feedback during the async check."
    },
    {
      q: 'How can a validator access the parent form from inside a control validator?',
      a: "Use control.parent to get the parent FormGroup or FormArray. For example: const group = control.parent as FormGroup; const otherValue = group?.get('otherField')?.value;. Guard with a null check because parent may be null on the first call before the control is attached to the group during form initialization."
    }
  ];
}
