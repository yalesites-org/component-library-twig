import{as as r}from"../iframe.js";import{t as m}from"./tiles-LBlF9d2I.js";import{i as _}from"./image-CSdbOboU.js";import{t as c,a as g}from"./component-props-De-d7Djp.js";const t={presentationStyle:{twigProp:"tiles__presentation_style",name:"Presentation Style",type:"select",required:!1,description:"Visual style for tile items",default:"heading",options:["heading","icon","text-only"],control:"select"},alignment:{twigProp:"tiles__alignment",name:"Alignment",type:"select",required:!1,description:"Horizontal alignment of content within each tile",default:"left",options:["left","center","right"],control:"select",labels:{left:"Left",center:"Center",right:"Right"}},verticalAlignment:{twigProp:"tiles__vertical_alignment",name:"Content Position",type:"select",required:!1,description:"Vertical positioning of content within tiles",default:"left",options:["top","bottom"],control:"select",labels:{top:"Top",bottom:"Bottom"}},columnCount:{twigProp:"tiles__grid_count",name:"Columns",type:"select",required:!1,description:"Number of columns in the tiles grid",default:"three",options:["two","three","four"],control:"select",labels:{two:"Two",three:"Three",four:"Four"}},image:{twigProp:"tiles__with__image",name:"With image",type:"boolean",required:!1,description:"Display background images on tiles",detail:`When true, passes 'true' to tiles__with__image in the Twig template to enable background image rendering on each tile.
`,default:!1,control:"boolean"},withAnimation:{twigProp:"tiles__with__animation",name:"Enable Animation",type:"boolean",required:!1,description:"Enable entrance animation effects on tiles",detail:`When true, passes 'true' to tiles__with__animation in the Twig template to enable CSS animation on tile items.
`,default:!1,control:"boolean"}},p={title:"Organisms/Tiles",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:g(t),args:{...c(t),verticalAlignment:"top"}},e=({presentationStyle:i,alignment:n,verticalAlignment:o,columnCount:a,image:l,withAnimation:s})=>`
    <div class="wrap-for-global-theme">
      ${r({tiles__alignment:n,tiles__vertical_alignment:o,tiles__presentation_style:i,tiles__grid_count:a,tiles__with__image:l?"true":"false",tiles__with__animation:s?"true":"false",...m,..._.responsive_images["1x1"]})}
    </div>
    `;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  presentationStyle,
  alignment,
  verticalAlignment,
  columnCount,
  image,
  withAnimation
}) => {
  return \`
    <div class="wrap-for-global-theme">
      \${tilesTwig({
    tiles__alignment: alignment,
    tiles__vertical_alignment: verticalAlignment,
    tiles__presentation_style: presentationStyle,
    tiles__grid_count: columnCount,
    tiles__with__image: image ? 'true' : 'false',
    tiles__with__animation: withAnimation ? 'true' : 'false',
    ...tilesData,
    ...imageData.responsive_images['1x1']
  })}
    </div>
    \`;
}`,...e.parameters?.docs?.source}}};const u=["Tiles"],b=Object.freeze(Object.defineProperty({__proto__:null,Tiles:e,__namedExportsOrder:u,default:p},Symbol.toStringTag,{value:"Module"}));export{b as T,e as a,t as c};
//# sourceMappingURL=tiles.stories-DO_OaCvp.js.map
