import{u as o,j as e,M as c,C as d,a}from"./blocks-BudrnkdM.js";import{T as h,a as s,c as t}from"./tiles.stories-CvHNtESN.js";import{t as r}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./tiles-LBlF9d2I.js";import"./image-CSdbOboU.js";import"./component-props-De-d7Djp.js";function l(i){const n={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:h,name:"Overview"}),`
`,e.jsx(n.h1,{id:"tiles",children:"Tiles"}),`
`,e.jsx(n.p,{children:"The tiles component displays a collection of tile items in a grid layout. Each tile can showcase numerical data, headings, icons, or text content in a clean, organized format. Tiles are ideal for displaying statistics, key metrics, or feature highlights in a scannable grid arrangement."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the tiles component's properties in real-time."}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(a,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(t,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(t,"optional"),`
`,e.jsx(n.h2,{id:"presentation-styles",children:"Presentation Styles"}),`
`,e.jsx(n.p,{children:"The tiles component supports three distinct presentation styles to match different content types and visual needs:"}),`
`,e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"1.5rem",margin:"2rem 0"},children:[e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Heading"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Default style emphasizing the heading text, ideal for statistics,
metrics, or numerical data. Heading is prominently displayed with
supporting content below.`})})]})," ",e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Icon"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Icon-based presentation for visual representation of features or services.
Combines iconography with text for quick recognition and scanning.`})})]}),e.jsxs("div",{style:{padding:"1.5rem",background:"#f0f0f0",borderRadius:"8px"},children:[e.jsx("h3",{style:{marginTop:0,color:"#0053A0"},children:"Text Only"}),e.jsx("p",{style:{fontSize:"0.95rem",marginBottom:0},children:e.jsx(n.p,{children:`Clean text-focused presentation without visual emphasis on heading or
icons. Provides a more subdued, content-focused appearance.`})})]})]}),`
`,e.jsx(n.h2,{id:"grid-configurations",children:"Grid Configurations"}),`
`,e.jsx(n.p,{children:"The tiles component offers flexible grid layouts to accommodate different numbers of items and spatial requirements:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Two Column"}),": Best for highlighting 2-4 key items with more space per tile"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Three Column"}),": Default layout balancing density and readability, ideal for 3-6 items"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Four Column"}),": Higher density layout for displaying 4-8+ items with compact presentation"]}),`
`]}),`
`,e.jsx(n.p,{children:"The grid automatically adapts to smaller viewports, reducing columns as needed for optimal mobile display."}),`
`,e.jsx(n.h2,{id:"alignment-options",children:"Alignment Options"}),`
`,e.jsx(n.h3,{id:"horizontal-alignment",children:"Horizontal Alignment"}),`
`,e.jsx(n.p,{children:"Control the horizontal alignment of content within each tile:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Left"}),": Default alignment, content starts at the left edge"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Center"}),": Centers content within each tile for balanced presentation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Right"}),": Right-aligns content, useful for specific layout needs"]}),`
`]}),`
`,e.jsx(n.h3,{id:"vertical-alignment",children:"Vertical Alignment"}),`
`,e.jsx(n.p,{children:"Control the vertical positioning of content within tiles:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Top"}),": Default position, content aligns to the top of each tile"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bottom"}),": Content aligns to the bottom, useful when tiles have varying content heights"]}),`
`]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Technical Specifications",tabIndex:0,children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atomic Level"})}),e.jsx("td",{children:"Organism"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Files"})}),e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("code",{children:"yds-tiles.twig"}),", ",e.jsx("code",{children:"_yds-tiles.scss"})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Dependencies"})}),e.jsx("td",{children:e.jsxs(n.p,{children:["Uses ",e.jsx("code",{children:"tile-item"})," molecule component for individual tiles"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Accessibility"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Semantic HTML list structure, proper heading hierarchy, keyboard
navigable when tiles contain links, sufficient color contrast`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Responsive Behavior"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Grid columns reduce based on viewport size, maintains readability
across all devices, touch-optimized for mobile interactions`})})]})]})})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"content-recommendations",children:"Content Recommendations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Keep tile headings concise and scannable (2-5 words or numerical values)"}),`
`,e.jsx(n.li,{children:"Ensure supporting content is brief and contextual"}),`
`,e.jsx(n.li,{children:"Use consistent themes within a tile collection for visual cohesion"}),`
`,e.jsx(n.li,{children:"Limit tile collections to 6-8 items for optimal scannability"}),`
`]}),`
`,e.jsx(n.h3,{id:"grid-selection",children:"Grid Selection"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Two column"}),": Use for small collections (2-4 items) or when each tile needs more visual weight"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Three column"}),": Default choice for most use cases, balances visual impact with content density"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Four column"}),": Best for larger collections (6-8+ items) or when space is limited"]}),`
`]}),`
`,e.jsx(n.h3,{id:"presentation-style-selection",children:"Presentation Style Selection"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Heading"}),": Choose for numerical data, statistics, or metrics that need emphasis"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Icon"}),": Select when visual symbols enhance understanding or recognition"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text-only"}),": Use for more subdued presentations or text-heavy content"]}),`
`]}),`
`,e.jsx(n.h3,{id:"background-images",children:"Background Images"}),`
`,e.jsx(n.p,{children:"When enabled, background images add visual interest but should:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Be relevant to the tile's content"}),`
`,e.jsx(n.li,{children:"Maintain sufficient contrast with text for readability"}),`
`,e.jsx(n.li,{children:"Use consistent image quality and style across the collection"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tile Item"})," - Individual tile component used within the tiles collection"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grid"})," - Base grid system used for layout structure"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Stats"})," - Similar component for displaying statistical information"]}),`
`]}),`
`,e.jsx(n.h2,{id:"visual-regression-testing",children:"Visual Regression Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive testing of all tiles variations including presentation styles, grid configurations, and alignment options, see the ",e.jsx(n.a,{href:"?path=/story/organisms-tiles-visreg--old-blues-section-default",children:"Visreg page"}),"."]})]})}function w(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}export{w as default};
//# sourceMappingURL=tiles-CpMHUFuU.js.map
