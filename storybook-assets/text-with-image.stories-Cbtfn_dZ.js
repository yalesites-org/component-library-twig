import{ah as d}from"../iframe.js";import{i as w}from"./image-CSdbOboU.js";import{t}from"./text-with-image-C3X7Zdec.js";import{t as x,a as u}from"./component-props-De-d7Djp.js";const i={componentTheme:{twigProp:"text_with_image__theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Component theme from color dial",default:"default",options:["default","one","two","three","four","five","six"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},width:{twigProp:"text_with_image__width",name:"Image Size",type:"select",required:!1,description:"Component width: site or highlight",default:"site",options:["site","highlight"],control:"select",labels:{site:"Large",highlight:"Medium"}},position:{twigProp:"text_with_image__position",name:"Image Position",type:"select",required:!1,description:"Image position: image-left or image-right",default:"image-left",options:["image-left","image-right"],control:"select",labels:{"image-left":"Image Left","image-right":"Image Right"}},contentVerticalAlignment:{twigProp:"text_with_image__vertical_align",name:"Content Vertical Alignment",type:"select",required:!1,description:"Vertical alignment of content: top, middle, or bottom",default:"top",options:["top","middle","bottom"],control:"select",labels:{top:"Top",middle:"Middle",bottom:"Bottom"}},imageStyle:{twigProp:"text_with_image__style",name:"Image Style",type:"select",required:!1,description:"Image style: inline or offset",default:"inline",options:["inline","offset"],control:"select",labels:{inline:"Inline",offset:"Offset"}},focus:{twigProp:"text_with_image__focus",name:"Focus",type:"select",required:!1,description:"Content focus emphasis: image or equal",default:"equal",options:["equal","image"],control:"select",labels:{equal:"Equal Focus",image:"Image Focus"}},overline:{twigProp:"text_with_image__overline",name:"Overline",type:"string",required:!1,description:"Optional overline text above heading",control:"text"},heading:{twigProp:"text_with_image__heading",name:"Heading",type:"string",required:!0,description:"The main heading text",control:"text"},subheading:{twigProp:"text_with_image__subheading",name:"Subheading",type:"string",required:!1,description:"Optional subheading text",control:"text"},text:{twigProp:"text_with_image__text",name:"Text",type:"string",required:!1,description:"Body text content",control:"text"},linkContent:{twigProp:"text_with_image__link__content",name:"Link Content",type:"string",required:!1,description:"Primary link text",control:"text"},linkTwoContent:{twigProp:"text_with_image__link_two__content",name:"Second Link Content",type:"string",required:!1,description:"Secondary link text",control:"text"},caption:{twigProp:"text_with_image__caption",name:"Caption",type:"string",required:!1,description:"Image caption text",control:"text"}},f={title:"Organisms/Content Spotlight/Content Spotlight Landscape",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:u(i),args:{...x(i),heading:t.text_with_image__heading,subheading:t.text_with_image__subheading,text:t.text_with_image__text,linkContent:t.text_with_image__link__content,linkTwoContent:t.text_with_image__link_two__content,caption:t.text_with_image__caption}},e=({width:n,position:_,contentVerticalAlignment:o,focus:a,overline:l,heading:g,subheading:r,text:m,linkContent:s,linkTwoContent:h,componentTheme:c,imageStyle:p})=>d({...w.responsive_images["3x2"],text_with_image__theme:c,text_with_image__width:n,text_with_image__position:_,text_with_image__vertical_align:o,text_with_image__style:p,text_with_image__focus:a,text_with_image__overline:l,text_with_image__heading:g,text_with_image__subheading:r,text_with_image__text:m,text_with_image__link__content:s,text_with_image__link__url:t.text_with_image__link__url,text_with_image__link_two__content:h,text_with_image__link_two__url:t.text_with_image__link_two__url,text_with_image__caption:t.text_with_image__caption});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  width,
  position,
  contentVerticalAlignment,
  focus,
  overline,
  heading,
  subheading,
  text,
  linkContent,
  linkTwoContent,
  componentTheme,
  imageStyle
}) => textWithImageTwig({
  ...imageData.responsive_images['3x2'],
  text_with_image__theme: componentTheme,
  text_with_image__width: width,
  text_with_image__position: position,
  text_with_image__vertical_align: contentVerticalAlignment,
  text_with_image__style: imageStyle,
  text_with_image__focus: focus,
  text_with_image__overline: overline,
  text_with_image__heading: heading,
  text_with_image__subheading: subheading,
  text_with_image__text: text,
  text_with_image__link__content: linkContent,
  text_with_image__link__url: textWithImageData.text_with_image__link__url,
  text_with_image__link_two__content: linkTwoContent,
  text_with_image__link_two__url: textWithImageData.text_with_image__link_two__url,
  text_with_image__caption: textWithImageData.text_with_image__caption
})`,...e.parameters?.docs?.source}}};const y=["ContentSpotlightLandscape"],S=Object.freeze(Object.defineProperty({__proto__:null,ContentSpotlightLandscape:e,__namedExportsOrder:y,default:f},Symbol.toStringTag,{value:"Module"}));export{S as C,e as a,i as c};
//# sourceMappingURL=text-with-image.stories-Cbtfn_dZ.js.map
