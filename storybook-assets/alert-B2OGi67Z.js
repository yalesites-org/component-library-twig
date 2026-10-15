import{u as l,j as e,M as a,C as t,a as o}from"./blocks-C3MhvIPG.js";import{A as c,a as i,b as d,c as h}from"./alert.stories-DCZXXMTY.js";import{t as x}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./component-props-De-d7Djp.js";import"./alert-6JPGQwlo.js";import"./reset-alerts-B8W4_vxp.js";function r(n){const s={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c,name:"Overview"}),`
`,e.jsx(s.h1,{id:"alert",children:"Alert"}),`
`,e.jsxs(s.p,{children:["Displays important messages at the top of the page. Supports three types — emergency, announcement, and marketing — each with distinct visual styling to signal urgency. Alerts are dismissible and use ",e.jsx(s.code,{children:"localStorage"})," to remember when a user has closed them."]}),`
`,e.jsx(s.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsxs(s.p,{children:["Once dismissed, an alert won't reappear until you click ",e.jsx(s.strong,{children:"Reset dismissed alerts"})," in the preview below."]}),`
`,e.jsx(t,{of:i}),`
`,e.jsx(o,{of:i}),`
`,e.jsx(s.h2,{id:"alert-types",children:"Alert Types"}),`
`,e.jsx(t,{of:d}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Alert Types",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Use for"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Emergency"})}),e.jsx("td",{children:e.jsx(s.p,{children:`Campus emergencies, system outages, urgent time-sensitive
announcements`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Announcement"})}),e.jsx("td",{children:"Important deadlines, policy updates, scheduled maintenance"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Marketing"})}),e.jsx("td",{children:e.jsx(s.p,{children:"Event promotions, new content highlights, non-critical announcements"})})]})]})]})}),`
`,e.jsx(s.h2,{id:"properties",children:"Properties"}),`
`,x(h,"optional"),`
`,e.jsx(s.h2,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Dismissible"})," — users can close alerts; state is stored in ",e.jsx(s.code,{children:"localStorage"})," via the ",e.jsx(s.code,{children:"alert__id"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Unique IDs required"})," — always provide a unique ",e.jsx(s.code,{children:"alert__id"})," per alert; reusing IDs causes multiple alerts to dismiss together"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"No JS fallback"})," — alerts remain visible if JavaScript is disabled; the close button won't function"]}),`
`]}),`
`,e.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Use alerts sparingly — overuse reduces their impact"}),`
`,e.jsx(s.li,{children:"Place alerts at the top of the page where they're immediately visible"}),`
`,e.jsx(s.li,{children:"Keep content concise (2–3 sentences) and include a CTA link when action is needed"}),`
`,e.jsx(s.li,{children:"Don't use multiple emergency alerts on the same page"}),`
`]})]})}function A(n={}){const{wrapper:s}={...l(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(r,{...n})}):r(n)}export{A as default};
//# sourceMappingURL=alert-B2OGi67Z.js.map
