import{A as i,a9 as p}from"../iframe.js";import{w as e}from"./wrapped-callout-vJiYVT9v.js";import{t as c,a as s}from"./component-props-De-d7Djp.js";const o={calloutAlignment:{twigProp:"wrapped_callout__alignment",name:"Callout Position",type:"select",required:!1,description:"Position of the callout box within the content flow",default:"left",options:["left","right"],control:"select",labels:{left:"Left",right:"Right"}},calloutContent:{twigProp:"wrapped_callout__content",name:"Callout Content",type:"string",required:!1,description:"Main body text that flows around the callout (supports HTML)",control:"text"},calloutText:{twigProp:"wrapped_callout__callout",name:"Callout Text",type:"string",required:!1,description:"Highlighted callout text displayed in the callout box (supports HTML)",control:"text"},themeColor:{twigProp:"wrapped_callout__theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Color theme applied to the callout box from the CMS color dial",default:"one",options:["one","two","three","four","five","six"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}}},u={title:"Molecules/Wrapped Callout",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:s(o),args:{...c(o),calloutContent:e.text_two,calloutText:e.text_three}},t=({calloutAlignment:l,calloutContent:a,calloutText:n,themeColor:r})=>`
  ${i({text_field__content:e.text_one,text_field__width:"site",text_field__alignment:"left"})}
  ${p({wrapped_callout__alignment:l,wrapped_callout__content:a,wrapped_callout__callout:n,wrapped_callout__theme:r})}
`;t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  calloutAlignment,
  calloutContent,
  calloutText,
  themeColor
}) => \`
  \${textFieldTwig({
  text_field__content: wrappedCalloutData.text_one,
  text_field__width: 'site',
  text_field__alignment: 'left'
})}
  \${wrappedCalloutTwig({
  wrapped_callout__alignment: calloutAlignment,
  wrapped_callout__content: calloutContent,
  wrapped_callout__callout: calloutText,
  wrapped_callout__theme: themeColor
})}
\``,...t.parameters?.docs?.source}}};const _=["wrappedCallout"],f=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:_,default:u,wrappedCallout:t},Symbol.toStringTag,{value:"Module"}));export{f as W,o as c,t as w};
//# sourceMappingURL=wrapped-callout.stories-DacopK1y.js.map
