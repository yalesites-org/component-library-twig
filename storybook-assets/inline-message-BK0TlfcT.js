import{u as r,j as e,M as o,C as l,a}from"./blocks-BudrnkdM.js";import{I as c,a as s,c as h}from"./inline-message.stories-BGbyAfPg.js";import{t as d}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./facts-and-figures-icons-DGGA7p6m.js";import"./component-props-De-d7Djp.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"inline-message",children:"Inline Message"}),`
`,e.jsx(n.p,{children:"The inline message component displays important notifications, alerts, or informational messages within page content. It provides visual distinction through theming, making it easy for users to identify and understand the nature of the message."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the inline message's properties in real-time."}),`
`,e.jsx(l,{of:s}),`
`,e.jsx(a,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,d(h,"optional"),`
`,e.jsx(n.h2,{id:"icons",children:"Icons"}),`
`,e.jsx(n.p,{children:"The inline message can display a decorative icon beside its content, chosen from the shared icon set (the same manifest used by Facts and Figures, so the two components stay in sync)."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Set the ",e.jsx("code",{children:"inline_message__icon_name"})," property to an icon machine name to display that icon."]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx("code",{children:"_none"}),' (or an empty value) to render a text-only message with no icon. In Drupal, choosing "- None -" is stored as an empty value, so both behave identically.']}),`
`,e.jsxs(n.li,{children:["When the property is not supplied at all (the bare component, outside Drupal), the icon falls back to the type-derived default (",e.jsx("code",{children:"circle-info"})," for ",e.jsx("strong",{children:"general"}),", ",e.jsx("code",{children:"circle-exclamation"})," otherwise)."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx("strong",{children:"Icon"})," control in the interactive preview above to browse every available variant. Icons are purely decorative (rendered with ",e.jsx("code",{children:"aria-hidden"}),"): they must reinforce, never replace, the meaning carried by the text."]}),`
`,e.jsx(n.h2,{id:"theme-options",children:"Theme Options"}),`
`,e.jsx(n.p,{children:"This component supports the following theme variations:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"One through Five"}),": Custom theme dials that override global settings with component-specific colors"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"inline_message__theme"})," property to apply different themes. The theme affects background colors, text colors, and link styling to ensure proper contrast and visual hierarchy."]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-inline-message.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-inline-message.scss"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Uses semantic HTML with proper heading structure"}),`
`,e.jsx(n.li,{children:"ARIA attributes expose the message as an information region for screen readers"}),`
`,e.jsx(n.li,{children:"Color themes meet WCAG contrast requirements"}),`
`,e.jsx(n.li,{children:"Links within messages have clear focus indicators"}),`
`,e.jsx(n.li,{children:"Keyboard accessible"}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Messages are displayed inline with surrounding content"}),`
`,e.jsx(n.li,{children:"Optional links provide contextual actions or additional information"}),`
`,e.jsx(n.li,{children:"Responsive design adapts to container width"}),`
`,e.jsx(n.li,{children:"Works without JavaScript"}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use inline messages sparingly to maintain their effectiveness"}),`
`,e.jsx(n.li,{children:"Keep message content concise and actionable (2-3 sentences maximum)"}),`
`,e.jsx(n.li,{children:"Provide a clear, descriptive heading that summarizes the message"}),`
`,e.jsx(n.li,{children:"Use the optional link to provide relevant actions or additional context"}),`
`,e.jsx(n.li,{children:"Select themes that provide sufficient contrast with the page background"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Avoid overly long message content that becomes difficult to scan"}),`
`,e.jsx(n.li,{children:"Don't use inline messages for critical system errors (use dedicated error components)"}),`
`,e.jsx(n.li,{children:"Avoid placing inline messages in locations where they might be overlooked"}),`
`,e.jsx(n.li,{children:"Don't rely solely on color to convey meaning"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all inline message variations and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/molecules-inline-message-visreg",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Alert Banner"}),": Use for page-level or site-wide important announcements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Toast Notification"}),": Consider for temporary, dismissible messages"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Callout"}),": Alternative for highlighting content without alert semantics"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function b(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{b as default};
//# sourceMappingURL=inline-message-BK0TlfcT.js.map
