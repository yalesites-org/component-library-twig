import{a as t}from"./cl-page-args-BzdE9YLW.js";import{a as d}from"./utility-CZwTYLsb.js";import{ax as h}from"../iframe.js";import{u}from"./utility-nav-cXaVPHEz.js";import{p as c}from"./primary-nav-3-07Xq0g.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-DaWZu8wl.js";const N={title:"Templates/Page Layouts",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:t,args:d(t)},e=({siteName:i,headerBorderThickness:a,primaryNavPosition:r,siteHeaderTheme:_,utilityNavLinkContent:n,utilityNavSearch:s,siteFooterTheme:o,footerBorderThickness:m,menuVariation:l=localStorage.getItem("yds-cl-twig-menu-variation")})=>h({site_name:i,site_header__border_thickness:a,site_header__branding_link:"https://www.yale.edu",site_header__site_link:"/",site_header__nav_position:r,site_header__theme:_,site_footer__border_thickness:m,site_footer__theme:o,utility_nav__items:u.items,utility_nav__link__content:n,utility_nav__link__url:"#",utility_nav__search:s,primary_nav__items:c.items,menu__variation:l});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  siteName,
  headerBorderThickness,
  primaryNavPosition,
  siteHeaderTheme,
  utilityNavLinkContent,
  utilityNavSearch,
  siteFooterTheme,
  footerBorderThickness,
  menuVariation = localStorage.getItem('yds-cl-twig-menu-variation')
}) => fullWidthTwig({
  site_name: siteName,
  site_header__border_thickness: headerBorderThickness,
  site_header__branding_link: 'https://www.yale.edu',
  site_header__site_link: '/',
  site_header__nav_position: primaryNavPosition,
  site_header__theme: siteHeaderTheme,
  site_footer__border_thickness: footerBorderThickness,
  site_footer__theme: siteFooterTheme,
  utility_nav__items: utilityNavData.items,
  utility_nav__link__content: utilityNavLinkContent,
  utility_nav__link__url: '#',
  utility_nav__search: utilityNavSearch,
  primary_nav__items: primaryNavData.items,
  menu__variation: menuVariation
})`,...e.parameters?.docs?.source}}};const w=["fullWidth"];export{w as __namedExportsOrder,N as default,e as fullWidth};
//# sourceMappingURL=page-layouts.stories-B3OapVCa.js.map
