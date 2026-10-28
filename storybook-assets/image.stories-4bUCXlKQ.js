import{M as g}from"../iframe.js";import{i as t}from"./image-CSdbOboU.js";import{t as _,a as m}from"./component-props-De-d7Djp.js";const i={src:{twigProp:"image__src",name:"Image Source",type:"string",required:!0,description:"Image source URL",control:"text"},alt:{twigProp:"image__alt",name:"Alt Text",type:"string",required:!0,description:"Alternative text for accessibility (required for all images)",control:"text"},caption:{twigProp:"content_image__caption",name:"Caption",type:"string",required:!1,description:"Caption text displayed below the image (supports HTML)",control:"text"},width:{twigProp:"content_image__width",name:"Width",type:"select",required:!1,description:"Width constraint: 'content' or 'site'",default:"content",options:["content","site"],control:"select"},srcset:{twigProp:"image__srcset",name:"Srcset",type:"string",required:!1,description:"Responsive image srcset for different viewport sizes",control:"text"},sizes:{twigProp:"image__sizes",name:"Sizes",type:"string",required:!1,description:"Sizes attribute for responsive images (defines image display width at different breakpoints)",control:"text"}},p={title:"Molecules/Image",tags:["!dev"],argTypes:m(i),args:{..._(i),src:t.responsive_images["16x9"].image__src,alt:t.responsive_images["16x9"].image__alt,srcset:t.responsive_images["16x9"].image__srcset,sizes:t.responsive_images["16x9"].image__sizes,caption:'This is the <a href="#">caption</a> for the 16:9 image above.'}},e=({src:s,alt:r,caption:a,width:o,srcset:n,sizes:c})=>`
  ${g({output_image_tag:!0,image__src:s,image__alt:r,image__srcset:n,image__sizes:c,content_image__caption:a,content_image__width:o})}
`;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  src,
  alt,
  caption,
  width,
  srcset,
  sizes
}) => \`
  \${contentImageTwig({
  output_image_tag: true,
  image__src: src,
  image__alt: alt,
  image__srcset: srcset,
  image__sizes: sizes,
  content_image__caption: caption,
  content_image__width: width
})}
\``,...e.parameters?.docs?.source}}};const l=["ContentImage"],w=Object.freeze(Object.defineProperty({__proto__:null,ContentImage:e,__namedExportsOrder:l,default:p},Symbol.toStringTag,{value:"Module"}));export{e as C,w as I,i as c};
//# sourceMappingURL=image.stories-4bUCXlKQ.js.map
