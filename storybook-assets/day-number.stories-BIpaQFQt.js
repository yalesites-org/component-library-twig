import{k as y}from"../iframe.js";import{t as l,a as c}from"./component-props-De-d7Djp.js";import"./yds-animate-Cpj5i7le.js";const b={number:{twigProp:"day_number__number",name:"Number",type:"string",required:!1,description:"The date shown in the day.",default:"28"},label:{twigProp:"day_number__label",name:"Accessible label",type:"string",required:!1,description:"Full date for screen readers. Rendered as hidden text; the visible number is hidden from assistive tech.",default:"Wednesday, October 28, 4 events"},size:{twigProp:"day_number__size",name:"Size",type:"select",required:!1,description:"32 for the Full month grid, 36 for Compact month and phone days.",default:"36",options:["32","36"],control:"select"},hasEvents:{twigProp:"day_number__has_events",name:"Has events",type:"boolean",required:!1,description:"Bold number. A bold number means the day has events.",default:!1},today:{twigProp:"day_number__today",name:"Today",type:"boolean",required:!1,description:"Yale Blue square with a white bold number.",default:!1},selected:{twigProp:"day_number__selected",name:"Selected",type:"boolean",required:!1,description:"Blue Soft fill with a Medium Blue ring. Compact and phone only.",default:!1},past:{twigProp:"day_number__past",name:"Past",type:"boolean",required:!1,description:"Gray number for a day that has passed.",default:!1},otherMonth:{twigProp:"day_number__other_month",name:"Other month",type:"boolean",required:!1,description:"Gray 100 fill with a gray number, for days outside the shown month.",default:!1}},i={title:"Atoms/Event Calendar/Day number",tags:["!dev"],argTypes:c(b),args:l(b),parameters:{docs:{description:{component:`Storybook Definition.
One story per state, plus a Playground that exposes every prop as a Control.`}}}},r=e=>`<div style="padding: var(--size-spacing-5)">${y(e)}</div>`,a=e=>r({day_number__number:e.number,day_number__label:e.label,day_number__size:e.size,day_number__has_events:e.hasEvents,day_number__today:e.today,day_number__selected:e.selected,day_number__past:e.past,day_number__other_month:e.otherMonth}),n=()=>r({day_number__number:"5",day_number__label:"Sunday, October 25, no events"}),t=()=>r({day_number__number:"6",day_number__has_events:!0,day_number__label:"Tuesday, October 6, 2 events"}),s=()=>r({day_number__number:"26",day_number__today:!0,day_number__has_events:!0,day_number__label:"Monday, October 26, today, 1 event"}),_=()=>r({day_number__number:"28",day_number__selected:!0,day_number__has_events:!0,day_number__label:"Wednesday, October 28, 4 events, selected"}),d=()=>r({day_number__number:"26",day_number__today:!0,day_number__selected:!0,day_number__has_events:!0,day_number__label:"Monday, October 26, today, 1 event, selected"}),o=()=>r({day_number__number:"12",day_number__past:!0,day_number__has_events:!0,day_number__label:"Monday, October 12, 2 events, past"}),u=()=>r({day_number__number:"30",day_number__other_month:!0,day_number__label:"September 30 (previous month)"}),m=()=>r({day_number__number:"6",day_number__size:"32",day_number__has_events:!0,day_number__label:"Tuesday, October 6, 2 events"});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => render({
  day_number__number: args.number,
  day_number__label: args.label,
  day_number__size: args.size,
  day_number__has_events: args.hasEvents,
  day_number__today: args.today,
  day_number__selected: args.selected,
  day_number__past: args.past,
  day_number__other_month: args.otherMonth
})`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => render({
  day_number__number: '5',
  day_number__label: 'Sunday, October 25, no events'
})`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => render({
  day_number__number: '6',
  day_number__has_events: true,
  day_number__label: 'Tuesday, October 6, 2 events'
})`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => render({
  day_number__number: '26',
  day_number__today: true,
  day_number__has_events: true,
  day_number__label: 'Monday, October 26, today, 1 event'
})`,...s.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => render({
  day_number__number: '28',
  day_number__selected: true,
  day_number__has_events: true,
  day_number__label: 'Wednesday, October 28, 4 events, selected'
})`,..._.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => render({
  day_number__number: '26',
  day_number__today: true,
  day_number__selected: true,
  day_number__has_events: true,
  day_number__label: 'Monday, October 26, today, 1 event, selected'
})`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => render({
  day_number__number: '12',
  day_number__past: true,
  day_number__has_events: true,
  day_number__label: 'Monday, October 12, 2 events, past'
})`,...o.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => render({
  day_number__number: '30',
  day_number__other_month: true,
  day_number__label: 'September 30 (previous month)'
})`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => render({
  day_number__number: '6',
  day_number__size: '32',
  day_number__has_events: true,
  day_number__label: 'Tuesday, October 6, 2 events'
})`,...m.parameters?.docs?.source}}};const p=["Playground","NoEvents","HasEvents","Today","Selected","TodayAndSelected","Past","OtherMonth","Size32"],f=Object.freeze(Object.defineProperty({__proto__:null,HasEvents:t,NoEvents:n,OtherMonth:u,Past:o,Playground:a,Selected:_,Size32:m,Today:s,TodayAndSelected:d,__namedExportsOrder:p,default:i},Symbol.toStringTag,{value:"Module"}));export{t as H,n as N,u as O,a as P,f as S,s as T,_ as a,d as b,o as c,m as d,b as e};
//# sourceMappingURL=day-number.stories-BIpaQFQt.js.map
