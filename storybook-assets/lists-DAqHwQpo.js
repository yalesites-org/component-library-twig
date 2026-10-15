import{u as d,j as e,M as o,C as c,a as h}from"./blocks-C3MhvIPG.js";import{L as a,I as n,c as t}from"./list.stories-ChI35nJO.js";import{t as r}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./categories-list-4ZYIRA_k.js";import"./component-props-De-d7Djp.js";function l(i){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...d(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:a,name:"Overview"}),`
`,e.jsx(s.h1,{id:"lists",children:"Lists"}),`
`,e.jsx(s.p,{children:"The lists component system provides styled list elements for various use cases, including unordered lists, ordered lists, and specialized taxonomy lists for tags and categories. Lists maintain consistent styling across the design system while adapting to their context."}),`
`,e.jsx(s.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(s.p,{children:"Use the controls panel below to experiment with different list types and themes in real-time."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(c,{of:n})}),`
`,e.jsx(h,{of:n}),`
`,e.jsx(s.h2,{id:"list-types",children:"List Types"}),`
`,e.jsx(s.h3,{id:"unordered-list",children:"Unordered List"}),`
`,e.jsx(s.p,{children:"Standard bulleted lists for non-sequential items."}),`
`,e.jsx(s.h3,{id:"ordered-list",children:"Ordered List"}),`
`,e.jsx(s.p,{children:"Numbered lists for sequential or prioritized items."}),`
`,e.jsx(s.h3,{id:"tags-list",children:"Tags List"}),`
`,e.jsx(s.p,{children:"Specialized list styling for tag taxonomies with pill-style presentation."}),`
`,e.jsx(s.h3,{id:"categories-list",children:"Categories List"}),`
`,e.jsx(s.p,{children:"Specialized list styling for category taxonomies with distinct visual treatment."}),`
`,e.jsx(s.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(s.h3,{id:"standard-list-properties",children:"Standard List Properties"}),`
`,r(t,"required"),`
`,r(t,"optional"),`
`,e.jsx(s.h3,{id:"list-item-properties",children:"List Item Properties"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"List Item Properties",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"item__content"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Content of the list item"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"item__link"})}),e.jsx("td",{children:e.jsx("code",{children:"object"})}),e.jsx("td",{children:"Optional link object with url and title properties"})]})]})]})}),`
`,e.jsx(s.h3,{id:"taxonomy-list-properties",children:"Taxonomy List Properties"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Taxonomy List Properties",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"tags"})}),e.jsx("td",{children:e.jsx("code",{children:"array"})}),e.jsx("td",{children:"Array of tag objects for tags list"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"categories"})}),e.jsx("td",{children:e.jsx("code",{children:"array"})}),e.jsx("td",{children:"Array of category objects for categories list"})]})]})]})}),`
`,e.jsx(s.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Atomic Level"}),": Atom"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Templates"}),": ",e.jsx(s.code,{children:"yds-list.twig"}),", ",e.jsx(s.code,{children:"yds-tags-list.twig"}),", ",e.jsx(s.code,{children:"yds-categories-list.twig"})]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Styles"}),": ",e.jsx(s.code,{children:"_yds-list.scss"})]}),`
`]}),`
`,e.jsx(s.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Semantic HTML"}),": Uses proper ",e.jsx(s.code,{children:"<ul>"}),", ",e.jsx(s.code,{children:"<ol>"}),", and ",e.jsx(s.code,{children:"<li>"})," elements"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Screen Reader Support"}),": List structure is properly announced"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Nested Lists"}),": Properly structured for hierarchical content"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Link Context"}),": Links within lists have appropriate context"]}),`
`]}),`
`,e.jsx(s.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"List Markers"}),": Standard bullets for unordered, numbers for ordered"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Spacing"}),": Consistent vertical rhythm between items"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Text Wrapping"}),": Proper indentation for multi-line items"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Responsive"}),": Adapts to container width"]}),`
`]}),`
`,e.jsx(s.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(s.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Use unordered lists for items without inherent order"}),`
`,e.jsx(s.li,{children:"Use ordered lists for sequential steps or ranked items"}),`
`,e.jsx(s.li,{children:"Keep list items concise and scannable"}),`
`,e.jsx(s.li,{children:"Nest lists only when showing clear hierarchy"}),`
`,e.jsx(s.li,{children:"Use tags/categories lists for metadata and filtering"}),`
`,e.jsx(s.li,{children:"Ensure list items are parallel in structure"}),`
`]}),`
`,e.jsx(s.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Don't use lists for purely visual layout"}),`
`,e.jsx(s.li,{children:"Avoid overly long list items (consider breaking into paragraphs)"}),`
`,e.jsx(s.li,{children:"Don't nest lists more than 3 levels deep"}),`
`,e.jsx(s.li,{children:"Avoid mixing content types within a single list"}),`
`,e.jsx(s.li,{children:"Don't use lists when prose would be clearer"}),`
`]}),`
`,e.jsx(s.h2,{id:"list-type-selection",children:"List Type Selection"}),`
`,e.jsx(s.h3,{id:"when-to-use-unordered-lists",children:"When to Use Unordered Lists"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Features or benefits"}),`
`,e.jsx(s.li,{children:"Non-sequential items"}),`
`,e.jsx(s.li,{children:"Items of equal importance"}),`
`,e.jsx(s.li,{children:"Navigation menus"}),`
`,e.jsx(s.li,{children:"Sets of related items"}),`
`]}),`
`,e.jsx(s.h3,{id:"when-to-use-ordered-lists",children:"When to Use Ordered Lists"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Step-by-step instructions"}),`
`,e.jsx(s.li,{children:"Ranked or prioritized items"}),`
`,e.jsx(s.li,{children:"Sequential processes"}),`
`,e.jsx(s.li,{children:"Numbered references"}),`
`,e.jsx(s.li,{children:"Table of contents"}),`
`]}),`
`,e.jsx(s.h3,{id:"when-to-use-taxonomy-lists",children:"When to Use Taxonomy Lists"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Tags"}),": Informal categorization, multiple selections"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Categories"}),": Formal organization, hierarchical structure"]}),`
`]}),`
`,e.jsx(s.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(s.h3,{id:"standard-lists",children:"Standard Lists"}),`
`,e.jsx(s.p,{children:"Lists can be used within text-field contexts for proper styling:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div class="text-field">
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
</div>
`})}),`
`,e.jsx(s.h3,{id:"nested-lists",children:"Nested Lists"}),`
`,e.jsx(s.p,{children:"Lists can be nested to show hierarchy:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<ul>
  <li>
    Parent item
    <ul>
      <li>Child item</li>
    </ul>
  </li>
</ul>
`})}),`
`,e.jsx(s.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(s.p,{children:["For comprehensive visual regression testing with all list variations and theme combinations, see the ",e.jsx(s.a,{href:"?path=/story/atoms-lists-visreg",children:"Visreg page"}),"."]}),`
`,e.jsx(s.hr,{}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Need help?"})," Refer to the ",e.jsx(s.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function v(i={}){const{wrapper:s}={...d(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(l,{...i})}):l(i)}export{v as default};
//# sourceMappingURL=lists-DAqHwQpo.js.map
