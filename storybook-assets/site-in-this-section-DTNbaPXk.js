import{u as o,j as e,M as c,C as a,a as h}from"./blocks-C3MhvIPG.js";import{S as d,a as t,c as s}from"./site-in-this-section.stories-DOjLAYSD.js";import{t as r}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./yds-secondary-nav-C0lFKjnN.js";import"./utility-nav-cXaVPHEz.js";import"./primary-nav-3-07Xq0g.js";import"./component-props-De-d7Djp.js";import"./yds-site-in-this-section-5Rlc7puJ.js";import"./yds-menu-toggle-CCw3uUL5.js";/* empty css                                */function l(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"site-in-this-section",children:"Site In This Section"}),`
`,e.jsx(n.p,{children:"The Site In This Section component displays sub-navigation for a specific section of the site. It combines a collapsible toggle with secondary navigation to help users navigate through related pages within a content area. This component provides a clear hierarchical menu structure that maintains context while browsing through section-specific content."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the site in this section component's properties in real-time."}),`
`,e.jsx(a,{of:t}),`
`,e.jsx(h,{of:t}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(s,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(s,"optional"),`
`,e.jsx(n.h2,{id:"component-structure",children:"Component Structure"}),`
`,e.jsx(n.p,{children:"The Site In This Section component consists of two key sub-components:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Menu Toggle"}),': A collapsible header that displays "In This Section" and can be expanded/collapsed on mobile devices']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Secondary Navigation"}),": The hierarchical menu structure showing section pages and sub-pages"]}),`
`]}),`
`,e.jsx(n.h2,{id:"menu-item-structure",children:"Menu Item Structure"}),`
`,e.jsx(n.p,{children:"Menu items support hierarchical structures with the following properties:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"title"}),": The display text for the menu item"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"url"}),": The link destination (can be internal or external)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"below"}),": Optional nested array of child menu items (supports multiple levels)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"is_active"}),": Boolean to mark the current active page in the navigation tree"]}),`
`]}),`
`,e.jsx(n.p,{children:"The component intelligently handles multi-level navigation, expanding parent items when a child page is active to show the user's current location within the section hierarchy."}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("code",{children:"yds-site-in-this-section.twig"}),","," ",`
`,e.jsx("code",{children:"yds-site-in-this-section.js"}),","," ",`
`,e.jsx("code",{children:"cl-site-in-this-section.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Dependencies"})}),e.jsx("td",{children:"Secondary Nav component, Menu In This Section Toggle component"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(n.p,{children:`ARIA navigation landmark, semantic list structure, keyboard navigation
support, collapsible toggle with proper ARIA states, screen reader
friendly with proper labels and current page indication`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Collapsible on mobile viewports with toggle interaction, expanded
navigation on larger screens, touch-friendly interactions on mobile
devices`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"JavaScript"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Manages expand/collapse interactions for the section toggle and nested
menu items, handles active state management`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"when-to-use-site-in-this-section",children:"When to Use Site In This Section"}),`
`,e.jsx(n.p,{children:"The Site In This Section component is ideal for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Section-specific navigation in multi-page content areas"}),`
`,e.jsx(n.li,{children:"Displaying the navigation tree for a department, program, or topic"}),`
`,e.jsx(n.li,{children:"Providing context about related pages within the current section"}),`
`,e.jsx(n.li,{children:"Sites with deep hierarchical structures where users need to navigate between sibling and child pages"}),`
`,e.jsx(n.li,{children:"Mobile-friendly collapsible navigation that saves screen space"}),`
`]}),`
`,e.jsx(n.h3,{id:"placement",children:"Placement"}),`
`,e.jsx(n.p,{children:"Site In This Section navigation is typically placed:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In a sidebar alongside main content on desktop layouts"}),`
`,e.jsx(n.li,{children:"At the top of a section before the main content area on mobile"}),`
`,e.jsx(n.li,{children:"In a consistent location across all pages within the section"}),`
`]}),`
`,e.jsx(n.p,{children:"The component should remain visible and consistent throughout the section to help users maintain their bearings."}),`
`,e.jsx(n.h3,{id:"navigation-depth",children:"Navigation Depth"}),`
`,e.jsx(n.p,{children:"The component handles multiple levels of nested items effectively:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Level 1"}),": Section root or parent pages"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Level 2"}),": Primary child pages within the section"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Level 3+"}),": Nested subsections and detailed content"]}),`
`]}),`
`,e.jsx(n.p,{children:"The component automatically expands the tree to show the current page and its siblings, while keeping other branches collapsed for clarity."}),`
`,e.jsx(n.h3,{id:"mobile-behavior",children:"Mobile Behavior"}),`
`,e.jsx(n.p,{children:'On smaller viewports, the "In This Section" toggle allows users to:'}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Collapse the navigation to save screen space"}),`
`,e.jsx(n.li,{children:"Expand on demand to access section navigation"}),`
`,e.jsx(n.li,{children:"Maintain context without cluttering the mobile interface"}),`
`]}),`
`,e.jsx(n.h2,{id:"accessibility-considerations",children:"Accessibility Considerations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure all menu items have descriptive, meaningful labels that make sense out of context"}),`
`,e.jsx(n.li,{children:"The current page is marked with appropriate ARIA attributes for screen readers"}),`
`,e.jsx(n.li,{children:"The collapsible toggle announces its expanded/collapsed state to assistive technology"}),`
`,e.jsx(n.li,{children:"Keyboard users can navigate through all menu levels using Tab and arrow keys"}),`
`,e.jsx(n.li,{children:"Focus indicators are clearly visible for all interactive elements"}),`
`,e.jsx(n.li,{children:"Sufficient color contrast is maintained in all theme variations"}),`
`]}),`
`,e.jsx(n.h2,{id:"component-theming",children:"Component Theming"}),`
`,e.jsxs(n.p,{children:["The Site In This Section component supports theming through the ",e.jsx(n.code,{children:"site_section_wrap__theme"})," property, which applies colors from the YaleSites design system dial. This allows the navigation to match the visual theme of the current section or site."]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep menu labels concise but descriptive (typically under 40 characters)"}),`
`,e.jsx(n.li,{children:"Maintain consistent labeling conventions across the navigation tree"}),`
`,e.jsx(n.li,{children:"Avoid extremely deep nesting (5+ levels) - consider restructuring content if needed"}),`
`,e.jsx(n.li,{children:"Ensure the navigation accurately reflects the site's information architecture"}),`
`,e.jsx(n.li,{children:"Update the active state to match the current page for proper context"}),`
`,e.jsx(n.li,{children:"Test the navigation with keyboard and screen readers to ensure accessibility"}),`
`,e.jsx(n.li,{children:"Consider the mobile experience and ensure the toggle is discoverable"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Secondary Nav"})," - The navigation component embedded within this wrapper"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Menu In This Section Toggle"})," - The collapsible header for mobile display"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Primary Nav"})," - Main site-wide navigation in the header"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Breadcrumbs"})," - Complementary wayfinding showing the path to current page"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Site Header"})," - Container for primary navigation elements"]}),`
`]}),`
`,e.jsx(n.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive testing of all theme variations and navigation structures, see the ",e.jsx(n.a,{href:"?path=/story/organisms-global-elements-in-this-section-visreg--old-blues",children:"Visreg page"}),"."]})]})}function M(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}export{M as default};
//# sourceMappingURL=site-in-this-section-DTNbaPXk.js.map
