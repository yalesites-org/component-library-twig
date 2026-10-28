import{Z as r,aN as _,W as n}from"../iframe.js";import{s as o}from"./social-links-BFPxBdAv.js";import{t as l,a as p}from"./component-props-De-d7Djp.js";import"./page-title-DAKJ1SOA.js";import"./yds-read-time-DSMKw0k6.js";const i={meta:{twigProp:"page_title__meta",name:"Meta",type:"string",required:!1,description:"Meta information displayed below the page title (supports HTML)",control:"text"},socialLinks:{twigProp:"page_title__show_social_media_sharing_links",name:"Show Social Media Sharing Links",type:"boolean",required:!1,description:"Whether to display social media sharing links",default:!1,control:"boolean"}},c=`<span>Charlyn Paradis</span>${n({date_time__start:"2022-01-25",date_time__format:"date",date_time__format_override:"format__day__long"})}`,m={title:"Molecules/Page Header",tags:["!dev"],argTypes:p(i),args:l(i),parameters:{docs:{description:{component:"Storybook Definition."}}}},a=({meta:t,socialLinks:s})=>r({page_title__heading:"About the Department",page_title__meta:t,page_title__show_social_media_sharing_links:s?"true":"false",...o}),e=({meta:t,socialLinks:s})=>`<div id="main-content" class="yds-storybook-cl">${_({page_title__heading:"Davis Team Project Wins Award for Research",page_title__meta:t,page_title__show_social_media_sharing_links:s?"true":"false",...o})}</div>`;e.args={meta:c,socialLinks:!0};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  meta,
  socialLinks
}) => pageTitleTwig({
  page_title__heading: 'About the Department',
  page_title__meta: meta,
  page_title__show_social_media_sharing_links: socialLinks ? 'true' : 'false',
  ...socialLinksData
})`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  meta,
  socialLinks
}) => \`<div id="main-content" class="yds-storybook-cl">\${pageTitlePostTwig({
  page_title__heading: 'Davis Team Project Wins Award for Research',
  page_title__meta: meta,
  page_title__show_social_media_sharing_links: socialLinks ? 'true' : 'false',
  ...socialLinksData
})}</div>\``,...e.parameters?.docs?.source}}};const d=["Default","Post"],T=Object.freeze(Object.defineProperty({__proto__:null,Default:a,Post:e,__namedExportsOrder:d,default:m},Symbol.toStringTag,{value:"Module"}));export{a as D,T as P,e as a,i as c};
//# sourceMappingURL=page-title.stories-D5_eRp_W.js.map
