import{J as C}from"../iframe.js";import{r as _}from"./post-card-Col65Wkc.js";import{p,r as b}from"./resource-card-tAJflxwm.js";import{r as m}from"./page-card-QZHciIP3.js";import{i as v}from"./image-CSdbOboU.js";import{t as U,a as q}from"./component-props-De-d7Djp.js";import{a as T}from"./add-table-defaults-qMEDfH1P.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const D={heading:{twigProp:"reference_card__heading",name:"Heading",type:"string",required:!0,description:"The heading text for the card",control:"text"},snippet:{twigProp:"reference_card__snippet",name:"Snippet",type:"string",required:!1,description:"Descriptive text content displayed below the heading",control:"text"},collectionType:{twigProp:"card_collection__type",name:"Collection Type",type:"select",required:!1,description:"Layout type for the card collection: grid, list, condensed, single, or profile-directory",default:"grid",options:["grid","list","condensed","single","profile-directory"],control:"select"},featured:{name:"Featured",type:"boolean",required:!1,description:"Whether the collection displays cards in a featured layout style",detail:`Controls the data-collection-featured attribute on the card collection wrapper. This is a Storybook-only UI toggle — it is not a direct Twig prop on the card template itself.
`,default:!0,control:"boolean"},withImage:{twigProp:"reference_card__image",name:"Show Teaser Image",type:"boolean",required:!1,description:"Whether to display an image with the card",default:!0,control:"boolean"},showEyebrow:{name:"Show Teaser Lead-in",type:"boolean",required:!1,description:"Whether to display the eyebrow text above the heading",detail:`Storybook-only toggle that controls show_eyebrow. When enabled, the eyebrow field becomes visible in the Controls panel via a conditional if: { arg: 'showEyebrow' } rule.
`,default:!1,control:"boolean"},eyebrow:{twigProp:"reference_card__eyebrow",name:"Eyebrow",type:"string",required:!1,description:"Optional eyebrow text displayed above the heading (conditionally shown)",control:"text"},showCategories:{name:"Show Categories/Affiliations",type:"boolean",required:!1,description:"Whether to display categories or affiliations on the card",detail:"Controls the show_categories Twig variable.",default:!1,control:"boolean"},showTags:{name:"Show Tags",type:"boolean",required:!1,description:"Whether to display tags on the card",detail:"Controls the show_tags Twig variable.",default:!1,control:"boolean"}},x=q(D);x.eyebrow={...x.eyebrow,if:{arg:"showEyebrow"}};const z={title:"Molecules/Cards",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:x,args:{...U(D),heading:_.reference_card__heading,snippet:_.reference_card__snippet}},g=({date:a,eyebrow:c,heading:t,snippet:n,collectionType:e,featured:r,withImage:o,showCategories:s,showEyebrow:d,showTags:i,overlayText:l})=>`
<div class='card-collection' data-component-width='site' data-collection-type='${e}' data-collection-featured="${r}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${C({card_collection__source_type:"post",card_collection__type:e,...v.responsive_images["3x2"],reference_card__date:a,reference_card__eyebrow:c,reference_card__heading:t,reference_card__snippet:n,reference_card__featured:r?"true":"false",reference_card__image:o?"true":"false",reference_card__url:_.reference_card__url,show_categories:s,show_eyebrow:d,show_tags:i,reference_card__categories:_.reference_card__categories,reference_card__tags:_.reference_card__tags,reference_card__overlay:l})}
    </ul>
  </div>
