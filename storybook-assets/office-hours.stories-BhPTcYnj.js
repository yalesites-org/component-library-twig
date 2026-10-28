import{e as w,Y as T}from"../iframe.js";import{d as s}from"./yds-office-hours-ChoTirR8.js";import{a as k}from"./playground-utils-DQnyvH8W.js";const b={title:"Molecules/Office Hours",argTypes:{sectionTheme:{name:"Section theme",options:w,control:"select"},componentTheme:{name:"Theme (block dial)",options:["default","one","two","three","four","five","six"],control:"select"},width:{name:"Block width (px)",control:{type:"number",min:280,max:1200}}},args:{sectionTheme:"default",componentTheme:"default",width:760},parameters:{docs:{description:{component:"Storybook Definition."}}}},r=(...e)=>s.office_hours__days.filter(a=>e.includes(a.label)),o=(e,{sectionTheme:a,componentTheme:i,width:S})=>k(a,`<div style="max-width: ${S}px">${T({...s,office_hours__upcoming:[],office_hours__theme:i,...e})}</div>`),_=e=>o({office_hours__upcoming:s.office_hours__upcoming},e),u=e=>o({office_hours__days:r("Sunday","Wednesday")},e),m=e=>o({office_hours__days:r("Thursday")},e),f=e=>o({office_hours__days:r("Monday","Wednesday")},e),p=e=>o({office_hours__days:r("Saturday","Sunday")},e),y=e=>o({office_hours__days:r("Thursday","Wednesday")},e),h=e=>o({office_hours__days:r("Monday","Tuesday","Wednesday")},e),g=e=>o({office_hours__days:r("Thursday","Friday")},e),l=e=>o({office_hours__days:r("Tuesday","Wednesday"),office_hours__upcoming:s.office_hours__upcoming},e),c=e=>o({office_hours__days:s.office_hours__days.map((a,i)=>({...a,weekday:i})),office_hours__upcoming:s.office_hours__upcoming,office_hours__timezone:"America/New_York"},e);c.args={componentTheme:"one"};const t=e=>o({office_hours__upcoming:s.office_hours__upcoming},e);t.args={width:305};const n=e=>o({office_hours__days:s.office_hours__days.map((a,i)=>({...a,today:!1,weekday:i})),office_hours__timezone:"America/New_York"},e),d=e=>o({office_hours__days:[],office_hours__empty_message:"Hours: no days filled in yet."},e);_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`args => render({
  office_hours__upcoming: data.office_hours__upcoming
}, args)`,..._.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: days('Sunday', 'Wednesday')
}, args)`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: days('Thursday')
}, args)`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: days('Monday', 'Wednesday')
}, args)`,...f.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: days('Saturday', 'Sunday')
}, args)`,...p.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: days('Thursday', 'Wednesday')
}, args)`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: days('Monday', 'Tuesday', 'Wednesday')
}, args)`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: days('Thursday', 'Friday')
}, args)`,...g.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: days('Tuesday', 'Wednesday'),
  office_hours__upcoming: data.office_hours__upcoming
}, args)`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: data.office_hours__days.map((day, weekday) => ({
    ...day,
    weekday
  })),
  office_hours__upcoming: data.office_hours__upcoming,
  office_hours__timezone: 'America/New_York'
}, args)`,...c.parameters?.docs?.source},description:{story:`A theme other than Default paints the block in that component theme instead
of the section's colors. Today tint, bar, Exception tag and status pill all
follow it.`,...c.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => render({
  office_hours__upcoming: data.office_hours__upcoming
}, args)`,...t.parameters?.docs?.source},description:{story:"Under a 340px content box each row stacks: day, hours, then the note.",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: data.office_hours__days.map((day, weekday) => ({
    ...day,
    today: false,
    weekday
  })),
  office_hours__timezone: 'America/New_York'
}, args)`,...n.parameters?.docs?.source},description:{story:`The status line is computed by the behavior from each row's weekday and the
current time, so this story changes with the clock.`,...n.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => render({
  office_hours__days: [],
  office_hours__empty_message: 'Hours: no days filled in yet.'
}, args)`,...d.parameters?.docs?.source},description:{story:`Nothing entered: the public page renders nothing at all. Layout Builder
passes a placeholder message instead.`,...d.parameters?.docs?.description}}};const W=["FullWeek","NormalHours","TwoSlots","ClosedDay","OpenAllDay","Comment","TodayRow","ExceptionRow","UpcomingChanges","ComponentTheme","Narrow","LiveStatus","Empty"],H=Object.freeze(Object.defineProperty({__proto__:null,ClosedDay:f,Comment:y,ComponentTheme:c,Empty:d,ExceptionRow:g,FullWeek:_,LiveStatus:n,Narrow:t,NormalHours:u,OpenAllDay:p,TodayRow:h,TwoSlots:m,UpcomingChanges:l,__namedExportsOrder:W,default:b},Symbol.toStringTag,{value:"Module"}));export{g as E,_ as F,n as L,t as N,H as O,l as U,d as a};
//# sourceMappingURL=office-hours.stories-BhPTcYnj.js.map
