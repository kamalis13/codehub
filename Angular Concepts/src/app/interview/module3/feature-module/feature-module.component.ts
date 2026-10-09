import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-module.component.html',
  styleUrl: './feature-module.component.css',
})
export class FeatureModuleComponent {
  syntaxCode = [
    '// Generate a feature module with routing',
    'ng generate module products --route products --module app.module',
    '',
    '// products/products.module.ts',
    "import { NgModule } from '@angular/core';",
    "import { CommonModule } from '@angular/common';",
    "import { ProductsRoutingModule } from './products-routing.module';",
    "import { ProductListComponent } from './product-list/product-list.component';",
    "import { ProductDetailComponent } from './product-detail/product-detail.component';",
    '',
    '@NgModule({',
    '  declarations: [ProductListComponent, ProductDetailComponent],',
    '  imports: [CommonModule, ProductsRoutingModule, ReactiveFormsModule]',
    '})',
    'export class ProductsModule { }',
  ].join('\n');

  exampleCode = [
    '// products-routing.module.ts',
    "import { NgModule } from '@angular/core';",
    "import { RouterModule, Routes } from '@angular/router';",
    "import { ProductListComponent } from './product-list/product-list.component';",
    "import { ProductDetailComponent } from './product-detail/product-detail.component';",
    '',
    'const routes: Routes = [',
    "  { path: '', component: ProductListComponent },",
    "  { path: ':id', component: ProductDetailComponent }",
    '];',
    '',
    '@NgModule({',
    '  imports: [RouterModule.forChild(routes)],',
    '  exports: [RouterModule]',
    '})',
    'export class ProductsRoutingModule { }',
    '',
    '// app-routing.module.ts — lazy load ProductsModule',
    'const routes: Routes = [',
    '  {',
    "    path: 'products',",
    "    loadChildren: () => import('./products/products.module')",
    "      .then(m => m.ProductsModule)",
    '  }',
    '];',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is a Feature Module in Angular?',
      a: 'A Feature Module is an NgModule that groups all components, services, pipes, and routing related to a specific application feature (e.g., Products, Orders, Auth). It keeps the codebase organised by domain and allows independent development, testing, and lazy loading of each feature.',
    },
    {
      q: 'What is the difference between RouterModule.forRoot() and RouterModule.forChild()?',
      a: 'forRoot() is called once in AppModule (or AppRoutingModule) to create the router service and register top-level routes. forChild() is called in feature routing modules to register additional child routes without re-creating the router service. Using forRoot() in a feature module would create a second router instance, breaking routing.',
    },
    {
      q: 'How do you lazy load a Feature Module?',
      a: 'In the app routing module, use the loadChildren property with a dynamic import: { path: "products", loadChildren: () => import("./products/products.module").then(m => m.ProductsModule) }. Angular only downloads the feature bundle when the user navigates to that route, reducing the initial bundle size.',
    },
    {
      q: 'What is a circular dependency between modules and how do you avoid it?',
      a: 'A circular dependency occurs when Module A imports Module B and Module B imports Module A. Angular cannot resolve this and throws a build error. To fix it, extract shared components into a SharedModule that both modules can import without depending on each other.',
    },
    {
      q: 'Should feature modules import FormsModule or ReactiveFormsModule?',
      a: 'Yes — each feature module should import only the form module it needs. Importing them in AppModule does not propagate to lazy-loaded feature modules because they have their own injector scope. Always import FormsModule or ReactiveFormsModule directly in the feature module that uses forms.',
    },
    {
      q: 'How does lazy loading improve Angular application performance?',
      a: 'With lazy loading, the initial JavaScript bundle only contains AppModule and eagerly loaded modules. Feature modules are split into separate chunks by the bundler. When a user navigates to a lazy route, only that chunk is downloaded. This significantly reduces time-to-interactive for large applications with many features.',
    },
  ];
}