</div>
`,P={date:_.reference_card__date};g.argTypes=T({date:{name:"Date",type:"string"}},P);g.args=P;const u=({format:a,heading:c,snippet:t,collectionType:n,featured:e,withImage:r,primaryCTAContent:o,primaryCTAURL:s,secondaryCTAContent:d,secondaryCTAURL:i,multiDayEvent:l,headingPrefix:f,showCategories:S,showTags:R,overlayText:L})=>`
<div class='card-collection' data-component-width='site' data-collection-type='${n}' data-collection-featured="${e}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${C({card_collection__source_type:"event",card_collection__type:n,...v.responsive_images["3x2"],format:a,reference_card__heading:c,reference_card__prefix:f,reference_card__snippet:t,reference_card__featured:e?"true":"false",reference_card__image:r?"true":"false",reference_card__url:_.reference_card__url,reference_card__cta_primary__href:s,reference_card__cta_primary__content:o,reference_card__cta_secondary__href:i,reference_card__cta_secondary__content:d,multi_day_event:l,reference_card__categories:_.reference_card__categories,show_categories:S,reference_card__tags:_.reference_card__tags,show_tags:R,reference_card__overlay:L})}
    </ul>
  </div>
</div>
`,$={format:"In-person",headingPrefix:"",primaryCTAContent:"Buy Tickets",primaryCTAURL:"https://yale.edu",secondaryCTAContent:"Add to Calendar",secondaryCTAURL:"https://yale.edu",multiDayEvent:!1};u.argTypes=T({format:{name:"Format",control:"select",options:["In-person","Online","Hybrid"]},headingPrefix:{name:"Heading Prefix",type:"string"},primaryCTAContent:{name:"Primary CTA Content",type:"string"},primaryCTAURL:{name:"Primary CTA URL",type:"string"},secondaryCTAContent:{name:"Secondary CTA Content",type:"string"},secondaryCTAURL:{name:"Secondary CTA URL",type:"string"},multiDayEvent:{name:"Multi-day Event",type:"boolean"}},$);u.args=$;const y=({collectionType:a,featured:c,withImage:t,showCategories:n,showPronouns:e,showTags:r,overlayText:o})=>`
<div class='card-collection' data-component-width='site' data-collection-source='profile' data-collection-type='${a}' data-collection-featured="${c}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${C({card_collection__source_type:"profile",card_collection__type:a,...v.responsive_images["1x1"],reference_card__featured:c?"true":"false",reference_card__image:t?"true":"false",reference_card__heading:p.reference_card__heading,reference_card__heading_extra:p.reference_card__pronouns,reference_card__subheading:p.reference_card__subheading,reference_card__snippet:p.reference_card__snippet,reference_card__url:p.reference_card__url,reference_card__categories:p.reference_card__categories,show_categories:n,show_pronouns:e,reference_card__tags:p.reference_card__tags,show_tags:r,reference_card__overlay:o})}
    </ul>
  </div>
</div>
`,A={showPronouns:!1};y.argTypes=T({showPronouns:{name:"Show Pronouns",type:"boolean"}},A);y.args=A;const h=({date:a,eyebrow:c,heading:t,snippet:n,collectionType:e,featured:r,withImage:o,showCategories:s,showEyebrow:d,showTags:i,showThumbnail:l,overlayText:f})=>`
<div class='card-collection' data-component-width='site' data-collection-type='${e}' data-collection-featured="${r}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${C({card_collection__source_type:"page",card_collection__type:e,...v.responsive_images["3x2"],reference_card__date:a,reference_card__eyebrow:c,reference_card__heading:t,reference_card__snippet:n,reference_card__featured:r?"true":"false",reference_card__image:o?"true":"false",reference_card__url:m.reference_card__url,show_categories:s,show_eyebrow:d,show_tags:i,show_thumbnail:l?"true":"false",reference_card__categories:m.reference_card__categories,reference_card__tags:m.reference_card__tags,reference_card__overlay:f})}
    </ul>
  </div>
