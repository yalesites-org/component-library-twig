import{u as l,j as e,M as d,C as a,a as c}from"./blocks-C3MhvIPG.js";import{L as h,l as s,c as t}from"./layout.stories-C5vi5Yl5.js";import{t as r}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./text-field-C6YFoNit.js";import"./accordion-CnJdIhT5.js";import"./image-CSdbOboU.js";import"./component-props-De-d7Djp.js";import"./yds-accordion-B9t65mH8.js";function o(i){const n={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"layout",children:"Layout"}),`
`,e.jsx(n.p,{children:"The layout component provides page-level structure with configurable content regions. It supports multiple column configurations, optional visual dividers between regions, and flexible padding controls to create organized, scannable page layouts. The layout component is themable and can accommodate various content types in each region."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the layout's properties in real-time."}),`
`,e.jsx(a,{of:s}),`
`,e.jsx(c,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(t,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(t,"optional"),`
`,e.jsx(n.h2,{id:"layout-configurations",children:"Layout Configurations"}),`
`,e.jsx(n.p,{children:"The layout component supports four distinct column configurations for different content arrangement needs:"}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Fifty-Fifty"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Two equal-width columns providing balanced space for primary and
secondary content. Ideal for side-by-side comparisons or complementary
content.`})})]})," ",e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Seventy-Thirty"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Asymmetric layout with a wider primary region (70%) and narrower secondary
region (30%). Perfect for main content with sidebar navigation or
supplementary information.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Thirty-Seventy"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Seventy-Thirty with the columns flipped: a narrower primary region (30%) on
the left and a wider secondary region (70%). The narrow column comes first
in source order, so it also stacks first on mobile.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Thirty-Thirty-Thirty"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Three equal-width columns for distributing content evenly across the
layout. Supports an optional tertiary region. Best for showcasing
multiple related content blocks.`})})]})]}),`
`,e.jsx(n.h2,{id:"visual-dividers",children:"Visual Dividers"}),`
`,e.jsxs(n.p,{children:["When ",e.jsx("code",{children:"layout__divider"})," is set to ",e.jsx("code",{children:"'true'"}),", visual dividers appear between layout regions to create clear separation between content areas. In the three-column layout, dividers appear between all three columns when enabled."]}),`
`,e.jsx(n.h2,{id:"padding-options",children:"Padding Options"}),`
`,e.jsx(n.p,{children:"The layout component provides flexible padding controls to accommodate different page compositions:"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Padding Options",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Option"}),e.jsx("th",{children:"Description"}),e.jsx("th",{children:"Use Case"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"default"})}),e.jsx("td",{children:"Standard vertical padding on top and bottom"}),e.jsx("td",{children:"Standalone layout sections with consistent spacing"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"no-top"})}),e.jsx("td",{children:"Removes top padding only"}),e.jsx("td",{children:"When layout follows another component closely"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"no-bottom"})}),e.jsx("td",{children:"Removes bottom padding only"}),e.jsx("td",{children:"When layout is followed by another component closely"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"no-padding"})}),e.jsx("td",{children:"Removes both top and bottom padding"}),e.jsx("td",{children:"Full-bleed layouts or when nested within other containers"})]})]})]})}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("code",{children:"yds-layout.twig"}),", ",e.jsx("code",{children:"_yds-layout.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Semantic HTML structure, maintains proper content flow, responsive
reflow for small viewports, keyboard navigable`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Multi-column layouts reflow to single column on small screens,
maintains content hierarchy and readability across all devices`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"layout-selection",children:"Layout Selection"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Fifty-Fifty"}),": Use when both content areas have equal importance and similar content volume"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Seventy-Thirty"}),": Use when one content area is primary with supporting content in the sidebar"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Thirty-Thirty-Thirty"}),": Use when showcasing three related content blocks of equal importance"]}),`
`]}),`
`,e.jsx(n.h3,{id:"divider-usage",children:"Divider Usage"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Enable dividers when content regions need clear visual separation"}),`
`,e.jsx(n.li,{children:"Consider disabling dividers for more unified, flowing layouts"}),`
`,e.jsx(n.li,{children:"Dividers work well with contrasting content types (text vs. images, forms vs. navigation)"}),`
`]}),`
`,e.jsx(n.h3,{id:"padding-configuration",children:"Padding Configuration"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use default padding for most standalone layout sections"}),`
`,e.jsx(n.li,{children:"Remove top padding when stacking multiple layout sections vertically"}),`
`,e.jsx(n.li,{children:"Remove bottom padding when layout precedes another full-width component"}),`
`,e.jsx(n.li,{children:"Use no-padding for full-bleed designs or nested layouts"}),`
`]}),`
`,e.jsx(n.h3,{id:"theme-application",children:"Theme Application"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Apply component themes to coordinate layout appearance with page color schemes"}),`
`,e.jsx(n.li,{children:"Themes affect background colors and divider styling"}),`
`,e.jsx(n.li,{children:"Ensure sufficient contrast between theme colors and content for readability"}),`
`]}),`
`,e.jsx(n.h3,{id:"content-considerations",children:"Content Considerations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep content balanced across regions for visual harmony"}),`
`,e.jsx(n.li,{children:"Avoid extremely disparate content lengths in multi-column layouts"}),`
`,e.jsx(n.li,{children:"Ensure tertiary content is provided when using three-column layout"}),`
`,e.jsx(n.li,{children:"Test layouts with varying content lengths to ensure responsive behavior"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Two Column"})," - Legacy two-column layout component"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grid"})," - Base grid system for component layout"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Divider"})," - Standalone divider component"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Block Wrapper"})," - Wraps content blocks with consistent spacing"]}),`
`]}),`
`,e.jsx(n.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive testing of all layout variations including column configurations, themes, padding options, and divider combinations, see the ",e.jsx(n.a,{href:"?path=/story/templates-layout-visreg--old-blues",children:"Visreg page"}),"."]})]})}function S(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{S as default};
//# sourceMappingURL=layout-BBnMEL7Q.js.map
