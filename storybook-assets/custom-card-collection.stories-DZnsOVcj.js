import{ab as d,t as m}from"../iframe.js";import{g as _}from"./color-global-themes-C7UI5K9x.js";import{c as u}from"./custom-card-ChKUw6IK.js";import{i as g}from"./image-CSdbOboU.js";import{t as p,a as h}from"./component-props-De-d7Djp.js";const r={globalTheme:{twigProp:"site_global__theme",name:"Global Theme (lever)",type:"select",required:!1,description:"Global site theme applied as a data attribute on the wrapper element",detail:`Controls the global theme applied via the data-global-theme attribute on the wrapping element. Options are derived from the global-themes design tokens. Maps to site_global__theme in the Twig template.
`,default:"one",control:"select"},customCardCollectionHeading:{twigProp:"custom_card_collection__heading",name:"Collection Heading",type:"string",required:!1,description:"Optional heading displayed above the custom card collection",control:"text"},featured:{twigProp:"custom_card_collection__featured",name:"Featured",type:"boolean",required:!1,description:"Enable featured layout with larger first card",detail:`When true, the first card displays larger and more prominently. Passed to Twig as the string 'true' or 'false' via custom_card_collection__featured.
`,default:!0,control:"boolean"},withImage:{twigProp:"custom_card__image",name:"With Images",type:"boolean",required:!1,description:"Display images on custom cards",detail:`Passed to Twig as the string 'true' or 'false' via custom_card__image.
`,default:!0,control:"boolean"}},f=_(m["global-themes"]),t=h(r);t.globalTheme={...t.globalTheme,options:f};const b={title:"Organisms/Card Collection/Custom Card Collection",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:t,args:{...p(r),customCardCollectionHeading:"Custom Card Collection Heading"}},e=({heading:s,snippet:l,url:i,customCardCollectionHeading:n,withImage:c,featured:o,globalTheme:a})=>`
    <div class="wrap-for-global-theme" data-global-theme="${a}">
      ${d({site_global__theme:a,custom_card_collection__heading:n,custom_card__heading:s,custom_card__snippet:l,custom_card__url:i,custom_card__image:c?"true":"false",custom_card_collection__featured:o?"true":"false",custom_card_collection__cards:o?[1,2,3]:[1,2,3,4],...u,...g.responsive_images["3x2"]})}
    </div>
  `;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  heading,
  snippet,
  url,
  customCardCollectionHeading,
  withImage,
  featured,
  globalTheme
}) => {
  const items = featured ? [1, 2, 3] : [1, 2, 3, 4];
  return \`
    <div class="wrap-for-global-theme" data-global-theme="\${globalTheme}">
      \${customCardCollectionTwig({
    site_global__theme: globalTheme,
    custom_card_collection__heading: customCardCollectionHeading,
    custom_card__heading: heading,
    custom_card__snippet: snippet,
    custom_card__url: url,
    custom_card__image: withImage ? 'true' : 'false',
    custom_card_collection__featured: featured ? 'true' : 'false',
    custom_card_collection__cards: items,
    ...customCardData,
    ...imageData.responsive_images['3x2']
  })}
    </div>
  \`;
}`,...e.parameters?.docs?.source}}};const C=["customCardCollection"],D=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:C,customCardCollection:e,default:b},Symbol.toStringTag,{value:"Module"}));export{D as C,r as a,e as c};
//# sourceMappingURL=custom-card-collection.stories-DZnsOVcj.js.map
