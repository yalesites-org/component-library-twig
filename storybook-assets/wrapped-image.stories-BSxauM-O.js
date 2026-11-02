import{x as s,a7 as p}from"../iframe.js";import{i as l}from"./image-CSdbOboU.js";import{W as t}from"./wrapped-image-BbfWttG9.js";import{t as g,a as m}from"./component-props-De-d7Djp.js";const a={caption:{twigProp:"wrapped_image__caption",name:"Caption",type:"string",required:!1,description:"Caption text displayed below the image (supports HTML)",control:"text"},imageAlignment:{twigProp:"wrapped_image__alignment",name:"Image Position",type:"select",required:!1,description:"Position of the image within the text content flow",default:"left",options:["left","right"],control:"select",labels:{left:"Image Left",right:"Image Right"}},imageStyle:{twigProp:"wrapped_image__style",name:"Image Style",type:"select",required:!1,description:"Visual style controlling how the image sits relative to the content column",default:"floated",options:["floated","offset"],control:"select",labels:{floated:"Inline",offset:"Offset"}},imageSize:{twigProp:"wrapped_image__size",name:"Image Size",type:"select",required:!1,description:"Width of the image on large screens. Large is half the block width; Small is a quarter, for headshots, book covers and other narrow photos. On phones both sizes fill the screen width.",default:"large",options:["large","small"],control:"select",labels:{large:"Large",small:"Small"}}},_={title:"Molecules/Wrapped Image",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:m(a),args:g(a)},e=({caption:i,imageAlignment:o,imageStyle:n,imageSize:r})=>`
  ${s({text_field__content:t.text_one,text_field__width:"site",text_field__alignment:"left"})}
  ${p({...l.responsive_images["3x2"],wrapped_image__caption:i,wrapped_image__alignment:o,wrapped_image__style:n,wrapped_image__size:r,wrapped_image__content:t.text_two})}
`;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  caption,
  imageAlignment,
  imageStyle,
  imageSize
}) => \`
  \${textFieldTwig({
  text_field__content: WrappedImageData.text_one,
  text_field__width: 'site',
  text_field__alignment: 'left'
})}
  \${wrappedImageTwig({
  ...imageData.responsive_images['3x2'],
  wrapped_image__caption: caption,
  wrapped_image__alignment: imageAlignment,
  wrapped_image__style: imageStyle,
  wrapped_image__size: imageSize,
  wrapped_image__content: WrappedImageData.text_two
})}
\``,...e.parameters?.docs?.source}}};const d=["WrappedImage"],u=Object.freeze(Object.defineProperty({__proto__:null,WrappedImage:e,__namedExportsOrder:d,default:_},Symbol.toStringTag,{value:"Module"}));export{u as W,e as a,a as c};
//# sourceMappingURL=wrapped-image.stories-BSxauM-O.js.map
