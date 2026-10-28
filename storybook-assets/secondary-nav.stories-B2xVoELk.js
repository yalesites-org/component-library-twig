import{ap as n}from"../iframe.js";import{s as a}from"./yds-secondary-nav-C0lFKjnN.js";import{t as r,a as s}from"./component-props-De-d7Djp.js";const o={themeColor:{twigProp:"menu_theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Color theme applied to the secondary navigation component",detail:`Applies a color theme to the secondary nav. Maps to menu_theme in the Twig template. Lists one to five, matching Drupal's book_navigation theme setting, rather than every component-themes token.
`,default:"one",options:["one","two","three","four","five"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five"}}},i=s(o),m={title:"Organisms/Menu/Content Collection",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:i,args:r(o)},e=({themeColor:t})=>`
  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="${t}">
    ${n({...a,menu_theme:t})}
  </div>
`;e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  themeColor
}) => \`
  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-component-width="max" data-component-theme="\${themeColor}">
    \${secondaryNavTwig({
  ...secondaryNavData,
  menu_theme: themeColor
})}
  </div>
\``,...e.parameters?.docs?.source}}};const c=["secondaryNav"],v=Object.freeze(Object.defineProperty({__proto__:null,__namedExportsOrder:c,default:m,secondaryNav:e},Symbol.toStringTag,{value:"Module"}));export{v as S,o as c,e as s};
//# sourceMappingURL=secondary-nav.stories-B2xVoELk.js.map
