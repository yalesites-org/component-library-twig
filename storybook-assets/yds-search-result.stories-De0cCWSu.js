import{a2 as l}from"../iframe.js";import{s as t,b as _}from"./breadcrumbs-qxPR8Frx.js";import{t as h,a as u}from"./component-props-De-d7Djp.js";const s={heading:{twigProp:"search_result__title",name:"Heading",type:"string",required:!0,description:"The title/heading of the search result (typically the page title)",control:"text"},url:{twigProp:"search_result__url",name:"URL",type:"string",required:!0,description:"The URL link to the full content",control:"text"},highlighted:{twigProp:"search_result__highlighted",name:"Search Results Highlighted",type:"string",required:!1,description:"Text excerpt with search term highlighted using <strong> tags",control:"text"},teaser:{twigProp:"search_result__teaser",name:"Search Results Teaser",type:"string",required:!1,description:"Meta description or excerpt text (supports HTML)",control:"text"},contentType:{twigProp:"search_result__content_type",name:"Search Results Content Type",type:"string",required:!1,description:"Content type label (e.g., 'post', 'page', 'event')",control:"text"},breadcrumbsItems:{twigProp:"breadcrumbs__items",name:"Breadcrumbs Items",type:"array",required:!1,description:"Breadcrumb trail items showing content hierarchy"},isCas:{twigProp:"is_cas",name:"CAS Login Required",type:"boolean",required:!1,description:"Whether the content requires CAS authentication",default:!1,control:"boolean"},prefixIcon:{twigProp:"search_result__prefix__icon",name:"Prefix Icon",type:"string",required:!1,description:"Icon name to display as prefix (e.g., 'lock-solid' for CAS content)"}},p={title:"Molecules/Search Result",tags:["!dev"],argTypes:u(s),args:{...h(s),heading:t.search_result__title,url:"#",highlighted:t.search_result__highlighted,teaser:t.search_result__teaser,contentType:t.search_result__content_type},parameters:{docs:{description:{component:"Storybook Definition."}}}},e=({heading:a,url:i,highlighted:n,teaser:o,contentType:c,isCas:r})=>l({search_result__teaser:o,search_result__title:a,search_result__url:i,search_result__highlighted:n,breadcrumbs__items:_.items,search_result__content_type:c,search_result__prefix__icon:r?"lock-solid":"",is_cas:r});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  heading,
  url,
  highlighted,
  teaser,
  contentType,
  isCas
}) => searchResultTwig({
  search_result__teaser: teaser,
  search_result__title: heading,
  search_result__url: url,
  search_result__highlighted: highlighted,
  breadcrumbs__items: breadcrumbData.items,
  search_result__content_type: contentType,
  search_result__prefix__icon: isCas ? 'lock-solid' : '',
  is_cas: isCas
})`,...e.parameters?.docs?.source}}};const d=["SearchResult"],f=Object.freeze(Object.defineProperty({__proto__:null,SearchResult:e,__namedExportsOrder:d,default:p},Symbol.toStringTag,{value:"Module"}));export{f as S,e as a,s as c};
//# sourceMappingURL=yds-search-result.stories-De0cCWSu.js.map
