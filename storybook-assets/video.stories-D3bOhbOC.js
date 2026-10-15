import{a7 as r}from"../iframe.js";import{v as i}from"./video-khdXQuHI.js";import{t as s,a as _}from"./component-props-De-d7Djp.js";const d={heading:{twigProp:"video__heading",name:"Heading",type:"string",required:!1,description:"Optional heading or title displayed above the video",control:"text"},text:{twigProp:"video__text",name:"Text",type:"string",required:!1,description:"Optional caption or description text displayed with the video",control:"text"},placement:{twigProp:"video__alignment",name:"Alignment",type:"select",required:!1,description:"Alignment of the video within its container",default:"left",options:["left","center"],control:"select",labels:{left:"Left",center:"Center"}}},c={title:"Molecules/Video",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:_(d),args:{...s(d),heading:i.video__heading,text:i.video__text}},e=({heading:o,text:n,placement:a})=>r({...i,video__heading:o,video__text:n,video__alignment:a,video__width:"site"}),t=({heading:o,text:n,placement:a})=>r({...i,video__heading:o,video__text:n,video__alignment:a,video__width:"site"});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  heading,
  text,
  placement
}) => videoTwig({
  ...videoData,
  video__heading: heading,
  video__text: text,
  video__alignment: placement,
  video__width: 'site'
})`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  heading,
  text,
  placement
}) => videoTwig({
  ...videoData,
  video__heading: heading,
  video__text: text,
  video__alignment: placement,
  video__width: 'site'
})`,...t.parameters?.docs?.source}}};const l=["Interactive","video"],m=Object.freeze(Object.defineProperty({__proto__:null,Interactive:e,__namedExportsOrder:l,default:c,video:t},Symbol.toStringTag,{value:"Module"}));export{e as I,m as V,d as c};
//# sourceMappingURL=video.stories-D3bOhbOC.js.map
