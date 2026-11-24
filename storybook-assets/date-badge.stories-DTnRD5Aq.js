import{j as p}from"../iframe.js";import{t as l,a as u}from"./component-props-De-d7Djp.js";import"./yds-animate-Cpj5i7le.js";const c={weekday:{twigProp:"date_badge__weekday",name:"Weekday",type:"string",required:!1,description:"Weekday in small caps, for example Tue. A range reads Thu–Sat.",default:"Tue",control:"text"},date:{twigProp:"date_badge__date",name:"Date",type:"string",required:!1,description:"Date number, for example 27. A range reads 15–17.",default:"27",control:"text"},label:{twigProp:"date_badge__label",name:"Accessible label",type:"string",required:!1,description:"Full date for screen readers. Rendered as hidden text; the visible weekday and date are hidden from assistive tech.",default:"Tuesday, October 27",control:"text"},range:{twigProp:"date_badge__range",name:"Range",type:"boolean",required:!1,description:"A date range instead of a single day. Pass the range in Weekday and Date.",default:!1},today:{twigProp:"date_badge__today",name:"Today",type:"boolean",required:!1,description:"Solid Yale Blue with white text.",default:!1},past:{twigProp:"date_badge__past",name:"Past",type:"boolean",required:!1,description:"Gray 600 fill with white text (6.5:1). Ignored when Today is set.",default:!1}},b={title:"Atoms/Event Calendar/Date badge",tags:["!dev"],argTypes:u(c),args:l(c),parameters:{docs:{description:{component:`Storybook Definition.
A story for each state in both single-day and range form, plus a Playground.`}}}},g={date_badge__weekday:"Tue",date_badge__date:"27",date_badge__label:"Tuesday, October 27"},i={date_badge__range:!0,date_badge__weekday:"Thu–Sat",date_badge__date:"15–17",date_badge__label:"Thursday, October 15 to Saturday, October 17"},a=e=>`<div style="padding: var(--size-spacing-5)">${p(e)}</div>`,t=e=>a({date_badge__weekday:e.weekday,date_badge__date:e.date,date_badge__label:e.label,date_badge__range:e.range,date_badge__today:e.today,date_badge__past:e.past}),r=()=>a(g),d=()=>a(i),s=()=>a({...g,date_badge__today:!0}),o=()=>a({...i,date_badge__today:!0}),n=()=>a({...g,date_badge__past:!0}),_=()=>a({...i,date_badge__past:!0});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => render({
  date_badge__weekday: args.weekday,
  date_badge__date: args.date,
  date_badge__label: args.label,
  date_badge__range: args.range,
  date_badge__today: args.today,
  date_badge__past: args.past
})`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"() => render(single)",...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"() => render(range)",...d.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => render({
  ...single,
  date_badge__today: true
})`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => render({
  ...range,
  date_badge__today: true
})`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => render({
  ...single,
  date_badge__past: true
})`,...n.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => render({
  ...range,
  date_badge__past: true
})`,..._.parameters?.docs?.source}}};const m=["Playground","Upcoming","UpcomingRange","Today","TodayRange","Past","PastRange"],T=Object.freeze(Object.defineProperty({__proto__:null,Past:n,PastRange:_,Playground:t,Today:s,TodayRange:o,Upcoming:r,UpcomingRange:d,__namedExportsOrder:m,default:b},Symbol.toStringTag,{value:"Module"}));export{t as P,T as S,s as T,r as U,d as a,o as b,n as c,_ as d,c as e};
//# sourceMappingURL=date-badge.stories-DTnRD5Aq.js.map
