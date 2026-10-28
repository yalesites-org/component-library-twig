import{u as l,j as e,M as c,C as o,a as d}from"./blocks-BudrnkdM.js";import{S as h,s,c as t}from"./secondary-nav.stories-B2xVoELk.js";import{t as r}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./yds-secondary-nav-C0lFKjnN.js";import"./component-props-De-d7Djp.js";function a(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"secondary-nav",children:"Secondary Nav"}),`
`,e.jsx(n.p,{children:"The Secondary Nav provides sub-navigation within a specific section of the site. It displays a hierarchical menu structure that helps users navigate through related pages within a content area. This component is typically used to show the navigation tree for the current section, making it easy for users to understand and explore related content without losing context of where they are in the site hierarchy."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the secondary nav's properties in real-time."}),`
`,e.jsx("div",{className:"sb-tall-canvas",children:e.jsx(o,{of:s})}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(t,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(t,"optional"),`
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
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("code",{children:"yds-secondary-nav.twig"}),", ",e.jsx("code",{children:"yds-secondary-nav.js"}),","," ",`
`,e.jsx("code",{children:"_yds-secondary-nav.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(n.p,{children:`ARIA navigation landmark, semantic list structure, keyboard navigation
support, screen reader friendly with proper labels and current page
indication`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Adapts to smaller viewports with collapsible submenu sections,
touch-friendly interactions on mobile devices`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"JavaScript"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Manages expand/collapse interactions for nested menu items and handles
active state management`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"when-to-use-secondary-nav",children:"When to Use Secondary Nav"}),`
`,e.jsx(n.p,{children:"The Secondary Nav is ideal for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Section-specific navigation in multi-page content areas"}),`
`,e.jsx(n.li,{children:"Displaying the navigation tree for a department, program, or topic"}),`
`,e.jsx(n.li,{children:"Providing context about related pages within the current section"}),`
`,e.jsx(n.li,{children:"Sites with deep hierarchical structures where users need to navigate between sibling and child pages"}),`
`,e.jsx(n.li,{children:"Complementing the primary navigation by showing detailed sub-structure"}),`
`]}),`
`,e.jsx(n.h3,{id:"placement",children:"Placement"}),`
`,e.jsx(n.p,{children:"Secondary navigation is typically placed:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In a sidebar alongside main content"}),`
`,e.jsx(n.li,{children:"At the top of a section before the main content area"}),`
`,e.jsx(n.li,{children:"In a consistent location across all pages within the section"}),`
`]}),`
`,e.jsx(n.p,{children:"The component should remain visible and consistent throughout the section to help users maintain their bearings."}),`
`,e.jsx(n.h3,{id:"navigation-depth",children:"Navigation Depth"}),`
`,e.jsx(n.p,{children:"The Secondary Nav handles multiple levels of nested items effectively:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Level 1"}),": Section root or parent pages"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Level 2"}),": Primary child pages within the section"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Level 3+"}),": Nested subsections and detailed content"]}),`
`]}),`
`,e.jsx(n.p,{children:"The component automatically expands the tree to show the current page and its siblings, while keeping other branches collapsed for clarity."}),`
`,e.jsx(n.h3,{id:"link-types",children:"Link Types"}),`
`,e.jsx(n.p,{children:"The component supports various link types:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Internal site links within the section"}),`
`,e.jsx(n.li,{children:"External URLs (automatically detected)"}),`
`,e.jsx(n.li,{children:"PDF and document downloads (indicated with appropriate icons)"}),`
`,e.jsx(n.li,{children:"Active page indication (typically not linked, marked for screen readers)"}),`
`]}),`
`,e.jsx(n.h2,{id:"accessibility-considerations",children:"Accessibility Considerations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure all menu items have descriptive, meaningful labels that make sense out of context"}),`
`,e.jsx(n.li,{children:"The current page is marked with appropriate ARIA attributes for screen readers"}),`
`,e.jsx(n.li,{children:"Keyboard users can navigate through all menu levels using Tab and arrow keys"}),`
`,e.jsx(n.li,{children:"Focus indicators are clearly visible for all interactive elements"}),`
`,e.jsx(n.li,{children:"Collapsed/expanded states are announced to screen reader users"}),`
`,e.jsx(n.li,{children:"Sufficient color contrast is maintained in all theme variations"}),`
`]}),`
`,e.jsx(n.h2,{id:"component-theming",children:"Component Theming"}),`
`,e.jsxs(n.p,{children:["The Secondary Nav supports theming through the ",e.jsx(n.code,{children:"menu_theme"})," property, which applies colors from the YaleSites design system dial. This allows the navigation to match the visual theme of the current section or site."]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep menu labels concise but descriptive (typically under 40 characters)"}),`
`,e.jsx(n.li,{children:"Maintain consistent labeling conventions across the navigation tree"}),`
`,e.jsx(n.li,{children:"Avoid extremely deep nesting (5+ levels) - consider restructuring content if needed"}),`
`,e.jsx(n.li,{children:"Ensure the navigation accurately reflects the site's information architecture"}),`
`,e.jsx(n.li,{children:"Update the active state to match the current page for proper context"}),`
`,e.jsx(n.li,{children:"Test the navigation with keyboard and screen readers to ensure accessibility"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Primary Nav"})," - Main site-wide navigation in the header"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Breadcrumbs"})," - Complementary wayfinding showing the path to current page"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Site Header"})," - Container for primary navigation elements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Utility Nav"})," - Secondary navigation for utility and tool links"]}),`
`]}),`
`,e.jsx(n.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive testing of all theme variations and navigation structures, see the ",e.jsx(n.a,{href:"?path=/story/organisms-menu-content-collection-visreg--old-blues",children:"Visreg page"}),"."]})]})}function b(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}export{b as default};
//# sourceMappingURL=secondary-nav-w3FfzlFE.js.map
