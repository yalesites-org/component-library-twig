import{a3 as l,A as o,h as d}from"../iframe.js";import{t as p,a as g}from"./component-props-De-d7Djp.js";import{a as e}from"./alert-6JPGQwlo.js";import"./reset-alerts-B8W4_vxp.js";const i={heading:{twigProp:"alert__heading",name:"Alert Heading",type:"string",required:!1,description:"The main heading text for the alert"},content:{twigProp:"alert__content",name:"Alert Content",type:"string",required:!1,description:"Additional descriptive content (supports HTML)"},linkContent:{twigProp:"alert__link__content",name:"Alert Link Text",type:"string",required:!1,description:"Text for the optional call-to-action link"},type:{twigProp:"alert__type",name:"Alert Type",type:"select",required:!1,description:"Type of alert displayed",detail:`Controls the visual style and semantic meaning of the alert. Use 'emergency' for urgent situations, 'announcement' for important notices, and 'marketing' for promotional content.
`,default:"announcement",options:["announcement","marketing","emergency"],control:"select",labels:{announcement:"Announcement",marketing:"Marketing",emergency:"Emergency"}}},m={title:"Molecules/Site Alert",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:g(i),args:{...p(i),heading:e.alert__heading,content:e.alert__content,linkContent:e.alert__link__content}},s=d({cta__content:"Reset dismissed alerts",cta__attributes:{onClick:"resetAlerts();"},cta__component_theme:"one"}),_=({type:t,heading:n,content:r,linkContent:c})=>`
${l({alert__type:t,alert__heading:n,alert__content:r,alert__link__content:c,alert__link__url:e.alert__link__url,alert__id:"123"})}<br />
${o({text_field__content:s})}`,a=({heading:t,content:n,linkContent:r})=>`
${l({alert__type:"emergency",alert__heading:t,alert__content:n,alert__link__content:r,alert__link__url:e.alert__link__url,alert__id:"234"})}
${l({alert__type:"announcement",alert__heading:t,alert__content:n,alert__link__content:r,alert__link__url:e.alert__link__url,alert__id:"345"})}
${l({alert__type:"marketing",alert__heading:t,alert__content:n,alert__link__content:r,alert__link__url:"#",alert__id:"456"})}<br />
${o({text_field__content:s})}`;_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`({
  type,
  heading,
  content,
  linkContent
}) => \`
\${alertTwig({
  alert__type: type,
  alert__heading: heading,
  alert__content: content,
  alert__link__content: linkContent,
  alert__link__url: alertData.alert__link__url,
  alert__id: '123'
})}<br />
\${textFieldTwig({
  text_field__content: alertResetInstructions
})}\``,..._.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  heading,
  content,
  linkContent
}) => \`
\${alertTwig({
  alert__type: 'emergency',
  alert__heading: heading,
  alert__content: content,
  alert__link__content: linkContent,
  alert__link__url: alertData.alert__link__url,
  alert__id: '234'
})}
\${alertTwig({
  alert__type: 'announcement',
  alert__heading: heading,
  alert__content: content,
  alert__link__content: linkContent,
  alert__link__url: alertData.alert__link__url,
  alert__id: '345'
})}
\${alertTwig({
  alert__type: 'marketing',
  alert__heading: heading,
  alert__content: content,
  alert__link__content: linkContent,
  alert__link__url: '#',
  alert__id: '456'
})}<br />
\${textFieldTwig({
  text_field__content: alertResetInstructions
})}\``,...a.parameters?.docs?.source}}};const u=["Alert","AlertExamples"],T=Object.freeze(Object.defineProperty({__proto__:null,Alert:_,AlertExamples:a,__namedExportsOrder:u,default:m},Symbol.toStringTag,{value:"Module"}));export{T as A,_ as a,a as b,i as c};
//# sourceMappingURL=alert.stories-DCZXXMTY.js.map
