import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-intro.component.html',
  styleUrl: './services-intro.component.css'
})
export class ServicesIntroComponent {
  syntaxCode = [
    "import { Injectable } from '@angular/core';",
    '',
    '@Injectable({',
    "  providedIn: 'root'  // registered at root level — singleton",
    '})',
    'export class UserService {',
    '  private users: string[] = [];',
    '',
    '  getUsers(): string[] {',
    '    return this.users;',
    '  }',
    '',
    '  addUser(name: string): void {',
    '    this.users.push(name);',
    '  }',
    '}'
  ].join('\n');

  exampleCode = [
    '// user.service.ts',
    "@Injectable({ providedIn: 'root' })",
    'export class UserService {',
    '  constructor(private http: HttpClient) {}',
    '',
    '  getUsers(): Observable<User[]> {',
    "    return this.http.get<User[]>('https://api.example.com/users');",
    '  }',
    '}',
    '',
    '// user.component.ts',
    'export class UserComponent implements OnInit {',
    '  users: User[] = [];',
    '',
    '  constructor(private userService: UserService) {}',
    '',
    '  ngOnInit(): void {',
    '    this.userService.getUsers().subscribe(u => this.users = u);',
    '  }',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is an Angular Service?',
      a: 'A service is a class decorated with @Injectable that encapsulates reusable business logic, data access, or shared state. Components delegate non-UI work to services, keeping themselves lean and testable.'
    },
    {
      q: "What does providedIn: 'root' mean?",
      a: "It registers the service in the root injector, making it a singleton shared across the entire application. Angular creates only one instance of the service for the whole app lifecycle."
    },
    {
      q: 'Why separate services from components?',
      a: 'Separation of concerns — components handle UI and user interaction; services handle business logic and data access. This makes both independently testable and the codebase maintainable.'
    },
    {
      q: 'What is the @Injectable decorator?',
      a: "@Injectable marks a class as available for Angular's dependency injection system. Without it, Angular cannot inject the class into other classes. It also carries metadata about how to create the service."
    },
    {
      q: "When would you use providedIn: 'any'?",
      a: "'any' creates a unique instance for each lazy-loaded module, isolating state per module. Use it when each lazy-loaded feature needs its own separate service instance rather than sharing the root singleton."
    },
    {
      q: 'How do services differ from plain TypeScript classes?',
      a: "Services use @Injectable so Angular's DI system manages their lifecycle and injects dependencies into them automatically. Plain classes must be manually instantiated with new, making DI and testing harder."
    }
  ];
}
