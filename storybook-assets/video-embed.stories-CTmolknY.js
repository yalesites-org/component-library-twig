import{C as r}from"../iframe.js";import{v as n}from"./video-embed-DfDFIR6J.js";import{t as d,a as i}from"./component-props-De-d7Djp.js";const o={content:{twigProp:"video_embed__content",name:"Content",type:"string",required:!0,description:`The embedded video markup, typically an iframe. Rendered with the |raw filter so the iframe renders instead of displaying as plain text.
`,control:"text"}},s={title:"Atoms/Videos/Video Embed",tags:["!dev"],argTypes:i(o),args:{...d(o),content:n.video_embed__content},parameters:{docs:{description:{component:"Storybook Definition."}}}},e=({content:t})=>r({video_embed__content:t});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  content
}) => videoEmbedTwig({
  video_embed__content: content
})`,...e.parameters?.docs?.source}}};const a=["videoEmbed"],_=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:a,default:s,videoEmbed:e},Symbol.toStringTag,{value:"Module"}));export{_ as V,o as c,e as v};
//# sourceMappingURL=video-embed.stories-CTmolknY.js.map
