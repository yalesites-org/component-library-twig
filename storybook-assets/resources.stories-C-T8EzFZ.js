import{a as g}from"./cl-page-args-BzdE9YLW.js";import{aX as p,aY as u,aZ as d}from"../iframe.js";import{i as a}from"./image-CSdbOboU.js";import{p as b}from"./pager-last-Dh-0WhD7.js";import{s as _}from"./social-links-BFPxBdAv.js";import{v as y}from"./video-embed-DfDFIR6J.js";import{t as f,a as v}from"./component-props-De-d7Djp.js";import{a as h}from"./utility-CZwTYLsb.js";import{b as n}from"./yds-layout-Dp4f3bTS.js";import{u as o}from"./utility-nav-cXaVPHEz.js";import{p as c}from"./primary-nav-3-07Xq0g.js";import{b as m}from"./breadcrumbs-Cv5hPcoj.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const l={showBreadcrumbs:{twigProp:"show_breadcrumbs",name:"Breadcrumbs",type:"boolean",required:!1,description:"Whether to display breadcrumb navigation on the resource page.",control:"boolean"}},z={title:"Page Examples/Resources",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:{...g,...v(l)},args:{...h(g),...f(l),showBreadcrumbs:!0}},r=e=>{const{resourceType:t}=e;return d({...n(e),utility_nav__items:o.items,primary_nav__items:c.items,breadcrumbs__items:m.items,...a.responsive_images["2x3"],..._,resource_meta__heading:"Resource Page",resource_meta__resource_type:t,resource_meta__publish_date_label:"Published On",resource_meta__publish_date:"July 01, 2025",resource_meta__download_label:"Download",resource_meta__download_aria_label:"Download file",resource_meta__download_url:"#.pdf",image__srcset__1:a.responsive_images["2x3"].image__srcset,image__sizes__1:a.responsive_images["2x3"].image__sizes,image__alt__1:a.responsive_images["2x3"].image__alt,image__src__1:a.responsive_images["2x3"].image__src,video_embed__content__1:y.video_embed__content})};r.argTypes={resourceType:{name:"Resource Type",description:"The type of resource to display",options:["video","document"],control:{type:"select"},table:{category:"Optional",type:{summary:"select"}}}};r.args={resourceType:"video"};const s=e=>{const{pageTitle:t}=e;return p({...n(e),utility_nav__items:o.items,primary_nav__items:c.items,breadcrumbs__items:m.items,page_title__heading:t,page_title__meta:null,...a.responsive_images["3x2"],reference_card__heading:"BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale",reference_card__snippet:"A panel celebrating the legacy of author Binyavanga Wainaina.",reference_card__url:"https://google.com",reference_card__date:"2022-03-30 13:00",reference_card__categories:[{content:"Video"}],show_categories:!0,..._})};s.argTypes={meta:{table:{disable:!0}}};const i=e=>{const{pageTitle:t}=e;return u({...n(e),utility_nav__items:o.items,primary_nav__items:c.items,breadcrumbs__items:m.items,page_title__heading:t,page_title__meta:null,...a.responsive_images["3x2"],reference_card__heading:"BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale",reference_card__snippet:"A panel celebrating the legacy of author Binyavanga Wainaina.",reference_card__url:"#",reference_card__date:"2022-03-30 13:00",reference_card__categories:[{content:"Video"}],show_categories:!0,...b,..._})};i.argTypes={meta:{table:{disable:!0}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => {
  const {
    resourceType
  } = args;
  return resourcePageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    ...imageData.responsive_images['2x3'],
    ...socialLinksData,
    resource_meta__heading: 'Resource Page',
    resource_meta__resource_type: resourceType,
    resource_meta__publish_date_label: 'Published On',
    resource_meta__publish_date: 'July 01, 2025',
    // Values for resource type: Document.
    resource_meta__download_label: 'Download',
    resource_meta__download_aria_label: 'Download file',
    resource_meta__download_url: '#.pdf',
    image__srcset__1: imageData.responsive_images['2x3'].image__srcset,
    image__sizes__1: imageData.responsive_images['2x3'].image__sizes,
    image__alt__1: imageData.responsive_images['2x3'].image__alt,
    image__src__1: imageData.responsive_images['2x3'].image__src,
    // Values for resource type: Video.
    video_embed__content__1: videoEmbedData.video_embed__content
  });
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle
  } = args;
  return resourceGridPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['3x2'],
    reference_card__heading: 'BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale',
    reference_card__snippet: 'A panel celebrating the legacy of author Binyavanga Wainaina.',
    reference_card__url: 'https://google.com',
    reference_card__date: '2022-03-30 13:00',
    reference_card__categories: [{
      content: 'Video'
    }],
    show_categories: true,
    ...socialLinksData
  });
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle
  } = args;
  return resourceListPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    page_title__heading: pageTitle,
    page_title__meta: null,
    ...imageData.responsive_images['3x2'],
    reference_card__heading: 'BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale',
    reference_card__snippet: 'A panel celebrating the legacy of author Binyavanga Wainaina.',
    reference_card__url: '#',
    reference_card__date: '2022-03-30 13:00',
    reference_card__categories: [{
      content: 'Video'
    }],
    show_categories: true,
    ...pagerData,
    ...socialLinksData
  });
}`,...i.parameters?.docs?.source}}};const E=["ResourcePage","ResourceGrid","ResourceList"];export{s as ResourceGrid,i as ResourceList,r as ResourcePage,E as __namedExportsOrder,z as default};
//# sourceMappingURL=resources.stories-C-T8EzFZ.js.map
