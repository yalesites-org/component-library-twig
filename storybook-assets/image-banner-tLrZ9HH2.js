import{u as a,j as e,M as l,C as s,a as o}from"./blocks-C3MhvIPG.js";import{I as h,a as t,b as c,c as d,d as m,e as x}from"./image-banner.stories-DdvkISrF.js";import{t as p}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./component-props-De-d7Djp.js";import"./image-CSdbOboU.js";function r(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"image-banner",children:"Image Banner"}),`
`,e.jsx(n.p,{children:"The Image Banner is a streamlined, visually focused banner that displays a full-width image with an optional caption. It prioritizes the image itself over text content, making it well-suited for visual storytelling, photography showcases, or pages where the imagery is the primary message. Available in tall, short, and mini height variations."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the component's properties in real-time."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:t})}),`
`,e.jsx(o,{of:t}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,p(x,"optional"),`
`,e.jsx(n.h2,{id:"size-variations",children:"Size Variations"}),`
`,e.jsxs(n.p,{children:["The Image Banner is available in three heights. Use the interactive preview above to switch between them, or see the ",e.jsx(n.a,{href:"?path=/story/organisms-banners-image-banner-visreg--old-blues",children:"Visreg page"})," for a side-by-side comparison."]}),`
`,e.jsx(n.h3,{id:"short",children:"Short"}),`
`,e.jsx(n.p,{children:"A reduced height variant — useful when you need a visual accent without the full-bleed impact of the tall version."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:c})}),`
`,e.jsx(n.h3,{id:"mini",children:"Mini"}),`
`,e.jsx(n.p,{children:"The most compact height variant, matching the Grand Hero Banner mini option. Use it when you need a small image accent rather than a full-sized banner."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:d})}),`
`,e.jsx(n.h2,{id:"width-variations",children:"Width Variations"}),`
`,e.jsxs(n.p,{children:["The Image Banner supports two width modes controlled by the ",e.jsx(n.code,{children:"image_banner__width"})," property. In Drupal, this is exposed as the ",e.jsx(n.strong,{children:"Banner Width"})," field on the block's Design tab."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"site"})})," (default): Banner is constrained to the site max-width with side gutters — consistent with other page content."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"full"})}),": Banner spans edge-to-edge across the full viewport width with no side gutters — best on wide screens for immersive photography."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Existing banners default to ",e.jsx(n.code,{children:"site"})," so there is no visual change unless authors explicitly choose Full Width."]}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:m})}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"image/yds-image-banner.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"image/yds-image-banner.scss"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Background images implemented with appropriate alternative text handling"}),`
`,e.jsx(n.li,{children:"Caption text is visible and properly associated with the image"}),`
`,e.jsx(n.li,{children:"Content remains accessible when background images fail to load"}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Design"}),": Banner scales appropriately across viewport sizes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image Loading"}),": Uses responsive images with appropriate srcset for different screen sizes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Video Background"}),": When enabled, replaces the static image with a video"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use when the image is the primary content and text is secondary or absent"}),`
`,e.jsx(n.li,{children:"Choose tall for maximum visual impact on key landing pages"}),`
`,e.jsx(n.li,{children:"Choose short for a more compact visual accent"}),`
`,e.jsx(n.li,{children:"Use high-quality, full-bleed images with a 16:9 aspect ratio"}),`
`,e.jsx(n.li,{children:"Include a caption when the image source or subject matter warrants attribution"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use when you need prominent calls-to-action — use Action Banner instead"}),`
`,e.jsx(n.li,{children:"Don't rely solely on the image to convey critical information"}),`
`,e.jsx(n.li,{children:"Avoid images with complex compositions that lose meaning at reduced sizes"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all size variations, see the ",e.jsx(n.a,{href:"?path=/story/organisms-banners-image-banner-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action Banner"}),": When you need text content and calls-to-action alongside the image"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grand Hero Banner"}),": For maximum-impact hero with content overlay"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Video Banner"}),": For video-first content without a static image fallback"]}),`
`]})]})}function I(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{I as default};
//# sourceMappingURL=image-banner-tLrZ9HH2.js.map
