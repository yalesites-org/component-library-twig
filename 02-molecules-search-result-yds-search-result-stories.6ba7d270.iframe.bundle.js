(self.webpackChunk_yalesites_org_component_library_twig=self.webpackChunk_yalesites_org_component_library_twig||[]).push([[888],{"./components/02-molecules/search-result/yds-search-result.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SearchResult:()=>SearchResult,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _yds_search_result_twig__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./components/02-molecules/search-result/yds-search-result.twig"),_yds_search_result_twig__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_yds_search_result_twig__WEBPACK_IMPORTED_MODULE_0__),_search_result_yml__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./components/02-molecules/search-result/search-result.yml"),_search_result_yml__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_search_result_yml__WEBPACK_IMPORTED_MODULE_1__),_breadcrumbs_yml__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/02-molecules/search-result/breadcrumbs.yml"),_breadcrumbs_yml__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_breadcrumbs_yml__WEBPACK_IMPORTED_MODULE_2__);const __WEBPACK_DEFAULT_EXPORT__={title:"Molecules/Search Result",argTypes:{heading:{name:"Heading",type:"string"},highlighted:{name:"Search Results Highlighted",type:"string"},teaser:{name:"Search Results Teaser",type:"string"},contentType:{name:"Search Results Content Type",type:"string",defaultValue:_search_result_yml__WEBPACK_IMPORTED_MODULE_1___default().search_result__content_type},isCas:{name:"Is CAS",type:"boolean"}},args:{heading:_search_result_yml__WEBPACK_IMPORTED_MODULE_1___default().search_result__title,highlighted:_search_result_yml__WEBPACK_IMPORTED_MODULE_1___default().search_result__highlighted,teaser:_search_result_yml__WEBPACK_IMPORTED_MODULE_1___default().search_result__teaser},parameters:{docs:{description:{component:"Storybook Definition."}}}},SearchResult=({heading,highlighted,teaser,contentType,isCas})=>_yds_search_result_twig__WEBPACK_IMPORTED_MODULE_0___default()({search_result__teaser:teaser,search_result__title:heading,search_result__url:"#",search_result__highlighted:highlighted,breadcrumbs__items:_breadcrumbs_yml__WEBPACK_IMPORTED_MODULE_2___default().items,search_result__content_type:contentType,search_result__prefix__icon:isCas?"lock-solid":"",is_cas:isCas}),__namedExportsOrder=["SearchResult"];SearchResult.parameters={...SearchResult.parameters,docs:{...SearchResult.parameters?.docs,source:{originalSource:"({\n  heading,\n  highlighted,\n  teaser,\n  contentType,\n  isCas\n}) => searchResultTwig({\n  search_result__teaser: teaser,\n  search_result__title: heading,\n  search_result__url: '#',\n  search_result__highlighted: highlighted,\n  breadcrumbs__items: breadcrumbData.items,\n  search_result__content_type: contentType,\n  search_result__prefix__icon: isCas ? 'lock-solid' : '',\n  is_cas: isCas\n})",...SearchResult.parameters?.docs?.source}}}},"./components/02-molecules/search-result/breadcrumbs.yml":module=>{const doc=[{items:[{title:"Home",url:"#",is_active:!0},{title:"Academic Programs",url:"#",is_active:!0},{title:"Undergraduate Chemistry",url:"#",is_active:!0}]}];module.exports=doc.length<=1?doc[0]:doc},"./components/02-molecules/search-result/search-result.yml":module=>{const doc=[{search_result__title:"Page title",search_result__highlighted:"...showing <strong>word</strong> in page result...",search_result__teaser:"<p>Meta text here if available. Lorem ipsum dolor amet four loko distillery typewriter twee prism. Umami pinterest knausgaard four dollar toast occupy.</p>",search_result__content_type:"post"}];module.exports=doc.length<=1?doc[0]:doc},"./components/01-atoms/controls/base/yds-control.twig":(module,__unused_webpack_exports,__webpack_require__)=>{__webpack_require__("./components/01-atoms/images/icons/_yds-icon.twig");var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{atoms:"/home/runner/work/component-library-twig/component-library-twig/components/01-atoms",molecules:"/home/runner/work/component-library-twig/component-library-twig/components/02-molecules",organisms:"/home/runner/work/component-library-twig/component-library-twig/components/03-organisms","page-layouts":"/home/runner/work/component-library-twig/component-library-twig/components/04-page-layouts","page-examples":"/home/runner/work/component-library-twig/component-library-twig/components/05-page-examples"},id:"6ed8a1d03d3343010f4e1a6333185741795b12c3bef17dc74664500d14a35b7b3908b9e7982062a124c435e53338399183918a21d75c8acd42ce4f60aa469637",data:[{type:"raw",value:"\n\n",position:{start:155,end:157}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__attributes",expression:[{type:"Twig.expression.type.variable",value:"control__attributes",match:["control__attributes"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:157,end:220}},position:{start:157,end:220}},{type:"raw",value:"\n",position:{start:221,end:222}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"control__url",match:["control__url"]},{type:"Twig.expression.type.filter",value:"length",match:["|length","length"]},{type:"Twig.expression.type.number",value:0,match:["0",null]},{type:"Twig.expression.type.operator.binary",value:">",precidence:8,associativity:"leftToRight",operator:">"},{type:"Twig.expression.type.variable",value:"control__type",match:["control__type"]},{type:"Twig.expression.type.string",value:"dropdown"},{type:"Twig.expression.type.operator.binary",value:"!=",precidence:9,associativity:"leftToRight",operator:"!="},{type:"Twig.expression.type.operator.binary",value:"and",precidence:13,associativity:"leftToRight",operator:"and"}],position:{start:222,end:286},output:[{type:"raw",value:"  ",position:{start:287,end:289}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__url_type",expression:[{type:"Twig.expression.type.variable",value:"control__url_type",match:["control__url_type"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type._function",fn:"getUrlType",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"control__url",match:["control__url"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"control__attributes",match:["control__attributes"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:289,end:391}},position:{start:289,end:391}},{type:"raw",value:"  ",position:{start:392,end:394}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__base_class",expression:[{type:"Twig.expression.type.variable",value:"control__base_class",match:["control__base_class"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"link"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:394,end:461}},position:{start:394,end:461}},{type:"raw",value:"  ",position:{start:462,end:464}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__element",expression:[{type:"Twig.expression.type.string",value:"a"}],position:{start:464,end:496}},position:{start:464,end:496}},{type:"raw",value:"  ",position:{start:497,end:499}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__attributes",expression:[{type:"Twig.expression.type.variable",value:"control__attributes",match:["control__attributes"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"href"},{type:"Twig.expression.type.variable",value:"control__url",match:["control__url"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:499,end:587}},position:{start:499,end:587}}]},position:{open:{start:222,end:286},close:{start:588,end:598}}},{type:"logic",token:{type:"Twig.logic.type.else",match:["else"],position:{start:588,end:598},output:[{type:"raw",value:"  ",position:{start:599,end:601}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__url_type",expression:[{type:"Twig.expression.type.variable",value:"control__url_type",match:["control__url_type"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"internal"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:601,end:668}},position:{start:601,end:668}},{type:"raw",value:"  ",position:{start:669,end:671}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__base_class",expression:[{type:"Twig.expression.type.variable",value:"control__base_class",match:["control__base_class"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"button"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:671,end:740}},position:{start:671,end:740}},{type:"raw",value:"  ",position:{start:741,end:743}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__element",expression:[{type:"Twig.expression.type.variable",value:"control__element",match:["control__element"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"button"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:743,end:806}},position:{start:743,end:806}},{type:"raw",value:"  \n  ",position:{start:807,end:812}},{type:"raw",value:"\n  ",position:{start:906,end:909}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"control__type",match:["control__type"]},{type:"Twig.expression.type.string",value:"dropdown"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],position:{start:909,end:945},output:[{type:"raw",value:"    ",position:{start:946,end:950}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__url_type",expression:[{type:"Twig.expression.type.variable",value:"control__url_type",match:["control__url_type"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"dropdown"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:950,end:1017}},position:{start:950,end:1017}},{type:"raw",value:"  ",position:{start:1018,end:1020}}]},position:{open:{start:909,end:945},close:{start:1020,end:1031}}},{type:"raw",value:"\n  ",position:{start:1032,end:1035}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"aria_expanded",match:["aria_expanded"]}],position:{start:1035,end:1057},output:[{type:"raw",value:"    ",position:{start:1058,end:1062}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__attributes",expression:[{type:"Twig.expression.type.variable",value:"control__attributes",match:["control__attributes"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"aria-expanded"},{type:"Twig.expression.type.variable",value:"aria_expanded",match:["aria_expanded"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:1062,end:1166}},position:{start:1062,end:1166}},{type:"raw",value:"  ",position:{start:1167,end:1169}}]},position:{open:{start:1035,end:1057},close:{start:1169,end:1180}}}]},position:{open:{start:588,end:598},close:{start:1181,end:1192}}},{type:"raw",value:"\n",position:{start:1193,end:1194}},{type:"logic",token:{type:"Twig.logic.type.set",key:"control__attributes",expression:[{type:"Twig.expression.type.variable",value:"control__attributes",match:["control__attributes"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type._function",fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"control__base_class",match:["control__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"control__modifiers",match:["control__modifiers"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"control__blockname",match:["control__blockname"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:1194,end:1331}},position:{start:1194,end:1331}},{type:"raw",value:"\n<",position:{start:1332,end:1334}},{type:"output",position:{start:1334,end:1356},stack:[{type:"Twig.expression.type.variable",value:"control__element",match:["control__element"],position:{start:1334,end:1356}}]},{type:"raw",value:" ",position:{start:1356,end:1357}},{type:"output",position:{start:1357,end:1398},stack:[{type:"Twig.expression.type._function",position:{start:1357,end:1398},fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:1357,end:1398}},{type:"Twig.expression.type.variable",value:"control__attributes",match:["control__attributes"],position:{start:1357,end:1398}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:1357,end:1398},expression:!1}]}]},{type:"raw",value:">",position:{start:1398,end:1402}},{type:"output_whitespace_both",position:{start:1402,end:1426},stack:[{type:"Twig.expression.type.variable",value:"control__content",match:["control__content"],position:{start:1402,end:1426}}]},{type:"raw",value:"",position:{start:1426,end:1430}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"control__type",match:["control__type"]},{type:"Twig.expression.type.string",value:"dropdown"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],position:{start:1430,end:1466},output:[{type:"raw",value:"    ",position:{start:1467,end:1471}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"2558144a2a42c9bfc8a873f6d431e1126034ee00e2bd5c833bb57827caab723fcfef992145f7b05e98819788b0082ff93cf7a9365d1d6ee3a488c50260ecf9a5"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"icon__name"},{type:"Twig.expression.type.string",value:"angle-down"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"icon__blockname"},{type:"Twig.expression.type.variable",value:"control__base_class",match:["control__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:1471,end:1606}},position:{start:1471,end:1606}},{type:"raw",value:"  ",position:{start:1607,end:1609}}]},position:{open:{start:1430,end:1466},close:{start:1609,end:1620}}},{type:"raw",value:"</",position:{start:1621,end:1623}},{type:"output",position:{start:1623,end:1645},stack:[{type:"Twig.expression.type.variable",value:"control__element",match:["control__element"],position:{start:1623,end:1645}}]},{type:"raw",value:">\n",position:{start:1645,end:1645}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}},"./components/02-molecules/search-result/yds-search-result.twig":(module,__unused_webpack_exports,__webpack_require__)=>{__webpack_require__("./components/01-atoms/typography/text/yds-text.twig"),__webpack_require__("./components/03-organisms/menu/breadcrumbs/yds-breadcrumbs.twig"),__webpack_require__("./components/01-atoms/typography/headings/yds-heading.twig");var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{atoms:"/home/runner/work/component-library-twig/component-library-twig/components/01-atoms",molecules:"/home/runner/work/component-library-twig/component-library-twig/components/02-molecules",organisms:"/home/runner/work/component-library-twig/component-library-twig/components/03-organisms","page-layouts":"/home/runner/work/component-library-twig/component-library-twig/components/04-page-layouts","page-examples":"/home/runner/work/component-library-twig/component-library-twig/components/05-page-examples"},id:"1cb48a4894c9285bca17385533189180f95d32d5d8a46189bcea291cb74d87ff7b7fc7759095d5ffcf5a4e690482066850727ebddc6973cc965688502f3c9f49",data:[{type:"raw",value:"\n\n",position:{start:139,end:141}},{type:"logic",token:{type:"Twig.logic.type.set",key:"search_result__base_class",expression:[{type:"Twig.expression.type.string",value:"search-result"}],position:{start:141,end:194}},position:{start:141,end:194}},{type:"raw",value:"\n",position:{start:195,end:196}},{type:"logic",token:{type:"Twig.logic.type.set",key:"search_result__attributes",expression:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type._function",fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"search_result__base_class",match:["search_result__base_class"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:196,end:280}},position:{start:196,end:280}},{type:"raw",value:"\n<div ",position:{start:281,end:287}},{type:"output",position:{start:287,end:334},stack:[{type:"Twig.expression.type._function",position:{start:287,end:334},fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:287,end:334}},{type:"Twig.expression.type.variable",value:"search_result__attributes",match:["search_result__attributes"],position:{start:287,end:334}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:287,end:334},expression:!1}]}]},{type:"raw",value:">\n  <div ",position:{start:334,end:343}},{type:"output",position:{start:343,end:394},stack:[{type:"Twig.expression.type._function",position:{start:343,end:394},fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:343,end:394}},{type:"Twig.expression.type.string",value:"content",position:{start:343,end:394}},{type:"Twig.expression.type.comma",position:{start:343,end:394}},{type:"Twig.expression.type.array.start",value:"[",match:["["],position:{start:343,end:394}},{type:"Twig.expression.type.array.end",value:"]",match:["]"],position:{start:343,end:394}},{type:"Twig.expression.type.comma",position:{start:343,end:394}},{type:"Twig.expression.type.variable",value:"search_result__base_class",match:["search_result__base_class"],position:{start:343,end:394}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:343,end:394},expression:!1}]}]},{type:"raw",value:" data-embedded-components>\n    <div ",position:{start:394,end:430}},{type:"output",position:{start:430,end:486},stack:[{type:"Twig.expression.type._function",position:{start:430,end:486},fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:430,end:486}},{type:"Twig.expression.type.string",value:"content-type",position:{start:430,end:486}},{type:"Twig.expression.type.comma",position:{start:430,end:486}},{type:"Twig.expression.type.array.start",value:"[",match:["["],position:{start:430,end:486}},{type:"Twig.expression.type.array.end",value:"]",match:["]"],position:{start:430,end:486}},{type:"Twig.expression.type.comma",position:{start:430,end:486}},{type:"Twig.expression.type.variable",value:"search_result__base_class",match:["search_result__base_class"],position:{start:430,end:486}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:430,end:486},expression:!1}]}]},{type:"raw",value:">\n      ",position:{start:486,end:494}},{type:"output",position:{start:494,end:527},stack:[{type:"Twig.expression.type.variable",value:"search_result__content_type",match:["search_result__content_type"],position:{start:494,end:527}}]},{type:"raw",value:"\n    </div>\n\n    ",position:{start:527,end:544}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"27b1662ff65cf552edfe5d7f19f3558fedf6058df765692d8980f32b35a3ff501ed89ea13a32646b83be66c5a75686b66a050a77f44bc097b49eb67f75c3f75a"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"heading__level"},{type:"Twig.expression.type.string",value:"2"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"heading__blockname"},{type:"Twig.expression.type.variable",value:"search_result__base_class",match:["search_result__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"heading"},{type:"Twig.expression.type.variable",value:"search_result__title",match:["search_result__title"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"heading__url"},{type:"Twig.expression.type.variable",value:"search_result__url",match:["search_result__url"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"heading__prefix__icon"},{type:"Twig.expression.type.variable",value:"search_result__prefix__icon",match:["search_result__prefix__icon"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:544,end:831}},position:{start:544,end:831}},{type:"raw",value:"\n    ",position:{start:832,end:837}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"is_cas",match:["is_cas"]},{type:"Twig.expression.type.operator.unary",value:"not",precidence:3,associativity:"rightToLeft",operator:"not"}],position:{start:837,end:856},output:[{type:"raw",value:"      ",position:{start:857,end:863}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"8ab6d7d53ed11159daf7128bbd7205e732f79d480e6e2e7917f288c1bad297d95e08e0c47cc5e41367f38fa793446a38eac3f0c0bc791eedd8d6faded2c7e8a9"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"breadcrumbs__modifiers"},{type:"Twig.expression.type.variable",value:"search_result__base_class",match:["search_result__base_class"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:863,end:1e3}},position:{start:863,end:1e3}},{type:"raw",value:"\n      ",position:{start:1001,end:1008}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"search_result__highlighted",match:["search_result__highlighted"]}],position:{start:1008,end:1043},output:[{type:"raw",value:"        ",position:{start:1044,end:1052}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"b443d29ae6398f9fd95d15108ce1ddc1db2b5ff8220f64dbce662cfad9d6b11a54fd77cb1285252624747636f312ae38960ecd0c6bd9fb4019ced097e343b2e1"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__base_class"},{type:"Twig.expression.type.string",value:"highlighted"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__blockname"},{type:"Twig.expression.type.variable",value:"search_result__base_class",match:["search_result__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__content"},{type:"Twig.expression.type.variable",value:"search_result__highlighted",match:["search_result__highlighted"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:1052,end:1271}},position:{start:1052,end:1271}},{type:"raw",value:"      ",position:{start:1272,end:1278}}]},position:{open:{start:1008,end:1043},close:{start:1278,end:1289}}},{type:"raw",value:"      ",position:{start:1290,end:1296}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"search_result__teaser",match:["search_result__teaser"]}],position:{start:1296,end:1326},output:[{type:"raw",value:"        ",position:{start:1327,end:1335}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"b443d29ae6398f9fd95d15108ce1ddc1db2b5ff8220f64dbce662cfad9d6b11a54fd77cb1285252624747636f312ae38960ecd0c6bd9fb4019ced097e343b2e1"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__base_class"},{type:"Twig.expression.type.string",value:"teaser"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__blockname"},{type:"Twig.expression.type.variable",value:"search_result__base_class",match:["search_result__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__content"},{type:"Twig.expression.type.variable",value:"search_result__teaser",match:["search_result__teaser"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:1335,end:1544}},position:{start:1335,end:1544}},{type:"raw",value:"      ",position:{start:1545,end:1551}}]},position:{open:{start:1296,end:1326},close:{start:1551,end:1562}}},{type:"raw",value:"    ",position:{start:1563,end:1567}}]},position:{open:{start:837,end:856},close:{start:1567,end:1578}}},{type:"raw",value:"  </div>\n</div>\n",position:{start:1579,end:1579}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);