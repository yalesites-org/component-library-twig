import{aZ as I,a_ as z,a$ as O,b0 as Q,b1 as G,b2 as A,t as E}from"../iframe.js";import{a as P}from"./cl-page-args-BzdE9YLW.js";import{t as j,a as U}from"./component-props-De-d7Djp.js";import{a as Z}from"./utility-CZwTYLsb.js";import{b as r}from"./yds-layout-Dp4f3bTS.js";import{u as o}from"./utility-nav-cXaVPHEz.js";import{p as s}from"./primary-nav-3-07Xq0g.js";import{b as _}from"./breadcrumbs-Cv5hPcoj.js";import{i as l}from"./image-CSdbOboU.js";import{t as m}from"./text-with-image-C3X7Zdec.js";import{b as v}from"./banner-CWi5B0T_.js";import{g as $}from"./grand-hero-BEoD7F60.js";import{r as c}from"./post-card-Col65Wkc.js";import{c as F}from"./custom-card-ChKUw6IK.js";import{s as d}from"./social-links-BFPxBdAv.js";import{q as f}from"./quick-links-vBLtUtYH.js";import{v as D}from"./video-khdXQuHI.js";import{a as J}from"./accordion-CnJdIhT5.js";import{t as K}from"./tabs-Dl0Hirov.js";import{m as M}from"./media-grid-XjaELNhJ.js";import{c as R}from"./content-spotlight-portrait-vcAuUMC2.js";import{s as X}from"./yds-secondary-nav-C0lFKjnN.js";import"./yds-breadcrumbs-BB4Ppsuz.js";import"./yds-site-in-this-section-5Rlc7puJ.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const L={introContent:{twigProp:"intro_content",name:"Intro Content",type:"select",required:!1,description:"The type of introductory content to display above the main page body.",control:"select",options:["none","image","wrapped-image","text-with-image--focus-image","text-with-image--focus-equal","collection-featured","collection-secondary"],default:"none"},calloutBackground:{twigProp:"callout__background_color",name:"Callout Theme (dial)",type:"select",required:!1,description:"The background color theme applied to callout components on the page.",control:"select",options:["one","two","three"]},pageTitleDisplay:{twigProp:"page_title__display",name:"Page Title Display",type:"select",required:!1,description:"Controls the visibility of the page title.",control:"select",options:["visible","hidden","visually-hidden"]},bannerType:{twigProp:"banner_type",name:"Banner Type",type:"select",required:!1,description:"The type of banner component to display at the top of the page.",control:"select",options:["action","grand-hero"]},contentLayout:{twigProp:"banner__content__layout",name:"Banner Content Layout",type:"select",required:!1,description:"The layout position of the banner content overlay.",control:"select",options:["bottom","left","right"],default:"bottom"},bgColor:{twigProp:"banner__content__background",name:"Banner Content Background Color Theme (dial)",type:"select",required:!1,description:"Color theme for the banner content area background",detail:`Color theme applied to the banner content background. Options are dynamically derived from the design system tokens. Uses the same token-driven color pairings as other component theme selectors.
`,default:"one",control:"select"},heading:{twigProp:"banner__heading",name:"Banner Heading",type:"string",required:!1,description:"The heading text displayed within the banner or grand hero component.",control:"text"},snippet:{twigProp:"banner__snippet",name:"Banner Snippet",type:"string",required:!1,description:"The snippet or body text displayed within the banner component.",control:"text"},linkContent:{twigProp:"banner__link__content",name:"Banner Link Content",type:"string",required:!1,description:"The text label for the banner call-to-action link.",control:"text"},linkStyle:{twigProp:"banner__link__style",name:"Link Style",type:"select",required:!1,description:"The visual style applied to the banner call-to-action link.",control:"select",options:["cta","text-link"]},grandHeroOverlayVariation:{twigProp:"grand_hero__overlay_variation",name:"Grand Hero Content Overlay",type:"select",required:!1,description:"The overlay variation for the grand hero content area.",control:"select",options:["contained","full"],default:"contained"},grandHeroSize:{twigProp:"grand_hero__size",name:"Grand Hero Content Size",type:"select",required:!1,description:"The size of the grand hero component.",control:"select",options:["reduced","full"],default:"full"},grandHeroWithVideo:{twigProp:"grand_hero__video",name:"Grand Hero With Video",type:"boolean",required:!1,description:"Whether to display a video background within the grand hero component.",control:"boolean"},videoHeading:{twigProp:"video__heading",name:"Video Heading",type:"string",required:!1,description:"The heading text displayed above the video component.",control:"text"},videoCaption:{twigProp:"video__text",name:"Video Caption",type:"string",required:!1,description:"The caption or description text displayed below the video component.",control:"text"},quickLinksHeading:{twigProp:"quick_links__heading",name:"Quick Links Heading",type:"string",required:!1,description:"The heading text for the quick links component.",control:"text"},quickLinksDescription:{twigProp:"quick_links__description",name:"Quick Links Description",type:"string",required:!1,description:"The description text displayed beneath the quick links heading.",control:"text"},quickLinksImage:{twigProp:"quick_links__image",name:"With image",type:"boolean",required:!1,description:"Whether to display an image alongside the quick links component.",control:"boolean"},quickLinksVariation:{twigProp:"quick_links__variation",name:"Quick Links Variation",type:"select",required:!1,description:"The visual variation of the quick links component.",control:"select",options:["promotional","subtle"],default:"promotional"}},Y=Object.keys(E["component-themes"]),T=U(L);T.bgColor={...T.bgColor,options:Y};const Pe={title:"Page Examples/Standard Pages",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:{...P,...T},args:{...Z(P),...j(L),calloutBackground:"one",pageTitleDisplay:"visible"}},k=e=>{const{pageTitle:t,pageTitleDisplay:n,introContent:a,calloutBackground:i}=e;return I({...r(e),utility_nav__items:o.items,primary_nav__items:s.items,breadcrumbs__items:_.items,page_title__heading:t,page_title__meta:null,page_title__display:n,page_title__additional_classes:[n],intro_content:a,callout__background_color:i,...m,...c,...d,...l.responsive_images["4x3"]})},h=e=>{const{pageTitle:t,introContent:n,calloutBackground:a}=e;return z({...r(e),utility_nav__items:o.items,primary_nav__items:s.items,breadcrumbs__items:_.items,page_title__heading:t,page_title__meta:null,...l.responsive_images["4x3"],intro_content:n,callout__background_color:a,...m,...c,...d,...X})},b=e=>{const{pageTitle:t,calloutBackground:n}=e;return O({...r(e),utility_nav__items:o.items,primary_nav__items:s.items,breadcrumbs__items:_.items,page_title__heading:t,page_title__meta:null,callout__background_color:n,...m,...c,...d,...R,...l.responsive_images["2x3"]})},p=e=>{const{pageTitle:t,introContent:n,calloutBackground:a,heading:i,snippet:u,linkContent:q,contentLayout:x,bgColor:C,linkStyle:w,bannerType:S,videoHeading:B,videoCaption:H,grandHeroOverlayVariation:W,grandHeroSize:V,grandHeroWithVideo:N}=e;return Q({...r(e),utility_nav__items:o.items,primary_nav__items:s.items,breadcrumbs__items:_.items,page_title__heading:t,page_title__meta:null,intro_content:n,callout__background_color:a,...m,...c,...F,banner_type:S,banner__heading:i,banner__snippet:u,banner__link__content:q,banner__link__url:v.banner__link__url,banner__link__style:w,banner__content__layout:x,banner__content__background:C,grand_hero__heading:i,grand_hero__snippet:u,grand_hero__link__content:q,grand_hero__link__url:$.grand_hero__link__url,grand_hero__content__background:C,grand_hero__overlay_variation:W,grand_hero__size:V,grand_hero__video:N?"true":"false",...l.responsive_images["16x9"],...d,...D,video__heading:B,video__text:H,...J,...K,...M})};p.args={bannerType:"grand-hero",contentLayout:"bottom",bgColor:"one",heading:v.banner__heading,snippet:v.banner__snippet,linkContent:v.banner__link__content,linkStyle:"cta",grandHeroOverlayVariation:"full",grandHeroSize:"full",grandHeroWithVideo:!1,videoHeading:D.video__heading,videoCaption:D.video__text};const y=e=>{const{pageTitle:t,introContent:n,calloutBackground:a}=e;return A({...r(e),utility_nav__items:o.items,primary_nav__items:s.items,breadcrumbs__items:_.items,page_title__heading:t,page_title__meta:null,...l.responsive_images["16x9"],intro_content:n,callout__background_color:a,...m,...c,...d})},g=e=>{const{pageTitle:t,quickLinksHeading:n,quickLinksDescription:a,quickLinksImage:i,quickLinksVariation:u}=e;return G({...r(e),utility_nav__items:o.items,primary_nav__items:s.items,breadcrumbs__items:_.items,page_title__heading:t,page_title__meta:null,...l.responsive_images["16x9"],...c,...d,quick_links__heading:n,quick_links__description:a,quick_links__image:i,quick_links__variation:u,quick_links__links:f.quick_links__links})};g.args={quickLinksHeading:f.quick_links__heading,quickLinksDescription:f.quick_links__description,quickLinksImage:!0,quickLinksVariation:"promotional"};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle,
    pageTitleDisplay,
    introContent,
    calloutBackground
  } = args;
  return standardPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    page_title__display: pageTitleDisplay,
    page_title__additional_classes: [pageTitleDisplay],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
    ...imageData.responsive_images['4x3']
  });
}`,...k.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle,
    introContent,
    calloutBackground
  } = args;
  return standardPageShortTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['4x3'],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
    ...secondaryNavItems
  });
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle,
    calloutBackground
  } = args;
  return standardPageSpotlightsTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
    ...contentSpotlightPortraitData,
    ...imageData.responsive_images['2x3']
  });
}`,...b.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle,
    introContent,
    calloutBackground,
    heading,
    snippet,
    linkContent,
    contentLayout,
    bgColor,
    linkStyle,
    bannerType,
    videoHeading,
    videoCaption,
    grandHeroOverlayVariation,
    grandHeroSize,
    grandHeroWithVideo
  } = args;
  return standardPageBannerTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...customCardData,
    banner_type: bannerType,
    banner__heading: heading,
    banner__snippet: snippet,
    banner__link__content: linkContent,
    banner__link__url: bannerData.banner__link__url,
    banner__link__style: linkStyle,
    banner__content__layout: contentLayout,
    banner__content__background: bgColor,
    grand_hero__heading: heading,
    grand_hero__snippet: snippet,
    grand_hero__link__content: linkContent,
    grand_hero__link__url: grandHeroData.grand_hero__link__url,
    grand_hero__content__background: bgColor,
    grand_hero__overlay_variation: grandHeroOverlayVariation,
    grand_hero__size: grandHeroSize,
    grand_hero__video: grandHeroWithVideo ? 'true' : 'false',
    ...imageData.responsive_images['16x9'],
    ...socialLinksData,
    ...videoData,
    video__heading: videoHeading,
    video__text: videoCaption,
    ...accordionData,
    ...tabData,
    ...mediaGridData
  });
}`,...p.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle,
    introContent,
    calloutBackground
  } = args;
  return standardPageSidebarTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['16x9'],
    intro_content: introContent,
    callout__background_color: calloutBackground,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData
  });
}`,...y.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle,
    quickLinksHeading,
    quickLinksDescription,
    quickLinksImage,
    quickLinksVariation
  } = args;
  return standardPageQuickLinksTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['16x9'],
    ...referenceCardData,
    ...socialLinksData,
    quick_links__heading: quickLinksHeading,
    quick_links__description: quickLinksDescription,
    quick_links__image: quickLinksImage,
    quick_links__variation: quickLinksVariation,
    quick_links__links: quickLinksData.quick_links__links
  });
}`,...g.parameters?.docs?.source}}};const Le=["Basic","BasicShort","BasicSpotlights","WithBanner","WithSidebar","WithQuickLinks"];export{k as Basic,h as BasicShort,b as BasicSpotlights,p as WithBanner,g as WithQuickLinks,y as WithSidebar,Le as __namedExportsOrder,Pe as default};
//# sourceMappingURL=standard-page.stories-B_zDIfDw.js.map
