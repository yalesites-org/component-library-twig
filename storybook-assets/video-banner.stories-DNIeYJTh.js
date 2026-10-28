import{af as t}from"../iframe.js";import{t as r,a}from"./component-props-De-d7Djp.js";import{v as i}from"./video-embed-DfDFIR6J.js";const o={width:{twigProp:"video_banner__width",name:"Video Width",type:"select",required:!1,description:"Video width: max (constrained) or full (fluid full-width)",default:"max",options:["max","full"],control:"select",labels:{max:"Contained",full:"Full Width"}}},d={title:"Organisms/Banners/Video Banner",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:a(o),args:r(o)},e=({width:n})=>t({video_banner__content:i.video_embed__content,video_banner__width:n});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  width
}) => videoBannerTwig({
  video_banner__content: videoBannerData.video_embed__content,
  video_banner__width: width
})`,...e.parameters?.docs?.source}}};const s=["VideoBanner"],m=Object.freeze(Object.defineProperty({__proto__:null,VideoBanner:e,__namedExportsOrder:s,default:d},Symbol.toStringTag,{value:"Module"}));export{m as V,e as a,o as c};
//# sourceMappingURL=video-banner.stories-DNIeYJTh.js.map
