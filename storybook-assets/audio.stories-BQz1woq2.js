import{C as s}from"../iframe.js";import{a as r}from"./audio-LH1Hxl4f.js";import{t as d,a as c}from"./component-props-De-d7Djp.js";const o={content:{twigProp:"audio_embed__content",name:"Content",type:"string",required:!1,description:`Optional text shown above the player, such as a short label or description of the audio file.
`,control:"text"},url:{twigProp:"audio_embed__url",name:"Audio URL",type:"string",required:!0,description:`URL of the audio file used by the default player source. In Drupal the source is supplied by the block's media field instead of this value.
`,control:"text"},transcript:{twigProp:"audio_embed__transcript",name:"Transcript",type:"string",required:!1,description:`Optional transcript of the audio, as rich text. It renders below the player as page text, styled like the Video description, under a "Transcript" button that shows and hides it, so people who cannot hear the audio can still get its content without playing it. In Drupal it comes from the Audio block's Transcription field.
`,control:"text"}},u={title:"Molecules/Audio Player",tags:["!dev"],argTypes:c(o),args:{...d(o),content:r.audio_embed__content,url:r.audio_embed__url,transcript:""},parameters:{docs:{description:{component:"Storybook Definition."}}}},t=({content:a,url:i,transcript:n})=>s({audio_embed__content:a,audio_embed__url:i,audio_embed__transcript:n}),e=t.bind({});e.storyName="With Transcript";e.args={transcript:r.audio_embed__transcript};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  content,
  url,
  transcript
}) => audioEmbedTwig({
  audio_embed__content: content,
  audio_embed__url: url,
  audio_embed__transcript: transcript
})`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  content,
  url,
  transcript
}) => audioEmbedTwig({
  audio_embed__content: content,
  audio_embed__url: url,
  audio_embed__transcript: transcript
})`,...e.parameters?.docs?.source}}};const p=["audioEmbed","audioEmbedWithTranscript"],b=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:p,audioEmbed:t,audioEmbedWithTranscript:e,default:u},Symbol.toStringTag,{value:"Module"}));export{b as A,t as a,e as b,o as c};
//# sourceMappingURL=audio.stories-BQz1woq2.js.map
