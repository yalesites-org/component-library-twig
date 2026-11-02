import{y as t}from"../iframe.js";import{v as r}from"./yds-video-background-8dsmGWIF.js";import{t as i,a as c}from"./component-props-De-d7Djp.js";const n={videoContent:{twigProp:"video_background__content",name:"Video Content",type:"string",required:!0,description:"URL to the video file (MP4 format recommended)",detail:`URL to the video file used as the background. MP4 format with H.264 codec is recommended for best browser compatibility. This prop is provided via demo data and is not directly editable in the Controls panel.
`},sectionTheme:{twigProp:"data-section-theme",name:"Section Theme",type:"select",required:!1,description:"Background color theme for the layout section",default:"default",options:["default","one","two","three","four"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four"}},playback:{twigProp:"video_background__playback",name:"Video Playback",type:"select",required:!1,description:"Whether the video loops continuously or plays once and stops",detail:`"loop" (default) repeats the video until the visitor pauses it. "once" plays it one time and holds on the last frame; the play button restarts it. In Drupal this is the **Video Playback** field on the Image Banner and Grand Hero blocks, which banners pass down as a data-video-playback attribute.
`,default:"loop",options:["loop","once"],control:"select",labels:{loop:"Loop continuously",once:"Play once and stop"}}},l={title:"Atoms/Videos/Video Background",tags:["!dev"],argTypes:c(n),args:i(n),parameters:{docs:{description:{component:"Storybook Definition."}}}},o=({sectionTheme:s,playback:d})=>`
  <div class="yds-layout" data-section-theme="${s}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${t({...r,video_background__playback:d})}
      </div>
    </div>
  </div>
`,a=()=>t(r),e=()=>t({...r,video_background__playback:"once"});e.storyName="Play Once";o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  sectionTheme,
  playback
}) => \`
  <div class="yds-layout" data-section-theme="\${sectionTheme}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        \${videoBackgroundTwig({
  ...videoBackgroundData,
  video_background__playback: playback
})}
      </div>
    </div>
  </div>
\``,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"() => videoBackgroundTwig(videoBackgroundData)",...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => videoBackgroundTwig({
  ...videoBackgroundData,
  video_background__playback: 'once'
})`,...e.parameters?.docs?.source}}};const p=["Interactive","videoBackground","PlayOnce"],v=Object.freeze(Object.defineProperty({__proto__:null,Interactive:o,PlayOnce:e,__namedExportsOrder:p,default:l,videoBackground:a},Symbol.toStringTag,{value:"Module"}));export{o as I,e as P,v as V,n as c};
//# sourceMappingURL=video-background.stories-TOwASuIR.js.map
