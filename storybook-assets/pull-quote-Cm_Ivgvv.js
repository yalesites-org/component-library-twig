import{u as s,j as e,M as c,C as a,a as h}from"./blocks-C3MhvIPG.js";import{P as d,p as i,c as r}from"./pull-quote.stories-tkkSS2Xo.js";import{t as o}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./pull-quote-CX15qdpZ.js";import"./component-props-De-d7Djp.js";function l(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"pull-quote",children:"Pull Quote"}),`
`,e.jsx(n.p,{children:"The pull quote component highlights compelling excerpts or quotations from content to draw reader attention and break up long text sections. Pull quotes can be styled with three distinct visual variations to match different design needs and complement the surrounding content."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the pull quote's properties in real-time."}),`
`,e.jsx(a,{of:i}),`
`,e.jsx(h,{of:i}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,o(r,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,o(r,"optional"),`
`,e.jsx(n.h2,{id:"style-variations",children:"Style Variations"}),`
`,e.jsx(n.p,{children:"The pull quote component supports three distinct visual styles that can be used to match different design contexts and content layouts:"}),`
`,e.jsx(n.h3,{id:"bar-left",children:"Bar Left"}),`
`,e.jsx(n.p,{children:"The default style with a vertical accent bar positioned on the left side of the quote. This creates a clean, modern look that clearly delineates the quote from surrounding content."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use for:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Standard pull quotes in article layouts"}),`
`,e.jsx(n.li,{children:"Quotes that need clear visual separation"}),`
`,e.jsx(n.li,{children:"Default styling when no specific style is required"}),`
`]}),`
`,e.jsx(n.h3,{id:"bar-right",children:"Bar Right"}),`
`,e.jsx(n.p,{children:"A vertical accent bar positioned on the right side of the quote, providing a mirrored alternative to the bar-left style."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use for:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Creating visual variety when multiple pull quotes appear on a page"}),`
`,e.jsx(n.li,{children:"Balancing page layouts with right-aligned elements"}),`
`,e.jsx(n.li,{children:"Right-to-left language content (though RTL should be handled automatically)"}),`
`]}),`
`,e.jsx(n.h3,{id:"quote-left",children:"Quote Left"}),`
`,e.jsx(n.p,{children:"Features a decorative quotation mark on the left side instead of a bar, offering a more traditional, typographic approach to pull quotes."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use for:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"More formal or traditional content contexts"}),`
`,e.jsx(n.li,{children:"When a softer, less geometric visual treatment is desired"}),`
`,e.jsx(n.li,{children:"Academic or literary content where quotation marks are contextually appropriate"}),`
`]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-pull-quote.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-pull-quote.scss"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Semantic HTML structure using ",e.jsx(n.code,{children:"<blockquote>"})," element"]}),`
`,e.jsx(n.li,{children:"Attribution properly marked up for screen reader context"}),`
`,e.jsx(n.li,{children:"Color contrast meets WCAG AA standards"}),`
`,e.jsx(n.li,{children:"Accent colors are decorative and don't convey meaning alone"}),`
`]}),`
`,e.jsx(n.h3,{id:"theming",children:"Theming"}),`
`,e.jsxs(n.p,{children:["Pull quotes support accent color theming through the ",e.jsx(n.code,{children:"pull_quote__accent_theme"})," property:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"one"}),": Primary accent color (default Yale blue)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"two"}),": Secondary accent color"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"three"}),": Tertiary accent color"]}),`
`]}),`
`,e.jsx(n.p,{children:"The accent theme controls the color of the decorative bar or quotation mark, allowing pull quotes to harmonize with the overall page theme while maintaining readability."}),`
`,e.jsx(n.h3,{id:"implementation-note",children:"Implementation Note"}),`
`,e.jsxs(n.p,{children:["The accent color is applied via CSS custom property ",e.jsx(n.code,{children:"--color-pull-quote-accent"}),". When implementing in a layout context, ensure the layout wrapper sets this variable appropriately:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<div style="--color-pull-quote-accent: var(--color-one)">
  <!-- Pull quote component here -->
</div>
`})}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use pull quotes to highlight the most compelling or important statements from your content"}),`
`,e.jsx(n.li,{children:"Keep pull quote text concise (1-3 sentences maximum)"}),`
`,e.jsx(n.li,{children:"Pull quotes should be exact excerpts from the surrounding content, not paraphrased"}),`
`,e.jsx(n.li,{children:"Place pull quotes strategically to break up long text sections and maintain visual interest"}),`
`,e.jsx(n.li,{children:"Include attribution when the quote is from a specific person or source"}),`
`,e.jsx(n.li,{children:"Choose a style variation that complements your page layout and design"}),`
`,e.jsx(n.li,{children:"Use accent colors consistently across a page to maintain visual harmony"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't create pull quotes from text that doesn't appear in the main content"}),`
`,e.jsx(n.li,{children:"Don't use multiple different style variations on the same page (creates visual confusion)"}),`
`,e.jsx(n.li,{children:"Avoid using pull quotes too frequently (they lose impact if overused)"}),`
`,e.jsx(n.li,{children:"Don't use pull quotes for non-quotation content (use callout component instead)"}),`
`,e.jsx(n.li,{children:"Avoid very long quotes that defeat the purpose of highlighting key content"}),`
`,e.jsx(n.li,{children:"Don't rely solely on color to distinguish pull quotes (ensure structural clarity)"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all style variations and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/molecules-quotes-pull-quote-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Callout"}),": Use for highlighting important information that isn't a direct quote"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text Field"}),": The primary content component from which pull quotes are typically extracted"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function v(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(l,{...t})}):l(t)}export{v as default};
//# sourceMappingURL=pull-quote-Cm_Ivgvv.js.map
