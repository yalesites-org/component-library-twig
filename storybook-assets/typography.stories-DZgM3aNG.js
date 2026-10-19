import{A as n}from"../iframe.js";import{t as i}from"./text-field-C6YFoNit.js";import{t as s,a as c}from"./component-props-De-d7Djp.js";import"./yds-text-D8RbkL0N.js";const o={content:{twigProp:"text_field__content",name:"Content",type:"string",required:!0,description:"HTML content containing the formatted text to display",control:"text"},variation:{twigProp:"text_field__variation",name:"Text Style Variation",type:"select",required:!1,description:"Visual variation: 'default' or 'emphasized' (for increased prominence)",default:"default",options:["default","emphasized"],control:"select",labels:{default:"Default",emphasized:"Emphasized"}}},d={title:"Atoms/Text",tags:["!dev"],argTypes:c(o),args:{...s(o),content:i.text_field__content},parameters:{docs:{description:{component:"Storybook Definition."}}}},t=({content:r,variation:a})=>`
  ${n({text_field__content:r,text_field__variation:a})}
`,e=t;t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  content,
  variation
}) => \`
  \${textFieldTwig({
  text_field__content: content,
  text_field__variation: variation
})}
\``,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"TextField",...e.parameters?.docs?.source}}};const p=["TextField","Interactive"],u=Object.freeze(Object.defineProperty({__proto__:null,Interactive:e,TextField:t,__namedExportsOrder:p,default:d},Symbol.toStringTag,{value:"Module"}));export{u as T,t as a,o as c};
//# sourceMappingURL=typography.stories-DZgM3aNG.js.map
