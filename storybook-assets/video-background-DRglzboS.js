import{u as l,j as e,M as a,C as s,a as c}from"./blocks-CwVT7YGM.js";import{V as h,I as o,P as p,c as r}from"./video-background.stories-TOwASuIR.js";import{t}from"./twig-props-table-GtDG5zMA.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-BnO6idpc.js";import"./yds-video-background-8dsmGWIF.js";import"./component-props-De-d7Djp.js";function d(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"video-background",children:"Video Background"}),`
`,e.jsx(n.p,{children:"The video background component allows for full-width video backgrounds that add visual interest and motion to sections. The video plays automatically and is muted. By default it loops continuously; it can instead play once and stop on its last frame."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the video background across different themes."}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(c,{of:o}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,t(r,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,t(r,"optional"),`
`,e.jsx(n.h2,{id:"playback",children:"Playback"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"video_background__playback"})," controls what happens when the video reaches its end:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"loop"})})," (default): The video repeats until the visitor pauses it."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"once"})}),": The video plays one time and holds on its last frame. The play button replaces the pause button, and pressing it restarts the video from the beginning."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Existing videos default to ",e.jsx(n.code,{children:"loop"}),", so nothing changes unless an editor chooses to play once. In Drupal this is the ",e.jsx(n.strong,{children:"Video Playback"})," field on the Image Banner and Grand Hero blocks. Banners set it with a ",e.jsx(n.code,{children:"data-video-playback"})," attribute on their own wrapper, and the script reads the nearest one."]}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Atom"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-video-background.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"yds-video-background.js"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Autoplay Considerations"}),": Video is muted and decorative"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Motion Preferences"}),": Respects prefers-reduced-motion media query"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No Audio"}),": Background videos should not include essential audio"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Fallback"}),": Should include a poster image for browsers that don't autoplay"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pause, Stop, Hide (WCAG 2.2.2)"}),": The play/pause button is always available, in both playback modes. When a play-once video ends, keyboard focus moves from the pause button to the play button so it isn't lost"]}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Autoplay"}),": Automatically plays on page load"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Muted"}),": No audio to prevent user disruption"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Looping"}),": Loops continuously by default; set ",e.jsx(n.code,{children:"video_background__playback"})," to ",e.jsx(n.code,{children:"once"})," to play once and hold on the last frame"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive"}),": Scales to fill container while maintaining aspect ratio"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Performance"}),": May pause when not in viewport to improve performance"]}),`
`]}),`
`,e.jsx(n.h2,{id:"video-requirements",children:"Video Requirements"}),`
`,e.jsx(n.h3,{id:"technical-requirements",children:"Technical Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Format"}),": MP4 (H.264 codec) for best browser support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Duration"}),": 5-30 seconds recommended for loop seamlessness; for play-once videos, choose a last frame that works as a still image"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Resolution"}),": 1920x1080 (Full HD) minimum"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"File Size"}),": Optimize for web (under 5MB ideal)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Aspect Ratio"}),": 16:9 recommended"]}),`
`]}),`
`,e.jsx(n.h3,{id:"content-guidelines",children:"Content Guidelines"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use subtle, non-distracting motion"}),`
`,e.jsx(n.li,{children:"Ensure smooth loop points (end matches beginning), or a strong final frame for play-once videos"}),`
`,e.jsx(n.li,{children:"Avoid text or important details that need reading"}),`
`,e.jsx(n.li,{children:"Consider all users see the content, not just those who can play video"}),`
`,e.jsx(n.li,{children:"Ensure sufficient contrast for overlaid text"}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use for hero sections or feature highlights"}),`
`,e.jsx(n.li,{children:"Keep videos short for faster loading"}),`
`,e.jsx(n.li,{children:"Optimize videos for web delivery"}),`
`,e.jsx(n.li,{children:"Include a poster frame for initial display"}),`
`,e.jsx(n.li,{children:"Ensure content works without the video (progressive enhancement)"}),`
`,e.jsx(n.li,{children:"Test on various connection speeds"}),`
`,e.jsx(n.li,{children:"Consider mobile data usage"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use videos with essential information (accessibility)"}),`
`,e.jsx(n.li,{children:"Avoid videos that distract from main content"}),`
`,e.jsx(n.li,{children:"Don't rely solely on video for visual interest"}),`
`,e.jsx(n.li,{children:"Avoid long videos that increase page weight"}),`
`,e.jsx(n.li,{children:"Don't use videos with rapid motion that could cause discomfort"}),`
`,e.jsx(n.li,{children:"Avoid videos that don't loop seamlessly, unless they are set to play once"}),`
`]}),`
`,e.jsx(n.h2,{id:"performance-considerations",children:"Performance Considerations"}),`
`,e.jsx(n.h3,{id:"optimization-tips",children:"Optimization Tips"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Compression"}),": Use modern codecs and compression tools"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Resolution"}),": Provide appropriate sizes for different viewports"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Lazy Loading"}),": Consider loading video only when needed"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Fallbacks"}),": Provide static image fallback for unsupported browsers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CDN"}),": Host videos on a CDN for faster delivery"]}),`
`]}),`
`,e.jsx(n.h3,{id:"mobile-considerations",children:"Mobile Considerations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Autoplay"}),": Some mobile browsers restrict autoplay"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Data Usage"}),": Consider file size impact on mobile users"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Performance"}),": Mobile devices may struggle with high-res video"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Battery"}),": Background video can drain battery quickly"]}),`
`]}),`
`,e.jsx(n.h2,{id:"reduced-motion",children:"Reduced Motion"}),`
`,e.jsxs(n.p,{children:["The component respects the ",e.jsx(n.code,{children:"prefers-reduced-motion"})," media query. Users who have enabled reduced motion in their system settings will see a static frame instead of the playing video. This applies in both playback modes."]}),`
`,e.jsx(n.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div class="video-background">
  <video autoplay muted loop playsinline>
    <source src="background.mp4" type="video/mp4" />
  </video>
</div>
`})}),`
`,e.jsx(n.h3,{id:"with-overlay-content",children:"With Overlay Content"}),`
`,e.jsx(n.p,{children:"Background videos typically have content overlaid on top:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div class="section-with-video">
  <div class="video-background">...</div>
  <div class="overlay-content">
    <h1>Your Content Here</h1>
  </div>
</div>
`})}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all video background variations and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/atoms-videos-video-background-visreg",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Background Image"}),": Alternative static background option"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hero Component"}),": Often uses video backgrounds"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function w(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}export{w as default};
//# sourceMappingURL=video-background-DRglzboS.js.map
