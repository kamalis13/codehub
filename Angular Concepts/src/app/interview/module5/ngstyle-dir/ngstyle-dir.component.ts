import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngstyle-dir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngstyle-dir.component.html',
  styleUrl: './ngstyle-dir.component.css'
})
export class NgstyleDirComponent {

  syntaxCode = [
    '// [ngStyle] with object of CSS properties',
    '<div [ngStyle]="{ \'color\': textColor, \'font-size\': fontSize + \'px\' }">',
    '  Styled text',
    '</div>',
    '',
    '// Binding to a computed style object',
    '<div [ngStyle]="cardStyles">Card</div>',
    '// In component:',
    '// cardStyles = { backgroundColor: \'#f0f0f0\', borderRadius: \'8px\' }',
    '',
    '// Single style shorthand (alternative to ngStyle for one property)',
    '<div [style.color]="textColor">Text</div>',
    '<div [style.font-size.px]="fontSize">Text</div>',
    '<div [style.margin-top.rem]="spacing">Text</div>',
    '',
    '// With unit suffix in the binding key',
    '<div [style.width.%]="progressPercent">Progress</div>',
  ].join('\n');

  exampleCode = [
    '// progress-bar.component.ts',
    'export class ProgressBarComponent {',
    '  @Input() progress = 0;   // 0 to 100',
    "  @Input() color = '#4caf50';",
    "  @Input() bgColor = '#e0e0e0';",
    '',
    '  get barStyles() {',
    '    return {',
    "      width: this.progress + '%',",
    "      backgroundColor: this.color,",
    "      transition: 'width 0.4s ease',",
    "      height: '20px',",
    "      borderRadius: '10px',",
    '    };',
    '  }',
    '',
    '  get containerStyles() {',
    '    return {',
    "      backgroundColor: this.bgColor,",
    "      borderRadius: '10px',",
    "      overflow: 'hidden',",
    '    };',
    '  }',
    '}',
    '',
    '// progress-bar.component.html',
    '<div class="progress-container" [ngStyle]="containerStyles">',
    '  <div class="progress-fill" [ngStyle]="barStyles">',
    '    <span>{{ progress }}%</span>',
    '  </div>',
    '</div>',
    '',
    '// Usage',
    '<app-progress-bar [progress]="75" color="#2196f3">',
    '</app-progress-bar>',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is [ngStyle] and how does it work?',
      a: "[ngStyle] is a built-in attribute directive that sets one or more inline styles on a DOM element based on an object expression. The object keys are CSS property names (camelCase or kebab-case), and the values are the style values. Example: [ngStyle]=\"{ 'background-color': color, fontSize: size + 'px' }\". It merges with existing inline styles."
    },
    {
      q: 'What is the difference between [ngStyle] and [style.property]?',
      a: "[style.color]=\"expr\" is a single-style binding — clean and direct for one property. [style.font-size.px]=\"size\" even handles units. [ngStyle] is for setting multiple styles at once using an object. Best practice: use [style.property] for single styles (more readable), and [ngStyle] when setting many styles from a computed object."
    },
    {
      q: 'How do you include units in [ngStyle] bindings?',
      a: "With [ngStyle], include units in the value string: [ngStyle]=\"{ 'font-size': fontSize + 'px' }\". With [style.property] binding, use the unit suffix in the key: [style.font-size.px]=\"fontSize\" or [style.width.%]=\"progress\" — Angular automatically appends the unit. The unit-suffix syntax is cleaner and type-safe."
    },
    {
      q: 'When should you avoid [ngStyle] and use CSS classes instead?',
      a: "Avoid [ngStyle] for static or predictable styles — those belong in CSS classes. Use [ngStyle] only for truly dynamic values like user-controlled colors, component-input dimensions, calculated positions/widths. Inline styles have higher specificity and can make debugging harder. Prefer [ngClass] + CSS classes over [ngStyle] when possible."
    },
    {
      q: 'Does [ngStyle] accept camelCase or kebab-case property names?',
      a: "Both work. 'background-color' (kebab) and 'backgroundColor' (camelCase) are both valid in the ngStyle object. However, when keys contain hyphens, they must be quoted: { 'background-color': red }. CamelCase doesn't need quotes: { backgroundColor: 'red' }. Angular handles both formats internally."
    },
    {
      q: 'Can [ngStyle] animate style changes?',
      a: "Yes, if you include a CSS transition property in the style object or in your CSS. Example: [ngStyle]=\"{ width: progress + '%', transition: 'width 0.4s ease' }\". Angular updates the style, and the browser's CSS transition engine handles the animation. For complex animations, use Angular Animations (@angular/animations) instead."
    },
    {
      q: 'What is the performance consideration with [ngStyle]?',
      a: 'Like [ngClass], if you pass an object literal directly in the template, Angular creates a new object reference every change detection cycle. This triggers NgStyle to re-apply styles even if nothing changed. Best practice: use a getter or a component field to return the style object. Use DoCheck if you need fine-grained control.'
    },
  ];
}
