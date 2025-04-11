(self.webpackChunk_yalesites_org_component_library_twig=self.webpackChunk_yalesites_org_component_library_twig||[]).push([[1589],{"./components/02-molecules/alert/yds-alert.js":()=>{Drupal.behaviors.alert={attach(context){const alerts=context.querySelectorAll(".alert"),alertState="data-alert-state",collapse=(item,toggle,id)=>{item.setAttribute(alertState,"collapsed"),toggle.setAttribute("aria-expanded","false"),localStorage.setItem(id,"collapsed")},dismiss=(item,id)=>{item.setAttribute(alertState,"dismissed"),localStorage.setItem(id,"dismissed")};if(function storageAvailable(type){let storage;try{storage=window[type];const x="__storage_test__";return storage.setItem(x,x),storage.removeItem(x),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&storage&&0!==storage.length}}("localStorage")){const alertCount=alerts.length;let newAlerts=0;alerts.forEach((alert=>{const id=alert.getAttribute("data-alert-id"),type=alert.getAttribute("data-alert-type"),toggle=alert.querySelector(".alert__toggle"),state=localStorage.getItem(id);null==state&&(newAlerts+=1),"dismissed"===state?dismiss(alert,id):"collapsed"===state&&collapse(alert,toggle,id),toggle.addEventListener("click",(()=>"emergency"===type?"expanded"===alert.getAttribute(alertState)?collapse(alert,toggle,id):((item,toggle,id)=>{item.setAttribute(alertState,"expanded"),toggle.setAttribute("aria-expanded","true"),localStorage.setItem(id,"expanded")})(alert,toggle,id):((item,id)=>{dismiss(item,id),item.classList.add("alert__animate")})(alert,id)))})),alertCount===newAlerts&&Object.keys(localStorage).forEach((key=>{"ys-alert-id-"===key.substring(0,12)&&localStorage.removeItem(key)}))}}}},"./components/02-molecules/alert/alert.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Alert:()=>Alert,AlertExamples:()=>AlertExamples,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _yds_alert_twig__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./components/02-molecules/alert/yds-alert.twig"),_yds_alert_twig__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_yds_alert_twig__WEBPACK_IMPORTED_MODULE_0__),_text_yds_text_field_twig__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./components/02-molecules/text/yds-text-field.twig"),_text_yds_text_field_twig__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_text_yds_text_field_twig__WEBPACK_IMPORTED_MODULE_1__),_01_atoms_controls_cta_yds_cta_twig__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/01-atoms/controls/cta/yds-cta.twig"),_01_atoms_controls_cta_yds_cta_twig__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_01_atoms_controls_cta_yds_cta_twig__WEBPACK_IMPORTED_MODULE_2__),_alert_yml__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./components/02-molecules/alert/alert.yml"),_alert_yml__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_alert_yml__WEBPACK_IMPORTED_MODULE_3__);__webpack_require__("./components/02-molecules/alert/yds-alert.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Molecules/Alert",parameters:{layout:"fullscreen",docs:{description:{component:"Storybook Definition."}}},argTypes:{heading:{name:"Alert Heading",type:"string"},content:{name:"Alert Content",type:"string"},linkContent:{name:"Alert Link Text",type:"string"}},args:{heading:_alert_yml__WEBPACK_IMPORTED_MODULE_3___default().alert__heading,content:_alert_yml__WEBPACK_IMPORTED_MODULE_3___default().alert__content,linkContent:_alert_yml__WEBPACK_IMPORTED_MODULE_3___default().alert__link__content}},alertResetInstructions=`\n<h2>Resetting Alerts in Storybook</h2><p>Once you've closed a dismissible alert, they will not show up again, even after page reloads. In order to see them again, here in storybook, click this reset button, and all alerts will be reset to their initial state.</p>\n${_01_atoms_controls_cta_yds_cta_twig__WEBPACK_IMPORTED_MODULE_2___default()({cta__content:"Reset dismissed alerts",cta__attributes:{onClick:"resetAlerts();"},cta__component_theme:"one"})}\n`,Alert=({type,heading,content,linkContent})=>`\n<script>\n  const resetAlerts = () => {\n    Object.keys(localStorage).forEach((key) => {\n      if (key.substring(0, 12) === 'ys-alert-id-') {\n        localStorage.removeItem(key);\n      }\n    });\n\n    location.reload();\n  };\n<\/script>\n${_yds_alert_twig__WEBPACK_IMPORTED_MODULE_0___default()({alert__type:type,alert__heading:heading,alert__content:content,alert__link__content:linkContent,alert__link__url:_alert_yml__WEBPACK_IMPORTED_MODULE_3___default().alert__link__url,alert__id:"123"})}<br />\n${_text_yds_text_field_twig__WEBPACK_IMPORTED_MODULE_1___default()({text_field__content:alertResetInstructions})}`;Alert.argTypes={type:{name:"Alert Type",type:"select",options:["emergency","announcement","marketing"],defaultValue:"announcement"}};const AlertExamples=({heading,content,linkContent})=>`\n<script>\n  const resetAlerts = () => {\n    Object.keys(localStorage).forEach((key) => {\n      if (key.substring(0, 12) === 'ys-alert-id-') {\n        localStorage.removeItem(key);\n      }\n    });\n\n    location.reload();\n  };\n<\/script>\n${_yds_alert_twig__WEBPACK_IMPORTED_MODULE_0___default()({alert__type:"emergency",alert__heading:heading,alert__content:content,alert__link__content:linkContent,alert__link__url:_alert_yml__WEBPACK_IMPORTED_MODULE_3___default().alert__link__url,alert__id:"234"})}\n${_yds_alert_twig__WEBPACK_IMPORTED_MODULE_0___default()({alert__type:"announcement",alert__heading:heading,alert__content:content,alert__link__content:linkContent,alert__link__url:_alert_yml__WEBPACK_IMPORTED_MODULE_3___default().alert__link__url,alert__id:"345"})}\n${_yds_alert_twig__WEBPACK_IMPORTED_MODULE_0___default()({alert__type:"marketing",alert__heading:heading,alert__content:content,alert__link__content:linkContent,alert__link__url:"#",alert__id:"456"})}<br />\n${_text_yds_text_field_twig__WEBPACK_IMPORTED_MODULE_1___default()({text_field__content:alertResetInstructions})}`,__namedExportsOrder=["Alert","AlertExamples"];Alert.parameters={...Alert.parameters,docs:{...Alert.parameters?.docs,source:{originalSource:"({\n  type,\n  heading,\n  content,\n  linkContent\n}) => `\n<script>\n  const resetAlerts = () => {\n    Object.keys(localStorage).forEach((key) => {\n      if (key.substring(0, 12) === 'ys-alert-id-') {\n        localStorage.removeItem(key);\n      }\n    });\n\n    location.reload();\n  };\n<\/script>\n${alertTwig({\n  alert__type: type,\n  alert__heading: heading,\n  alert__content: content,\n  alert__link__content: linkContent,\n  alert__link__url: alertData.alert__link__url,\n  alert__id: '123'\n})}<br />\n${textFieldTwig({\n  text_field__content: alertResetInstructions\n})}`",...Alert.parameters?.docs?.source}}},AlertExamples.parameters={...AlertExamples.parameters,docs:{...AlertExamples.parameters?.docs,source:{originalSource:"({\n  heading,\n  content,\n  linkContent\n}) => `\n<script>\n  const resetAlerts = () => {\n    Object.keys(localStorage).forEach((key) => {\n      if (key.substring(0, 12) === 'ys-alert-id-') {\n        localStorage.removeItem(key);\n      }\n    });\n\n    location.reload();\n  };\n<\/script>\n${alertTwig({\n  alert__type: 'emergency',\n  alert__heading: heading,\n  alert__content: content,\n  alert__link__content: linkContent,\n  alert__link__url: alertData.alert__link__url,\n  alert__id: '234'\n})}\n${alertTwig({\n  alert__type: 'announcement',\n  alert__heading: heading,\n  alert__content: content,\n  alert__link__content: linkContent,\n  alert__link__url: alertData.alert__link__url,\n  alert__id: '345'\n})}\n${alertTwig({\n  alert__type: 'marketing',\n  alert__heading: heading,\n  alert__content: content,\n  alert__link__content: linkContent,\n  alert__link__url: '#',\n  alert__id: '456'\n})}<br />\n${textFieldTwig({\n  text_field__content: alertResetInstructions\n})}`",...AlertExamples.parameters?.docs?.source}}}},"./components/01-atoms/typography/text/yds-text.twig":(module,__unused_webpack_exports,__webpack_require__)=>{var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{atoms:"/home/runner/work/component-library-twig/component-library-twig/components/01-atoms",molecules:"/home/runner/work/component-library-twig/component-library-twig/components/02-molecules",organisms:"/home/runner/work/component-library-twig/component-library-twig/components/03-organisms","page-layouts":"/home/runner/work/component-library-twig/component-library-twig/components/04-page-layouts","page-examples":"/home/runner/work/component-library-twig/component-library-twig/components/05-page-examples"},id:"b443d29ae6398f9fd95d15108ce1ddc1db2b5ff8220f64dbce662cfad9d6b11a54fd77cb1285252624747636f312ae38960ecd0c6bd9fb4019ced097e343b2e1",data:[{type:"raw",value:"\n\n",position:{start:178,end:180}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text__base_class",expression:[{type:"Twig.expression.type.variable",value:"text__base_class",match:["text__base_class"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"text"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:180,end:241}},position:{start:180,end:241}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text__element",expression:[{type:"Twig.expression.type.variable",value:"text__element",match:["text__element"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"div"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:242,end:296}},position:{start:242,end:296}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text__attributes",expression:[{type:"Twig.expression.type.variable",value:"text__attributes",match:["text__attributes"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:297,end:354}},position:{start:297,end:354}},{type:"raw",value:"\n",position:{start:355,end:356}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text__attributes",expression:[{type:"Twig.expression.type.variable",value:"text__attributes",match:["text__attributes"]},{type:"Twig.expression.type.filter",value:"merge",match:["|merge","merge"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type._function",fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"text__base_class",match:["text__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"text__modifiers",match:["text__modifiers"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"text__blockname",match:["text__blockname"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"text__extra_class",match:["text__extra_class"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:356,end:497}},position:{start:356,end:497}},{type:"raw",value:"\n<",position:{start:498,end:500}},{type:"output",position:{start:500,end:519},stack:[{type:"Twig.expression.type.variable",value:"text__element",match:["text__element"],position:{start:500,end:519}}]},{type:"raw",value:" ",position:{start:519,end:520}},{type:"output",position:{start:520,end:558},stack:[{type:"Twig.expression.type._function",position:{start:520,end:558},fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:520,end:558}},{type:"Twig.expression.type.variable",value:"text__attributes",match:["text__attributes"],position:{start:520,end:558}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:520,end:558},expression:!1}]}]},{type:"raw",value:">",position:{start:558,end:562}},{type:"output_whitespace_both",position:{start:562,end:587},stack:[{type:"Twig.expression.type.variable",value:"text__content",match:["text__content"],position:{start:562,end:587}},{type:"Twig.expression.type.filter",value:"raw",match:["|raw","raw"],position:{start:562,end:587}}]},{type:"raw",value:"</",position:{start:587,end:590}},{type:"output",position:{start:590,end:609},stack:[{type:"Twig.expression.type.variable",value:"text__element",match:["text__element"],position:{start:590,end:609}}]},{type:"raw",value:">\n",position:{start:609,end:609}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}},"./components/02-molecules/text/yds-text-field.twig":(module,__unused_webpack_exports,__webpack_require__)=>{__webpack_require__("./components/01-atoms/typography/text/yds-text.twig");var template=(0,__webpack_require__("./node_modules/twig/src/twig.js").twig)({namespaces:{atoms:"/home/runner/work/component-library-twig/component-library-twig/components/01-atoms",molecules:"/home/runner/work/component-library-twig/component-library-twig/components/02-molecules",organisms:"/home/runner/work/component-library-twig/component-library-twig/components/03-organisms","page-layouts":"/home/runner/work/component-library-twig/component-library-twig/components/04-page-layouts","page-examples":"/home/runner/work/component-library-twig/component-library-twig/components/05-page-examples"},id:"6782e75242b3e4d5ba7e74999cef91502485e574f34dc8be741ff95f2bb8a439da3c4f4ccd67b5bbf57a07890fbde76a57827a240c6c222e9a6eab2396c71ccf",data:[{type:"raw",value:"\n\n",position:{start:55,end:57}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text_field__base_class",expression:[{type:"Twig.expression.type.variable",value:"text_field__base_class",match:["text_field__base_class"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"text-field"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]}],position:{start:57,end:136}},position:{start:57,end:136}},{type:"raw",value:"\n",position:{start:137,end:138}},{type:"logic",token:{type:"Twig.logic.type.set",key:"text_field__attributes",expression:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"data-component-width"},{type:"Twig.expression.type.variable",value:"text_field__width",match:["text_field__width"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"site"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"data-component-alignment"},{type:"Twig.expression.type.variable",value:"text_field__alignment",match:["text_field__alignment"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"center"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"data-component-variation"},{type:"Twig.expression.type.variable",value:"text_field__variation",match:["text_field__variation"]},{type:"Twig.expression.type.filter",value:"default",match:["|default","default"],params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.string",value:"default"},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"class"},{type:"Twig.expression.type._function",fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("]},{type:"Twig.expression.type.variable",value:"text_field__base_class",match:["text_field__base_class"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"text_field__modifiers",match:["text_field__modifiers"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"text_field__blockname",match:["text_field__blockname"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.variable",value:"text_field__extra_classes",match:["text_field__extra_classes"]},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],expression:!1}]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:138,end:491}},position:{start:138,end:491}},{type:"raw",value:"\n<div ",position:{start:492,end:498}},{type:"output",position:{start:498,end:542},stack:[{type:"Twig.expression.type._function",position:{start:498,end:542},fn:"add_attributes",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:498,end:542}},{type:"Twig.expression.type.variable",value:"text_field__attributes",match:["text_field__attributes"],position:{start:498,end:542}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:498,end:542},expression:!1}]}]},{type:"raw",value:">\n  ",position:{start:542,end:546}},{type:"logic",token:{type:"Twig.logic.type.block",blockName:"prefix_suffix",position:{start:546,end:571},output:[{type:"raw",value:"  ",position:{start:572,end:574}}]},position:{open:{start:546,end:571},close:{start:574,end:588}}},{type:"raw",value:"  <div ",position:{start:589,end:596}},{type:"output",position:{start:596,end:642},stack:[{type:"Twig.expression.type._function",position:{start:596,end:642},fn:"bem",params:[{type:"Twig.expression.type.parameter.start",value:"(",match:["("],position:{start:596,end:642}},{type:"Twig.expression.type.string",value:"inner",position:{start:596,end:642}},{type:"Twig.expression.type.comma",position:{start:596,end:642}},{type:"Twig.expression.type.array.start",value:"[",match:["["],position:{start:596,end:642}},{type:"Twig.expression.type.array.end",value:"]",match:["]"],position:{start:596,end:642}},{type:"Twig.expression.type.comma",position:{start:596,end:642}},{type:"Twig.expression.type.variable",value:"text_field__base_class",match:["text_field__base_class"],position:{start:596,end:642}},{type:"Twig.expression.type.parameter.end",value:")",match:[")"],position:{start:596,end:642},expression:!1}]}]},{type:"raw",value:">\n    ",position:{start:642,end:648}},{type:"logic",token:{type:"Twig.logic.type.include",only:!1,ignoreMissing:!1,stack:[{type:"Twig.expression.type.string",value:"b443d29ae6398f9fd95d15108ce1ddc1db2b5ff8220f64dbce662cfad9d6b11a54fd77cb1285252624747636f312ae38960ecd0c6bd9fb4019ced097e343b2e1"}],withStack:[{type:"Twig.expression.type.object.start",value:"{",match:["{"]},{type:"Twig.expression.type.operator.binary",value:":",precidence:16,associativity:"rightToLeft",operator:":",key:"text__content"},{type:"Twig.expression.type.variable",value:"text_field__content",match:["text_field__content"]},{type:"Twig.expression.type.comma"},{type:"Twig.expression.type.object.end",value:"}",match:["}"]}],position:{start:648,end:755}},position:{start:648,end:755}},{type:"raw",value:"  </div>\n</div>\n",position:{start:756,end:756}}],allowInlineIncludes:!0,rethrow:!0});module.exports=function(context){return template.render(context)}}}]);