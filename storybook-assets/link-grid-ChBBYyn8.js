import{u as r,j as e,M as l,C as o,a as d}from"./blocks-BudrnkdM.js";import{L as c,l as s,c as h}from"./link-grid.stories-C3BqpqWM.js";import{t as a}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./component-props-De-d7Djp.js";import"./link-grid-BHgT2epy.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"link-grid",children:"Link Grid"}),`
`,e.jsx(n.p,{children:"The link grid component displays a collection of links in a responsive multi-column grid layout. It provides flexible theming and visual treatment options for organizing groups of related links with clear visual separation."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the link grid's properties in real-time."}),`
`,e.jsx(o,{of:s}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,a(h,"optional"),`
`,e.jsx(n.h2,{id:"theme-options",children:"Theme Options"}),`
`,e.jsx(n.p,{children:"This component supports the following theme variations:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"One through Five"}),": Custom theme dials that override global settings with component-specific colors"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"link_grid__theme"})," property to apply different themes. The theme affects link colors, hover states, and visual accents."]}),`
`,e.jsx(n.h2,{id:"line-treatment-options",children:"Line Treatment Options"}),`
`,e.jsx(n.p,{children:"The link grid offers four line treatment options for visual separation:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"default"}),": Standard line treatment with contextual styling"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"all_strong_lines"}),": Bold, prominent dividing lines between all items"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"all_light_lines"}),": Subtle, light dividing lines between all items"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"no_lines"}),": No dividing lines, clean spacing only"]}),`
`]}),`
`,e.jsx(n.p,{children:"Choose the line treatment that best fits your content density and visual hierarchy needs."}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-link-grid.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-link-grid.scss"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Uses semantic HTML list structure for proper screen reader navigation"}),`
`,e.jsx(n.li,{children:"All links are keyboard accessible with clear focus indicators"}),`
`,e.jsx(n.li,{children:"Screen readers announce the grid structure and total link count"}),`
`,e.jsx(n.li,{children:"Color themes meet WCAG contrast requirements"}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Responsive grid layout adapts from multi-column to single column on mobile"}),`
`,e.jsx(n.li,{children:"Standard link styling with theme-aware hover and focus states"}),`
`,e.jsx(n.li,{children:"Grid items automatically reflow based on container width"}),`
`,e.jsx(n.li,{children:"Works without JavaScript"}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use link grids for collections of 6-20 related links"}),`
`,e.jsx(n.li,{children:"Choose line treatments that complement the surrounding content density"}),`
`,e.jsx(n.li,{children:"Select themes that provide sufficient contrast with the page background"}),`
`,e.jsx(n.li,{children:"Ensure link text is concise and descriptive (2-5 words recommended)"}),`
`,e.jsx(n.li,{children:"Group related links together for easier scanning"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use link grids for very small link sets (use link group instead)"}),`
`,e.jsx(n.li,{children:"Avoid mixing link grids with vastly different line treatments on the same page"}),`
`,e.jsx(n.li,{children:"Don't use overly long link text that disrupts the grid layout"}),`
`,e.jsx(n.li,{children:"Avoid creating too many link grid sections that overwhelm the page"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all link grid variations, theme combinations, and line treatments, see the ",e.jsx(n.a,{href:"?path=/story/molecules-link-grid-visreg",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Link Group"}),": Use for simple vertical list of links without grid layout"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Card Collection"}),": Alternative for presenting links with additional context and imagery"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Menu"}),": Consider for primary navigation structures"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function y(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{y as default};
//# sourceMappingURL=link-grid-ChBBYyn8.js.map
