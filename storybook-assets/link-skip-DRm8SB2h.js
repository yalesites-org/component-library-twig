import{u as o,j as e,M as a,C as c,a as h}from"./blocks-C3MhvIPG.js";import{L as d,a as s,c as t}from"./link-skip.stories-Cwb2Q1O9.js";import{t as r}from"./twig-props-table-DG0CNbIP.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";import"./link-skip-DZv-NrtM.js";import"./component-props-De-d7Djp.js";function l(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"link-skip",children:"Link Skip"}),`
`,e.jsx(n.p,{children:"The link skip component provides an accessibility-focused navigation aid that allows keyboard users to bypass repetitive navigation and jump directly to the main content of a page. This component is visually hidden by default and only appears when it receives keyboard focus, ensuring compliance with WCAG 2.1 accessibility guidelines."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the link skip's properties. Press Tab to see the skip link appear at the top of the page."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(c,{of:s})}),`
`,e.jsx(h,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,r(t,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,r(t,"optional"),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Atom"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-link-skip.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-link-skip.scss"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:"The link skip component is a critical accessibility feature that provides several benefits:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": Appears when users navigate with the Tab key"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen Reader Support"}),": Properly announced by assistive technologies"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"WCAG 2.1 Compliance"}),": Meets WCAG 2.1 Level A Success Criterion 2.4.1 (Bypass Blocks)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Visual Feedback"}),": Clear focus indicators when the link receives keyboard focus"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Skip Navigation"}),": Allows users to bypass repetitive content and jump to main content"]}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Visually Hidden by Default"}),": The skip link is positioned off-screen using CSS"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Appears on Focus"}),": When the link receives keyboard focus (via Tab), it becomes visible"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"First Interactive Element"}),": Should be the first focusable element on the page"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Anchor Navigation"}),": Clicking or activating the link scrolls to the target anchor"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No JavaScript Required"}),": Works entirely with HTML and CSS"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Place the skip link as the very first element in your page's HTML"}),`
`,e.jsx(n.li,{children:'Use descriptive text like "Skip to main content" or "Skip to content"'}),`
`,e.jsxs(n.li,{children:["Ensure the target anchor (e.g., ",e.jsx(n.code,{children:"#main-content"}),") exists on the page"]}),`
`,e.jsx(n.li,{children:"Apply the skip link to a container element that wraps the main content"}),`
`,e.jsx(n.li,{children:"Test with keyboard navigation to ensure proper visibility and functionality"}),`
`,e.jsx(n.li,{children:"Use consistent skip link text across all pages of your site"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't hide the skip link entirely (it must be available to keyboard users)"}),`
`,e.jsx(n.li,{children:"Don't place the skip link after other focusable elements"}),`
`,e.jsx(n.li,{children:`Don't use vague text like "Skip" without context`}),`
`,e.jsx(n.li,{children:"Don't create multiple skip links pointing to the same target"}),`
`,e.jsx(n.li,{children:"Don't forget to add the corresponding ID to your main content area"}),`
`,e.jsx(n.li,{children:"Don't use JavaScript-dependent implementations when CSS is sufficient"}),`
`]}),`
`,e.jsx(n.h3,{id:"when-to-use-link-skip",children:"When to Use Link Skip"}),`
`,e.jsx(n.p,{children:"The link skip component should be used on:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"All pages with repeated navigation elements"}),`
`,e.jsx(n.li,{children:"Pages with complex headers or navigation menus"}),`
`,e.jsx(n.li,{children:"Sites with multiple navigation regions"}),`
`,e.jsx(n.li,{children:"Any page where users would benefit from bypassing repetitive content"}),`
`]}),`
`,e.jsx(n.h3,{id:"implementation-example",children:"Implementation Example"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- Skip link (first element in body) -->
<a href="#main-content" class="link-skip">Skip to main content</a>

<!-- Site header and navigation -->
<header>...</header>
<nav>...</nav>

<!-- Main content with corresponding ID -->
<main id="main-content">
  <!-- Page content -->
</main>
`})}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all theme variations, see the ",e.jsx(n.a,{href:"?path=/story/atoms-link-skip-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h3,{id:"testing-skip-link-functionality",children:"Testing Skip Link Functionality"}),`
`,e.jsx(n.p,{children:"When testing the skip link:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Load a page with the skip link component"}),`
`,e.jsx(n.li,{children:"Press the Tab key once (skip link should appear at the top)"}),`
`,e.jsx(n.li,{children:"The skip link should have clear visual focus indicators"}),`
`,e.jsx(n.li,{children:"Press Enter or Space to activate the link"}),`
`,e.jsx(n.li,{children:"The page should scroll to the main content area"}),`
`,e.jsx(n.li,{children:"Focus should move to the main content container"}),`
`]}),`
`,e.jsx(n.h3,{id:"testing-accessibility",children:"Testing Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use a screen reader to verify the link is properly announced"}),`
`,e.jsx(n.li,{children:"Ensure the link appears before any other interactive elements"}),`
`,e.jsx(n.li,{children:"Verify sufficient color contrast in the visible state"}),`
`,e.jsx(n.li,{children:"Test keyboard navigation flow from skip link to main content"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Navigation"}),": Works in conjunction with site navigation to improve accessibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Header"}),": Typically placed before or within the site header region"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function f(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}export{f as default};
//# sourceMappingURL=link-skip-DRm8SB2h.js.map
