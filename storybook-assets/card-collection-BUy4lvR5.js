import{u as j,j as e,M as u,C as s,a as r}from"./blocks-BudrnkdM.js";import{C as m,P as t,E as d,a as o,D as l,R as a,L as c,c as h}from"./card-collection.stories-WBQqoIDh.js";import{t as x}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./post-card-Col65Wkc.js";import"./event-card-BG_kAEni.js";import"./yds-directory-listing-card-BNQB32qj.js";import"./resource-card-tAJflxwm.js";import"./image-CSdbOboU.js";import"./long-url-Cvaf1zkg.js";import"./component-props-De-d7Djp.js";import"./add-table-defaults-qMEDfH1P.js";function p(n){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...j(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(u,{of:m,name:"Overview"}),`
`,e.jsx(i.h1,{id:"card-collection",children:"Card Collection"}),`
`,e.jsx(i.p,{children:"The card collection component displays multiple cards in a flexible grid or list layout. It supports various card types including posts, events, profiles, resources, and directory listings. Card collections can be configured with different layout modes, featured positioning, and image display options to create organized, scannable content groupings across the site."}),`
`,e.jsx(i.h2,{id:"card-type-variants",children:"Card Type Variants"}),`
`,e.jsx(i.p,{children:"The card collection supports the following card types. Each section below is fully interactive — use the controls panel to experiment with layout, featured mode, and image options."}),`
`,e.jsx(i.h3,{id:"post-cards",children:"Post Cards"}),`
`,e.jsx(i.p,{children:"Standard content cards for blog posts, news, or general content. Supports 3x2 images, headlines, excerpts, and publication date."}),`
`,e.jsx(s,{of:t}),`
`,e.jsx(r,{of:t}),`
`,e.jsx(i.h3,{id:"event-cards",children:"Event Cards"}),`
`,e.jsx(i.p,{children:"Specialized cards for events with date, format (online/in-person), and CTAs. Supports 3x2 images."}),`
`,e.jsx(s,{of:d}),`
`,e.jsx(r,{of:d}),`
`,e.jsx(i.h3,{id:"profile-cards",children:"Profile Cards"}),`
`,e.jsx(i.p,{children:"People-focused cards with headshots, names, titles, and affiliations. Uses 1x1 images."}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(r,{of:o}),`
`,e.jsx(i.h3,{id:"directory-listing-cards",children:"Directory Listing Cards"}),`
`,e.jsxs(i.p,{children:["Compact profile cards for directory views. Uses the ",e.jsx(i.code,{children:"profile-directory"})," layout type."]}),`
`,e.jsx(s,{of:l}),`
`,e.jsx(r,{of:l}),`
`,e.jsx(i.h3,{id:"resource-cards",children:"Resource Cards"}),`
`,e.jsxs(i.p,{children:['Cards for downloadable resources, documents, or external links. Supports icons, file types, and overlay labels like "Pinned". Toggle the ',e.jsx(i.strong,{children:"Portrait"})," control to switch to the portrait display mode, which renders images at a 1:1.6 ratio."]}),`
`,e.jsx(s,{of:a}),`
`,e.jsx(r,{of:a}),`
`,e.jsx(i.h2,{id:"content-edge-cases",children:"Content Edge Cases"}),`
`,e.jsx(i.h3,{id:"long-url-in-card-text",children:"Long URL In Card Text"}),`
`,e.jsx(i.p,{children:`A pasted webcast or registration link in a card's teaser text is routine content, and an unbroken URL is the widest single "word" a card ever has to hold. This section is the baseline for that case: the URL wraps inside its card and the grid keeps its column count.`}),`
`,e.jsxs(i.p,{children:["Both declarations that fix this break are exercised here — ",e.jsx(i.code,{children:"min-width: 0"}),", which lets a card shrink to its column, and ",e.jsx(i.code,{children:"overflow-wrap: break-word"}),", which wraps the URL. The fix carries a third declaration that no card grid exercises: it applies only to auto-linked text, and card text is never auto-linked. Storybook markup is not Drupal markup, so a correct render here is not a substitute for checking a real listing page."]}),`
`,e.jsx(s,{of:c}),`
`,e.jsx(r,{of:c}),`
`,e.jsx(i.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(i.h3,{id:"required-properties",children:"Required Properties"}),`
`,x(h,"required"),`
`,e.jsx(i.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,x(h,"optional"),`
`,e.jsx(i.h3,{id:"property-compatibility-by-card-type",children:"Property Compatibility by Card Type"}),`
`,e.jsx(i.p,{children:"Not all properties apply to every card type. The controls panel in each section above reflects this automatically."}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Property Compatibility by Card Type",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Post"}),e.jsx("th",{children:"Event"}),e.jsx("th",{children:"Profile"}),e.jsx("th",{children:"Directory"}),e.jsx("th",{children:"Resource"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Heading"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Collection Type"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Y"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Featured"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"With Images"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Y"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Overlay"}),e.jsx("td",{children:"Y"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Y"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Portrait"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Y"})]})]})]})}),`
`,e.jsx(i.h2,{id:"collection-layouts",children:"Collection Layouts"}),`
`,e.jsx(i.p,{children:"The card collection supports multiple layout modes for different content presentation needs:"}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Grid Layout"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Default responsive grid displaying cards in columns. Adapts to viewport
size for optimal viewing. Best for visual content like posts, events, and
resources.`})})]})," ",e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"List Layout"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Single-column vertical list with cards displaying in full width. Ideal for
detailed content where readability is prioritized. When images are disabled,
cards flush to left edge.`})})]})," ",e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Condensed Layout"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Compact display maximizing content density. Suitable for displaying larger
numbers of items in limited space while maintaining scannability.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Profile Directory"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(i.p,{children:`Specialized layout for directory listing cards. Optimized grid for
efficiently displaying multiple people with consistent spacing and
alignment.`})})]})]}),`
`,e.jsx(i.h2,{id:"featured-layout",children:"Featured Layout"}),`
`,e.jsxs(i.p,{children:["When ",e.jsx("code",{children:"card_collection__featured"})," is set to ",e.jsx("code",{children:"'true'"}),", the first card displays larger and more prominently than subsequent cards. This creates visual hierarchy and draws attention to the most important content. Featured layout works best with 3-4 total cards."]}),`
`,e.jsx(i.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(i.p,{children:[e.jsx("code",{children:"yds-card-collection.twig"}),","," ",`
`,e.jsx("code",{children:"_yds-card-collection.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(i.p,{children:`Semantic HTML list structure, proper heading hierarchy, keyboard
navigable links, sufficient color contrast, alt text for images`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(i.p,{children:`Grid columns adjust based on viewport size, maintains readability
across all devices, touch-optimized for mobile interactions`})})]})]})})}),`
`,e.jsx(i.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(i.h3,{id:"image-configuration",children:"Image Configuration"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"With images enabled"}),": Full visual presentation with image aspect ratios appropriate for card type"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"With images disabled"}),": Text-only presentation optimized for content density"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"List layout without images"}),": Cards flush to left edge for clean text alignment"]}),`
`]}),`
`,e.jsx(i.h3,{id:"featured-collections",children:"Featured Collections"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Use featured layout to highlight the most important or recent content"}),`
`,e.jsx(i.li,{children:"Limit to 3-4 cards total when using featured mode"}),`
`,e.jsx(i.li,{children:"Ensure the first card contains the most compelling content"}),`
`]}),`
`,e.jsx(i.h3,{id:"card-count-recommendations",children:"Card Count Recommendations"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Grid layout"}),": 3-12 cards for optimal visual balance"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"List layout"}),": Any number of cards, particularly effective for 5+ items"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Condensed layout"}),": 6-20 cards for maximum density"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Featured layout"}),": 3-4 cards total (1 featured + 2-3 standard)"]}),`
`]}),`
`,e.jsx(i.h3,{id:"content-considerations",children:"Content Considerations"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Use consistent card types within a single collection"}),`
`,e.jsx(i.li,{children:"Provide meaningful headings when grouping related content"}),`
`,e.jsx(i.li,{children:"Ensure image quality is appropriate for the chosen aspect ratio"}),`
`,e.jsx(i.li,{children:'Use overlay labels sparingly for special emphasis (e.g., "Pinned", "Featured")'}),`
`]}),`
`,e.jsx(i.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Reference Card"})," - Individual card component for posts, events, profiles, and resources"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Directory Listing Card"})," - Compact profile card for directory views"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Grid"})," - Base grid system used for layout"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Heading"})," - Text component for collection headings"]}),`
`]}),`
`,e.jsx(i.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(i.p,{children:["For comprehensive testing of all card collection variations including layouts, card types, and feature combinations, see the ",e.jsx(i.a,{href:"?path=/story/organisms-card-collection-visreg--old-blues-section-default",children:"Visreg page"}),"."]})]})}function D(n={}){const{wrapper:i}={...j(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(p,{...n})}):p(n)}export{D as default};
//# sourceMappingURL=card-collection-BUy4lvR5.js.map
