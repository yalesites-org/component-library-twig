import{u as a,j as e,M as c,C as t,a as d}from"./blocks-BudrnkdM.js";import{A as h,a as s,b as x,c as p,d as j,e as u,f as r}from"./action-banner.stories--xBjwu8O.js";import{t as o}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./component-props-De-d7Djp.js";import"./banner-CWi5B0T_.js";import"./image-CSdbOboU.js";function l(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"action-banner",children:"Action Banner"}),`
`,e.jsx(n.p,{children:"The Action Banner is the most feature-rich banner variation in the Yale design system. It supports heading text, a snippet, a background image, and up to two call-to-action buttons. Content can be positioned at the bottom, left, or right of the banner, making it well-suited for pages that require clear, prominent calls-to-action."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the component's properties in real-time."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(t,{of:s})}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,o(r,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,o(r,"optional"),`
`,e.jsx(n.h2,{id:"theme-options",children:"Theme Options"}),`
`,e.jsx(n.p,{children:"The Action Banner supports the full set of component theme dials:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": Standard theme using global color settings"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"One through Five"}),": Custom theme dials that override global settings with component-specific colors"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"banner__content__background"})," property to apply different themes. The theme affects the content area background color and text colors for optimal contrast."]}),`
`,e.jsx(n.h2,{id:"content-layout-variations",children:"Content Layout Variations"}),`
`,e.jsxs(n.p,{children:["The Action Banner supports three content positions. Use the interactive preview above to switch between them, or see the ",e.jsx(n.a,{href:"?path=/story/organisms-banners-action-banner-visreg--old-blues",children:"Visreg page"})," for a side-by-side comparison."]}),`
`,e.jsx(n.h3,{id:"left-layout",children:"Left Layout"}),`
`,e.jsx(n.p,{children:"Content positioned to the left of the banner image — works well for emphasis on a key message."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(t,{of:x})}),`
`,e.jsx(n.h3,{id:"right-layout",children:"Right Layout"}),`
`,e.jsx(n.p,{children:"Content positioned to the right — useful for balancing a left-heavy image composition."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(t,{of:p})}),`
`,e.jsx(n.h2,{id:"width-variations",children:"Width Variations"}),`
`,e.jsxs(n.p,{children:["The Action Banner supports two width modes controlled by the ",e.jsx(n.code,{children:"banner__width"})," property. In Drupal, this is exposed as the ",e.jsx(n.strong,{children:"Banner Width"})," field on the block's Design tab."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"site"})})," (default): Content is constrained to the site max-width with side gutters — consistent with other page content."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"full"})}),": Content spans edge-to-edge across the full viewport width with no side gutters — best on wide screens for an immersive layout."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Existing banners default to ",e.jsx(n.code,{children:"site"})," so there is no visual change unless authors explicitly choose Full Width."]}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(t,{of:j})}),`
`,e.jsx(n.h2,{id:"text-links",children:"Text Links"}),`
`,e.jsxs(n.p,{children:["The two links can render as text links instead of buttons, using the template's ",e.jsx(n.code,{children:"banner__link__style: 'text-link'"})," option."]}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(t,{of:u})}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"action/yds-action-banner.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"action/_yds-action-banner.scss"})]}),`
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
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Design"}),": Content repositions for optimal mobile display"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Content Layout"}),": Bottom, left, and right positions adjust based on viewport"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image Loading"}),": Uses responsive images with appropriate srcset for different screen sizes"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use at the top of pages to immediately capture attention and set context"}),`
`,e.jsx(n.li,{children:"Keep heading text concise and impactful (60 characters or less recommended)"}),`
`,e.jsx(n.li,{children:"Limit snippet text to 1–2 sentences for readability"}),`
`,e.jsx(n.li,{children:"Use high-quality images with 16:9 aspect ratio"}),`
`,e.jsx(n.li,{children:"Ensure sufficient contrast between text and background images"}),`
`,e.jsx(n.li,{children:"Don't use more than two call-to-action buttons"}),`
`]}),`
`,e.jsx(n.h3,{id:"button-configuration",children:"Button Configuration"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mixed"})," (default): Primary button uses primary styling, secondary uses secondary — recommended for clear visual hierarchy"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Both Primary"}),": Use sparingly; reduces visual hierarchy between buttons"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Both Secondary"}),": Use for less prominent actions"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Alignment"}),": Right-aligned works well with bottom layout; left-aligned suits left/right layouts"]}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use multiple banners on a single page"}),`
`,e.jsx(n.li,{children:"Don't rely solely on background images to convey critical information"}),`
`,e.jsx(n.li,{children:"Avoid lengthy text content — use page body for detailed information"}),`
`,e.jsx(n.li,{children:"Don't use low-contrast color combinations"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all layout, theme, and content variations, see the ",e.jsx(n.a,{href:"?path=/story/organisms-banners-action-banner-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grand Hero Banner"}),": For maximum-impact hero without multi-button CTAs"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image Banner"}),": For visual storytelling with minimal text"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Video Banner"}),": For video-first content presentation"]}),`
`]})]})}function A(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}export{A as default};
//# sourceMappingURL=action-banner-8BSVb19R.js.map