</div>
`,E={heading:m.reference_card__heading,snippet:m.reference_card__snippet,date:m.reference_card__date,collectionType:"grid",featured:!0,withImage:!0,showEyebrow:!1,showCategories:!1,showTags:!1,showThumbnail:!0};h.argTypes=T({date:{name:"Date",type:"string"}},E);h.args=E;const w=({date:a,eyebrow:c,heading:t,snippet:n,collectionType:e,featured:r,withImage:o,showCategories:s,showEyebrow:d,showTags:i,overlayText:l,portrait:f})=>`
<div class='card-collection${f?" card-collection--resource-portrait":""}' data-component-width='site'${f?" data-collection-source='resource'":""} data-collection-type='${e}' data-collection-featured="${r}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      ${C({card_collection__source_type:"resource",card_collection__type:e,...v.responsive_images[f?"1x1.6":"3x2"],reference_card__date:a,reference_card__eyebrow:c,reference_card__heading:t,reference_card__snippet:n,reference_card__featured:r?"true":"false",reference_card__image:o?"true":"false",reference_card__url:b.reference_card__url,show_categories:s,show_eyebrow:d,show_tags:i,reference_card__categories:b.reference_card__categories,reference_card__tags:b.reference_card__tags,reference_card__overlay:l})}
    </ul>
  </div>
