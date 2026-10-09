import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-routes.component.html',
  styleUrl: './child-routes.component.css'
})
export class ChildRoutesComponent {
  syntaxCode = [
    '// Route configuration with children',
    'export const routes: Routes = [',
    '  {',
    "    path: 'admin',",
    '    component: AdminLayoutComponent,  // shell with sidebar',
    '    children: [',
    "      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },",
    "      { path: 'dashboard', component: DashboardComponent },",
    "      { path: 'users', component: UserListComponent },",
    "      { path: 'users/:id', component: UserDetailComponent },",
    "      { path: 'settings', component: SettingsComponent }",
    '    ]',
    '  }',
    '];',
    '',
    '// AdminLayoutComponent template needs a nested outlet:',
    '// <app-sidebar></app-sidebar>',
    '// <main><router-outlet></router-outlet></main>'
  ].join('\n');

  exampleCode = [
    '// Tabs with child routes: /products/:id/details, /products/:id/reviews',
    '{',
    "  path: 'products/:id',",
    '  component: ProductPageComponent,',
    '  children: [',
    "    { path: '', redirectTo: 'details', pathMatch: 'full' },",
    "    { path: 'details', component: ProductDetailsComponent },",
    "    { path: 'reviews', component: ProductReviewsComponent },",
    "    { path: 'specs', component: ProductSpecsComponent }",
    '  ]',
    '}',
    '',
    '// ProductPageComponent template:',
    '// <app-product-header [product]="product"></app-product-header>',
    '// <nav>',
    '//   <a routerLink="details" routerLinkActive="active">Details</a>',
    '//   <a routerLink="reviews" routerLinkActive="active">Reviews</a>',
    '// </nav>',
    '// <router-outlet></router-outlet>  <!-- child renders here -->'
  ].join('\n');

  interviewQA = [
    {
      q: 'What are child routes in Angular?',
      a: 'Child routes are routes nested inside a parent route using the children array. The parent component must have its own router-outlet where child components render. They are used to build layouts like admin dashboards, tabbed interfaces, and wizard flows.'
    },
    {
      q: 'How do you navigate to a child route relatively?',
      a: "Use relative navigation: this.router.navigate(['details'], { relativeTo: this.route }) or in templates <a routerLink=\"details\"> (without leading /). Angular resolves the path relative to the current route."
    },
    {
      q: "Why does the parent component need its own router-outlet?",
      a: "The parent's router-outlet is where Angular renders the matched child component. Without it, the child route matches but has nowhere to render its component — nothing appears in the parent view."
    },
    {
      q: "How do child routes access a parent route's params?",
      a: "By subscribing to this.route.parent.paramMap. For example, a child route inside /products/:id accesses the id via this.route.parent.paramMap.get('id') since the :id belongs to the parent route."
    },
    {
      q: 'What is the difference between /admin/users and admin/users in routerLink?',
      a: 'A leading / makes the path absolute — always starts from root. Without /, the path is relative to the current route. In child route templates, use relative paths (no /) to keep routes modular.'
    },
    {
      q: 'Can you have multiple levels of nested child routes?',
      a: 'Yes, Angular supports unlimited nesting. Each level needs a parent component with its own router-outlet. However, deep nesting increases complexity — prefer flat routes with layout components where possible.'
    }
  ];
}
