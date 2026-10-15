import{n,k as i,m as d}from"../iframe.js";import{s as l}from"./select-tqhwfG2e.js";import{t as c,a as m}from"./component-props-De-d7Djp.js";const s={sectionTheme:{twigProp:"data-section-theme",name:"Section Theme",type:"select",required:!1,description:"Background color theme for the layout section",default:"default",options:["default","one","two","three","four","five","six"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},buttonTheme:{twigProp:"buttonTheme",name:"Button Theme",type:"select",required:!1,description:"Theme color for the submit button",detail:`Controls the color theme of the form's submit button. Maps to the buttonTheme prop passed to contact-form-example.twig.
`,default:"one",options:["one","two","three","four","five","six","seven"],control:"select",labels:{one:"Base",two:"Action",three:"Highlight",four:"Subtle",five:"Deep",six:"Yale Blue",seven:"Gray 800"}}},p={title:"Atoms/Forms",tags:["!dev"],argTypes:m(s),args:c(s),parameters:{docs:{description:{component:"Storybook Definition."}}}},e=()=>i(l),t=()=>d(),o=({buttonTheme:a,sectionTheme:r})=>`
  <div data-component-has-divider="false" data-section-theme="${r}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h2>Pre-Built Form</h2>
        ${n({buttonTheme:a})}
      </div>
    </div>
  </div>
`;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"() => select(selectOptionsData)",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"() => textfields()",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  buttonTheme,
  sectionTheme
}) => \`
  <div data-component-has-divider="false" data-section-theme="\${sectionTheme}" data-component-width="site" class="yds-layout" data-embedded-components="" data-spotlights-position="first">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        <h2>Pre-Built Form</h2>
        \${formExample({
  buttonTheme
})}
      </div>
    </div>
  </div>
\``,...o.parameters?.docs?.source}}};const u=["selectDropdowns","textfieldsExamples","exampleForm"],y=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:u,default:p,exampleForm:o,selectDropdowns:e,textfieldsExamples:t},Symbol.toStringTag,{value:"Module"}));export{y as F,s as c,o as e,e as s,t};
//# sourceMappingURL=forms.stories-Lqh-lgYz.js.map
