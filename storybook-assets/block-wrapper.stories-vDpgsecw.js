import{au as a}from"../iframe.js";import{t as p,a as d}from"./component-props-De-d7Djp.js";const e={blockContent:{twigProp:"block_wrapper__content",name:"Content",type:"string",required:!0,description:"The content to be wrapped (typically HTML markup)",control:"text"},paddingModifier:{twigProp:"block_wrapper__extra_classes",name:"Padding Options",type:"select",required:!1,description:"Padding configuration applied via CSS class on the block wrapper",detail:`Controls vertical padding on the block wrapper by applying a BEM modifier class. The class is appended as ys-block-wrapper--{value}. Passed as part of the block_wrapper__extra_classes array in the Twig template.
`,default:"padding-default",options:{"Padding on both top and bottom":"padding-default","No top padding":"padding-no-top","No bottom padding":"padding-no-bottom","No padding (removes both top and bottom padding)":"padding-no-padding"},control:"select"}},s={title:"Templates/Block Wrapper",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:d(e),args:p(e)},o=({blockContent:r,paddingModifier:t})=>{const n=`<div style="background-color: #c8e6c9; padding: 20px;">${r}</div>`;return`
    <div style="background-color: #f0f0f0; padding: 20px;">
      <div style="background-color: #e3f2fd; padding: 10px;">
        <strong>Previous Block</strong>
      </div>
      ${a({block_wrapper__content:n,block_wrapper__extra_classes:["ys-block-wrapper",`ys-block-wrapper--${t}`]})}
      <div style="background-color: #fff3e0; padding: 10px;">
        <strong>Next Block / Footer</strong>
      </div>
    </div>
  `};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  blockContent,
  paddingModifier
}) => {
  const wrappedContent = \`<div style="background-color: #c8e6c9; padding: 20px;">\${blockContent}</div>\`;
  return \`
    <div style="background-color: #f0f0f0; padding: 20px;">
      <div style="background-color: #e3f2fd; padding: 10px;">
        <strong>Previous Block</strong>
      </div>
      \${blockWrapperTwig({
    block_wrapper__content: wrappedContent,
    block_wrapper__extra_classes: ['ys-block-wrapper', \`ys-block-wrapper--\${paddingModifier}\`]
  })}
      <div style="background-color: #fff3e0; padding: 10px;">
        <strong>Next Block / Footer</strong>
      </div>
    </div>
  \`;
}`,...o.parameters?.docs?.source}}};const c=["BlockWrapper"],g=Object.freeze(Object.defineProperty({__proto__:null,BlockWrapper:o,__namedExportsOrder:c,default:s},Symbol.toStringTag,{value:"Module"}));export{g as B,o as a,e as c};
//# sourceMappingURL=block-wrapper.stories-vDpgsecw.js.map
