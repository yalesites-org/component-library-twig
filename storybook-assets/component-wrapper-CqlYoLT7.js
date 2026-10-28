import{u as r,j as e,M as o,C as l,a as c}from"./blocks-BudrnkdM.js";import{C as d,a as t,c as a}from"./component-wrapper.stories-DkZVqBQv.js";import{t as h}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./component-props-De-d7Djp.js";function s(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"component-wrapper",children:"Component Wrapper"}),`
`,e.jsx(n.p,{children:"The component wrapper provides consistent spacing and theming around components. It establishes standardized width constraints and alignment for content throughout the site, ensuring visual consistency and proper content presentation across different viewport sizes. Component wrappers are essential for maintaining a cohesive layout system."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the component wrapper's properties in real-time."}),`
`,e.jsx(l,{of:t}),`
`,e.jsx(c,{of:t}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,e.jsx(n.p,{children:"This component has no strictly required properties, but typically includes content within its blocks."}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(a,"optional"),`
`,e.jsx(n.h2,{id:"width-options",children:"Width Options"}),`
`,e.jsx(n.p,{children:"The component wrapper supports two width configurations to accommodate different content types and layout requirements:"}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Content"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Narrowest width option optimized for readable text content. Ideal for
articles, blog posts, and text-heavy pages where line length affects
readability.`})}),e.jsxs("p",{style:{fontSize:"0.85rem",marginTop:"0.5rem",marginBottom:0},children:[e.jsx("strong",{children:"Value:"}),e.jsx("code",{children:"'content'"})]})]})," ",e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Site"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Standard site width (default). Provides consistent width for most components
and maintains the overall site layout. Use for general content areas, cards,
and multi-column layouts.`})}),e.jsxs("p",{style:{fontSize:"0.85rem",marginTop:"0.5rem",marginBottom:0},children:[e.jsx("strong",{children:"Value:"}),e.jsx("code",{children:"'site'"})]})]})]}),`
`,e.jsx(n.h2,{id:"margin-modifiers",children:"Margin Modifiers"}),`
`,e.jsx(n.p,{children:"The component wrapper includes optional margin modifiers for fine-tuned spacing control:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No Top Margin"})," (",e.jsx(n.code,{children:"no-top-margin"}),"): Removes top margin when the component directly follows another element with adequate spacing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No Bottom Margin"})," (",e.jsx(n.code,{children:"no-bottom-margin"}),"): Removes bottom margin when the component is followed by another element that provides spacing"]}),`
`]}),`
`,e.jsxs(n.p,{children:["These modifiers are applied through the ",e.jsx(n.code,{children:"component__modifiers"})," array property."]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("code",{children:"yds-component-wrapper.twig"}),","," ",`
`,e.jsx("code",{children:"_yds-component-wrapper.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Semantic HTML structure, maintains proper document outline, preserves
content accessibility`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Width constraints adjust responsively to maintain appropriate content
width across all viewport sizes. On mobile, both width options
collapse to full width with appropriate padding.`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"when-to-use-each-width",children:"When to Use Each Width"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Content Width"}),": Use for body text, articles, and any content where readability is paramount. This width optimizes line length for comfortable reading (typically 45-75 characters per line)."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Site Width (Default)"}),": Use for most components including card collections, forms, tables, and general page content. This maintains consistency with the overall site layout."]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"spacing-consistency",children:"Spacing Consistency"}),`
`,e.jsx(n.p,{children:"The component wrapper is fundamental to maintaining consistent page layouts:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Apply width settings consistently across similar content types"}),`
`,e.jsx(n.li,{children:"Consider how adjacent components with different widths will appear together"}),`
`,e.jsx(n.li,{children:"Use margin modifiers to prevent excessive white space between stacked components"}),`
`,e.jsx(n.li,{children:"Test layouts across viewport sizes to ensure content remains accessible"}),`
`]}),`
`,e.jsx(n.h3,{id:"common-patterns",children:"Common Patterns"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Article Content"}),": Content width for main text, site width for embedded media"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Landing Pages"}),": Site width for most components, content width for intro text"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Dashboard Layouts"}),": Site width for most components, including data tables"]}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use content width for wide components like multi-column layouts or data tables"}),`
`,e.jsx(n.li,{children:"Don't mix too many different widths on a single page as it disrupts visual flow"}),`
`,e.jsx(n.li,{children:"Avoid using margin modifiers unless there's a specific spacing issue to resolve"}),`
`]}),`
`,e.jsx(n.h2,{id:"integration-with-block-wrapper",children:"Integration with Block Wrapper"}),`
`,e.jsx(n.p,{children:"Component wrappers often work in conjunction with block wrappers:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Block Wrapper"}),": Controls vertical padding/spacing between sections"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Component Wrapper"}),": Controls horizontal width constraints and alignment"]}),`
`]}),`
`,e.jsx(n.p,{children:"When used together, they provide complete control over both vertical and horizontal spacing, ensuring consistent layouts throughout the site."}),`
`,e.jsx(n.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive testing of all component wrapper width variations, see the ",e.jsx(n.a,{href:"?path=/story/templates-component-wrapper-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Block Wrapper"}),": Provides vertical padding and spacing between content sections"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grid"}),": Layout component often used within component wrappers for multi-column layouts"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Section"}),": Higher-level container for grouping related components"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function y(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{y as default};
//# sourceMappingURL=component-wrapper-CqlYoLT7.js.map
