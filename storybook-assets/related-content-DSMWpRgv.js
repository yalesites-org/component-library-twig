import{u as r,j as e,M as l,C as o,a as d}from"./blocks-C3MhvIPG.js";import{R as c,a as s,c as a}from"./related-content.stories-qlY8t0ri.js";import{t as h}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./related-content-Ds55UXo3.js";import"./component-props-De-d7Djp.js";function i(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"related-content",children:"Related Content"}),`
`,e.jsxs(n.p,{children:["The Related Content molecule renders an editor-set heading followed by a list of references to other site content. It is rendered by the ",e.jsx(n.code,{children:"related_content_block"})," Drupal plugin, which embeds the ",e.jsx(n.code,{children:"entity_reference_for_fields:embed_related_content"})," view and hands the molecule:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'a heading string (configurable per block placement, defaults to "Related Content")'}),`
`,e.jsx(n.li,{children:"the rendered HTML output of the view, where each row shows the referenced content's type and a linked title"}),`
`]}),`
`,e.jsxs(n.p,{children:["The molecule sits at the bottom of nodes that have a ",e.jsx(n.code,{children:"field_related_content"})," reference list — typically Resources, but the block is reusable across any node bundle that adopts the field."]}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the heading and the number of sample rows."}),`
`,e.jsx(o,{of:s}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,h(a,"optional"),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-related-content.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-related-content.scss"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"markup-contract",children:"Markup contract"}),`
`,e.jsx(n.p,{children:"The view markup the molecule expects is the standard Views default style + fields row output:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div class="view view-entity-reference-for-fields ...">
  <div class="view-content">
    <div class="views-row">
      <div class="views-field views-field-type">
        <span class="field-content">Resource</span>
      </div>
      <div class="views-field views-field-title">
        <span class="field-content"><a href="/path">Title</a></span>
      </div>
    </div>
    ...
  </div>
</div>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"related_content__view"})," is rendered into the molecule with the ",e.jsx(n.code,{children:"|raw"})," filter — the HTML is built upstream (by Drupal in production, by the Storybook fixture builder here) so escaping it would print the markup as text. This matches the pattern used by ",e.jsx(n.code,{children:"yds-publication-detail"}),", ",e.jsx(n.code,{children:"yds-image"}),", and ",e.jsx(n.code,{children:"yds-video-embed"}),"."]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Heading is a semantic ",e.jsx(n.code,{children:"<h2>"})," styled to h3 size to keep document outline correct underneath the page title."]}),`
`,e.jsx(n.li,{children:"Section element provides a landmark a screen-reader user can skip to."}),`
`,e.jsx(n.li,{children:"Each row's content type is exposed as plain text above the linked title so the type is announced before the link."}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"when-to-use",children:"When to use"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Below the main content of any node that has a populated ",e.jsx(n.code,{children:"field_related_content"})," list."]}),`
`,e.jsx(n.li,{children:'Wherever you want a simple "see also" list of typed content references; this molecule does not render images or summaries.'}),`
`]}),`
`,e.jsx(n.h3,{id:"when-not-to-use",children:"When not to use"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For curated promotional links — use Callouts."}),`
`,e.jsx(n.li,{children:"For lists of cards with images and summaries — use the Card Collection organism."}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Card Collection"}),": For richer lists of cards with images, summaries, and grid layouts."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Callout"}),": For editor-curated promotional callouts with CTAs."]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function y(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{y as default};
//# sourceMappingURL=related-content-DSMWpRgv.js.map
