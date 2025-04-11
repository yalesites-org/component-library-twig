(self.webpackChunk_yalesites_org_component_library_twig=self.webpackChunk_yalesites_org_component_library_twig||[]).push([[3671],{"./components/02-molecules/alert/alert.yml":module=>{const doc=[{alert__heading:"This is the heading for the alert",alert__content:"This is an optional text for more information if needed.",alert__link__content:"Optional link",alert__link__url:"https://google.com"}];module.exports=doc.length<=1?doc[0]:doc},"./components/02-molecules/alert/yds-alert.twig":(module,__unused_webpack_exports,__webpack_require__)=>{__webpack_require__("./components/01-atoms/controls/base/yds-control.twig"),__webpack_require__("./components/01-atoms/controls/text-link/yds-text-link.twig"),__webpack_require__("./components/01-atoms/typography/text/yds-text.twig"),__webpack_require__("./components/01-atoms/typography/headings/yds-heading.twig"),__webpack_require__("./components/01-atoms/images/icons/_yds-icon.twig");var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{atoms:"/home/runner/work/component-library-twig/component-library-twig/components/01-atoms",molecules:"/home/runner/work/component-library-twig/component-library-twig/components/02-molecules",organisms:"/home/runner/work/component-library-twig/component-library-twig/components/03-organisms","page-layouts":"/home/runner/work/component-library-twig/component-library-twig/components/04-page-layouts","page-examples":"/home/runner/work/component-library-twig/component-library-twig/components/05-page-examples"},id:"ceb9bebbc362b5f48c7d4502ad9c9ac1b6020b992b39b7503bb93c4eec74d8f92b374de39505594f667cf9d9968bcbda2ee240048abf580815334a5651a5cb0d",data:[{type:"raw",value:"\n\n",position:{start:237,end:239}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__base_class",expression:[{type:"Twig.expression.type.string",value:"alert"}],position:{start:239,end:276}},position:{start:239,end:276}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__type",expression:[{type:"Twig.expression.type.variable",value:"alert__type",match:["alert__type"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"announcement"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:277,end:336}},position:{start:277,end:336}},{type:"raw",value:"\n",position:{start:337,end:338}},{type:"raw",value:"\n",position:{start:363,end:364}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"alert__type",match:["alert__type"]},{type:"Twig.expression.type.string",value:"emergency"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],position:{start:364,end:399},output:[{type:"raw",value:"  ",position:{start:400,end:402}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__icon",expression:[{type:"Twig.expression.type.string",value:"triangle-exclamation"}],position:{start:402,end:448}},position:{start:402,end:448}},{type:"raw",value:"  ",position:{start:449,end:451}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__toggle",expression:[{type:"Twig.expression.type.string",value:"angle-down"}],position:{start:451,end:489}},position:{start:451,end:489}},{type:"raw",value:"  ",position:{start:490,end:492}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__toggle__text",expression:[{type:"Twig.expression.type.string",value:"Hide alert details"}],position:{start:492,end:544}},position:{start:492,end:544}},{type:"raw",value:"  ",position:{start:545,end:547}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__toggle__aria_expanded",expression:[{type:"Twig.expression.type.string",value:"true"}],position:{start:547,end:594}},position:{start:547,end:594}},{type:"raw",value:"\n",position:{start:623,end:624}}]},position:{open:{start:364,end:399},close:{start:624,end:666}}},{type:"logic",token:{type:"Twig.logic.type.elseif",stack:[{type:"Twig.expression.type.variable",value:"alert__type",match:["alert__type"]},{type:"Twig.expression.type.string",value:"announcement"},{type:"Twig.expression.type.operator.binary",value:"==",precidence:9,associativity:"leftToRight",operator:"=="}],position:{start:624,end:666},output:[{type:"raw",value:"  ",position:{start:667,end:669}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__icon",expression:[{type:"Twig.expression.type.string",value:"circle-info"}],position:{start:669,end:706}},position:{start:669,end:706}},{type:"raw",value:"  ",position:{start:707,end:709}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__toggle",expression:[{type:"Twig.expression.type.string",value:"xmark"}],position:{start:709,end:742}},position:{start:709,end:742}},{type:"raw",value:"  ",position:{start:743,end:745}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__toggle__text",expression:[{type:"Twig.expression.type.string",value:"Close alert"}],position:{start:745,end:790}},position:{start:745,end:790}},{type:"raw",value:"\n",position:{start:815,end:816}}]},position:{open:{start:624,end:666},close:{start:816,end:826}}},{type:"logic",token:{type:"Twig.logic.type.else",match:["else"],position:{start:816,end:826},output:[{type:"raw",value:"  ",position:{start:827,end:829}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__toggle",expression:[{type:"Twig.expression.type.string",value:"xmark"}],position:{start:829,end:862}},position:{start:829,end:862}},{type:"raw",value:"  ",position:{start:863,end:865}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__toggle__text",expression:[{type:"Twig.expression.type.string",value:"Close alert"}],position:{start:865,end:910}},position:{start:865,end:910}}]},position:{open:{start:816,end:826},close:{start:911,end:922}}},{type:"raw",value:"\n",position:{start:923,end:924}},{type:"logic",token:{type:"Twig.logic.type.set",key:"alert__attributes",expression:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"data-component-width"},{type:"Twig.expression.type.string",value:"site"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"data-alert-id"},{type:"Twig.expression.type.string",value:"ys-alert-id-"},{type:"Twig.expression.type.variable",value:"alert__id",match:["alert__id"]},{type:"Twig.expression.type.operator.binary",value:"~",precidence:6,associativity:"leftToRight",operator:"~"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"data-alert-state"},{type:"Twig.expression.type.variable",value:"alert__state",match:["alert__state"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"expanded"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"data-alert-type"},{type:"Twig.expression.type.variable",value:"alert__type",match:["alert__type"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"aria-label"},{type:"Twig.expression.type.string",value:"announcement"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type._function",fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"alert__base_class",match:["alert__base_class"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:924,end:1193}},position:{start:924,end:1193}},{type:"raw",value:"\n<section ",position:{start:1194,end:1204}},{type:"output",position:{start:1204,end:1243},stack:[{type:"Twig.expression.type._function",position:{start:1204,end:1243},fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:1204,end:1243}},{type:"Twig.expression.type.variable",value:"alert__attributes",match:["alert__attributes"],position:{start:1204,end:1243}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:1204,end:1243},expression:!1}]}]},{type:"raw",value:">\n  <div ",position:{start:1243,end:1252}},{type:"output",position:{start:1252,end:1293},stack:[{type:"Twig.expression.type._function",position:{start:1252,end:1293},fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:1252,end:1293}},{type:"Twig.expression.type.string",value:"inner",position:{start:1252,end:1293}},{type:"Twig.expression.type.comma",position:{start:1252,end:1293}},{type:"Twig.expression.type.array.start",value:"[",match:["["],position:{start:1252,end:1293}},{type:"Twig.expression.type.array.end",value:"]",match:["]"],position:{start:1252,end:1293}},{type:"Twig.expression.type.comma",position:{start:1252,end:1293}},{type:"Twig.expression.type.variable",value:"alert__base_class",match:["alert__base_class"],position:{start:1252,end:1293}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:1252,end:1293},expression:!1}]}]},{type:"raw",value:">\n    ",position:{start:1293,end:1299}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"alert__icon",match:["alert__icon"]}],position:{start:1299,end:1319},output:[{type:"raw",value:"      <div ",position:{start:1320,end:1331}},{type:"output",position:{start:1331,end:1377},stack:[{type:"Twig.expression.type._function",position:{start:1331,end:1377},fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:1331,end:1377}},{type:"Twig.expression.type.string",value:"icon",position:{start:1331,end:1377}},{type:"Twig.expression.type.comma",position:{start:1331,end:1377}},{type:"Twig.expression.type.array.start",value:"[",match:["["],position:{start:1331,end:1377}},{type:"Twig.expression.type.string",value:"type",position:{start:1331,end:1377}},{type:"Twig.expression.type.array.end",value:"]",match:["]"],position:{start:1331,end:1377}},{type:"Twig.expression.type.comma",position:{start:1331,end:1377}},{type:"Twig.expression.type.variable",value:"alert__base_class",match:["alert__base_class"],position:{start:1331,end:1377}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:1331,end:1377},expression:!1}]}]},{type:"raw",value:">\n        ",position:{start:1377,end:1387}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"2558144a2a42c9bfc8a873f6d431e1126034ee00e2bd5c833bb57827caab723fcfef992145f7b05e98819788b0082ff93cf7a9365d1d6ee3a488c50260ecf9a5"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"icon__name"},{type:"Twig.expression.type.variable",value:"alert__icon",match:["alert__icon"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"icon__decorative"},{type:"Twig.expression.type.bool",value:!0},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:1387,end:1523}},position:{start:1387,end:1523}},{type:"raw",value:"      </div>\n    ",position:{start:1524,end:1541}}]},position:{open:{start:1299,end:1319},close:{start:1541,end:1552}}},{type:"raw",value:"    <div ",position:{start:1553,end:1562}},{type:"output",position:{start:1562,end:1605},stack:[{type:"Twig.expression.type._function",position:{start:1562,end:1605},fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:1562,end:1605}},{type:"Twig.expression.type.string",value:"content",position:{start:1562,end:1605}},{type:"Twig.expression.type.comma",position:{start:1562,end:1605}},{type:"Twig.expression.type.array.start",value:"[",match:["["],position:{start:1562,end:1605}},{type:"Twig.expression.type.array.end",value:"]",match:["]"],position:{start:1562,end:1605}},{type:"Twig.expression.type.comma",position:{start:1562,end:1605}},{type:"Twig.expression.type.variable",value:"alert__base_class",match:["alert__base_class"],position:{start:1562,end:1605}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:1562,end:1605},expression:!1}]}]},{type:"raw",value:">\n      <div ",position:{start:1605,end:1618}},{type:"output",position:{start:1618,end:1667},stack:[{type:"Twig.expression.type._function",position:{start:1618,end:1667},fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:1618,end:1667}},{type:"Twig.expression.type.string",value:"content-inner",position:{start:1618,end:1667}},{type:"Twig.expression.type.comma",position:{start:1618,end:1667}},{type:"Twig.expression.type.array.start",value:"[",match:["["],position:{start:1618,end:1667}},{type:"Twig.expression.type.array.end",value:"]",match:["]"],position:{start:1618,end:1667}},{type:"Twig.expression.type.comma",position:{start:1618,end:1667}},{type:"Twig.expression.type.variable",value:"alert__base_class",match:["alert__base_class"],position:{start:1618,end:1667}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:1618,end:1667},expression:!1}]}]},{type:"raw",value:">\n        ",position:{start:1667,end:1677}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"alert__heading",match:["alert__heading"]}],position:{start:1677,end:1700},output:[{type:"raw",value:"          ",position:{start:1701,end:1711}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"27b1662ff65cf552edfe5d7f19f3558fedf6058df765692d8980f32b35a3ff501ed89ea13a32646b83be66c5a75686b66a050a77f44bc097b49eb67f75c3f75a"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"heading__level"},{type:"Twig.expression.type.string",value:"2"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"heading__blockname"},{type:"Twig.expression.type.variable",value:"alert__base_class",match:["alert__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"heading"},{type:"Twig.expression.type.variable",value:"alert__heading",match:["alert__heading"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:1711,end:1910}},position:{start:1711,end:1910}},{type:"raw",value:"        ",position:{start:1911,end:1919}}]},position:{open:{start:1677,end:1700},close:{start:1919,end:1930}}},{type:"raw",value:"        ",position:{start:1931,end:1939}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"alert__content",match:["alert__content"]}],position:{start:1939,end:1962},output:[{type:"raw",value:"          ",position:{start:1963,end:1973}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"b443d29ae6398f9fd95d15108ce1ddc1db2b5ff8220f64dbce662cfad9d6b11a54fd77cb1285252624747636f312ae38960ecd0c6bd9fb4019ced097e343b2e1"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__element"},{type:"Twig.expression.type.string",value:"div"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__content"},{type:"Twig.expression.type.variable",value:"alert__content",match:["alert__content"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__blockname"},{type:"Twig.expression.type.variable",value:"alert__base_class",match:["alert__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:1973,end:2169}},position:{start:1973,end:2169}},{type:"raw",value:"        ",position:{start:2170,end:2178}}]},position:{open:{start:1939,end:1962},close:{start:2178,end:2189}}},{type:"raw",value:"      </div>\n      ",position:{start:2190,end:2209}},{type:"logic",token:{type:"Twig.logic.type.if",stack:[{type:"Twig.expression.type.variable",value:"alert__link__content",match:["alert__link__content"]},{type:"Twig.expression.type.variable",value:"alert__link__url",match:["alert__link__url"]},{type:"Twig.expression.type.operator.binary",value:"and",precidence:13,associativity:"leftToRight",operator:"and"}],position:{start:2209,end:2259},output:[{type:"raw",value:"        ",position:{start:2260,end:2268}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"03bcc1caa2f6f315eb45050efa8956761a46c80919d8250cd00611e07c46ced97d18f49f20aeeb92fb81a0866baae94f2ac503c1c0d71ddac593f1d10b2cc4d9"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"link__content"},{type:"Twig.expression.type.variable",value:"alert__link__content",match:["alert__link__content"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"link__url"},{type:"Twig.expression.type.variable",value:"alert__link__url",match:["alert__link__url"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"link__blockname"},{type:"Twig.expression.type.variable",value:"alert__base_class",match:["alert__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:2268,end:2477}},position:{start:2268,end:2477}},{type:"raw",value:"      ",position:{start:2478,end:2484}}]},position:{open:{start:2209,end:2259},close:{start:2484,end:2495}}},{type:"raw",value:"    </div>\n    ",position:{start:2496,end:2511}},{type:"logic",token:{type:"Twig.logic.type.setcapture",key:"alert__control",position:{start:2511,end:2535},output:[{type:"raw",value:"      <span ",position:{start:2536,end:2548}},{type:"output",position:{start:2548,end:2576},stack:[{type:"Twig.expression.type._function",position:{start:2548,end:2576},fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:2548,end:2576}},{type:"Twig.expression.type.string",value:"visually-hidden",position:{start:2548,end:2576}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:2548,end:2576},expression:!1}]}]},{type:"raw",value:">",position:{start:2576,end:2577}},{type:"output",position:{start:2577,end:2602},stack:[{type:"Twig.expression.type.variable",value:"alert__toggle__text",match:["alert__toggle__text"],position:{start:2577,end:2602}}]},{type:"raw",value:"</span>\n      ",position:{start:2602,end:2616}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"2558144a2a42c9bfc8a873f6d431e1126034ee00e2bd5c833bb57827caab723fcfef992145f7b05e98819788b0082ff93cf7a9365d1d6ee3a488c50260ecf9a5"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"icon__name"},{type:"Twig.expression.type.variable",value:"alert__toggle",match:["alert__toggle"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"icon__decorative"},{type:"Twig.expression.type.bool",value:!0},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:2616,end:2748}},position:{start:2616,end:2748}},{type:"raw",value:"    ",position:{start:2749,end:2753}}]},position:{open:{start:2511,end:2535},close:{start:2753,end:2765}}},{type:"raw",value:"    ",position:{start:2766,end:2770}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"6ed8a1d03d3343010f4e1a6333185741795b12c3bef17dc74664500d14a35b7b3908b9e7982062a124c435e53338399183918a21d75c8acd42ce4f60aa469637"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"control__content"},{type:"Twig.expression.type.variable",value:"alert__control",match:["alert__control"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"control__base_class"},{type:"Twig.expression.type.string",value:"toggle"},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"control__blockname"},{type:"Twig.expression.type.variable",value:"alert__base_class",match:["alert__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"aria_expanded"},{type:"Twig.expression.type.variable",value:"alert__toggle__aria_expanded",match:["alert__toggle__aria_expanded"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:2770,end:3009}},position:{start:2770,end:3009}},{type:"raw",value:"  </div>\n</section>\n",position:{start:3010,end:3010}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);