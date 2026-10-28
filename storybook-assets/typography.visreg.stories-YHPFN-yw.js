import{z as f,A as u,g as y,d as x,e as v}from"../iframe.js";import{t as b}from"./text-field-C6YFoNit.js";import{i as S}from"./image-CSdbOboU.js";import{l as T}from"./long-url-Cvaf1zkg.js";import"./yds-text-D8RbkL0N.js";import{c as w}from"./global-theme-stories-BeJELyur.js";import{a as p,c as $}from"./playground-utils-DQnyvH8W.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const r=T.long_url,Y={tags:["visreg"],title:"Atoms/Text/Visreg",parameters:{chromatic:{disableSnapshot:!1},controls:{disable:!0},docs:{description:{component:"Storybook Definition."}}}},U=()=>{const m="default";return $(g=>p(g,u({text_field__content:b.text_field__content,text_field__variation:m})),v,"All Section Theme Variations","Below are all theme variations for visual regression testing.","Section Theme")},e=w(U,x,y),n=e.one,o=e.two,s=e.three,i=e.four,a=e.five,c=e.six,l=e.seven;a.storyName="It’s Your Yale";const _="https://yale.edu/about-yale",L=`
  <p>Watch the recording of the first meeting, <a href="${r}">${r}</a>, before the next session.</p>
  <p>Registration is open at <a href="${_}">${_}</a> and closes on Friday.</p>
  <p>${r}</p>
  <p>Ordinary prose keeps wrapping between words: Yale Divinity School is a <a href="https://divinity.yale.edu">graduate professional school</a> within a world-class research university.</p>
`,d=()=>u({text_field__content:L,text_field__variation:"default"}),k=(m,h)=>`
  <div class="yds-layout layout" data-component-has-divider="true"
       data-component-padding="default" data-section-theme="default"
       data-component-layout="seventy-thirty" data-component-width="site"
       data-embedded-components>
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">${m}</div>
      <div class="yds-layout__secondary">${h}</div>
    </div>
  </div>
`,t=()=>`
  <div class="wrap-for-screenshot">
    <h3>Text field</h3>
    ${p("default",d())}

    <h3>Text field in a 320px column</h3>
    <div style="max-width: 320px">
      ${p("default",d())}
    </div>

    <h3>70/30 section, text in both columns</h3>
    ${k(d(),d())}

    <h3>Action banner text</h3>
    ${f({...S.responsive_images["16x9"],banner__heading:"Banner with a long URL",banner__snippet:`<p>Watch it at <a href="${r}">${r}</a></p>`,banner__link__content:"This is a link",banner__link__url:"https://yale.edu",banner__link__style:"cta",banner__content__layout:"left",banner__content__background:"one"})}
  </div>
`;t.storyName="Long URL In Body Text";t.parameters={layout:"fullscreen"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"themeStories.one",...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"themeStories.two",...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"themeStories.three",...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"themeStories.four",...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"themeStories.five",...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"themeStories.six",...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"themeStories.seven",...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => \`
  <div class="wrap-for-screenshot">
    <h3>Text field</h3>
    \${createSectionWrapper('default', longUrlTextField())}

    <h3>Text field in a 320px column</h3>
    <div style="max-width: 320px">
      \${createSectionWrapper('default', longUrlTextField())}
    </div>

    <h3>70/30 section, text in both columns</h3>
    \${seventyThirtySection(longUrlTextField(), longUrlTextField())}

    <h3>Action banner text</h3>
    \${actionBannerTwig({
  ...imageData.responsive_images['16x9'],
  banner__heading: 'Banner with a long URL',
  banner__snippet: \`<p>Watch it at <a href="\${LONG_URL}">\${LONG_URL}</a></p>\`,
  banner__link__content: 'This is a link',
  banner__link__url: 'https://yale.edu',
  banner__link__style: 'cta',
  banner__content__layout: 'left',
  banner__content__background: 'one'
})}
  </div>
\``,...t.parameters?.docs?.source}}};const D=["OldBlues","NewHavenGreen","ShorelineSummer","Onha","ItsYourYale","AI","WhitneyHumanitiesCenter","LongUrlInBodyText"];export{c as AI,a as ItsYourYale,t as LongUrlInBodyText,o as NewHavenGreen,n as OldBlues,i as Onha,s as ShorelineSummer,l as WhitneyHumanitiesCenter,D as __namedExportsOrder,Y as default};
//# sourceMappingURL=typography.visreg.stories-YHPFN-yw.js.map
