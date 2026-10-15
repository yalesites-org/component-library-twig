import{a as e}from"./cl-page-args-BzdE9YLW.js";import{aA as i}from"../iframe.js";import{i as s}from"./image-CSdbOboU.js";import{t as o}from"./text-with-image-C3X7Zdec.js";import{a as m}from"./accordion-CnJdIhT5.js";import{a as n}from"./alert-6JPGQwlo.js";import{s as p}from"./social-links-BFPxBdAv.js";import{a as c}from"./utility-CZwTYLsb.js";import{b as _}from"./yds-layout-Dp4f3bTS.js";import{u as g}from"./utility-nav-cXaVPHEz.js";import{p as l}from"./primary-nav-3-07Xq0g.js";import{b as u}from"./breadcrumbs-Cv5hPcoj.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const E={title:"Page Examples/Miscellaneous",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:e,args:c(e)},a=t=>{const{pageTitle:r}=t;return i({..._(t),utility_nav__items:g.items,primary_nav__items:l.items,breadcrumbs__items:u.items,page_title__heading:r,page_title__meta:null,...s.responsive_images["16x9"],...o,...m,...n,...p})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle
  } = args;
  return accordionPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['16x9'],
    ...textWithImageData,
    ...accordionData,
    ...alertData,
    ...socialLinksData
  });
}`,...a.parameters?.docs?.source}}};const I=["AccordionPage"];export{a as AccordionPage,I as __namedExportsOrder,E as default};
//# sourceMappingURL=miscellaneous-page.stories-CnOaqprD.js.map
