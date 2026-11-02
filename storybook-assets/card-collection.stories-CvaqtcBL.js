import{a8 as d}from"../iframe.js";import{r as m}from"./post-card-Col65Wkc.js";import{e as y}from"./event-card-BG_kAEni.js";import{d as w}from"./yds-directory-listing-card-BNQB32qj.js";import{p as v,r as C}from"./resource-card-DH2_miRg.js";import{i as _}from"./image-CSdbOboU.js";import{l as b}from"./long-url-Cvaf1zkg.js";import{t as T,a as x}from"./component-props-De-d7Djp.js";import{a as D}from"./add-table-defaults-qMEDfH1P.js";const u={collectionType:{twigProp:"card_collection__type",name:"Collection Type",type:"select",required:!1,description:"Layout type for the card collection",default:"grid",options:["grid","list","condensed","single","profile-directory"],control:"select"},cardSize:{twigProp:"card_collection__card_size",name:"Card Size",type:"select",required:!1,description:"How big each card in the grid is",detail:`A size choice rather than a column count. The grid sizes itself against the inline width of the region it sits in and fits as many cards of the chosen size as will go: large gives 3 across a full-width region, 2 in a fifty-fifty and 1 in anything narrower; small gives 4, then 3, then 2, then 1 across the same progression. Every value therefore stays valid when a block moves between regions. Only applies to the grid collection type.
`,default:"large",options:["large","small"],control:"select"},featured:{twigProp:"card_collection__featured",name:"Featured",type:"boolean",required:!1,description:"Enable featured layout with larger first card",detail:`When true, the first card displays larger and more prominently. Passed to Twig as the string 'true' or 'false' via card_collection__featured.
`,default:!0,control:"boolean"},withOverlay:{twigProp:"reference_card__overlay",name:"Show Pinned Label",type:"boolean",required:!1,description:"Show an overlay label on reference cards (e.g., Pinned)",detail:`When enabled, passes 'Pinned' to reference_card__overlay in the Twig template to display an overlay badge on cards.
`,default:!1,control:"boolean"},withImages:{twigProp:"card_collection__with_images",name:"With Images",type:"boolean",required:!1,description:"Display images on cards",detail:`Passed to Twig as the string 'true' or 'false' via card_collection__with_images.
`,default:!0,control:"boolean"},heading:{twigProp:"card_collection__heading",name:"Heading",type:"string",required:!1,description:"Optional heading displayed above the card collection",control:"text"}},P=b.long_url,S={title:"Organisms/Card Collection",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:x(u),args:T(u)},g=({heading:r,collectionType:a,cardSize:e,featured:t,withImages:i,withOverlay:p})=>d({card_collection__source_type:"post",card_collection__card_size:e,card_collection__type:a,card_collection__heading:r,card_collection__featured:t?"true":"false",card_collection__with_images:i?"true":"false",card_collection__cards:t?[1,2,3]:[1,2,3,4],reference_card__overlay:p?"Pinned":"",...m,..._.responsive_images["3x2"]}),c=({heading:r,collectionType:a,featured:e,withImages:t})=>d({card_collection__source_type:"event",format:"Online",card_collection__type:a,card_collection__heading:r,card_collection__featured:e?"true":"false",card_collection__with_images:t?"true":"false",card_collection__cards:e?[1,2,3]:[1,2,3,4],...y,..._.responsive_images["3x2"]});c.argTypes={cardSize:{table:{disable:!0}},withOverlay:{table:{disable:!0}}};const l=({heading:r,collectionType:a,cardSize:e,featured:t,withImages:i})=>d({card_collection__source_type:"profile",card_collection__card_size:e,card_collection__type:a,card_collection__heading:r,card_collection__featured:t?"true":"false",card_collection__with_images:i?"true":"false",card_collection__cards:t?[1,2,3]:[1,2,3,4],...v,..._.responsive_images["1x1"]});l.argTypes={withOverlay:{table:{disable:!0}}};const s=({featured:r,heading:a,withOverlay:e})=>d({card_collection__source_type:"directory-listing",card_collection__type:"profile-directory",card_collection__heading:"Directory Listing",card_collection__featured:r?"true":"false",card_collection__cards:r?[1,2,3,4]:[1,2,3,4,5,6],directory_listing_card__heading:a,reference_card__overlay:e?"Pinned":"",...w,..._.responsive_images["1x1"]});s.argTypes={collectionType:{table:{disable:!0}},cardSize:{table:{disable:!0}},withImages:{table:{disable:!0}},withOverlay:{table:{disable:!0}}};const n=({heading:r,collectionType:a,featured:e,withImages:t,withOverlay:i,portrait:p})=>d({card_collection__source_type:"resource",card_collection__modifiers:p?["resource-portrait"]:[],card_collection__type:a,card_collection__heading:r,card_collection__featured:e?"true":"false",card_collection__with_images:t?"true":"false",card_collection__cards:e?[1,2,3]:[1,2,3,4],reference_card__overlay:i?"Pinned":"",...C,..._.responsive_images[p?"1x1.6":"3x2"]}),h={portrait:!1};n.argTypes=D({portrait:{name:"Portrait",type:"boolean"}},h);n.args=h;const o=({collectionType:r,featured:a,withImages:e})=>d({card_collection__source_type:"post",card_collection__type:r,card_collection__heading:"Long URL In Card Text",card_collection__featured:a?"true":"false",card_collection__with_images:e?"true":"false",card_collection__cards:a?[1,2,3]:[1,2,3,4],...m,reference_card__snippet:P,..._.responsive_images["3x2"]});o.storyName="Long URL In Card Text";o.argTypes={heading:{table:{disable:!0}},withOverlay:{table:{disable:!0}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`({
  heading,
  collectionType,
  cardSize,
  featured,
  withImages,
  withOverlay
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];
  return cardCollectionTwig({
    card_collection__source_type: 'post',
    card_collection__card_size: cardSize,
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    reference_card__overlay: withOverlay ? 'Pinned' : '',
    ...postCardData,
    ...imageData.responsive_images['3x2']
  });
}`,...g.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`({
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
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`({
  heading,
  collectionType,
  cardSize,
  featured,
  withImages
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];
  return cardCollectionTwig({
    card_collection__source_type: 'profile',
    card_collection__card_size: cardSize,
    card_collection__type: collectionType,
    card_collection__heading: heading,
    card_collection__featured: featured ? 'true' : 'false',
    card_collection__with_images: withImages ? 'true' : 'false',
    card_collection__cards: items,
    ...profileCardData,
    ...imageData.responsive_images['1x1']
  });
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`({
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
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`({
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
checking a real listing page.`,...o.parameters?.docs?.description}}};const L=["PostCardCollection","EventCardCollection","ProfileCardCollection","DirectoryListingCardCollection","ResourceCardCollection","LongUrlInCardText"],N=Object.freeze(Object.defineProperty({__proto__:null,DirectoryListingCardCollection:s,EventCardCollection:c,LongUrlInCardText:o,PostCardCollection:g,ProfileCardCollection:l,ResourceCardCollection:n,__namedExportsOrder:L,default:S},Symbol.toStringTag,{value:"Module"}));export{N as C,s as D,c as E,o as L,g as P,n as R,l as a,u as c};
//# sourceMappingURL=card-collection.stories-CvaqtcBL.js.map
