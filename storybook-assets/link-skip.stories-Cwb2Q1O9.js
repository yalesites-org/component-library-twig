import{u as a}from"../iframe.js";import{l as s}from"./link-skip-DZv-NrtM.js";import{t as l,a as p}from"./component-props-De-d7Djp.js";const e={content:{twigProp:"link_skip__content",name:"Content",type:"string",required:!0,description:"The text content displayed in the skip link",control:"text"},url:{twigProp:"link_skip__url",name:"URL",type:"string",required:!0,description:"The target anchor link (typically '#main-content' or similar)",control:"text"},baseClass:{twigProp:"link_skip__base_class",name:"Base Class",type:"string",required:!1,description:"Base CSS class for the component",default:"link-skip",control:"text"},extraClass:{twigProp:"link_skip__extra_class",name:"Extra Class",type:"string",required:!1,description:"Additional CSS classes for custom styling",control:"text"}},_={title:"Atoms/Link Skip",tags:["!dev"],argTypes:p(e),args:{...l(e),content:s.link_skip__content,url:s.link_skip__url},parameters:{docs:{description:{component:"Storybook Definition."}}}},t=({content:n,url:i,baseClass:r,extraClass:o})=>a({link_skip__content:n,link_skip__url:i,link_skip__base_class:r,link_skip__extra_class:o});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  content,
  url,
  baseClass,
  extraClass
}) => linkSkipTwig({
  link_skip__content: content,
  link_skip__url: url,
  link_skip__base_class: baseClass,
  link_skip__extra_class: extraClass
})`,...t.parameters?.docs?.source}}};const k=["LinkSkip"],u=Object.freeze(Object.defineProperty({__proto__:null,LinkSkip:t,__namedExportsOrder:k,default:_},Symbol.toStringTag,{value:"Module"}));export{u as L,t as a,e as c};
//# sourceMappingURL=link-skip.stories-Cwb2Q1O9.js.map
