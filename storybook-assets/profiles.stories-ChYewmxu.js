import{a as t}from"./cl-page-args-BzdE9YLW.js";import{aV as n}from"../iframe.js";import{i as e}from"./image-CSdbOboU.js";import{t as _}from"./text-with-image-C3X7Zdec.js";import{r as g}from"./post-card-Col65Wkc.js";import{s as p}from"./social-links-BFPxBdAv.js";import{v as l}from"./video-khdXQuHI.js";import{a as f}from"./accordion-CnJdIhT5.js";import{t as c}from"./tabs-Dl0Hirov.js";import{t as d,a as y}from"./component-props-De-d7Djp.js";import{a as u}from"./utility-CZwTYLsb.js";import{b as D}from"./yds-layout-Dp4f3bTS.js";import{u as v}from"./utility-nav-cXaVPHEz.js";import{p as I}from"./primary-nav-3-07Xq0g.js";import{b as P}from"./breadcrumbs-Cv5hPcoj.js";import"./yds-text-link-DjKH7WLb.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const r={profileImageOrientation:{twigProp:"profile_meta__image_orientation",name:"Profile Image Orientation",type:"select",required:!1,description:"The orientation of the profile image (landscape or portrait).",control:"select",options:["landscape","portrait"]},profileImageAlignment:{twigProp:"profile_meta__image_alignment",name:"Profile Image Alignment",type:"select",required:!1,description:"The alignment of the profile image within the layout (left or right).",control:"select",options:["left","right"]},profileImageStyle:{twigProp:"profile_meta__image_style",name:"Profile Image Style",type:"select",required:!1,description:"The display style for the profile image (inline or outdent).",control:"select",options:["inline","outdent"]}},B={title:"Page Examples/Profiles",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:{...t,...y(r)},args:{...u(t),...d(r),profileImageOrientation:"landscape",profileImageAlignment:"right",profileImageStyle:"inline"}},a=i=>{const{profileImageOrientation:o,profileImageAlignment:m,profileImageStyle:s}=i;return n({...D(i),utility_nav__items:v.items,primary_nav__items:I.items,breadcrumbs__items:P.items,profile_meta__image_orientation:o,profile_meta__image_style:s,profile_meta__image_alignment:m,...e.responsive_images["3x2"],image__srcset__1:e.responsive_images["2x3"].image__srcset,image__sizes__1:e.responsive_images["2x3"].image__sizes,image__alt__1:e.responsive_images["2x3"].image__alt,image__src__1:e.responsive_images["2x3"].image__src,..._,...g,...p,...l,...f,...c})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
  const {
    profileImageOrientation,
    profileImageAlignment,
    profileImageStyle
  } = args;
  return profilePageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    profile_meta__image_orientation: profileImageOrientation,
    profile_meta__image_style: profileImageStyle,
    profile_meta__image_alignment: profileImageAlignment,
    ...imageData.responsive_images['3x2'],
    image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
    image__alt__1: imageData.responsive_images['2x3'].image__alt,
    image__src__1: imageData.responsive_images['2x3'].image__src,
    ...textWithImageData,
    ...referenceCardData,
    ...socialLinksData,
    ...videoData,
    ...accordionData,
    ...tabData
  });
}`,...a.parameters?.docs?.source}}};const F=["ProfilePage"];export{a as ProfilePage,F as __namedExportsOrder,B as default};
//# sourceMappingURL=profiles.stories-ChYewmxu.js.map
