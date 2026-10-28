import{av as r}from"../iframe.js";import{t as n,a as p}from"./component-props-De-d7Djp.js";const o={componentWidth:{twigProp:"component_wrapper__width",name:"Component Width",type:"select",required:!1,description:"Maximum width constraint for the component content area",default:"site",options:["content","site"],control:"select"}},a={title:"Templates/Component Wrapper",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:p(o),args:n(o)},e=({componentWidth:t})=>r({component_wrapper__width:t});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  componentWidth
}) => {
  return componentWrapperTwig({
    component_wrapper__width: componentWidth
  });
}`,...e.parameters?.docs?.source}}};const s=["ComponentWrapper"],m=Object.freeze(Object.defineProperty({__proto__:null,ComponentWrapper:e,__namedExportsOrder:s,default:a},Symbol.toStringTag,{value:"Module"}));export{m as C,e as a,o as c};
//# sourceMappingURL=component-wrapper.stories-DkZVqBQv.js.map
