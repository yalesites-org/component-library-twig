import{A as p,f as _,g as h,d as u,e as g,a4 as S}from"../iframe.js";import"./reset-alerts-B8W4_vxp.js";import{a as m}from"./alert-6JPGQwlo.js";import{c as f}from"./global-theme-stories-BeJELyur.js";import{c as b,a as y}from"./playground-utils-DQnyvH8W.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const W={tags:["visreg"],title:"Molecules/Site Alert/Visreg",parameters:{chromatic:{disableSnapshot:!1},layout:"fullscreen",controls:{disable:!0},docs:{description:{component:"Storybook Definition."}}}},v=`
<h2>Resetting Alerts in Storybook</h2><p>Once you've closed a dismissible alert, they will not show up again, even after page reloads. In order to see them again, here in storybook, click this reset button, and all alerts will be reset to their initial state.</p>
${_({cta__content:"Reset dismissed alerts",cta__attributes:{onClick:"resetAlerts();"},cta__component_theme:"one"})}
`,w=["emergency","announcement","marketing"],T=m.alert__heading,k=m.alert__content,A=m.alert__link__content,t=()=>`
  ${p({text_field__content:v,text_field__width:"site"})}
`,x=s=>w.map(d=>`
      <div class="sb-section__container">
        <h3 class="sb-section__subheading">Alert Type: ${d}</h3>
        ${S({alert__type:d,alert__heading:T,alert__content:k,alert__link__content:A,alert__link__url:m.alert__link__url,alert__id:`alert-${s}-${d}`})}
      </div>
    `).join(""),I=()=>b(s=>y(s,x(s),{width:"site",primaryWidth:"100%"}),g,"All Section Theme Variations","Below are all section theme variations for visual regression testing.","Section Theme"),e=f(I,u,h),o=e.one,a=e.two,n=e.three,i=e.four,r=e.five,c=e.six,l=e.seven;r.storyName="It’s Your Yale";t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => \`
  \${textFieldTwig({
  text_field__content: alertResetInstructions,
  text_field__width: 'site'
})}
\``,...t.parameters?.docs?.source},description:{story:`The reset control is a Storybook affordance rather than a theme variation, so
it gets one story of its own rather than being repeated in every global theme
story.`,...t.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"themeStories.one",...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"themeStories.two",...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"themeStories.three",...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"themeStories.four",...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"themeStories.five",...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"themeStories.six",...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"themeStories.seven",...l.parameters?.docs?.source}}};const B=["ResettingAlerts","OldBlues","NewHavenGreen","ShorelineSummer","Onha","ItsYourYale","AI","WhitneyHumanitiesCenter"];export{c as AI,r as ItsYourYale,a as NewHavenGreen,o as OldBlues,i as Onha,t as ResettingAlerts,n as ShorelineSummer,l as WhitneyHumanitiesCenter,B as __namedExportsOrder,W as default};
//# sourceMappingURL=alert.visreg.stories-Cwg57WFw.js.map
