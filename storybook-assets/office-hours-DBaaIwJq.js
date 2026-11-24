import{u as h,j as e,M as l,C as s,a as d}from"./blocks-BF-hIz2y.js";import{O as c,D as i,L as p,E as u,U as m,a as x,N as f}from"./office-hours.stories-Bz8RJXe8.js";import{t as o}from"./twig-props-table-o51izXGZ.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-DoCra1Lx.js";import"./yds-office-hours-ChoTirR8.js";import"./playground-utils-DQnyvH8W.js";import"./component-props-De-d7Djp.js";const r={days:{twigProp:"office_hours__days",name:"Days",type:"array",required:!0,description:"The weekly rows, in display order",detail:`Each row has a label (the day name), weekday (0 for Sunday to 6), and either slots (start and end as 24-hour HHMM numbers), closed, or all_day. Optional: comment (a note under the hours), today, and exception with a date, which replaces that weekday's usual hours for that one week.
`},heading:{twigProp:"office_hours__heading",name:"Heading",type:"string",required:!1,description:"Optional visible title above the schedule"},headingLevel:{twigProp:"office_hours__heading_level",name:"Heading level",type:"number",required:!1,default:2,description:"Heading level for the title. Upcoming changes uses one level lower."},name:{twigProp:"office_hours__name",name:"Name",type:"string",required:!1,description:"What the hours belong to, used in the table captions",detail:'Falls back to the heading, then to "Office hours".'},upcoming:{twigProp:"office_hours__upcoming",name:"Upcoming changes",type:"array",required:!1,description:"Later exceptions, shown in an Upcoming changes table",detail:`Same row shape as days, with the date as the label. The script shows the next three that fall after this week.
`},status:{twigProp:"office_hours__status",name:"Status line",type:"boolean",required:!1,default:!0,description:"Show the Open now / Closed now line",detail:`Computed in the browser by yds-office-hours.js. Hidden until computed, so without JavaScript there is no status at all.
`},timezone:{twigProp:"office_hours__timezone",name:"Time zone",type:"string",required:!1,description:"IANA time zone the hours are in, e.g. America/New_York",detail:"The status is computed in this zone, not the visitor's."},theme:{twigProp:"office_hours__theme",name:"Theme",type:"string",required:!1,default:"default",description:"Default, or a component theme from one to six"},emptyMessage:{twigProp:"office_hours__empty_message",name:"Empty message",type:"string",required:!1,description:"Shown when there are no rows at all",detail:`Drupal passes a placeholder here in Layout Builder only. Leave it unset and an empty block renders nothing.
`}};function a(n){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...h(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c,name:"Overview"}),`
`,e.jsx(t.h1,{id:"office-hours",children:"Office Hours"}),`
`,e.jsx(t.p,{children:"The Office Hours component shows when a place is open: a weekly schedule table, a live Open now or Closed now status line, one-off exceptions, and a short list of upcoming changes. It is the front end of the Office Hours block in Layout Builder."}),`
`,e.jsx(t.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(t.p,{children:"Use the controls panel below to change the sample schedule, the section theme, the block's own theme, and its width."}),`
`,e.jsx(s,{of:i}),`
`,e.jsx(d,{of:i}),`
`,e.jsx(t.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(t.h3,{id:"required-properties",children:"Required Properties"}),`
`,o(r,"required"),`
`,e.jsx(t.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,o(r,"optional"),`
`,e.jsx(t.h2,{id:"what-it-shows",children:"What It Shows"}),`
`,e.jsx(t.h3,{id:"weekly-table",children:"Weekly Table"}),`
`,e.jsx(t.p,{children:`One row per day, in the order given. A day shows its time ranges ("10 a.m.–5 p.m."), "Closed", or "Open all day". A day can have more than one range, and an optional note under the hours. Today's row is tinted and tagged "Today".`}),`
`,e.jsx(t.h3,{id:"status-line",children:"Status Line"}),`
`,e.jsx(t.p,{children:'The line above the table says "Open now" or "Closed now", with detail such as "Closes at 5 p.m." or "Closed today · Opens Tuesday at 10 a.m.". The pill uses a shape and a word, never color alone.'}),`
`,e.jsxs(t.p,{children:["The status is worked out in the browser from the current time in the block's time zone (",e.jsx(t.code,{children:"office_hours__timezone"}),", America/New_York on the platform), not the visitor's. It stays hidden until it is computed, so a cached page never shows a stale status and a page without JavaScript shows none. The script also re-picks today's row and this week's exceptions on load, so a page served from cache days later is still right."]}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(t.h3,{id:"exceptions",children:"Exceptions"}),`
`,e.jsx(t.p,{children:`An exception replaces one date's usual hours, for example an early close for Homecoming. When its date falls in the next seven days, it takes the place of that weekday's row and shows an "Exception" tag with its label.`}),`
`,e.jsx(s,{of:u}),`
`,e.jsx(t.h3,{id:"upcoming-changes",children:"Upcoming Changes"}),`
`,e.jsx(t.p,{children:'Exceptions after this week are listed under an "Upcoming changes" heading, the next three at most, each with its date, hours, and label. The heading and table are hidden when there are none.'}),`
`,e.jsx(s,{of:m}),`
`,e.jsx(t.h3,{id:"empty-state",children:"Empty State"}),`
`,e.jsx(t.p,{children:'With no days entered, the public page renders nothing at all: no heading, no empty table. In Layout Builder the block shows a placeholder instead, "Hours: no days filled in yet.", so editors can find and edit it.'}),`
`,e.jsx(s,{of:x}),`
`,e.jsx(t.h2,{id:"theme-options",children:"Theme Options"}),`
`,e.jsx(t.p,{children:"This component supports the following theme variations:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Default"}),": Follows the section's colors"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"One through Six"}),": The block paints its own component theme instead of the section's colors. The today tint, the today bar, the Exception tag and the status pill all follow it."]}),`
`]}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"office_hours__theme"})," property to apply a theme."]}),`
`,e.jsx(t.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Template"}),": ",e.jsx(t.code,{children:"yds-office-hours.twig"})]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Styles"}),": ",e.jsx(t.code,{children:"_yds-office-hours.scss"})]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"JavaScript"}),": ",e.jsx(t.code,{children:"yds-office-hours.js"})]}),`
`]}),`
`,e.jsx(t.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"A real table with a caption, column headers and row headers"}),`
`,e.jsxs(t.li,{children:["Explicit table roles keep the table semantics in the narrow layout, where the cells are set to ",e.jsx(t.code,{children:"display: block"})]}),`
`,e.jsxs(t.li,{children:["Today's row header carries ",e.jsx(t.code,{children:'aria-current="date"'})]}),`
`,e.jsxs(t.li,{children:["The status line is a ",e.jsx(t.code,{children:'role="status"'})," region"]}),`
`,e.jsx(t.li,{children:'Times are written out the platform way ("5:30 p.m.") rather than as a 24-hour clock'}),`
`]}),`
`,e.jsx(t.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Rows stack when the block is under 340px wide: day, then hours, then the note. This is a container query on the block, not the viewport, so it also applies in a narrow sidebar column on a wide screen."}),`
`]}),`
`,e.jsx(s,{of:f}),`
`,e.jsx(t.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(t.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Keep notes short; they sit under the hours in a narrow column"}),`
`,e.jsx(t.li,{children:"Use an exception for a one-off date rather than editing the weekly hours"}),`
`,e.jsx(t.li,{children:"Give the block a heading so the table captions name what the hours are for"}),`
`]}),`
`,e.jsx(t.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Don't put hours in a note; the status line cannot read them"}),`
`]}),`
`,e.jsx(t.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(t.p,{children:["For visual regression testing with the layouts, empty state and every theme option, see the ",e.jsx(t.a,{href:"?path=/story/molecules-office-hours-visreg--old-blues",children:"Visreg page"}),". Those stories show a fixed status, so their snapshots do not change with the clock."]}),`
`,e.jsx(t.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Accordion"}),": Shares the themed box treatment the One through Six themes use"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Tables"}),": The general table atom, for tabular content that is not a schedule"]}),`
`]}),`
`,e.jsx(t.hr,{}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Need help?"})," Refer to the ",e.jsx(t.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function S(n={}){const{wrapper:t}={...h(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}export{S as default};
//# sourceMappingURL=office-hours-DBaaIwJq.js.map
