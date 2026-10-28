import{aQ as d}from"../iframe.js";import{u as t}from"./utility-nav-cXaVPHEz.js";import{t as s,a as u}from"./component-props-De-d7Djp.js";import"./utility-nav-dropdown-menu-RsHeUm6w.js";const e={items:{twigProp:"items",name:"Items",type:"array",required:!1,description:"Array of navigation menu items with title and url properties",detail:`Array of standard menu link objects rendered in the utility bar. Each item requires title and url. Provided by the component's default data and not directly editable via the Controls panel.
`},linkContent:{twigProp:"utility_nav__link__content",name:"Link Content",type:"string",required:!1,description:"Text content for the primary call-to-action button",control:"text"},linkUrl:{twigProp:"utility_nav__link__url",name:"Link URL",type:"string",required:!1,description:"URL destination for the primary call-to-action button",control:"text"},search:{twigProp:"utility_nav__search",name:"Enable Search Form",type:"boolean",required:!1,description:"Whether to display the search input field",default:!1,control:"boolean"},ctaTheme:{twigProp:"utility_nav__cta__theme",name:"CTA Theme",type:"string",required:!1,description:"Theme variant for the call-to-action button styling",default:"none",fixed:"Set by the site header theme and global theme. See Organisms/Site Header."},dropdownLinkContent:{twigProp:"utility_nav__dropdown_link__content",name:"Dropdown Link Content",type:"string",required:!1,description:"Text content for the dropdown menu trigger button",control:"text"},dropdownLinkUrl:{twigProp:"utility_nav__dropdown_link__url",name:"Dropdown Link URL",type:"string",required:!1,description:"URL destination for the dropdown menu trigger button. Fixed in Drupal.",default:"#",fixed:!0},dropdownItems:{twigProp:"utility_nav__dropdown__items",name:"Dropdown Items",type:"array",required:!1,description:"Array of dropdown menu items with title and url properties for the dropdown menu",detail:`Array of standard menu link objects rendered in the dropdown menu. Each item requires title and url. Provided by the component's default data and not directly editable via the Controls panel.
`}},p={title:"Organisms/Menu/Utility Nav",tags:["!dev"],argTypes:u(e),args:{...s(e),linkContent:t.utility_nav__link__content,linkUrl:t.utility_nav__link__url,search:t.utility_nav__search,dropdownLinkContent:t.utility_nav__dropdown_link__content},parameters:{docs:{description:{component:"Storybook Definition."}}}},n=({linkContent:i,linkUrl:r,search:o,ctaTheme:a,dropdownLinkContent:_,dropdownLinkUrl:l})=>d({items:t.items,utility_nav__link__content:i,utility_nav__link__url:r,utility_nav__search:o,utility_nav__cta__theme:a,utility_nav__dropdown_link__content:_,utility_nav__dropdown_link__url:l,utility_nav__dropdown__items:t.utility_nav__dropdown__items});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`({
  linkContent,
  linkUrl,
  search,
  ctaTheme,
  dropdownLinkContent,
  dropdownLinkUrl
}) => utilityNavTwig({
  items: utilityNavData.items,
  utility_nav__link__content: linkContent,
  utility_nav__link__url: linkUrl,
  utility_nav__search: search,
  utility_nav__cta__theme: ctaTheme,
  utility_nav__dropdown_link__content: dropdownLinkContent,
  utility_nav__dropdown_link__url: dropdownLinkUrl,
  utility_nav__dropdown__items: utilityNavData.utility_nav__dropdown__items
})`,...n.parameters?.docs?.source}}};const c=["UtilityNav"],w=Object.freeze(Object.defineProperty({__proto__:null,UtilityNav:n,__namedExportsOrder:c,default:p},Symbol.toStringTag,{value:"Module"}));export{w as U,n as a,e as c};
//# sourceMappingURL=utility-nav.stories-DDlqu3dN.js.map
