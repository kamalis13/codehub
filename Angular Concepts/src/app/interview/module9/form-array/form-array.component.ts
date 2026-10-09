import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.css'
})
export class FormArrayComponent {

  syntaxCode = [
    '// Create a FormArray',
    'const arr = new FormArray([]);',
    'const arr = fb.array([]);',
    '',
    '// Add and remove controls',
    "skillsArray.push(new FormControl(''));",
    'skillsArray.removeAt(i);',
    'skillsArray.insert(index, new FormControl(\'\'));',
    'skillsArray.clear();',
    '',
    '// Access controls',
    'skillsArray.at(i);          // get control at index',
    'skillsArray.length;         // number of controls',
    'skillsArray.controls;       // array of AbstractControl',
    '',
    '// Casting from FormGroup',
    'get skills(): FormArray {',
    "  return this.form.get('skills') as FormArray;",
    '}'
  ].join('\n');

  exampleCode = [
    '// profile-form.component.ts',
    'export class ProfileFormComponent {',
    '  form = this.fb.group({',
    "    name: [''],",
    "    skills: this.fb.array([this.fb.control('')])",
    '  });',
    '',
    '  get skills(): FormArray {',
    "    return this.form.get('skills') as FormArray;",
    '  }',
    '',
    '  addSkill(): void {',
    "    this.skills.push(this.fb.control(''));",
    '  }',
    '',
    '  removeSkill(i: number): void {',
    '    this.skills.removeAt(i);',
    '  }',
    '}',
    '',
    '// Template:',
    '// <div formArrayName="skills">',
    '//   <div *ngFor="let skill of skills.controls; let i = index">',
    '//     <input [formControlName]="i" />',
    '//     <button (click)="removeSkill(i)">Remove</button>',
    '//   </div>',
    '// </div>',
    '// <button (click)="addSkill()">Add Skill</button>',
    '',
    '// FormArray of FormGroups (invoice line items):',
    '// lineItems = this.fb.array([',
    '//   this.fb.group({ description: [\'\'], qty: [1], price: [0] })',
    '// ])'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is FormArray and when should you use it?',
      a: 'FormArray manages an ordered, numerically-indexed list of AbstractControl instances. Use it when the number of controls is dynamic and unknown at design time — e.g., a list of skills, multiple address entries, or invoice line items that users can add or remove at runtime.'
    },
    {
      q: 'How do you add and remove controls in a FormArray dynamically?',
      a: "Use push(new FormControl(...)) to append a control and removeAt(index) to delete one by index. You can also use insert(index, control) to add at a specific position, or clear() to remove all controls at once. Always call these methods on the FormArray reference rather than directly mutating the controls array."
    },
    {
      q: 'How do you access individual controls in a FormArray?',
      a: 'Use at(i) to get the control at a specific index. The controls property returns the full array of AbstractControl instances, which you can iterate in templates with *ngFor. Both give you the typed AbstractControl — cast to FormControl or FormGroup when needed for type-safe access.'
    },
    {
      q: 'How does the formArrayName directive work in the template?',
      a: "The formArrayName directive binds a section of the template to a FormArray inside a parent formGroup. Child inputs use [formControlName]=\"i\" (the numeric index) to bind to individual controls. formArrayName must be a direct descendant of a formGroup or formGroupName directive, and it must match the key used in the parent FormGroup."
    },
    {
      q: 'How do you validate a FormArray — for example, requiring at least one item?',
      a: "Add a custom validator directly to the FormArray: fb.array([], minLengthArray(1)). The validator receives the FormArray as an AbstractControl; cast it to FormArray, check .length, and return null or { minLengthArray: true }. Display the error using form.get('skills')?.errors?.['minLengthArray']."
    },
    {
      q: 'What is the difference between a FormArray of FormControls versus a FormArray of FormGroups?',
      a: 'FormArray of FormControls holds simple scalar values (strings, numbers) — ideal for flat lists like tags or skills. FormArray of FormGroups holds complex objects — ideal for repeating sections with multiple related fields per row, such as an address list or invoice line items with quantity, unit price, and description per entry.'
    }
  ];
}
