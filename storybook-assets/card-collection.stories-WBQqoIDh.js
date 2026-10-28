import{ab as s}from"../iframe.js";import{r as m}from"./post-card-Col65Wkc.js";import{e as h}from"./event-card-BG_kAEni.js";import{d as y}from"./yds-directory-listing-card-BNQB32qj.js";import{p as w,r as C}from"./resource-card-tAJflxwm.js";import{i as d}from"./image-CSdbOboU.js";import{l as v}from"./long-url-Cvaf1zkg.js";import{t as b,a as T}from"./component-props-De-d7Djp.js";import{a as x}from"./add-table-defaults-qMEDfH1P.js";const g={collectionType:{twigProp:"card_collection__type",name:"Collection Type",type:"select",required:!1,description:"Layout type for the card collection",default:"grid",options:["grid","list","condensed","single","profile-directory"],control:"select"},featured:{twigProp:"card_collection__featured",name:"Featured",type:"boolean",required:!1,description:"Enable featured layout with larger first card",detail:`When true, the first card displays larger and more prominently. Passed to Twig as the string 'true' or 'false' via card_collection__featured.
`,default:!0,control:"boolean"},withOverlay:{twigProp:"reference_card__overlay",name:"Show Pinned Label",type:"boolean",required:!1,description:"Show an overlay label on reference cards (e.g., Pinned)",detail:`When enabled, passes 'Pinned' to reference_card__overlay in the Twig template to display an overlay badge on cards.
`,default:!1,control:"boolean"},withImages:{twigProp:"card_collection__with_images",name:"With Images",type:"boolean",required:!1,description:"Display images on cards",detail:`Passed to Twig as the string 'true' or 'false' via card_collection__with_images.
`,default:!0,control:"boolean"},heading:{twigProp:"card_collection__heading",name:"Heading",type:"string",required:!1,description:"Optional heading displayed above the card collection",control:"text"}},D=v.long_url,P={title:"Organisms/Card Collection",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:T(g),args:b(g)},p=({heading:r,collectionType:t,featured:e,withImages:a,withOverlay:_})=>s({card_collection__source_type:"post",card_collection__type:t,card_collection__heading:r,card_collection__featured:e?"true":"false",card_collection__with_images:a?"true":"false",card_collection__cards:e?[1,2,3]:[1,2,3,4],reference_card__overlay:_?"Pinned":"",...m,...d.responsive_images["3x2"]}),c=({heading:r,collectionType:t,featured:e,withImages:a})=>s({card_collection__source_type:"event",format:"Online",card_collection__type:t,card_collection__heading:r,card_collection__featured:e?"true":"false",card_collection__with_images:a?"true":"false",card_collection__cards:e?[1,2,3]:[1,2,3,4],...h,...d.responsive_images["3x2"]});c.argTypes={withOverlay:{table:{disable:!0}}};const i=({heading:r,collectionType:t,featured:e,withImages:a})=>s({card_collection__source_type:"profile",card_collection__type:t,card_collection__heading:r,card_collection__featured:e?"true":"false",card_collection__with_images:a?"true":"false",card_collection__cards:e?[1,2,3]:[1,2,3,4],...w,...d.responsive_images["1x1"]});i.argTypes={withOverlay:{table:{disable:!0}}};const l=({featured:r,heading:t,withOverlay:e})=>s({card_collection__source_type:"directory-listing",card_collection__type:"profile-directory",card_collection__heading:"Directory Listing",card_collection__featured:r?"true":"false",card_collection__cards:r?[1,2,3,4]:[1,2,3,4,5,6],directory_listing_card__heading:t,reference_card__overlay:e?"Pinned":"",...y,...d.responsive_images["1x1"]});l.argTypes={collectionType:{table:{disable:!0}},withImages:{table:{disable:!0}},withOverlay:{table:{disable:!0}}};const n=({heading:r,collectionType:t,featured:e,withImages:a,withOverlay:_,portrait:u})=>s({card_collection__source_type:"resource",card_collection__modifiers:u?["resource-portrait"]:[],card_collection__type:t,card_collection__heading:r,card_collection__featured:e?"true":"false",card_collection__with_images:a?"true":"false",card_collection__cards:e?[1,2,3]:[1,2,3,4],reference_card__overlay:_?"Pinned":"",...C,...d.responsive_images[u?"1x1.6":"3x2"]}),f={portrait:!1};n.argTypes=x({portrait:{name:"Portrait",type:"boolean"}},f);n.args=f;const o=({collectionType:r,featured:t,withImages:e})=>s({card_collection__source_type:"post",card_collection__type:r,card_collection__heading:"Long URL In Card Text",card_collection__featured:t?"true":"false",card_collection__with_images:e?"true":"false",card_collection__cards:t?[1,2,3]:[1,2,3,4],...m,reference_card__snippet:D,...d.responsive_images["3x2"]});o.storyName="Long URL In Card Text";o.argTypes={heading:{table:{disable:!0}},withOverlay:{table:{disable:!0}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`({
  heading,
  collectionType,
  featured,
  withImages,
  withOverlay
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];
  return cardCollectionTwig({
    card_collection__source_type: 'post',
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    reference_card__overlay: withOverlay ? 'Pinned' : '',
    ...postCardData,
    ...imageData.responsive_images['3x2']
  });
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`({
  heading,
  collectionType,
  featured,
  withImages
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];
  return cardCollectionTwig({
    card_collection__source_type: 'event',
    format: 'Online',
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    ...eventCardData,
    ...imageData.responsive_images['3x2']
  });
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`({
  heading,
  collectionType,
  featured,
  withImages
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];
  return cardCollectionTwig({
    card_collection__source_type: 'profile',
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    ...profileCardData,
    ...imageData.responsive_images['1x1']
  });
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`({
  featured,
  heading,
  withOverlay
}) => {
  const items = featured ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6];
  return cardCollectionTwig({
    card_collection__source_type: 'directory-listing',
    card_collection__type: 'profile-directory',
    card_collection__heading: 'Directory Listing',
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__cards: items,
    directory_listing_card__heading: heading,
    reference_card__overlay: withOverlay ? 'Pinned' : '',
    ...directoryCardData,
    ...imageData.responsive_images['1x1']
  });
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`({
  heading,
  collectionType,
  featured,
  withImages,
  withOverlay,
  portrait
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];
  return cardCollectionTwig({
    card_collection__source_type: 'resource',
    card_collection__modifiers: portrait ? ['resource-portrait'] : [],
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    reference_card__overlay: withOverlay ? 'Pinned' : '',
    ...resourceCardData,
    ...imageData.responsive_images[portrait ? '1x1.6' : '3x2']
  });
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  collectionType,
  featured,
  withImages
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];
  return cardCollectionTwig({
    card_collection__source_type: 'post',
    card_collection__type: collectionType,
    card_collection__heading: 'Long URL In Card Text',
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    ...postCardData,
    reference_card__snippet: LONG_URL,
    ...imageData.responsive_images['3x2']
  });
}`,...o.parameters?.docs?.source},description:{story:`A grid whose card text is a long unbroken URL.

Pasting a webcast or registration link into an Event's Teaser Text is routine,
and before YaleSites-Internal#1729 it widened the card past its column, so a
3-up grid rendered 2-up. This story exists so that break has a baseline.

It exercises both declarations the reported break needs: \`min-width: 0\`, which
lets the card shrink to its column, and \`overflow-wrap: break-word\`, which
wraps the URL inside the card. The fix carries a third,
\`.link-purpose-nobreak { white-space: normal }\`, that no card grid can
exercise -- it only bites once text has been auto-linked, and card text never
is: every card text field is restricted to the \`heading_html\` format, which
runs no \`filter_url\`. That declaration is there for the grid mixins' other
consumers, facts-and-figures and media grid, whose text is \`restricted_html\`.

Storybook markup is not Drupal markup, so this is still not a substitute for
checking a real listing page.`,...o.parameters?.docs?.description}}};const L=["PostCardCollection","EventCardCollection","ProfileCardCollection","DirectoryListingCardCollection","ResourceCardCollection","LongUrlInCardText"],W=Object.freeze(Object.defineProperty({__proto__:null,DirectoryListingCardCollection:l,EventCardCollection:c,LongUrlInCardText:o,PostCardCollection:p,ProfileCardCollection:i,ResourceCardCollection:n,__namedExportsOrder:L,default:P},Symbol.toStringTag,{value:"Module"}));export{W as C,l as D,c as E,o as L,p as P,n as R,i as a,g as c};
//# sourceMappingURL=card-collection.stories-WBQqoIDh.js.map
