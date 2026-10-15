import{u as r,j as e,M as o,C as l,a}from"./blocks-C3MhvIPG.js";import{U as d,a as s,c}from"./utility-nav.stories-ClXF0SS3.js";import{t as h}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./utility-nav-cXaVPHEz.js";import"./component-props-De-d7Djp.js";import"./utility-nav-dropdown-menu-RsHeUm6w.js";function t(i){const n={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"utility-nav",children:"Utility Nav"}),`
`,e.jsx(n.p,{children:"The Utility Nav provides quick access to secondary navigation items, utility functions, and calls-to-action in the site header. It serves as a complementary navigation element to the primary navigation, offering users access to important but non-primary features like search, login, contact forms, or other utility links. The component is designed to be flexible and can accommodate various configurations including standard menu items, dropdown menus, search functionality, and call-to-action buttons."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the utility nav's properties in real-time."}),`
`,e.jsx("div",{className:"sb-tall-canvas sb-tall-canvas--short",children:e.jsx(l,{of:s})}),`
`,e.jsx(a,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(c,"optional"),`
`,e.jsx(n.h2,{id:"component-features",children:"Component Features"}),`
`,e.jsx(n.p,{children:"The Utility Nav offers several configurable features that can be used individually or in combination:"}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Standard Menu Items"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Display a horizontal list of utility links such as About, Events, Contact,
or other quick-access pages. These items appear as simple text links in the
utility bar and are ideal for secondary navigation items that don't require
special emphasis.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Search Functionality"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Include an integrated search input field that allows users to search site
content directly from the header. The search feature includes a magnifying
glass icon and accessible form elements with proper ARIA labels for screen
readers.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Call-to-Action Button"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Feature a prominent call-to-action button (such as "Apply Now" or "Give")
styled as a pill-shaped button that stands out from standard links. Supports
theming to match site branding and design requirements.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Dropdown Menu"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Provide access to a grouped set of related links through a dropdown trigger
button. Useful for audience-specific navigation (like "For Students", "For
Faculty") or categorized utility links. Includes proper ARIA attributes for
accessibility.`})})]})]}),`
`,e.jsx(n.h2,{id:"menu-item-structure",children:"Menu Item Structure"}),`
`,e.jsx(n.p,{children:"Menu items use a simple structure with the following properties:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"title"}),": The display text for the menu item"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"url"}),": The link destination (can be internal or external)"]}),`
`]}),`
`,e.jsx(n.p,{children:"Dropdown menu items follow the same structure and are displayed in a vertical list when the dropdown is activated."}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("code",{children:"yds-utility-nav.twig"}),","," ",`
`,e.jsx("code",{children:"utility-nav-dropdown-menu.js"}),","," ",`
`,e.jsx("code",{children:"_yds-utility-nav.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(n.p,{children:`ARIA attributes for dropdown state (aria-expanded, aria-haspopup,
aria-hidden), visually hidden labels for screen readers, keyboard
navigation support, accessible form elements for search`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Adapts to mobile and desktop viewports with screen size-specific form
IDs, optimized layout for smaller screens, touch-friendly interaction
targets`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"JavaScript"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Manages dropdown menu interactions, toggle states, and click-outside
functionality for closing dropdowns`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"component-configuration",children:"Component Configuration"}),`
`,e.jsx(n.p,{children:"The Utility Nav is highly flexible and should be configured based on your site's specific needs:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Minimal setup"}),": Use with just standard menu items for simple utility links"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Search-focused"}),": Enable search without additional menu items for search-centric sites"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action-oriented"}),": Combine search with a prominent CTA button for conversion-focused sites"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Audience segmented"}),": Use dropdown menu to organize links by user type or category"]}),`
`]}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep the number of standard menu items limited (3-5 maximum) to avoid clutter"}),`
`,e.jsx(n.li,{children:"Use clear, concise labels for all navigation items"}),`
`,e.jsx(n.li,{children:"Reserve the CTA button for your most important conversion action"}),`
`,e.jsx(n.li,{children:"Ensure dropdown menu items are logically grouped and clearly labeled"}),`
`,e.jsx(n.li,{children:"Test dropdown interactions on both desktop and mobile devices"}),`
`,e.jsx(n.li,{children:"Verify that search functionality submits to the correct endpoint"}),`
`]}),`
`,e.jsx(n.h3,{id:"link-types",children:"Link Types"}),`
`,e.jsx(n.p,{children:"The component supports various link types:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Internal site pages"}),`
`,e.jsx(n.li,{children:"External URLs (including PDFs and downloads)"}),`
`,e.jsx(n.li,{children:"Anchored links within the current page"}),`
`,e.jsx(n.li,{children:"CAS-authenticated endpoints"}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility-considerations",children:"Accessibility Considerations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"All interactive elements must be keyboard accessible"}),`
`,e.jsx(n.li,{children:"Search input includes visually hidden label for screen readers"}),`
`,e.jsx(n.li,{children:"Dropdown button announces expanded/collapsed state to assistive technology"}),`
`,e.jsx(n.li,{children:"Ensure sufficient color contrast for all text and interactive elements"}),`
`,e.jsx(n.li,{children:"Test with screen readers to verify proper announcements"}),`
`,e.jsx(n.li,{children:"Maintain logical tab order through all interactive elements"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Site Header"})," - Parent container component that includes the Utility Nav"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Primary Nav"})," - Main navigation component that works alongside Utility Nav"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CTA"})," - Atom-level button component used within Utility Nav"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Icon"})," - Used for search and dropdown indicators"]}),`
`]}),`
`,e.jsx(n.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive testing of all utility nav configurations and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/organisms-menu-utility-nav-visreg--old-blues",children:"Visreg page"}),"."]})]})}function w(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{w as default};
//# sourceMappingURL=utility-nav-BJDmwL7Q.js.map
