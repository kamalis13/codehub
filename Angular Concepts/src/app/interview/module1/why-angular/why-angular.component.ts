import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-angular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-angular.component.html',
  styleUrl: './why-angular.component.css',
})
export class WhyAngularComponent {
  syntaxCode = [
    '// ❌ Vanilla JS — manual DOM manipulation, no structure',
    'const btn = document.getElementById("submitBtn");',
    'btn.addEventListener("click", () => {',
    '  const val = document.getElementById("input").value;',
    '  document.getElementById("output").innerText = val;',
    '});',
    '',
    '// ✅ Angular — declarative, reactive, structured',
    '@Component({',
    '  template: `',
    '    <input [(ngModel)]="userInput" />',
    '    <button (click)="submit()">Submit</button>',
    '    <p>{{ message }}</p>',
    '  `',
    '})',
    'export class FormComponent {',
    '  userInput = "";',
    '  message = "";',
    '  submit() { this.message = this.userInput; }',
    '}',
  ].join('\n');

  exampleCode = [
    '// Enterprise HR Portal — why Angular wins at scale',
    '',
    '// 1. Dependency Injection — swap implementations easily',
    '@Injectable({ providedIn: "root" })',
    'export class EmployeeService {',
    '  constructor(private http: HttpClient) {}',
    '  getEmployees(): Observable<Employee[]> {',
    '    return this.http.get<Employee[]>("/api/employees");',
    '  }',
    '}',
    '',
    '// 2. TypeScript — catches errors at compile time',
    'interface Employee { id: number; name: string; dept: string; }',
    '',
    '// 3. Lazy Loading — load only what the user needs',
    'const routes: Routes = [',
    '  { path: "hr", loadChildren: () =>',
    '      import("./hr/hr.module").then(m => m.HrModule) },',
    '  { path: "payroll", loadChildren: () =>',
    '      import("./payroll/payroll.module").then(m => m.PayrollModule) },',
    '];',
  ].join('\n');

  interviewQA = [
    {
      q: 'Why should you choose Angular over plain JavaScript or jQuery?',
      a: 'Angular solves problems that vanilla JS leaves to the developer: two-way data binding eliminates manual DOM updates, the DI system manages object creation and lifecycle, the Router handles navigation without page reloads, and TypeScript catches bugs at compile time. jQuery is a DOM utility library — it provides no structure, no state management, and no component model for building complex applications.',
    },
    {
      q: 'Why is Angular considered enterprise-grade?',
      a: 'Angular is opinionated and provides a consistent, standardized architecture across large teams. Built-in TypeScript, a hierarchical DI system, lazy loading, AOT compilation, comprehensive CLI tooling, and strong conventions (module/component/service separation) make large codebases maintainable. Google uses Angular internally at massive scale, validating its enterprise fit.',
    },
    {
      q: 'How does Angular compare to React?',
      a: 'React is a UI rendering library that requires assembling your own stack (Redux for state, React Router for routing, etc.), offering flexibility at the cost of decision fatigue. Angular is a complete, opinionated framework with everything included. Angular enforces structure, making it better for large teams; React\'s flexibility suits smaller teams or UI-heavy apps needing fine-grained control.',
    },
    {
      q: 'What makes Angular TypeScript-first?',
      a: 'Angular is built entirely in TypeScript and requires TypeScript — it is not optional. Decorators (@Component, @Injectable), interfaces for services, strong typing of HTTP responses, and strict template type checking (with Ivy) all depend on TypeScript. This means type errors in templates are caught at build time, not runtime, dramatically reducing production bugs.',
    },
    {
      q: 'What is the Angular dependency injection system?',
      a: 'Angular\'s DI system is a hierarchical injector tree where services can be provided at the root level (available app-wide), module level, or component level. Angular\'s injector creates and caches service instances, resolving dependencies automatically via constructor injection. This makes services easily testable by injecting mock implementations in tests.',
    },
    {
      q: 'When would you NOT choose Angular?',
      a: 'Angular may be overkill for simple static websites, landing pages, or small projects where the learning curve and bundle overhead are not justified. For a simple blog or marketing site, Next.js or plain HTML/CSS is more appropriate. Angular shines in complex SPAs, enterprise dashboards, and large multi-team projects where structure and tooling pay dividends.',
    },
  ];
}
