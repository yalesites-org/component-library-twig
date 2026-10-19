import{u as a,j as e,M as l,C as n,a as c}from"./blocks-C3MhvIPG.js";import{P as h,a as t,J as p,V as u,c as r}from"./publication-detail.stories-pMDjOrML.js";import{t as o}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./component-props-De-d7Djp.js";function d(s){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...a(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:h,name:"Overview"}),`
`,e.jsx(i.h1,{id:"resource-detail",children:"Resource Detail"}),`
`,e.jsxs(i.p,{children:["The full-page meta header rendered at the top of a Resource node. Both this component and ",e.jsx(i.a,{href:"?path=/docs/molecules-meta-resource-meta--docs",children:"Resource Meta"})," come from the same Resource content type — this one handles the full node view, while Resource Meta handles teaser cards and list items. These two templates are candidates for future consolidation."]}),`
`,e.jsxs(i.p,{children:["It mirrors the ",e.jsx(i.code,{children:"details-wrapper"})," grid pattern from ",e.jsx(i.code,{children:"event-meta-localist"}),": a page-title shell with a category overline plus a meta region containing a 3-up grid of metadata cells, an abstract section, and an optional description section."]}),`
`,e.jsx(i.p,{children:"The molecule is sourced from a Resource node and renders three structurally different shapes depending on what's set: an ISPS-published policy brief, a journal article republished as a Resource, or a video lecture with an embedded oEmbed player."}),`
`,e.jsx(i.h2,{id:"policy-brief",children:"Policy Brief"}),`
`,e.jsxs(i.p,{children:["ISPS-published document with PDF download, a mix of affiliated and non-affiliated authors, abstract, and metadata cells covering Location, Discipline, Areas of Study, and Document Control Number. This is the most common shape — it mirrors ",e.jsx(i.code,{children:"/research/publications/isps18-04"})," on the live site."]}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(n,{of:t})}),`
`,e.jsx(c,{of:t}),`
`,e.jsx(i.h2,{id:"journal-article",children:"Journal Article"}),`
`,e.jsxs(i.p,{children:["Externally published paper with ",e.jsx(i.code,{children:"Publication"})," and ",e.jsx(i.code,{children:"Issue"})," cells in the metadata grid, an ",e.jsx(i.code,{children:"External Source"})," CTA (DOI / publisher link), and a ",e.jsx(i.code,{children:"Description"})," section in addition to the abstract. The PDF download slot is empty since the canonical version lives on the publisher's site."]}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(n,{of:p})}),`
`,e.jsx(i.h2,{id:"video-resource",children:"Video Resource"}),`
`,e.jsxs(i.p,{children:["Lecture or talk where the primary media is an oEmbed video. The video block renders above the metadata grid; the document thumbnail and download CTA are suppressed (",e.jsx(i.code,{children:"atomic_preprocess_node"})," skips building ",e.jsx(i.code,{children:"responsive_media_thumbnail"})," for video bundles). The iframe markup is supplied by the ",e.jsx(i.code,{children:"media-oembed-content.html.twig"})," override so the player is responsive inside the flex column."]}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(n,{of:u})}),`
`,e.jsx(i.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(i.h3,{id:"required-properties",children:"Required Properties"}),`
`,o(r,"required"),`
`,e.jsx(i.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,o(r,"optional"),`
`,e.jsx(i.h2,{id:"data-shape-notes",children:"Data shape notes"}),`
`,e.jsx(i.p,{children:"A few of the molecule's twig variables aren't covered by the simple controls above and are worth calling out:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.code,{children:"publication_detail__authors"})})," — array of ",e.jsx(i.code,{children:"{ label, url }"})," objects. Affiliated authors carry the URL of their profile node; non-affiliated authors come through with ",e.jsx(i.code,{children:"url: null"})," and render as plain text. The Resource node's preprocess merges ",e.jsx(i.code,{children:"field_authors"})," (entity refs to profiles) and ",e.jsx(i.code,{children:"field_nonaffiliated_authors"})," (Double Field rows) into one sorted list via the ",e.jsx(i.code,{children:"ys_layouts.resource_author_builder"})," service."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.code,{children:"publication_detail__metadata"})})," — keyed array of ",e.jsx(i.code,{children:"{ label, items }"})," groups, one per taxonomy field that's been populated on the Resource. Items render as a chip list inside the cell. In Drupal, items are entity-reference link render arrays; in Storybook fixtures they're plain strings for layout simplicity, so the chips appear without anchors."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.code,{children:"publication_detail__publish_date"})})," — pre-formatted string (year, month-year, or full). The fidelity comes from ",e.jsx(i.code,{children:"field_date_format"})," on the Resource node; the ",e.jsx(i.code,{children:"Date Format"})," control in this story switches between three pre-formatted strings to simulate the editor's choice."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.code,{children:"publication_detail__resource_type"})})," — controls which media branch renders. Only ",e.jsx(i.code,{children:"'video'"})," triggers the embedded video block; ",e.jsx(i.code,{children:"'document'"})," and ",e.jsx(i.code,{children:"'image'"})," route through the page-title image slot."]}),`
`]}),`
`,e.jsx(i.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Template"}),": ",e.jsx(i.code,{children:"yds-publication-detail.twig"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Styles"}),": ",e.jsx(i.code,{children:"_yds-publication-detail.scss"}),", ",e.jsx(i.code,{children:"_yds-publication-meta.scss"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Co-located molecule"}),": ",e.jsx(i.code,{children:"yds-publication-meta.twig"})," (used by Resource teaser cards)"]}),`
`]}),`
`,e.jsx(i.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["All metadata cells use ",e.jsx(i.code,{children:"<dl><dt><dd>"})," for proper term-definition semantics (WCAG 1.3.1 / 2.4.6)."]}),`
`,e.jsx(i.li,{children:"The category overline is decorative; the heading is the page's first H1."}),`
`,e.jsxs(i.li,{children:["Author list renders as a ",e.jsx(i.code,{children:"<ul>"})," with linked or plain entries depending on whether the author is affiliated."]}),`
`,e.jsx(i.li,{children:'Citation copy-control uses the text-copy-button atom, which captures the rendered citation HTML and exposes a "Copy citation" action.'}),`
`]}),`
`,e.jsx(i.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Resource Meta"})," — the lighter-weight meta block used inside teaser cards and list items for the same Resource content type. See note above about potential consolidation."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.code,{children:"event-meta-localist"})})," — visual sibling using the same ",e.jsx(i.code,{children:"details-wrapper"})," grid pattern."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.code,{children:"text-copy-button"})})," atom — embedded inside the Citation cell."]}),`
`]}),`
`,e.jsx(i.hr,{}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Need help?"})," Refer to the ",e.jsx(i.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function w(s={}){const{wrapper:i}={...a(),...s.components};return i?e.jsx(i,{...s,children:e.jsx(d,{...s})}):d(s)}export{w as default};
//# sourceMappingURL=publication-detail-HMnnI-cv.js.map