</div>
`,I={showCategories:!0,portrait:!1,date:b.reference_card__date};w.argTypes=T({date:{name:"Date",type:"string"},portrait:{name:"Portrait",type:"boolean"}},I);w.args=I;g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`({
  date,
  eyebrow,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
  showCategories,
  showEyebrow,
  showTags,
  overlayText
}) => \`
<div class='card-collection' data-component-width='site' data-collection-type='\${collectionType}' data-collection-featured="\${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      \${referenceCardTwig({
  card_collection__source_type: 'post',
  card_collection__type: collectionType,
  ...imageData.responsive_images['3x2'],
  reference_card__date: date,
  reference_card__eyebrow: eyebrow,
  reference_card__heading: heading,
  reference_card__snippet: snippet,
  reference_card__featured: featured ? 'true' : 'false',
  reference_card__image: withImage ? 'true' : 'false',
  reference_card__url: referenceCardData.reference_card__url,
  show_categories: showCategories,
  show_eyebrow: showEyebrow,
  show_tags: showTags,
  reference_card__categories: referenceCardData.reference_card__categories,
  reference_card__tags: referenceCardData.reference_card__tags,
  reference_card__overlay: overlayText
})}
    </ul>
  </div>
</div>
\``,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`({
  format,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
  primaryCTAContent,
  primaryCTAURL,
  secondaryCTAContent,
  secondaryCTAURL,
  multiDayEvent,
  headingPrefix,
  showCategories,
  showTags,
  overlayText
}) => \`
<div class='card-collection' data-component-width='site' data-collection-type='\${collectionType}' data-collection-featured="\${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      \${referenceCardTwig({
  card_collection__source_type: 'event',
  card_collection__type: collectionType,
  ...imageData.responsive_images['3x2'],
  format,
  reference_card__heading: heading,
  reference_card__prefix: headingPrefix,
  reference_card__snippet: snippet,
  reference_card__featured: featured ? 'true' : 'false',
  reference_card__image: withImage ? 'true' : 'false',
  reference_card__url: referenceCardData.reference_card__url,
  reference_card__cta_primary__href: primaryCTAURL,
  reference_card__cta_primary__content: primaryCTAContent,
  reference_card__cta_secondary__href: secondaryCTAURL,
  reference_card__cta_secondary__content: secondaryCTAContent,
  multi_day_event: multiDayEvent,
  reference_card__categories: referenceCardData.reference_card__categories,
  show_categories: showCategories,
  reference_card__tags: referenceCardData.reference_card__tags,
  show_tags: showTags,
  reference_card__overlay: overlayText
})}
    </ul>
  </div>
</div>
\``,...u.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`({
  collectionType,
  featured,
  withImage,
  showCategories,
  showPronouns,
  showTags,
  overlayText
}) => \`
<div class='card-collection' data-component-width='site' data-collection-source='profile' data-collection-type='\${collectionType}' data-collection-featured="\${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      \${referenceCardTwig({
  card_collection__source_type: 'profile',
  card_collection__type: collectionType,
  ...imageData.responsive_images['1x1'],
  reference_card__featured: featured ? 'true' : 'false',
  reference_card__image: withImage ? 'true' : 'false',
  reference_card__heading: referenceProfileCardData.reference_card__heading,
  reference_card__heading_extra: referenceProfileCardData.reference_card__pronouns,
  reference_card__subheading: referenceProfileCardData.reference_card__subheading,
  reference_card__snippet: referenceProfileCardData.reference_card__snippet,
  reference_card__url: referenceProfileCardData.reference_card__url,
  reference_card__categories: referenceProfileCardData.reference_card__categories,
  show_categories: showCategories,
  show_pronouns: showPronouns,
  reference_card__tags: referenceProfileCardData.reference_card__tags,
  show_tags: showTags,
  reference_card__overlay: overlayText
})}
    </ul>
  </div>
</div>
\``,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`({
  date,
  eyebrow,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
  showCategories,
  showEyebrow,
  showTags,
  showThumbnail,
  overlayText
}) => \`
<div class='card-collection' data-component-width='site' data-collection-type='\${collectionType}' data-collection-featured="\${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      \${referenceCardTwig({
  card_collection__source_type: 'page',
  card_collection__type: collectionType,
  ...imageData.responsive_images['3x2'],
  reference_card__date: date,
  reference_card__eyebrow: eyebrow,
  reference_card__heading: heading,
  reference_card__snippet: snippet,
  reference_card__featured: featured ? 'true' : 'false',
  reference_card__image: withImage ? 'true' : 'false',
  reference_card__url: referencePageCardData.reference_card__url,
  show_categories: showCategories,
  show_eyebrow: showEyebrow,
  show_tags: showTags,
  show_thumbnail: showThumbnail ? 'true' : 'false',
  reference_card__categories: referencePageCardData.reference_card__categories,
  reference_card__tags: referencePageCardData.reference_card__tags,
  reference_card__overlay: overlayText
})}
    </ul>
  </div>
</div>
\``,...h.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`({
  date,
  eyebrow,
  heading,
  snippet,
  collectionType,
  featured,
  withImage,
  showCategories,
  showEyebrow,
  showTags,
  overlayText,
  portrait
}) => \`
<div class='card-collection\${portrait ? ' card-collection--resource-portrait' : ''}' data-component-width='site'\${portrait ? " data-collection-source='resource'" : ''} data-collection-type='\${collectionType}' data-collection-featured="\${featured}">
  <div class='card-collection__inner'>
    <ul class='card-collection__cards'>
      \${referenceCardTwig({
  card_collection__source_type: 'resource',
  card_collection__type: collectionType,
  ...imageData.responsive_images[portrait ? '1x1.6' : '3x2'],
  reference_card__date: date,
  reference_card__eyebrow: eyebrow,
  reference_card__heading: heading,
  reference_card__snippet: snippet,
  reference_card__featured: featured ? 'true' : 'false',
  reference_card__image: withImage ? 'true' : 'false',
  reference_card__url: referenceResourceData.reference_card__url,
  show_categories: showCategories,
  show_eyebrow: showEyebrow,
  show_tags: showTags,
  reference_card__categories: referenceResourceData.reference_card__categories,
  reference_card__tags: referenceResourceData.reference_card__tags,
  reference_card__overlay: overlayText
})}
    </ul>
  </div>
</div>
\``,...w.parameters?.docs?.source}}};const G=["PostCard","EventCard","ProfileCard","PageCard","ResourceCard"];export{u as EventCard,h as PageCard,g as PostCard,y as ProfileCard,w as ResourceCard,G as __namedExportsOrder,z as default};
//# sourceMappingURL=reference-card.stories-BgssTeQp.js.map
