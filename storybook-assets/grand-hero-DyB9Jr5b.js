import{u as l,j as e,M as d,C as s,a as h}from"./blocks-C3MhvIPG.js";import{G as c,a as r,b as p,c as x,d as t}from"./grand-hero.stories-eCXJ46w_.js";import{t as o}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./component-props-De-d7Djp.js";import"./banner-CWi5B0T_.js";import"./grand-hero-BEoD7F60.js";import"./image-CSdbOboU.js";function a(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"grand-hero-banner",children:"Grand Hero Banner"}),`
`,e.jsx(n.p,{children:"The Grand Hero Banner is designed for maximum visual impact — typically used on homepages and major landing pages. It supports a full-width background image, heading, snippet, and up to two call-to-action buttons. The content overlay can be configured as full-width or contained to suit different compositional needs."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the component's properties in real-time."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:r})}),`
`,e.jsx(h,{of:r}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,o(t,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,o(t,"optional"),`
`,e.jsx(n.h2,{id:"theme-options",children:"Theme Options"}),`
`,e.jsx(n.p,{children:"The Grand Hero Banner supports the full set of component theme dials:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": Standard theme using global color settings"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"One through Five"}),": Custom theme dials that override global settings with component-specific colors"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"grand_hero__content__background"})," property to apply different themes."]}),`
`,e.jsx(n.h2,{id:"overlay-variations",children:"Overlay Variations"}),`
`,e.jsxs(n.p,{children:["The Grand Hero Banner supports three overlay styles. Use the interactive preview above to switch between them, or see the ",e.jsx(n.a,{href:"?path=/story/organisms-banners-grand-hero-visreg--old-blues",children:"Visreg page"})," for a side-by-side comparison."]}),`
`,e.jsx(n.h3,{id:"contained-overlay",children:"Contained Overlay"}),`
`,e.jsx(n.p,{children:"Content is constrained to a column width, providing a cleaner, more structured look against the full-bleed image."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:p})}),`
`,e.jsx(n.h2,{id:"width-variations",children:"Width Variations"}),`
`,e.jsxs(n.p,{children:["The Grand Hero Banner supports two width modes controlled by the ",e.jsx(n.code,{children:"grand_hero__width"})," property. In Drupal, this is exposed as the ",e.jsx(n.strong,{children:"Banner Width"})," field on the block's Design tab."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"site"})})," (default): Content overlay is constrained to the site max-width with side gutters — consistent with other page content."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"full"})}),": Content overlay spans edge-to-edge across the full viewport width with no side gutters — best on wide screens for maximum impact."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Existing banners default to ",e.jsx(n.code,{children:"site"})," so there is no visual change unless authors explicitly choose Full Width."]}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:x})}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"grand-hero/yds-grand-hero.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"grand-hero/_yds-grand-hero.scss"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Semantic HTML structure with proper heading hierarchy"}),`
`,e.jsx(n.li,{children:"Background images implemented with appropriate alternative text handling"}),`
`,e.jsx(n.li,{children:"Interactive elements (buttons, links) are keyboard accessible with clear focus indicators"}),`
`,e.jsx(n.li,{children:"Sufficient color contrast ratios maintained across all theme variations"}),`
`,e.jsx(n.li,{children:"Content remains accessible when background images fail to load"}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Design"}),": Banner adapts to viewport with content scaling appropriately"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image Loading"}),": Uses responsive images with appropriate srcset for different screen sizes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Video Background"}),": When enabled, replaces the static background image with a video"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Reserve for homepages and primary landing pages — one per page maximum"}),`
`,e.jsx(n.li,{children:"Keep heading text bold and brief; the Grand Hero is the first thing users see"}),`
`,e.jsx(n.li,{children:"Use high-quality, full-bleed images with a 16:9 aspect ratio"}),`
`,e.jsx(n.li,{children:"Choose the overlay variation based on the image composition — full overlay works well with busy imagery, contained works with cleaner images"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use on interior content pages where an Action Banner or Image Banner would be more appropriate"}),`
`,e.jsx(n.li,{children:"Avoid lengthy snippet text — the heading should carry the message"}),`
`,e.jsx(n.li,{children:"Don't use low-contrast color combinations that make text difficult to read"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all overlay, theme, and size variations, see the ",e.jsx(n.a,{href:"?path=/story/organisms-banners-grand-hero-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action Banner"}),": When you need multiple CTAs or flexible content positioning"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image Banner"}),": For visual storytelling with minimal text and no content overlay"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Video Banner"}),": For video-first content presentation"]}),`
`]})]})}function k(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}export{k as default};
//# sourceMappingURL=grand-hero-DyB9Jr5b.js.map
