import{u as r,j as e,M as o,C as l,a as d}from"./blocks-BudrnkdM.js";import{V as c,I as s,c as a}from"./video.stories-BkOBY4fC.js";import{t as h}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./video-khdXQuHI.js";import"./component-props-De-d7Djp.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"video",children:"Video"}),`
`,e.jsx(n.p,{children:"The video component provides a specialized container for embedding video content with optional headings and captions. It supports various video platforms including YouTube, Vimeo, and native HTML5 video, with controls for placement, alignment, and width constraints. The component enhances accessibility with proper labeling and semantic structure."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the video's properties in real-time. The component adapts to different placements and includes support for headings and descriptive text."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(l,{of:s})}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(a,"optional"),`
`,e.jsx(n.h2,{id:"video-platforms",children:"Video Platforms"}),`
`,e.jsx(n.p,{children:"The video component supports multiple video platforms and formats:"}),`
`,e.jsx(n.h3,{id:"youtube",children:"YouTube"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Most common video platform for public institutional content"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Format:"})," YouTube embed iframe code"]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Example:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video title"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Features:"})," Supports autoplay controls, captions, quality selection, playback speed"]}),`
`,e.jsx(n.h3,{id:"vimeo",children:"Vimeo"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," High-quality video hosting with advanced privacy controls"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Format:"})," Vimeo embed iframe code"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Features:"})," Supports privacy settings, custom player colors, advanced analytics"]}),`
`,e.jsx(n.h3,{id:"html5-video",children:"HTML5 Video"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Self-hosted videos with maximum control"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Format:"})," Native HTML5 ",e.jsx(n.code,{children:"<video>"})," element"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Features:"})," Full control over playback, styling, and behavior"]}),`
`,e.jsx(n.h3,{id:"other-platforms",children:"Other Platforms"}),`
`,e.jsx(n.p,{children:"The component can support any video platform that provides iframe embed codes, including Wistia, Kaltura, and custom video players."}),`
`,e.jsx(n.h2,{id:"alignment-options",children:"Alignment Options"}),`
`,e.jsx(n.h3,{id:"left-alignment",children:"Left Alignment"}),`
`,e.jsx(n.p,{children:"Video aligned to the left with text flowing according to standard reading patterns."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Standard content presentation, blog posts, article pages"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Best For:"})," Content-heavy pages where video is supplementary to text"]}),`
`,e.jsx(n.h3,{id:"center-alignment",children:"Center Alignment"}),`
`,e.jsx(n.p,{children:"Video centered within its container for emphasis and visual impact."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Hero sections, featured content, standalone video presentations"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Best For:"})," Highlighting important videos, landing pages, featured media"]}),`
`,e.jsx(n.h2,{id:"width-options",children:"Width Options"}),`
`,e.jsx(n.p,{children:"The video component supports four width options to fit different layout contexts:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"max"}),": Maximum width, edge-to-edge in container"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"site"}),": Standard site content width (default)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"highlight"}),": Slightly wider than content for emphasis"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"content"}),": Standard content column width"]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Recommendation:"})," Use 'site' or 'max' width for most video presentations to maximize visibility while maintaining responsive behavior."]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-video.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-video.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Parameters"}),": Supports fullscreen layout mode"]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Video Titles"}),": All embedded videos should include a title attribute for screen reader context"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Captions"}),": Encourage use of platform-provided captions for video content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semantic Structure"}),": Uses appropriate heading and container elements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": All embedded videos maintain keyboard accessibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Descriptive Text"}),": The ",e.jsx(n.code,{children:"video__text"})," field provides additional context for screen readers"]}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Design"}),": Videos scale proportionally to maintain aspect ratio across all screen sizes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Aspect Ratio"}),": Typically 16:9 for modern video content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Iframe Responsiveness"}),": Embedded iframes automatically adjust to container width"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Lazy Loading"}),": Consider lazy loading for videos below the fold to improve performance"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Always include a meaningful ",e.jsx(n.code,{children:"video__heading"})," that describes the video content"]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"video__text"})," to provide captions, credits, or additional context"]}),`
`,e.jsx(n.li,{children:"Choose center alignment for standalone, featured videos"}),`
`,e.jsx(n.li,{children:"Use left alignment when video is part of longer content flow"}),`
`,e.jsx(n.li,{children:"Ensure embedded videos include proper titles for accessibility"}),`
`,e.jsx(n.li,{children:"Enable platform captions/subtitles for all spoken content"}),`
`,e.jsx(n.li,{children:"Choose appropriate width based on video importance and layout context"}),`
`,e.jsx(n.li,{children:"Test video playback across different devices and browsers"}),`
`,e.jsx(n.li,{children:"Consider video file size and loading performance"}),`
`,e.jsx(n.li,{children:"Use platform privacy settings appropriately for institutional content"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't embed videos without descriptive headings or context"}),`
`,e.jsx(n.li,{children:"Avoid autoplay with sound (can be disruptive to users)"}),`
`,e.jsx(n.li,{children:"Don't use videos as the only way to present critical information (provide text alternatives)"}),`
`,e.jsx(n.li,{children:"Avoid very large width settings for supplementary videos"}),`
`,e.jsx(n.li,{children:"Don't embed multiple videos on a page without considering performance impact"}),`
`,e.jsx(n.li,{children:"Avoid outdated embed codes or deprecated platform features"}),`
`,e.jsx(n.li,{children:"Don't forget to include captions for accessibility compliance"}),`
`,e.jsx(n.li,{children:"Avoid embedding videos from untrusted sources"}),`
`]}),`
`,e.jsx(n.h2,{id:"video-accessibility-requirements",children:"Video Accessibility Requirements"}),`
`,e.jsx(n.h3,{id:"caption-requirements",children:"Caption Requirements"}),`
`,e.jsx(n.p,{children:"All videos should include captions for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Spoken dialogue"}),`
`,e.jsx(n.li,{children:"Important sound effects"}),`
`,e.jsx(n.li,{children:"Speaker identification"}),`
`,e.jsx(n.li,{children:"Music descriptions when relevant"}),`
`]}),`
`,e.jsx(n.h3,{id:"transcript-recommendations",children:"Transcript Recommendations"}),`
`,e.jsx(n.p,{children:"For WCAG AAA compliance or complex content, provide:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Full text transcripts linked near the video"}),`
`,e.jsx(n.li,{children:"Descriptions of important visual content not conveyed through audio"}),`
`,e.jsx(n.li,{children:"Time-stamped navigation for long videos"}),`
`]}),`
`,e.jsx(n.h3,{id:"platform-accessibility-features",children:"Platform Accessibility Features"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"YouTube:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Automatic caption generation (verify accuracy)"}),`
`,e.jsx(n.li,{children:"Manual caption upload support"}),`
`,e.jsx(n.li,{children:"Transcript display option"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Vimeo:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Caption file upload (.srt, .vtt)"}),`
`,e.jsx(n.li,{children:"Interactive transcript option"}),`
`,e.jsx(n.li,{children:"Accessibility player controls"}),`
`]}),`
`,e.jsx(n.h2,{id:"performance-considerations",children:"Performance Considerations"}),`
`,e.jsx(n.h3,{id:"loading-strategies",children:"Loading Strategies"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Above the fold"}),": Load immediately for visibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Below the fold"}),": Consider lazy loading to improve initial page load"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Multiple videos"}),": Use lazy loading or click-to-play thumbnails"]}),`
`]}),`
`,e.jsx(n.h3,{id:"optimization-tips",children:"Optimization Tips"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use platform thumbnail images for click-to-play implementations"}),`
`,e.jsx(n.li,{children:"Consider video length and quality settings for user experience"}),`
`,e.jsx(n.li,{children:"Use CDN-hosted platform embeds for optimal delivery"}),`
`,e.jsx(n.li,{children:"Test loading performance on slower connections"}),`
`]}),`
`,e.jsx(n.h2,{id:"common-use-cases",children:"Common Use Cases"}),`
`,e.jsx(n.h3,{id:"educational-content",children:"Educational Content"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," Lecture recordings, course materials, instructional videos"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Configuration:"})," Left alignment, site width, include descriptive heading and caption with learning objectives"]}),`
`,e.jsx(n.h3,{id:"campus-tours--promotional-videos",children:"Campus Tours & Promotional Videos"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," Virtual tours, recruitment videos, event highlights"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Configuration:"})," Center alignment, highlight or max width for impact, compelling heading"]}),`
`,e.jsx(n.h3,{id:"news--updates",children:"News & Updates"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," President's messages, departmental updates, event coverage"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Configuration:"})," Left alignment, site width, heading with date context, caption with summary"]}),`
`,e.jsx(n.h3,{id:"research--presentations",children:"Research & Presentations"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," Research findings, conference presentations, seminars"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Configuration:"})," Site or content width, include speaker information and abstract in caption"]}),`
`,e.jsx(n.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(n.h3,{id:"embed-code-formatting",children:"Embed Code Formatting"}),`
`,e.jsx(n.p,{children:"When using platform embed codes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Include all recommended iframe attributes (allowfullscreen, allow permissions)"}),`
`,e.jsx(n.li,{children:"Verify that URLs use HTTPS"}),`
`,e.jsx(n.li,{children:"Include appropriate title attributes for accessibility"}),`
`,e.jsx(n.li,{children:"Remove fixed width/height attributes to allow responsive behavior"}),`
`]}),`
`,e.jsx(n.h3,{id:"captiontext-formatting",children:"Caption/Text Formatting"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"video__text"})," field supports HTML, allowing for:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Paragraph tags for formatted text"}),`
`,e.jsx(n.li,{children:"Links to related content or transcripts"}),`
`,e.jsx(n.li,{children:"Lists for video chapter markers"}),`
`,e.jsx(n.li,{children:"Emphasis for important information"}),`
`]}),`
`,e.jsx(n.h3,{id:"heading-hierarchy",children:"Heading Hierarchy"}),`
`,e.jsx(n.p,{children:"Choose appropriate heading levels based on page structure:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use heading levels consistent with surrounding content"}),`
`,e.jsx(n.li,{children:"Don't skip heading levels"}),`
`,e.jsx(n.li,{children:"Consider heading hierarchy for screen reader navigation"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Embed"}),": For general-purpose embedding (forms, maps, audio)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image"}),": For static visual content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Media Gallery"}),": For collections of images and videos"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function b(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{b as default};
//# sourceMappingURL=video-nII8PG_i.js.map
