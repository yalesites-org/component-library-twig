import{$ as n}from"../iframe.js";import{p as e}from"./pull-quote-CX15qdpZ.js";import{t as s,a as i}from"./component-props-De-d7Djp.js";const o={quote:{twigProp:"pull_quote__quote",name:"Quote",type:"string",required:!0,description:"The quote text to display (supports HTML)",control:"text"},attribution:{twigProp:"pull_quote__attribution",name:"Attribution",type:"string",required:!1,description:"Attribution text for the quote (e.g., author name, source)",control:"text"},style:{twigProp:"pull_quote__style",name:"Style",type:"select",required:!1,description:"Visual style: 'bar-left', 'bar-right', or 'quote-left'",default:"bar-left",options:["bar-left","bar-right","quote-left"],control:"select",labels:{"bar-left":"Bar Left","bar-right":"Bar Right","quote-left":"Quote Left"}},accentTheme:{twigProp:"pull_quote__accent_theme",name:"Accent Theme",type:"select",required:!1,description:"Accent color theme: 'one', 'two', or 'three'",default:"one",options:["one","two","three"],control:"select"}},p={title:"Molecules/Quotes/Pull Quote",tags:["!dev"],argTypes:i(o),args:{...s(o),quote:e.pull_quote__quote,attribution:e.pull_quote__attribution}},t=({quote:u,attribution:r,style:l,accentTheme:a})=>`
  ${n({pull_quote__quote:u,pull_quote__attribution:r,pull_quote__style:l,pull_quote__accent_theme:a})}
`;t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  quote,
  attribution,
  style,
  accentTheme
}) => \`
  \${pullQuoteTwig({
  pull_quote__quote: quote,
  pull_quote__attribution: attribution,
  pull_quote__style: style,
  pull_quote__accent_theme: accentTheme
})}
\``,...t.parameters?.docs?.source}}};const _=["pullQuote"],b=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:_,default:p,pullQuote:t},Symbol.toStringTag,{value:"Module"}));export{b as P,o as c,t as p};
//# sourceMappingURL=pull-quote.stories-tkkSS2Xo.js.map
