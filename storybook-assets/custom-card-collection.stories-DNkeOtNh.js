import{ag as d,t as m}from"../iframe.js";import{g as _}from"./color-global-themes-C7UI5K9x.js";import{c as g}from"./custom-card-ChKUw6IK.js";import{i as u}from"./image-CSdbOboU.js";import{t as p,a as h}from"./component-props-De-d7Djp.js";const s={globalTheme:{twigProp:"site_global__theme",name:"Global Theme (lever)",type:"select",required:!1,description:"Global site theme applied as a data attribute on the wrapper element",detail:`Controls the global theme applied via the data-global-theme attribute on the wrapping element. Options are derived from the global-themes design tokens. Maps to site_global__theme in the Twig template.
`,default:"one",control:"select"},customCardCollectionHeading:{twigProp:"custom_card_collection__heading",name:"Collection Heading",type:"string",required:!1,description:"Optional heading displayed above the custom card collection",control:"text"},cardSize:{twigProp:"custom_card_collection__card_size",name:"Card Size",type:"select",required:!1,description:"How big each card in the collection is",detail:`Small is the 4-up grid collections have always rendered and is the default, so existing collections look the same. Large gives bigger cards, matching the Large size of the card collection. Passed to Twig as the string 'small' or 'large' via custom_card_collection__card_size; anything else renders small.
`,default:"small",options:["small","large"],control:"select"},withImage:{twigProp:"custom_card__image",name:"With Images",type:"boolean",required:!1,description:"Display images on custom cards",detail:`Passed to Twig as the string 'true' or 'false' via custom_card__image.
`,default:!0,control:"boolean"}},C=_(m["global-themes"]),t=h(s);t.globalTheme={...t.globalTheme,options:C};const b={title:"Organisms/Card Collection/Custom Card Collection",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:t,args:{...p(s),customCardCollectionHeading:"Custom Card Collection Heading"}},e=({heading:l,snippet:i,url:r,customCardCollectionHeading:c,withImage:n,cardSize:o,globalTheme:a})=>`
    <div class="wrap-for-global-theme" data-global-theme="${a}">
      ${d({site_global__theme:a,custom_card_collection__heading:c,custom_card__heading:l,custom_card__snippet:i,custom_card__url:r,custom_card__image:n?"true":"false",custom_card_collection__card_size:o,custom_card_collection__cards:o==="large"?[1,2,3]:[1,2,3,4],...g,...u.responsive_images["3x2"]})}
    </div>
  `;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  heading,
  snippet,
  url,
  customCardCollectionHeading,
  withImage,
  cardSize,
  globalTheme
}) => {
  const items = cardSize === 'large' ? [1, 2, 3] : [1, 2, 3, 4];
  return \`
    <div class="wrap-for-global-theme" data-global-theme="\${globalTheme}">
      \${customCardCollectionTwig({
    site_global__theme: globalTheme,
    custom_card_collection__heading: customCardCollectionHeading,
    custom_card__heading: heading,
    custom_card__snippet: snippet,
    custom_card__url: url,
    custom_card__image: withImage ? 'true' : 'false',
    custom_card_collection__card_size: cardSize,
    custom_card_collection__cards: items,
    ...customCardData,
    ...imageData.responsive_images['3x2']
  })}
    </div>
  \`;
}`,...e.parameters?.docs?.source}}};const f=["customCardCollection"],P=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:f,customCardCollection:e,default:b},Symbol.toStringTag,{value:"Module"}));export{P as C,s as a,e as c};
//# sourceMappingURL=custom-card-collection.stories-DNkeOtNh.js.map
