import{u as c,j as e,M as a,C as l,a as d}from"./blocks-C3MhvIPG.js";import{A as h,a as s,c as o}from"./accordion.stories-Dsg5CQOO.js";import{t as r}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./accordion-CnJdIhT5.js";import"./component-props-De-d7Djp.js";import"./yds-accordion-B9t65mH8.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...c(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"accordion",children:"Accordion"}),`
`,e.jsx(n.p,{children:"The accordion component allows users to show and hide sections of related content on a page. Each accordion item contains a heading that users can click or tap to reveal associated content. This component helps organize dense information into scannable, expandable sections that reduce page clutter and improve the user experience."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the accordion's properties in real-time."}),`
`,e.jsx(l,{of:s}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(o,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(o,"optional"),`
`,e.jsx(n.h2,{id:"theme-options",children:"Theme Options"}),`
`,e.jsx(n.p,{children:"This component supports the following theme variations:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": Standard theme using global color settings"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"One through Five"}),": Custom theme dials that override global settings with component-specific colors"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"accordion__theme"})," property to apply different themes. The theme affects the visual styling of accordion items, including hover states and active item indicators."]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-accordion.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-accordion.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"yds-accordion.js"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Uses semantic HTML ",e.jsx(n.code,{children:"<details>"})," and ",e.jsx(n.code,{children:"<summary>"})," elements for native accordion functionality"]}),`
`,e.jsx(n.li,{children:"Keyboard accessible: Users can navigate between items with Tab key and toggle items with Enter or Space"}),`
`,e.jsx(n.li,{children:"Screen reader friendly: Proper semantic structure announces expanded/collapsed states"}),`
`,e.jsx(n.li,{children:"ARIA attributes included for enhanced screen reader support"}),`
`,e.jsx(n.li,{children:"Focus indicators visible for keyboard navigation"}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Accordion items can be expanded or collapsed by clicking the heading"}),`
`,e.jsx(n.li,{children:"Multiple items can be open simultaneously (independent operation)"}),`
`,e.jsxs(n.li,{children:["JavaScript enhances the native ",e.jsx(n.code,{children:"<details>"})," behavior with smooth animations"]}),`
`,e.jsx(n.li,{children:"Accordion state persists during page interaction but resets on page reload"}),`
`,e.jsxs(n.li,{children:["Works without JavaScript using native browser ",e.jsx(n.code,{children:"<details>"})," functionality as a fallback"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use accordions to organize related content into logical groups"}),`
`,e.jsx(n.li,{children:"Keep accordion item headings clear and descriptive (45 characters or less recommended)"}),`
`,e.jsx(n.li,{children:"Place the most important information in the first few items"}),`
`,e.jsxs(n.li,{children:["Consider using an overall ",e.jsx(n.code,{children:"accordion__heading"})," to provide context for the entire group"]}),`
`,e.jsx(n.li,{children:"Limit the number of accordion items to 10 or fewer for better usability"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't hide critical information that users need to see immediately"}),`
`,e.jsx(n.li,{children:"Don't use accordions for short content that could be displayed on the page"}),`
`,e.jsx(n.li,{children:"Avoid nesting accordions within accordions (creates confusing navigation)"}),`
`,e.jsx(n.li,{children:"Don't rely solely on accordions for navigation (use proper navigation components)"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all accordion variations and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/molecules-accordion-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tabs"}),": Alternative pattern for organizing content when users need to compare information across categories"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Card Collection"}),": Consider for displaying multiple expandable content blocks with richer visual treatment"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function w(i={}){const{wrapper:n}={...c(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{w as default};
//# sourceMappingURL=accordion-DzHBAUtn.js.map
