import{u as c,j as e,M as l,C as d,a as o}from"./blocks-BudrnkdM.js";import{B as h,a as n,c as s}from"./breadcrumbs.stories-DWg10HY2.js";import{t}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./breadcrumbs-Cv5hPcoj.js";import"./component-props-De-d7Djp.js";import"./yds-breadcrumbs-BB4Ppsuz.js";function a(r){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...c(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:h,name:"Overview"}),`
`,e.jsx(i.h1,{id:"breadcrumbs",children:"Breadcrumbs"}),`
`,e.jsx(i.p,{children:"The breadcrumbs component provides hierarchical navigation that shows users their current location within the site's structure. It displays a trail of links representing the path from the homepage to the current page, helping users understand where they are and providing quick access to parent pages. Breadcrumbs improve wayfinding and reduce the number of actions needed to navigate to higher-level pages."}),`
`,e.jsx(i.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(i.p,{children:"Use the controls panel below to experiment with the breadcrumbs properties in real-time."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(d,{of:n})}),`
`,e.jsx(o,{of:n}),`
`,e.jsx(i.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(i.h3,{id:"required-properties",children:"Required Properties"}),`
`,t(s,"required"),`
`,e.jsx(i.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,t(s,"optional"),`
`,e.jsx(i.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(i.p,{children:[e.jsx("code",{children:"yds-breadcrumbs.twig"}),", ",e.jsx("code",{children:"yds-breadcrumbs.js"}),","," ",`
`,e.jsx("code",{children:"_yds-breadcrumbs.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsxs(i.p,{children:["ARIA landmark role ",e.jsx("code",{children:"navigation"})," with"," ",`
`,e.jsx("code",{children:'aria-label="Breadcrumb"'}),", semantic ",e.jsx("code",{children:"<ol>"})," ",`
structure, keyboard navigable links, current page indicated with`," ",`
`,e.jsx("code",{children:'aria-current="page"'})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(i.p,{children:`Breadcrumbs collapse on smaller viewports, showing only the current
page and immediate parent with an expandable menu for full path`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"JavaScript"})}),e.jsx("td",{children:e.jsx(i.p,{children:`Handles responsive collapse behavior and expand/collapse interactions
on mobile devices`})})]})]})})}),`
`,e.jsx(i.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(i.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:'Always include "Home" as the first breadcrumb item'}),`
`,e.jsx(i.li,{children:"Keep breadcrumb labels concise and descriptive (under 30 characters recommended)"}),`
`,e.jsxs(i.li,{children:["The last breadcrumb should represent the current page and be marked with ",e.jsx(i.code,{children:"is_active: true"})]}),`
`,e.jsx(i.li,{children:"Use breadcrumbs on pages that are at least two levels deep in the site hierarchy"}),`
`,e.jsx(i.li,{children:"Ensure breadcrumb path accurately reflects the site's information architecture"}),`
`]}),`
`,e.jsx(i.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Don't use breadcrumbs as the primary navigation method"}),`
`,e.jsx(i.li,{children:"Avoid including every level if the hierarchy is extremely deep (consider showing key levels only)"}),`
`,e.jsx(i.li,{children:"Don't use breadcrumbs on the homepage or other top-level pages"}),`
`,e.jsx(i.li,{children:"Don't make the active/current page breadcrumb clickable"}),`
`]}),`
`,e.jsx(i.h3,{id:"breadcrumb-length",children:"Breadcrumb Length"}),`
`,e.jsx(i.p,{children:"Breadcrumbs work best when limited to 7 items or fewer. For deeper hierarchies, consider:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:'Condensing middle levels with a "..." separator'}),`
`,e.jsx(i.li,{children:"Showing only the most relevant path segments"}),`
`,e.jsx(i.li,{children:"Restructuring your site's information architecture if paths regularly exceed 7 levels"}),`
`]}),`
`,e.jsx(i.h2,{id:"accessibility-considerations",children:"Accessibility Considerations"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The component uses semantic HTML ",e.jsx(i.code,{children:"<nav>"})," with proper ARIA attributes"]}),`
`,e.jsxs(i.li,{children:["Current page is indicated with ",e.jsx(i.code,{children:'aria-current="page"'})," for screen readers"]}),`
`,e.jsx(i.li,{children:"Breadcrumb separators are decorative and hidden from assistive technology"}),`
`,e.jsx(i.li,{children:"All links have sufficient color contrast and visible focus indicators"}),`
`,e.jsx(i.li,{children:"Mobile collapsed state maintains keyboard accessibility"}),`
`]}),`
`,e.jsx(i.h2,{id:"relationship-to-site-structure",children:"Relationship to Site Structure"}),`
`,e.jsx(i.p,{children:"Breadcrumbs should reflect the site's actual hierarchical structure, not the user's browsing history. They represent the location of the current page within the site's organization, providing context and enabling easy navigation to parent pages."}),`
`,e.jsx(i.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Site Header"})," - Primary navigation component at the top of every page"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Primary Nav"})," - Main navigation menu for top-level sections"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Utility Nav"})," - Secondary navigation for utility links"]}),`
`]}),`
`,e.jsx(i.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(i.p,{children:["For comprehensive testing of breadcrumb variations including different path lengths and responsive behaviors, see the ",e.jsx(i.a,{href:"?path=/story/organisms-menu-breadcrumbs-visreg--old-blues",children:"Visreg page"}),"."]})]})}function w(r={}){const{wrapper:i}={...c(),...r.components};return i?e.jsx(i,{...r,children:e.jsx(a,{...r})}):a(r)}export{w as default};
//# sourceMappingURL=breadcrumbs-BSvJ5_KU.js.map
