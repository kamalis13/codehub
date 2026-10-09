import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wildcard-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wildcard-routes.component.html',
  styleUrl: './wildcard-routes.component.css'
})
export class WildcardRoutesComponent {
  syntaxCode = [
    '// app.routes.ts — wildcard MUST be last',
    'export const routes: Routes = [',
    "  { path: '', redirectTo: '/home', pathMatch: 'full' },",
    "  { path: 'home', component: HomeComponent },",
    "  { path: 'about', component: AboutComponent },",
    "  { path: 'products', component: ProductsComponent },",
    '',
    '  // Wildcard — catches ANY URL not matched above',
    '  // MUST be the very last route',
    "  { path: '**', component: PageNotFoundComponent }",
    '];',
    '',
    '// Redirecting instead of showing 404 component',
    "{ path: '**', redirectTo: '/home' }"
  ].join('\n');

  exampleCode = [
    '// PageNotFoundComponent — friendly 404 page',
    '@Component({',
    "  selector: 'app-page-not-found',",
    '  standalone: true,',
    '  imports: [RouterModule],',
    '  template: `',
    '    <div class="not-found">',
    '      <h1>404 — Page Not Found</h1>',
    '      <p>The URL "{{ currentUrl }}" does not exist.</p>',
    '      <a routerLink="/home">Return to Home</a>',
    '    </div>',
    '  `',
    '})',
    'export class PageNotFoundComponent implements OnInit {',
    "  currentUrl = '';",
    '',
    '  constructor(private router: Router) {}',
    '',
    '  ngOnInit(): void {',
    '    this.currentUrl = this.router.url;',
    '  }',
    '}'
  ].join('\n');

  interviewQA = [
    {
      q: 'What is the wildcard route (**) in Angular?',
      a: 'The ** path matches any URL that was not matched by any previous route in the Routes array. It is used to show a 404 page or redirect to a default route for unrecognized URLs. It must always be the last route in the array.'
    },
    {
      q: 'Why must the wildcard route be placed last?',
      a: 'Angular matches routes using first-match-wins. If ** is placed first or in the middle, it matches every URL and no other route is ever reached. By placing it last, specific routes match first and ** only activates for truly unrecognized paths.'
    },
    {
      q: 'What is the difference between using component and redirectTo in a wildcard route?',
      a: 'Using component renders a custom 404 page at the invalid URL (URL stays the same in browser). Using redirectTo navigates the user to a different route (URL changes). Showing a 404 component is better for UX — users can see what URL failed.'
    },
    {
      q: 'How do you show the attempted URL in a 404 component?',
      a: 'Inject Router and read this.router.url in ngOnInit. Alternatively, inject ActivatedRoute — though for the ** route, params may be empty; the full URL is on the Router service.'
    },
    {
      q: 'Can wildcard routes exist inside child routes?',
      a: 'Yes. Each children array can have its own ** route at the end to catch unmatched child paths and show a section-specific 404. This gives more contextual error messages.'
    },
    {
      q: "How does server-side configuration relate to Angular's wildcard route?",
      a: "For SPAs deployed on a server, all URL requests must return index.html so Angular's router can handle them client-side. Without server-side catch-all config, directly navigating to /products returns a real 404 from the server before Angular loads. The ** route only works client-side."
    }
  ];
}
