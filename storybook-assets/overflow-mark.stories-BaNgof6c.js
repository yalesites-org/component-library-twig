import{p}from"../iframe.js";import{t as n,a as c}from"./component-props-De-d7Djp.js";import"./yds-animate-Cpj5i7le.js";const t={past:{twigProp:"overflow_mark__past",name:"Past",type:"boolean",required:!1,description:"Gray mark for a past day.",default:!1}},d={title:"Atoms/Event Calendar/Overflow mark",tags:["!dev"],argTypes:c(t),args:n(t),parameters:{docs:{description:{component:`Storybook Definition.
One story per state, plus a Playground that exposes every prop as a Control.`}}}},s=o=>`<div style="padding: var(--size-spacing-5)">${p(o)}</div>`,r=o=>s({overflow_mark__past:o.past}),e=()=>s({}),a=()=>s({overflow_mark__past:!0});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => render({
  overflow_mark__past: args.past
})`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"() => render({})",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => render({
  overflow_mark__past: true
})`,...a.parameters?.docs?.source}}};const m=["Playground","Upcoming","Past"],g=Object.freeze(Object.defineProperty({__proto__:null,Past:a,Playground:r,Upcoming:e,__namedExportsOrder:m,default:d},Symbol.toStringTag,{value:"Module"}));export{r as P,g as S,e as U,a,t as c};
//# sourceMappingURL=overflow-mark.stories-BaNgof6c.js.map
