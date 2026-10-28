import{u as l,j as e,M as d,C as t,a as c}from"./blocks-BudrnkdM.js";import{C as o,a as s,t as h,b as x,c as a,d as j}from"./control.stories-AKoJB-8s.js";import{t as p}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./yds-text-link-DjKH7WLb.js";import"./yds-text-copy-button-li-VLzqi.js";import"./component-props-De-d7Djp.js";function r(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:o,name:"Overview"}),`
`,e.jsx(n.h1,{id:"controls",children:"Controls"}),`
`,e.jsx(n.p,{children:"The controls component system includes call-to-action buttons (CTAs), text links, and text copy buttons. These fundamental interactive elements provide consistent styling and behavior across the design system with support for multiple themes, styles, and hover effects."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with CTA buttons, text links, and text copy buttons in real-time."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(t,{of:s})}),`
`,e.jsx(c,{of:s}),`
`,e.jsx(n.h2,{id:"component-variations",children:"Component Variations"}),`
`,e.jsx(n.h3,{id:"cta-call-to-action-buttons",children:"CTA (Call to Action) Buttons"}),`
`,e.jsx(n.p,{children:"Primary action buttons with configurable styles, themes, and hover effects."}),`
`,e.jsx(t,{of:s}),`
`,e.jsx(n.h3,{id:"text-links",children:"Text Links"}),`
`,e.jsx(n.p,{children:"Standard hyperlinks with optional icons and styling variations."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(t,{of:h})}),`
`,e.jsx(n.h3,{id:"text-copy-button",children:"Text Copy Button"}),`
`,e.jsx(n.p,{children:"Interactive button for copying text to clipboard with visual feedback."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(t,{of:x})}),`
`,e.jsx(n.h4,{id:"rich-text-source",children:"Rich-text source"}),`
`,e.jsxs(n.p,{children:["When the source text contains block-level markup (e.g. paragraphs from a rich-text field), pass ",e.jsx(n.code,{children:"text_copy_button__pre_text_tag: 'div'"})," so the wrapper is valid HTML. Default is ",e.jsx(n.code,{children:"span"}),"."]}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(t,{of:a})}),`
`,e.jsx(n.h2,{id:"story-controls",children:"Story Controls"}),`
`,e.jsx(n.p,{children:"The following controls are available in the Storybook Controls panel and affect the story rendering context."}),`
`,e.jsx(n.h3,{id:"optional",children:"Optional"}),`
`,p(j,"optional"),`
`,e.jsx(n.h2,{id:"cta-properties",children:"CTA Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"CTA Properties — Required Properties",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cta__content"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Button text content"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cta__href"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Link URL"})]})]})]})}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"CTA Properties — Optional Properties",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Default"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cta__component_theme"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'one'"})}),e.jsx("td",{children:"Theme color from dial (one through seven)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cta__style"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'filled'"})}),e.jsx("td",{children:"Button style (filled, outline)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cta__radius"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'default'"})}),e.jsx("td",{children:"Corner radius (default, soft, pill)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cta__hover_style"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'fade'"})}),e.jsx("td",{children:"Hover animation (fade, rise, wipe)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cta__outline_weight"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'2'"})}),e.jsx("td",{children:"Outline thickness for outline style (1, 2, 4)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"cta__control_type"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Special control type (dropdown)"})]})]})]})}),`
`,e.jsx(n.h2,{id:"text-link-properties",children:"Text Link Properties"}),`
`,e.jsx(n.h3,{id:"required-properties-1",children:"Required Properties"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Text Link Properties — Required Properties",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"link__url"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Link destination URL"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"link__content"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Link text content"})]})]})]})}),`
`,e.jsx(n.h3,{id:"optional-properties-1",children:"Optional Properties"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Text Link Properties — Optional Properties",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Default"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"link__style"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'underline'"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Link styling (underline, no-underline, underline-with-icon,
no-underline-animation)`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"link__type"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'normal'"})}),e.jsx("td",{children:e.jsx(n.p,{children:"Link type (normal, external, target-blank, download, with-chevron)"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"link__url_type"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"URL type indicator (chevron)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"link__attributes"})}),e.jsx("td",{children:e.jsx("code",{children:"object"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Additional HTML attributes (e.g., target)"})]})]})]})}),`
`,e.jsx(n.h2,{id:"text-copy-button-properties",children:"Text Copy Button Properties"}),`
`,e.jsx(n.h3,{id:"required-properties-2",children:"Required Properties"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Text Copy Button Properties — Required Properties",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text_copy_button__pre_text"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Text to be copied to clipboard"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text_copy_button__content"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:"Button label text"})]})]})]})}),`
`,e.jsx(n.h3,{id:"optional-properties-2",children:"Optional Properties"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Text Copy Button Properties — Optional Properties",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Property"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Default"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text_copy_button__component_theme"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'two'"})}),e.jsx("td",{children:"Theme color from dial"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"text_copy_button__pre_text_tag"})}),e.jsx("td",{children:e.jsx("code",{children:"string"})}),e.jsx("td",{children:e.jsx("code",{children:"'span'"})}),e.jsx("td",{children:e.jsxs(n.p,{children:["HTML tag wrapping the source text. Use ",e.jsx("code",{children:"'div'"}),` (or another
block tag) when `,e.jsx("code",{children:"pre_text"}),` contains block-level markup such
as paragraphs.`]})})]})]})]})}),`
`,e.jsx(n.h2,{id:"cta-variations",children:"CTA Variations"}),`
`,e.jsx(n.h3,{id:"style-options",children:"Style Options"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Filled"}),": Solid background with theme color"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Outline"}),": Transparent background with colored border"]}),`
`]}),`
`,e.jsx(n.h3,{id:"radius-options",children:"Radius Options"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default"}),": Standard corner radius"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Soft"}),": Slightly rounded corners"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pill"}),": Fully rounded ends"]}),`
`]}),`
`,e.jsx(n.h3,{id:"hover-effects",children:"Hover Effects"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Fade"}),": Opacity transition (default)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rise"}),": Subtle upward movement"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Wipe"}),": Color sweep animation"]}),`
`]}),`
`,e.jsx(n.h3,{id:"outline-weights",children:"Outline Weights"}),`
`,e.jsx(n.p,{children:"For outline style CTAs, three border thickness options are available:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"1px"}),": Subtle outline"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"2px"}),": Standard outline (default)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"4px"}),": Bold outline"]}),`
`]}),`
`,e.jsx(n.h2,{id:"text-link-variations",children:"Text Link Variations"}),`
`,e.jsx(n.h3,{id:"link-types",children:"Link Types"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Normal"}),": Standard internal link"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"External"}),": Opens external websites (with icon)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Target Blank"}),": Opens in new tab (with icon)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Download"}),": Triggers file download (with icon)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"With Chevron"}),": Shows directional arrow"]}),`
`]}),`
`,e.jsx(n.h3,{id:"link-styles",children:"Link Styles"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Underline"}),": Default underlined link with animation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No Underline"}),": Link without underline"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Underline with Icon"}),": Link with appropriate icon"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No Underline Animation"}),": Static underline without animation"]}),`
`]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Atom"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Templates"}),": ",e.jsx(n.code,{children:"yds-cta.twig"}),", ",e.jsx(n.code,{children:"yds-text-link.twig"}),", ",e.jsx(n.code,{children:"yds-text-copy-button.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"cl-cta.scss"}),", ",e.jsx(n.code,{children:"cl-text-link.scss"}),", ",e.jsx(n.code,{children:"cl-text-copy-button.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"yds-text-link.js"}),", ",e.jsx(n.code,{children:"yds-text-copy-button.js"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": All controls are keyboard accessible"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus States"}),": Clear focus indicators for keyboard users"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA Labels"}),": Appropriate labels for icon-only elements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Link Purpose"}),": Clear indication of link behavior (external, download)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Color Contrast"}),": Meets WCAG AA standards across all themes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interactive Feedback"}),": Visual confirmation for copy button action"]}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hover States"}),": Smooth transitions on mouse hover"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Active States"}),": Visual feedback on click/tap"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus States"}),": Visible outline for keyboard navigation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Copy Button"}),": Clipboard API integration with success feedback"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"External Links"}),": Automatic icon detection based on URL"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use filled CTAs for primary actions, outline for secondary actions"}),`
`,e.jsx(n.li,{children:"Choose hover effects that match your brand personality"}),`
`,e.jsx(n.li,{children:"Provide clear, action-oriented text for CTAs"}),`
`,e.jsx(n.li,{children:"Use appropriate link types to indicate behavior"}),`
`,e.jsx(n.li,{children:"Keep CTA text concise (2-4 words ideal)"}),`
`,e.jsx(n.li,{children:"Use copy button for shareable content like email addresses or codes"}),`
`,e.jsx(n.li,{children:"Ensure sufficient spacing between multiple CTAs"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use too many CTAs on a single page"}),`
`,e.jsx(n.li,{children:'Avoid vague CTA text like "Click Here" or "Learn More" without context'}),`
`,e.jsx(n.li,{children:"Don't mix too many different hover effects on the same page"}),`
`,e.jsx(n.li,{children:"Avoid using external link style for internal navigation"}),`
`,e.jsx(n.li,{children:"Don't use outline CTAs with very thin outlines on busy backgrounds"}),`
`,e.jsx(n.li,{children:"Avoid placing multiple high-emphasis CTAs next to each other"}),`
`]}),`
`,e.jsx(n.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(n.h3,{id:"cta-theming",children:"CTA Theming"}),`
`,e.jsx(n.p,{children:"CTAs integrate with the design system's theme dial. Set the theme using the component_theme property:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-twig",children:`{{ include('@atoms/controls/cta/yds-cta.twig', {
  cta__content: 'Get Started',
  cta__href: '/signup',
  cta__component_theme: 'one',
  cta__style: 'filled',
  cta__hover_style: 'rise'
}) }}
`})}),`
`,e.jsx(n.h3,{id:"link-icon-auto-detection",children:"Link Icon Auto-detection"}),`
`,e.jsx(n.p,{children:"Text links automatically detect URL types and add appropriate icons:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"External URLs: external link icon"}),`
`,e.jsx(n.li,{children:"PDF files: download icon"}),`
`,e.jsx(n.li,{children:"New tab links: new window icon"}),`
`]}),`
`,e.jsx(n.h3,{id:"copy-button-functionality",children:"Copy Button Functionality"}),`
`,e.jsx(n.p,{children:"The text copy button uses the Clipboard API to copy text. It requires JavaScript to be enabled and provides visual feedback on successful copy."}),`
`,e.jsxs(n.p,{children:[`On click, the button's text content is replaced with "Copied to clipboard" for ~1.7 seconds, then restored to whatever label the button was originally rendered with (captured at attach time). Consumers needing custom feedback can listen for the `,e.jsx(n.code,{children:"text-copy-button:copied"})," CustomEvent dispatched on the button and call ",e.jsx(n.code,{children:"event.preventDefault()"})," to suppress the default text swap."]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all control variations and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/atoms-controls-visreg",children:"Visreg page"}),"."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function T(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{T as default};
//# sourceMappingURL=controls-CzJFIWWE.js.map
