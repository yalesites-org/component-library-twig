import{Y as o,V as r}from"../iframe.js";import{s as n}from"./social-links-BFPxBdAv.js";import{t as l,a as p}from"./component-props-De-d7Djp.js";import"./page-title-DAKJ1SOA.js";const a={meta:{twigProp:"page_title__meta",name:"Meta",type:"string",required:!1,description:"Meta information displayed below the page title (supports HTML)",control:"text"},prefix:{twigProp:"page_title__prefix",name:"Page Title Prefix",type:"string",required:!1,description:"Optional prefix text displayed above the heading",control:"text"},socialLinks:{twigProp:"page_title__show_social_media_sharing_links",name:"Show Social Media Sharing Links",type:"boolean",required:!1,description:"Whether to display social media sharing links",default:!1,control:"boolean"}},_=`<span>By Charlyn Paradis</span>${r({date_time__start:"2022-01-25",date_time__format:"date"})}`,g={title:"Molecules/Page Title",tags:["!dev"],argTypes:p(a),args:{...l(a),meta:_},parameters:{docs:{description:{component:"Storybook Definition."}}}},e=({meta:t,prefix:i,socialLinks:s})=>o({page_title__heading:"Davis Team Project Wins Award for Research",page_title__meta:t,page_title__prefix:i,page_title__show_social_media_sharing_links:s?"true":"false",...n});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  meta,
  prefix,
  socialLinks
}) => pageTitleTwig({
  page_title__heading: 'Davis Team Project Wins Award for Research',
  page_title__meta: meta,
  page_title__prefix: prefix,
  page_title__show_social_media_sharing_links: socialLinks ? 'true' : 'false',
  ...socialLinksData
})`,...e.parameters?.docs?.source}}};const c=["PageTitle"],T=Object.freeze(Object.defineProperty({__proto__:null,PageTitle:e,__namedExportsOrder:c,default:g},Symbol.toStringTag,{value:"Module"}));export{T as P,e as a,a as c};
//# sourceMappingURL=page-title.stories-CpwsKp_e.js.map
