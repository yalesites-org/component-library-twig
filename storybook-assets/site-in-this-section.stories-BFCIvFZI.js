import{an as a,am as r,t as _}from"../iframe.js";import{s as c}from"./yds-secondary-nav-C0lFKjnN.js";import{u as l}from"./utility-nav-cXaVPHEz.js";import{p as d}from"./primary-nav-3-07Xq0g.js";import{t as h,a as m}from"./component-props-De-d7Djp.js";import"./yds-site-in-this-section-5Rlc7puJ.js";import"./yds-menu-toggle-CCw3uUL5.js";/* empty css                                */const i={collectionNavDisplay:{name:"Collection Navigation Display",type:"select",required:!1,description:"Where to display the collection navigation (in content or in header)",detail:`Storybook-only toggle that controls which Twig template is rendered. 'in_content' renders the site-in-this-section component; 'in_header' renders the site-header component with the collection nav embedded inside. There is no single corresponding Twig prop — the value is used in the story render function to choose between templates.
`,default:"in_content",options:["in_content","in_header"],control:"select"},siteSectionTheme:{twigProp:"site_section_wrap__theme",name:"Component Theme (dial)",type:"select",required:!1,description:"Color theme applied to the site-in-this-section component (visible when displayed in content)",detail:`Applies a color theme when the component is displayed in content position. Lists one to five, matching Drupal's book_navigation theme setting, rather than every component-themes token.
`,default:"one",options:["one","two","three","four","five"],control:"select",labels:{one:"One",two:"Two",three:"Three",four:"Four",five:"Five"}},siteHeaderTheme:{twigProp:"site_header__theme",name:"Header Theme (dial)",type:"select",required:!1,description:"Color theme for the site header (visible when collection nav is displayed in header)",detail:`Controls the site header color scheme when the collection nav is embedded in the header. Options are derived from the site-header-themes design tokens.
`,default:"one",control:"select",labels:{one:"Base & White",two:"Action & Dark Gray",three:"Highlight & Yale Blue"}}},p=Object.keys(_["site-header-themes"]),e=m(i);e.siteSectionTheme={...e.siteSectionTheme,if:{arg:"collectionNavDisplay",eq:"in_content"}};e.siteHeaderTheme={...e.siteHeaderTheme,options:p,if:{arg:"collectionNavDisplay",eq:"in_header"}};e.collectionNavDisplay={...e.collectionNavDisplay,control:{type:"select",labels:{in_content:"In Content Section",in_header:"In Site Header"}}};const v={title:"Organisms/Global Elements/In This Section",tags:["!dev"],parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:e,args:h(i)},t=({collectionNavDisplay:n,siteSectionTheme:o,siteHeaderTheme:s})=>n==="in_header"?a({site_header__site_name:"Institution for Social and Policy Studies",site_header__site_link:"/",site_header__border_thickness:"8",site_header__nav_position:"left",site_header__theme:s,site_header__accent:"one",site_header__menu__variation:"basic",site_header__collection_nav_position:"in_header",site_header__collection_nav_name:"Yale Interdisciplinary Center for Bioethics",site_header__collection_nav_link:"#",utility_nav__items:l.items,primary_nav__items:d.items}):r({site_section_wrap__theme:o,secondary_nav__items:c.items});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  collectionNavDisplay,
  siteSectionTheme,
  siteHeaderTheme
}) => {
  if (collectionNavDisplay === 'in_header') {
    return siteHeaderTwig({
      site_header__site_name: 'Institution for Social and Policy Studies',
      site_header__site_link: '/',
      site_header__border_thickness: '8',
      site_header__nav_position: 'left',
      site_header__theme: siteHeaderTheme,
      site_header__accent: 'one',
      site_header__menu__variation: 'basic',
      site_header__collection_nav_position: 'in_header',
      site_header__collection_nav_name: 'Yale Interdisciplinary Center for Bioethics',
      site_header__collection_nav_link: '#',
      utility_nav__items: utilityNavData.items,
      primary_nav__items: primaryNavData.items
    });
  }
  return siteSectionTwig({
    site_section_wrap__theme: siteSectionTheme,
    secondary_nav__items: secondaryNavData.items
  });
}`,...t.parameters?.docs?.source}}};const y=["SiteSection"],k=Object.freeze(Object.defineProperty({__proto__:null,SiteSection:t,__namedExportsOrder:y,default:v},Symbol.toStringTag,{value:"Module"}));export{k as S,t as a,i as c};
//# sourceMappingURL=site-in-this-section.stories-BFCIvFZI.js.map
