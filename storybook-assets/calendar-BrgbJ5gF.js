import{u as r,j as e,M as d,C as l,a}from"./blocks-C3MhvIPG.js";import{C as c,a as s,c as o}from"./calendar.stories-C9N_vPGw.js";import{t as h}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./calendar-CjnCNKr5.js";import"./micromodal.es-Dp1N63aw.js";import"./component-props-De-d7Djp.js";function t(i){const n={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"calendar",children:"Calendar"}),`
`,e.jsx(n.p,{children:"The calendar component displays events in a monthly calendar format. It provides an interactive interface for viewing and navigating event schedules with modal dialogs for event details. The calendar supports month navigation, event indicators, and accessible markup for screen readers."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the calendar's properties in real-time."}),`
`,e.jsx(l,{of:s}),`
`,e.jsx(a,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,h(o,"required"),`
`,e.jsx(n.h2,{id:"calendar-structure",children:"Calendar Structure"}),`
`,e.jsx(n.p,{children:"The calendar data is organized as a two-dimensional array representing weeks and days:"}),`
`,e.jsx(n.h3,{id:"day-object-structure",children:"Day Object Structure"}),`
`,e.jsx(n.p,{children:"Each day in the calendar contains:"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Day Object Structure",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"date"})}),e.jsx("td",{children:e.jsx("code",{children:"object"})}),e.jsx("td",{children:e.jsxs(n.p,{children:["Object containing ",e.jsx("code",{children:"day"}),", ",e.jsx("code",{children:"month"}),", and"," ",`
`,e.jsx("code",{children:"year"})," properties"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"events"})}),e.jsx("td",{children:e.jsx("code",{children:"array"})}),e.jsx("td",{children:"Array of event objects for this day (can be empty)"})]})]})]})}),`
`,e.jsx(n.h3,{id:"event-object-structure",children:"Event Object Structure"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Event Object Structure",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"title"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Event title"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"time"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:'Event time (e.g., "09:00am to 9:45am")'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"category"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Event category label"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"type"})}),e.jsx("td",{children:e.jsx("code",{children:"array"})}),e.jsx("td",{children:'Array of event type tags (e.g., "Public Event", "Art Event")'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"url"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Link to event details"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"description"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Optional event description (shown in modal)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"optional_link__content"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Optional additional link text"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"optional_link__url"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Optional additional link URL"})]})]})]})}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsx(n.p,{children:"The calendar component provides several interactive features for users:"}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Month Navigation"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Previous and next month navigation buttons allow users to browse through
different months. The current month and year are prominently displayed in
the header.`})})]})," ",e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Event Indicators"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Days with events display visual indicators showing the number of events.
Users can click on these indicators to view event details in a modal dialog.`})})]})," ",e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Event Modals"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Clicking on a day with events opens a modal displaying all events for that
day. Each event shows title, time, category, type tags, and optional
description and links.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Responsive Layout"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`The calendar adapts to different screen sizes, maintaining readability
and usability on mobile devices. Touch-optimized for easy navigation on
tablets and phones.`})})]})]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("code",{children:"yds-calendar.twig"}),", ",e.jsx("code",{children:"yds-calendar.js"}),","," ",`
`,e.jsx("code",{children:"_yds-calendar.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Semantic table structure with proper headers, ARIA labels for screen
readers, keyboard navigable controls, focus management for modals,
accessible date formatting`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Interactive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Month navigation with JavaScript, modal dialogs for event details,
event indicators clickable on desktop and touch devices, keyboard
support for all interactive elements`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Calendar grid adjusts to viewport size, maintains readability on
mobile devices, optimized touch targets for interactive elements`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"event-display",children:"Event Display"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Days without events appear as standard calendar cells"}),`
`,e.jsx(n.li,{children:"Days with events show an indicator with the number of events"}),`
`,e.jsx(n.li,{children:"Multiple events on a single day are all displayed in the modal"}),`
`,e.jsx(n.li,{children:"Event categories and types provide visual organization and filtering context"}),`
`]}),`
`,e.jsx(n.h3,{id:"navigation",children:"Navigation"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use previous/next buttons to navigate between months"}),`
`,e.jsx(n.li,{children:"Month and year are always visible in the header"}),`
`,e.jsx(n.li,{children:"Calendar maintains state during navigation"}),`
`,e.jsx(n.li,{children:"Modal dialogs overlay the calendar and can be closed with a close button or ESC key"}),`
`]}),`
`,e.jsx(n.h3,{id:"event-information",children:"Event Information"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Each event displays a title, time, and category"}),`
`,e.jsx(n.li,{children:"Event types appear as tags for quick identification"}),`
`,e.jsx(n.li,{children:"Optional descriptions provide additional context"}),`
`,e.jsx(n.li,{children:"Links allow users to navigate to full event details or related pages"}),`
`]}),`
`,e.jsx(n.h3,{id:"content-recommendations",children:"Content Recommendations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Provide meaningful event titles that clearly describe the event"}),`
`,e.jsx(n.li,{children:"Use consistent time formatting for better scannability"}),`
`,e.jsx(n.li,{children:"Categorize events logically to help users find relevant content"}),`
`,e.jsx(n.li,{children:"Include descriptions for events that need additional context"}),`
`,e.jsx(n.li,{children:"Ensure event URLs link to complete information pages"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Modal"})," - Dialog component used for displaying event details"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Button"})," - Navigation controls for previous/next month"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Link"})," - Event titles and optional links"]}),`
`]}),`
`,e.jsx(n.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive testing of calendar states including empty months, single events, and multiple events per day, see the ",e.jsx(n.a,{href:"?path=/story/organisms-calendar-visreg--old-blues-section-default",children:"Visreg page"}),"."]})]})}function w(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{w as default};
//# sourceMappingURL=calendar-BrgbJ5gF.js.map
