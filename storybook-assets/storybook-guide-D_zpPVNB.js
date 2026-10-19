import{u as i,j as e,M as r}from"./blocks-C3MhvIPG.js";import"./preload-helper-PPVm8Dsz.js";import"../iframe.js";import"./_commonjsHelpers-DaWZu8wl.js";import"./index-C11766dU.js";function t(s){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Introduction/Storybook Guide"}),`
`,e.jsx(n.h1,{id:"storybook-guide",children:"Storybook Guide"}),`
`,e.jsx(n.p,{children:"This guide covers how the YaleSites design system Storybook is organized, what the conventions are, and what you need to do when adding or updating components."}),`
`,e.jsx(n.h2,{id:"who-this-is-for",children:"Who This Is For"}),`
`,e.jsx(n.p,{children:"This Storybook serves three audiences:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"YaleSites developers"})," — the primary audience. Use this as the source of truth for component behavior, design options, and documentation conventions when building or maintaining the design system."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"External developers"})," — contributors or teams building on top of the YaleSites design system. Use this to understand how components work, what options are available, and how to contribute back correctly."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Yale brand reference"})," — designers, communicators, and Yale staff who need to understand what the YaleSites visual language looks like. The token and color sections in particular document Yale's web brand."]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"how-the-sidebar-is-organized",children:"How the Sidebar Is Organized"}),`
`,e.jsx(n.p,{children:"The sidebar follows an atomic design hierarchy:"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"How the Sidebar Is Organized",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Section"}),e.jsx("th",{children:"What lives here"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Introduction"})}),e.jsx("td",{children:"Orientation pages — Welcome, Theme System, this guide"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Tokens"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Design tokens: color palettes, typography, spacing, effects,
breakpoints`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Atoms"})}),e.jsx("td",{children:e.jsx(n.p,{children:`The smallest building blocks: buttons, images, dividers, lists,
typography, read time, link skip`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Molecules"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Components composed of atoms: callouts, cards, meta types, quotes,
modals`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Organisms"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Full page sections composed of molecules: banners, content spotlights,
tabs, header, footer, calendar, card collections`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Templates"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Structural scaffolding with no visual identity of their own: block
wrapper, component wrapper, layout, page layouts`})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Page Examples"})}),e.jsx("td",{children:"Real-world page examples for reference"})]})]})]})}),`
`,e.jsx(n.p,{children:"When adding a new component, place it in the tier that matches its complexity and purpose:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A single UI element with no moving parts is an ",e.jsx(n.strong,{children:"atom"}),"."]}),`
`,e.jsxs(n.li,{children:["A component made of atoms working together to form a meaningful UI unit is a ",e.jsx(n.strong,{children:"molecule"}),"."]}),`
`,e.jsxs(n.li,{children:["A self-contained page section composed of molecules — something that spans significant width or has its own structural presence — is an ",e.jsx(n.strong,{children:"organism"}),"."]}),`
`,e.jsxs(n.li,{children:["A layout shell or Drupal wiring component with no visual identity of its own is a ",e.jsx(n.strong,{children:"template"}),"."]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"story-files-vs-mdx-pages",children:"Story Files vs. MDX Pages"}),`
`,e.jsx(n.p,{children:"Every component can have two types of documentation:"}),`
`,e.jsxs(n.h3,{id:"story-files-storiesjs",children:["Story files (",e.jsx(n.code,{children:"*.stories.js"}),")"]}),`
`,e.jsx(n.p,{children:"Story files define the interactive previews. They export named stories that Storybook renders in Canvas blocks. Use story files to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Define ",e.jsx(n.code,{children:"argTypes"})," and ",e.jsx(n.code,{children:"args"})," for interactive controls"]}),`
`,e.jsxs(n.li,{children:["Export named variants of a component (e.g. ",e.jsx(n.code,{children:"Default"}),", ",e.jsx(n.code,{children:"WithImage"}),", ",e.jsx(n.code,{children:"DarkTheme"}),")"]}),`
`,e.jsxs(n.li,{children:["Set up visual regression exports (see ",e.jsx(n.a,{href:"#visreg-stories",children:"Visreg Stories"})," below)"]}),`
`]}),`
`,e.jsxs(n.h3,{id:"mdx-pages-mdx",children:["MDX pages (",e.jsx(n.code,{children:"*.mdx"}),")"]}),`
`,e.jsx(n.p,{children:"MDX pages are the documentation layer. They wrap stories with written context. Use MDX pages to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Explain what a component is and when to use it"}),`
`,e.jsx(n.li,{children:"Document design decisions, constraints, and accessibility notes"}),`
`,e.jsx(n.li,{children:"Embed Canvas blocks for component previews"}),`
`,e.jsx(n.li,{children:"Reference related components or token pages"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Every component should have both."})," The story file handles interactivity; the MDX page handles explanation."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"the-canvas-rule",children:"The Canvas Rule"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Canvas blocks are for front-end component previews only. All explanatory text, headings, tables, and reference content belong in MDX."})}),`
`]}),`
`,e.jsx(n.p,{children:"This is the most important convention in this Storybook."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Do this:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`## Position Variations

