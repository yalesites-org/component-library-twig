import{a0 as s}from"../iframe.js";import{q as t}from"./quote-callout-u7bdvIqe.js";import{i as c}from"./image-CSdbOboU.js";import{t as _,a as m}from"./component-props-De-d7Djp.js";const o={quote:{twigProp:"quote_callout__quote",name:"Quote",type:"string",required:!0,description:"The quote text to display (supports HTML for formatting)",control:"text"},attribution:{twigProp:"quote_callout__attribution",name:"Attribution",type:"string",required:!1,description:"Attribution text for the quote (e.g., person's name, title, or affiliation)",control:"text"},style:{twigProp:"quote_callout__style",name:"Style",type:"select",required:!1,description:"Visual style: 'bar' (accent bar), 'quote' (decorative quote marks), or 'image' (with image)",default:"bar",options:["bar","quote","image"],control:"select",labels:{bar:"Bar",quote:"Quote",image:"Image"}},quoteAlignment:{twigProp:"quote_callout__quote_alignment",name:"Quote Alignment",type:"select",required:!1,description:"Text alignment: 'left' or 'right'",default:"left",options:["left","right"],control:"select",labels:{left:"Left",right:"Right"}},accentTheme:{twigProp:"quote_callout__accent_theme",name:"Accent Theme (dial)",type:"select",required:!1,description:"Theme dial for accent color (e.g., 'one', 'two', 'three')",default:"one",options:["one","two","three","four","five","six"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},quoteImage:{twigProp:"quote_callout__quote_image",name:"Quote Image",type:"select",required:!1,description:`Image display option: 'with-image' or 'no-image'. When 'with-image' is selected, responsive image properties should also be provided
`,default:"no-image",options:["no-image","with-image"],control:"select"},imageSrc:{twigProp:"image__src",name:"Image Source",type:"string",required:!1,description:"Primary image source URL",twigOnly:!0},imageAlt:{twigProp:"image__alt",name:"Image Alt Text",type:"string",required:!1,description:"Alternative text for accessibility",twigOnly:!0},imageSrcset:{twigProp:"image__srcset",name:"Image Srcset",type:"array",required:!1,description:"Responsive image source set for different viewport sizes",twigOnly:!0}},g={title:"Molecules/Quotes/Quote Callout",tags:["!dev"],argTypes:m(o),args:{..._(o),quote:t.quote_callout__quote,attribution:t.quote_callout__attribution}},e=({quote:a,attribution:i,style:r,quoteAlignment:l,accentTheme:u,quoteImage:n})=>`
  ${s({quote_callout__quote:a,quote_callout__attribution:i,quote_callout__style:r,quote_callout__quote_alignment:l,quote_callout__accent_theme:u,quote_callout__quote_image:n,...c.responsive_images["1x1"]})}
`;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  quote,
  attribution,
  style,
  quoteAlignment,
  accentTheme,
  quoteImage
}) => \`
  \${quoteCalloutTwig({
  quote_callout__quote: quote,
  quote_callout__attribution: attribution,
  quote_callout__style: style,
  quote_callout__quote_alignment: quoteAlignment,
  quote_callout__accent_theme: accentTheme,
  quote_callout__quote_image: quoteImage,
  ...imageData.responsive_images['1x1']
})}
\``,...e.parameters?.docs?.source}}};const p=["QuoteCallout"],h=Object.freeze(Object.defineProperty({__proto__:null,QuoteCallout:e,__namedExportsOrder:p,default:g},Symbol.toStringTag,{value:"Module"}));export{h as Q,e as a,o as c};
//# sourceMappingURL=quote-callout.stories-Bf_0unJv.js.map
