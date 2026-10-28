import{u as l,j as e,M as o,C as c,a as d}from"./blocks-BudrnkdM.js";import{P as h,a as r,c as s}from"./primary-nav.stories-DAbMd_sE.js";import{t}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./primary-nav-3-07Xq0g.js";import"./component-props-De-d7Djp.js";import"./yds-primary-nav-C_WHCIHH.js";function a(n){const i={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:h,name:"Overview"}),`
`,e.jsx(i.h1,{id:"primary-nav",children:"Primary Nav"}),`
`,e.jsx(i.p,{children:"The Primary Nav is the main navigation menu component that provides the core navigation structure for YaleSites. It supports multiple menu variations to accommodate different navigation patterns and user experience requirements. The component is designed to handle complex hierarchical navigation with multiple levels of menu items while maintaining accessibility and responsive behavior."}),`
`,e.jsx(i.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(i.p,{children:"Use the controls panel below to experiment with the primary nav's properties in real-time."}),`
`,e.jsx("div",{className:"sb-tall-canvas",children:e.jsx(c,{of:r})}),`
`,e.jsx(d,{of:r}),`
`,e.jsx(i.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(i.h3,{id:"required-properties",children:"Required Properties"}),`
`,t(s,"required"),`
`,e.jsx(i.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,t(s,"optional"),`
`,e.jsx(i.h2,{id:"menu-variations",children:"Menu Variations"}),`
`,e.jsx(i.p,{children:"The Primary Nav supports three distinct menu variations, each optimized for different navigation scenarios:"}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Basic Menu"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Standard dropdown navigation with simple hover/click interactions. Best
suited for sites with straightforward navigation hierarchies and moderate
content depth. Provides a clean, traditional navigation experience.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Mega Menu"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Expanded multi-column navigation panel that displays all menu items in a
structured grid layout. Ideal for sites with complex navigation structures,
multiple content sections, or deep hierarchies requiring better overview and
discoverability.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Focus Menu"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Full-screen overlay navigation that emphasizes the menu as a primary
interaction. Creates an immersive navigation experience with larger touch
targets and enhanced visual hierarchy. Particularly effective for sites
prioritizing visual impact and user engagement.`})})]})]}),`
`,e.jsx(i.h2,{id:"menu-item-structure",children:"Menu Item Structure"}),`
`,e.jsx(i.p,{children:"Menu items support complex hierarchical structures with the following properties:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"title"}),": The display text for the menu item"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"url"}),": The link destination (can be internal or external)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"below"}),": Optional nested array of child menu items (supports multiple levels)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"is_active"}),": Boolean to mark the current active page"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"is_cas"}),": Boolean to indicate CAS authentication requirement"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"list"}),"item",e.jsx(i.strong,{children:"is_heading"}),": Boolean to render item as a section heading"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"heading_cta"}),": Optional call-to-action text for heading items"]}),`
`]}),`
`,e.jsx(i.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(i.p,{children:[e.jsx("code",{children:"yds-primary-nav.twig"}),", ",e.jsx("code",{children:"yds-primary-nav.js"}),","," ",`
`,e.jsx("code",{children:"_yds-primary-nav.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(i.p,{children:`ARIA navigation landmark, keyboard navigation with arrow keys and
Enter/Escape, focus management for nested menus, screen reader support
for menu state and hierarchy`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(i.p,{children:`Transforms to mobile-optimized menu at smaller viewports,
touch-friendly interactions, collapsible submenu sections`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"JavaScript"})}),e.jsx("td",{children:e.jsx(i.p,{children:`Manages dropdown interactions, keyboard navigation, mobile menu
toggle, and focus trap for accessibility`})})]})]})})}),`
`,e.jsx(i.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(i.h3,{id:"menu-variation-selection",children:"Menu Variation Selection"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Basic menu"}),": Use for sites with 3-7 top-level items and simple dropdown structures"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Mega menu"}),": Best for sites with 5-10 top-level items and complex hierarchies requiring multi-column display"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Focus menu"}),": Ideal for visual-first sites or when navigation deserves special emphasis"]}),`
`]}),`
`,e.jsx(i.h3,{id:"navigation-hierarchy",children:"Navigation Hierarchy"}),`
`,e.jsx(i.p,{children:"The Primary Nav supports multi-level hierarchies:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Level 1: Top-level navigation items"}),`
`,e.jsx(i.li,{children:"Level 2: Primary dropdown items"}),`
`,e.jsx(i.li,{children:"Level 3: Nested submenu items"}),`
`]}),`
`,e.jsx(i.p,{children:"Keep hierarchies shallow when possible for optimal user experience. Consider mega menu for deeper structures."}),`
`,e.jsx(i.h3,{id:"link-types",children:"Link Types"}),`
`,e.jsx(i.p,{children:"The component supports various link types:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Internal site links"}),`
`,e.jsx(i.li,{children:"External URLs (automatically detected)"}),`
`,e.jsx(i.li,{children:"PDF and document downloads (indicated with appropriate icons)"}),`
`,e.jsx(i.li,{children:"CAS-authenticated links (marked with special styling)"}),`
`]}),`
`,e.jsx(i.h3,{id:"accessibility-considerations",children:"Accessibility Considerations"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Ensure all menu items have descriptive, meaningful labels"}),`
`,e.jsx(i.li,{children:"Test keyboard navigation thoroughly across all menu levels"}),`
`,e.jsx(i.li,{children:"Verify screen reader announcements for menu state changes"}),`
`,e.jsx(i.li,{children:"Maintain sufficient color contrast in all theme variations"}),`
`,e.jsx(i.li,{children:"Provide clear focus indicators for all interactive elements"}),`
`]}),`
`,e.jsx(i.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Site Header"})," - Container component that includes the Primary Nav"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Utility Nav"})," - Secondary navigation for utility links"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Menu Toggle"})," - Mobile hamburger menu control"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Breadcrumbs"})," - Complementary wayfinding component"]}),`
`]}),`
`,e.jsx(i.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(i.p,{children:["For comprehensive testing of all menu variations and theme combinations, see the ",e.jsx(i.a,{href:"?path=/story/organisms-menu-primary-nav-visreg--old-blues",children:"Visreg page"}),"."]})]})}function w(n={}){const{wrapper:i}={...l(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(a,{...n})}):a(n)}export{w as default};
//# sourceMappingURL=primary-nav-BnMFEZFI.js.map
