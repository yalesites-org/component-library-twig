import{ap as r}from"../iframe.js";import{p as i}from"./primary-nav-3-07Xq0g.js";import{t as o,a as n}from"./component-props-De-d7Djp.js";import"./yds-primary-nav-C_WHCIHH.js";const e={menuVariation:{twigProp:"menu__variation",name:"Header Variation",type:"select",required:!1,description:"Navigation menu variation controlling the display style",default:"basic",options:["basic","mega","focus"],control:"select",labels:{basic:"Basic Nav",mega:"Mega Nav",focus:"Focus Nav"}}},s={title:"Organisms/Menu/Primary Nav",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:n(e),args:o(e)},a=({menuVariation:t})=>`
  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-site-header-nav-position='left' data-component-width="max" data-header-theme="one">
    ${r({...i,menu__variation:t})}
  </div>
`;a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  menuVariation
}) => \`
  <div style="position: relative; padding-top: var(--size-spacing-site-gutter);" data-site-header-nav-position='left' data-component-width="max" data-header-theme="one">
    \${primaryNavTwig({
  ...primaryNavData,
  menu__variation: menuVariation
})}
  </div>
\``,...a.parameters?.docs?.source}}};const p=["PrimaryNav"],l=Object.freeze(Object.defineProperty({__proto__:null,PrimaryNav:a,__namedExportsOrder:p,default:s},Symbol.toStringTag,{value:"Module"}));export{l as P,a,e as c};
//# sourceMappingURL=primary-nav.stories-B9QJ2dTf.js.map
