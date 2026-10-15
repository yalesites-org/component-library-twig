import{h as n,i as p,l as _,t as m}from"../iframe.js";import"./yds-text-link-DjKH7WLb.js";import"./yds-text-copy-button-li-VLzqi.js";import{t as u,a as d}from"./component-props-De-d7Djp.js";const h={sectionTheme:{twigProp:"data-section-theme",name:"Section Theme",type:"select",required:!1,description:"Background color theme for the layout section",default:"default",options:["default","one","two","three","four","five","six"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},componentTheme:{twigProp:"cta__component_theme",name:"Button Theme (dial)",type:"select",required:!1,description:"Theme color for the CTA button from the design system dial",detail:`Controls the color theme applied to CTA buttons. Maps to the cta__component_theme Twig variable. Used primarily in the CTA story.
`,default:"one",options:["one","two","three","four","five","six","seven"],control:"select",labels:{one:"Base",two:"Action",three:"Highlight",four:"Subtle",five:"Deep",six:"Yale Blue",seven:"Gray 800"}}},y=Object.keys(m["button-cta-themes"]),r=d(h);r.componentTheme={...r.componentTheme,options:y};const g={title:"Atoms/Controls",tags:["!dev"],argTypes:r,parameters:{controls:{sort:"requiredFirst"},docs:{description:{component:"Storybook Definition."}}},args:u(h)},l=(t,s)=>`
  <div class="yds-layout" data-section-theme="${t}" data-component-width="site">
    <div class="yds-layout__inner">
      <div class="yds-layout__primary">
        ${s}
      </div>
    </div>
  </div>
`,e="Call to action",o=({componentTheme:t,sectionTheme:s})=>l(s,`
  <h2>Filled</h2>
  <div class="cta-group">
    ${n({cta__content:e,cta__href:"https://google.com",cta__component_theme:t})}
    ${n({cta__content:e,cta__href:"#",cta__radius:"soft",cta__component_theme:t})}
    ${n({cta__content:e,cta__href:"https://google.com/test.pdf",cta__radius:"pill",cta__component_theme:t})}
    ${n({cta__content:e,cta__href:"#",cta__radius:"pill",cta__component_theme:t,cta__control_type:"dropdown"})}
  </div>
  <h2>Outline</h2>
  <div class="cta-group">
    ${n({cta__content:e,cta__href:"#",cta__style:"outline",cta__component_theme:t})}
    ${n({cta__content:e,cta__href:"#",cta__radius:"soft",cta__style:"outline",cta__component_theme:t})}
    ${n({cta__content:e,cta__href:"#",cta__radius:"pill",cta__style:"outline",cta__component_theme:t})}
    ${n({cta__content:e,cta__href:"#",cta__radius:"outline",cta__style:"outline",cta__component_theme:t,cta__control_type:"dropdown"})}
  </div>
  <h2>Outline Weights</h2>
  <div class="cta-group">
    ${n({cta__content:e,cta__href:"#",cta__style:"outline",cta__outline_weight:"1",cta__component_theme:t})}
    ${n({cta__content:e,cta__href:"#",cta__style:"outline",cta__outline_weight:"2",cta__component_theme:t})}
    ${n({cta__content:e,cta__href:"#",cta__style:"outline",cta__outline_weight:"4",cta__component_theme:t})}
  </div>
  <h2>Hover Effects</h2>
  <div class="cta-group">
    ${n({cta__content:"Fade",cta__href:"#",cta__component_theme:t})}
    ${n({cta__content:"Rise",cta__hover_style:"rise",cta__href:"#",cta__component_theme:t})}
    ${n({cta__content:"Wipe",cta__hover_style:"wipe",cta__href:"#",cta__component_theme:t})}
  </div>
  <div class="cta-group">
    ${n({cta__content:"Fade",cta__style:"outline",cta__href:"#",cta__component_theme:t})}
    ${n({cta__content:"Rise",cta__style:"outline",cta__hover_style:"rise",cta__href:"#",cta__component_theme:t})}
    ${n({cta__content:"Wipe",cta__style:"outline",cta__hover_style:"wipe",cta__href:"#",cta__component_theme:t})}
  </div>
  `),c=({sectionTheme:t})=>l(t,`
  ${_({link__url:"http://localhost:6006",link__content:"This is a default link"})}<br />
  ${_({link__url:"#",link__content:'This is a "no-underline" link',link__style:"no-underline",link__type:"normal"})}<br />
  ${_({link__url:"https://google.com",link__content:'This is an "external" link',link__style:"underline-with-icon",link__type:"external"})}
  ${_({link__url:"#",link__content:'This is a "new target" link',link__style:"underline-with-icon",link__type:"target-blank",link__attributes:{target:"_blank"}})}
  ${_({link__url:"https://google.com/download.pdf",link__content:'This is a "download" link',link__style:"underline-with-icon",link__type:"download"})}
  ${_({link__url:"#",link__content:"This is a link with chevron",link__style:"underline-with-icon",link__type:"with-chevron",link__url_type:"chevron"})}
  ${_({link__url:"#",link__content:"This is a long link without animated underlines",link__style:"no-underline-animation"})}<br/>
`),a=({sectionTheme:t})=>l(t,p({text_copy_button__pre_text:"person@example.com",text_copy_button__content:"(copy)",text_copy_button__component_theme:"two"})),i=({sectionTheme:t})=>l(t,p({text_copy_button__pre_text:"<p>Adams, J. (2026). <em>The Department of Government Improvement</em>. Yale Institution for Social and Policy Studies.</p>",text_copy_button__pre_text_tag:"div",text_copy_button__content:"Copy citation",text_copy_button__component_theme:"two"}));o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  componentTheme,
  sectionTheme
}) => Section(sectionTheme, \`
  <h2>Filled</h2>
  <div class="cta-group">
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: 'https://google.com',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: '#',
  cta__radius: 'soft',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: 'https://google.com/test.pdf',
  cta__radius: 'pill',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: '#',
  cta__radius: 'pill',
  cta__component_theme: componentTheme,
  cta__control_type: 'dropdown'
})}
  </div>
  <h2>Outline</h2>
  <div class="cta-group">
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: '#',
  cta__style: 'outline',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: '#',
  cta__radius: 'soft',
  cta__style: 'outline',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: '#',
  cta__radius: 'pill',
  cta__style: 'outline',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: '#',
  cta__radius: 'outline',
  cta__style: 'outline',
  cta__component_theme: componentTheme,
  cta__control_type: 'dropdown'
})}
  </div>
  <h2>Outline Weights</h2>
  <div class="cta-group">
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: '#',
  cta__style: 'outline',
  cta__outline_weight: '1',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: '#',
  cta__style: 'outline',
  cta__outline_weight: '2',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: ctaText,
  cta__href: '#',
  cta__style: 'outline',
  cta__outline_weight: '4',
  cta__component_theme: componentTheme
})}
  </div>
  <h2>Hover Effects</h2>
  <div class="cta-group">
    \${ctaTwig({
  cta__content: 'Fade',
  cta__href: '#',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: 'Rise',
  cta__hover_style: 'rise',
  cta__href: '#',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: 'Wipe',
  cta__hover_style: 'wipe',
  cta__href: '#',
  cta__component_theme: componentTheme
})}
  </div>
  <div class="cta-group">
    \${ctaTwig({
  cta__content: 'Fade',
  cta__style: 'outline',
  cta__href: '#',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: 'Rise',
  cta__style: 'outline',
  cta__hover_style: 'rise',
  cta__href: '#',
  cta__component_theme: componentTheme
})}
    \${ctaTwig({
  cta__content: 'Wipe',
  cta__style: 'outline',
  cta__hover_style: 'wipe',
  cta__href: '#',
  cta__component_theme: componentTheme
})}
  </div>
  \`)`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`({
  sectionTheme
}) => Section(sectionTheme, \`
  \${linkTwig({
  link__url: 'http://localhost:6006',
  link__content: 'This is a default link'
})}<br />
  \${linkTwig({
  link__url: '#',
  link__content: 'This is a "no-underline" link',
  link__style: 'no-underline',
  link__type: 'normal'
})}<br />
  \${linkTwig({
  link__url: 'https://google.com',
  link__content: 'This is an "external" link',
  link__style: 'underline-with-icon',
  link__type: 'external'
})}
  \${linkTwig({
  link__url: '#',
  link__content: 'This is a "new target" link',
  link__style: 'underline-with-icon',
  link__type: 'target-blank',
  link__attributes: {
    target: '_blank'
  }
})}
  \${linkTwig({
  link__url: 'https://google.com/download.pdf',
  link__content: 'This is a "download" link',
  link__style: 'underline-with-icon',
  link__type: 'download'
})}
  \${linkTwig({
  link__url: '#',
  link__content: 'This is a link with chevron',
  link__style: 'underline-with-icon',
  link__type: 'with-chevron',
  link__url_type: 'chevron'
})}
  \${linkTwig({
  link__url: '#',
  link__content: 'This is a long link without animated underlines',
  link__style: 'no-underline-animation'
})}<br/>
\`)`,...c.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  sectionTheme
}) => Section(sectionTheme, textCopyButtonTwig({
  text_copy_button__pre_text: 'person@example.com',
  text_copy_button__content: '(copy)',
  text_copy_button__component_theme: 'two'
}))`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`({
  sectionTheme
}) => Section(sectionTheme, textCopyButtonTwig({
  text_copy_button__pre_text: '<p>Adams, J. (2026). <em>The Department of Government Improvement</em>. Yale Institution for Social and Policy Studies.</p>',
  text_copy_button__pre_text_tag: 'div',
  text_copy_button__content: 'Copy citation',
  text_copy_button__component_theme: 'two'
}))`,...i.parameters?.docs?.source}}};const k=["Cta","textLink","textCopyButton","textCopyButtonRichText"],x=Object.freeze(Object.defineProperty({__proto__:null,Cta:o,__namedExportsOrder:k,default:g,textCopyButton:a,textCopyButtonRichText:i,textLink:c},Symbol.toStringTag,{value:"Module"}));export{x as C,o as a,a as b,i as c,h as d,c as t};
//# sourceMappingURL=control.stories-CQMvXqeP.js.map
