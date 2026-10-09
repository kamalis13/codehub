import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.css'
})
export class FormControlComponent {

  syntaxCode = [
    '// Create a FormControl',
    'const control = new FormControl(initialValue, validators);',
    '',
    '// Read value and validity',
    'control.value          // current value',
    'control.valid          // true if all validators pass',
    'control.invalid        // true if any validator fails',
    'control.dirty          // true after user has changed the value',
    'control.pristine       // true before any user change',
    'control.touched        // true after user blurs the field',
    'control.untouched      // true before user focuses/blurs',
    '',
    '// Programmatic control',
    'control.disable();',
    'control.enable();',
    "control.setValue('newValue');",
    "control.patchValue('partial');",
    'control.reset();',
    '',
    '// Observe changes',
    'control.valueChanges.subscribe(val => console.log(val));',
    'control.statusChanges.subscribe(status => console.log(status));'
  ].join('\n');

  exampleCode = [
    '// username-form.component.ts',
    'export class UsernameFormComponent {',
    "  username = new FormControl('', [Validators.required, Validators.minLength(3)],",
    '    [this.usernameAvailable.bind(this)]);',
    '',
    '  usernameAvailable(control: AbstractControl): Observable<ValidationErrors | null> {',
    '    return this.userService.checkUsername(control.value).pipe(',
    '      debounceTime(300),',
    '      distinctUntilChanged(),',
    "      map(taken => taken ? { usernameTaken: true } : null)",
    '    );',
    '  }',
    '}',
    '',
    '// Template patterns:',
    '// *ngIf="username.pending"                    → show spinner',
    '// *ngIf="username.invalid && username.touched"',
    "//   *ngIf=\"username.errors?.['required']\"      → Field is required",
    "//   *ngIf=\"username.errors?.['minlength']\"     → Minimum 3 characters",
    "//   *ngIf=\"username.errors?.['usernameTaken']\" → Username already taken",
    '',
    '// Reactive pipeline',
    'this.username.valueChanges.pipe(',
    '  debounceTime(300),',
    '  distinctUntilChanged()',
    ").subscribe(val => console.log('Value changed:', val));"
  ].join('\n');

  interviewQA = [
    {
      q: 'What is FormControl and what does it track?',
      a: "FormControl is the most granular building block of Angular reactive forms. It tracks a single form element's value, validation status, and user interaction states (dirty/pristine, touched/untouched). It extends AbstractControl and emits valueChanges and statusChanges observables."
    },
    {
      q: 'What are the 6 control states of a FormControl and when is each set?',
      a: 'valid/invalid: determined by validators after every value change. dirty: set after the user changes the value for the first time. pristine: the initial state before any user change. touched: set after the user focuses and then blurs the field. untouched: initial state before any focus/blur cycle. pending: set while async validators are running.'
    },
    {
      q: 'What is valueChanges and what are its practical uses?',
      a: 'valueChanges is an Observable that emits the latest value on every change. Practical uses include: debouncing API calls for typeahead search, enabling or disabling other controls conditionally, cross-field validation, live character count, and logging user input for analytics.'
    },
    {
      q: 'Why are disabled controls excluded from form.value but included in form.getRawValue()?',
      a: 'Angular excludes disabled controls from form.value to match standard HTML form behavior (disabled inputs are not submitted). Use getRawValue() when you need the complete model including disabled fields — e.g., a read-only field that still needs to be sent to the server.'
    },
    {
      q: 'What is the difference between setValue and patchValue on a FormControl?',
      a: "On a standalone FormControl both behave identically — they set the control's value. The distinction matters on FormGroup/FormArray: setValue requires a complete object matching all controls (strict), while patchValue accepts a partial object and silently ignores missing keys (lenient)."
    },
    {
      q: 'How do async validators work and what is the pending state?',
      a: "Async validators are provided as the third argument to FormControl and must return Observable<ValidationErrors | null> or Promise<ValidationErrors | null>. While awaiting the result, the control's status is PENDING. Angular runs sync validators first; if they pass, async validators are called. statusChanges emits PENDING then VALID or INVALID."
    },
    {
      q: 'How does FormControl integrate with FormGroup and FormArray?',
      a: "FormControl is nested inside FormGroup (keyed by name) or FormArray (indexed by position). The parent aggregates all child control states — the group is valid only if every control is valid. FormBuilder.group() wraps primitive values into FormControls automatically, and FormGroup.get('name') retrieves a specific control for direct manipulation."
    }
  ];
}
