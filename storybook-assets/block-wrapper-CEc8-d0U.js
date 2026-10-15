import{u as d,j as e,M as l,C as a,a as c}from"./blocks-C3MhvIPG.js";import{B as p,a as s,c as r}from"./block-wrapper.stories-Cz_dhwkx.js";import{t as o}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./component-props-De-d7Djp.js";function t(i){const n={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...d(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:p,name:"Overview"}),`
`,e.jsx(n.h1,{id:"block-wrapper",children:"Block Wrapper"}),`
`,e.jsx(n.p,{children:"The block wrapper component wraps content blocks with consistent spacing and theming. It provides standardized vertical padding between blocks and sections, ensuring visual rhythm and proper content separation throughout the site. Block wrappers are the foundation for maintaining consistent spacing across all content types."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the block wrapper's properties in real-time."}),`
`,e.jsx(a,{of:s}),`
`,e.jsx(c,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,o(r,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,o(r,"optional"),`
`,e.jsx(n.h2,{id:"padding-modifiers",children:"Padding Modifiers"}),`
`,e.jsx(n.p,{children:"The block wrapper supports four padding configurations to accommodate different layout requirements:"}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Padding on both top and bottom"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Standard vertical padding on both top and bottom. Use for most content
blocks to maintain consistent spacing throughout the page.`})}),e.jsxs("p",{style:{fontSize:"0.85rem",marginTop:"0.5rem",marginBottom:0},children:[e.jsx("strong",{children:"Class:"}),e.jsx("code",{children:"ys-block-wrapper--padding-default"})]})]})," ",e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"No top padding"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Removes top padding while maintaining bottom padding. Ideal for blocks that
follow headers or when creating tighter visual groupings.`})}),e.jsxs("p",{style:{fontSize:"0.85rem",marginTop:"0.5rem",marginBottom:0},children:[e.jsx("strong",{children:"Class:"}),e.jsx("code",{children:"ys-block-wrapper--padding-no-top"})]})]})," ",e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"No bottom padding"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Removes bottom padding while maintaining top padding. Useful for blocks that
precede footers or when content flows directly into the next section.`})}),e.jsxs("p",{style:{fontSize:"0.85rem",marginTop:"0.5rem",marginBottom:0},children:[e.jsx("strong",{children:"Class:"}),e.jsx("code",{children:"ys-block-wrapper--padding-no-bottom"})]})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"No padding (removes both top and bottom padding)"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Removes all vertical padding. Use when the wrapped content provides its
own spacing or when creating edge-to-edge layouts.`})}),e.jsxs("p",{style:{fontSize:"0.85rem",marginTop:"0.5rem",marginBottom:0},children:[e.jsx("strong",{children:"Class:"}),e.jsx("code",{children:"ys-block-wrapper--padding-no-padding"})]})]})]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("code",{children:"yds-block-wrapper.twig"}),","," ",`
`,e.jsx("code",{children:"_yds-block-wrapper.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Semantic HTML wrapper, maintains proper document flow, preserves
content accessibility`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Padding values adjust responsively to maintain appropriate spacing
across all viewport sizes`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"when-to-use-each-modifier",children:"When to Use Each Modifier"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Padding on both top and bottom"}),": Use for standard content blocks in the main content area"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No top padding"}),": Use when a block immediately follows a hero section, page header, or another block that provides bottom spacing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No bottom padding"}),": Use when a block is the last element before the footer or before a section that provides its own top spacing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No padding (removes both top and bottom padding)"}),": Use sparingly for full-width components like carousels, maps, or edge-to-edge imagery where wrapper padding would interfere with the design"]}),`
`]}),`
`,e.jsx(n.h3,{id:"spacing-consistency",children:"Spacing Consistency"}),`
`,e.jsx(n.p,{children:"The block wrapper is crucial for maintaining visual rhythm across pages:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Apply consistently to all major content sections"}),`
`,e.jsx(n.li,{children:"Use the same padding modifier for similar content types"}),`
`,e.jsx(n.li,{children:"Consider the relationship between adjacent blocks when choosing modifiers"}),`
`,e.jsx(n.li,{children:"Test how padding combinations appear on different screen sizes"}),`
`]}),`
`,e.jsx(n.h3,{id:"common-patterns",children:"Common Patterns"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Page Content"}),": Default padding for all main content blocks"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hero → Content"}),": No top padding on first content block"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Content → Footer"}),": No bottom padding on last content block"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Full-Width Media"}),": No padding to allow edge-to-edge display"]}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Section"})," - Higher-level container for grouping multiple blocks"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grid"})," - Layout component often used within block wrappers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Content Width"})," - Component that constrains content width within wrappers"]}),`
`]}),`
`,e.jsx(n.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive testing of all block wrapper padding variations, see the ",e.jsx(n.a,{href:"?path=/story/templates-block-wrapper-visreg--old-blues",children:"Visreg page"}),"."]})]})}function w(i={}){const{wrapper:n}={...d(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{w as default};
//# sourceMappingURL=block-wrapper-CEc8-d0U.js.map
