import{u as l,j as e,M as c,C as d,a}from"./blocks-C3MhvIPG.js";import{C as h,c as s,a as r}from"./custom-card.stories-C45xwvCM.js";import{t}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./custom-card-ChKUw6IK.js";import"./image-CSdbOboU.js";import"./component-props-De-d7Djp.js";function o(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"custom-card",children:"Custom Card"}),`
`,e.jsx(n.p,{children:"Custom Card displays customizable card content with flexible layouts. It provides a clean, structured way to present headings, snippets of text, and optional images in a card format. Custom cards are designed to be used within a card collection container and support both text-only and image-enhanced layouts."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the custom card's properties in real-time. Test with and without images, toggle featured status, and adjust content."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(d,{of:s})}),`
`,e.jsx(a,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,t(r,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,t(r,"optional"),`
`,e.jsx(n.h3,{id:"twig-only-props",children:"Twig-Only Props"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Twig-Only Props",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"custom_card__url"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Required. URL for the card heading link. Provided by the CMS; not an
interactive Storybook control.`})})]})})]})}),`
`,e.jsx(n.h2,{id:"component-variations",children:"Component Variations"}),`
`,e.jsx(n.h3,{id:"with-and-without-images",children:"With and Without Images"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"With Image"}),": Displays a responsive image alongside the card content, creating a richer visual presentation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Without Image"}),": Shows only the heading and snippet text for a cleaner, text-focused card"]}),`
`]}),`
`,e.jsx(n.h3,{id:"featured-collection",children:"Featured Collection"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"data-collection-featured"})," attribute controls the visual treatment of the card collection, affecting spacing, sizing, and layout presentation."]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-custom-card.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-custom-card.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"yds-custom-card.js"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Heading level automatically adjusts based on context (h2 or h3 depending on collection heading presence)"}),`
`,e.jsxs(n.li,{children:["Image links include proper ",e.jsx(n.code,{children:"aria-label"})," attributes using the card heading text"]}),`
`,e.jsxs(n.li,{children:["Image links are marked ",e.jsx(n.code,{children:'aria-hidden="true"'})," to avoid duplicate link announcements for screen readers"]}),`
`,e.jsx(n.li,{children:"All links are keyboard accessible with visible focus indicators"}),`
`,e.jsx(n.li,{children:"Maintains proper semantic HTML structure"}),`
`]}),`
`,e.jsx(n.h3,{id:"responsive-behavior",children:"Responsive Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Images use responsive image patterns to optimize for different screen sizes and devices"}),`
`,e.jsx(n.li,{children:"Card layouts adapt based on the collection configuration"}),`
`,e.jsx(n.li,{children:"Content reflows gracefully on smaller screens"}),`
`,e.jsx(n.li,{children:"Touch-friendly click targets for mobile devices"}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep headings concise and descriptive (5-7 words maximum)"}),`
`,e.jsx(n.li,{children:"Use snippet text to provide context without overwhelming users (1-2 sentences)"}),`
`,e.jsx(n.li,{children:"Choose images that are relevant to the card content and maintain visual consistency across a collection"}),`
`,e.jsx(n.li,{children:"Group related cards together in collections for better information hierarchy"}),`
`,e.jsx(n.li,{children:"Ensure card URLs lead to relevant, well-structured destination pages"}),`
`,e.jsx(n.li,{children:"Use featured collection styling sparingly for high-priority content"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use overly long headings that break layout on smaller screens"}),`
`,e.jsx(n.li,{children:"Don't include too much text in snippets (reduces scannability)"}),`
`,e.jsx(n.li,{children:"Avoid mixing cards with and without images in the same collection (creates visual inconsistency)"}),`
`,e.jsx(n.li,{children:"Don't use custom cards for navigation purposes (use proper navigation components)"}),`
`,e.jsx(n.li,{children:"Don't overwhelm pages with too many card collections (limit to 1-2 per page)"}),`
`,e.jsx(n.li,{children:"Avoid generic or unclear link text in headings"}),`
`]}),`
`,e.jsx(n.h3,{id:"when-to-use-custom-cards",children:"When to Use Custom Cards"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Showcasing featured content, news, or updates"}),`
`,e.jsx(n.li,{children:"Displaying program or course offerings"}),`
`,e.jsx(n.li,{children:"Presenting research projects or initiatives"}),`
`,e.jsx(n.li,{children:"Highlighting services or resources"}),`
`,e.jsx(n.li,{children:"Creating visual entry points to deeper content"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Card Collection"}),": The container component used to display multiple custom cards"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Event Card"}),": Use for event-specific information with dates and times"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Profile Card"}),": Use for people or directory listings"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text Field"}),": Consider for longer-form content without the card visual treatment"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function b(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{b as default};
//# sourceMappingURL=custom-card-CcRIdBZG.js.map
