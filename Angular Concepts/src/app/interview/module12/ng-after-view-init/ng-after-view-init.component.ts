import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng-after-view-init',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-after-view-init.component.html',
  styleUrl: './ng-after-view-init.component.css',
})
export class NgAfterViewInitComponent {
  syntaxCode = [
    'import {',
    '  Component, AfterViewInit,',
    '  ViewChild, ElementRef',
    '} from "@angular/core";',
    '',
    '@Component({',
    '  selector: "app-chart",',
    '  template: `<canvas #chartCanvas></canvas>`',
    '})',
    'export class ChartComponent implements AfterViewInit {',
    '  // ✅ @ViewChild resolved ONLY after ngAfterViewInit',
    '  @ViewChild("chartCanvas") canvasRef!: ElementRef<HTMLCanvasElement>;',
    '',
    '  ngAfterViewInit() {',
    '    // ✅ DOM element is now available — safe to initialize third-party libs',
    '    const ctx = this.canvasRef.nativeElement.getContext("2d");',
    '    new Chart(ctx, {',
    '      type: "bar",',
    '      data: { labels: ["Jan", "Feb"], datasets: [{ data: [12, 19] }] }',
    '    });',
    '  }',
    '}',
    '',
    '// ❌ WRONG: @ViewChild in ngOnInit — always undefined!',
    '// ngOnInit() { this.canvasRef.nativeElement ... } // ERROR',
  ].join('\n');

  exampleCode = [
    '// Real-world: Auto-focus input and initialize Mapbox GL map',
    '',
    '@Component({',
    '  selector: "app-location-picker",',
    '  template: `',
    '    <input #searchInput placeholder="Search location..." />',
    '    <div #mapContainer style="height: 400px;"></div>',
    '  `',
    '})',
    'export class LocationPickerComponent implements AfterViewInit, OnDestroy {',
    '  @ViewChild("searchInput") searchInputRef!: ElementRef<HTMLInputElement>;',
    '  @ViewChild("mapContainer") mapContainerRef!: ElementRef<HTMLDivElement>;',
    '',
    '  private map: mapboxgl.Map | null = null;',
    '',
    '  ngAfterViewInit() {',
    '    // ✅ DOM references are available — initialize map and focus input',
    '    this.searchInputRef.nativeElement.focus();',
    '',
    '    this.map = new mapboxgl.Map({',
    '      container: this.mapContainerRef.nativeElement,',
    '      style: "mapbox://styles/mapbox/streets-v11",',
    '      center: [80.27, 13.08], // Chennai',
    '      zoom: 12',
    '    });',
    '  }',
    '',
    '  ngOnDestroy() {',
    '    this.map?.remove(); // Clean up Mapbox instance',
    '  }',
    '}',
  ].join('\n');

  interviewQA = [
    {
      q: 'What is ngAfterViewInit and when does it fire?',
      a: 'ngAfterViewInit is an Angular lifecycle hook that fires once after Angular has fully initialized the component\'s view and all its child views. "View" refers to the component\'s own template and the views of its child components. At this point, @ViewChild and @ViewChildren queries are resolved, DOM elements referenced by template variables are available, and child component instances are fully initialized. It fires after ngAfterContentChecked on the first cycle.',
    },
    {
      q: 'Why is @ViewChild only available in ngAfterViewInit and not ngOnInit?',
      a: '@ViewChild queries DOM elements or child components that are part of the component\'s own template. Angular\'s template compilation and view creation happens after ngOnInit runs. So in ngOnInit, the template DOM has not been rendered yet — @ViewChild returns undefined. Angular\'s TypeScript compiler even marks @ViewChild properties with the ! (definite assignment assertion) to indicate they are set after construction. Always access @ViewChild in ngAfterViewInit or later.',
    },
    {
      q: 'What is ExpressionChangedAfterItHasBeenCheckedError and why does it happen in ngAfterViewInit?',
      a: 'This error occurs in development mode when you modify a binding that Angular has already checked in the current CD cycle. In ngAfterViewInit, if you update a parent-bound property (e.g., this.title = "new title" where title is used in the parent template), Angular detects the change after it already verified the value, and throws this error. Solutions: (1) use ChangeDetectorRef.detectChanges() after the mutation; (2) use setTimeout(fn, 0) to defer to the next cycle; (3) restructure to avoid parent property changes in ngAfterViewInit.',
    },
    {
      q: 'What is the difference between @ViewChild and @ContentChild?',
      a: '@ViewChild queries elements in the component\'s own template — elements defined in templateUrl/template of the component itself. It is resolved in ngAfterViewInit. @ContentChild queries elements projected from outside the component via <ng-content> — elements defined in the parent that uses this component. @ContentChild is resolved in ngAfterContentInit. Accessing either before their respective lifecycle hooks always returns undefined.',
    },
    {
      q: 'How do you safely initialize third-party libraries (Chart.js, D3, Mapbox) in Angular?',
      a: 'Always initialize DOM-dependent third-party libraries in ngAfterViewInit. Use @ViewChild to get the ElementRef of the container element. Assign the library instance to a component property so you can clean it up in ngOnDestroy. Never initialize in the constructor or ngOnInit — the DOM is not rendered yet. For SSR (Angular Universal), add a platform check: if (isPlatformBrowser(this.platformId)) before accessing nativeElement to avoid server-side DOM errors.',
    },
    {
      q: 'Can ngAfterViewInit fire more than once?',
      a: 'No. ngAfterViewInit fires exactly once per component instance — after the component\'s view is first fully rendered. If you need to react to view changes that happen after the first render (e.g., @ViewChildren query results changing), subscribe to viewChildrenQueryList.changes in ngAfterViewInit, which is a live Observable. ngAfterViewChecked, on the other hand, fires after every subsequent CD cycle. So for repeated reactions, use ngAfterViewChecked; for one-time setup, use ngAfterViewInit.',
    },
  ];
}
