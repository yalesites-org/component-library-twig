import{u as l,j as e,M as r,C as t}from"./blocks-BudrnkdM.js";import{T as o,a as c}from"./table.stories-CtfL_gkC.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-tOGzy0RN.js";import"./table-WWjoj1ST.js";function i(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:o,name:"Overview"}),`
`,e.jsx(n.h1,{id:"tables",children:"Tables"}),`
`,e.jsx(n.p,{children:"The table component provides accessible, responsive data tables with consistent styling. Tables automatically adapt to different screen sizes and integrate with the design system's theming."}),`
`,e.jsx(n.h2,{id:"interactive-preview",children:"Interactive Preview"}),`
`,e.jsx(n.p,{children:"Use the controls panel below to see how tables adapt to different section themes."}),`
`,e.jsx("div",{className:"sb-contained-canvas",children:e.jsx(t,{of:c})}),`
`,e.jsx(n.h2,{id:"properties",children:"Properties"}),`
`,e.jsx(n.p,{children:"Tables are rendered using standard HTML table markup. The component automatically applies appropriate styling based on the section theme context."}),`
`,e.jsx(n.h3,{id:"structure",children:"Structure"}),`
`,e.jsx(n.p,{children:"Tables should include all semantic HTML elements:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<table>"}),": Container element"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<thead>"}),": Table header section"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<tbody>"}),": Table body section"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<tfoot>"}),": Table footer section (optional)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<tr>"}),": Table rows"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<th>"}),": Header cells"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<td>"}),": Data cells"]}),`
`]}),`
`,e.jsx(n.h2,{id:"table-features",children:"Table Features"}),`
`,e.jsx(n.h3,{id:"responsive-behavior",children:"Responsive Behavior"}),`
`,e.jsx(n.p,{children:"Tables automatically become scrollable on small screens to prevent content from becoming truncated or unreadable."}),`
`,e.jsx(n.h3,{id:"striped-rows",children:"Striped Rows"}),`
`,e.jsx(n.p,{children:"Alternating row colors improve readability for long tables."}),`
`,e.jsx(n.h3,{id:"header-styling",children:"Header Styling"}),`
`,e.jsx(n.p,{children:"Table headers receive distinct styling to clearly separate them from data cells."}),`
`,e.jsx(n.h3,{id:"cell-alignment",children:"Cell Alignment"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Text content: Left-aligned by default"}),`
`,e.jsx(n.li,{children:"Numeric data: Right-aligned for easy comparison"}),`
`,e.jsx(n.li,{children:"Headers: Can be aligned to match cell content"}),`
`]}),`
`,e.jsx(n.h2,{id:"technical-specifications",children:"Technical Specifications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic Level"}),": Atom"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"}),": ",e.jsx(n.code,{children:"example-tables.twig"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styles"}),": ",e.jsx(n.code,{children:"cl-table.scss"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JavaScript"}),": ",e.jsx(n.code,{children:"table.js"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semantic HTML"}),": Uses proper table elements (",e.jsx(n.code,{children:"<table>"}),", ",e.jsx(n.code,{children:"<thead>"}),", ",e.jsx(n.code,{children:"<tbody>"}),", ",e.jsx(n.code,{children:"<th>"}),", ",e.jsx(n.code,{children:"<td>"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Header Association"}),": Column headers use ",e.jsx(n.code,{children:"<th>"})," with scope attributes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Row Headers"}),": Use ",e.jsx(n.code,{children:'<th scope="row">'})," for row headers when applicable"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Caption"}),": Tables should include ",e.jsx(n.code,{children:"<caption>"})," for context"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Summary"}),": Complex tables include summary attribute or description"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": Full keyboard accessibility for scrollable tables"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen Readers"}),": Proper markup allows screen readers to navigate table structure"]}),`
`]}),`
`,e.jsx(n.h3,{id:"responsive-behavior-1",children:"Responsive Behavior"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Small Screens"}),": Tables become horizontally scrollable"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Scroll Indicators"}),": Visual cues show when table extends beyond viewport"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Touch Friendly"}),": Scrolling works smoothly on touch devices"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sticky Headers"}),": Optional sticky header behavior for long tables"]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use tables for tabular data only, not for layout"}),`
`,e.jsx(n.li,{children:"Include a descriptive caption that summarizes table content"}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"<th>"})," for all header cells with appropriate scope attributes"]}),`
`,e.jsx(n.li,{children:"Keep tables simple - avoid nested tables"}),`
`,e.jsx(n.li,{children:"Left-align text, right-align numbers for easy scanning"}),`
`,e.jsx(n.li,{children:"Provide adequate cell padding for readability"}),`
`,e.jsx(n.li,{children:"Sort data in a logical order (alphabetical, chronological, etc.)"}),`
`,e.jsx(n.li,{children:"Highlight important data with bold or background colors"}),`
`,e.jsx(n.li,{children:"For large tables, consider adding filters or search functionality"}),`
`]}),`
`,e.jsx(n.h3,{id:"things-to-avoid",children:"Things to Avoid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Don't use tables for page layout - use CSS Grid or Flexbox"}),`
`,e.jsx(n.li,{children:"Avoid overly wide tables that require excessive horizontal scrolling"}),`
`,e.jsx(n.li,{children:"Don't merge cells unnecessarily - keeps tables accessible"}),`
`,e.jsx(n.li,{children:"Avoid putting too much content in a single cell"}),`
`,e.jsx(n.li,{children:"Don't use color alone to convey meaning"}),`
`,e.jsx(n.li,{children:"Avoid very long tables without pagination or virtual scrolling"}),`
`,e.jsx(n.li,{children:"Don't use tables when a list or other format would be clearer"}),`
`]}),`
`,e.jsx(n.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsx(n.h3,{id:"basic-table-structure",children:"Basic Table Structure"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<table>
  <caption>
    Student Grade Report
  </caption>
  <thead>
    <tr>
      <th scope="col">Student Name</th>
      <th scope="col">Assignment</th>
      <th scope="col">Grade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Jane Smith</th>
      <td>Essay 1</td>
      <td>95</td>
    </tr>
    <tr>
      <th scope="row">John Doe</th>
      <td>Essay 1</td>
      <td>87</td>
    </tr>
  </tbody>
</table>
`})}),`
`,e.jsx(n.h3,{id:"responsive-tables",children:"Responsive Tables"}),`
`,e.jsx(n.p,{children:"For tables with many columns, consider these responsive strategies:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Horizontal Scrolling"}),": Allow table to scroll horizontally (default behavior)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Priority Columns"}),": Show most important columns on mobile, hide others"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Stacked Layout"}),": Transform table rows into cards on mobile (requires custom CSS)"]}),`
`]}),`
`,e.jsx(n.h3,{id:"table-sorting",children:"Table Sorting"}),`
`,e.jsx(n.p,{children:"Add sorting functionality for enhanced usability:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<th scope="col" class="sortable">
  <button type="button" aria-sort="none">Column Name</button>
</th>
`})}),`
`,e.jsx(n.h3,{id:"theming",children:"Theming"}),`
`,e.jsx(n.p,{children:"Tables inherit colors from the section theme context. Cell backgrounds, borders, and text colors automatically adjust to ensure proper contrast."}),`
`,e.jsx(n.h2,{id:"when-to-use-tables",children:"When to Use Tables"}),`
`,e.jsx(n.p,{children:"Tables are appropriate for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Comparing items across multiple dimensions"}),`
`,e.jsx(n.li,{children:"Showing precise numerical data"}),`
`,e.jsx(n.li,{children:"Displaying structured data with clear relationships"}),`
`,e.jsx(n.li,{children:"Financial reports and data analysis"}),`
`,e.jsx(n.li,{children:"Schedules and timetables"}),`
`,e.jsx(n.li,{children:"Product comparison charts"}),`
`]}),`
`,e.jsx(n.h2,{id:"when-not-to-use-tables",children:"When Not to Use Tables"}),`
`,e.jsx(n.p,{children:"Consider alternatives for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Layout purposes (use CSS Grid/Flexbox)"}),`
`,e.jsxs(n.li,{children:["Lists of items (use ",e.jsx(n.code,{children:"<ul>"})," or ",e.jsx(n.code,{children:"<ol>"}),")"]}),`
`,e.jsx(n.li,{children:"Simple key-value pairs (use definition lists)"}),`
`,e.jsx(n.li,{children:"Forms (use proper form elements)"}),`
`,e.jsx(n.li,{children:"Navigation menus (use nav elements)"}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsxs(n.p,{children:["For comprehensive visual regression testing with all table variations and theme combinations, see the ",e.jsx(n.a,{href:"?path=/story/atoms-table-visreg",children:"Visreg page"}),"."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Need help?"})," Refer to the ",e.jsx(n.a,{href:"../../../STORYBOOK-MIGRATION-GUIDE.md",children:"Storybook Migration Guide"})," for more information on the documentation structure."]})]})}function b(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{b as default};
//# sourceMappingURL=tables-DEenlk4U.js.map
