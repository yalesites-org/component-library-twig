import{aO as n,t as c}from"../iframe.js";import{s as l}from"./social-links-BFPxBdAv.js";import{l as f}from"./link-group-CznLtt5V.js";import{t as p,a as _}from"./component-props-De-d7Djp.js";const o={borderThickness:{twigProp:"site_footer__border_thickness",name:"Border Thickness",type:"select",required:!1,description:"Top border thickness for the site footer. Fixed in Drupal.",default:"8",fixed:!0},siteFooterTheme:{twigProp:"site_footer__theme",name:"Footer Theme (dial)",type:"select",required:!1,description:"Color theme applied to the site footer",detail:`Controls the overall footer color scheme. Options are derived from the site-footer-themes design tokens.
`,default:"one",control:"select",labels:{one:"Base & White",two:"Action & Dark Gray",three:"Highlight & Yale Blue"}},siteFooterAccent:{twigProp:"site_footer__accent",name:"Footer Accent Color (dial)",type:"select",required:!1,description:"Accent color applied to links and interactive elements in the footer",default:"one",options:["one","two","three","four","five","six","seven","eight"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six",seven:"Seven",eight:"Eight"}},siteFooterVariation:{twigProp:"site_footer__variation",name:"Footer Variation (dial)",type:"select",required:!1,description:"Layout variation for the site footer",default:"basic",options:["basic","mega"],control:"select",labels:{basic:"Basic",mega:"Mega"}}},h=Object.keys(c["site-footer-themes"]),t=_(o);t.siteFooterTheme={...t.siteFooterTheme,options:h};const m={title:"Organisms/Global Elements/Footer",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:t,args:p(o)},e=({borderThickness:r,siteFooterTheme:s,siteFooterVariation:i,siteFooterAccent:a})=>n({...l,...f,site_footer__border_thickness:r,site_footer__theme:s,site_footer__accent:a,site_footer__variation:i,site_footer__content_text:'This is <a href="https://example.com">example text</a> for footer content <a href="https://example.com/blah">with a link</a>.'});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  borderThickness,
  siteFooterTheme,
  siteFooterVariation,
  siteFooterAccent
}) => siteFooterTwig({
  ...socialLinksData,
  ...linkGroupData,
  site_footer__border_thickness: borderThickness,
  site_footer__theme: siteFooterTheme,
  site_footer__accent: siteFooterAccent,
  site_footer__variation: siteFooterVariation,
  site_footer__content_text: 'This is <a href="https://example.com">example text</a> for footer content <a href="https://example.com/blah">with a link</a>.'
})`,...e.parameters?.docs?.source}}};const d=["Footer"],T=Object.freeze(Object.defineProperty({__proto__:null,Footer:e,__namedExportsOrder:d,default:m},Symbol.toStringTag,{value:"Module"}));export{e as F,T as S,o as c};
//# sourceMappingURL=site-footer.stories-DAFKQJA4.js.map
