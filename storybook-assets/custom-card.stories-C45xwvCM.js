import{G as i}from"../iframe.js";import{c as t}from"./custom-card-ChKUw6IK.js";import{i as n}from"./image-CSdbOboU.js";import{t as d,a as l}from"./component-props-De-d7Djp.js";const o={heading:{twigProp:"custom_card__heading",name:"Heading",type:"string",required:!0,description:"The heading text for the card",control:"text"},snippet:{twigProp:"custom_card__snippet",name:"Snippet",type:"string",required:!1,description:"Descriptive text content displayed below the heading (supports HTML)",control:"text"},withImage:{twigProp:"custom_card__image",name:"With Image",type:"boolean",required:!1,description:"Whether to display an image with the card",default:!0,control:"boolean"},featured:{name:"Featured",type:"boolean",required:!1,description:"Whether the collection displays cards in a featured layout style",detail:`Controls the data-collection-featured attribute on the card collection wrapper. This is a Storybook-only UI toggle — it is not a direct Twig prop on the card template itself.
`,default:!0,control:"boolean"}},p={title:"Molecules/Cards",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:l(o),args:{...d(o),heading:t.custom_card__heading,snippet:t.custom_card__snippet}},e=({heading:a,snippet:r,withImage:s,featured:c})=>`
  <div class='custom-card-collection' data-component-width='site' data-collection-featured="${c}">
    <div class='custom-card-collection__inner'>
      <ul class='custom-card-collection__cards'>
        ${i({...n.responsive_images["3x2"],custom_card__heading:a,custom_card__snippet:r,custom_card__url:"https://google.com",custom_card__image:s?"true":"false"})}
      </ul>
    </div>
  </div>
`;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  heading,
  snippet,
  withImage,
  featured
}) => \`
  <div class='custom-card-collection' data-component-width='site' data-collection-featured="\${featured}">
    <div class='custom-card-collection__inner'>
      <ul class='custom-card-collection__cards'>
        \${customCardTwig({
  ...imageData.responsive_images['3x2'],
  custom_card__heading: heading,
  custom_card__snippet: snippet,
  custom_card__url: 'https://google.com',
  custom_card__image: withImage ? 'true' : 'false'
})}
      </ul>
    </div>
  </div>
\``,...e.parameters?.docs?.source}}};const m=["customCard"],f=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:m,customCard:e,default:p},Symbol.toStringTag,{value:"Module"}));export{f as C,o as a,e as c};
//# sourceMappingURL=custom-card.stories-C45xwvCM.js.map
