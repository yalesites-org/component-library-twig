import{F as s,t as p}from"../iframe.js";import{t as k,a as m}from"./component-props-De-d7Djp.js";import{c as l}from"./callout-DOxxCQ-N.js";import{i as g}from"./image-CSdbOboU.js";const d={heading:{twigProp:"callout__heading",name:"Heading",type:"string",required:!1,description:"Heading text for each callout item",control:"text"},text:{twigProp:"callout__text",name:"Text",type:"string",required:!1,description:"Body text for each callout item",control:"text"},linkText:{twigProp:"callout__link__content",name:"Link Text",type:"string",required:!1,description:"Text for the callout link",control:"text"},linkType:{twigProp:"callout__link__type",name:"Link Type",type:"select",required:!1,description:"Style of the callout link",default:"cta",options:["cta","link"],control:"select"},backgroundColor:{twigProp:"callout__background_color",name:"Callout Theme (dial)",type:"select",required:!1,description:"Color theme applied to the callout component",detail:`Applies a color theme to the callout component. The available options are derived from the component-themes token set. Maps to the callout__background_color Twig variable.
`,default:"one",options:["one","two","three","four","five","six"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},calloutAlignment:{twigProp:"callout__alignment",name:"Callout Alignment",type:"select",required:!1,description:"Horizontal alignment of callout content",default:"center",options:["left","center"],control:"select",labels:{left:"Left",center:"Center"}},overlayBackgroundImage:{twigProp:"callout__overlay_background_image",name:"Overlay Background Image",type:"boolean",required:!1,description:"Show a background image overlay on the callout",default:!1,control:"boolean"}},y=Object.keys(p["component-themes"]),u=m(d);u.backgroundColor={...u.backgroundColor,options:y};const h={title:"Molecules/Callout",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:u,args:{...k(d),heading:l.callout__heading,text:l.callout__text,linkText:l.callout__link__content,linkType:l.callout__link__type}},t=({heading:a,text:n,linkText:_,linkType:e,backgroundColor:c,calloutAlignment:r,overlayBackgroundImage:i})=>s({callout__background_color:c,callout__alignment:r,callout__overlay_background_image:i?g.responsive_images.pattern:"",callouts:[{callout__heading:a,callout__text:n,callout__link__content:_,callout__link__url:l.callout__link__url,callout__link__type:e}]});t.tags=["!dev"];const o=({heading:a,text:n,linkText:_,linkType:e,backgroundColor:c,calloutAlignment:r,overlayBackgroundImage:i})=>s({callout__background_color:c,callout__alignment:r,callout__overlay_background_image:i?g.responsive_images.pattern:"",callouts:[{callout__heading:a,callout__text:n,callout__link__content:_,callout__link__url:l.callout__link__url,callout__link__type:e},{callout__heading:l.callout__heading,callout__text:l.callout__text,callout__link__content:l.callout__link__content,callout__link__url:l.callout__link__url,callout__link__type:e}]});o.tags=["!dev"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  heading,
  text,
  linkText,
  linkType,
  backgroundColor,
  calloutAlignment,
  overlayBackgroundImage
}) => calloutTwig({
  callout__background_color: backgroundColor,
  callout__alignment: calloutAlignment,
  callout__overlay_background_image: overlayBackgroundImage ? imageData.responsive_images.pattern : '',
  callouts: [{
    callout__heading: heading,
    callout__text: text,
    callout__link__content: linkText,
    callout__link__url: calloutData.callout__link__url,
    callout__link__type: linkType
  }]
})`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  heading,
  text,
  linkText,
  linkType,
  backgroundColor,
  calloutAlignment,
  overlayBackgroundImage
}) => calloutTwig({
  callout__background_color: backgroundColor,
  callout__alignment: calloutAlignment,
  callout__overlay_background_image: overlayBackgroundImage ? imageData.responsive_images.pattern : '',
  callouts: [{
    callout__heading: heading,
    callout__text: text,
    callout__link__content: linkText,
    callout__link__url: calloutData.callout__link__url,
    callout__link__type: linkType
  }, {
    callout__heading: calloutData.callout__heading,
    callout__text: calloutData.callout__text,
    callout__link__content: calloutData.callout__link__content,
    callout__link__url: calloutData.callout__link__url,
    callout__link__type: linkType
  }]
})`,...o.parameters?.docs?.source}}};const x=["CalloutSingle","CalloutDouble"],C=Object.freeze(Object.defineProperty({__proto__:null,CalloutDouble:o,CalloutSingle:t,__namedExportsOrder:x,default:h},Symbol.toStringTag,{value:"Module"}));export{C,t as a,o as b,d as c};
//# sourceMappingURL=callout.stories-KKDiNaQW.js.map
