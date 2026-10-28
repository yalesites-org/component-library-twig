import{a6 as n}from"../iframe.js";import{t as e}from"./taxonomy-display-BfNjo-BL.js";import{t as i,a as m}from"./component-props-De-d7Djp.js";const t={componentTheme:{twigProp:"taxonomy_display__theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Component theme from the color dial in CMS",default:"default",options:["default","one","two","three","four","five","six"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},showTaxonomy:{name:"Show Taxonomy",type:"boolean",required:!1,description:"Toggle to show or hide taxonomy items in the preview",detail:`Storybook-only control. When false, passes an empty items array to the Twig template. The Twig prop is taxonomy_display__items (array).
`,default:!0,control:"boolean"}},r={title:"Molecules/Taxonomy Display",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:m(t),args:i(t)},o=({componentTheme:a,showTaxonomy:s})=>n({taxonomy_display__theme:a,taxonomy_display__items:s?e.taxonomy_display__items:e.taxonomy_display__empty_items});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  componentTheme,
  showTaxonomy
}) => taxonomyDisplayTwig({
  taxonomy_display__theme: componentTheme,
  taxonomy_display__items: showTaxonomy ? taxonomyDisplayData.taxonomy_display__items : taxonomyDisplayData.taxonomy_display__empty_items
})`,...o.parameters?.docs?.source}}};const y=["TaxonomyDisplay"],d=Object.freeze(Object.defineProperty({__proto__:null,TaxonomyDisplay:o,__namedExportsOrder:y,default:r},Symbol.toStringTag,{value:"Module"}));export{d as T,o as a,t as c};
//# sourceMappingURL=taxonomy-display.stories-DjSMgI8v.js.map
