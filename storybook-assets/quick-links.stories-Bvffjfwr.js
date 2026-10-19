import{_ as a}from"../iframe.js";import{t as r,a as c}from"./component-props-De-d7Djp.js";import{q as e}from"./quick-links-vBLtUtYH.js";import{i as k}from"./image-CSdbOboU.js";const n={heading:{twigProp:"quick_links__heading",name:"Heading",type:"string",required:!1,description:"Heading text for the quick links component",control:"text"},description:{twigProp:"quick_links__description",name:"Description",type:"string",required:!1,description:"Optional description text displayed below the heading",control:"text"},image:{twigProp:"quick_links__image",name:"With image",type:"boolean",required:!1,description:"Whether to display an image alongside the quick links",default:!0,control:"boolean"}},p={title:"Molecules/Quick-links",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:c(n),args:{...r(n),heading:e.quick_links__heading,description:e.quick_links__description}},i=({heading:s,description:t,image:o})=>a({...e,...k.responsive_images["16x9"],quick_links__heading:s,quick_links__description:t,quick_links__image:o});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`({
  heading,
  description,
  image
}) => quickLinksTwig({
  ...quickLinksData,
  ...imageData.responsive_images['16x9'],
  quick_links__heading: heading,
  quick_links__description: description,
  quick_links__image: image
})`,...i.parameters?.docs?.source}}};const _=["quickLinks"],m=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:_,default:p,quickLinks:i},Symbol.toStringTag,{value:"Module"}));export{m as Q,n as c,i as q};
//# sourceMappingURL=quick-links.stories-Bvffjfwr.js.map
