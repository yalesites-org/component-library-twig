import{K as i}from"../iframe.js";import{c as t}from"./custom-card-ChKUw6IK.js";import{i as n}from"./image-CSdbOboU.js";import{t as d,a as l}from"./component-props-De-d7Djp.js";const a={heading:{twigProp:"custom_card__heading",name:"Heading",type:"string",required:!0,description:"The heading text for the card",control:"text"},snippet:{twigProp:"custom_card__snippet",name:"Snippet",type:"string",required:!1,description:"Descriptive text content displayed below the heading (supports HTML)",control:"text"},withImage:{twigProp:"custom_card__image",name:"With Image",type:"boolean",required:!1,description:"Whether to display an image with the card",default:!0,control:"boolean"},cardSize:{name:"Card Size",type:"select",required:!1,description:"Size of the collection the card sits in",detail:`Controls the data-card-size attribute on the card collection wrapper. This is a Storybook-only UI toggle, it is not a direct Twig prop on the card template itself.
`,default:"small",options:["small","large"],control:"select"}},m={title:"Molecules/Cards",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:l(a),args:{...d(a),heading:t.custom_card__heading,snippet:t.custom_card__snippet}},e=({heading:o,snippet:s,withImage:r,cardSize:c})=>`
  <div class='custom-card-collection' data-component-width='site' data-card-size="${c}">
    <div class='custom-card-collection__inner'>
      <ul class='custom-card-collection__cards'>
        ${i({...n.responsive_images["3x2"],custom_card__heading:o,custom_card__snippet:s,custom_card__url:"https://google.com",custom_card__image:r?"true":"false"})}
      </ul>
    </div>
  </div>
`;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  heading,
  snippet,
  withImage,
  cardSize
}) => \`
  <div class='custom-card-collection' data-component-width='site' data-card-size="\${cardSize}">
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
\``,...e.parameters?.docs?.source}}};const p=["customCard"],f=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:p,customCard:e,default:m},Symbol.toStringTag,{value:"Module"}));export{f as C,a,e as c};
//# sourceMappingURL=custom-card.stories-Fvo1jfk3.js.map
