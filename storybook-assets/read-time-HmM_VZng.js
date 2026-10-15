import{u as r,j as e,M as l,C as a,a as o}from"./blocks-C3MhvIPG.js";import{R as c,a as s,c as d}from"./read-time.stories-CeXD1DT1.js";import{t as h}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./component-props-De-d7Djp.js";import"./yds-read-time-CCCF8XVV.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"read-time",children:"Read Time"}),`
`,e.jsx(n.p,{children:"The Read Time component automatically calculates and displays the estimated reading time for page content. It analyzes the text within the main content area and provides an easy-to-understand time estimate, helping users gauge how long it will take to read through the material."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"The Read Time component displays below the sample content. It automatically calculates reading time based on the text length in the main content area."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(a,{of:s})}),`
`,e.jsx(o,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(d,"optional"),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Atom"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-read-time.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-read-time.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"yds-read-time.js"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"calculation-method",children:"Calculation Method"}),`
`,e.jsx(n.p,{children:"The read time is calculated using the following approach:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reading Speed"}),": 200 words per minute (average adult reading speed)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Content Source"}),": Text within the ",e.jsx(n.code,{children:"#main-content"})," element"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Calculation"}),": Total word count divided by words per minute, rounded up to the nearest minute"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Minimum Display"}),': If content is less than 200 words, displays "less than 1 min"']}),`
`]}),`
`,e.jsx(n.h3,{id:"javascript-behavior",children:"JavaScript Behavior"}),`
`,e.jsx(n.p,{children:"The component uses a Drupal behavior that:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Locates the ",e.jsx(n.code,{children:"#main-content"})," element on the page"]}),`
`,e.jsx(n.li,{children:"Extracts and cleans the text content (removes extra whitespace)"}),`
`,e.jsx(n.li,{children:"Counts the total number of words"}),`
`,e.jsx(n.li,{children:"Calculates reading time in minutes"}),`
`,e.jsx(n.li,{children:'Updates the display with the calculated time or "less than 1" for short content'}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Semantic HTML structure with clearly labeled time information"}),`
`,e.jsx(n.li,{children:"Screen readers announce the complete reading time statement"}),`
`,e.jsx(n.li,{children:"Visual and text-based presentation ensures information is accessible to all users"}),`
`,e.jsx(n.li,{children:"No interactive elements required - purely informational"}),`
`]}),`
`,e.jsx(n.h3,{id:"dependencies",children:"Dependencies"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Required Element"}),": The component requires a ",e.jsx(n.code,{children:"#main-content"})," element to be present on the page"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": Requires JavaScript to calculate and display the reading time"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No JavaScript Fallback"}),': If JavaScript is disabled, the component will show "0 min"']}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Place the Read Time component at the beginning or end of article content"}),`
`,e.jsx(n.li,{children:"Use on long-form content pages like articles, blog posts, and documentation"}),`
`,e.jsxs(n.li,{children:["Ensure the main content area has the ID ",e.jsx(n.code,{children:"#main-content"})," for proper calculation"]}),`
`,e.jsx(n.li,{children:'The label is fixed in Drupal as "Estimated read time"'}),`
`,e.jsx(n.li,{children:"Position the component in a consistent location across similar content types"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use Read Time on pages with minimal content (less than a paragraph)"}),`
`,e.jsx(n.li,{children:"Don't place multiple Read Time components on the same page"}),`
`,e.jsxs(n.li,{children:["Avoid using on pages without a clearly defined ",e.jsx(n.code,{children:"#main-content"})," area"]}),`
`,e.jsx(n.li,{children:`Don't use on highly interactive pages where "reading time" doesn't make sense`}),`
`,e.jsx(n.li,{children:"Don't customize the reading speed calculation without research and user testing"}),`
`,e.jsx(n.li,{children:"Avoid using on landing pages or marketing pages focused on quick scanning"}),`
`]}),`
`,e.jsx(n.h3,{id:"when-to-use-read-time",children:"When to Use Read Time"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Long-form articles"}),": Blog posts, news articles, essays"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Documentation"}),": Technical guides, tutorials, how-to content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Research publications"}),": Academic papers, white papers, reports"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Educational content"}),": Learning materials, course content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Policy documents"}),": Terms of service, privacy policies, guidelines"]}),`
`]}),`
`,e.jsx(n.h3,{id:"when-not-to-use-read-time",children:"When NOT to Use Read Time"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Short pages"}),": Contact forms, error pages, simple landing pages"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Media-heavy content"}),": Photo galleries, video pages, interactive media"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Navigation pages"}),": Directory listings, search results, sitemaps"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Dashboards"}),": Administrative interfaces, data visualizations"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Transactional pages"}),": Checkout flows, form submissions"]}),`
`]}),`
`,e.jsx(n.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(n.h3,{id:"content-scope",children:"Content Scope"}),`
`,e.jsxs(n.p,{children:["The Read Time component calculates based on ALL text within the ",e.jsx(n.code,{children:"#main-content"})," element, including:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Body text paragraphs"}),`
`,e.jsx(n.li,{children:"Headings and subheadings"}),`
`,e.jsx(n.li,{children:"List items"}),`
`,e.jsx(n.li,{children:"Blockquotes"}),`
`,e.jsx(n.li,{children:"Table content"}),`
`,e.jsx(n.li,{children:"Any other text elements"}),`
`]}),`
`,e.jsx(n.h3,{id:"reading-speed-assumptions",children:"Reading Speed Assumptions"}),`
`,e.jsx(n.p,{children:"The default 200 words per minute is intentionally on the lower end of average reading speeds to provide a realistic estimate that accounts for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Varying reading abilities"}),`
`,e.jsx(n.li,{children:"Technical or complex content"}),`
`,e.jsx(n.li,{children:"Reading interruptions"}),`
`,e.jsx(n.li,{children:"Time spent reviewing images or diagrams"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all theme variations, see the ",e.jsx(n.a,{href:"?path=/story/atoms-read-time-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text Field"}),": The primary content component that Read Time measures"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Breadcrumbs"}),": Another metadata component often paired with Read Time"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Byline"}),": Consider pairing with byline information on article pages"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function w(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{w as default};
//# sourceMappingURL=read-time-HmM_VZng.js.map
