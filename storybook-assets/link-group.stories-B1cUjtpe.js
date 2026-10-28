import{Q as i}from"../iframe.js";import{t as a,a as t}from"./component-props-De-d7Djp.js";import{l as r}from"./link-group-CznLtt5V.js";const o={heading:{twigProp:"link_group__heading_one",name:"Heading",type:"string",required:!1,description:"Primary heading displayed above the link group",detail:`Text for the primary heading of the link group. When only one heading is provided, it spans both columns. Maps to the link_group__heading_one Twig variable.
`,control:"text"}},s={title:"Molecules/Link group",tags:["!dev"],argTypes:t(o),args:{...a(o),heading:r.link_group__heading_one},parameters:{docs:{description:{component:"Storybook Definition."}}}},e=({heading:n})=>i({...r,link_group__heading_one:n});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  heading
}) => linkGroupTwig({
  ...linkGroupData,
  link_group__heading_one: heading
})`,...e.parameters?.docs?.source}}};const p=["linkGroup"],_=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:p,default:s,linkGroup:e},Symbol.toStringTag,{value:"Module"}));export{_ as L,o as c,e as l};
//# sourceMappingURL=link-group.stories-B1cUjtpe.js.map
