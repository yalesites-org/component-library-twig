import{u as o,j as e,M as l,C as d,a as c}from"./blocks-C3MhvIPG.js";import{C as h,c as s,a as t}from"./custom-card-collection.stories-DZnsOVcj.js";import{t as r}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./color-global-themes-C7UI5K9x.js";import"./custom-card-ChKUw6IK.js";import"./image-CSdbOboU.js";import"./component-props-De-d7Djp.js";function a(i){const n={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"custom-card-collection",children:"Custom Card Collection"}),`
`,e.jsx(n.p,{children:"Custom Card Collection displays custom cards with flexible layouts. Unlike standard card collections, custom cards allow for more creative content presentation with customizable snippets, images, and link destinations. This component is ideal for curated content groupings, featured sections, or promotional content that requires a tailored approach."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the custom card collection's properties in real-time."}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(c,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(t,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(t,"optional"),`
`,e.jsx(n.h2,{id:"featured-layout",children:"Featured Layout"}),`
`,e.jsxs(n.p,{children:["When ",e.jsx("code",{children:"custom_card_collection__featured"})," is set to ",e.jsx("code",{children:"'true'"}),", the collection displays with a featured layout where the first card appears larger and more prominently than the subsequent cards. This creates visual hierarchy and draws attention to the primary content."]}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Featured Layout (3 cards)"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`One large featured card on the left, with two smaller cards stacked on
the right. Creates strong visual hierarchy and emphasizes the primary
content while maintaining context with related items.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Standard Layout (4 cards)"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Equal-sized cards in a responsive grid layout. Provides balanced
presentation where all items have equal visual weight. Adapts to
viewport size for optimal viewing across devices.`})})]})]}),`
`,e.jsx(n.h2,{id:"image-display-options",children:"Image Display Options"}),`
`,e.jsx(n.p,{children:"Custom cards support flexible image display:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"With images enabled"}),": Full visual presentation with 3x2 aspect ratio images that enhance engagement"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"With images disabled"}),": Text-focused presentation that maximizes content density and readability"]}),`
`]}),`
`,e.jsx(n.p,{children:"The image display setting applies to all cards in the collection uniformly."}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("code",{children:"yds-custom-card-collection.twig"}),","," ",`
`,e.jsx("code",{children:"_yds-custom-card-collection.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Semantic HTML list structure, proper heading hierarchy, keyboard
navigable links, sufficient color contrast, alt text for images`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Featured layout stacks vertically on mobile, standard grid adapts
columns based on viewport size, maintains readability across all
devices`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"featured-collections",children:"Featured Collections"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use featured layout to highlight the most important or compelling content"}),`
`,e.jsx(n.li,{children:"Optimal with 3 cards (1 featured + 2 supporting)"}),`
`,e.jsx(n.li,{children:"Ensure the first card contains the most engaging content, visuals, and messaging"}),`
`,e.jsx(n.li,{children:"Featured layout creates asymmetric visual interest and natural reading flow"}),`
`]}),`
`,e.jsx(n.h3,{id:"standard-collections",children:"Standard Collections"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Standard layout works best with 4 cards for balanced grid presentation"}),`
`,e.jsx(n.li,{children:"Can accommodate more cards if needed, maintaining responsive grid behavior"}),`
`,e.jsx(n.li,{children:"Use when all items should have equal visual prominence"}),`
`,e.jsx(n.li,{children:"Provides clean, organized content presentation"}),`
`]}),`
`,e.jsx(n.h3,{id:"content-recommendations",children:"Content Recommendations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep heading text concise and descriptive (under 70 characters)"}),`
`,e.jsx(n.li,{children:"Limit snippet text to 2-3 sentences for scannable content"}),`
`,e.jsx(n.li,{children:"Ensure custom card content aligns thematically when grouped in a collection"}),`
`,e.jsx(n.li,{children:"Use high-quality images with appropriate aspect ratios (3x2)"}),`
`,e.jsx(n.li,{children:"Verify all URLs are valid and lead to relevant destinations"}),`
`]}),`
`,e.jsx(n.h3,{id:"when-to-use-custom-cards-vs-reference-cards",children:"When to Use Custom Cards vs Reference Cards"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Custom Cards"}),": For curated, promotional, or featured content that needs custom snippets and destinations"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reference Cards"}),": For automated content feeds from posts, events, profiles, or resources"]}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Custom Card"})," - Individual custom card component"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Card Collection"})," - Collection of automated reference cards for posts, events, profiles, and resources"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grid"})," - Base grid system used for layout"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Heading"})," - Text component for collection headings"]}),`
`]}),`
`,e.jsx(n.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive testing of all custom card collection variations including featured/standard layouts and image display options, see the ",e.jsx(n.a,{href:"?path=/story/organisms-card-collection-custom-card-collection-visreg--old-blues",children:"Visreg page"}),"."]})]})}function b(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}export{b as default};
//# sourceMappingURL=custom-card-collection-BTHhdQAz.js.map
