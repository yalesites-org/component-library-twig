import{u as a,j as e,M as l,C as d,a as c}from"./blocks-BudrnkdM.js";import{S as h,H as s,c as r}from"./site-header.stories-ChN9agdN.js";import{t}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./utility-nav-cXaVPHEz.js";import"./primary-nav-3-07Xq0g.js";import"./image-CSdbOboU.js";import"./component-props-De-d7Djp.js";import"./yds-menu-toggle-CCw3uUL5.js";function o(n){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:h,name:"Overview"}),`
`,e.jsx(i.h1,{id:"site-header",children:"Site Header"}),`
`,e.jsx(i.p,{children:"The site header is the primary navigation component that appears at the top of every page. It provides consistent branding, global navigation, and utility links across the entire website. The header supports multiple menu variations, configurable navigation positioning, and flexible theming options to match different site identities while maintaining accessibility and usability standards."}),`
`,e.jsx(i.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(i.p,{children:"Use the controls panel below to experiment with the site header's properties in real-time."}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(c,{of:s}),`
`,e.jsx(i.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(i.h3,{id:"required-properties",children:"Required Properties"}),`
`,t(r,"required"),`
`,e.jsx(i.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,t(r,"optional"),`
`,e.jsx(i.h2,{id:"menu-variations",children:"Menu Variations"}),`
`,e.jsx(i.p,{children:"The site header supports three menu variations, each designed for different navigation needs:"}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Basic Menu"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Standard dropdown navigation suitable for most sites. Simple, clean, and
accessible. Best for sites with moderate navigation complexity.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Mega Menu"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Expanded navigation panel displaying multiple columns of links. Ideal for
sites with deep navigation hierarchies or many top-level sections.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Focus Menu"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Full-screen navigation overlay with optional background image. Creates an
immersive navigation experience. Supports background images for enhanced
visual impact.`})})]})]}),`
`,e.jsx(i.h2,{id:"navigation-positioning",children:"Navigation Positioning"}),`
`,e.jsxs(i.p,{children:["The primary navigation can be aligned to the ",e.jsx(i.strong,{children:"left"}),", ",e.jsx(i.strong,{children:"center"}),", or ",e.jsx(i.strong,{children:"right"})," of the header. This flexibility allows for different visual hierarchies and design approaches while maintaining consistent functionality."]}),`
`,e.jsx(i.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(i.p,{children:[e.jsx("code",{children:"yds-site-header.twig"}),", ",e.jsx("code",{children:"yds-site-header.js"}),","," ",`
`,e.jsx("code",{children:"_yds-site-header.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsxs(i.p,{children:["ARIA landmark role ",e.jsx("code",{children:"banner"}),`, keyboard navigation support,
focus management for dropdown menus, screen reader announcements for
menu state changes`]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(i.p,{children:`Mobile hamburger menu, touch-optimized interactions, adaptive layout
based on viewport size`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"JavaScript"})}),e.jsx("td",{children:e.jsx(i.p,{children:`Handles menu toggle, sticky header behavior, dropdown interactions,
and mobile menu functionality`})})]})]})})}),`
`,e.jsx(i.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(i.h3,{id:"background-images",children:"Background Images"}),`
`,e.jsxs(i.p,{children:["Background images only display when using the ",e.jsx(i.strong,{children:"focus"})," menu variation. Set both ",e.jsx(i.code,{children:"site_header__menu__variation: 'focus'"})," and ",e.jsx(i.code,{children:"site_header__background_image: true"})," to enable this feature."]}),`
`,e.jsx(i.h3,{id:"theme-combinations",children:"Theme Combinations"}),`
`,e.jsx(i.p,{children:"The site header supports independent theme and accent color selection, allowing for nuanced color combinations that align with your site's brand identity. The theme controls the overall header color scheme, while the accent adds highlighting to interactive elements."}),`
`,e.jsx(i.h3,{id:"navigation-complexity",children:"Navigation Complexity"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Basic menu"}),": Best for 3-7 top-level items with simple dropdowns"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Mega menu"}),": Suitable for 5-10 top-level items with multiple sub-levels"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Focus menu"}),": Works well with any number of items, particularly effective for visual-first sites"]}),`
`]}),`
`,e.jsx(i.h3,{id:"accessibility-considerations",children:"Accessibility Considerations"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Ensure sufficient color contrast between text and background colors"}),`
`,e.jsx(i.li,{children:"Test keyboard navigation thoroughly, especially with mega menus"}),`
`,e.jsx(i.li,{children:"Verify screen reader announcements for menu state changes"}),`
`,e.jsx(i.li,{children:"Provide clear focus indicators for all interactive elements"}),`
`]}),`
`,e.jsx(i.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Primary Nav"})," - The main navigation menu within the header"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Utility Nav"})," - Secondary navigation for utility links"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Menu Toggle"})," - Mobile hamburger menu button"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Breadcrumbs"})," - Complementary wayfinding component"]}),`
`]}),`
`,e.jsx(i.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(i.p,{children:["For comprehensive testing of all header variations including theme combinations, menu types, and layout configurations, see the ",e.jsx(i.a,{href:"?path=/story/organisms-global-elements-header-visreg--old-blues",children:"Visreg page"}),"."]})]})}function k(n={}){const{wrapper:i}={...a(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(o,{...n})}):o(n)}export{k as default};
//# sourceMappingURL=site-header-DXobtyzq.js.map
