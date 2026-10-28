import{u as c,j as e,M as h,C as a,a as o}from"./blocks-BudrnkdM.js";import{S as d,a as s,c as r}from"./yds-search-result.stories-CaSm3yH-.js";import{t}from"./twig-props-table-Cly28Xba.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./breadcrumbs-qxPR8Frx.js";import"./component-props-De-d7Djp.js";function l(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...c(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(h,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"search-result",children:"Search Result"}),`
`,e.jsx(n.p,{children:"The search result component displays individual search result items with title, teaser text, optional highlighted matches, breadcrumb navigation, and content type indicators. It supports special indicators for restricted CAS (Central Authentication Service) content and adapts to different theme variations."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to experiment with the search result's properties in real-time. The component displays search matches with optional highlighting and provides clear visual hierarchy."}),`
`,e.jsx(a,{of:s}),`
`,e.jsx(o,{of:s}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.h3,{id:"required-properties",children:"Required Properties"}),`
`,t(r,"required"),`
`,e.jsx(n.h3,{id:"optional-properties",children:"Optional Properties"}),`
`,t(r,"optional"),`
`,e.jsx(n.h2,{id:"component-features",children:"Component Features"}),`
`,e.jsx(n.h3,{id:"title-and-link",children:"Title and Link"}),`
`,e.jsx(n.p,{children:"The primary heading displays the page or content title and serves as the clickable link to the full content. This is the most prominent element of the search result."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Best Practice:"})," Titles should be descriptive and accurately reflect the content they link to."]}),`
`,e.jsx(n.h3,{id:"highlighted-search-matches",children:"Highlighted Search Matches"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"search_result__highlighted"})," field shows text excerpts with search terms emphasized using ",e.jsx(n.code,{children:"<strong>"})," tags. This helps users quickly identify where their search terms appear in the content."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"}),' "...showing ',e.jsx(n.strong,{children:"word"}),' in page result..."']}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Display context around search term matches to help users evaluate result relevance."]}),`
`,e.jsx(n.h3,{id:"teaserdescription",children:"Teaser/Description"}),`
`,e.jsx(n.p,{children:"The teaser provides additional context about the content, typically showing meta descriptions or content excerpts."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Help users understand what they'll find if they click through to the full content."]}),`
`,e.jsx(n.h3,{id:"content-type-indicator",children:"Content Type Indicator"}),`
`,e.jsx(n.p,{children:"Content type labels help users understand what kind of content the result represents."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Common Types:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"post (blog posts, news articles)"}),`
`,e.jsx(n.li,{children:"page (standard pages)"}),`
`,e.jsx(n.li,{children:"event (calendar events)"}),`
`,e.jsx(n.li,{children:"person (faculty, staff profiles)"}),`
`,e.jsx(n.li,{children:"resource (downloads, documents)"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Users can filter mentally or scan for specific content types they're seeking."]}),`
`,e.jsx(n.h3,{id:"breadcrumb-navigation",children:"Breadcrumb Navigation"}),`
`,e.jsx(n.p,{children:"Breadcrumbs show the hierarchical path to the content, providing context about content location within the site structure."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example:"})," Home > Academics > Department > Program"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Help users understand content relationships and site structure."]}),`
`,e.jsx(n.h3,{id:"cas-authentication-indicator",children:"CAS Authentication Indicator"}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"is_cas"})," is true, the component displays a lock icon to indicate that the content requires authentication."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Clearly communicate to users which content requires login credentials before they click through."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Visual Indicator:"})," Lock icon prefix"]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Molecule"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"yds-search-result.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"_yds-search-result.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Theme Support"}),": Adapts to section theme variations"]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semantic Headings"}),": Uses appropriate heading level for result titles"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Link Context"}),": Title links include full context for screen readers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA Labels"}),": Icon indicators include descriptive labels"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Visual Hierarchy"}),": Clear structure for scanning and navigation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": All interactive elements are keyboard accessible"]}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior",children:"Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Design"}),": Adapts layout for mobile, tablet, and desktop views"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Theme Awareness"}),": Styling adjusts based on section theme"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Highlighted Text"}),": Search term highlighting uses semantic ",e.jsx(n.code,{children:"<strong>"})," for emphasis"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Truncation"}),": Long text may be truncated with ellipsis for consistent layout"]}),`
`]}),`
`,e.jsx(n.h2,{id:"search-result-anatomy",children:"Search Result Anatomy"}),`
`,e.jsx(n.p,{children:"A complete search result typically includes:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Lock icon"})," (if CAS authentication required)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Content type label"}),' (e.g., "post", "page")']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Title"})," (linked to full content)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Breadcrumb trail"})," (showing content hierarchy)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Highlighted excerpt"})," (showing search term in context)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Teaser/description"})," (providing additional context)"]}),`
`]}),`
`,e.jsx(n.p,{children:"Not all elements are required—the component adapts to available data."}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Always provide clear, descriptive titles that accurately represent content"}),`
`,e.jsx(n.li,{children:"Include teaser text to give users context before clicking"}),`
`,e.jsx(n.li,{children:"Use highlighted excerpts to show search term context when available"}),`
`,e.jsx(n.li,{children:"Display breadcrumbs for content with clear hierarchical relationships"}),`
`,e.jsx(n.li,{children:"Use content type indicators to help users quickly identify result types"}),`
`,e.jsx(n.li,{children:"Clearly mark CAS-restricted content with appropriate icons"}),`
`,e.jsx(n.li,{children:"Maintain consistent result formatting throughout search results pages"}),`
`,e.jsx(n.li,{children:"Order results by relevance when possible"}),`
`,e.jsx(n.li,{children:"Consider showing total result count and current page position"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use clickbait or misleading titles"}),`
`,e.jsx(n.li,{children:"Avoid very long teasers that make results hard to scan"}),`
`,e.jsx(n.li,{children:"Don't show broken or invalid URLs"}),`
`,e.jsx(n.li,{children:"Avoid highlighting that makes text hard to read"}),`
`,e.jsx(n.li,{children:"Don't omit critical information like titles or links"}),`
`,e.jsx(n.li,{children:"Avoid inconsistent content type labeling"}),`
`,e.jsx(n.li,{children:"Don't show CAS indicator without proper authentication handling"}),`
`,e.jsx(n.li,{children:"Avoid cluttering results with unnecessary metadata"}),`
`]}),`
`,e.jsx(n.h2,{id:"common-search-scenarios",children:"Common Search Scenarios"}),`
`,e.jsx(n.h3,{id:"general-site-search",children:"General Site Search"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Configuration:"})," Include all available metadata (title, teaser, content type, breadcrumbs)"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Users searching across all site content need maximum context to evaluate results"]}),`
`,e.jsx(n.h3,{id:"filtered-search-results",children:"Filtered Search Results"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Configuration:"})," Emphasize content type indicators when users filter by type"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," When users have filtered to specific content types, type labels provide confirmation"]}),`
`,e.jsx(n.h3,{id:"authenticated-content-search",children:"Authenticated Content Search"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Configuration:"})," Use CAS indicator for restricted content, clearly separate public from restricted results"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Users need to know which results require authentication before clicking"]}),`
`,e.jsx(n.h3,{id:"academicresearch-search",children:"Academic/Research Search"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Configuration:"})," Include detailed teasers and breadcrumbs showing departmental/organizational hierarchy"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case:"})," Academic users need context about content source and relationships"]}),`
`,e.jsx(n.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(n.h3,{id:"highlighted-text-formatting",children:"Highlighted Text Formatting"}),`
`,e.jsx(n.p,{children:"Search term highlighting should:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"<strong>"})," tags for semantic emphasis"]}),`
`,e.jsx(n.li,{children:"Include sufficient surrounding context (typically 50-100 characters before/after match)"}),`
`,e.jsx(n.li,{children:"Handle multiple matches in the same excerpt"}),`
`,e.jsx(n.li,{children:"Preserve word boundaries for readability"}),`
`,e.jsx(n.li,{children:"Escape HTML in user-generated search terms for security"}),`
`]}),`
`,e.jsx(n.h3,{id:"content-type-configuration",children:"Content Type Configuration"}),`
`,e.jsx(n.p,{children:"Content types should be:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Consistently labeled across the site"}),`
`,e.jsx(n.li,{children:"Lowercase for visual consistency (usually handled in template)"}),`
`,e.jsx(n.li,{children:"Machine-readable while human-friendly"}),`
`,e.jsx(n.li,{children:"Mapped from CMS content types to display labels"}),`
`]}),`
`,e.jsx(n.h3,{id:"breadcrumb-integration",children:"Breadcrumb Integration"}),`
`,e.jsx(n.p,{children:"Breadcrumbs should:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Start with home/root level"}),`
`,e.jsx(n.li,{children:"Show logical hierarchy, not necessarily URL structure"}),`
`,e.jsx(n.li,{children:"Truncate intelligently for very deep hierarchies"}),`
`,e.jsx(n.li,{children:'Use appropriate separators (typically ">")'}),`
`]}),`
`,e.jsx(n.h3,{id:"cas-content-handling",children:"CAS Content Handling"}),`
`,e.jsx(n.p,{children:"For CAS-protected content:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.code,{children:"is_cas: true"})]}),`
`,e.jsxs(n.li,{children:["Include ",e.jsx(n.code,{children:"search_result__prefix__icon: 'lock-solid'"})]}),`
`,e.jsx(n.li,{children:"Consider adding explanatory text in teaser"}),`
`,e.jsx(n.li,{children:"Ensure proper redirect handling on click"}),`
`]}),`
`,e.jsx(n.h2,{id:"performance-considerations",children:"Performance Considerations"}),`
`,e.jsx(n.h3,{id:"search-result-pages",children:"Search Result Pages"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Implement pagination for large result sets (typically 10-20 results per page)"}),`
`,e.jsx(n.li,{children:"Use lazy loading for images within search results"}),`
`,e.jsx(n.li,{children:"Optimize highlighting algorithm for performance with large result sets"}),`
`,e.jsx(n.li,{children:"Cache search results when appropriate"}),`
`,e.jsx(n.li,{children:"Consider faceted search for large content repositories"}),`
`]}),`
`,e.jsx(n.h3,{id:"result-rendering",children:"Result Rendering"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Limit teaser length to improve page load time"}),`
`,e.jsx(n.li,{children:"Use efficient highlighting algorithms"}),`
`,e.jsx(n.li,{children:"Render breadcrumbs efficiently, especially for deep hierarchies"}),`
`,e.jsx(n.li,{children:"Optimize for keyboard and screen reader performance"}),`
`]}),`
`,e.jsx(n.h2,{id:"related-components",children:"Related Components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pager"}),": For navigating multiple pages of search results"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Breadcrumb"}),": Standalone breadcrumb component"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Icon"}),": For content type and status indicators"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Link"}),": For title and URL rendering"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function v(i={}){const{wrapper:n}={...c(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}export{v as default};
//# sourceMappingURL=search-result-Cm1YcX-E.js.map
