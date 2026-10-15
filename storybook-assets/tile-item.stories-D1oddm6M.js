import{a6 as d}from"../iframe.js";import{t}from"./tile-item-BjvK6QUi.js";import{i as g}from"./image-CSdbOboU.js";import{t as h,a as u}from"./component-props-De-d7Djp.js";const i={content:{twigProp:"tile__item__content",name:"Content",type:"string",required:!0,description:"Main content text for the tile (supports HTML)",control:"text"},heading:{twigProp:"tile__item__heading",name:"Heading",type:"string",required:!1,description:"Large heading text (used with 'heading' presentation style)",control:"text"},contentLink:{twigProp:"tile__item__content_link",name:"Content Link",type:"string",required:!1,description:"URL to make the entire tile clickable",control:"text"},presentationStyle:{twigProp:"tile__item__presentation_style",name:"Presentation Style",type:"select",required:!1,description:"Visual style: 'heading', 'icon', or 'text-only'",default:"heading",options:["heading","icon","text-only"],control:"select"},alignment:{twigProp:"tile__item__alignment",name:"Alignment",type:"select",required:!1,description:"Text alignment: 'left', 'center', or 'right'",default:"left",options:["left","center","right"],control:"select",labels:{left:"Left",center:"Center",right:"Right"}},verticalAlignment:{twigProp:"tile__item__vertical_alignment",name:"Content Position",type:"select",required:!1,description:"Vertical content position: 'top' or 'bottom'",default:"top",options:["top","bottom"],control:"select",labels:{top:"Top",bottom:"Bottom"}},themeColor:{twigProp:"tile__item__theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Component theme from the color dial",detail:`Applies a color theme to the tile item. Options are derived from the component-themes design tokens. Maps to tile__item__theme.
`,default:"one",options:["one","two","three","four","five","six"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},image:{twigProp:"tile__item__bg_image",name:"With Image",type:"boolean",required:!1,description:"Display a background image behind the tile content",detail:`When true, passes 'true' to tile__item__bg_image in the Twig template to display a background image behind the tile.
`,default:!1,control:"boolean"},withAnimation:{twigProp:"tile__item__animation",name:"Enable Animation",type:"boolean",required:!1,description:"Enable hover animation on the tile",detail:`When true, passes 'true' to tile__item__animation in the Twig template to enable hover animation.
`,default:!1,control:"boolean"},iconName:{twigProp:"tile__item__icon_name",name:"Icon Name",type:"string",required:!1,description:"Icon identifier (used with 'icon' presentation style, e.g., 'sack-dollar-solid')",control:"text"}},f={title:"Molecules/Tile Item",tags:["!dev"],parameters:{layout:"fullscreen"},argTypes:u(i),args:{...h(i),content:t.tile__item__content,heading:t.tile__item__heading,contentLink:"https://www.yale.edu"}},e=({content:n,heading:o,contentLink:a,presentationStyle:l,alignment:_,verticalAlignment:r,themeColor:s,image:m,withAnimation:c,iconName:p})=>`
  <div class="tiles" data-component-grid-count='three' data-component-width="site">
    <div class='tiles__inner'>
      <ul class='tiles__wrap'>
        ${d({tile__item__heading:o,tile__item__content:n,tile__item__content_link:a,tile__item__presentation_style:l,tile__item__alignment:_,tile__item__vertical_alignment:r,tile__item__theme:s,tile__item__bg_image:m?"true":"false",...g.responsive_images["1x1"],tile__item__animation:c?"true":"false",tile__item__icon_name:p})}
      </ul>
    </div>
  </div>
`;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  content,
  heading,
  contentLink,
  presentationStyle,
  alignment,
  verticalAlignment,
  themeColor,
  image,
  withAnimation,
  iconName
}) => \`
  <div class="tiles" data-component-grid-count='three' data-component-width="site">
    <div class='tiles__inner'>
      <ul class='tiles__wrap'>
        \${tileItemTwig({
  tile__item__heading: heading,
  tile__item__content: content,
  tile__item__content_link: contentLink,
  tile__item__presentation_style: presentationStyle,
  tile__item__alignment: alignment,
  tile__item__vertical_alignment: verticalAlignment,
  tile__item__theme: themeColor,
  tile__item__bg_image: image ? 'true' : 'false',
  ...imageData.responsive_images['1x1'],
  tile__item__animation: withAnimation ? 'true' : 'false',
  tile__item__icon_name: iconName
})}
      </ul>
    </div>
  </div>
\``,...e.parameters?.docs?.source}}};const y=["TileItem"],x=Object.freeze(Object.defineProperty({__proto__:null,TileItem:e,__namedExportsOrder:y,default:f},Symbol.toStringTag,{value:"Module"}));export{x as T,e as a,i as c};
//# sourceMappingURL=tile-item.stories-D1oddm6M.js.map
