import{u as d,j as e,M as o,C as l,a as t}from"./blocks-C3MhvIPG.js";import{V as c,v as s,c as a}from"./video-embed.stories-CTmolknY.js";import{t as h}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./video-embed-DfDFIR6J.js";import"./component-props-De-d7Djp.js";function r(n){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...d(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c,name:"Overview"}),`
`,e.jsx(i.h1,{id:"video-embed",children:"Video Embed"}),`
`,e.jsx(i.p,{children:"The video embed component provides a responsive container for embedded videos from platforms like YouTube, Vimeo, and other iframe-based video sources. It maintains proper aspect ratios and ensures videos are accessible and performant."}),`
`,e.jsx(i.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(i.p,{children:"Use the controls panel below to see the video embed component in action."}),`
`,e.jsx(l,{of:s}),`
`,e.jsx(t,{of:s}),`
`,e.jsx(i.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(i.h3,{id:"required-properties",children:"Required Properties"}),`
`,h(a,"required"),`
`,e.jsx(i.h2,{id:"supported-video-platforms",children:"Supported Video Platforms"}),`
`,e.jsx(i.p,{children:"The video embed component works with any iframe-based video platform, including:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"YouTube"}),": Standard and privacy-enhanced embeds"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Vimeo"}),": Public and private videos"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Kaltura"}),": Enterprise video platform"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Wistia"}),": Business video hosting"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Custom Players"}),": Any iframe-embeddable video player"]}),`
`]}),`
`,e.jsx(i.h2,{id:"aspect-ratios",children:"Aspect Ratios"}),`
`,e.jsx(i.p,{children:"The component supports standard video aspect ratios:"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Aspect Ratios",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Ratio"}),e.jsx("th",{children:"Description"}),e.jsx("th",{children:"Common Use"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"16:9"})}),e.jsx("td",{children:"Widescreen format (default)"}),e.jsx("td",{children:"Modern videos, YouTube, most web content"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"4:3"})}),e.jsx("td",{children:"Classic format"}),e.jsx("td",{children:"Older videos, presentations"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"1:1"})}),e.jsx("td",{children:"Square format"}),e.jsx("td",{children:"Social media videos"})]})]})]})}),`
`,e.jsx(i.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Atomic Level"}),": Atom"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Template"}),": ",e.jsx(i.code,{children:"yds-video-embed.twig"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Styles"}),": ",e.jsx(i.code,{children:"cl-video-embed.scss"})]}),`
`]}),`
`,e.jsx(i.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Title Attribute"}),": All iframes must have a descriptive title"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Keyboard Navigation"}),": Embedded players are keyboard accessible"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Captions"}),": Ensure embedded videos have captions/subtitles available"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Transcripts"}),": Provide transcripts for important video content"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Skip Links"}),": Consider skip links for multiple embedded videos"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Focus Management"}),": Embedded players maintain focus indicators"]}),`
`]}),`
`,e.jsx(i.h3,{id:"responsive-behavior",children:"Responsive Behavior"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Fluid Sizing"}),": Videos scale to container width"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Aspect Ratio"}),": Maintains proportions across all viewport sizes"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Mobile Friendly"}),": Touch controls work properly on mobile devices"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Performance"}),": Uses lazy loading when appropriate"]}),`
`]}),`
`,e.jsx(i.h3,{id:"performance",children:"Performance"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Lazy Loading"}),": Iframes can be lazy-loaded for better page performance"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Facade Pattern"}),": Consider loading a thumbnail first for better LCP"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Connection"}),": Videos don't load until necessary, saving bandwidth"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Third-party Scripts"}),": Minimize impact of external player scripts"]}),`
`]}),`
`,e.jsx(i.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(i.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Always provide a descriptive title for the iframe"}),`
`,e.jsx(i.li,{children:"Use 16:9 aspect ratio for modern web videos"}),`
`,e.jsx(i.li,{children:"Enable captions/subtitles in the video platform"}),`
`,e.jsx(i.li,{children:"Provide a transcript or summary for accessibility"}),`
`,e.jsx(i.li,{children:"Test keyboard navigation through embedded player controls"}),`
`,e.jsx(i.li,{children:"Use privacy-enhanced embed URLs when available (YouTube: youtube-nocookie.com)"}),`
`,e.jsx(i.li,{children:"Consider lazy loading for pages with multiple videos"}),`
`,e.jsx(i.li,{children:"Ensure video platform is GDPR/privacy compliant if required"}),`
`]}),`
`,e.jsx(i.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Don't autoplay videos with sound (violates accessibility guidelines)"}),`
`,e.jsx(i.li,{children:"Avoid embedding videos without descriptive titles"}),`
`,e.jsx(i.li,{children:"Don't embed very large videos on pages that should load quickly"}),`
`,e.jsx(i.li,{children:"Avoid platforms that don't support captions/subtitles"}),`
`,e.jsx(i.li,{children:"Don't use deprecated embed codes"}),`
`,e.jsx(i.li,{children:"Avoid inline styles on embed codes"}),`
`,e.jsx(i.li,{children:"Don't forget to test embedded videos on mobile devices"}),`
`]}),`
`,e.jsx(i.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(i.h3,{id:"basic-video-embed",children:"Basic Video Embed"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-twig",children:`{{ include('@atoms/videos/video-embed/yds-video-embed.twig', {
  video_embed__content: '<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Video Title for Accessibility" allowfullscreen></iframe>'
}) }}
`})}),`
`,e.jsx(i.h3,{id:"youtube-privacy-enhanced-mode",children:"YouTube Privacy-Enhanced Mode"}),`
`,e.jsxs(i.p,{children:["Use ",e.jsx(i.code,{children:"youtube-nocookie.com"})," domain for privacy-enhanced embeds:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{children:`https://www.youtube-nocookie.com/embed/VIDEO_ID
`})}),`
`,e.jsx(i.h3,{id:"lazy-loading",children:"Lazy Loading"}),`
`,e.jsx(i.p,{children:"Add loading attribute to iframe for better performance:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<iframe loading="lazy" src="..." title="..."></iframe>
`})}),`
`,e.jsx(i.h3,{id:"facade-pattern",children:"Facade Pattern"}),`
`,e.jsx(i.p,{children:"For critical performance pages, consider implementing a facade pattern:"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Show video thumbnail as placeholder"}),`
`,e.jsx(i.li,{children:"Load actual iframe on user click"}),`
`,e.jsx(i.li,{children:"Improves initial page load performance"}),`
`]}),`
`,e.jsx(i.h3,{id:"video-parameters",children:"Video Parameters"}),`
`,e.jsx(i.p,{children:"Common parameters for video platforms:"}),`
`,e.jsx(i.p,{children:e.jsx(i.strong,{children:"YouTube:"})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"autoplay=1"})," - Autoplay video (use carefully)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"controls=0"})," - Hide video controls"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"modestbranding=1"})," - Minimize YouTube branding"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"rel=0"})," - Don't show related videos"]}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.strong,{children:"Vimeo:"})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"autoplay=1"})," - Autoplay video"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"loop=1"})," - Loop video"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"title=0"})," - Hide video title"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"byline=0"})," - Hide video author"]}),`
`]}),`
`,e.jsx(i.h2,{id:"accessibility-considerations",children:"Accessibility Considerations"}),`
`,e.jsx(i.h3,{id:"video-captions",children:"Video Captions"}),`
`,e.jsx(i.p,{children:"All embedded videos should have captions available:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Enable captions in the video platform"}),`
`,e.jsx(i.li,{children:"Provide accurate, synchronized captions"}),`
`,e.jsx(i.li,{children:"Support multiple languages when possible"}),`
`]}),`
`,e.jsx(i.h3,{id:"transcripts",children:"Transcripts"}),`
`,e.jsx(i.p,{children:"Provide text transcripts for:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Important instructional content"}),`
`,e.jsx(i.li,{children:"Lectures and presentations"}),`
`,e.jsx(i.li,{children:"Videos with dialogue or narration"}),`
`,e.jsx(i.li,{children:"Legal or compliance content"}),`
`]}),`
`,e.jsx(i.h3,{id:"autoplay-guidelines",children:"Autoplay Guidelines"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Never autoplay videos with sound"}),`
`,e.jsx(i.li,{children:"Use autoplay sparingly, only when expected"}),`
`,e.jsx(i.li,{children:"Provide pause/stop controls prominently"}),`
`,e.jsx(i.li,{children:"Consider motion sensitivity (WCAG 2.1)"}),`
`]}),`
`,e.jsx(i.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(i.p,{children:["For comprehensive visual regression testing with all video embed variations and theme combinations, see the ",e.jsx(i.a,{href:"?path=/story/atoms-videos-video-embed-visreg",children:"Visreg page"}),"."]}),`
`,e.jsx(i.hr,{}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Need help?"})," Refer to the ",e.jsx(i.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function y(n={}){const{wrapper:i}={...d(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(r,{...n})}):r(n)}export{y as default};
//# sourceMappingURL=video-embed-BOf0ukTc.js.map
