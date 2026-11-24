import{u as l,j as e,M as c,C as a,a as d}from"./blocks-BF-hIz2y.js";import{C as h,c as i,a as r}from"./custom-card-collection.stories-DNkeOtNh.js";import{t}from"./twig-props-table-o51izXGZ.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-DoCra1Lx.js";import"./color-global-themes-C7UI5K9x.js";import"./custom-card-ChKUw6IK.js";import"./image-CSdbOboU.js";import"./component-props-De-d7Djp.js";function o(s){const n={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"custom-card-collection",children:"Custom Card Collection"}),`
`,e.jsx(n.p,{children:"Custom Card Collection displays custom cards with flexible layouts. Unlike standard card collections, custom cards allow for more creative content presentation with customizable snippets, images, and link destinations. This component is ideal for curated content groupings, featured sections, or promotional content that requires a tailored approach."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the custom card collection's properties in real-time."}),`
`,e.jsx(a,{of:i}),`
`,e.jsx(d,{of:i}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,t(r,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,t(r,"optional"),`
`,e.jsx(n.h2,{id:"card-size",children:"Card Size"}),`
`,e.jsxs(n.p,{children:[e.jsx("code",{children:"custom_card_collection__card_size"}),` sets how big each card is. It is
a size choice, the same Small and Large wording the card collection uses.`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Small"})," (default): the 4-up grid collections have always rendered, with a top bar on cards without images."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Large"}),": bigger cards in the Large grid of the card collection, 3 across a full-width region."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Anything other than ",e.jsx("code",{children:"'large'"})," renders small, so collections saved before the option existed look the same."]}),`
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
navigable links, sufficient color contrast, alt text for images`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Both sizes collapse to one column on small screens and adapt the
number of columns to the viewport and region width`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"large-collections",children:"Large Collections"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use large cards when each card has strong imagery and a short message"}),`
`,e.jsx(n.li,{children:"Large cards fit 3 across a full-width region"}),`
`]}),`
`,e.jsx(n.h3,{id:"small-collections",children:"Small Collections"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Small cards work best with 4 cards for balanced grid presentation"}),`
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
`,e.jsxs(n.p,{children:["For comprehensive testing of all custom card collection variations including small and large card sizes and image display options, see the ",e.jsx(n.a,{href:"?path=/story/organisms-card-collection-custom-card-collection-visreg--old-blues",children:"Visreg page"}),"."]})]})}function y(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{y as default};
//# sourceMappingURL=custom-card-collection-C0I0FqWk.js.map
