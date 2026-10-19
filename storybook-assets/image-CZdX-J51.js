import{u as l,j as e,M as c,C as a,a as d}from"./blocks-C3MhvIPG.js";import{I as h,C as s,c as t}from"./image.stories-CUs_A9WI.js";import{t as r}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./image-CSdbOboU.js";import"./component-props-De-d7Djp.js";function o(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"image",children:"Image"}),`
`,e.jsx(n.p,{children:"The content image component displays responsive images with optional captions in various layout contexts. It extends the base image atom with content-specific features like captions and width controls, making it suitable for use within articles, pages, and other content types."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the image component's properties."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(a,{of:s})}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(t,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(t,"optional"),`
`,e.jsx(n.h2,{id:"width-options",children:"Width Options"}),`
`,e.jsx(n.p,{children:"The content image component supports two width constraints that determine how the image fits within its container:"}),`
`,e.jsx(n.h3,{id:"content",children:"Content"}),`
`,e.jsx(n.p,{children:"The default width that constrains the image to the content column width. This is the standard choice for images within text content."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use for:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Images within article body content"}),`
`,e.jsx(n.li,{children:"Inline images in blog posts"}),`
`,e.jsx(n.li,{children:"Standard content illustrations"}),`
`]}),`
`,e.jsx(n.h3,{id:"site",children:"Site"}),`
`,e.jsx(n.p,{children:"Extends the image to the full site content width, spanning the entire content area."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use for:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Hero images"}),`
`,e.jsx(n.li,{children:"Full-width illustrations"}),`
`,e.jsx(n.li,{children:"Images that need maximum impact"}),`
`]}),`
`,e.jsx(n.h2,{id:"image-aspect-ratios",children:"Image Aspect Ratios"}),`
`,e.jsx(n.p,{children:"The component supports various aspect ratios for different use cases:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"16:9"}),": Wide format, ideal for hero images and landscape photography"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"3:2"}),": Classic photography ratio, balanced and versatile"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"4:3"}),": Traditional format, good for portraits and standard imagery"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"1:1"}),": Square format, useful for consistent grid layouts"]}),`
`]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-content-image.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-content-image.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Base Component"}),": Extends ",e.jsx(n.code,{children:"yds-image.twig"})," (atom)"]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Required alt text"}),": All images must have descriptive alt text"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Empty alt for decorative images"}),": Use ",e.jsx(n.code,{children:'alt=""'})," for purely decorative images"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Caption semantics"}),": Captions use proper semantic markup (",e.jsx(n.code,{children:"<figcaption>"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"HTML structure"}),": Uses ",e.jsx(n.code,{children:"<figure>"})," element for proper semantic structure"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Link support"}),": When captions contain links, ensure sufficient color contrast"]}),`
`]}),`
`,e.jsx(n.h3,{id:"responsive-images",children:"Responsive Images"}),`
`,e.jsx(n.p,{children:"The component leverages modern responsive image techniques:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"srcset"}),": Provides multiple image sources for different pixel densities and viewport sizes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"sizes"}),": Tells the browser what size the image will be at different breakpoints"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Lazy loading"}),": Images can be lazy-loaded for performance optimization"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Art direction"}),": Different crops or compositions can be served at different breakpoints"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Always provide meaningful alt text that describes the image content"}),`
`,e.jsx(n.li,{children:"Use appropriate aspect ratios for your content type"}),`
`,e.jsx(n.li,{children:"Choose width constraints that complement the surrounding content"}),`
`,e.jsx(n.li,{children:"Add captions to provide context or attribution when helpful"}),`
`,e.jsx(n.li,{children:"Optimize images before upload to reduce file size"}),`
`,e.jsx(n.li,{children:"Use srcset and sizes for responsive delivery"}),`
`,e.jsx(n.li,{children:"Consider the reading flow when placing images"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`Don't use generic alt text like "image" or "photo"`}),`
`,e.jsx(n.li,{children:"Don't rely solely on captions to convey critical information (include in alt text)"}),`
`,e.jsx(n.li,{children:"Avoid overly large images that slow page load"}),`
`,e.jsx(n.li,{children:"Avoid placing too many images too close together"}),`
`,e.jsx(n.li,{children:"Don't forget to test image appearance across different viewport sizes"}),`
`]}),`
`,e.jsx(n.h3,{id:"alt-text-guidelines",children:"Alt Text Guidelines"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Good alt text:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Describes the image content and context"}),`
`,e.jsx(n.li,{children:"Is concise but informative"}),`
`,e.jsx(n.li,{children:"Includes relevant details for understanding"}),`
`,e.jsx(n.li,{children:"Considers the image's purpose in context"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"}),`
"Students collaborating in Sterling Memorial Library's reading room"`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Poor alt text:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'"Image123.jpg"'}),`
`,e.jsx(n.li,{children:'"Photo"'}),`
`,e.jsx(n.li,{children:'"Click here"'}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all width variations, aspect ratios, and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/molecules-image-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image (Atom)"}),": The base image component"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Wrapped Image"}),": Image with text wrapping for inline placement"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Banner"}),": Large hero images with text overlay"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function y(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{y as default};
//# sourceMappingURL=image-CZdX-J51.js.map
