import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virtual-scrolling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-scrolling.component.html',
  styleUrl: './virtual-scrolling.component.css',
})
export class VirtualScrollingComponent {
  definition = 'Virtual scrolling (also called windowing) renders only the DOM nodes visible in the viewport at any given moment, regardless of how many items are in the data array. As the user scrolls, visible items are recycled and repopulated with new data — keeping the DOM node count constant and small.';

  whyNeeded = 'Rendering 10,000 list items creates 10,000 DOM nodes, each consuming memory and requiring layout calculations. Modern browsers struggle at 1,000+ nodes, causing scroll jank and high memory usage. Virtual scrolling renders only ~10-20 visible rows at a time, making performance independent of the total item count.';

  syntaxCode = [
    '// 1. Install CDK: npm install @angular/cdk',
    '',
    '// 2. Import in component',
    'import { ScrollingModule } from "@angular/cdk/scrolling";',
    '',
    '@Component({',
    '  imports: [ScrollingModule, CommonModule],',
    '  ...',
    '})',
    'export class MyListComponent {',
    '  items = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` }));',
    '}',
    '',
    '// 3. Template usage',
    '<cdk-virtual-scroll-viewport itemSize="50" style="height: 500px;">',
    '  <div *cdkVirtualFor="let item of items; trackBy: trackById"',
    '       style="height: 50px;">',
    '    {{ item.name }}',
    '  </div>',
    '</cdk-virtual-scroll-viewport>',
  ].join('\n');

  exampleCode = [
    '// Real-world: chat message list with 50,000 messages',
    '@Component({',
    '  imports: [ScrollingModule, CommonModule],',
    '  template: `',
    '    <cdk-virtual-scroll-viewport itemSize="72" class="chat-viewport">',
    '      <div *cdkVirtualFor="let msg of messages$; trackBy: trackByMsgId"',
    '           class="chat-message">',
    '        <strong>{{ msg.sender }}</strong>',
    '        <p>{{ msg.text }}</p>',
    '        <time>{{ msg.timestamp | date:"HH:mm" }}</time>',
    '      </div>',
    '    </cdk-virtual-scroll-viewport>',
    '  `',
    '})',
    'export class ChatListComponent {',
    '  messages$ = this.chatService.messages$;',
    '  trackByMsgId = (_: number, m: Message) => m.id;',
    '',
    '  // Only ~7 DOM nodes rendered regardless of 50,000 messages',
    '}',
  ].join('\n');

  internalWorking = 'The CDK VirtualScrollViewport listens to scroll events on its container. It calculates which items are in the visible range based on the scrollTop position and the fixed itemSize (or a range function for variable sizes). It renders only those items plus a small buffer, and uses CSS padding on a spacer element to simulate the full scroll height, making the scrollbar behave correctly. *cdkVirtualFor replaces *ngFor with this windowing-aware version.';

  advantages = [
    'Renders only O(visible items) DOM nodes regardless of data size',
    'Consistent performance from 100 to 1,000,000 items',
    'Dramatically reduced memory usage compared to full rendering',
    'Smooth scrolling even on low-end devices',
    'Works with Observables via async pipe naturally',
    'CDK provides both fixed-size and variable-size implementations',
  ];

  disadvantages = [
    'Requires a fixed or calculable item height (trickier for variable content)',
    'Browser-level find (Ctrl+F) cannot search hidden (un-rendered) items',
    'More complex setup than a simple *ngFor',
    'Accessibility features like screen readers may miss off-screen items',
    'Requires ScrollingModule from @angular/cdk as an additional dependency',
  ];

  bestPractices = [
    'Always specify itemSize accurately — incorrect values cause scroll position bugs',
    'Combine *cdkVirtualFor with trackBy for optimal performance',
    'Set explicit height on the viewport container (required for CDK virtual scroll)',
    'Use AutoSizeVirtualScrollStrategy for variable-height items',
    'Load data progressively (infinite scroll) instead of all at once',
    'Test on low-end mobile devices — the target audience for this optimization',
  ];

  commonMistakes = [
    'Not setting a fixed height on cdk-virtual-scroll-viewport — causes zero-height rendering',
    'Specifying wrong itemSize — causes miscalculated scroll positions',
    'Using virtual scroll for small lists (< 100 items) — adds unnecessary complexity',
    'Forgetting to import ScrollingModule — template compile error',
    'Trying to use standard *ngFor instead of *cdkVirtualFor inside the viewport',
  ];

  interviewQA = [
    {
      q: 'What is virtual scrolling and when should you use it?',
      a: 'Virtual scrolling renders only the DOM nodes visible in the viewport, recycling them as the user scrolls. Use it for lists with 500+ items, especially when items have consistent or calculable heights. It keeps DOM node count constant regardless of dataset size.'
    },
    {
      q: 'What is the difference between *ngFor and *cdkVirtualFor?',
      a: '*ngFor renders every item in the array as a DOM node. *cdkVirtualFor (from @angular/cdk/scrolling) renders only visible items, recycling DOM nodes on scroll. The API is similar but *cdkVirtualFor requires a cdk-virtual-scroll-viewport parent with a fixed height.'
    },
    {
      q: 'How does virtual scrolling simulate the correct scroll height?',
      a: 'CDK inserts a spacer element whose height equals total items × itemSize. This makes the scrollbar represent the full dataset. As the user scrolls, CDK calculates which items should be visible, updates the rendered subset, and adjusts a CSS transform/padding to position the visible items correctly.'
    },
    {
      q: 'How do you handle variable-height items in CDK virtual scroll?',
      a: 'Use AutoSizeVirtualScrollStrategy or implement a custom VirtualScrollStrategy. The AutoSize strategy measures rendered items and estimates off-screen heights, adjusting the spacer dynamically. It is less performant than fixed-size but handles dynamic content correctly.'
    },
    {
      q: 'What is the difference between virtual scrolling and pagination?',
      a: 'Pagination loads a subset of data from the server (page 1, page 2, etc.) and fully renders all items on the current page. Virtual scrolling renders only visible items from a dataset already in memory. Infinite scroll combines both: fetch pages on scroll while virtual scrolling manages DOM count.'
    },
    {
      q: 'What are the required setup steps for CDK virtual scrolling?',
      a: 'Install @angular/cdk, import ScrollingModule in your component imports, set a fixed height on cdk-virtual-scroll-viewport, provide itemSize, and use *cdkVirtualFor (not *ngFor) inside the viewport. The viewport height is mandatory — CDK cannot calculate the visible window without it.'
    },
  ];
}
