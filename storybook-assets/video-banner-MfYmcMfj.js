import{u as o,j as e,M as t,C as d,a as l}from"./blocks-C3MhvIPG.js";import{V as a,a as s,c}from"./video-banner.stories-DNIeYJTh.js";import{t as h}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./component-props-De-d7Djp.js";import"./video-embed-DfDFIR6J.js";function r(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:a,name:"Overview"}),`
`,e.jsx(n.h1,{id:"video-banner",children:"Video Banner"}),`
`,e.jsx(n.p,{children:"The Video Banner is a specialized banner for displaying video content as the primary page element. It supports two width configurations — max-width constrained or fully fluid — making it adaptable to different layout needs. Unlike the Grand Hero and Image Banners, it does not include a text content overlay."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the component's properties in real-time."}),`
`,e.jsx("div",{className:"sb-full-bleed-canvas",children:e.jsx(d,{of:s})}),`
`,e.jsx(l,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(c,"optional"),`
`,e.jsx(n.h3,{id:"twig-only-props",children:"Twig-Only Props"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Twig-Only Props",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"video_banner__content"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Required. HTML embed string for the video (e.g., from Drupal's video
embed field). Provided by the CMS; not an interactive Storybook
control.`})})]})})]})}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"video/yds-video-banner.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"video/_yds-video-banner.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Note"}),": The Video Banner does not support component theme dials."]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Video content should include captions for users who are deaf or hard of hearing"}),`
`,e.jsx(n.li,{children:"Avoid autoplaying video with audio — this creates accessibility and user experience issues"}),`
`,e.jsx(n.li,{children:"Provide a text alternative or transcript when the video conveys critical information"}),`
`,e.jsx(n.li,{children:"Ensure video player controls are keyboard accessible"}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Design"}),": Video scales proportionally across viewport sizes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Width"}),": ",e.jsx(n.code,{children:"max"})," constrains the video to the standard content max-width; ",e.jsx(n.code,{children:"full"})," allows the video to span the full viewport"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use when video is the primary content and no accompanying text or CTA is needed"}),`
`,e.jsxs(n.li,{children:["Choose ",e.jsx(n.code,{children:"max"})," width for standard content pages"]}),`
`,e.jsxs(n.li,{children:["Choose ",e.jsx(n.code,{children:"full"})," width for immersive, cinematic presentations"]}),`
`,e.jsx(n.li,{children:"Ensure the video embed includes appropriate controls for play, pause, and volume"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't autoplay video with audio — it disrupts users and creates accessibility issues"}),`
`,e.jsx(n.li,{children:"Don't use when you need text content alongside the video — consider Grand Hero Banner with video enabled instead"}),`
`,e.jsx(n.li,{children:"Avoid using multiple video banners on a single page"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For visual regression testing with both width variations, see the ",e.jsx(n.a,{href:"?path=/story/organisms-banners-video-banner-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grand Hero Banner"}),": For a video background with text content overlay"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image Banner"}),": For a static image in place of video"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action Banner"}),": For hero content with prominent calls-to-action"]}),`
`]})]})}function y(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{y as default};
//# sourceMappingURL=video-banner-MfYmcMfj.js.map
