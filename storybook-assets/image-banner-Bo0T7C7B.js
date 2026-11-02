import{u as r,j as e,M as o,C as s,a as l}from"./blocks-CwVT7YGM.js";import{I as h,a as t,b as d,c,d as p,e as x,f as m}from"./image-banner.stories-Cfx6gvs0.js";import{t as g}from"./twig-props-table-GtDG5zMA.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-BnO6idpc.js";import"./component-props-De-d7Djp.js";import"./image-CSdbOboU.js";function a(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"image-banner",children:"Image Banner"}),`
`,e.jsx(n.p,{children:"The Image Banner is a streamlined, visually focused banner that displays a full-width image with an optional caption. It prioritizes the image itself over text content, making it well-suited for visual storytelling, photography showcases, or pages where the imagery is the primary message. Available in tall, short, and mini height variations."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the component's properties in real-time."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:t})}),`
`,e.jsx(l,{of:t}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,g(m,"optional"),`
`,e.jsx(n.h2,{id:"size-variations",children:"Size Variations"}),`
`,e.jsxs(n.p,{children:["The Image Banner is available in three heights. Use the interactive preview above to switch between them, or see the ",e.jsx(n.a,{href:"?path=/story/organisms-banners-image-banner-visreg--old-blues",children:"Visreg page"})," for a side-by-side comparison."]}),`
`,e.jsx(n.h3,{id:"short",children:"Short"}),`
`,e.jsx(n.p,{children:"A reduced height variant — useful when you need a visual accent without the full-bleed impact of the tall version."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:d})}),`
`,e.jsx(n.h3,{id:"mini",children:"Mini"}),`
`,e.jsx(n.p,{children:"The most compact height variant, matching the Grand Hero Banner mini option. Use it when you need a small image accent rather than a full-sized banner."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:c})}),`
`,e.jsx(n.h2,{id:"width-variations",children:"Width Variations"}),`
`,e.jsxs(n.p,{children:["The Image Banner supports two width modes controlled by the ",e.jsx(n.code,{children:"image_banner__width"})," property. In Drupal, this is exposed as the ",e.jsx(n.strong,{children:"Banner Width"})," field on the block's Design tab."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"site"})})," (default): Banner is constrained to the site max-width with side gutters — consistent with other page content."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"full"})}),": Banner spans edge-to-edge across the full viewport width with no side gutters — best on wide screens for immersive photography."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Existing banners default to ",e.jsx(n.code,{children:"site"})," so there is no visual change unless authors explicitly choose Full Width."]}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:p})}),`
`,e.jsx(n.h2,{id:"video-playback",children:"Video Playback"}),`
`,e.jsxs(n.p,{children:["When the Image Banner uses a background video, the ",e.jsx(n.code,{children:"image_banner__video_playback"})," property controls what happens when it ends. In Drupal, this is exposed as the ",e.jsx(n.strong,{children:"Video Playback"})," field on the block form, next to Media."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"loop"})})," (default): The video repeats until the visitor pauses it."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"once"})}),": The video plays one time and holds on its last frame. The play button then restarts it from the beginning."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Existing banners default to ",e.jsx(n.code,{children:"loop"}),", so nothing changes unless editors choose Play once and stop. The play/pause button and reduced-motion behavior are the same in both modes. See the ",e.jsx(n.a,{href:"?path=/docs/atoms-videos-video-background--overview",children:"Video Background"})," docs for details."]}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(s,{of:x})}),`
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
`]})]})}function k(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}export{k as default};
//# sourceMappingURL=image-banner-Bo0T7C7B.js.map
