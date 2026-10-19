import{u as o,j as e,M as t,C as d,a as l}from"./blocks-C3MhvIPG.js";import{E as a,I as i,c}from"./embed.stories-jLdVpOda.js";import{t as h}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./component-props-De-d7Djp.js";function r(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:a,name:"Overview"}),`
`,e.jsx(n.h1,{id:"embed",children:"Embed"}),`
`,e.jsx(n.p,{children:"The embed component provides a flexible container for embedding third-party content such as forms, audio players, maps, calendars, and social media posts. It supports various embed types including Microsoft Forms, SoundCloud, Google Maps, Google Calendar, PowerBI dashboards, and social media embeds from Instagram, X (Twitter), and Bluesky."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the embed's properties in real-time. The embed component adapts to different content types and provides consistent styling across all embedded content."}),`
`,e.jsx(d,{of:i}),`
`,e.jsx(l,{of:i}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(c,"optional"),`
`,e.jsx(n.h2,{id:"embed-types",children:"Embed Types"}),`
`,e.jsx(n.p,{children:"The embed component supports multiple types of embedded content:"}),`
`,e.jsx(n.h3,{id:"forms",children:"Forms"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Supported Platforms:"})," Microsoft Forms, Google Forms, Qualtrics, and other form platforms"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Embed surveys, registration forms, feedback forms, and data collection tools directly into content pages."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," Microsoft Forms embed for event registration or feedback collection."]}),`
`,e.jsx(n.h3,{id:"audio",children:"Audio"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Supported Platforms:"})," SoundCloud, Spotify, Apple Music embeds"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Share podcasts, music, audio recordings, or sound clips within content."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," SoundCloud player for a university podcast episode."]}),`
`,e.jsx(n.h3,{id:"maps",children:"Maps"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Supported Platforms:"})," Google Maps, Mapbox, and other mapping services"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Show locations, campus maps, directions, or geographic data visualization."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," Google Maps embed showing Yale University campus location."]}),`
`,e.jsx(n.h3,{id:"calendars",children:"Calendars"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Supported Platforms:"})," Google Calendar, Outlook Calendar"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Display event schedules, office hours, or upcoming activities."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," Google Calendar showing department events and deadlines."]}),`
`,e.jsx(n.h3,{id:"dashboards",children:"Dashboards"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Supported Platforms:"})," PowerBI, Tableau, and other data visualization tools"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Embed interactive data dashboards and analytics."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," PowerBI dashboard showing institutional metrics."]}),`
`,e.jsx(n.h3,{id:"social-media",children:"Social Media"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Supported Platforms:"})," Instagram, X (Twitter), Bluesky"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Display social media posts and feeds to show institutional updates and engagement."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Social media embeds use embed codes provided by the platforms and are rendered as raw HTML rather than iframes."]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-embed.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-embed.scss"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Title Attribute"}),": All iframe embeds should include an ",e.jsx(n.code,{children:"embed__title"})," for screen reader context"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semantic HTML"}),": Uses appropriate ",e.jsx(n.code,{children:"iframe"})," element with proper attributes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": All embedded content maintains keyboard accessibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Loading Strategy"}),": Lazy loading improves page performance without sacrificing accessibility"]}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Design"}),": Embeds scale appropriately to container width"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Lazy Loading"}),": By default, embeds use lazy loading to improve page load performance"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Width Constraints"}),": Supports multiple width options to fit different layout contexts"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Aspect Ratios"}),": Different embed types may have different default aspect ratios"]}),`
`]}),`
`,e.jsx(n.h2,{id:"width-options",children:"Width Options"}),`
`,e.jsx(n.p,{children:"The embed component supports two width options:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"site"}),": Standard site content width (default)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"content"}),": Standard content column width"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Always provide an ",e.jsx(n.code,{children:"embed__title"})," for accessibility, especially for forms and interactive content"]}),`
`,e.jsx(n.li,{children:"Choose appropriate width based on content type (maps often benefit from wider widths)"}),`
`,e.jsx(n.li,{children:"Test embedded content responsiveness across different screen sizes"}),`
`,e.jsx(n.li,{children:"Verify that embedded content is accessible and follows accessibility guidelines"}),`
`,e.jsx(n.li,{children:"Consider the performance impact of multiple embeds on a single page"}),`
`,e.jsx(n.li,{children:"For social media embeds, ensure the embed code is current and from official sources"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't embed untrusted or unverified third-party content"}),`
`,e.jsx(n.li,{children:"Avoid embedding content that contains autoplay audio/video without user controls"}),`
`,e.jsx(n.li,{children:"Don't use embeds when native HTML elements would be more appropriate"}),`
`,e.jsx(n.li,{children:"Avoid excessive stacking of multiple heavy embeds on a single page"}),`
`,e.jsx(n.li,{children:"Don't forget to include titles for screen readers"}),`
`,e.jsx(n.li,{children:"Avoid embedding content that requires specific plugins or outdated technologies"}),`
`]}),`
`,e.jsx(n.h2,{id:"security-considerations",children:"Security Considerations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Content Source Validation"}),": Only embed content from trusted, verified sources"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"HTTPS"}),": Ensure all embed URLs use HTTPS for secure connections"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CSP Compatibility"}),": Verify embedded content works with Content Security Policy headers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Privacy"}),": Consider privacy implications of third-party embeds (cookies, tracking)"]}),`
`]}),`
`,e.jsx(n.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(n.h3,{id:"clipboard-access",children:"Clipboard Access"}),`
`,e.jsxs(n.p,{children:["Chrome and Firefox block clipboard writes from inside a cross-origin iframe unless the embedding page delegates the permission, so the iframe carries ",e.jsx(n.code,{children:'allow="clipboard-write"'}),". This lets copy-to-clipboard buttons in embedded content work rather than silently failing."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Known limitation:"})," Safari does not honour delegated ",e.jsx(n.code,{children:"clipboard-write"})," for cross-origin iframes the way Chrome and Firefox do, so copy buttons inside an embed may still fail there. There is no querystring or configuration workaround, and the platform does not attempt one."]}),`
`,e.jsx(n.h3,{id:"social-media-embeds",children:"Social Media Embeds"}),`
`,e.jsx(n.p,{children:"Social media embeds (Instagram, X, Bluesky) require both the blockquote HTML and script tag provided by the platform. These are typically added as raw HTML rather than using the component's iframe structure."}),`
`,e.jsx(n.h3,{id:"form-embeds",children:"Form Embeds"}),`
`,e.jsx(n.p,{children:"Form embeds should include:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The form URL with embed parameters"}),`
`,e.jsx(n.li,{children:"An appropriate title describing the form's purpose"}),`
`,e.jsx(n.li,{children:"Appropriate height to show form content without excessive scrolling"}),`
`]}),`
`,e.jsx(n.h3,{id:"map-embeds",children:"Map Embeds"}),`
`,e.jsx(n.p,{children:"Map embeds benefit from:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Using the 'map' type for semantic clarity"}),`
`,e.jsx(n.li,{children:"Wider width options for better geographic context"}),`
`,e.jsx(n.li,{children:"Appropriate loading strategy based on page position"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Video"}),": For video-specific embeds with additional features"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Iframe"}),": Lower-level iframe component for custom implementations"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function y(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{y as default};
//# sourceMappingURL=embed-YCSheHJe.js.map
