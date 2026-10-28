import{u as o,j as e,M as a,C as c,a as d}from"./blocks-BudrnkdM.js";import{E as t,a as s}from"./meta.stories-K3OoWPXU.js";import{t as r}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./cl-page-args-BzdE9YLW.js";import"./event-meta-localist-BunKTykQ.js";import"./image-CSdbOboU.js";import"./video-embed-DfDFIR6J.js";import"./component-props-De-d7Djp.js";import"./resource-meta-DWsaQYek.js";function l(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Molecules/Meta/Event Meta"}),`
`,e.jsx(n.h1,{id:"event-meta",children:"Event Meta"}),`
`,e.jsx(n.p,{children:"A comprehensive metadata component for displaying event information from Localist, including dates, times, location, and registration options."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(c,{of:t}),`
`,e.jsx(d,{of:t}),`
`,e.jsx(n.h2,{id:"when-to-use-it",children:"When to use it"}),`
`,e.jsx(n.p,{children:"Use Event Meta on event detail pages and calendar entries sourced from Localist. The component handles all Localist event shapes: single-date, multi-date, virtual, and in-person."}),`
`,e.jsx(n.h2,{id:"date-scenarios",children:"Date Scenarios"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.strong,{children:"Data Variant"})," control switches between four date configurations that mirror what Localist sends:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mixed (Past & Upcoming)"})," — recurring event with some past and some upcoming occurrences"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Upcoming Only"})," — all occurrences are in the future"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Past Only"})," — all occurrences are in the past"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Single Date"})," — one-off event with a single date"]}),`
`]}),`
`,e.jsx(n.h2,{id:"all-day-events",children:"All-Day Events"}),`
`,e.jsxs(n.p,{children:["Toggle ",e.jsx(n.strong,{children:"All Day"}),' in the controls to simulate events where Drupal sets start to 00:00 and end to 23:59. Event Meta detects this range and displays "All day" text in place of specific times, removing the small-caps time formatting.']}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(s,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(s,"optional"),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-event-meta-localist.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-event-meta.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"event-meta-localist.js"})," handles date parsing and all-day detection"]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"ARIA labels on calendar and registration buttons"}),`
`,e.jsx(n.li,{children:"Screen reader friendly date/time formatting"}),`
`,e.jsx(n.li,{children:"Timezone-aware date display"}),`
`,e.jsx(n.li,{children:"Proper heading hierarchy within the event detail layout"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Date Time"}),": Atom used for date and time display"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image"}),": Optional event image rendered within the meta block"]}),`
`]})]})}function A(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}export{A as default};
//# sourceMappingURL=event-meta-C1r_-UmR.js.map
