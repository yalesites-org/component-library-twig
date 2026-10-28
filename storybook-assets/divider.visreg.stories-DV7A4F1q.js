import{g as v,d as S,e as g,i as y}from"../iframe.js";import"./yds-animate-LJivyE_h.js";import{c as _}from"./global-theme-stories-BeJELyur.js";import{c as f}from"./playground-utils-DQnyvH8W.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const I={tags:["visreg"],title:"Atoms/Divider/Visreg",parameters:{chromatic:{disableSnapshot:!1},controls:{disable:!0}}},T=()=>{const m="hairline",h="gray-500",p={"--thickness-theme-divider":`var(--size-thickness-${m})`},u=document.documentElement;return Object.entries(p).forEach(n=>{const[l,s]=n;u.style.setProperty(l,s)}),f(n=>`
      <div class="yds-layout cl-divider-playground" data-section-theme="${n}">
        <div class="yds-layout__inner" data-component-width="site" style="
          --color-divider: var(--color-${h});
        ">
          <div class="yds-layout__primary" style="width: 100%">
            ${["25","50","75","100"].map(s=>`
              <h4>Width: ${s}</h4>
              <div style="--thickness-divider: var(--size-thickness-${m})">
                ${y({divider__width:s,divider__position:"center"})}
              </div>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="padding-to-see-dividers-above">&nbsp;</div>
    `,g,"All Section Theme Variations","Below are all theme variations with width samples for visual regression testing.","Section Theme")},e=_(T,S,v),t=e.one,o=e.two,a=e.three,i=e.four,r=e.five,c=e.six,d=e.seven;r.storyName="It’s Your Yale";t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"themeStories.one",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"themeStories.two",...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"themeStories.three",...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"themeStories.four",...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"themeStories.five",...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"themeStories.six",...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"themeStories.seven",...d.parameters?.docs?.source}}};const V=["OldBlues","NewHavenGreen","ShorelineSummer","Onha","ItsYourYale","AI","WhitneyHumanitiesCenter"];export{c as AI,r as ItsYourYale,o as NewHavenGreen,t as OldBlues,i as Onha,a as ShorelineSummer,d as WhitneyHumanitiesCenter,V as __namedExportsOrder,I as default};
//# sourceMappingURL=divider.visreg.stories-DV7A4F1q.js.map
