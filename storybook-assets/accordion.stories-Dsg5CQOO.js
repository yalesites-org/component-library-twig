import{E as r}from"../iframe.js";import{a as e}from"./accordion-CnJdIhT5.js";import{t as d,a as _}from"./component-props-De-d7Djp.js";import"./yds-accordion-B9t65mH8.js";const n={accordionItems:{twigProp:"accordion__items",name:"Accordion Items",type:"array",required:!0,description:"Array of accordion items, each containing a heading and content",detail:`Array of objects passed to the Twig template. Each item requires accordion__item__heading and accordion__item__content. This prop is constructed in the story's render function and is not directly editable via the Controls panel.
`},heading:{twigProp:"accordion__item__heading",name:"Heading",type:"string",required:!0,description:"Heading text for each accordion item",detail:"The heading text displayed on the clickable accordion toggle for each item.",control:"text"},content:{twigProp:"accordion__item__content",name:"Content",type:"string",required:!0,description:"Body content for each accordion item (supports HTML)",detail:`The content revealed when an accordion item is expanded. Supports full HTML markup including links, lists, and formatted text.
`,control:"text"},accordionHeading:{twigProp:"accordion__heading",name:"Accordion Heading",type:"string",required:!1,description:"Optional heading displayed above all accordion items",detail:`Displays as a heading above the full accordion group. Leave empty to show items without a group heading.
`,control:"text"},themeColor:{twigProp:"accordion__theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Color accent from the CMS color dial",detail:`Applies a color theme to the accordion component. The theme affects the visual styling of accordion items, including hover states and active item indicators. Use the accordion__theme Twig property to apply different themes.
`,default:"default",options:["default","one","two","three","four","five","six"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}}},s={title:"Molecules/Accordion",tags:["!dev"],argTypes:_(n),args:{...d(n),heading:e.accordion__item__heading,content:e.accordion__item__content,accordionHeading:e.accordion__heading}},o=({accordionHeading:t,heading:i,content:c,themeColor:a})=>`
  ${r({accordion__theme:a,accordion__heading:t,accordion__items:[{accordion__item__heading:i,accordion__item__content:c},{accordion__item__heading:e.accordion__item__heading,accordion__item__content:e.accordion__item__content},{accordion__item__heading:e.accordion__item__heading,accordion__item__content:e.accordion__item__content}]})}
`;o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  accordionHeading,
  heading,
  content,
  themeColor
}) => \`
  \${accordionTwig({
  accordion__theme: themeColor,
  accordion__heading: accordionHeading,
  accordion__items: [{
    accordion__item__heading: heading,
    accordion__item__content: content
  }, {
    accordion__item__heading: accordionData.accordion__item__heading,
    accordion__item__content: accordionData.accordion__item__content
  }, {
    accordion__item__heading: accordionData.accordion__item__heading,
    accordion__item__content: accordionData.accordion__item__content
  }]
})}
\``,...o.parameters?.docs?.source}}};const m=["Accordion"],u=Object.freeze(Object.defineProperty({__proto__:null,Accordion:o,__namedExportsOrder:m,default:s},Symbol.toStringTag,{value:"Module"}));export{u as A,o as a,n as c};
//# sourceMappingURL=accordion.stories-Dsg5CQOO.js.map
