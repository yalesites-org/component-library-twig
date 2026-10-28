import{u as d,j as e,M as c,C as a,a as l}from"./blocks-BudrnkdM.js";import{R as r,d as i}from"./meta.stories-K3OoWPXU.js";import{t as o}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./cl-page-args-BzdE9YLW.js";import"./event-meta-localist-BunKTykQ.js";import"./image-CSdbOboU.js";import"./video-embed-DfDFIR6J.js";import"./component-props-De-d7Djp.js";import"./resource-meta-DWsaQYek.js";function t(n){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...d(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Molecules/Meta/Resource Meta"}),`
`,e.jsx(s.h1,{id:"resource-meta",children:"Resource Meta"}),`
`,e.jsx(s.p,{children:"Displays metadata for downloadable resources and media content within teaser cards and list items. Renders category, publication date, and resource type indicators alongside an optional image or video."}),`
`,e.jsx(s.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(a,{of:r}),`
`,e.jsx(l,{of:r}),`
`,e.jsx(s.h2,{id:"when-to-use-it",children:"When to use it"}),`
`,e.jsxs(s.p,{children:["Use Resource Meta inside card and list-item view modes for Resource nodes. It's the lighter-weight companion to ",e.jsx(s.a,{href:"?path=/docs/molecules-meta-resource-detail--docs",children:"Resource Detail"})," — use Resource Meta for teasers, Resource Detail for the full node page. Both come from the same Resource content type and are candidates for future consolidation into a single template."]}),`
`,e.jsx(s.h2,{id:"resource-types",children:"Resource Types"}),`
`,e.jsxs(s.p,{children:["The component renders differently depending on ",e.jsx(s.code,{children:"resource_meta__resource_type"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"video"})})," — renders an embedded video player (oEmbed) as the primary media"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"document"})})," — renders a document thumbnail image with a download CTA"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:e.jsx(s.code,{children:"image"})})," — renders an image without a download CTA"]}),`
`]}),`
`,e.jsxs(s.p,{children:["The interactive preview above is fixed to ",e.jsx(s.code,{children:"video"}),". The ",e.jsx(s.a,{href:"?path=/story/molecules-meta-visreg--old-blues-section-default",children:"Visreg story"})," covers all three branches across theme variations."]}),`
`,e.jsx(s.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(s.h3,{id:"required-properties",children:"Required Properties"}),`
`,o(i,"required"),`
`,e.jsx(s.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,o(i,"optional"),`
`,e.jsx(s.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Template"}),": ",e.jsx(s.code,{children:"yds-resource-meta.twig"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Partials"}),": ",e.jsx(s.code,{children:"_yds-resource-meta--document.twig"}),", ",e.jsx(s.code,{children:"_yds-resource-meta--metadata.twig"}),", ",e.jsx(s.code,{children:"_yds-resource-meta--video.twig"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Styles"}),": ",e.jsx(s.code,{children:"_yds-resource-meta.scss"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Download button includes ",e.jsx(s.code,{children:"resource_meta__download_aria_label"})," for screen readers"]}),`
`,e.jsx(s.li,{children:"Resource type is visually indicated and conveyed semantically"}),`
`,e.jsx(s.li,{children:"WCAG AA color contrast across all theme combinations"}),`
`]}),`
`,e.jsx(s.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Resource Detail"}),": Full-page meta header used on the Resource node page. Both components come from the same Resource content type and are candidates for future consolidation."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Image"}),": Used for document and image resource type thumbnails"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Video Embed"}),": Used for video resource type previews"]}),`
`]})]})}function _(n={}){const{wrapper:s}={...d(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(t,{...n})}):t(n)}export{_ as default};
//# sourceMappingURL=resource-meta-B-pgn-ZM.js.map
