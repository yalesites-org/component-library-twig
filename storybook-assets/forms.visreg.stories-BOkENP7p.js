import{aN as x,g as O,d as P,e as W,aL as E,aM as I,aK as L}from"../iframe.js";import{s as N}from"./select-tqhwfG2e.js";/* empty css                    */import{c as $}from"./global-theme-stories-BeJELyur.js";import{a as t,c as Y}from"./playground-utils-DQnyvH8W.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const G={categories:["Featured","Page Category 1","Page Category 2","Page Category 3","About","Research","Academics","Contact","Landing Page"],audiences:["Faculty","Staff","Students","Visitors"],longVocabularyName:"Interdisciplinary Research Initiatives and Centers",longTerms:["Interdisciplinary Research Initiatives and Collaborative Centers","Graduate and Professional School Admissions Outreach","Faculty Development and Academic Leadership Programs","Short Term"]},z={tags:["visreg"],title:"Atoms/Forms/Visreg",parameters:{chromatic:{disableSnapshot:!1},controls:{disable:!0}}},R=()=>Y(y=>t(y,`
          <h3>Select Dropdowns</h3>
          ${E(N)}

          <h3>Text Fields</h3>
          ${I()}

          <h3>Example Form</h3>
          ${L({buttonTheme:"one"})}
        `),W,"All Section Theme Variations","Below are all theme variations for visual regression testing.","Section Theme"),a=$(R,P,O),d=a.one,l=a.two,m=a.three,p=a.four,c=a.five,u=a.six,h=a.seven;c.storyName="It’s Your Yale";const{categories:k,audiences:D,longVocabularyName:H,longTerms:F}=G,b=(e,V,y)=>(A={})=>({id:e,label:V,options:y,selected:[],...A}),n=b("category","Category",k),i=b("audience","Audience",D),w=b("long",H,F),r=e=>x({search:"",...e}),o=e=>`<h3>${e}</h3>`,C=e=>`<div style="padding-bottom: 18rem">${e}</div>`,g=()=>t("default",o('Closed: none selected, then two chips, then "+4 more"')+r({id:"closed",fields:[n(),i({selected:["Faculty","Staff"]})]})+r({id:"closed-more",fields:[n({selected:["Featured","About","Research","Academics","Contact"],visible:1}),i()]})),f=()=>t("default",o("Open with two chips")+C(r({id:"open",fields:[n({open:!0,selected:["Featured","Page Category 1"]}),i()]}))),S=()=>t("default",o('Long vocabulary name: one chip and "+1 more", closed and open')+C(r({id:"long",fields:[w({selected:F.slice(0,2),visible:1}),w({id:"long-open",open:!0,selected:F.slice(0,2),visible:1})]}))),T=e=>[n({id:`${e}-category`}),i({id:`${e}-audience`,selected:["Faculty","Staff"]}),w({id:`${e}-custom`})],v=()=>t("default",o("Events calendar filters")+r({id:"calendar",calendar:!0,search:"Search events",fields:T("calendar")})),s=()=>t("default",o("Views filters at 375px (one column)")+r({id:"phone",fields:[n({selected:["Featured","Page Category 1"]}),i()]})+o("Events calendar filters at 375px (stacked)")+r({id:"phone-calendar",calendar:!0,search:"Search events",fields:T("phone-calendar")}));s.parameters={...s.parameters,chromatic:{viewports:[375]}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"themeStories.one",...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"themeStories.two",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"themeStories.three",...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"themeStories.four",...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"themeStories.five",...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"themeStories.six",...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:"themeStories.seven",...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Closed: none selected, then two chips, then "+4 more"') + form({
  id: 'closed',
  fields: [category(), audience({
    selected: ['Faculty', 'Staff']
  })]
}) + form({
  id: 'closed-more',
  fields: [category({
    selected: ['Featured', 'About', 'Research', 'Academics', 'Contact'],
    visible: 1
  }), audience()]
}))`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Open with two chips') + room(form({
  id: 'open',
  fields: [category({
    open: true,
    selected: ['Featured', 'Page Category 1']
  }), audience()]
})))`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Long vocabulary name: one chip and "+1 more", closed and open') + room(form({
  id: 'long',
  fields: [
  // Two long terms overflow the row; the real JS keeps one chip.
  longVocabulary({
    selected: longTerms.slice(0, 2),
    visible: 1
  }), longVocabulary({
    id: 'long-open',
    open: true,
    selected: longTerms.slice(0, 2),
    // Open keeps the closed one-line row and badge. (#1930)
    visible: 1
  })]
})))`,...S.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Events calendar filters') + form({
  id: 'calendar',
  calendar: true,
  search: 'Search events',
  fields: calendarFields('calendar')
}))`,...v.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Views filters at 375px (one column)') + form({
  id: 'phone',
  fields: [category({
    selected: ['Featured', 'Page Category 1']
  }), audience()]
}) + heading('Events calendar filters at 375px (stacked)') + form({
  id: 'phone-calendar',
  calendar: true,
  search: 'Search events',
  fields: calendarFields('phone-calendar')
}))`,...s.parameters?.docs?.source}}};const Q=["OldBlues","NewHavenGreen","ShorelineSummer","Onha","ItsYourYale","AI","WhitneyHumanitiesCenter","ViewsFiltersClosed","ViewsFiltersOpenWithTwoSelected","ViewsFiltersLongVocabularyName","ViewsFiltersEventsCalendar","ViewsFiltersPhoneWidth"];export{u as AI,c as ItsYourYale,l as NewHavenGreen,d as OldBlues,p as Onha,m as ShorelineSummer,g as ViewsFiltersClosed,v as ViewsFiltersEventsCalendar,S as ViewsFiltersLongVocabularyName,f as ViewsFiltersOpenWithTwoSelected,s as ViewsFiltersPhoneWidth,h as WhitneyHumanitiesCenter,Q as __namedExportsOrder,z as default};
//# sourceMappingURL=forms.visreg.stories-BOkENP7p.js.map
