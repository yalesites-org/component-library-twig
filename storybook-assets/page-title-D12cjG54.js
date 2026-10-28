import{u as a,j as e,M as c,C as s,a as t}from"./blocks-BudrnkdM.js";import{P as d,D as r,a as l,c as h}from"./page-title.stories-D5_eRp_W.js";import{t as p}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./social-links-BFPxBdAv.js";import"./component-props-De-d7Djp.js";import"./page-title-DAKJ1SOA.js";import"./yds-read-time-DSMKw0k6.js";function o(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"page-header",children:"Page Header"}),`
`,e.jsxs(n.p,{children:["The page header is the top of every page: the main heading, plus optional metadata and social sharing links. Every content type uses it. Pages and taxonomy term pages show the heading alone; posts add a byline, date, read time and sharing links. The component's code name is still ",e.jsx(n.code,{children:"page-title"})," (",e.jsx(n.code,{children:"yds-page-title.twig"}),", the ",e.jsx(n.code,{children:"page-title"})," CSS classes and the ",e.jsx(n.code,{children:"page_title__*"})," variables) until the SDC migration."]}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the page header's properties in real-time. The default story is the heading alone, the way pages and taxonomy term pages render it."}),`
`,e.jsx(s,{of:r}),`
`,e.jsx(t,{of:r}),`
`,e.jsx(n.h2,{id:"post",children:"Post"}),`
`,e.jsx(n.p,{children:"On a post the header sits at content width and shows the byline and date, the estimated read time, and social sharing links. This matches what yalesites-project renders for a post."}),`
`,e.jsx(s,{of:l}),`
`,e.jsx(t,{of:l}),`
`,e.jsx(n.h2,{id:"other-content-types",children:"Other Content Types"}),`
`,e.jsx(n.p,{children:"Events, profiles and resources render their own header components. See them in Molecules/Meta:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"?path=/docs/molecules-meta-event-meta--docs",children:"Event Meta"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"?path=/docs/molecules-meta-profile-meta--docs",children:"Profile Meta"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?path=/docs/molecules-meta-resource-detail--overview",children:"Resource Detail"}),", the header on a full resource page"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?path=/docs/molecules-meta-resource-meta--docs",children:"Resource Meta"}),", the resource header in teaser cards and lists"]}),`
`]}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,p(h,"optional"),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-page-title.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-page-title.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"page-title.js"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Semantic HTML structure with proper heading hierarchy (typically ",e.jsx(n.code,{children:"<h1>"}),")"]}),`
`,e.jsx(n.li,{children:"Author and date metadata properly structured for screen readers"}),`
`,e.jsx(n.li,{children:"Social sharing links are keyboard accessible with clear focus indicators"}),`
`,e.jsx(n.li,{children:"ARIA labels provide context for social media icons"}),`
`,e.jsx(n.li,{children:"Proper color contrast ratios maintained for all text elements"}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Design"}),": The component adapts to viewport size, stacking elements vertically on smaller screens"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Social Links"}),": When enabled, displays social media sharing buttons for platforms like Facebook, Twitter, LinkedIn, and email"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Meta Information"}),": Flexibly displays author bylines and publication dates when provided"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use a clear, descriptive heading that accurately represents the page content (60 characters or less recommended)"}),`
`,e.jsx(n.li,{children:"Include meta information for news articles, blog posts, and time-sensitive content"}),`
`,e.jsx(n.li,{children:"Enable social sharing links on content that benefits from social distribution"}),`
`,e.jsx(n.li,{children:"Keep meta information concise (author name and publication date)"}),`
`,e.jsxs(n.li,{children:["Ensure the heading accurately reflects the page's ",e.jsx(n.code,{children:"<title>"})," tag for consistency"]}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use overly long headings that wrap multiple lines excessively"}),`
`,e.jsx(n.li,{children:"Don't include social links on every page type (use selectively for shareable content)"}),`
`,e.jsx(n.li,{children:"Don't use complex HTML in the meta field (keep formatting simple)"}),`
`,e.jsx(n.li,{children:"Don't enable social links on pages with sensitive or private content"}),`
`,e.jsx(n.li,{children:"Avoid inconsistent formatting in meta information across similar content types"}),`
`]}),`
`,e.jsx(n.h3,{id:"when-to-use-social-links",children:"When to Use Social Links"}),`
`,e.jsx(n.p,{children:"Enable social sharing links for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"News articles and press releases"}),`
`,e.jsx(n.li,{children:"Blog posts and thought leadership content"}),`
`,e.jsx(n.li,{children:"Research publications and findings"}),`
`,e.jsx(n.li,{children:"Event announcements"}),`
`,e.jsx(n.li,{children:"Public-facing content intended for wider distribution"}),`
`]}),`
`,e.jsx(n.p,{children:"Consider omitting social links for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Administrative pages"}),`
`,e.jsx(n.li,{children:"Internal documentation"}),`
`,e.jsx(n.li,{children:"Forms and utility pages"}),`
`,e.jsx(n.li,{children:"Privacy-sensitive content"}),`
`,e.jsx(n.li,{children:"Landing pages with conversion goals"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all page header variations and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/molecules-page-header-visreg--old-blues",children:"Visreg page"}),"."]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Social Links"}),": The social sharing functionality used within this component"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Date Time"}),": Atomic component used for formatting dates in meta information"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Byline"}),": The ",e.jsx(n.a,{href:"?path=/docs/molecules-meta-byline--docs",children:"author and date meta"})," shown on posts"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Read Time"}),": Shown on posts below the byline"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text"}),": For general content layout below the page header"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function k(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{k as default};
//# sourceMappingURL=page-title-D12cjG54.js.map
