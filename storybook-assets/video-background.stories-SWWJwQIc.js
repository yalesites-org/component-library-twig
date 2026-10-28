import{B as r}from"../iframe.js";import{v as a}from"./yds-video-background-DBdAxhw8.js";import{t as d,a as s}from"./component-props-De-d7Djp.js";const t={videoContent:{twigProp:"video_background__content",name:"Video Content",type:"string",required:!0,description:"URL to the video file (MP4 format recommended)",detail:`URL to the video file used as the background. MP4 format with H.264 codec is recommended for best browser compatibility. This prop is provided via demo data and is not directly editable in the Controls panel.
`},sectionTheme:{twigProp:"data-section-theme",name:"Section Theme",type:"select",required:!1,description:"Background color theme for the layout section",default:"default",options:["default","one","two","three","four"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four"}}},n={title:"Atoms/Videos/Video Background",tags:["!dev"],argTypes:s(t),args:d(t),parameters:{docs:{description:{component:"Storybook Definition."}}}},e=({sectionTheme:i})=>`
  <div class="yds-layout" data-section-theme="${i}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${r(a)}
      </div>
    </div>
  </div>
`,o=()=>r(a);e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  sectionTheme
}) => \`
  <div class="yds-layout" data-section-theme="\${sectionTheme}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        \${videoBackgroundTwig(videoBackgroundData)}
      </div>
    </div>
  </div>
\``,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"() => videoBackgroundTwig(videoBackgroundData)",...o.parameters?.docs?.source}}};const c=["Interactive","videoBackground"],p=Object.freeze(Object.defineProperty({__proto__:null,Interactive:e,__namedExportsOrder:c,default:n,videoBackground:o},Symbol.toStringTag,{value:"Module"}));export{e as I,p as V,t as c};
//# sourceMappingURL=video-background.stories-SWWJwQIc.js.map
