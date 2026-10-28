import{e as u,a as v}from"./cl-page-args-BzdE9YLW.js";import{aR as x,aS as N,aT as A}from"../iframe.js";import{i as s}from"./image-CSdbOboU.js";import{p as B}from"./pager-last-Dh-0WhD7.js";import{s as o}from"./social-links-BFPxBdAv.js";import{t as E,a as S}from"./component-props-De-d7Djp.js";import{a as w}from"./utility-CZwTYLsb.js";import{b as m}from"./yds-layout-Dp4f3bTS.js";import{u as l}from"./utility-nav-cXaVPHEz.js";import{p as c}from"./primary-nav-3-07Xq0g.js";import{b as d}from"./breadcrumbs-Cv5hPcoj.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const f={eventPageTitle:{twigProp:"event_title__heading",name:"Page Title",type:"string",required:!1,description:"The heading displayed as the event page title.",control:"text"},showBreadcrumbs:{twigProp:"show_breadcrumbs",name:"Breadcrumbs",type:"boolean",required:!1,description:"Whether to display breadcrumb navigation on the event page.",control:"boolean"}},y=e=>Math.floor(Date.parse(e)/1e3),R={title:"Page Examples/Events",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:{...v,...u,...S(f)},args:{...w({...v,...u}),...E(f),eventPageTitle:"Parlika (2016) film screening + Q&A with film director Sahraa Karimi",showBreadcrumbs:!0}},t=e=>{const{eventPageTitle:a,startDate:b,endDate:h,format:D,address:T,ctaText:P}=e;let i=y(b),_=y(h);const g=p=>p==="NaN"?null:p;return i=g(i),_=g(_),A({...m(e),utility_nav__items:l.items,primary_nav__items:c.items,breadcrumbs__items:d.items,event_title__heading:a,...s.responsive_images["4x3"],event_meta__date_start:i,event_meta__date_end:_,event_meta__format:D,event_meta__address:T,event_meta__cta_primary__content:P,event_meta__cta_primary__href:"#",event_meta__cta_secondary__content:"Add to calendar",event_meta__cta_secondary__href:"#",...o})};t.argTypes={pageTitle:{table:{disable:!0}},meta:{table:{disable:!0}}};const n=e=>{const{pageTitle:a}=e;return x({...m(e),utility_nav__items:l.items,primary_nav__items:c.items,breadcrumbs__items:d.items,page_title__heading:a,page_title__meta:null,...s.responsive_images["3x2"],reference_card__heading:"BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale",reference_card__snippet:"A panel celebrating the legacy of author Binyavanga Wainaina.",reference_card__url:"https://google.com",reference_card__date:"2022-03-30 13:00",format:"Online",...o})};n.argTypes={meta:{table:{disable:!0}}};const r=e=>{const{pageTitle:a}=e;return N({...m(e),utility_nav__items:l.items,primary_nav__items:c.items,breadcrumbs__items:d.items,page_title__heading:a,page_title__meta:null,...s.responsive_images["3x2"],reference_card__heading:"BINYA! A celebration of the legacy of Binyavanga Wainaina at Yale",reference_card__snippet:"A panel celebrating the legacy of author Binyavanga Wainaina.",reference_card__url:"#",reference_card__date:"2022-03-30 13:00",format:"Online",...B,...o})};r.argTypes={meta:{table:{disable:!0}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => {
  const {
    eventPageTitle,
    startDate,
    endDate,
    format,
    address,
    ctaText
  } = args;
  let unixStartDate = toUnixTimeStamp(startDate);
  let unixEndDate = toUnixTimeStamp(endDate);

  // Convert 'NaN' to null so that it is not rendered in the template
  const nanToNull = value => {
    if (value === 'NaN') {
      return null;
    }
    return value;
  };
  unixStartDate = nanToNull(unixStartDate);
  unixEndDate = nanToNull(unixEndDate);
  return eventPageTwig({
    ...buildPageProps(args),
    utility_nav__items: utilityNavData.items,
    primary_nav__items: primaryNavData.items,
    breadcrumbs__items: breadcrumbData.items,
    event_title__heading: eventPageTitle,
    ...imageData.responsive_images['4x3'],
    event_meta__date_start: unixStartDate,
    event_meta__date_end: unixEndDate,
    event_meta__format: format,
    event_meta__address: address,
    event_meta__cta_primary__content: ctaText,
    event_meta__cta_primary__href: '#',
    event_meta__cta_secondary__content: 'Add to calendar',
    event_meta__cta_secondary__href: '#',
    ...socialLinksData
  });
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle
  } = args;
  return eventGridPageTwig({
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
    format: 'Online',
    ...socialLinksData
  });
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => {
  const {
    pageTitle
  } = args;
  return eventListPageTwig({
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
    format: 'Online',
    ...pagerData,
    ...socialLinksData
  });
}`,...r.parameters?.docs?.source}}};const j=["EventPage","EventGrid","EventList"];export{n as EventGrid,r as EventList,t as EventPage,j as __namedExportsOrder,R as default};
//# sourceMappingURL=events.stories-DN6kBzeK.js.map
