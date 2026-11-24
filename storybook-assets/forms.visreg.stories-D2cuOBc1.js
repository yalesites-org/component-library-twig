import{aU as I,g as _,d as B,e as R,aS as Y,aT as G,aR as k}from"../iframe.js";import{s as D}from"./select-tqhwfG2e.js";/* empty css                    */import{c as H}from"./global-theme-stories-BeJELyur.js";import{a as t,c as M}from"./playground-utils-DQnyvH8W.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const j={categories:["Featured","Page Category 1","Page Category 2","Page Category 3","About","Research","Academics","Contact","Landing Page"],audiences:["Faculty","Staff","Students","Visitors"],longVocabularyName:"Interdisciplinary Research Initiatives and Centers",longTerms:["Interdisciplinary Research Initiatives and Collaborative Centers","Graduate and Professional School Admissions Outreach","Faculty Development and Academic Leadership Programs","Short Term"]},oe={tags:["visreg"],title:"Atoms/Forms/Visreg",parameters:{chromatic:{disableSnapshot:!1},controls:{disable:!0}}},J=()=>M(s=>t(s,`
          <h3>Select Dropdowns</h3>
          ${Y(D)}

          <h3>Text Fields</h3>
          ${G()}

          <h3>Example Form</h3>
          ${k({buttonTheme:"one"})}
        `),R,"All Section Theme Variations","Below are all theme variations for visual regression testing.","Section Theme"),n=H(J,B,_),p=n.one,u=n.two,h=n.three,f=n.four,l=n.five,g=n.six,y=n.seven;l.storyName="It’s Your Yale";const{categories:U,audiences:q,longVocabularyName:z,longTerms:P}=j,W=(e,o,s)=>(m={})=>({id:e,label:o,options:s,selected:[],...m}),i=W("category","Category",U),c=W("audience","Audience",q),L=W("long",z,P),A=(e={})=>W("empty","Topic",[])({disabled:!0,...e}),r=e=>I({search:"",...e}),a=e=>`<h3>${e}</h3>`,O=e=>`<div style="padding-bottom: 18rem">${e}</div>`,w=()=>t("default",a('Closed: none selected, then two chips, then "+4 more"')+r({id:"closed",fields:[i(),c({selected:["Faculty","Staff"]})]})+r({id:"closed-more",fields:[i({selected:["Featured","About","Research","Academics","Contact"],visible:1}),c()]})),S=()=>t("default",a("Open with two chips")+O(r({id:"open",fields:[i({open:!0,selected:["Featured","Page Category 1"],visible:1}),c()]}))),F=()=>t("default",a('Long vocabulary name: one chip and "+1 more", closed and open')+O(r({id:"long",fields:[L({selected:P.slice(0,2),visible:1}),L({id:"long-open",open:!0,selected:P.slice(0,2),visible:1})]}))),v=()=>t("default",a("Empty filter next to filled ones")+r({id:"empty",fields:[i({selected:["Featured","Page Category 1"]}),A(),c()]})),b=()=>{const e=r({id:"empty-narrow",hide_search:!0,fields:[A()]});return t("default",`${a('Empty filter in a narrow box: text cut off with "..."')}<div style="max-width: 9rem">${e}</div>`)},N=e=>[i({id:`${e}-category`}),c({id:`${e}-audience`,selected:["Faculty","Staff"]}),L({id:`${e}-custom`})],V=()=>t("default",a("Events calendar filters")+r({id:"calendar",calendar:!0,search:"Search events",fields:N("calendar")})+a("Events calendar filters with one empty filter")+r({id:"calendar-empty",calendar:!0,search:"Search events",fields:[i({id:"calendar-empty-category"}),A({id:"calendar-empty-topic"}),c({id:"calendar-empty-audience"})]})),d=()=>`<style>html, body { overflow: visible; }</style>${t("default",a("Views filters at 375px (one column)")+r({id:"phone",fields:[i({selected:["Featured","Page Category 1"]}),A(),c()]})+a("Events calendar filters at 375px (stacked)")+r({id:"phone-calendar",calendar:!0,search:"Search events",fields:N("phone-calendar")}))}`;d.parameters={...d.parameters,chromatic:{viewports:[375]}};const K=(e,o)=>Array.from({length:o},(s,m)=>i({id:`${e}-f${m}`,label:`Filter ${m+1}`})),Q=[0,1,2,3,4,5,6,7,8],T=(e,o={})=>Q.map(s=>a(`${s} filter${s===1?"":"s"}`)+r({id:`${e}-${s}`,fields:K(`${e}-${s}`,s),...o})).join(""),E=(e,o)=>`<div style="width: ${e}; max-width: 100%">${o}</div>`,x=()=>t("default",E("62rem",T("wide"))+a("Search off, 1 to 8 filters")+E("62rem",T("wide-nosearch",{hide_search:!0}))),$=()=>t("default",E("40rem",T("mid"))),C=()=>t("default",E("24rem",T("narrow")));p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"themeStories.one",...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"themeStories.two",...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:"themeStories.three",...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:"themeStories.four",...f.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"themeStories.five",...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"themeStories.six",...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:"themeStories.seven",...y.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Closed: none selected, then two chips, then "+4 more"') + form({
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
}))`,...w.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Open with two chips') + room(form({
  id: 'open',
  fields: [category({
    open: true,
    selected: ['Featured', 'Page Category 1'],
    visible: 1
  }), audience()]
})))`,...S.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Long vocabulary name: one chip and "+1 more", closed and open') + room(form({
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
})))`,...F.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Empty filter next to filled ones') + form({
  id: 'empty',
  fields: [category({
    selected: ['Featured', 'Page Category 1']
  }), emptyFilter(), audience()]
}))`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const narrowForm = form({
    id: 'empty-narrow',
    hide_search: true,
    fields: [emptyFilter()]
  });
  return createSectionWrapper('default', \`\${heading('Empty filter in a narrow box: text cut off with "..."')}<div style="max-width: 9rem">\${narrowForm}</div>\`);
}`,...b.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', heading('Events calendar filters') + form({
  id: 'calendar',
  calendar: true,
  search: 'Search events',
  fields: calendarFields('calendar')
}) + heading('Events calendar filters with one empty filter') + form({
  id: 'calendar-empty',
  calendar: true,
  search: 'Search events',
  fields: [category({
    id: 'calendar-empty-category'
  }), emptyFilter({
    id: 'calendar-empty-topic'
  }), audience({
    id: 'calendar-empty-audience'
  })]
}))`,...V.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => \`<style>html, body { overflow: visible; }</style>\${createSectionWrapper('default', heading('Views filters at 375px (one column)') + form({
  id: 'phone',
  fields: [category({
    selected: ['Featured', 'Page Category 1']
  }), emptyFilter(), audience()]
}) + heading('Events calendar filters at 375px (stacked)') + form({
  id: 'phone-calendar',
  calendar: true,
  search: 'Search events',
  fields: calendarFields('phone-calendar')
}))}\``,...d.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => createSectionWrapper('default', widthBox('62rem', countedForms('wide')) + heading('Search off, 1 to 8 filters') + widthBox('62rem', countedForms('wide-nosearch', {
  hide_search: true
})))`,...x.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:"() => createSectionWrapper('default', widthBox('40rem', countedForms('mid')))",...$.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:"() => createSectionWrapper('default', widthBox('24rem', countedForms('narrow')))",...C.parameters?.docs?.source}}};const ie=["OldBlues","NewHavenGreen","ShorelineSummer","Onha","ItsYourYale","AI","WhitneyHumanitiesCenter","ViewsFiltersClosed","ViewsFiltersOpenWithTwoSelected","ViewsFiltersLongVocabularyName","ViewsFiltersEmpty","ViewsFiltersEmptyNarrow","ViewsFiltersEventsCalendar","ViewsFiltersPhoneWidth","ViewsFiltersLayoutWide","ViewsFiltersLayoutMedium","ViewsFiltersLayoutNarrow"];export{g as AI,l as ItsYourYale,u as NewHavenGreen,p as OldBlues,f as Onha,h as ShorelineSummer,w as ViewsFiltersClosed,v as ViewsFiltersEmpty,b as ViewsFiltersEmptyNarrow,V as ViewsFiltersEventsCalendar,$ as ViewsFiltersLayoutMedium,C as ViewsFiltersLayoutNarrow,x as ViewsFiltersLayoutWide,F as ViewsFiltersLongVocabularyName,S as ViewsFiltersOpenWithTwoSelected,d as ViewsFiltersPhoneWidth,y as WhitneyHumanitiesCenter,ie as __namedExportsOrder,oe as default};
//# sourceMappingURL=forms.visreg.stories-D2cuOBc1.js.map
