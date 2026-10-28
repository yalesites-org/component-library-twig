import{a as t}from"./cl-page-args-BzdE9YLW.js";import{aU as n,aV as g}from"../iframe.js";import{i as e}from"./image-CSdbOboU.js";import{s as p}from"./social-links-BFPxBdAv.js";import{r as l}from"./post-card-Col65Wkc.js";import{t as c,a as d}from"./component-props-De-d7Djp.js";import{a as u}from"./utility-CZwTYLsb.js";import{b as v}from"./yds-layout-Dp4f3bTS.js";import{u as w}from"./utility-nav-cXaVPHEz.js";import{p as f}from"./primary-nav-3-07Xq0g.js";import{b as h}from"./breadcrumbs-Cv5hPcoj.js";import"./yds-read-time-DSMKw0k6.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const _={showSocialMediaSharingLinks:{twigProp:"page_title__show_social_media_sharing_links",name:"Show Social Media Sharing Links",type:"boolean",required:!1,description:"Whether to display social media sharing links on the post article page.",control:"boolean",default:!1}},I={title:"Page Examples/Post",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:{...t,...d(_)},args:{...u(t),...c(_)}},s=a=>{const{pageTitle:r,meta:m,showSocialMediaSharingLinks:o=!1}=a;return n({...v(a),utility_nav__items:w.items,primary_nav__items:f.items,breadcrumbs__items:h.items,page_title__heading:r,page_title__meta:m,page_title__show_social_media_sharing_links:o?"true":"false",...e.responsive_images["16x9"],image__srcset__1:e.responsive_images["4x3"].image__srcset,image__sizes__1:e.responsive_images["4x3"].image__sizes,image__alt__1:e.responsive_images["4x3"].image__alt,image__src__1:e.responsive_images["4x3"].image__src,image__srcset__wrapped:e.responsive_images["3x2"].image__srcset,image__sizes__wrapped:e.responsive_images["3x2"].image__sizes,image__alt__wrapped:e.responsive_images["3x2"].image__alt,image__src__wrapped:e.responsive_images["3x2"].image__src,...p,...l})},i=({allowAnimatedItems:a=localStorage.getItem("yds-cl-twig-animate-items")})=>g({site_animate_components:a});s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle,
    meta,
    showSocialMediaSharingLinks = false
  } = args;
  return postArticleTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: meta,
    page_title__show_social_media_sharing_links: showSocialMediaSharingLinks ? 'true' : 'false',
    ...imageData.responsive_images['16x9'],
    image__srcset__1: imageData.responsive_images['4x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['4x3'].image__sizes,
    image__alt__1: imageData.responsive_images['4x3'].image__alt,
    image__src__1: imageData.responsive_images['4x3'].image__src,
    image__srcset__wrapped: imageData.responsive_images['3x2'].image__srcset,
    image__sizes__wrapped: imageData.responsive_images['3x2'].image__sizes,
    image__alt__wrapped: imageData.responsive_images['3x2'].image__alt,
    image__src__wrapped: imageData.responsive_images['3x2'].image__src,
    ...socialLinksData,
    ...referenceCardData
  });
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`({
  allowAnimatedItems = localStorage.getItem('yds-cl-twig-animate-items')
}) => postGridTwig({
  site_animate_components: allowAnimatedItems
})`,...i.parameters?.docs?.source}}};const N=["PostArticle","postGridCustom"];export{s as PostArticle,N as __namedExportsOrder,I as default,i as postGridCustom};
//# sourceMappingURL=post.stories-Bp1Lzml8.js.map
