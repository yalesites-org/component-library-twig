import{u as o,j as e,M as r,C as l,a}from"./blocks-BudrnkdM.js";import{T as c,a as i,c as d}from"./taxonomy-display.stories-DjSMgI8v.js";import{t as h}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./taxonomy-display-BfNjo-BL.js";import"./component-props-De-d7Djp.js";function t(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"taxonomy-display",children:"Taxonomy Display"}),`
`,e.jsx(n.p,{children:'The taxonomy display component shows categorization and metadata for content items. It presents taxonomy terms organized by their vocabulary labels (e.g., "Audience", "Type", "Category"), providing users with quick visual indicators of content classification. Each term is rendered as a clickable link, allowing users to navigate to related content.'}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:`Use the controls panel below to experiment with the taxonomy display's properties in real-time. Toggle the "Show Taxonomy" control to see how the component appears with and without taxonomy terms.`}),`
`,e.jsx(l,{of:i}),`
`,e.jsx(a,{of:i}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(d,"optional"),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-taxonomy-display.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-taxonomy-display.scss"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Semantic HTML structure with proper list markup"}),`
`,e.jsx(n.li,{children:"Links are keyboard accessible with clear focus indicators"}),`
`,e.jsx(n.li,{children:"Vocabulary labels provide context for screen reader users"}),`
`,e.jsx(n.li,{children:"Color is not used as the only means of conveying information"}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Empty State"}),": When a vocabulary has no terms, only the label is displayed"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Multiple Terms"}),": Terms within a vocabulary are displayed inline, separated by visual indicators"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Component Theming"}),": Supports Yale's component theme dial for color variations"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive"}),": Adapts to different screen sizes and container widths"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use consistent vocabulary labels across your site for predictable user experience"}),`
`,e.jsx(n.li,{children:"Keep the number of vocabularies to 3-4 maximum to avoid overwhelming users"}),`
`,e.jsx(n.li,{children:"Ensure taxonomy terms are meaningful and descriptive"}),`
`,e.jsx(n.li,{children:"Use the component theme to visually distinguish different content types or sections"}),`
`,e.jsx(n.li,{children:"Place taxonomy display near content metadata or at the end of content items"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use taxonomy display for navigation (use menu or quick links instead)"}),`
`,e.jsx(n.li,{children:"Don't include too many terms in a single vocabulary (3-5 terms maximum is ideal)"}),`
`,e.jsx(n.li,{children:"Don't use overly technical vocabulary labels that users won't understand"}),`
`,e.jsx(n.li,{children:"Avoid inconsistent vocabulary names across different content types"}),`
`,e.jsx(n.li,{children:"Don't rely solely on color to convey meaning (component themes are decorative)"}),`
`]}),`
`,e.jsx(n.h2,{id:"common-use-cases",children:"Common Use Cases"}),`
`,e.jsx(n.h3,{id:"content-filtering",children:"Content Filtering"}),`
`,e.jsx(n.p,{children:"Display categorization that helps users understand content type and find related items:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Audience"}),": Undergraduates, Graduates, Faculty, Staff"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type"}),": How To, News, Event, Resource"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Category"}),": Learning, Research, Campus Life"]}),`
`]}),`
`,e.jsx(n.h3,{id:"metadata-display",children:"Metadata Display"}),`
`,e.jsx(n.p,{children:"Show structured information about content items in lists, cards, or detail pages."}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all theme variations, see the ",e.jsx(n.a,{href:"?path=/story/molecules-taxonomy-display-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Quick Links"}),": Use for navigation-focused link collections"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cards"}),": Often incorporate taxonomy display for content previews"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text Field"}),": Use for longer-form content metadata"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function b(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{b as default};
//# sourceMappingURL=taxonomy-display-Cw4mIDvI.js.map
