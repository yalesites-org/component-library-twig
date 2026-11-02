import{i,t as h}from"../iframe.js";import"./yds-animate-LJivyE_h.js";import{t as _,a as l}from"./component-props-De-d7Djp.js";const o={thickness:{twigProp:"divider__thickness",name:"Line thickness",type:"select",required:!1,description:"Thickness of the divider line",detail:`Maps to the divider__thickness Twig prop, which sets --thickness-divider on the divider from the --size-thickness-* tokens. When the prop is not passed, the divider keeps the inherited thickness.
`,default:"1",options:["1","2","4","8"],control:"select"},width:{twigProp:"divider__width",name:"Divider Width",type:"select",required:!1,description:"Width of the divider as a percentage",detail:`Width of the divider as a percentage of the container. Maps to the divider__width Twig variable. Available values are determined by design tokens.
`,default:"100",options:["25","50","75","100"],control:"select"},position:{twigProp:"divider__position",name:"Divider Position",type:"select",required:!1,description:"Horizontal alignment of the divider",detail:`Horizontal alignment of the divider within its container. Maps to the divider__position Twig variable.
`,default:"center",options:["left","center"],control:"select",labels:{left:"Left",center:"Center"}},sectionTheme:{twigProp:"data-section-theme",name:"Section Theme",type:"select",required:!1,description:"Background color theme for the layout section",default:"default",options:["default","one","two","three","four","five","six"],control:"select",labels:{default:"Default - No Color",one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}}},p=Object.keys(h.layout.width),r=l(o);r.width={...r.width,options:p};const w={title:"Atoms/Divider",tags:["!dev"],argTypes:r,args:_(o)},t=({position:v,thickness:a,width:n,sectionTheme:c})=>`
    <div class="yds-layout" data-section-theme="${c}">
      <div class="yds-layout__inner" data-component-width="site" style="
        --width-theme-divider: var(--layout-width-${n});
      ">
        <div class="yds-layout__primary" style="width: 100%">
          ${i({divider__width:n,divider__position:v,divider__thickness:a})}
        </div>
      </div>
    </div>
    <div class="padding-to-see-dividers-above">&nbsp;</div>
  `,e=()=>`
  ${i({divider__thickness:"1"})}
  ${i({divider__thickness:"2"})}
  ${i({divider__thickness:"4"})}
  ${i({divider__thickness:"8"})}
  <div class="padding-to-see-dividers-above">&nbsp;</div>
`;e.tags=["!dev"];const d=()=>`
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${i({divider__width:"25",divider__position:"center"})}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${i({divider__width:"50",divider__position:"center"})}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${i({divider__width:"75",divider__position:"center"})}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${i({divider__width:"100",divider__position:"center"})}
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>
`;d.tags=["!dev"];const s=()=>`
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${i({divider__width:"50",divider__position:"left"})}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    ${i({divider__width:"50",divider__position:"center"})}
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>
`;s.tags=["!dev"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  position,
  thickness,
  width,
  sectionTheme
}) => {
  return \`
    <div class="yds-layout" data-section-theme="\${sectionTheme}">
      <div class="yds-layout__inner" data-component-width="site" style="
        --width-theme-divider: var(--layout-width-\${width});
      ">
        <div class="yds-layout__primary" style="width: 100%">
          \${dividerTwig({
    divider__width: width,
    divider__position: position,
    divider__thickness: thickness
  })}
        </div>
      </div>
    </div>
    <div class="padding-to-see-dividers-above">&nbsp;</div>
  \`;
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => \`
  \${dividerTwig({
  divider__thickness: '1'
})}
  \${dividerTwig({
  divider__thickness: '2'
})}
  \${dividerTwig({
  divider__thickness: '4'
})}
  \${dividerTwig({
  divider__thickness: '8'
})}
  <div class="padding-to-see-dividers-above">&nbsp;</div>
\``,...e.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => \`
  <div style="--thickness-divider: var(--size-thickness-2)">
    \${dividerTwig({
  divider__width: '25',
  divider__position: 'center'
})}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    \${dividerTwig({
  divider__width: '50',
  divider__position: 'center'
})}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    \${dividerTwig({
  divider__width: '75',
  divider__position: 'center'
})}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    \${dividerTwig({
  divider__width: '100',
  divider__position: 'center'
})}
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>
\``,...d.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => \`
  <div style="--thickness-divider: var(--size-thickness-2)">
    \${dividerTwig({
  divider__width: '50',
  divider__position: 'left'
})}
  </div>
  <div style="--thickness-divider: var(--size-thickness-2)">
    \${dividerTwig({
  divider__width: '50',
  divider__position: 'center'
})}
  </div>
  <div class="padding-to-see-dividers-above">&nbsp;</div>
\``,...s.parameters?.docs?.source}}};const k=["Interactive","DividersThickness","DividersWidth","DividersPosition"],y=Object.freeze(Object.defineProperty({__proto__:null,DividersPosition:s,DividersThickness:e,DividersWidth:d,Interactive:t,__namedExportsOrder:k,default:w},Symbol.toStringTag,{value:"Module"}));export{y as D,t as I,e as a,d as b,s as c,o as d};
//# sourceMappingURL=divider.stories-Cy9RHSb8.js.map