The divider supports left and center positions, shown below at 50% width.

<Canvas of={DividerStories.DividersPosition} />
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Not this (text baked into the story):"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`export const DividersPosition = () => \`
  <h2>Position Variations</h2>
  <p>The divider supports left and center positions...</p>
  \${dividerTwig(...)}
\`;
`})}),`
`,e.jsxs(n.p,{children:["When story exports contain ",e.jsx(n.code,{children:"<h2>"}),", ",e.jsx(n.code,{children:"<p>"}),", or other document-level text, that text should be moved into the MDX page and the Canvas should contain only the rendered component."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"canvas-width",children:"Canvas Width"}),`
`,e.jsxs(n.p,{children:["By default, Canvas blocks render at a wide width suitable for full-bleed components. For smaller, self-contained components, wrap the Canvas in ",e.jsx(n.code,{children:"sb-contained-canvas"})," to constrain it:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`<div className="sb-contained-canvas">
  <Canvas of={ComponentStories.Default} />
</div>
`})}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"sb-contained-canvas"})," for: atoms, small molecules, reference tables, token swatches."]}),`
`,e.jsx(n.p,{children:"Use the default wide canvas for: banners, full-width layouts, organisms, any component that needs horizontal space to read correctly."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"tags",children:"Tags"}),`
`,e.jsx(n.p,{children:"Tags control how stories appear in the sidebar and which tooling picks them up."}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Tags",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tag"}),e.jsx("th",{children:"What it does"}),e.jsx("th",{children:"When to use it"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"'!dev'"})}),e.jsx("td",{children:"Hides the story from the sidebar"}),e.jsx("td",{children:e.jsx(n.p,{children:"Apply to any story whose content is fully covered by an MDX docs page"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"'visreg'"})}),e.jsx("td",{children:e.jsx(n.p,{children:`Marks the story for visual regression testing; hidden by default,
shown via the Visreg toolbar toggle`})}),e.jsx("td",{children:e.jsxs(n.p,{children:["Apply to all ",e.jsx("code",{children:"*.visreg.stories.js"})," exports"]})})]})]})]})}),`
`,e.jsx(n.p,{children:"Apply tags after the export:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`export const MyStory = () => myTwig(data);
MyStory.tags = ['!dev'];
`})}),`
`,e.jsx(n.p,{children:"Or at the default export level to apply to all stories in the file:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`export default {
  title: 'Atoms/MyComponent',
  tags: ['!dev'],
};
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"naming-and-sidebar-order",children:"Naming and Sidebar Order"}),`
`,e.jsxs(n.p,{children:["Story titles follow the pattern ",e.jsx(n.code,{children:"Tier/ComponentName"})," or ",e.jsx(n.code,{children:"Tier/Group/ComponentName"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`export default {
  title: 'Molecules/Banner/Action Banner',
};
`})}),`
`,e.jsxs(n.p,{children:["Sections and components are ordered alphabetically by default, while the stories inside one component keep the order they are exported in, and a component's docs page comes first. To override any of that, add an entry to ",e.jsx(n.code,{children:"ORDER_TREE"})," in ",e.jsx(n.code,{children:"config/emulsify-core/storybook/story-sort.mjs"}),". Each key is a title segment and its ",e.jsx(n.code,{children:"__order"})," lists what should come first:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`{
  __order: ['FirstSection', 'SecondSection'],
  FirstSection: {
    __order: ['FirstChild'],
  },
}
`})}),`
`,e.jsxs(n.p,{children:["The live tree is in that file — read it there rather than from a copy here. It has two consumers, the ",e.jsx(n.code,{children:"storySort"})," parameter in the preview and ",e.jsx(n.code,{children:"scripts/sort-storybook-index.mjs"})," (which re-sorts ",e.jsx(n.code,{children:".out/index.json"})," after a static build), so one edit covers both."]}),`
`,e.jsxs(n.p,{children:["MDX pages that are standalone (not tied to a stories file) use ",e.jsx(n.code,{children:'<Meta title="..." />'}),". MDX pages that are attached to a stories file use ",e.jsx(n.code,{children:'<Meta of={StoriesObject} name="Overview" />'})," — the ",e.jsx(n.code,{children:"name"})," field sets the tab label in the sidebar. Always use ",e.jsx(n.code,{children:'name="Overview"'})," rather than ",e.jsx(n.code,{children:'name="Docs"'}),"."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"the-theme-system-in-storybook",children:"The Theme System in Storybook"}),`
`,e.jsx(n.p,{children:"The toolbar at the top of Storybook has two controls that affect how components render:"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Site: Global Theme (lever)"})," — switches the active color palette site-wide. All components in the Canvas update to reflect the selected theme. When building or reviewing a component, check it in multiple global themes to make sure it responds correctly."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Visreg toggle"})," — shows or hides visual regression stories in the sidebar (hidden by default). Use this when you need to review or update visreg exports."]}),`
`,e.jsxs(n.p,{children:["Both controls persist across page navigation via ",e.jsx(n.code,{children:"localStorage"}),"."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"visreg-stories",children:"Visreg Stories"}),`
`,e.jsxs(n.p,{children:["Visual regression stories (",e.jsx(n.code,{children:"*.visreg.stories.js"}),") are a snapshot reference for QA during releases. They render fixed, non-interactive versions of components in their key states and variants so changes can be visually diffed."]}),`
`,e.jsx(n.h3,{id:"when-you-must-add-a-visreg-story",children:"When you must add a visreg story"}),`
`,e.jsx(n.p,{children:"Add or update a visreg story whenever you:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Add a new component"})," — create a ",e.jsx(n.code,{children:"component-name.visreg.stories.js"})," file with all meaningful variants"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Add a new design option or color"})," — add the new option as a story export in the existing visreg file"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Add a new layout variation or modifier"})," — add it to the visreg file"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Change the visual output of an existing story"})," — update the visreg export to match"]}),`
`]}),`
`,e.jsx(n.p,{children:"If a new design option ships without a visreg story, it won't be caught during release QA. Every variation that can appear on a live site should have a corresponding visreg entry."}),`
`,e.jsx(n.h3,{id:"visreg-story-conventions",children:"Visreg story conventions"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// component-name.visreg.stories.js
export default {
  title: 'Atoms/MyComponent',
  tags: ['visreg'],
};

export const Default = () => myTwig({ ...defaultData });
export const WithDarkBackground = () =>
  myTwig({ ...defaultData, theme: 'one' });
`})}),`
`,e.jsxs(n.p,{children:["Tag the default export with ",e.jsx(n.code,{children:"'visreg'"})," — not ",e.jsx(n.code,{children:"'!dev'"}),". This keeps them hidden from the regular sidebar but visible when the Visreg toggle is on."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"adding-a-new-component",children:"Adding a New Component"}),`
`,e.jsx(n.h3,{id:"1-choose-the-right-tier",children:"1. Choose the right tier"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atom"})," — a single, indivisible UI element (button, icon, divider, heading, read time)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Molecule"})," — a component made of atoms working together (callout, card, meta types, modal)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Organism"})," — a self-contained page section with significant structural presence (banner, content spotlight, tabs, site header, footer, card collection)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Template"})," — a layout shell or Drupal wiring component with no visual identity of its own (block wrapper, component wrapper, layout)"]}),`
`]}),`
`,e.jsx(n.h3,{id:"2-create-the-required-files",children:"2. Create the required files"}),`
`,e.jsx(n.p,{children:"At minimum, a new component needs:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`components/[tier]/[component-name]/
  yds-[component-name].twig            ← Twig template
  _yds-[component-name].scss           ← Styles
  [component-name].stories.js          ← Story file with interactive controls
  [component-name].mdx                 ← Docs page
  [component-name].visreg.stories.js   ← Visual regression stories
`})}),`
`,e.jsxs(n.p,{children:["Where ",e.jsx(n.code,{children:"[tier]"})," is one of: ",e.jsx(n.code,{children:"01-atoms"}),", ",e.jsx(n.code,{children:"02-molecules"}),", ",e.jsx(n.code,{children:"03-organisms"}),", ",e.jsx(n.code,{children:"04-page-layouts"})," (for templates)."]}),`
`,e.jsx(n.h3,{id:"3-minimum-viable-mdx-page",children:"3. Minimum viable MDX page"}),`
`,e.jsx(n.p,{children:"Every component docs page should cover:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"What it is"})," — one or two sentences describing the component and its purpose"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interactive Preview"})," — a Canvas block with Controls so developers can explore it"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"When to use it"})," — guidance on appropriate use cases"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Design options"})," — document every dial, slot, or theme option available"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility notes"})," — any constraints or requirements specific to this component"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`# Component Name

Brief description of what this component does and when to use it.

## Interactive Preview

<Canvas of={ComponentStories.Default} />
<Controls of={ComponentStories.Default} />

## Design Options

Document available theme dials, layout variants, etc.

## Accessibility

Any accessibility requirements or constraints.
`})}),`
`,e.jsx(n.h3,{id:"4-add-to-the-theming-reference",children:"4. Add to the Theming Reference"}),`
`,e.jsxs(n.p,{children:["If the new component supports color theming (a dial or slot), add it to the ",e.jsx(n.a,{href:"?path=/docs/tokens-colors-theming-reference--docs",children:"Theming Reference"})," table."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"quick-reference",children:"Quick Reference"}),`
`,e.jsx("div",{className:"sb-table-scroll",role:"region","aria-label":"Quick Reference",tabIndex:0,children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Rule"}),e.jsx("th",{children:"Detail"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Canvas = component previews only"}),e.jsx("td",{children:"Move all text, headings, and tables to MDX"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Wide canvas by default"}),e.jsx("td",{children:e.jsxs(n.p,{children:["Use ",e.jsx("code",{children:"sb-contained-canvas"})," for small/contained components"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs(n.p,{children:["Tag ",e.jsx("code",{children:"!dev"})," when MDX covers the story"]})}),e.jsx("td",{children:"Hides raw story from sidebar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs(n.p,{children:["Tag ",e.jsx("code",{children:"visreg"})," for regression stories"]})}),e.jsx("td",{children:"Keeps them hidden unless toggled on"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"New option or variation = new visreg entry"}),e.jsx("td",{children:"Required for release QA coverage"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"All component tiers need a visreg file"}),e.jsx("td",{children:"Atoms, molecules, organisms, and templates alike"})]})]})]})})]})}function h(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{h as default};
//# sourceMappingURL=storybook-guide-D_zpPVNB.js.map
