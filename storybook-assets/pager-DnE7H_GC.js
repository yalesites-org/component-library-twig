import{u as r,j as e,M as a,C as l,a as o}from"./blocks-BudrnkdM.js";import{P as c,I as i,c as d}from"./pager.stories-DqjErN4l.js";import{t as h}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./component-props-De-d7Djp.js";function t(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"pager",children:"Pager"}),`
`,e.jsx(n.p,{children:"The pager component provides navigation controls for multi-page content. It displays page numbers with intelligent truncation patterns using ellipsis for large page sets, along with previous and next navigation arrows. The component adapts its display pattern based on the current page position and total page count, ensuring users always maintain context while having access to key navigation points."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the pager's properties in real-time. Click on page numbers to navigate between pages."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(l,{of:i})}),`
`,e.jsx(o,{of:i}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(d,"optional"),`
`,e.jsx(n.h2,{id:"pagination-patterns",children:"Pagination Patterns"}),`
`,e.jsx(n.p,{children:"The pager component intelligently adapts its display based on the total number of pages and the current page position. This ensures optimal usability while maintaining visual clarity."}),`
`,e.jsx(n.h3,{id:"single-page",children:"Single Page"}),`
`,e.jsx(n.p,{children:"When only one page exists, the pagination component is hidden entirely. This reduces visual clutter and follows UX best practices."}),`
`,e.jsx(n.h3,{id:"simple-pattern-2-3-pages",children:"Simple Pattern (2-3 Pages)"}),`
`,e.jsx(n.p,{children:"For small page sets (2-3 pages), all page numbers are displayed without truncation."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," ",e.jsx(n.code,{children:"1 2 3"})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," With few pages, users benefit from seeing all options at once without cognitive load from ellipsis or hidden pages."]}),`
`,e.jsx(n.h3,{id:"four-page-special-case",children:"Four Page Special Case"}),`
`,e.jsx(n.p,{children:'When exactly four pages exist, all page numbers are shown to avoid confusing displays like "1 2 3 4 ... 4".'}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," ",e.jsx(n.code,{children:"1 2 3 4"})]}),`
`,e.jsx(n.h3,{id:"complex-patterns-5-pages",children:"Complex Patterns (5+ Pages)"}),`
`,e.jsx(n.p,{children:"For larger page sets, the pager uses intelligent ellipsis patterns that adapt based on current position:"}),`
`,e.jsx(n.h4,{id:"start-pattern-pages-1-2",children:"Start Pattern (Pages 1-2)"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," ",e.jsx(n.code,{children:"1 2 3 ... 10"})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Users near the beginning need clear forward navigation. Pattern emphasizes forward progress."]}),`
`,e.jsx(n.h4,{id:"extended-start-page-3",children:"Extended Start (Page 3)"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," ",e.jsx(n.code,{children:"1 2 3 4 ... 10"})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," When on page 3, users expect to easily click to page 4 without jumping to the last page. Reduces navigation friction."]}),`
`,e.jsx(n.h4,{id:"middle-pattern",children:"Middle Pattern"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," ",e.jsx(n.code,{children:"1 ... 4 5 6 ... 10"})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Shows current page with context (one before/after) while maintaining awareness of start/end boundaries."]}),`
`,e.jsx(n.h4,{id:"extended-end-third-from-last",children:"Extended End (Third From Last)"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," ",e.jsx(n.code,{children:"1 ... 7 8 9 10"})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Mirror of extended start - when on page 8 of 10, users can easily access page 7 without jumping to page 1."]}),`
`,e.jsx(n.h4,{id:"end-pattern-last-2-pages",children:"End Pattern (Last 2 Pages)"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," ",e.jsx(n.code,{children:"1 ... 8 9 10"})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Users near the end need context about their position and easy access to earlier content."]}),`
`,e.jsx(n.h3,{id:"mobile-display",children:"Mobile Display"}),`
`,e.jsx(n.p,{children:"On mobile devices, the pager displays a compact format showing the current position:"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," ",e.jsx(n.code,{children:"5 / 10"})]}),`
`,e.jsx(n.p,{children:"This prevents horizontal scrolling while maintaining position awareness."}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-pager.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-pager.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"cl-pager.js"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Proper ARIA labels and roles for screen reader navigation"}),`
`,e.jsxs(n.li,{children:["Semantic ",e.jsx(n.code,{children:"<nav>"})," element with ",e.jsx(n.code,{children:'role="navigation"'})," and ",e.jsx(n.code,{children:'aria-label="Pagination"'})]}),`
`,e.jsxs(n.li,{children:["Current page clearly indicated with ",e.jsx(n.code,{children:"is-active"}),' class and visually hidden "Current" label']}),`
`,e.jsxs(n.li,{children:["All page links have descriptive ",e.jsx(n.code,{children:"aria-label"})," attributes"]}),`
`,e.jsx(n.li,{children:"Keyboard accessible with clear focus indicators"}),`
`,e.jsxs(n.li,{children:["Previous and next links include ",e.jsx(n.code,{children:'rel="prev"'})," and ",e.jsx(n.code,{children:'rel="next"'})," attributes for better SEO"]}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Navigation"}),": Click page numbers, previous, or next arrows to navigate"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Visual Feedback"}),": Current page is highlighted with distinct styling"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive"}),': Desktop shows full pagination, mobile shows compact "X / Y" format']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Dynamic Patterns"}),": Display pattern automatically adjusts based on current position"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript Enhancement"}),": Interactive page updates in Storybook (standard HTML links in production)"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use pagination for content sets with more than 10-20 items per page"}),`
`,e.jsx(n.li,{children:"Keep items per page consistent throughout the user experience"}),`
`,e.jsx(n.li,{children:"Place pagination at both the top and bottom of long content lists"}),`
`,e.jsx(n.li,{children:"Ensure page size is appropriate for the content type (balance page load time with navigation frequency)"}),`
`,e.jsx(n.li,{children:"Display total results count near the pagination when possible"}),`
`,e.jsx(n.li,{children:'Consider "Load More" patterns for infinite scroll scenarios on mobile'}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't hide pagination when there's only one page (component does this automatically)"}),`
`,e.jsx(n.li,{children:"Don't use pagination for content that should be displayed on a single page"}),`
`,e.jsx(n.li,{children:"Avoid very small page sizes (under 5 items) that require excessive clicking"}),`
`,e.jsx(n.li,{children:"Don't use pagination as the only way to access content - provide search and filters"}),`
`,e.jsx(n.li,{children:"Avoid breaking related content across page boundaries when possible"}),`
`]}),`
`,e.jsx(n.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(n.h3,{id:"data-structure",children:"Data Structure"}),`
`,e.jsx(n.p,{children:"The pager expects a specific data structure from Drupal's pager system:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`{
  current: 5,
  items: {
    pages: {
      1: { href: '/page/1' },
      2: { href: '/page/2' },
      // ... more pages
    },
    previous: { href: '/page/4' },
    next: { href: '/page/6' },
    first: { href: '/page/1' },
    last: { href: '/page/10' }
  }
}
`})}),`
`,e.jsx(n.h3,{id:"pattern-logic",children:"Pattern Logic"}),`
`,e.jsx(n.p,{children:"The component uses several key variables to determine which pattern to display:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"is_single_page"}),": Total pages equals 1"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"is_simple"}),": 2-3 total pages"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"is_exactly_four"}),": Exactly 4 total pages"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"needs_ellipsis"}),": 5 or more total pages"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"at_start"}),": Current page is 1 or 2"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"on_third"}),": Current page is 3"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"in_middle"}),": Current page is not near start or end"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"on_third_from_end"}),": Current page is 3rd from last"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"at_end"}),": Current page is in last 2 pages"]}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all pagination pattern variations and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/molecules-pager-visreg",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h3,{id:"testing-different-patterns",children:"Testing Different Patterns"}),`
`,e.jsx(n.p,{children:"To test various pagination patterns, adjust the total pages and current page controls:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Single page"}),": Set total pages to 1"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Simple pattern"}),": Set total pages to 2-3"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Four page case"}),": Set total pages to 4, try different current pages"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Start pattern"}),": Set total pages to 10, current page to 1 or 2"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Extended start"}),": Set total pages to 10, current page to 3"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Middle pattern"}),": Set total pages to 10, current page to 5"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Extended end"}),": Set total pages to 10, current page to 8"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"End pattern"}),": Set total pages to 10, current page to 9 or 10"]}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Load More Button"}),": Alternative pattern for progressive content loading"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Infinite Scroll"}),": Consider for mobile-first experiences where pagination may be cumbersome"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function b(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{b as default};
//# sourceMappingURL=pager-DnE7H_GC.js.map
