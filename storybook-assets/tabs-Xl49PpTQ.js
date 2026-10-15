import{u as t,j as e,M as r,C as a}from"./blocks-C3MhvIPG.js";import{T as l,I as c}from"./tabs.stories-DD9o4ljG.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./tabs-Dl0Hirov.js";import"./yds-tabs-Egev4hry.js";function s(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l,name:"Overview"}),`
`,e.jsx(n.h1,{id:"tabs",children:"Tabs"}),`
`,e.jsx(n.p,{children:"The tabs component provides an interactive tabbed interface for organizing related content into separate panels. Users can click on tab labels to switch between different content sections without leaving the page. This component is ideal for presenting multiple related pieces of information in a compact, organized manner."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Click on tab labels to switch between content panels."}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-tabs.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-tabs.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"yds-tabs.js"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Proper ARIA attributes for tabs pattern (role="tablist", role="tab", role="tabpanel")'}),`
`,e.jsxs(n.li,{children:["Keyboard navigation support:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Arrow keys to navigate between tabs"}),`
`,e.jsx(n.li,{children:"Tab key to enter/exit the tab list"}),`
`,e.jsx(n.li,{children:"Enter/Space to activate a tab"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"aria-selected indicates the active tab"}),`
`,e.jsx(n.li,{children:"aria-controls links tabs to their panels"}),`
`,e.jsx(n.li,{children:"Each tab panel is associated with its tab via aria-labelledby"}),`
`,e.jsx(n.li,{children:'Only the active tab is in tab order (tabindex="0"), others use tabindex="-1"'}),`
`,e.jsx(n.li,{children:"Focus management ensures keyboard users can navigate efficiently"}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default State"}),": First tab is active by default"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tab Activation"}),": Click a tab label to display its associated content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Visual Feedback"}),": Active tab has distinct styling to indicate selection"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": Full keyboard support for accessible interaction"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive"}),": Tabs adapt to available space, may scroll horizontally on narrow screens"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Content Management"}),": Only the active tab's content is visible at a time"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use tabs when you have 2-8 related content sections"}),`
`,e.jsx(n.li,{children:"Keep tab labels short and descriptive (1-3 words ideal)"}),`
`,e.jsx(n.li,{children:"Ensure tab content is substantial enough to warrant separation"}),`
`,e.jsx(n.li,{children:"Order tabs logically (chronological, importance, or alphabetical)"}),`
`,e.jsx(n.li,{children:"Keep all tabs at the same level of importance"}),`
`,e.jsx(n.li,{children:"Ensure content in one tab doesn't depend on viewing another tab first"}),`
`,e.jsx(n.li,{children:"Use consistent content structure across all tab panels"}),`
`,e.jsx(n.li,{children:"Make the first tab contain the most important or frequently accessed content"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use tabs for sequential content that should be read in order (use a stepper instead)"}),`
`,e.jsx(n.li,{children:"Avoid using tabs with only one or two sections (not worth the interaction cost)"}),`
`,e.jsx(n.li,{children:"Don't nest tabs within tabs (causes confusion and accessibility issues)"}),`
`,e.jsx(n.li,{children:"Avoid very long tab labels that might break layouts or wrap awkwardly"}),`
`,e.jsx(n.li,{children:"Don't hide critical content in non-default tabs"}),`
`,e.jsx(n.li,{children:"Avoid using tabs when users need to compare content across panels (use side-by-side layout instead)"}),`
`,e.jsx(n.li,{children:"Don't use tabs for navigation between pages (use primary navigation instead)"}),`
`]}),`
`,e.jsx(n.h2,{id:"content-patterns",children:"Content Patterns"}),`
`,e.jsx(n.h3,{id:"tab-label-best-practices",children:"Tab Label Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Concise"}),": Keep to 1-3 words when possible"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Descriptive"}),": Clearly indicate what content is in the panel"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Parallel"}),": Use consistent grammatical structure (all nouns, all verbs, etc.)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Distinct"}),": Each label should be clearly different from others"]}),`
`]}),`
`,e.jsx(n.h3,{id:"tab-content-guidelines",children:"Tab Content Guidelines"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Each panel should be self-contained and understandable without viewing other tabs"}),`
`,e.jsx(n.li,{children:"Content length can vary between tabs, but extreme differences may indicate poor organization"}),`
`,e.jsx(n.li,{children:"Consider using consistent content structures (e.g., all tabs have headings and paragraphs)"}),`
`,e.jsx(n.li,{children:"Rich content including images, lists, and links is supported"}),`
`]}),`
`,e.jsx(n.h2,{id:"examples-and-use-cases",children:"Examples and Use Cases"}),`
`,e.jsx(n.h3,{id:"registration-information",children:"Registration Information"}),`
`,e.jsx(n.p,{children:"Use tabs to organize different phases of a process:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"Before registration"'}),`
`,e.jsx(n.li,{children:'"During registration"'}),`
`,e.jsx(n.li,{children:'"After registration"'}),`
`]}),`
`,e.jsx(n.h3,{id:"departmental-information",children:"Departmental Information"}),`
`,e.jsx(n.p,{children:"Organize different aspects of a department or program:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"Overview"'}),`
`,e.jsx(n.li,{children:'"Faculty"'}),`
`,e.jsx(n.li,{children:'"Research"'}),`
`,e.jsx(n.li,{children:'"Admissions"'}),`
`]}),`
`,e.jsx(n.h3,{id:"event-details",children:"Event Details"}),`
`,e.jsx(n.p,{children:"Break down event information into digestible sections:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"Schedule"'}),`
`,e.jsx(n.li,{children:'"Speakers"'}),`
`,e.jsx(n.li,{children:'"Location"'}),`
`,e.jsx(n.li,{children:'"FAQs"'}),`
`]}),`
`,e.jsx(n.h2,{id:"technical-implementation",children:"Technical Implementation"}),`
`,e.jsx(n.h3,{id:"data-structure-example",children:"Data Structure Example"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`{
  tabs__id: "unique-id-123",
  tabs: [
    {
      tab__label: "Overview",
      tab__content: "<div class='text-field'><p>Content goes here...</p></div>"
    },
    {
      tab__label: "Details",
      tab__content: "<div class='text-field'><p>More content...</p></div>"
    }
  ]
}
`})}),`
`,e.jsx(n.h3,{id:"javascript-behavior",children:"JavaScript Behavior"}),`
`,e.jsx(n.p,{children:"The tabs JavaScript handles:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Click events on tab buttons"}),`
`,e.jsx(n.li,{children:"Keyboard navigation (arrow keys, Enter, Space)"}),`
`,e.jsx(n.li,{children:"Focus management for accessibility"}),`
`,e.jsx(n.li,{children:"ARIA state updates (aria-selected)"}),`
`,e.jsx(n.li,{children:"Show/hide logic for tab panels"}),`
`,e.jsx(n.li,{children:"URL hash support (optional, for deep linking)"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing see the ",e.jsx(n.a,{href:"?path=/story/molecules-tabs-visreg",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h3,{id:"testing-considerations",children:"Testing Considerations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Test with varying numbers of tabs (2, 4, 8+)"}),`
`,e.jsx(n.li,{children:"Test with different content lengths in each panel"}),`
`,e.jsx(n.li,{children:"Test keyboard navigation thoroughly"}),`
`,e.jsx(n.li,{children:"Test with screen readers to verify ARIA implementation"}),`
`,e.jsx(n.li,{children:"Test responsive behavior on narrow screens"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accordion"}),": Alternative for vertically-stacked collapsible content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text Field"}),": Often used within tab panels for formatted content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Layout"}),": Tabs are typically placed within layout components"]}),`
`]}),`
`,e.jsx(n.h2,{id:"alternatives-to-consider",children:"Alternatives to Consider"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accordion"}),": Better for mobile, when users might need to see multiple sections simultaneously, or when vertical space is not a constraint"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Progressive Disclosure"}),": For optional or advanced content that most users won't need"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Separate Pages"}),": When content sections are substantial enough to warrant their own URLs"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Vertical Navigation"}),": When you have many sections (8+) or hierarchical content"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function g(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{g as default};
//# sourceMappingURL=tabs-Xl49PpTQ.js.map
