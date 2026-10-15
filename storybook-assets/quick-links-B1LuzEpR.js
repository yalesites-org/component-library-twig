import{u as t,j as n,M as l,C as o,a as c}from"./blocks-C3MhvIPG.js";import{Q as a,q as s,c as d}from"./quick-links.stories-Bvffjfwr.js";import{t as h}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./component-props-De-d7Djp.js";import"./quick-links-vBLtUtYH.js";import"./image-CSdbOboU.js";function r(i){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...t(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(l,{of:a,name:"Overview"}),`
`,n.jsx(e.h1,{id:"quick-links",children:"Quick Links"}),`
`,n.jsx(e.p,{children:"The Quick Links component provides a list of important links for quick navigation. It features an optional heading and description, and can optionally include an accompanying image. Quick Links are ideal for highlighting frequently accessed pages or key resources."}),`
`,n.jsx(e.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,n.jsx(e.p,{children:"Use the controls panel below to experiment with the Quick Links properties in real-time. Test different headings, descriptions, and image options."}),`
`,n.jsx(o,{of:s}),`
`,n.jsx(c,{of:s}),`
`,n.jsx(e.h2,{id:"properties",children:"Properties"}),`
`,n.jsx(e.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(d,"optional"),`
`,n.jsx(e.h2,{id:"component-variations",children:"Component Variations"}),`
`,n.jsx(e.h3,{id:"with-and-without-images",children:"With and Without Images"}),`
`,n.jsx(e.p,{children:"The Quick Links component can be displayed with or without an accompanying image:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Without Image"}),": Links appear in a clean, text-focused layout"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"With Image"}),": An image is displayed alongside the links, adding visual interest and context"]}),`
`]}),`
`,n.jsx(e.h3,{id:"link-types",children:"Link Types"}),`
`,n.jsx(e.p,{children:"The component automatically detects and styles different link types:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Internal Links"}),": Links beginning with ",n.jsx(e.code,{children:"#"})," or relative paths"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"External Links"}),": Full URLs are displayed with appropriate styling"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Document Links"}),": Links to documents (e.g., PDFs) are automatically identified and styled"]}),`
`]}),`
`,n.jsx(e.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Template"}),": ",n.jsx(e.code,{children:"yds-quick-links.twig"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Styles"}),": ",n.jsx(e.code,{children:"_yds-quick-links.scss"})]}),`
`]}),`
`,n.jsx(e.h3,{id:"accessibility",children:"Accessibility"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Semantic list structure (",n.jsx(e.code,{children:"<ul>"})," and ",n.jsx(e.code,{children:"<li>"})," elements) for proper screen reader navigation"]}),`
`,n.jsx(e.li,{children:"Links are keyboard accessible with clear focus indicators"}),`
`,n.jsx(e.li,{children:"Proper heading hierarchy when heading is provided"}),`
`,n.jsx(e.li,{children:"Color contrast meets WCAG 2.1 AA standards"}),`
`,n.jsx(e.li,{children:"External links and document links are properly identified for assistive technologies"}),`
`]}),`
`,n.jsx(e.h3,{id:"responsive-behavior",children:"Responsive Behavior"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Links stack vertically on all screen sizes for optimal readability"}),`
`,n.jsxs(e.li,{children:["When an image is included, the layout adjusts responsively:",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Mobile: Image stacks above or below the links"}),`
`,n.jsx(e.li,{children:"Tablet and larger: Image and links appear side-by-side"}),`
`]}),`
`]}),`
`,n.jsx(e.li,{children:"Touch targets meet minimum size requirements for mobile devices"}),`
`]}),`
`,n.jsx(e.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,n.jsx(e.h3,{id:"best-practices",children:"Best Practices"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Use Quick Links for frequently accessed resources or important navigation shortcuts"}),`
`,n.jsx(e.li,{children:"Keep link text concise and descriptive (3-8 words)"}),`
`,n.jsx(e.li,{children:"Limit to 4-8 links to avoid overwhelming users"}),`
`,n.jsx(e.li,{children:"Group related links together logically"}),`
`,n.jsx(e.li,{children:"Use optional heading to provide context about the link collection"}),`
`,n.jsx(e.li,{children:"When using an image, ensure it relates to the links' content or purpose"}),`
`,n.jsx(e.li,{children:"Order links by importance or usage frequency"}),`
`]}),`
`,n.jsx(e.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Don't use Quick Links to replace primary navigation"}),`
`,n.jsx(e.li,{children:"Don't include more than 10 links (creates a long, hard-to-scan list)"}),`
`,n.jsx(e.li,{children:'Avoid overly generic link text like "Click here" or "Read more"'}),`
`,n.jsx(e.li,{children:"Don't mix unrelated links in the same Quick Links component"}),`
`,n.jsx(e.li,{children:"Avoid using images that don't add meaningful context"}),`
`,n.jsx(e.li,{children:"Don't use Quick Links for single links (use a standard link or button instead)"}),`
`,n.jsx(e.li,{children:"Avoid placing Quick Links in every layout region (reduces their effectiveness)"}),`
`]}),`
`,n.jsx(e.h3,{id:"when-to-use-quick-links",children:"When to Use Quick Links"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Sidebar or footer navigation for key pages"}),`
`,n.jsx(e.li,{children:"Related resources within content pages"}),`
`,n.jsx(e.li,{children:"Important forms, tools, or applications"}),`
`,n.jsx(e.li,{children:"Department or program landing pages"}),`
`,n.jsx(e.li,{children:"Support and help sections"}),`
`,n.jsx(e.li,{children:"Administrative or staff resources"}),`
`]}),`
`,n.jsx(e.h2,{id:"testing",children:"Testing"}),`
`,n.jsxs(e.p,{children:["For comprehensive visual regression testing with all theme variations and configurations, see the ",n.jsx(e.a,{href:"?path=/story/molecules-quick-links-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,n.jsx(e.h2,{id:"related-components",children:"Related Components"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Menu"}),": Use for primary navigation structures"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Link"}),": Use standalone links for single navigation items"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Callout"}),": Consider callouts when you need more visual emphasis with descriptions"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Card"}),": Use cards when links need more context with images and descriptions"]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Need help?"})," Refer to the ",n.jsx(e.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function L(i={}){const{wrapper:e}={...t(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(r,{...i})}):r(i)}export{L as default};
//# sourceMappingURL=quick-links-B1LuzEpR.js.map
