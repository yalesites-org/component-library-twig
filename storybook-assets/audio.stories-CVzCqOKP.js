import{f as i}from"../iframe.js";import{a as o}from"./audio-DnZN_Tx8.js";import{t as n,a as d}from"./component-props-De-d7Djp.js";const t={content:{twigProp:"audio_embed__content",name:"Content",type:"string",required:!1,description:`Optional text shown above the player, such as a short label or description of the audio file.
`,control:"text"},url:{twigProp:"audio_embed__url",name:"Audio URL",type:"string",required:!0,description:`URL of the audio file used by the default player source. In Drupal the source is supplied by the block's media field instead of this value.
`,control:"text"}},s={title:"Atoms/Audio Player",tags:["!dev"],argTypes:d(t),args:{...n(t),content:o.audio_embed__content,url:o.audio_embed__url},parameters:{docs:{description:{component:"Storybook Definition."}}}},e=({content:r,url:a})=>i({audio_embed__content:r,audio_embed__url:a});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  content,
  url
}) => audioEmbedTwig({
  audio_embed__content: content,
  audio_embed__url: url
})`,...e.parameters?.docs?.source}}};const u=["audioEmbed"],p=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:u,audioEmbed:e,default:s},Symbol.toStringTag,{value:"Module"}));export{p as A,e as a,t as c};
//# sourceMappingURL=audio.stories-CVzCqOKP.js.map
