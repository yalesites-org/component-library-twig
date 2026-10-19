import{K as t}from"../iframe.js";import{f as n}from"./facts-and-figures-CApwGuuq.js";import{t as r,a as i}from"./component-props-De-d7Djp.js";const e={stat:{twigProp:"facts_and_figures__stat",name:"Statistic",type:"string",required:!0,description:"The statistic text displayed as the primary fact",controlDefault:"$52,000",control:"text",detail:`The primary statistic displayed in the component (e.g., "42%", "$1.2M").
`}},c={title:"Molecules/Facts and Figures",tags:["!dev"],argTypes:i(e),args:r(e)},a=({stat:s})=>`
  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type="single">
    ${t({facts_and_figures__stat:s,facts_and_figures__content:n.facts_and_figures__content,facts_and_figures__presentation_style:"basic",facts_and_figures__has_icon:"false",facts_and_figures__alignment:"center"})}
    ${t({facts_and_figures__stat:s,facts_and_figures__presentation_style:"basic",facts_and_figures__has_icon:"true",facts_and_figures__alignment:"left"})}
    ${t({facts_and_figures__stat:s,facts_and_figures__content:n.facts_and_figures__content,facts_and_figures__presentation_style:"basic",facts_and_figures__alignment:"center",facts_and_figures__has_icon:"true"})}
  </ul>
`,_=({stat:s})=>`
  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type="single">
    ${t({facts_and_figures__stat:s,facts_and_figures__content:n.facts_and_figures__content,facts_and_figures__presentation_style:"basic",facts_and_figures__has_icon:"false",facts_and_figures__alignment:"center"})}
    ${t({facts_and_figures__stat:s,facts_and_figures__presentation_style:"basic",facts_and_figures__has_icon:"true",facts_and_figures__alignment:"left"})}
    ${t({facts_and_figures__stat:s,facts_and_figures__content:n.facts_and_figures__content,facts_and_figures__presentation_style:"basic",facts_and_figures__alignment:"center",facts_and_figures__has_icon:"true"})}
  </ul>
`;a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  stat
}) => \`
  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type="single">
    \${factsAndFiguresTwig({
  facts_and_figures__stat: stat,
  facts_and_figures__content: factsAndFiguresData.facts_and_figures__content,
  facts_and_figures__presentation_style: 'basic',
  facts_and_figures__has_icon: 'false',
  facts_and_figures__alignment: 'center'
})}
    \${factsAndFiguresTwig({
  facts_and_figures__stat: stat,
  facts_and_figures__presentation_style: 'basic',
  facts_and_figures__has_icon: 'true',
  facts_and_figures__alignment: 'left'
})}
    \${factsAndFiguresTwig({
  facts_and_figures__stat: stat,
  facts_and_figures__content: factsAndFiguresData.facts_and_figures__content,
  facts_and_figures__presentation_style: 'basic',
  facts_and_figures__alignment: 'center',
  facts_and_figures__has_icon: 'true'
})}
  </ul>
\``,...a.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`({
  stat
}) => \`
  <ul class='facts-and-figures__group__wrap' data-facts-and-figures-collection-type="single">
    \${factsAndFiguresTwig({
  facts_and_figures__stat: stat,
  facts_and_figures__content: factsAndFiguresData.facts_and_figures__content,
  facts_and_figures__presentation_style: 'basic',
  facts_and_figures__has_icon: 'false',
  facts_and_figures__alignment: 'center'
})}
    \${factsAndFiguresTwig({
  facts_and_figures__stat: stat,
  facts_and_figures__presentation_style: 'basic',
  facts_and_figures__has_icon: 'true',
  facts_and_figures__alignment: 'left'
})}
    \${factsAndFiguresTwig({
  facts_and_figures__stat: stat,
  facts_and_figures__content: factsAndFiguresData.facts_and_figures__content,
  facts_and_figures__presentation_style: 'basic',
  facts_and_figures__alignment: 'center',
  facts_and_figures__has_icon: 'true'
})}
  </ul>
\``,..._.parameters?.docs?.source}}};const f=["Interactive","FactsAndFigures"],o=Object.freeze(Object.defineProperty({__proto__:null,FactsAndFigures:_,Interactive:a,__namedExportsOrder:f,default:c},Symbol.toStringTag,{value:"Module"}));export{o as F,a as I,e as c};
//# sourceMappingURL=facts-and-figures.stories-C_i0SUoM.js.map
