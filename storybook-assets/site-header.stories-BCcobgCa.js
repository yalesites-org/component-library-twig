import{am as c,aO as h,t as p}from"../iframe.js";import{u as g}from"./utility-nav-cXaVPHEz.js";import{p as u}from"./primary-nav-3-07Xq0g.js";import{i as v}from"./image-CSdbOboU.js";import{t as f,a as y}from"./component-props-De-d7Djp.js";import"./yds-menu-toggle-CCw3uUL5.js";const a={borderThickness:{twigProp:"site_header__border_thickness",name:"Navigation Border Thickness",type:"select",required:!1,description:"Border thickness for the navigation area. Fixed in Drupal.",default:"8",fixed:!0},primaryNavPosition:{twigProp:"site_header__nav_position",name:"Navigation Position",type:"select",required:!1,description:"Horizontal alignment of the primary navigation within the header",default:"left",options:["left","center","right"],control:"select",labels:{left:"Left",center:"Center",right:"Right"}},menuVariation:{twigProp:"site_header__menu__variation",name:"Header Variation",type:"select",required:!1,description:"Display style for the primary navigation menu",default:"basic",options:["basic","mega","focus"],control:"select",labels:{basic:"Basic Nav",mega:"Mega Nav",focus:"Focus Nav"}},siteHeaderImage:{twigProp:"site_header__background_image",name:"Header With Image",type:"boolean",required:!1,description:"Enable background image on the header (only works with focus menu variation)",default:!1,control:"boolean"},siteHeaderSiteNameImage:{twigProp:"site_header__site_name_image",name:"Site Name is an Image",type:"boolean",required:!1,description:"Display an image in place of the text site name",detail:`When true, renders an example SVG image as the site name. In production, the actual site name image SVG is provided via site_header__site_name_image.
`,default:!1,control:"boolean"},siteHeaderTheme:{twigProp:"site_header__theme",name:"Header Theme (dial)",type:"select",required:!1,description:"Color theme applied to the site header",detail:`Controls the overall header color scheme. Options are derived from the site-header-themes design tokens.
`,default:"one",control:"select",labels:{one:"Base & White",two:"Action & Dark Gray",three:"Highlight & Yale Blue"}},siteHeaderAccent:{twigProp:"site_header__accent",name:"Header Accent Color (dial)",type:"select",required:!1,description:"Accent color applied to interactive elements in the header",default:"one",options:["one","two","three","four","five","six","seven","eight"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five",six:"Six",seven:"Seven",eight:"Eight"}},siteWideHeaderName:{twigProp:"site_header__branding_name",name:"Site Wide Header Name",type:"string",required:!1,description:"University-wide branding name displayed in the header",control:"text"},siteWideHeaderUrl:{twigProp:"site_header__branding_link",name:"Site Wide Header URL",type:"string",required:!1,description:"URL for the university-wide branding link",control:"text"}},H=Object.keys(p["site-header-themes"]),i=y(a);i.siteHeaderTheme={...i.siteHeaderTheme,options:H};const b={title:"Organisms/Global Elements/Header",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:i,args:{...f(a),siteWideHeaderName:"Yale University",siteWideHeaderUrl:"https://www.yale.edu"}},e=({borderThickness:t,primaryNavPosition:r,siteHeaderTheme:n,menuVariation:s,siteHeaderImage:o,siteHeaderSiteNameImage:_,siteHeaderAccent:d,siteWideHeaderName:m,siteWideHeaderUrl:l})=>c({...v.responsive_images["16x9"],site_header__site_name:"Department of Chemistry",site_header__site_link:"/",site_header__border_thickness:t,site_header__nav_position:r,site_header__theme:n,site_header__accent:d,site_header__menu__variation:s,site_header__background_image:o,site_header__site_name_image:_?h:!1,site_header__branding_name:m,site_header__branding_link:l,site_header__collection_nav_position:"",site_header__collection_nav_name:"",site_header__collection_nav_link:"",utility_nav__items:g.items,primary_nav__items:u.items});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  borderThickness,
  primaryNavPosition,
  siteHeaderTheme,
  menuVariation,
  siteHeaderImage,
  siteHeaderSiteNameImage,
  siteHeaderAccent,
  siteWideHeaderName,
  siteWideHeaderUrl
}) => siteHeaderTwig({
  ...imageData.responsive_images['16x9'],
  site_header__site_name: 'Department of Chemistry',
  site_header__site_link: '/',
  site_header__border_thickness: borderThickness,
  site_header__nav_position: primaryNavPosition,
  site_header__theme: siteHeaderTheme,
  site_header__accent: siteHeaderAccent,
  site_header__menu__variation: menuVariation,
  site_header__background_image: siteHeaderImage,
  site_header__site_name_image: siteHeaderSiteNameImage ? exampleSiteNameImageSvg : false,
  site_header__branding_name: siteWideHeaderName,
  site_header__branding_link: siteWideHeaderUrl,
  site_header__collection_nav_position: '',
  site_header__collection_nav_name: '',
  site_header__collection_nav_link: '',
  utility_nav__items: utilityNavData.items,
  primary_nav__items: primaryNavData.items
})`,...e.parameters?.docs?.source}}};const k=["Header"],D=Object.freeze(Object.defineProperty({__proto__:null,Header:e,__namedExportsOrder:k,default:b},Symbol.toStringTag,{value:"Module"}));export{e as H,D as S,a as c};
//# sourceMappingURL=site-header.stories-BCcobgCa.js.map
