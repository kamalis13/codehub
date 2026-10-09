import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angular-cli',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular-cli.component.html',
  styleUrl: './angular-cli.component.css',
})
export class AngularCliComponent {
  syntaxCode = [
    '# Install Angular CLI globally',
    'npm install -g @angular/cli',
    'ng version                           # Verify installation',
    '',
    '# Create new project',
    'ng new my-app --routing --style=scss --strict',
    '',
    '# Generate artifacts (ng generate / ng g)',
    'ng g component features/user-list    # Component',
    'ng g service core/auth               # Service',
    'ng g module features/admin --routing # Module with routing',
    'ng g directive shared/highlight      # Directive',
    'ng g pipe shared/truncate            # Pipe',
    'ng g guard core/auth                 # Route guard',
    'ng g interceptor core/http           # HTTP interceptor',
    '',
    '# Serve / Build',
    'ng serve --port 4200 --open          # Dev server with HMR',
    'ng build --configuration=production  # Production AOT build',
    '',
    '# Testing & Linting',
    'ng test --code-coverage              # Unit tests (Karma)',
    'ng e2e                               # End-to-end tests',
    'ng lint                              # Lint code',
    '',
    '# Add libraries',
    'ng add @angular/material             # Angular Material',
    'ng add @ngrx/store                   # NgRx state management',
  ].join('\n');

  exampleCode = [
    '# Real-world project setup workflow',
    '',
    '# 1. Scaffold new project with strict TypeScript',
    'ng new ecommerce-app --routing --style=scss --strict',
    'cd ecommerce-app',
    '',
    '# 2. Add Angular Material UI library',
    'ng add @angular/material',
    '',
    '# 3. Generate feature structure following best practices',
    'ng g m features/products --routing',
    'ng g c features/products/product-list',
    'ng g c features/products/product-detail',
    'ng g s core/services/product',
    'ng g guard core/guards/auth --implements CanActivate',
    'ng g interceptor core/interceptors/token',
    '',
    '# 4. Build and analyze bundle size',
    'ng build --stats-json',
    'npx webpack-bundle-analyzer dist/ecommerce-app/stats.json',
    '',
    '# 5. Run tests with coverage report',
    'ng test --code-coverage --watch=false',
    '# Opens coverage report at coverage/index.html',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the Angular CLI and what problem does it solve?',
      a: 'The Angular CLI (Command Line Interface) is an official tool for creating, building, testing, and maintaining Angular applications. It solves the complexity of configuring webpack, TypeScript, Karma, and build pipelines from scratch. With a single command (ng new), it scaffolds a complete, best-practice project. It enforces consistency across teams by generating artifacts with correct naming conventions and boilerplate.',
    },
    {
      q: 'What is the difference between ng serve and ng build?',
      a: 'ng serve starts a local development server with hot module replacement (HMR) — changes to source files are compiled and reflected in the browser without a full reload. It stores the build in memory and is not suitable for deployment. ng build compiles the application and outputs optimized static files (JS, CSS, HTML) to the dist/ folder, ready for deployment to a CDN or web server.',
    },
    {
      q: 'What does ng add do and how is it different from npm install?',
      a: 'ng add uses Angular schematics to install a package AND automatically configure it — updating angular.json, importing modules, adding styles, generating starter code, etc. For example, ng add @angular/material installs the package, sets up the theme, configures animations, and adds a font link to index.html. npm install only downloads the package without any Angular-specific configuration.',
    },
    {
      q: 'What build tool does Angular CLI use internally?',
      a: 'Angular CLI used webpack for many years. Since Angular 16, the CLI switched to esbuild with Vite for the development server, delivering dramatically faster build and rebuild times. The ng build command uses esbuild for production builds. Esbuild is written in Go and is 10-100x faster than webpack for bundling, significantly improving developer experience.',
    },
    {
      q: 'What are Angular schematics?',
      a: 'Schematics are code-generation scripts used by the Angular CLI for ng generate and ng add commands. They transform the workspace — creating files, updating existing files, and modifying angular.json. Third-party libraries (NgRx, Angular Material, etc.) ship their own schematics so that ng add automatically sets them up. You can write custom schematics to automate your team\'s code generation patterns.',
    },
    {
      q: 'What is the purpose of angular.json?',
      a: 'angular.json is the Angular CLI workspace configuration file. It defines project names, source/output directories, build options (optimization, file replacements for environments, budgets), test configuration (Karma), and server configuration. It can configure multiple projects in a monorepo. Flags set in angular.json serve as defaults that can be overridden by CLI command arguments.',
    },
  ];
}
