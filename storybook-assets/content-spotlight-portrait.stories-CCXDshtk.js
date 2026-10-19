import{ai as h}from"../iframe.js";import{i as m}from"./image-CSdbOboU.js";import{c as t}from"./content-spotlight-portrait-vcAuUMC2.js";import{t as d,a as u}from"./component-props-De-d7Djp.js";const e={componentTheme:{twigProp:"content_spotlight_portrait__theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Component theme from color dial",default:"default",options:["default","one","two","three","four","five","six"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},position:{twigProp:"content_spotlight_portrait__position",name:"Image Position",type:"select",required:!1,description:"Image position: image-left or image-right",default:"image-left",options:["image-left","image-right"],control:"select",labels:{"image-left":"Image Left","image-right":"Image Right"}},contentVerticalAlignment:{twigProp:"content_spotlight_portrait__vertical_align",name:"Content Vertical Alignment",type:"select",required:!1,description:"Vertical alignment of content: top, middle, or bottom",default:"middle",options:["top","middle","bottom"],control:"select",labels:{top:"Top",middle:"Middle",bottom:"Bottom"}},imageStyle:{twigProp:"content_spotlight_portrait__style",name:"Image Style",type:"select",required:!1,description:"Image style: inline or offset",default:"inline",options:["inline","offset"],control:"select",labels:{inline:"Inline",offset:"Offset"}},overline:{twigProp:"content_spotlight_portrait__overline",name:"Overline",type:"string",required:!1,description:"Optional overline text above heading",control:"text"},heading:{twigProp:"content_spotlight_portrait__heading",name:"Heading",type:"string",required:!0,description:"The main heading text",control:"text"},subheading:{twigProp:"content_spotlight_portrait__subheading",name:"Subheading",type:"string",required:!1,description:"Optional subheading text",control:"text"},text:{twigProp:"content_spotlight_portrait__text",name:"Text",type:"string",required:!1,description:"Body text content",control:"text"},linkContent:{twigProp:"content_spotlight_portrait__link__content",name:"Link Content",type:"string",required:!1,description:"Primary link text",control:"text"},linkTwoContent:{twigProp:"content_spotlight_portrait__link_two__content",name:"Second Link Content",type:"string",required:!1,description:"Secondary link text",control:"text"},caption:{twigProp:"content_spotlight_portrait__caption",name:"Caption",type:"string",required:!1,description:"Image caption text",control:"text"}},f={title:"Organisms/Content Spotlight/Content Spotlight Portrait",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:u(e),args:{...d(e),heading:t.content_spotlight_portrait__heading,subheading:t.content_spotlight_portrait__subheading,text:t.content_spotlight_portrait__text,linkContent:t.content_spotlight_portrait__link__content,linkTwoContent:t.content_spotlight_portrait__link_two__content,caption:t.content_spotlight_portrait__caption}},o=({position:n,contentVerticalAlignment:i,overline:r,heading:_,subheading:a,text:l,linkContent:p,linkTwoContent:s,componentTheme:g,imageStyle:c})=>h({...m.responsive_images["2x3"],content_spotlight_portrait__theme:g,content_spotlight_portrait__position:n,content_spotlight_portrait__vertical_align:i,content_spotlight_portrait__style:c,content_spotlight_portrait__overline:r,content_spotlight_portrait__heading:_,content_spotlight_portrait__subheading:a,content_spotlight_portrait__text:l,content_spotlight_portrait__link__content:p,content_spotlight_portrait__link__url:t.content_spotlight_portrait__link__url,content_spotlight_portrait__link_two__content:s,content_spotlight_portrait__link_two__url:t.content_spotlight_portrait__link_two__url,content_spotlight_portrait__caption:t.content_spotlight_portrait__caption});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  position,
  contentVerticalAlignment,
  overline,
  heading,
  subheading,
  text,
  linkContent,
  linkTwoContent,
  componentTheme,
  imageStyle
}) => contentSpotlightPortraitTwig({
  ...imageData.responsive_images['2x3'],
  content_spotlight_portrait__theme: componentTheme,
  content_spotlight_portrait__position: position,
  content_spotlight_portrait__vertical_align: contentVerticalAlignment,
  content_spotlight_portrait__style: imageStyle,
  content_spotlight_portrait__overline: overline,
  content_spotlight_portrait__heading: heading,
  content_spotlight_portrait__subheading: subheading,
  content_spotlight_portrait__text: text,
  content_spotlight_portrait__link__content: linkContent,
  content_spotlight_portrait__link__url: contentSpotlightPortraitData.content_spotlight_portrait__link__url,
  content_spotlight_portrait__link_two__content: linkTwoContent,
  content_spotlight_portrait__link_two__url: contentSpotlightPortraitData.content_spotlight_portrait__link_two__url,
  content_spotlight_portrait__caption: contentSpotlightPortraitData.content_spotlight_portrait__caption
})`,...o.parameters?.docs?.source}}};const x=["ContentSpotlightPortrait"],S=Object.freeze(Object.defineProperty({__proto__:null,ContentSpotlightPortrait:o,__namedExportsOrder:x,default:f},Symbol.toStringTag,{value:"Module"}));export{S as C,o as a,e as c};
//# sourceMappingURL=content-spotlight-portrait.stories-CCXDshtk.js.map
