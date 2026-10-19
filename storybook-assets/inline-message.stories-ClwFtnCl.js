import{N as m}from"../iframe.js";import{f as i}from"./facts-and-figures-icons-DGGA7p6m.js";import{t as g,a as d}from"./component-props-De-d7Djp.js";const s={iconName:{twigProp:"inline_message__icon_name",name:"Icon",type:"select",required:!1,description:'Decorative icon shown beside the message, drawn from the shared icon set. "_none" shows no icon. When left unset, the icon falls back to the type-derived default. The full option list is populated from the shared icon manifest in the story controls.',default:"_none",control:"select"},heading:{twigProp:"inline_message__heading",name:"Heading",type:"string",required:!1,description:"Heading text for the message",control:"text"},content:{twigProp:"inline_message__content",name:"Content",type:"string",required:!1,description:"Main content of the message (supports HTML)",control:"text"},themeColor:{twigProp:"inline_message__theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Component theme dial controlling background and text colors",default:"one",options:["one","two","three","four","five","six"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six"}},linkContent:{twigProp:"inline_message__link__content",name:"Link Content",type:"string",required:!1,description:"Optional link text displayed within the message",control:"text"},linkUrl:{twigProp:"inline_message__link__url",name:"Link URL",type:"string",required:!1,description:"URL for the optional link",control:"text"}},p=["_none",...Object.keys(i.icons||{})],o=d(s);o.iconName&&(o.iconName.options=p,o.iconName.control={...o.iconName.control,labels:{_none:i.config?.none_label,...i.icons}});const h={title:"Molecules/Inline Message",tags:["!dev"],argTypes:o,args:{...g(s),heading:"This is a general message heading",content:"This is a general message content",linkContent:"This is a link",linkUrl:"#"},parameters:{docs:{description:{component:"Storybook Definition."}}}},n=({iconName:t,heading:a,content:r,themeColor:l,linkContent:c,linkUrl:_})=>m({inline_message__heading:a,inline_message__content:r,inline_message__icon_name:t,inline_message__theme:l,inline_message__link__content:c,inline_message__link__url:_}),e=t=>n({...t,iconName:"lightbulb-solid"});e.args={heading:"Pro tip for editors",content:"Pick any icon from the shared set to match the tone of your message."};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`({
  iconName,
  heading,
  content,
  themeColor,
  linkContent,
  linkUrl
}) => inlineMessageTwig({
  inline_message__heading: heading,
  inline_message__content: content,
  inline_message__icon_name: iconName,
  inline_message__theme: themeColor,
  inline_message__link__content: linkContent,
  inline_message__link__url: linkUrl
})`,...n.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => InlineMessage({
  ...args,
  iconName: 'lightbulb-solid'
})`,...e.parameters?.docs?.source},description:{story:`Demonstrates an explicitly chosen icon from the shared icon set. Use the
"Icon" control to preview any available variant.`,...e.parameters?.docs?.description}}};const f=["InlineMessage","WithIcon"],b=Object.freeze(Object.defineProperty({__proto__:null,InlineMessage:n,WithIcon:e,__namedExportsOrder:f,default:h},Symbol.toStringTag,{value:"Module"}));export{b as I,n as a,s as c};
//# sourceMappingURL=inline-message.stories-ClwFtnCl.js.map
