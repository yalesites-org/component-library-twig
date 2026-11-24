import{m as d}from"../iframe.js";import{t as p,a as i}from"./component-props-De-d7Djp.js";import"./yds-animate-Cpj5i7le.js";const n={past:{twigProp:"event_dot__past",name:"Past",type:"boolean",required:!1,description:"Gray dot for a past event.",default:!1},pointedAt:{twigProp:"event_dot__pointed_at",name:"Pointed at",type:"boolean",required:!1,description:"8px dot while its event is hovered or focused in the list.",default:!1}},c={title:"Atoms/Event Calendar/Event dot",tags:["!dev"],argTypes:i(n),args:p(n),parameters:{docs:{description:{component:`Storybook Definition.
One story per state, plus a Playground that exposes every prop as a Control.`}}}},s=a=>`<div style="padding: var(--size-spacing-5)">${d(a)}</div>`,e=a=>s({event_dot__past:a.past,event_dot__pointed_at:a.pointedAt}),t=()=>s({}),o=()=>s({event_dot__past:!0}),r=()=>s({event_dot__pointed_at:!0});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => render({
  event_dot__past: args.past,
  event_dot__pointed_at: args.pointedAt
})`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"() => render({})",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => render({
  event_dot__past: true
})`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => render({
  event_dot__pointed_at: true
})`,...r.parameters?.docs?.source}}};const _=["Playground","Upcoming","Past","PointedAt"],g=Object.freeze(Object.defineProperty({__proto__:null,Past:o,Playground:e,PointedAt:r,Upcoming:t,__namedExportsOrder:_,default:c},Symbol.toStringTag,{value:"Module"}));export{e as P,g as S,t as U,o as a,r as b,n as c};
//# sourceMappingURL=event-dot.stories-BBOgU4wA.js.map
